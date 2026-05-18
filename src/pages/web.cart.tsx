import { Link } from "react-router-dom";
import { useCart } from "@/lib/web-cart";
import { formatINR } from "@/lib/web-data";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";



function CartPage() {
  const { lines, update, remove, subtotal } = useCart();
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-9 w-9 text-foreground/50" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-serif text-4xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-foreground/60">Discover our most-loved naturals and start your ritual.</p>
        <Link
          to="/web/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90"
        >
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="mb-8 font-serif text-4xl font-semibold md:text-5xl">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {lines.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <Link
                to={`/web/product/${product.slug}`}
                
                className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted"
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link to={`/web/product/${product.slug}`}  className="font-serif text-lg font-semibold">
                  {product.name}
                </Link>
                <p className="text-xs text-foreground/60">{product.size}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
                    <button onClick={() => update(product.id, quantity - 1)} className="rounded-full p-1.5 hover:bg-muted" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{quantity}</span>
                    <button onClick={() => update(product.id, quantity + 1)} className="rounded-full p-1.5 hover:bg-muted" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-semibold">{formatINR(product.price * quantity)}</p>
                </div>
              </div>
              <button onClick={() => remove(product.id)} aria-label="Remove" className="self-start text-foreground/40 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-semibold">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/60">Subtotal</span>
              <span className="font-semibold">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            {shipping === 0 && subtotal > 0 && (
              <p className="rounded-full bg-[oklch(0.92_0.06_140)] px-3 py-1.5 text-center text-xs font-medium">
                You unlocked free shipping ✨
              </p>
            )}
            <div className="my-3 border-t border-border" />
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-serif text-xl font-semibold">{formatINR(total)}</span>
            </div>
          </div>
          <Link
            to="/web/checkout"
            className="mt-6 block rounded-full bg-foreground py-3.5 text-center text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90"
          >
            Checkout
          </Link>
          <Link
            to="/web/shop"
            className="mt-2 block py-3 text-center text-xs font-semibold uppercase tracking-widest text-foreground/60 hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
