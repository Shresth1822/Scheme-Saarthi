import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, MapPin } from "lucide-react";

interface Scheme {
  id: string;
  title: string;
  description: string;
  ministry: string;
  state: string;
  funding_pattern?: string;
}

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl">{scheme.title}</CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Building2 className="h-4 w-4" /> {scheme.ministry}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {scheme.state}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {scheme.description || "No description available."}
        </p>
        <div className="flex justify-end">
          <Link href={`/schemes/${scheme.id}`}>
            <Button variant="outline" size="sm">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
