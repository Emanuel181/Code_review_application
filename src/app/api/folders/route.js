// src/app/api/folders/route.js
import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';
import { listUserFiles } from '@/lib/s3';

// GET - List all folders for a user
export async function GET() {
    const { user } = await withAuth();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Get all files to extract folder structure
        const files = await listUserFiles(user.id);

        // Extract unique folders from file keys
        const folders = new Set();
        files.forEach(file => {
            const parts = file.Key.split('/');
            // Remove userId and filename to get folder path
            if (parts.length > 2) {
                const folderPath = parts.slice(1, -1).join('/');
                if (folderPath) {
                    folders.add(folderPath);
                    // Also add parent folders
                    const pathParts = folderPath.split('/');
                    for (let i = 1; i <= pathParts.length; i++) {
                        folders.add(pathParts.slice(0, i).join('/'));
                    }
                }
            }
        });

        return NextResponse.json({
            folders: Array.from(folders).sort()
        });
    } catch (error) {
        console.error('Failed to list folders:', error);
        return NextResponse.json({ error: 'Failed to list folders' }, { status: 500 });
    }
}

// POST - Create a new folder
export async function POST(request) {
    const { user } = await withAuth();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { folderPath } = await request.json();

        if (!folderPath || !folderPath.trim()) {
            return NextResponse.json({ error: 'Folder path is required' }, { status: 400 });
        }

        // Validate folder path (no special characters except hyphen, underscore, and forward slash)
        if (!/^[a-zA-Z0-9\-_/\s]+$/.test(folderPath)) {
            return NextResponse.json({
                error: 'Folder path can only contain letters, numbers, spaces, hyphens, underscores, and forward slashes'
            }, { status: 400 });
        }

        // Create an empty folder marker in S3
        const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const folderKey = `${user.id}/${folderPath.trim()}/.foldermarker`;
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: folderKey,
            Body: '',
            ContentType: 'application/x-empty',
        });

        await s3Client.send(command);

        return NextResponse.json({
            success: true,
            folderPath: folderPath.trim()
        });
    } catch (error) {
        console.error('Failed to create folder:', error);
        return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
    }
}

