import { NextResponse } from 'next/server';
import { withAuth } from "@workos-inc/authkit-nextjs";
import { getFileVersion, getLatestFileVersion } from '@/lib/version-tracker';
import { calculateDiff, getChangedSections, getDiffStats } from '@/lib/diff-engine';

/**
 * Get diff between two file versions
 */
export async function GET(request, { params }) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const versionId = params.id;
    const { searchParams } = new URL(request.url);
    const compareWith = searchParams.get('compareWith'); // 'previous' or specific version ID

    // Get the target version
    const targetVersion = await getFileVersion(versionId);

    if (!targetVersion) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // Determine comparison version
    let compareVersion;
    if (compareWith === 'latest') {
      compareVersion = await getLatestFileVersion(targetVersion.fileKey);
    } else if (compareWith) {
      compareVersion = await getFileVersion(compareWith);
    } else {
      // Get previous version
      const { prisma } = await import('@/lib/prisma');
      compareVersion = await prisma.fileVersion.findFirst({
        where: {
          fileKey: targetVersion.fileKey,
          version: { lt: targetVersion.version },
        },
        orderBy: { version: 'desc' },
      });
    }

    if (!compareVersion) {
      return NextResponse.json({
        error: 'No version to compare with',
        message: 'This is the first version of the file',
      }, { status: 404 });
    }

    // Calculate diff
    const diff = calculateDiff(compareVersion.content, targetVersion.content);
    const sections = getChangedSections(diff, 3);
    const stats = getDiffStats(diff);

    return NextResponse.json({
      success: true,
      diff: {
        oldVersion: {
          id: compareVersion.id,
          version: compareVersion.version,
          hash: compareVersion.hash,
        },
        newVersion: {
          id: targetVersion.id,
          version: targetVersion.version,
          hash: targetVersion.hash,
        },
        changes: diff,
        sections,
        stats,
      },
    });
  } catch (error) {
    console.error('Diff API error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate diff', details: error.message },
      { status: 500 }
    );
  }
}

