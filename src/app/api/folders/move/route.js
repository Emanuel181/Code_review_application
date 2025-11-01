// src/app/api/folders/move/route.js
import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function POST(request) {
    const { user } = await withAuth();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { sourceFolderPath, targetFolderPath } = await request.json();

        if (!sourceFolderPath) {
            return NextResponse.json({ error: 'Source folder path is required' }, { status: 400 });
        }

        // Prevent moving a folder into itself or its subfolder
        if (targetFolderPath && targetFolderPath.startsWith(sourceFolderPath + '/')) {
            return NextResponse.json({ error: 'Cannot move a folder into itself or its subfolder' }, { status: 400 });
        }

        // Get the folder name from the source path
        const folderName = sourceFolderPath.includes('/')
            ? sourceFolderPath.substring(sourceFolderPath.lastIndexOf('/') + 1)
            : sourceFolderPath;

        // Build the new folder path
        const newFolderPath = targetFolderPath
            ? `${targetFolderPath}/${folderName}`
            : folderName;

        // List all objects in the source folder
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Prefix: `${user.id}/${sourceFolderPath}/`,
        });

        const listResponse = await s3Client.send(listCommand);
        const objects = listResponse.Contents || [];

        if (objects.length === 0) {
            return NextResponse.json({ error: 'Folder is empty or does not exist' }, { status: 404 });
        }

        // Move all files in the folder
        for (const object of objects) {
            const oldKey = object.Key;

            // Calculate the relative path within the source folder
            const relativePath = oldKey.substring(`${user.id}/${sourceFolderPath}/`.length);

            // Build new key
            const newKey = `${user.id}/${newFolderPath}/${relativePath}`;

            // Copy object to new location
            const copyCommand = new CopyObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                CopySource: `${process.env.AWS_S3_BUCKET_NAME}/${oldKey}`,
                Key: newKey,
            });

            await s3Client.send(copyCommand);

            // Delete old object
            const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: oldKey,
            });

            await s3Client.send(deleteCommand);
        }

        return NextResponse.json({
            success: true,
            movedCount: objects.length,
            newFolderPath
        });
    } catch (error) {
        console.error('Failed to move folder:', error);
        return NextResponse.json({ error: 'Failed to move folder' }, { status: 500 });
    }
}

