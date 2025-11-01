import "./globals.css";
import {
    AuthKitProvider,
    Impersonation,
} from "@workos-inc/authkit-nextjs/components";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
    title: "Hackathon",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-background antialiased">
            <AuthKitProvider>
                <Impersonation />
                <div className="flex min-h-screen flex-col">
                    <main className="flex-1 container py-6">
                        {children}
                    </main>
                </div>
            <Toaster />
            </AuthKitProvider>
        </body>
        </html>
    );
}

