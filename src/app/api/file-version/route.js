import { NextResponse } from 'next/server';
import { withAuth } from "@workos-inc/authkit-nextjs";
import { storeFileVersion, hasFileChanged } from '@/lib/version-tracker';
import { getFileContent } from '@/lib/s3';

/**
 * Store or update file version
 */
export async function POST(request) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fileKey, fileName } = await request.json();

    if (!fileKey) {
      return NextResponse.json({ error: 'fileKey is required' }, { status: 400 });
    }

    // Get file content from S3
    const content = await getFileContent(fileKey);

    // Check if file has changed
    const changed = await hasFileChanged(fileKey, content);

    if (!changed) {
      return NextResponse.json({
        success: true,
        message: 'File content unchanged',
        versionCreated: false,
      });
    }

    // Store new version
    const version = await storeFileVersion(user.id, fileKey, fileName, content);

    return NextResponse.json({
      success: true,
      version: {
        id: version.id,
        version: version.version,
        hash: version.hash,
        size: version.size,
        createdAt: version.createdAt,
      },
      versionCreated: true,
    });
  } catch (error) {
    console.error('File version API error:', error);
    return NextResponse.json(
      { error: 'Failed to store file version', details: error.message },
      { status: 500 }
    );
  }
}

