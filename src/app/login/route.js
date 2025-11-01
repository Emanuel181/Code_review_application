import { getSignInUrl } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

export const GET = async () => {
    const signInUrl = await getSignInUrl({
        ...(process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI
            ? { redirectUri: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI }
            : {}),
    });

    return redirect(signInUrl);
};
