import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <span className="font-display text-lg leading-none">Z</span>
            <span className="absolute inset-0 bg-[var(--gradient-shine)] opacity-60" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight">Quick<span className="font-display italic">Start</span></span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Finance, refined</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: "/professionals", label: "Find a Pro" },
            { to: "/appointments", label: "Appointments" },
            { to: "/admin", label: "Admin" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="rounded-full bg-foreground text-background shadow-[var(--shadow-card)] hover:bg-foreground/90">
          <Link to="/professionals">Book Free Call</Link>
        </Button>
      </div>
    </header>
  );
}
