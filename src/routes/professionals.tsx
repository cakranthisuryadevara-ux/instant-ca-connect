import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { professionals } from "@/data/professionals";

export const Route = createFileRoute("/professionals")({
  head: () => ({
    meta: [
      { title: "Find a CA / CS / CMA — QuickStart" },
      { name: "description", content: "Browse verified Chartered Accountants, Company Secretaries and CMAs. Filter by service, price, rating and experience." },
      { property: "og:title", content: "Find Verified Finance Professionals" },
      { property: "og:description", content: "Filter by service, price, rating and experience." },
    ],
  }),
  component: ProfessionalsPage,
});

function ProfessionalsPage() {
  const [service, setService] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minRating, setMinRating] = useState("0");
  const [minExp, setMinExp] = useState("0");

  const filtered = useMemo(() => {
    return professionals.filter((p) => {
      if (service !== "all" && !p.expertise.some((e) => e.toLowerCase().includes(service.toLowerCase()))) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < parseFloat(minRating)) return false;
      if (p.experience < parseInt(minExp)) return false;
      return true;
    });
  }, [service, maxPrice, minRating, minExp]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Verified Professionals</h1>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} experts available right now</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-20">
              <h2 className="mb-4 text-sm font-semibold">Filters</h2>
              <div className="space-y-5">
                <div>
                  <Label className="text-xs">Service</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All services</SelectItem>
                      <SelectItem value="GST">GST</SelectItem>
                      <SelectItem value="ITR">ITR Filing</SelectItem>
                      <SelectItem value="Company">Company Registration</SelectItem>
                      <SelectItem value="Audit">Audit</SelectItem>
                      <SelectItem value="Tax">Tax Planning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Max price: ₹{maxPrice}</Label>
                  <Slider value={[maxPrice]} onValueChange={(v) => setMaxPrice(v[0])} min={100} max={1500} step={50} className="mt-3" />
                </div>
                <div>
                  <Label className="text-xs">Min rating</Label>
                  <Select value={minRating} onValueChange={setMinRating}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="4">4.0+</SelectItem>
                      <SelectItem value="4.5">4.5+</SelectItem>
                      <SelectItem value="4.8">4.8+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Min experience</Label>
                  <Select value={minExp} onValueChange={setMinExp}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="3">3+ years</SelectItem>
                      <SelectItem value="5">5+ years</SelectItem>
                      <SelectItem value="10">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((p) => <ProfessionalCard key={p.id} pro={p} />)}
              {filtered.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
                  No professionals match your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
