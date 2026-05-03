import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden bg-[var(--gradient-ink)] text-ink-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[var(--gradient-hero)] shadow-[var(--shadow-glow)]">
              <span className="font-display text-xl leading-none">Z</span>
              <span className="absolute inset-0 bg-[var(--gradient-shine)] opacity-50" />
            </div>
            <div className="leading-none">
              <div className="text-base font-semibold tracking-tight">Quick<span className="font-display italic">Start</span></div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] opacity-60">Finance, refined</div>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-70">
            Talk to verified Chartered Accountants, Company Secretaries and CMAs in under sixty seconds.
          </p>
        </div>

        {[
          { title: "Product", links: [["Find a Pro", "/professionals"], ["My Appointments", "/appointments"], ["Admin", "/admin"]] as [string, string][] },
          { title: "Services", links: [["GST Filing", "/professionals"], ["ITR Filing", "/professionals"], ["Company Reg.", "/professionals"]] as [string, string][] },
          { title: "Company", links: [["About", "/"], ["Privacy", "/"], ["Terms", "/"]] as [string, string][] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">{col.title}</div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm opacity-80 transition-opacity hover:opacity-100">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-60 md:flex-row">
          <span>© {new Date().getFullYear()} QuickStart. All rights reserved.</span>
          <span>Made for founders, freelancers and finance teams.</span>
        </div>
      </div>
    </footer>
  );
}
