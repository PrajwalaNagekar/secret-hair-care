import { useState } from "react";
import { Search, Mail, Phone, MessageSquare } from "lucide-react";
import { ADMIN_CUSTOMERS, formatINR } from "@/lib/back-office-data";



const ME = "Dr. Aisha Menon";

function ExpertCustomers() {
  const [q, setQ] = useState("");
  const myCustomers = ADMIN_CUSTOMERS.filter((c) => c.assignedExpert === ME);
  const others = ADMIN_CUSTOMERS.filter((c) => c.assignedExpert !== ME);

  const filterFn = (c: typeof ADMIN_CUSTOMERS[number]) => q === "" || c.name.toLowerCase().includes(q.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 md:max-w-md">
        <Search className="h-4 w-4 text-foreground/50" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40" />
      </div>

      <Section title="My customers" subtitle={`${myCustomers.length} active customers assigned to you`} list={myCustomers.filter(filterFn)} highlighted />
      <Section title="Other customers in the network" subtitle="Visible for cross-coverage and second opinions" list={others.filter(filterFn)} />
    </div>
  );
}

function Section({ title, subtitle, list, highlighted }: { title: string; subtitle: string; list: typeof ADMIN_CUSTOMERS; highlighted?: boolean }) {
  return (
    <div>
      <div className="mb-3">
        <h2 className="font-serif text-xl font-semibold">{title}</h2>
        <p className="text-xs text-foreground/60">{subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <div key={c.id} className={`rounded-2xl border bg-card p-5 ${highlighted ? "border-[oklch(0.85_0.06_290)] shadow-sm" : "border-border"}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  {c.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-foreground/60">{c.city}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl font-semibold">{c.aiScore}</p>
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">AI score</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{c.hairType}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{c.topConcern}</span>
              {c.subscription !== "None" && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800">{c.subscription}</span>}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Orders</p>
                <p className="font-serif text-base font-semibold">{c.orders}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Spent</p>
                <p className="font-serif text-sm font-semibold">{formatINR(c.spent)}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground py-2 text-xs font-semibold text-background hover:opacity-90">
                <MessageSquare className="h-3 w-3" /> Chat
              </button>
              <a href={`mailto:${c.email}`} className="rounded-full border border-border p-2 hover:bg-muted" aria-label="Email"><Mail className="h-4 w-4" /></a>
              <a href={`tel:${c.phone}`} className="rounded-full border border-border p-2 hover:bg-muted" aria-label="Call"><Phone className="h-4 w-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpertCustomers;
