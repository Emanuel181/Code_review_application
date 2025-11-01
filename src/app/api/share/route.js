import { NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import prisma from '@/lib/prisma';
import { nanoid } from 'nanoid';

/**
 * POST /api/share
 * Create a shareable link for a file
 */
export const POST = async (req) => {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fileKey, fileName, permissions } = await req.json();

    if (!fileKey || !fileName) {
      return NextResponse.json(
        { error: 'File key and name are required' },
        { status: 400 }
      );
    }

    // Generate unique share token
    const shareToken = nanoid(16);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    // Create share link in database
    const shareLink = await prisma.shareLink.create({
      data: {
        token: shareToken,
        fileKey,
        fileName,
        ownerId: user.id,
        permissions: permissions || {
          canView: true,
          canEdit: true,
          canComment: true,
          canAnalyze: true,
        },
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      shareLink: {
        id: shareLink.id,
        token: shareToken,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/share/${shareToken}`,
        expiresAt: shareLink.expiresAt,
        permissions: shareLink.permissions,
      },
    });
  } catch (error) {
    console.error('Error creating share link:', error);
    return NextResponse.json(
      { error: 'Failed to create share link', details: error.message },
      { status: 500 }
    );
  }
};

/**
 * GET /api/share
 * Get all share links created by user
 */
export const GET = async (req) => {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const shareLinks = await prisma.shareLink.findMany({
      where: {
        ownerId: user.id,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      shareLinks,
    });
  } catch (error) {
    console.error('Error fetching share links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch share links', details: error.message },
      { status: 500 }
    );
  }
};

/**
 * DELETE /api/share?token=...
 * Revoke a share link
 */
export const DELETE = async (req) => {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Delete share link (only if owned by user)
    const deleted = await prisma.shareLink.deleteMany({
      where: {
        token,
        ownerId: user.id,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: 'Share link not found or not owned by you' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Share link revoked',
    });
  } catch (error) {
    console.error('Error deleting share link:', error);
    return NextResponse.json(
      { error: 'Failed to delete share link', details: error.message },
      { status: 500 }
    );
  }
};
