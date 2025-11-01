import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

// Run AuthKit middleware on all routes
// The main page (/) is public, home-page requires authentication
export default authkitMiddleware({
    // Optionally override redirect URI for dynamic envs
    ...(process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI
        ? { redirectUri: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI }
        : {}),
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ['/', '/login', '/callback'],
    },
});

// Match all routes to ensure withAuth() works everywhere it's called
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder assets
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
