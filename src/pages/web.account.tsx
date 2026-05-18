import { Link } from "react-router-dom";
import { useState } from "react";
import { User, Package, Heart, MapPin, LogOut, ChevronRight } from "lucide-react";



function AccountPage() {
  const [signedIn, setSignedIn] = useState(false);

  if (!signedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h1 className="font-serif text-3xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-foreground/60">Welcome back to Secret Hair Care.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignedIn(true);
            }}
            className="mt-6 space-y-4"
          >
            <Field label="Email" type="email" required />
            <Field label="Password" type="password" required />
            <button type="submit" className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90">
              Sign in
            </button>
          </form>
          <p className="mt-5 text-center text-xs text-foreground/60">
            New here? <button onClick={() => setSignedIn(true)} className="font-semibold underline">Create an account</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Welcome back</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">Hello, friend ✨</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card icon={Package} title="My orders" desc="Track shipments and reorder favourites">
          <Link to="/web/track" className="text-sm font-semibold uppercase tracking-widest underline">
            View orders
          </Link>
        </Card>
        <Card icon={Heart} title="Wishlist" desc="Save the products you love for later">
          <span className="text-sm text-foreground/60">3 saved items</span>
        </Card>
        <Card icon={MapPin} title="Addresses" desc="Manage shipping addresses">
          <span className="text-sm text-foreground/60">1 address on file</span>
        </Card>
        <Card icon={User} title="Profile" desc="Update name, email, password and preferences">
          <span className="text-sm text-foreground/60">Last updated: today</span>
        </Card>
      </div>

      <button
        onClick={() => setSignedIn(false)}
        className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground/60 hover:text-foreground"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}

function Card({ icon: Icon, title, desc, children }: { icon: typeof User; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <ChevronRight className="h-4 w-4 text-foreground/40" />
      </div>
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-foreground/60">{desc}</p>
      <div className="mt-2">{children}</div>
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

export default AccountPage;
