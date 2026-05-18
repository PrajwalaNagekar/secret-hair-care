import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { WEB_PRODUCTS, WEB_CATEGORIES, WEB_CONCERNS, formatINR } from "@/lib/web-data";
import { useCart } from "@/lib/web-cart";
import { Star } from "lucide-react";



function ShopAll() {
  const [category, setCategory] = useState<string>("all");
  const [concern, setConcern] = useState<string>("all");
  const [featured, setFeatured] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const { add } = useCart();

  const concernAlias: Record<string, string[]> = {
    "hair-fall": ["hair-fall", "thinning"],
    growth: ["growth", "thinning"],
    greying: ["greying"],
    dandruff: ["dandruff", "scalp-care"],
  };

  const filtered = useMemo(() => {
    let list = [...WEB_PRODUCTS];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (concern !== "all") {
      const keys = concernAlias[concern] ?? [concern];
      list = list.filter((p) => p.concerns.some((c) => keys.includes(c)));
    }
    if (featured === "price-asc") list.sort((a, b) => a.price - b.price);
    if (featured === "price-desc") list.sort((a, b) => b.price - a.price);
    if (featured === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, concern, featured]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">All Products</p>
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">Shop the collection</h1>
        <p className="text-foreground/60">Plant based. Cruelty free. Made with love in South India.</p>
      </div>

      {/* Single horizontal row of dropdown filters */}
      <div className="mb-8 flex flex-wrap items-end justify-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <FilterSelect label="Category" value={category} onChange={setCategory}>
          <option value="all">All Categories</option>
          {WEB_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </FilterSelect>
        <FilterSelect label="Concern" value={concern} onChange={setConcern}>
          <option value="all">All Concerns</option>
          {WEB_CONCERNS.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </FilterSelect>
        <FilterSelect label="Featured" value={featured} onChange={(v) => setFeatured(v as typeof featured)}>
          <option value="featured">Featured</option>
          <option value="rating">Highest Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </FilterSelect>
      </div>

      <p className="mb-5 text-sm text-foreground/60">{filtered.length} products</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <div key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
            <Link to={`/web/product/${p.slug}`}  className="relative block aspect-square overflow-hidden bg-muted">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </Link>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/50">
                {p.category.replace(/-/g, " ")}
              </p>
              <Link to={`/web/product/${p.slug}`}  className="font-serif text-base font-semibold">
                {p.name}
              </Link>
              <div className="flex items-center gap-1 text-xs text-foreground/60">
                <Star className="h-3 w-3 fill-current text-[oklch(0.78_0.12_80)]" />
                {p.rating} ({p.reviewCount})
              </div>
              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <div>
                  <span className="font-semibold">{formatINR(p.price)}</span>
                  {p.originalPrice && (
                    <span className="ml-2 text-xs text-foreground/40 line-through">{formatINR(p.originalPrice)}</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => add(p.id)}
                className="mt-2 rounded-full border border-foreground py-2 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-foreground hover:text-background"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center text-foreground/60">
          No products match these filters. Try clearing filters.
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[180px] rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:border-foreground/50 focus:border-foreground"
      >
        {children}
      </select>
    </label>
  );
}

export default ShopAll;
