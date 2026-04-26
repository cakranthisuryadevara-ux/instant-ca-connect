import { Link } from "@tanstack/react-router";
import { Star, BadgeCheck, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Professional } from "@/data/professionals";

export function ProfessionalCard({ pro }: { pro: Professional }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-start gap-4">
        <img src={pro.avatar} alt={pro.name} className="h-16 w-16 rounded-2xl border border-border/60 object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-semibold">{pro.name}</h3>
            {pro.verified && <BadgeCheck className="h-4 w-4 text-accent" />}
          </div>
          <p className="text-sm text-muted-foreground">
            {pro.qualification} · {pro.experience} yrs exp
          </p>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-medium">{pro.rating}</span>
            <span className="text-muted-foreground">({pro.reviews})</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {pro.expertise.slice(0, 5).map((e) => (
          <Badge key={e} variant="secondary" className="rounded-full font-normal">{e}</Badge>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Languages className="h-3.5 w-3.5" />
        {pro.languages.join(", ")}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <div>
          <div className="text-lg font-bold">₹{pro.price}</div>
          <div className="text-xs text-muted-foreground">per consultation</div>
        </div>
        <Button asChild size="sm" className="rounded-full">
          <Link to="/professionals/$id" params={{ id: pro.id }}>Book Now</Link>
        </Button>
      </div>
    </div>
  );
}
