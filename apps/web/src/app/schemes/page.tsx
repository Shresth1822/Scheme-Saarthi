"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Need to create Input
import { Button } from "@/components/ui/button";
import { SchemeCard } from "@/components/SchemeCard";
import { Search } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// -- Mock Supabase Client for client-side (until context is fully set) --
// In a real app, use the one from src/data/api.ts or context
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

export default function SchemesPage() {
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch schemes (Debounced search could be better, simplified for now)
  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        let queryBuilder = supabase.from("schemes").select("*");

        if (query) {
          // Basic text search on title
          queryBuilder = queryBuilder.ilike("title", `%${query}%`);
        }

        const { data, error } = await queryBuilder.limit(20);

        if (error) console.error(error);
        else setSchemes(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSchemes, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Explore Schemes</h1>
            <p className="text-muted-foreground">
              Find government benefits relevant to you
            </p>
          </div>
          <div className="flex w-full md:w-[400px] items-center space-x-2">
            <Input
              type="text"
              placeholder="Search by name, ministry relative..."
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              className="bg-white dark:bg-slate-900"
            />
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">
            Loading schemes...
          </div>
        ) : schemes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold">No schemes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
