import { WEB_REVIEWS } from "@/lib/web-data";
import { Star } from "lucide-react";



function ReviewsPage() {
  const overall = WEB_REVIEWS.reduce((s, r) => s + r.rating, 0) / WEB_REVIEWS.length;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Customer Love</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold md:text-6xl">Reviews</h1>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-card px-5 py-2 shadow-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.round(overall) ? "fill-current text-[oklch(0.78_0.12_80)]" : "text-foreground/20"}`} />
          ))}
          <span className="text-sm font-semibold">{overall.toFixed(1)} out of 5</span>
          <span className="text-xs text-foreground/60">· {WEB_REVIEWS.length}+ reviews</span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {WEB_REVIEWS.map((r, i) => (
          <article key={i} className="rounded-3xl border border-border bg-card p-7 shadow-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current text-[oklch(0.78_0.12_80)]" />
              ))}
            </div>
            <h3 className="mt-3 font-serif text-xl font-semibold">{r.title}</h3>
            <p className="mt-2 text-foreground/80">"{r.body}"</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <p className="font-semibold">{r.name} <span className="text-foreground/50">— {r.location}</span></p>
              <p className="italic text-foreground/60">{r.product}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
