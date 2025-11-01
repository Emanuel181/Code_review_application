"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { handleSignOutAction } from "@/app/actions/signOut";
import { LogIn, LogOut, Loader2 } from "lucide-react";

export function SignInButton({ variant = "default", size = "default", className }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Button variant="ghost" size={size} disabled className={className}>
                <Loader2 className="animate-spin" />
                Loading...
            </Button>
        );
    }

    if (user) {
        return (
            <form action={handleSignOutAction}>
                <Button type="submit" variant={variant} size={size} className={className}>
                    <LogOut />
                    Sign Out
                </Button>
            </form>
        );
    }

    return (
        <Button asChild variant={variant} size={size} className={className}>
            <a href="/login">
                <LogIn />
                Sign In
            </a>
        </Button>
    );
}

