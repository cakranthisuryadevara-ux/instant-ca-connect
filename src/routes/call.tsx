import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Mic, MicOff, PhoneOff, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { professionals } from "@/data/professionals";

const searchSchema = z.object({
  pro: fallback(z.string(), "p1").default("p1"),
});

export const Route = createFileRoute("/call")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [{ title: "On Call — ZenithBooks" }],
  }),
  component: CallScreen,
});

const FREE_SECONDS = 180;
const PROMPT_AT = 30; // prompt at 2:30 = 30s remaining
const PAID_SECONDS = 600;

function fmt(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function CallScreen() {
  const { pro: proId } = Route.useSearch();
  const navigate = useNavigate();
  const pro = professionals.find((p) => p.id === proId) ?? professionals[0];

  const [remaining, setRemaining] = useState(FREE_SECONDS);
  const [paid, setPaid] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [ended, setEnded] = useState(false);
  const promptedRef = useRef(false);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          setEnded(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [ended]);

  useEffect(() => {
    if (!paid && !promptedRef.current && remaining <= PROMPT_AT && remaining > 0) {
      promptedRef.current = true;
      setShowPrompt(true);
    }
  }, [remaining, paid]);

  const totalDuration = paid ? FREE_SECONDS + PAID_SECONDS : FREE_SECONDS;
  const elapsed = totalDuration - remaining;
  const progress = (elapsed / totalDuration) * 100;

  const handlePay = () => {
    setPaid(true);
    setRemaining((r) => r + PAID_SECONDS);
    setShowPrompt(false);
  };

  const handleEnd = () => {
    setEnded(true);
    setShowPrompt(false);
  };

  if (ended) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-foreground p-4 text-background">
        <div className="max-w-sm rounded-3xl bg-background p-8 text-center text-foreground shadow-[var(--shadow-elevated)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <PhoneOff className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold">Call ended</h2>
          <p className="mt-1 text-sm text-muted-foreground">Thanks for talking with {pro.name}. We hope it helped!</p>
          <div className="mt-6 flex flex-col gap-2">
            <Button asChild className="rounded-full"><Link to="/appointments">View my appointments</Link></Button>
            <Button asChild variant="ghost" className="rounded-full"><Link to="/">Back to home</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-foreground text-background">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="text-xs uppercase tracking-wider text-background/60">
          {paid ? "Paid call · 10 min" : "Free intro · 3 min"}
        </div>
        <Button variant="ghost" size="icon" onClick={handleEnd} className="text-background hover:bg-background/10">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <img src={pro.avatar} alt={pro.name} className="relative h-32 w-32 rounded-full border-4 border-background/20" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">{pro.name}</h1>
        <p className="mt-1 text-sm text-background/60">{pro.qualification} · On call</p>

        <div className="mt-10 font-mono text-6xl font-bold tabular-nums">{fmt(remaining)}</div>
        <div className="mt-3 h-1 w-48 overflow-hidden rounded-full bg-background/15">
          <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }} />
        </div>
        {!paid && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Free intro call
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 pb-12">
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-background/10 text-background backdrop-blur-md transition-colors hover:bg-background/20"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <button
          onClick={handleEnd}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-105"
          aria-label="End call"
        >
          <PhoneOff className="h-6 w-6" />
        </button>
      </div>

      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center">Continue your call?</DialogTitle>
            <DialogDescription className="text-center">
              Your free 3 minutes are almost up. Continue talking with {pro.name} for ₹99 (10 more minutes).
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-col gap-2">
            <Button onClick={handlePay} size="lg" className="w-full rounded-full">Pay ₹99 & Continue</Button>
            <Button onClick={handleEnd} variant="ghost" size="lg" className="w-full rounded-full">End Call</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
