import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/lib/web-cart";
import { formatINR } from "@/lib/web-data";
import { ShieldCheck, Truck, CreditCard, Check } from "lucide-react";



function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);

  if (lines.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <Link to="/web/shop" className="mt-4 inline-block text-sm font-semibold uppercase tracking-widest underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.92_0.06_140)]">
          <Check className="h-10 w-10 text-[oklch(0.45_0.15_140)]" />
        </div>
        <h1 className="mt-6 font-serif text-5xl font-semibold">Order placed!</h1>
        <p className="mt-3 text-foreground/70">
          Thank you for your order. We've sent a confirmation to your email and you'll receive
          tracking details once it ships.
        </p>
        <p className="mt-2 text-sm text-foreground/60">
          Order # SH{Math.floor(Math.random() * 100000).toString().padStart(5, "0")}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/web" className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90">
            Back to Home
          </Link>
          <Link to="/web/track" className="rounded-full border-2 border-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-foreground hover:text-background">
            Track Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="mb-8 font-serif text-4xl font-semibold">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <Stepper current={step} />

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8">
            {step === 1 && <ContactStep onNext={() => setStep(2)} />}
            {step === 2 && <AddressStep onBack={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && (
              <PaymentStep
                onBack={() => setStep(2)}
                onPay={() => {
                  clear();
                  setDone(true);
                  navigate("/web/checkout");
                }}
                total={total}
              />
            )}
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-semibold">Order Summary</h2>
          <div className="mt-5 space-y-3">
            {lines.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3 text-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-foreground/60">Qty {quantity}</p>
                </div>
                <p className="font-semibold">{formatINR(product.price * quantity)}</p>
              </div>
            ))}
          </div>
          <div className="my-4 border-t border-border" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/60">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
              <span className="font-semibold">Total</span>
              <span className="font-serif text-xl font-semibold">{formatINR(total)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-xs text-foreground/70">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure encrypted checkout
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stepper({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Contact", "Address", "Payment"];
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const active = n === current;
        const complete = n < current;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${active ? "bg-foreground text-background" : complete ? "bg-[oklch(0.92_0.06_140)] text-foreground" : "bg-muted text-foreground/50"}`}>
              {complete ? <Check className="h-4 w-4" /> : n}
            </div>
            <span className={`text-xs font-semibold uppercase tracking-widest ${active ? "text-foreground" : "text-foreground/50"}`}>
              {label}
            </span>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">{label}</span>
      <input
        {...rest}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}

function ContactStep({ onNext }: { onNext: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="space-y-4"
    >
      <h3 className="font-serif text-xl font-semibold">Contact information</h3>
      <Field label="Email" type="email" required placeholder="you@example.com" />
      <Field label="Phone" type="tel" required placeholder="+91 98765 43210" />
      <button type="submit" className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90">
        Continue to address
      </button>
    </form>
  );
}

function AddressStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="space-y-4"
    >
      <h3 className="font-serif text-xl font-semibold">Shipping address</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="First name" required />
        <Field label="Last name" required />
      </div>
      <Field label="Address" required />
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="City" required />
        <Field label="State" required />
        <Field label="Pincode" required />
      </div>
      <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-xs">
        <Truck className="h-4 w-4" /> Estimated delivery 4–6 business days
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
          Back
        </button>
        <button type="submit" className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90">
          Continue to payment
        </button>
      </div>
    </form>
  );
}

function PaymentStep({ onBack, onPay, total }: { onBack: () => void; onPay: () => void; total: number }) {
  const [method, setMethod] = useState<"card" | "upi" | "cod">("card");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onPay();
      }}
      className="space-y-5"
    >
      <h3 className="font-serif text-xl font-semibold">Payment method</h3>
      <div className="grid gap-2">
        {[
          { k: "card" as const, label: "Credit / Debit card", icon: CreditCard },
          { k: "upi" as const, label: "UPI", icon: ShieldCheck },
          { k: "cod" as const, label: "Cash on delivery", icon: Truck },
        ].map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.k}
              type="button"
              onClick={() => setMethod(opt.k)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left text-sm transition-colors ${method === opt.k ? "border-foreground bg-muted" : "border-border bg-card hover:bg-muted/60"}`}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1 font-medium">{opt.label}</span>
              {method === opt.k && <Check className="h-4 w-4" />}
            </button>
          );
        })}
      </div>

      {method === "card" && (
        <div className="grid gap-4">
          <Field label="Card number" placeholder="1234 5678 9012 3456" required />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Expiry" placeholder="MM / YY" required />
            <Field label="CVV" placeholder="123" required />
          </div>
        </div>
      )}
      {method === "upi" && <Field label="UPI ID" placeholder="you@bank" required />}

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
          Back
        </button>
        <button type="submit" className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90">
          Pay {formatINR(total)}
        </button>
      </div>
    </form>
  );
}

export default CheckoutPage;
