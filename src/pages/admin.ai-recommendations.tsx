import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { ADMIN_AI, statusTone } from "@/lib/back-office-data";
import { WEB_PRODUCTS } from "@/lib/web-data";



function AdminAI() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.95_0.05_60)] to-[oklch(0.92_0.06_45)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background">
            <Sparkles className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold">AI hair diagnostics</h2>
            <p className="mt-1 text-sm text-foreground/70">
              Each AI plan is generated from the customer assessment in the mobile app and reviewed by an
              assigned expert before being shipped.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {ADMIN_AI.map((a) => (
          <div key={a.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">{a.id} · {a.date}</p>
                <h3 className="font-serif text-lg font-semibold">{a.customer}</h3>
              </div>
              <div className="text-right">
                <p className="font-serif text-3xl font-semibold">{a.hairScore}</p>
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Hair score</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {a.topConcerns.map((tc) => (
                <div key={tc.concern} className="flex items-center justify-between text-sm">
                  <span>{tc.concern}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-foreground" style={{ width: `${tc.score}%` }} />
                    </div>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(tc.severity)}`}>{tc.severity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Recommended</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {a.recommendedProducts.map((pid) => {
                  const p = WEB_PRODUCTS.find((x) => x.id === pid);
                  return <span key={pid} className="rounded-full bg-muted px-2.5 py-1 text-xs">{p?.name}</span>;
                })}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              {a.expertReviewed ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" /> Reviewed by {a.reviewer}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                  <AlertCircle className="h-4 w-4" /> Awaiting expert review
                </span>
              )}
              <button className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold hover:bg-muted">
                {a.expertReviewed ? "View plan" : "Assign expert"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAI;
