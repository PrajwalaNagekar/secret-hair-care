import { ClipboardList, Plus } from "lucide-react";
import { ADMIN_CUSTOMERS } from "@/lib/back-office-data";
import { WEB_PRODUCTS } from "@/lib/web-data";



const ME = "Dr. Aisha Menon";

const PRESCRIPTIONS = [
  {
    id: "rx-1",
    customerId: "c-1001",
    date: "23 Apr 2026",
    items: [
      { productId: "p1", instructions: "Apply 2x weekly, leave overnight, wash next morning." },
      { productId: "p4", instructions: "Sulfate-free wash 2x a week." },
      { productId: "p11", instructions: "1 capsule daily after breakfast for 60 days." },
    ],
    nextReview: "21 May 2026",
    status: "Active",
  },
  {
    id: "rx-2",
    customerId: "c-1004",
    date: "20 Apr 2026",
    items: [
      { productId: "p5", instructions: "Apply growth serum nightly to scalp partings." },
      { productId: "p11", instructions: "1 capsule daily after meals." },
    ],
    nextReview: "18 May 2026",
    status: "Active",
  },
];

function ExpertPrescriptions() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">Prescription plans you've authored — customers see these directly inside the mobile app.</p>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> New prescription
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {PRESCRIPTIONS.map((rx) => {
          const customer = ADMIN_CUSTOMERS.find((c) => c.id === rx.customerId);
          return (
            <div key={rx.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.93_0.05_290)]">
                    <ClipboardList className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">{rx.id} · {rx.date}</p>
                    <h3 className="font-serif text-lg font-semibold">{customer?.name}</h3>
                    <p className="text-xs text-foreground/60">Issued by {ME}</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">{rx.status}</span>
              </div>

              <ul className="mt-4 space-y-3">
                {rx.items.map((it) => {
                  const p = WEB_PRODUCTS.find((x) => x.id === it.productId);
                  return (
                    <li key={it.productId} className="flex gap-3 rounded-xl border border-border bg-background p-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-muted">{p && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{p?.name}</p>
                        <p className="text-xs text-foreground/60">{it.instructions}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="text-foreground/60">Next review: <span className="font-semibold text-foreground">{rx.nextReview}</span></span>
                <button className="rounded-full border border-border px-3 py-1 font-semibold hover:bg-muted">Send to customer</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpertPrescriptions;
