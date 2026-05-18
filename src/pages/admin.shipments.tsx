import { Truck, Package } from "lucide-react";
import { ADMIN_SHIPMENTS, statusTone } from "@/lib/back-office-data";


////test
function AdminShipments() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ADMIN_SHIPMENTS.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.93_0.05_220)]">
                  <Truck className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold">{s.orderId}</p>
                  <p className="text-xs text-foreground/60">{s.customer}</p>
                </div>
              </div>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(s.status)}`}>{s.status}</span>
            </div>

            <div className="mt-4 space-y-1.5 text-sm">
              <p className="flex items-center justify-between"><span className="text-foreground/60">Carrier</span><span className="font-medium">{s.carrier}</span></p>
              <p className="flex items-center justify-between"><span className="text-foreground/60">Tracking</span><span className="font-mono text-xs">{s.trackingNumber}</span></p>
              <p className="flex items-center justify-between"><span className="text-foreground/60">ETA</span><span className="font-medium">{s.estimatedDelivery}</span></p>
              <p className="flex items-center justify-between"><span className="text-foreground/60">Destination</span><span className="font-medium">{s.destination}</span></p>
            </div>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background py-2 text-xs font-semibold hover:bg-muted">
              <Package className="h-3.5 w-3.5" /> View on carrier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminShipments;
