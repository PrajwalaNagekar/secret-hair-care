import { useState } from "react";
import { Package, Truck, MapPin, Check, Search } from "lucide-react";



function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Order Tracking</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold">Track your order</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (orderId.trim()) setTracked(true);
        }}
        className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 md:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            type="text"
            placeholder="Enter your order ID (e.g. SH12345)"
            className="w-full rounded-full border border-border bg-background py-3.5 pl-11 pr-4 text-sm outline-none focus:border-foreground"
          />
        </div>
        <button type="submit" className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90">
          Track
        </button>
      </form>

      {tracked && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-foreground/60">Order</p>
              <p className="font-semibold">{orderId.toUpperCase()}</p>
            </div>
            <span className="rounded-full bg-[oklch(0.92_0.06_140)] px-3 py-1.5 text-xs font-semibold">
              In transit
            </span>
          </div>

          <div className="space-y-6">
            {[
              { icon: Check, title: "Order placed", date: "Apr 18, 2025 · 14:22", done: true },
              { icon: Package, title: "Packed at warehouse", date: "Apr 19, 2025 · 09:10", done: true },
              { icon: Truck, title: "Out for delivery", date: "Apr 20, 2025 · 06:30", done: true, current: true },
              { icon: MapPin, title: "Delivered", date: "Estimated Apr 21, 2025", done: false },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${s.done ? "bg-foreground text-background" : "bg-muted text-foreground/40"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 border-b border-border pb-6 last:border-b-0 last:pb-0">
                    <p className={`font-semibold ${s.current ? "text-foreground" : ""}`}>{s.title}</p>
                    <p className="text-xs text-foreground/60">{s.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackPage;
