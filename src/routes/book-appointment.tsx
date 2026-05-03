import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Sparkles, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { professionals, services } from "@/data/professionals";

const searchSchema = z.object({
  pro: fallback(z.string(), "p1").default("p1"),
});

export const Route = createFileRoute("/book-appointment")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Book a Consultation — QuickStart" },
      { name: "description", content: "Confirm your booking in under 60 seconds. First 3 minutes are free." },
    ],
  }),
  component: BookAppointment,
});

function BookAppointment() {
  const { pro: proId } = Route.useSearch();
  const navigate = useNavigate();
  const pro = professionals.find((p) => p.id === proId) ?? professionals[0];

  const [service, setService] = useState(services[0].id);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState(pro.slots[0]);
  const [query, setQuery] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/call", search: { pro: pro.id } });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Book your consultation</h1>
          <p className="mt-1 text-sm text-muted-foreground">Takes less than 60 seconds.</p>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-accent-foreground">Get your FREE 3-minute intro call</div>
              <div className="text-xs text-muted-foreground">Continue beyond 3 minutes for just ₹99 / 10 mins.</div>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-6 rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
              <img src={pro.avatar} alt={pro.name} className="h-12 w-12 rounded-xl" />
              <div className="flex-1">
                <div className="font-semibold">{pro.name}</div>
                <div className="text-xs text-muted-foreground">{pro.qualification} · {pro.experience} yrs · ₹{pro.price}</div>
              </div>
              <Button asChild type="button" variant="ghost" size="sm"><Link to="/professionals">Change</Link></Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Service</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {services.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Consultation mode</Label>
                <Select value="call" disabled>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Call" /></SelectTrigger>
                  <SelectContent><SelectItem value="call">Phone Call</SelectItem></SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className={cn("mt-1.5 w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))} initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Time slot</Label>
                <Select value={slot} onValueChange={setSlot}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {pro.slots.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>What do you want to discuss?</Label>
              <Textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Got a GST notice, need help responding..." rows={3} className="mt-1.5" />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full">
              <Phone className="mr-2 h-4 w-4" /> Confirm Booking & Start Free Call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
