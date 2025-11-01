import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadFileContent } from '@/lib/s3';

/**
 * PUT /api/share/[token]/edit
 * Edit a shared file
 */
export const PUT = async (req, { params }) => {
  try {
    const { token } = params;
    const { content, userName, userEmail } = await req.json();

    if (!token || content === undefined) {
      return NextResponse.json(
        { error: 'Token and content are required' },
        { status: 400 }
      );
    }

    // Verify share link and permissions
    const shareLink = await prisma.shareLink.findUnique({
      where: { token },
    });

    if (!shareLink) {
      return NextResponse.json(
        { error: 'Share link not found' },
        { status: 404 }
      );
    }

    if (new Date(shareLink.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Share link has expired' },
        { status: 410 }
      );
    }

    if (!shareLink.permissions.canEdit) {
      return NextResponse.json(
        { error: 'You do not have permission to edit' },
        { status: 403 }
      );
    }

    // Save content to S3
    await uploadFileContent(shareLink.fileKey, content);

    // Store edit history
    await prisma.shareEdit.create({
      data: {
        shareLinkId: shareLink.id,
        content,
        userName: userName || 'Anonymous',
        userEmail,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'File updated successfully',
      fileKey: shareLink.fileKey,
    });
  } catch (error) {
    console.error('Error editing shared file:', error);
    return NextResponse.json(
      { error: 'Failed to edit file', details: error.message },
      { status: 500 }
    );
  }
};

