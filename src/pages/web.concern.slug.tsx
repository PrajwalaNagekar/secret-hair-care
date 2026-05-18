import { Link, Navigate, useParams } from "react-router-dom";
import { WEB_CONCERNS, WEB_PRODUCTS, formatINR } from "@/lib/web-data";
import { useCart } from "@/lib/web-cart";
import { Star } from "lucide-react";



function ConcernPage() {
  const { slug } = useParams() as any;
  const concern = WEB_CONCERNS.find((c) => c.slug === slug);
  if (!concern) return <Navigate to="/404" replace />;
  // Map slug aliases for products tagged with legacy concern keys
  const aliasMap: Record<string, string[]> = {
    "hair-fall": ["hair-fall", "thinning"],
    growth: ["growth", "thinning"],
    greying: ["greying"],
    dandruff: ["dandruff", "scalp-care"],
  };
  const matchKeys = aliasMap[slug] ?? [slug];
  const products = WEB_PRODUCTS.filter((p) => p.concerns.some((c) => matchKeys.includes(c)));
  const { add } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <nav className="mb-6 text-xs text-foreground/60">
        <Link to="/web" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/web/shop" className="hover:text-foreground">Shop</Link> /{" "}
        <span className="text-foreground">{concern.name}</span>
      </nav>

      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Shop By Concern</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">{concern.name}</h1>
        <p className="mt-2 text-foreground/60">Curated solutions to address {concern.name.toLowerCase()}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
            <Link to={`/web/product/${p.slug}`}  className="relative block aspect-square overflow-hidden bg-muted">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
            </Link>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <Link to={`/web/product/${p.slug}`}  className="font-serif text-base font-semibold">
                {p.name}
              </Link>
              <div className="flex items-center gap-1 text-xs text-foreground/60">
                <Star className="h-3 w-3 fill-current text-[oklch(0.78_0.12_80)]" />
                {p.rating}
              </div>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-semibold">{formatINR(p.price)}</span>
              </div>
              <button
                onClick={() => add(p.id)}
                className="mt-2 rounded-full border border-foreground py-2 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-foreground hover:text-background"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center text-foreground/60">
          No products tagged for this concern yet.
        </div>
      )}
    </div>
  );
}

export default ConcernPage;
