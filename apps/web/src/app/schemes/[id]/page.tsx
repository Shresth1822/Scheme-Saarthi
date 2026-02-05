"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/data/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  Share2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Scheme {
  id: string;
  title: string;
  description: string;
  ministry: string;
  state: string;
  eligible_amount?: string;
  application_url?: string;
  beneficiary_type?: string[];
}

export default function SchemeDetailsPage() {
  const params = useParams();
  const { id } = params;

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchScheme = async () => {
      try {
        const { data, error } = await supabase
          .from("schemes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error(error);
          setError(true);
        } else {
          setScheme(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Scheme Not Found</h1>
        <p className="text-muted-foreground">
          The scheme you are looking for does not exist or has been removed.
        </p>
        <Link href="/schemes">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schemes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          href="/schemes"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
              {scheme.ministry}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {scheme.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {scheme.state}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Updated recently
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            {scheme.application_url && (
              <a
                href={scheme.application_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Overview
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {scheme.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Benefits
              </h2>
              {/* Placeholder for benefits if structured data exists */}
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                {scheme.eligible_amount ? (
                  <li>Financial Assistance: {scheme.eligible_amount}</li>
                ) : (
                  <li>See official guidelines for benefit details.</li>
                )}
              </ul>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eligibility Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">State</span>
                  <span className="font-medium">{scheme.state}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Ministry</span>
                  <span className="font-medium text-right">
                    {scheme.ministry}
                  </span>
                </div>
                {/* Add more arbitrary fields from Supabase JSON if needed */}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Need help applying?</h3>
                <p className="text-indigo-100 text-sm">
                  Get step-by-step guidance on how to avail this scheme.
                </p>
                <Button variant="secondary" className="w-full text-primary">
                  View Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
