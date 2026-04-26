import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Star, Languages, Briefcase, Sparkles, Phone, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StarRating } from "@/components/StarRating";
import {
  professionals,
  reviews as seedReviews,
  RATING_CRITERIA,
  reviewAverage,
  type CriteriaRatings,
  type Review,
  type CriterionKey,
} from "@/data/professionals";

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

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60),
  text: z.string().trim().min(10, "Please write at least 10 characters").max(500),
});

const emptyRatings: CriteriaRatings = {
  accuracy: 0, speed: 0, communication: 0, knowledge: 0, value: 0,
};

function ProfilePage() {
  const { pro } = Route.useLoaderData() as { pro: typeof professionals[number] };
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [ratings, setRatings] = useState<CriteriaRatings>(emptyRatings);

  const aggregate = useMemo(() => {
    const sum: CriteriaRatings = { ...emptyRatings };
    reviews.forEach((r) => RATING_CRITERIA.forEach((c) => { sum[c.key] += r.ratings[c.key]; }));
    const out = {} as CriteriaRatings;
    RATING_CRITERIA.forEach((c) => { out[c.key] = reviews.length ? +(sum[c.key] / reviews.length).toFixed(1) : 0; });
    return out;
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = reviewSchema.safeParse({ name, text });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const missing = RATING_CRITERIA.find((c) => ratings[c.key] === 0);
    if (missing) {
      toast.error(`Please rate "${missing.label}"`);
      return;
    }
    const newReview: Review = {
      id: `r${Date.now()}`,
      name: parsed.data.name,
      text: parsed.data.text,
      date: "Just now",
      ratings,
    };
    setReviews([newReview, ...reviews]);
    setName(""); setText(""); setRatings(emptyRatings);
    toast.success("Thanks! Your review has been added.");
  };

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
                    <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> <strong>{pro.rating}</strong> ({reviews.length} reviews)</span>
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
              <h2 className="text-lg font-semibold">Rating breakdown</h2>
              <p className="mt-1 text-xs text-muted-foreground">Based on {reviews.length} customer reviews</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {RATING_CRITERIA.map((c) => {
                  const v = aggregate[c.key as CriterionKey];
                  return (
                    <div key={c.key} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background px-3 py-2">
                      <span className="text-sm font-medium">{c.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${(v / 5) * 100}%` }} />
                        </div>
                        <span className="w-8 text-right text-sm font-semibold tabular-nums">{v.toFixed(1)}</span>
                      </div>
                    </div>
                  );
                })}
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
                        <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {reviewAverage(r.ratings).toFixed(1)}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      {RATING_CRITERIA.map((c) => (
                        <span key={c.key}>{c.label}: <span className="font-medium text-foreground">{r.ratings[c.key as CriterionKey]}</span></span>
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold">Write a review</h2>
              <p className="mt-1 text-xs text-muted-foreground">Rate this professional on each criterion</p>

              <div className="mt-4 space-y-3">
                {RATING_CRITERIA.map((c) => (
                  <div key={c.key} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background px-3 py-2">
                    <Label className="text-sm">{c.label}</Label>
                    <StarRating
                      value={ratings[c.key as CriterionKey]}
                      onChange={(v) => setRatings((r) => ({ ...r, [c.key]: v }))}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="reviewer-name" className="text-xs">Your name</Label>
                  <Input id="reviewer-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="e.g. Vikas S." className="mt-1.5" />
                </div>
              </div>

              <div className="mt-3">
                <Label htmlFor="reviewer-text" className="text-xs">Your review</Label>
                <Textarea id="reviewer-text" value={text} onChange={(e) => setText(e.target.value)} maxLength={500} rows={3} placeholder="Share your experience…" className="mt-1.5" />
                <p className="mt-1 text-right text-[11px] text-muted-foreground">{text.length}/500</p>
              </div>

              <Button type="submit" className="mt-4 rounded-full">
                <Send className="mr-2 h-4 w-4" /> Submit review
              </Button>
            </form>
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
