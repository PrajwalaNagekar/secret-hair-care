import { useState } from "react";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { ADMIN_AI, statusTone, type AIRecommendation } from "@/lib/back-office-data";
import { WEB_PRODUCTS } from "@/lib/web-data";



function ExpertAIReview() {
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});
  const isReviewed = (a: AIRecommendation) => reviewed[a.id] ?? a.expertReviewed;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.95_0.05_290)] to-[oklch(0.93_0.06_60)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background">
            <Sparkles className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold">AI plan review queue</h2>
            <p className="mt-1 text-sm text-foreground/70">
              Review AI-generated routines, validate product matches, and adjust recommendations before they reach the customer.
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
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted"><div className="h-full bg-foreground" style={{ width: `${tc.score}%` }} /></div>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(tc.severity)}`}>{tc.severity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Recommended products</p>
              <div className="mt-2 grid gap-2">
                {a.recommendedProducts.map((pid) => {
                  const p = WEB_PRODUCTS.find((x) => x.id === pid);
                  return (
                    <label key={pid} className="flex items-center gap-3 rounded-xl border border-border bg-background p-2.5">
                      <input type="checkbox" defaultChecked className="h-4 w-4 accent-foreground" />
                      <div className="h-8 w-8 overflow-hidden rounded-lg bg-muted">{p && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}</div>
                      <span className="flex-1 text-sm">{p?.name}</span>
                      <span className="text-xs text-foreground/60">₹ {p?.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              {isReviewed(a) ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" /> Approved & sent to customer
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                  <AlertCircle className="h-4 w-4" /> Awaiting your approval
                </span>
              )}
              {!isReviewed(a) && (
                <button
                  onClick={() => setReviewed((r) => ({ ...r, [a.id]: true }))}
                  className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:opacity-90"
                >
                  Approve plan
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpertAIReview;
