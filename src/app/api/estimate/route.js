import { NextResponse } from 'next/server';
import { withAuth } from "@workos-inc/authkit-nextjs";
import { estimateBatch } from '@/lib/effort-estimator';

/**
 * Estimate effort for issues
 */
export async function POST(request) {
  try {
    const { user } = await withAuth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { issues } = await request.json();

    if (!issues || !Array.isArray(issues)) {
      return NextResponse.json(
        { error: 'issues array is required' },
        { status: 400 }
      );
    }

    if (issues.length === 0) {
      return NextResponse.json({
        success: true,
        estimations: [],
        summary: {
          totalIssues: 0,
          timeEstimate: { min: 0, max: 0, average: 0, unit: 'minutes' },
        },
      });
    }

    const estimation = estimateBatch(issues);

    return NextResponse.json({
      success: true,
      ...estimation,
    });
  } catch (error) {
    console.error('Estimate API error:', error);
    return NextResponse.json(
      { error: 'Failed to estimate effort', details: error.message },
      { status: 500 }
    );
  }
}

