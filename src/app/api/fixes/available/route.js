import { NextResponse } from 'next/server';
import { withAuth } from "@workos-inc/authkit-nextjs";
import { getFixesForIssue, previewFix, applyFix, mapIssueToFixType } from '@/lib/fixes/fix-registry';

/**
 * Get available fixes for an issue
 */
export async function POST(request) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { issue } = await request.json();

    if (!issue) {
      return NextResponse.json({ error: 'issue is required' }, { status: 400 });
    }

    // Map issue to fix type
    const fixType = mapIssueToFixType(issue.message || issue.type);

    if (!fixType) {
      return NextResponse.json({
        success: true,
        fixes: [],
        message: 'No automatic fixes available for this issue',
      });
    }

    const fixes = getFixesForIssue(fixType);

    return NextResponse.json({
      success: true,
      fixes: fixes.map(fix => ({
        id: fix.id,
        label: fix.label,
        description: fix.description,
        confidence: fix.confidence,
        autoApply: fix.autoApply,
        effort: fix.effort,
        timeEstimate: fix.timeEstimate,
      })),
    });
  } catch (error) {
    console.error('Get fixes API error:', error);
    return NextResponse.json(
      { error: 'Failed to get fixes', details: error.message },
      { status: 500 }
    );
  }
}

