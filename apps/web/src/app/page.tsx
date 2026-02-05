import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navbar */}
      <header className="px-6 h-16 flex items-center justify-between border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          SchemeSaarthi
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/schemes">Explore Schemes</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24 text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-600">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
            India's AI-Powered Scheme Discovery Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            Find Government Schemes <br />
            <span className="text-primary">That You Deserve</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
            Stop searching through endless PDFs. Enter your details and let our
            engine match you with the right benefits instantly.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="rounded-full text-lg h-14 px-10"
              asChild
            >
              <Link href="/schemes">
                Check Eligibility <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Search className="h-8 w-8 text-primary" />}
            title="Smart Search"
            description="Search by category, ministry, or keywords using our fast search engine."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-green-600" />}
            title="Eligibility Check"
            description="Answer a few questions and get a personalized list of schemes you qualify for."
          />
          <FeatureCard
            icon={
              <div className="h-8 w-8 font-bold text-2xl text-blue-600">₹</div>
            }
            title="Benefit Tracking"
            description="Keep track of benefits, deadlines, and required documents in one place."
          />
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500 border-t">
        <p>© 2024 SchemeSaarthi. Built for India.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm hover:shadow-md transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
