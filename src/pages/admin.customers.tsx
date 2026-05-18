import { useState } from "react";
import { Search, Mail, Phone } from "lucide-react";
import { ADMIN_CUSTOMERS, formatINR } from "@/lib/back-office-data";



function AdminCustomers() {
  const [q, setQ] = useState("");
  const filtered = ADMIN_CUSTOMERS.filter((c) =>
    q === "" || c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase()) || c.city.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 md:max-w-xs">
          <Search className="h-4 w-4 text-foreground/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40" />
        </div>
        <p className="text-sm text-foreground/60">{filtered.length} customers</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  {c.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-foreground/60">{c.city} · joined {c.joined}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.subscription !== "None" ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-700"}`}>
                {c.subscription === "None" ? "No plan" : c.subscription}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Orders</p>
                <p className="font-serif text-lg font-semibold">{c.orders}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Spent</p>
                <p className="font-serif text-sm font-semibold">{formatINR(c.spent)}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">AI Score</p>
                <p className="font-serif text-lg font-semibold">{c.aiScore}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-foreground/70">
              <p className="flex items-center gap-2"><Mail className="h-3 w-3" /> {c.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-3 w-3" /> {c.phone}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">Hair: {c.hairType}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">Concern: {c.topConcern}</span>
              {c.assignedExpert && <span className="rounded-full bg-[oklch(0.93_0.05_290)] px-2 py-0.5 text-[10px]">{c.assignedExpert}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCustomers;
