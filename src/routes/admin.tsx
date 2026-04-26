import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, IndianRupee, CalendarCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — ZenithBooks" }] }),
  component: Admin,
});

type Status = "Pending" | "Confirmed" | "Cancelled" | "Completed";

const initial: { id: string; user: string; service: string; pro: string; amount: number; status: Status }[] = [
  { id: "B-1042", user: "Vikas Sharma", service: "GST Filing", pro: "Aanya Mehta", amount: 499, status: "Confirmed" },
  { id: "B-1041", user: "Meera Krishnan", service: "ITR Filing", pro: "Priya Nair", amount: 99, status: "Pending" },
  { id: "B-1040", user: "Ankit Roy", service: "Company Registration", pro: "Rohan Verma", amount: 799, status: "Completed" },
  { id: "B-1039", user: "Sneha Patel", service: "Tax Planning", pro: "Aanya Mehta", amount: 499, status: "Pending" },
  { id: "B-1038", user: "Rajesh Kumar", service: "Audit", pro: "Neha Reddy", amount: 449, status: "Completed" },
  { id: "B-1037", user: "Kavya Iyer", service: "TDS Compliance", pro: "Karan Shah", amount: 599, status: "Cancelled" },
];

const styles: Record<Status, string> = {
  Confirmed: "bg-accent-soft text-accent-foreground border-accent/30",
  Pending: "bg-warning/15 text-foreground border-warning/40",
  Completed: "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

function Admin() {
  const [rows, setRows] = useState(initial);

  const update = (id: string, status: Status) => {
    setRows((arr) => arr.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`${id} marked ${status}`);
  };

  const totalBookings = rows.length;
  const revenue = rows.filter((r) => r.status !== "Cancelled").reduce((s, r) => s + r.amount, 0);
  const pending = rows.filter((r) => r.status === "Pending").length;
  const completed = rows.filter((r) => r.status === "Completed").length;

  const stats = [
    { label: "Total Bookings", value: totalBookings, icon: CalendarCheck, color: "text-primary bg-primary-soft" },
    { label: "Revenue", value: `₹${revenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-accent bg-accent-soft" },
    { label: "Pending", value: pending, icon: TrendingUp, color: "text-foreground bg-warning/15" },
    { label: "Completed", value: completed, icon: Users, color: "text-muted-foreground bg-muted" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage bookings, monitor revenue and platform health.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border/60 p-5">
              <h2 className="text-lg font-semibold">Recent Appointments</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Professional</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell className="font-medium">{r.user}</TableCell>
                      <TableCell>{r.service}</TableCell>
                      <TableCell className="text-muted-foreground">{r.pro}</TableCell>
                      <TableCell>₹{r.amount}</TableCell>
                      <TableCell><Badge variant="outline" className={`rounded-full ${styles[r.status]}`}>{r.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button size="sm" variant="outline" className="h-7 rounded-full text-xs" onClick={() => update(r.id, "Confirmed")} disabled={r.status === "Confirmed"}>Confirm</Button>
                          <Button size="sm" variant="ghost" className="h-7 rounded-full text-xs" onClick={() => toast.info("Reschedule modal")}>Reschedule</Button>
                          <Button size="sm" variant="ghost" className="h-7 rounded-full text-xs text-destructive hover:text-destructive" onClick={() => update(r.id, "Cancelled")} disabled={r.status === "Cancelled"}>Cancel</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
