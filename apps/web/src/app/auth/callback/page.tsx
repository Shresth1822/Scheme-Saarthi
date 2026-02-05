"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/data/api";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if session exists or handle the hash
    const handleCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        router.push("/login?error=auth_failed");
      } else if (session) {
        router.push("/dashboard");
      } else {
        // If we are here but no session, maybe it's just processing the hash.
        // The onAuthStateChange listener below catches the sign-in event.
      }
    };

    handleCallback();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground animate-pulse">
        Verifying your login...
      </p>
    </div>
  );
}
