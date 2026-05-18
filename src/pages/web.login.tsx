import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/lib/web-auth";
import { Lock, Mail } from "lucide-react";



function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/web/account");
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Welcome back</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold">Sign in to SECRET</h1>
        <p className="mt-2 text-sm text-foreground/60">Continue your hair care journey.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <Field icon={<Mail className="h-4 w-4" />} label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-transparent py-2 text-sm outline-none"
          />
        </Field>
        <Field icon={<Lock className="h-4 w-4" />} label="Password">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent py-2 text-sm outline-none"
          />
        </Field>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-foreground py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <p className="text-center text-sm text-foreground/60">
          New to SECRET?{" "}
          <Link to="/web/register" className="font-semibold text-foreground underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">{label}</span>
      <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4">
        <span className="text-foreground/50">{icon}</span>
        {children}
      </div>
    </label>
  );
}

export default LoginPage;
