import { NextResponse } from 'next/server';
import { withAuth } from "@workos-inc/authkit-nextjs";
import { previewFix, mapIssueToFixType } from '@/lib/fixes/fix-registry';

/**
 * Preview a fix without applying it
 */
export async function POST(request) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code, issue, fixId } = await request.json();

    if (!code || !issue || !fixId) {
      return NextResponse.json(
        { error: 'code, issue, and fixId are required' },
        { status: 400 }
      );
    }

    const fixType = mapIssueToFixType(issue.message || issue.type);

    if (!fixType) {
      return NextResponse.json(
        { error: 'No fix available for this issue type' },
        { status: 400 }
      );
    }

    const preview = previewFix(code, fixType, fixId, issue.line);

    return NextResponse.json({
      success: preview.success,
      preview: preview.success ? {
        before: preview.before,
        after: preview.after,
        lineNumber: preview.lineNumber,
        fixApplied: preview.fixApplied,
      } : null,
      error: preview.error,
    });
  } catch (error) {
    console.error('Preview fix API error:', error);
    return NextResponse.json(
      { error: 'Failed to preview fix', details: error.message },
      { status: 500 }
    );
  }
}

