import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { ADMIN_ORDERS, formatINR, statusTone, type AdminOrder } from "@/lib/back-office-data";



const STATUSES: AdminOrder["status"][] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];

function AdminOrders() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [open, setOpen] = useState<AdminOrder | null>(null);

  const filtered = ADMIN_ORDERS.filter((o) =>
    (status === "all" || o.status === status) &&
    (q === "" || o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 md:max-w-xs">
          <Search className="h-4 w-4 text-foreground/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by order ID or customer" className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-foreground/60">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3 hidden md:table-cell">Date</th>
              <th className="px-5 py-3 hidden lg:table-cell">Payment</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => (
              <tr key={o.id} className={i % 2 ? "bg-background/40" : ""}>
                <td className="px-5 py-3 font-semibold">{o.id}</td>
                <td className="px-5 py-3">
                  <p className="font-medium">{o.customer}</p>
                  <p className="text-xs text-foreground/60">{o.email}</p>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">{o.date}</td>
                <td className="px-5 py-3 hidden lg:table-cell">{o.paymentMethod}</td>
                <td className="px-5 py-3 font-semibold">{formatINR(o.total)}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(o.status)}`}>{o.status}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => setOpen(o)} className="rounded-lg p-2 hover:bg-muted" aria-label="View"><Eye className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <OrderDrawer order={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function OrderDrawer({ order, onClose }: { order: AdminOrder; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-y-auto bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Order</p>
            <h2 className="font-serif text-2xl font-semibold">{order.id}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg px-3 py-1 text-sm hover:bg-muted">Close</button>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Customer</p>
            <p className="mt-1 font-semibold">{order.customer}</p>
            <p className="text-sm text-foreground/70">{order.email}</p>
            <p className="mt-2 text-sm">{order.shipping.city}, {order.shipping.state} — {order.shipping.pincode}</p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Items</p>
            <ul className="mt-3 space-y-3">
              {order.items.map((it) => (
                <li key={it.productId} className="flex items-center justify-between text-sm">
                  <span>{it.name} × {it.qty}</span>
                  <span className="font-semibold">{formatINR(it.price * it.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
              <span className="font-semibold">Total</span>
              <span className="font-serif text-xl font-semibold">{formatINR(order.total)}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Status</p>
            <div className="mt-2 flex items-center justify-between">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone(order.status)}`}>{order.status}</span>
              <span className="text-xs text-foreground/60">{order.paymentMethod}</span>
            </div>
            {order.trackingId && <p className="mt-3 text-sm">Tracking ID: <span className="font-mono">{order.trackingId}</span></p>}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold hover:bg-muted">Print invoice</button>
            <button className="flex-1 rounded-full bg-foreground py-2.5 text-sm font-semibold text-background hover:opacity-90">Update status</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
