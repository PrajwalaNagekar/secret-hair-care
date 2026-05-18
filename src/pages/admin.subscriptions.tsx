import { ADMIN_SUBSCRIPTIONS, statusTone, formatINR } from "@/lib/back-office-data";



function AdminSubscriptions() {
  const mrr = ADMIN_SUBSCRIPTIONS.filter((s) => s.status === "Active").reduce((sum, s) => sum + s.pricePerCycle, 0);
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Active subscribers</p>
          <p className="mt-1 font-serif text-3xl font-semibold">{ADMIN_SUBSCRIPTIONS.filter((s) => s.status === "Active").length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Recurring revenue / cycle</p>
          <p className="mt-1 font-serif text-3xl font-semibold">{formatINR(mrr)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Avg adherence</p>
          <p className="mt-1 font-serif text-3xl font-semibold">{Math.round(ADMIN_SUBSCRIPTIONS.reduce((s, x) => s + x.adherence, 0) / ADMIN_SUBSCRIPTIONS.length)}%</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-foreground/60">
            <tr>
              <th className="px-5 py-3">Subscription</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3 hidden md:table-cell">Plan</th>
              <th className="px-5 py-3 hidden lg:table-cell">Started</th>
              <th className="px-5 py-3 hidden md:table-cell">Next billing</th>
              <th className="px-5 py-3">Cycles</th>
              <th className="px-5 py-3">Adherence</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {ADMIN_SUBSCRIPTIONS.map((s, i) => (
              <tr key={s.id} className={i % 2 ? "bg-background/40" : ""}>
                <td className="px-5 py-3 font-semibold">{s.id}</td>
                <td className="px-5 py-3">{s.customer}</td>
                <td className="px-5 py-3 hidden md:table-cell">{s.plan}</td>
                <td className="px-5 py-3 hidden lg:table-cell text-foreground/70">{s.startDate}</td>
                <td className="px-5 py-3 hidden md:table-cell text-foreground/70">{s.nextBilling}</td>
                <td className="px-5 py-3">{s.cyclesCompleted}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-foreground" style={{ width: `${s.adherence}%` }} />
                    </div>
                    <span className="text-xs">{s.adherence}%</span>
                  </div>
                </td>
                <td className="px-5 py-3"><span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(s.status)}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSubscriptions;
