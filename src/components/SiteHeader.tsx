import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/quickstart-logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src={logo} alt="QuickStart logo" width={36} height={36} className="h-9 w-9 rounded-xl shadow-[var(--shadow-glow)]" />
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
