import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/lib/web-auth";
import { Lock, Mail, User } from "lucide-react";



function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = register(name, email, password);
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
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Join SECRET</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-foreground/60">A clean, simple onboarding to your personalized hair care.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <Field icon={<User className="h-4 w-4" />} label="Full name">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-transparent py-2 text-sm outline-none"
          />
        </Field>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full bg-transparent py-2 text-sm outline-none"
          />
        </Field>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-foreground py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create Account"}
        </button>

        <p className="text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link to="/web/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
            Sign in
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

export default RegisterPage;
