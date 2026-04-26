import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { dummyAppointments } from "@/data/professionals";
import { toast } from "sonner";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [{ title: "My Appointments — ZenithBooks" }],
  }),
  component: Appointments,
});

const statusStyles: Record<string, string> = {
  Confirmed: "bg-accent-soft text-accent-foreground border-accent/30",
  Pending: "bg-warning/15 text-foreground border-warning/40",
  Completed: "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

function Appointments() {
  const [items, setItems] = useState(dummyAppointments);

  const cancel = (id: string) => {
    setItems((arr) => arr.map((a) => (a.id === id ? { ...a, status: "Cancelled" as const } : a)));
    toast.success("Appointment cancelled");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">My Appointments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your upcoming and past consultations.</p>

          <div className="mt-6 space-y-3">
            {items.map((a) => (
              <div key={a.id} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{a.professionalName}</h3>
                    <Badge variant="outline" className={`rounded-full ${statusStyles[a.status]}`}>{a.status}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{a.service}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {a.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.time}</span>
                  </div>
                </div>
                {(a.status === "Confirmed" || a.status === "Pending") && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info("Reschedule flow coming soon")}>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => cancel(a.id)} className="text-destructive">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Need to talk to someone new?</p>
            <Button asChild className="mt-3 rounded-full"><Link to="/professionals">Book another call</Link></Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
