import { ADMIN_CONSULTATIONS, formatINR } from "@/lib/back-office-data";



const ME = "Dr. Aisha Menon";

function ExpertEarnings() {
  const my = ADMIN_CONSULTATIONS.filter((c) => c.expert === ME);
  const completed = my.filter((c) => c.status === "Completed");
  const earned = completed.reduce((s, c) => s + c.fee, 0);
  const upcoming = my.filter((c) => c.status === "Upcoming" || c.status === "Awaiting Notes");
  const projected = upcoming.reduce((s, c) => s + c.fee, 0);

  const series = [
    { m: "Nov", v: 38_500 },
    { m: "Dec", v: 42_300 },
    { m: "Jan", v: 47_800 },
    { m: "Feb", v: 51_200 },
    { m: "Mar", v: 56_600 },
    { m: "Apr", v: 48_400 },
  ];
  const max = Math.max(...series.map((d) => d.v));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">This month</p>
          <p className="mt-1 font-serif text-3xl font-semibold">{formatINR(48_400)}</p>
          <p className="mt-1 text-xs text-emerald-700">+12.3% vs last month</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Year to date</p>
          <p className="mt-1 font-serif text-3xl font-semibold">{formatINR(284_800)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Projected (upcoming)</p>
          <p className="mt-1 font-serif text-3xl font-semibold">{formatINR(projected)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-serif text-xl font-semibold">Earnings trend</h3>
        <div className="mt-6 flex h-48 items-end gap-3">
          {series.map((d) => (
            <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div className="w-full rounded-t-lg bg-foreground transition-all hover:opacity-80" style={{ height: `${(d.v / max) * 100}%` }} />
              </div>
              <span className="text-[11px] font-medium text-foreground/60">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-serif text-xl font-semibold">Recent payouts</h3>
        <p className="text-xs text-foreground/60">Lifetime earned: {formatINR(earned)} · {completed.length} completed consults</p>
        <ul className="mt-4 divide-y divide-border">
          {completed.map((c) => (
            <li key={c.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-semibold">{c.customer}</p>
                <p className="text-xs text-foreground/60">{c.concern} · {c.date}</p>
              </div>
              <span className="text-sm font-semibold">{formatINR(c.fee)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpertEarnings;
