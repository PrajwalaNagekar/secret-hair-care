import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, ShoppingCart, Users, Stethoscope, Sparkles, Truck, Repeat } from "lucide-react";
import {
  ADMIN_ORDERS,
  ADMIN_CUSTOMERS,
  ADMIN_CONSULTATIONS,
  ADMIN_AI,
  ADMIN_SUBSCRIPTIONS,
  ADMIN_REVENUE_SERIES,
  ADMIN_TOP_PRODUCTS,
  ADMIN_SHIPMENTS,
  formatINR,
  statusTone,
} from "@/lib/back-office-data";
import { WEB_PRODUCTS } from "@/lib/web-data";



function AdminDashboard() {
  const totalRevenue = ADMIN_ORDERS.filter((o) => o.status !== "Cancelled" && o.status !== "Refunded").reduce((s, o) => s + o.total, 0);
  const pendingOrders = ADMIN_ORDERS.filter((o) => o.status === "Pending" || o.status === "Processing").length;
  const upcomingConsults = ADMIN_CONSULTATIONS.filter((c) => c.status === "Upcoming" || c.status === "Awaiting Notes").length;
  const activeSubs = ADMIN_SUBSCRIPTIONS.filter((s) => s.status === "Active").length;
  const aiToReview = ADMIN_AI.filter((a) => !a.expertReviewed).length;
  const inTransit = ADMIN_SHIPMENTS.filter((s) => s.status === "In transit" || s.status === "Out for delivery").length;

  const stats = [
    { label: "Revenue (7d)", value: formatINR(totalRevenue), delta: "+18.4%", icon: TrendingUp, tint: "bg-[oklch(0.93_0.06_60)]" },
    { label: "Orders to fulfil", value: pendingOrders, delta: "Action needed", icon: ShoppingCart, tint: "bg-[oklch(0.92_0.05_45)]" },
    { label: "Customers", value: ADMIN_CUSTOMERS.length, delta: "+3 this week", icon: Users, tint: "bg-[oklch(0.93_0.05_140)]" },
    { label: "Upcoming consults", value: upcomingConsults, delta: "Today + tomorrow", icon: Stethoscope, tint: "bg-[oklch(0.93_0.05_290)]" },
    { label: "AI plans to review", value: aiToReview, delta: "Awaiting expert", icon: Sparkles, tint: "bg-[oklch(0.93_0.05_80)]" },
    { label: "Shipments live", value: inTransit, delta: "On the road", icon: Truck, tint: "bg-[oklch(0.92_0.05_220)]" },
    { label: "Active subscriptions", value: activeSubs, delta: "Smart Refill + Recovery", icon: Repeat, tint: "bg-[oklch(0.93_0.05_50)]" },
  ];

  const maxRev = Math.max(...ADMIN_REVENUE_SERIES.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* Stat grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tint} text-foreground`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">{s.delta}</span>
              </div>
              <p className="mt-4 text-xs font-medium text-foreground/60">{s.label}</p>
              <p className="mt-1 font-serif text-3xl font-semibold">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Revenue this week</p>
              <h2 className="font-serif text-2xl font-semibold">{formatINR(ADMIN_REVENUE_SERIES.reduce((s, d) => s + d.value, 0))}</h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">+18.4%</span>
          </div>
          <div className="flex h-48 items-end gap-3">
            {ADMIN_REVENUE_SERIES.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-lg bg-foreground transition-all hover:opacity-80" style={{ height: `${(d.value / maxRev) * 100}%` }} />
                </div>
                <span className="text-[11px] font-medium text-foreground/60">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Top products</p>
          <h2 className="font-serif text-xl font-semibold">By revenue</h2>
          <ul className="mt-5 space-y-4">
            {ADMIN_TOP_PRODUCTS.map((tp, i) => {
              const p = WEB_PRODUCTS.find((x) => x.id === tp.id);
              return (
                <li key={tp.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground/40">0{i + 1}</span>
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-muted">{p && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p?.name}</p>
                    <p className="text-xs text-foreground/60">{tp.units} units · {formatINR(tp.revenue)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Recent orders</h2>
            <Link to="/admin/orders" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-foreground/70 hover:text-foreground">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {ADMIN_ORDERS.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{o.id}</p>
                  <p className="truncate text-xs text-foreground/60">{o.customer} · {o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatINR(o.total)}</p>
                  <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(o.status)}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming consultations */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Upcoming consultations</h2>
            <Link to="/admin/consultations" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-foreground/70 hover:text-foreground">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {ADMIN_CONSULTATIONS.filter((c) => c.status === "Upcoming" || c.status === "Awaiting Notes").map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{c.customer} → {c.expert}</p>
                  <p className="text-xs text-foreground/60">{c.date} · {c.time} · {c.mode}</p>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(c.status)}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
