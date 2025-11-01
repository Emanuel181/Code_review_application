// src/app/api/folders/download-all/route.js
import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import archiver from 'archiver';

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
        // List all objects for the user
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Prefix: `${user.id}/`,
        });

        const listResponse = await s3Client.send(listCommand);
        const allObjects = listResponse.Contents || [];

        // Filter out .foldermarker files
        const objects = allObjects.filter(obj => !obj.Key.includes('.foldermarker'));

        if (objects.length === 0) {
            return NextResponse.json({ error: 'No files found' }, { status: 404 });
        }

        // Create a zip archive
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        // Create a readable stream for the response
        const chunks = [];
        archive.on('data', (chunk) => chunks.push(chunk));

        await new Promise((resolve, reject) => {
            archive.on('end', resolve);
            archive.on('error', reject);

            // Add each file from S3 to the archive
            Promise.all(
                objects.map(async (object) => {
                    const getCommand = new GetObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: object.Key,
                    });

                    const response = await s3Client.send(getCommand);

                    // Get the relative path (remove user ID prefix)
                    const relativePath = object.Key.substring(`${user.id}/`.length);

                    // Convert the S3 stream to a buffer
                    const chunks = [];
                    for await (const chunk of response.Body) {
                        chunks.push(chunk);
                    }
                    const buffer = Buffer.concat(chunks);

                    // Add file to archive
                    archive.append(buffer, { name: relativePath });
                })
            ).then(() => {
                archive.finalize();
            }).catch(reject);
        });

        const zipBuffer = Buffer.concat(chunks);

        return new NextResponse(zipBuffer, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="all-files.zip"',
            },
        });
    } catch (error) {
        console.error('Failed to download all files:', error);
        return NextResponse.json({ error: 'Failed to download all files' }, { status: 500 });
    }
}

