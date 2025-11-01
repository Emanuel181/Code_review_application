import { NextResponse } from 'next/server';
import { withAuth } from "@workos-inc/authkit-nextjs";
import prisma from '@/lib/prisma';

/**
 * Update comment
 */
export async function PATCH(request, { params }) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const commentId = params.id;
    const { content, status } = await request.json();

    // Get existing comment
    const existing = await prisma.reviewComment.findUnique({
      where: { id: commentId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check ownership for content updates
    if (content && existing.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized to edit this comment' }, { status: 403 });
    }

    const updateData = {};
    if (content) updateData.content = content;
    if (status) {
      updateData.status = status;
      if (status === 'resolved') {
        updateData.resolvedAt = new Date();
        updateData.resolvedBy = user.id;
      }
    }

    const comment = await prisma.reviewComment.update({
      where: { id: commentId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error('Update comment API error:', error);
    return NextResponse.json(
      { error: 'Failed to update comment', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Delete comment
 */
export async function DELETE(request, { params }) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const commentId = params.id;

    // Get existing comment
    const existing = await prisma.reviewComment.findUnique({
      where: { id: commentId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check ownership
    if (existing.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized to delete this comment' }, { status: 403 });
    }

    await prisma.reviewComment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted',
    });
  } catch (error) {
    console.error('Delete comment API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment', details: error.message },
      { status: 500 }
    );
  }
}

