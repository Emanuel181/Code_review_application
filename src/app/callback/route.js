import { handleAuth } from '@workos-inc/authkit-nextjs';
import { syncUser } from '@/lib/sync-user';

const baseOptions = {
    returnPathname: '/home-page',
    ...(process.env.APP_BASE_URL ? { baseURL: process.env.APP_BASE_URL } : {}),
};

export const GET = handleAuth({
    ...baseOptions,
    onSuccess: async ({ user }) => {
        await syncUser(user);
    },
});

