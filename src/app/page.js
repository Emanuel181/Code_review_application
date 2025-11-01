import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from 'next/navigation';
import { SignInButton } from "@/components/sign-in-button";

export default async function MainPage() {
    const { user } = await withAuth();

    // If user is already logged in, redirect to home page
    if (user) {
        redirect('/home-page');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
                <p className="text-muted-foreground">Sign in to access your account</p>
            </div>
            <SignInButton size="lg" />
        </div>
    );
}