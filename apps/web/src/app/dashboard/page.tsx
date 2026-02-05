"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/data/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  LogOut,
  User,
  Bookmark,
  TrendingUp,
  FileText,
  ChevronRight,
  Bell,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Navigation Bar */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            SchemeSaarthi
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white dark:ring-slate-800">
              {user.email?.[0].toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-4 p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, {user.email?.split("@")[0]}! 👋
            </h1>
            <p className="text-indigo-100 max-w-xl text-lg">
              You are eligible for{" "}
              <span className="font-bold text-white">12 new schemes</span> this
              week. Check them out before they expire.
            </p>
            <div className="pt-4 flex gap-3">
              <Button
                variant="secondary"
                className="font-semibold"
                onClick={() => router.push("/check-eligibility")}
              >
                Check Eligibility
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                View Profile
              </Button>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute right-0 top-0 h-64 w-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={<Bookmark className="h-5 w-5 text-blue-600" />}
            label="Saved Schemes"
            value="0"
            trend="+0 this week"
          />
          <StatsCard
            icon={<FileText className="h-5 w-5 text-green-600" />}
            label="Applications"
            value="0"
            trend="Action required"
            trendColor="text-orange-500"
          />
          <StatsCard
            icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
            label="Potential Benefits"
            value="₹0"
            trend="Based on profile"
          />
        </div>

        {/* Main Content Split */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Saved Schemes */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Your Saved Schemes
              </h2>
              <Link
                href="/schemes"
                className="text-sm text-primary hover:underline flex items-center"
              >
                Browse All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Empty State Card */}
            <Card className="border-dashed border-2 shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Bookmark className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    No saved schemes yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                    Browse our database and save schemes you're interested in to
                    track them here.
                  </p>
                </div>
                <Button onClick={() => router.push("/schemes")}>
                  Start Exploring
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Menu & Actions */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <ActionMenuItem
                icon={<User />}
                label="My Profile"
                onClick={() => {}}
              />
              <ActionMenuItem
                icon={<FileText />}
                label="Documents"
                onClick={() => {}}
              />
              <ActionMenuItem
                icon={<LogOut className="text-red-500" />}
                label="Logout"
                onClick={handleLogout}
              />
            </div>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="h-24 w-24" />
              </div>
              <CardContent className="p-6 relative z-10">
                <h3 className="font-bold text-lg mb-2">Did you know?</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Over ₹2000 Cr of benefits go unclaimed every year. Update your
                  profile to ensure you don't miss out.
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatsCard({
  icon,
  label,
  value,
  trend,
  trendColor = "text-green-500",
}: {
  icon: any;
  label: string;
  value: string;
  trend: string;
  trendColor?: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {icon}
          </div>
          {/* <Badge variant="outline" className={trendColor}>{trend}</Badge> */}
          <span className={`text-xs font-medium ${trendColor}`}>{trend}</span>
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {value}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionMenuItem({
  icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 font-medium"
    >
      {icon}
      {label}
    </button>
  );
}
