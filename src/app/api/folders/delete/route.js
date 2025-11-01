// src/app/api/folders/delete/route.js
import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function DELETE(request) {
    const { user } = await withAuth();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { folderPath } = await request.json();

        if (!folderPath || !folderPath.trim()) {
            return NextResponse.json({ error: 'Folder path is required' }, { status: 400 });
        }

        // List all objects in the folder
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Prefix: `${user.id}/${folderPath.trim()}/`,
        });

        const listResponse = await s3Client.send(listCommand);
        const objects = listResponse.Contents || [];

        // Delete all objects in the folder
        for (const obj of objects) {
            const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: obj.Key,
            });
            await s3Client.send(deleteCommand);
        }

        return NextResponse.json({
            success: true,
            deletedCount: objects.length
        });
    } catch (error) {
        console.error('Failed to delete folder:', error);
        return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 });
    }
}

