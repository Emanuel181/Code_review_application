import { NextResponse } from 'next/server';
import { withAuth } from "@workos-inc/authkit-nextjs";
import { applyFix, mapIssueToFixType } from '@/lib/fixes/fix-registry';
import { uploadFile } from '@/lib/s3';

/**
 * Apply a fix to a file
 */
export async function POST(request) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code, issue, fixId, fileKey } = await request.json();

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

    const result = applyFix(code, fixType, fixId, issue.line);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // Optionally save to S3 if fileKey provided
    if (fileKey) {
      try {
        const buffer = Buffer.from(result.code, 'utf-8');
        await uploadFile(fileKey, buffer);
      } catch (uploadError) {
        console.error('Failed to upload fixed file:', uploadError);
        return NextResponse.json({
          success: true,
          code: result.code,
          fixApplied: result.fixApplied,
          warning: 'Fix applied but failed to save to storage',
        });
      }
    }

    return NextResponse.json({
      success: true,
      code: result.code,
      fixApplied: result.fixApplied,
      saved: !!fileKey,
    });
  } catch (error) {
    console.error('Apply fix API error:', error);
    return NextResponse.json(
      { error: 'Failed to apply fix', details: error.message },
      { status: 500 }
    );
  }
}

