import { Link, Navigate, useParams } from "react-router-dom";
import { WEB_CATEGORIES, WEB_PRODUCTS, formatINR } from "@/lib/web-data";
import { useCart } from "@/lib/web-cart";
import { Star } from "lucide-react";



function CategoryPage() {
  const { slug } = useParams() as any;
  const category = WEB_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return <Navigate to="/404" replace />;
  const products = WEB_PRODUCTS.filter((p) => p.category === slug);
  const { add } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <nav className="mb-6 text-xs text-foreground/60">
        <Link to="/web" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/web/shop" className="hover:text-foreground">Shop</Link> /{" "}
        <span className="text-foreground">{category.name}</span>
      </nav>

      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">{category.name}</h1>
        <p className="text-foreground/60">{products.length} product{products.length === 1 ? "" : "s"}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
            <Link to={`/web/product/${p.slug}`}  className="relative block aspect-square overflow-hidden bg-muted">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </Link>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <Link to={`/web/product/${p.slug}`}  className="font-serif text-base font-semibold">
                {p.name}
              </Link>
              <div className="flex items-center gap-1 text-xs text-foreground/60">
                <Star className="h-3 w-3 fill-current text-[oklch(0.78_0.12_80)]" />
                {p.rating} ({p.reviewCount})
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
          No products in this category yet. <Link to="/web/shop" className="underline">Browse all</Link>.
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
