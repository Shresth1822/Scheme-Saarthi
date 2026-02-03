// Basic client
import { createClient } from "@supabase/supabase-js";

// Initializing Supabase (if we use direct Supabase calls)
// Note: We need env vars in apps/web/.env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Export a typed client if we generated types (skipped for now)
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

// FastAPI Client
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function checkEligibility(data: any) {
  try {
    const res = await fetch(`${API_URL}/api/check-eligibility`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_profile: data }),
    });

    if (!res.ok) throw new Error("API call failed");

    return await res.json();
  } catch (error) {
    console.error("Eligibility check failed", error);
    return null;
  }
}
