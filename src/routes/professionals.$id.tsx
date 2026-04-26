import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Star, Languages, Briefcase, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { professionals, reviews } from "@/data/professionals";

export const Route = createFileRoute("/professionals/$id")({
  loader: ({ params }) => {
    const pro = professionals.find((p) => p.id === params.id);
    if (!pro) throw notFound();
    return { pro };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.pro.name ?? "Professional"} — ZenithBooks` },
      { name: "description", content: loaderData?.pro.bio ?? "Book a consultation." },
      { property: "og:title", content: `${loaderData?.pro.name} — ${loaderData?.pro.qualification}` },
      { property: "og:description", content: loaderData?.pro.bio ?? "" },
    ],
  }),
  component: ProfilePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold">Professional not found</p>
        <Button asChild variant="link"><Link to="/professionals">Back to listings</Link></Button>
      </div>
    </div>
  ),
});

function ProfilePage() {
  const { pro } = Route.useLoaderData() as { pro: typeof professionals[number] };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <img src={pro.avatar} alt={pro.name} className="h-24 w-24 rounded-2xl border border-border/60" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{pro.name}</h1>
                    {pro.verified && <BadgeCheck className="h-5 w-5 text-accent" />}
                  </div>
                  <p className="mt-1 text-muted-foreground">{pro.qualification} · {pro.experience} years experience</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                    <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> <strong>{pro.rating}</strong> ({pro.reviews} reviews)</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Languages className="h-4 w-4" /> {pro.languages.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pro.bio}</p>
              <h3 className="mt-5 flex items-center gap-2 text-sm font-semibold"><Briefcase className="h-4 w-4" /> Expertise</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {pro.expertise.map((e) => <Badge key={e} variant="secondary" className="rounded-full">{e}</Badge>)}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold">Reviews</h2>
              <div className="mt-4 space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="border-t border-border/60 pt-4 first:border-0 first:pt-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{r.name}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {r.rating}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="rounded-xl bg-accent-soft p-3 text-sm">
                <div className="flex items-center gap-1.5 font-semibold text-accent-foreground">
                  <Sparkles className="h-4 w-4" /> Free 3-min intro call
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">No card required for first-time users</p>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">₹{pro.price}<span className="text-sm font-normal text-muted-foreground"> / consultation</span></div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Available today</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {pro.slots.map((s) => (
                    <div key={s} className="rounded-lg border border-border bg-background py-2 text-center text-sm">{s}</div>
                  ))}
                </div>
              </div>
              <Button asChild className="mt-5 w-full rounded-full" size="lg">
                <Link to="/book-appointment" search={{ pro: pro.id }}>
                  <Phone className="mr-2 h-4 w-4" /> Book Free 3-min Call
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
