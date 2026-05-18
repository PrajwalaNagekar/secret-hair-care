import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { WEB_PRODUCTS, formatINR } from "@/lib/web-data";
import { useCart } from "@/lib/web-cart";
import { Star, Plus, Minus, Truck, ShieldCheck, Leaf, Heart, Check } from "lucide-react";



function ProductDetail() {
  const { slug } = useParams() as any;
  const product = WEB_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return <Navigate to="/404" replace />;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"benefits" | "ingredients" | "how">("benefits");
  const [added, setAdded] = useState(false);

  const related = WEB_PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <nav className="mb-6 text-xs text-foreground/60">
        <Link to="/web" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/web/shop" className="hover:text-foreground">Shop</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl bg-muted shadow-lg">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-muted">
                <img src={product.image} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {product.category.replace(/-/g, " ")}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current text-[oklch(0.78_0.12_80)]" : "text-foreground/20"}`}
                />
              ))}
            </div>
            <span className="text-sm text-foreground/60">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-4xl font-semibold">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-foreground/40 line-through">{formatINR(product.originalPrice)}</span>
                <span className="rounded-full bg-[oklch(0.92_0.08_140)] px-2.5 py-1 text-xs font-semibold text-foreground">
                  Save {formatINR(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>
          <p className="mt-2 text-sm text-foreground/60">Inclusive of all taxes · Size: {product.size}</p>

          <p className="mt-6 text-foreground/80">{product.description}</p>

          {/* Quantity + CTA */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="rounded-full p-2 hover:bg-muted" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="rounded-full p-2 hover:bg-muted" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to Cart
                </>
              ) : (
                <>Add to Cart · {formatINR(product.price * qty)}</>
              )}
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              className="rounded-full border border-border bg-card p-3.5 hover:bg-muted"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <Link
            to="/web/checkout"
            className="mt-3 block rounded-full border-2 border-foreground py-3.5 text-center text-sm font-semibold uppercase tracking-widest hover:bg-foreground hover:text-background"
            onClick={() => add(product.id, qty)}
          >
            Buy It Now
          </Link>

          {/* Promises */}
          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-4">
            <Promise icon={Leaf} label="100% Natural" />
            <Promise icon={ShieldCheck} label="Cruelty Free" />
            <Promise icon={Truck} label="Free Shipping" />
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex gap-1 border-b border-border">
              {[
                { k: "benefits" as const, label: "Benefits" },
                { k: "ingredients" as const, label: "Ingredients" },
                { k: "how" as const, label: "How to use" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`px-4 py-3 text-sm font-semibold transition-colors ${tab === t.k ? "border-b-2 border-foreground text-foreground" : "text-foreground/60"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm text-foreground/80">
              {tab === "benefits" && (
                <ul className="space-y-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-[oklch(0.55_0.15_140)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "ingredients" && (
                <ul className="flex flex-wrap gap-2">
                  {product.ingredients.map((i) => (
                    <li key={i} className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs">
                      {i}
                    </li>
                  ))}
                </ul>
              )}
              {tab === "how" && (
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Take a small amount in your palm.</li>
                  <li>Apply gently to scalp and hair lengths.</li>
                  <li>Massage in circular motions for 5 minutes.</li>
                  <li>Leave on for at least 30 minutes before washing.</li>
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-center font-serif text-3xl font-semibold">You may also love</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/web/product/${p.slug}`}
                
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-serif text-sm font-semibold">{p.name}</p>
                  <p className="mt-1 text-sm font-semibold">{formatINR(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Promise({ icon: Icon, label }: { icon: typeof Leaf; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
      <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
    </div>
  );
}

export default ProductDetail;
