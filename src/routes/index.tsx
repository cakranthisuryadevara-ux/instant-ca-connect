import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ShieldCheck, Star, Sparkles, Receipt, FileText, Building2, Calculator, TrendingUp, Phone, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { professionals, services } from "@/data/professionals";

const iconMap = { Receipt, FileText, Building2, ShieldCheck, Calculator, TrendingUp };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZenithBooks — Talk to Verified CAs Instantly" },
      { name: "description", content: "Book consultation calls with verified Chartered Accountants, Company Secretaries and CMAs. Free 3-minute intro call." },
      { property: "og:title", content: "ZenithBooks — Talk to Verified CAs Instantly" },
      { property: "og:description", content: "Verified finance professionals on demand. Free 3-minute intro call." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-soft)]" />
          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-5 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-primary">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Free 3-min intro call available
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
                Talk to <span className="bg-[var(--gradient-hero)] bg-clip-text text-transparent">Verified CAs</span> Instantly
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
                Get expert advice from Chartered Accountants, Company Secretaries and CMAs. Book a call in under 60 seconds.
              </p>

              <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-2 shadow-[var(--shadow-card)]">
                <Search className="ml-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search GST, ITR, Company Registration..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
                <Button asChild className="rounded-full">
                  <Link to="/professionals">Search</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Verified pros</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> 4.8 avg rating</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> 10k+ consultations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular services */}
        <section className="container mx-auto px-4 py-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">Popular services</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <Link
                  key={s.id}
                  to="/professionals"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{s.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">How it works</h2>
            <p className="mt-2 text-center text-muted-foreground">Three steps. Sixty seconds. One trusted call.</p>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
              {[
                { icon: Search, title: "Find your expert", desc: "Browse verified CAs, CSs and CMAs by service." },
                { icon: Clock, title: "Pick a time", desc: "Choose any available slot — most pros are online today." },
                { icon: Phone, title: "Talk on call", desc: "Start with a free 3-min intro. Continue for ₹99/10 min." },
              ].map((step, i) => (
                <div key={step.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">{i + 1}</div>
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured pros */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Top rated professionals</h2>
              <p className="mt-1 text-sm text-muted-foreground">Verified, reviewed, ready to talk.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/professionals">View all</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {professionals.slice(0, 3).map((p) => <ProfessionalCard key={p.id} pro={p} />)}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--gradient-hero)] p-10 text-center text-primary-foreground shadow-[var(--shadow-elevated)] md:p-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Your first 3 minutes are on us</h2>
            <p className="mx-auto mt-3 max-w-xl opacity-90">Book a free intro call with a verified CA right now. No card needed.</p>
            <Button asChild size="lg" variant="secondary" className="mt-6 rounded-full">
              <Link to="/professionals">Book Free Intro Call</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
