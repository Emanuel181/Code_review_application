"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ChatInterface() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-2xl font-bold mb-4">Chat feature removed</h1>
      <p className="text-muted-foreground mb-6">The AI chat feature has been removed from this application.</p>
      <Link href="/home-page">
        <Button>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
