import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';
import { deleteFile } from '@/lib/s3';

export async function DELETE(request) {
    const { user } = await withAuth();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { key } = await request.json();

        // Verify the file belongs to the user (key should start with userId/)
        if (!key.startsWith(`${user.id}/`)) {
            return NextResponse.json({ error: 'Unauthorized to delete this file' }, { status: 403 });
        }

        await deleteFile(key);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete file:', error);
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}

