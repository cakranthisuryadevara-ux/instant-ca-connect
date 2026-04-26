import { Link } from "@tanstack/react-router";
import { Star, BadgeCheck, Languages, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Professional } from "@/data/professionals";

export function ProfessionalCard({ pro }: { pro: Professional }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]">
      {/* subtle gradient wash on hover */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(80% 60% at 100% 0%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 60%)" }} />

      <div className="flex items-start gap-4">
        <div className="relative">
          <img src={pro.avatar} alt={pro.name} className="h-16 w-16 rounded-2xl border border-border/60 object-cover" />
          {pro.verified && (
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background shadow-[var(--shadow-card)]">
              <BadgeCheck className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight">{pro.name}</h3>
            <span className="rounded-full border border-border/70 bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{pro.qualification}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{pro.experience} years · {pro.languages.slice(0, 2).join(" · ")}</p>
          <div className="mt-1.5 flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-semibold tabular-nums">{pro.rating}</span>
            <span className="text-xs text-muted-foreground">({pro.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {pro.expertise.slice(0, 5).map((e) => (
          <Badge key={e} variant="secondary" className="rounded-full border border-border/60 bg-background px-2.5 py-0.5 text-[11px] font-medium text-foreground/80">
            {e}
          </Badge>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Languages className="h-3 w-3" />
        {pro.languages.join(" · ")}
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-dashed border-border/70 pt-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl">₹{pro.price}</span>
            <span className="text-[11px] text-muted-foreground">/ session</span>
          </div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-foreground/70">First 3 min free</div>
        </div>
        <Button asChild size="sm" className="group/btn rounded-full bg-foreground text-background hover:bg-foreground/90">
          <Link to="/professionals/$id" params={{ id: pro.id }}>
            Book
            <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
