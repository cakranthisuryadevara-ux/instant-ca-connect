import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ShieldCheck, Star, Sparkles, Receipt, FileText, Building2, Calculator, TrendingUp, Phone, Clock, Users, ArrowUpRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
          <div className="absolute inset-0 -z-10 bg-[var(--gradient-soft)]" />
          {/* floating glass orbs */}
          <div className="pointer-events-none absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-hero)" }} />
          <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-80 w-80 rounded-full opacity-30 blur-3xl" style={{ background: "linear-gradient(135deg, var(--accent), transparent)" }} />

          <div className="container relative mx-auto px-4 pb-20 pt-14 md:pb-28 md:pt-20">
            <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-medium text-foreground shadow-[var(--shadow-card)] backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Free 3-minute intro call · No card required
              </div>

              <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
                Talk to <span className="font-display italic text-gradient">verified CAs</span>
                <br />
                in sixty seconds.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
                Curated Chartered Accountants, Company Secretaries and CMAs — on demand.
                One call away from clarity on GST, ITR, MCA filings and more.
              </p>

              <div className="mx-auto mt-9 flex max-w-xl items-center gap-1 rounded-full border border-border/60 bg-card p-1.5 shadow-[var(--shadow-elevated)]">
                <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
                <Input placeholder="GST notice, ITR filing, company registration…" className="h-10 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0" />
                <Button asChild className="h-10 rounded-full bg-foreground text-background hover:bg-foreground/90">
                  <Link to="/professionals">
                    Find a pro
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> ICAI verified</span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> 4.8 avg rating</span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> 10,000+ consultations</span>
              </div>
            </div>

            {/* Marquee strip of trust badges */}
            <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden">
              <div className="flex items-center justify-around gap-8 opacity-60 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
                {["GST", "ITR", "TDS", "MCA", "ROC", "Audit", "DPR", "Tax Planning"].map((t) => (
                  <div key={t} className="font-display text-xl tracking-tight text-foreground/70 md:text-2xl">{t}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular services */}
        <section className="container mx-auto px-4 py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Services</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Everything your books need.</h2>
            </div>
            <Link to="/professionals" className="hidden items-center gap-1 text-sm font-medium text-foreground hover:opacity-70 md:inline-flex">
              All services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <Link
                  key={s.id}
                  to="/professionals"
                  className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground transition-all group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold tracking-tight">{s.name}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">From ₹{349 + i * 50}</div>
                  </div>
                  <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 -z-10 bg-[var(--gradient-soft)] opacity-60" />
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">How it works</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Three steps. <span className="font-display italic">Sixty seconds.</span>
              </h2>
            </div>
            <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
              {[
                { icon: Search, title: "Find your expert", desc: "Browse hand-picked, verified CAs, CSs and CMAs filtered by service." },
                { icon: Clock, title: "Pick a time", desc: "Most professionals are online today. Choose any open slot." },
                { icon: Phone, title: "Talk on call", desc: "Begin with a complimentary 3-min intro. Continue at ₹99 / 10 min." },
              ].map((step, i) => (
                <div key={step.title} className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl text-foreground/10">0{i + 1}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                      <step.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured pros */}
        <section className="container mx-auto px-4 py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Featured</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Top-rated <span className="font-display italic">professionals</span></h2>
              <p className="mt-2 text-sm text-muted-foreground">Verified, reviewed, ready to talk today.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/professionals">View all <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {professionals.slice(0, 3).map((p) => <ProfessionalCard key={p.id} pro={p} />)}
          </div>
        </section>

        {/* Testimonial */}
        <section className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-card p-10 text-center shadow-[var(--shadow-card)]">
            <Quote className="mx-auto h-8 w-8 text-foreground/15" />
            <p className="mt-4 text-balance font-display text-2xl leading-snug md:text-3xl">
              “Got my GST notice resolved in a single 12-minute call. Felt like having a CFO on speed-dial.”
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <div className="h-9 w-9 rounded-full bg-[var(--gradient-hero)]" />
              <div className="text-left">
                <div className="font-semibold">Vikas Sharma</div>
                <div className="text-xs text-muted-foreground">Founder, Kindred Studio</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-20 pt-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--gradient-ink)] p-10 text-ink-foreground shadow-[var(--shadow-elevated)] md:p-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-hero)" }} />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "linear-gradient(135deg, var(--accent), transparent)" }} />
            <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-60">Limited offer</div>
                <h2 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Your first <span className="font-display italic">three minutes</span> are on us.
                </h2>
                <p className="mt-4 max-w-md text-base opacity-75">
                  Book a complimentary intro call with a verified CA right now. No card required.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Button asChild size="lg" className="rounded-full bg-background text-foreground shadow-[var(--shadow-glow)] hover:bg-background/90">
                  <Link to="/professionals">
                    Book free intro call
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <span className="text-xs opacity-60">⌘ Avg. response under 2 minutes</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
