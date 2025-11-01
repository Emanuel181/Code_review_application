import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getFileContent } from '@/lib/s3';

/**
 * GET /api/share/[token]
 * Access a shared file via token
 */
export const GET = async (req, { params }) => {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Find share link
    const shareLink = await prisma.shareLink.findUnique({
      where: { token },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!shareLink) {
      return NextResponse.json(
        { error: 'Share link not found' },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date(shareLink.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Share link has expired' },
        { status: 410 }
      );
    }

    // Get file content if has view permission
    let content = null;
    if (shareLink.permissions.canView) {
      try {
        content = await getFileContent(shareLink.fileKey);
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    }

    return NextResponse.json({
      success: true,
      shareLink: {
        id: shareLink.id,
        fileName: shareLink.fileName,
        fileKey: shareLink.fileKey,
        permissions: shareLink.permissions,
        expiresAt: shareLink.expiresAt,
        owner: {
          name: `${shareLink.owner.firstName} ${shareLink.owner.lastName}`,
          email: shareLink.owner.email,
        },
        content,
      },
    });
  } catch (error) {
    console.error('Error accessing share link:', error);
    return NextResponse.json(
      { error: 'Failed to access share link', details: error.message },
      { status: 500 }
    );
  }
};

