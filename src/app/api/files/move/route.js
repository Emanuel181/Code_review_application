// src/app/api/files/move/route.js
import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';
import { S3Client, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

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
        const { fileKey, targetFolderPath } = await request.json();

        if (!fileKey) {
            return NextResponse.json({ error: 'File key is required' }, { status: 400 });
        }

        // Parse the current file key to extract filename
        const parts = fileKey.split('/');
        const fileName = parts[parts.length - 1]; // Get the filename with timestamp
        const userId = parts[0];

        // Verify the file belongs to the current user
        if (userId !== user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Build new key with target folder path
        const newKey = targetFolderPath
            ? `${user.id}/${targetFolderPath}/${fileName}`
            : `${user.id}/${fileName}`;

        // Copy the file to new location
        const copyCommand = new CopyObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            CopySource: `${process.env.AWS_S3_BUCKET_NAME}/${fileKey}`,
            Key: newKey,
        });

        await s3Client.send(copyCommand);

        // Delete the old file
        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
        });

        await s3Client.send(deleteCommand);

        return NextResponse.json({
            success: true,
            newKey
        });
    } catch (error) {
        console.error('Failed to move file:', error);
        return NextResponse.json({ error: 'Failed to move file' }, { status: 500 });
    }
}

