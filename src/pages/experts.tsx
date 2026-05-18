import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarClock,
  Users,
  MessageSquare,
  Sparkles,
  ClipboardList,
  Bell,
  LogOut,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { SecretLogo } from "@/components/secret-logo";



const NAV = [
  { to: "/experts" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/experts/appointments" as const, label: "Appointments", icon: CalendarClock },
  { to: "/experts/patients" as const, label: "Customers", icon: Users },
  { to: "/experts/chat" as const, label: "Chat", icon: MessageSquare },
  { to: "/experts/ai-review" as const, label: "AI Reviews", icon: Sparkles },
  { to: "/experts/prescriptions" as const, label: "Prescriptions", icon: ClipboardList },
];

const STORAGE_KEY = "shc-expert-auth";

function ExpertShell() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (authed === null) return null;
  if (!authed) return <ExpertLogin onSuccess={() => setAuthed(true)} />;
  return <ExpertFrame onLogout={() => { window.localStorage.removeItem(STORAGE_KEY); setAuthed(false); }} />;
}

function ExpertLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("aisha.menon@secrethaircare.app");
  const [password, setPassword] = useState("expert-pass");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) { setError("Enter valid credentials."); return; }
    window.localStorage.setItem(STORAGE_KEY, "1");
    onSuccess();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Link to="/" className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Suite
      </Link>
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <SecretLogo height={40} />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/60">Consultant Workspace</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold">Expert sign in</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20" />
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-foreground py-3 text-sm font-semibold uppercase tracking-wider text-background hover:opacity-90">
            Sign in
          </button>
          <p className="pt-2 text-center text-xs text-foreground/50">Demo: signed in as Dr. Aisha Menon</p>
        </form>
      </div>
    </div>
  );
}

function ExpertFrame({ onLogout }: { onLogout: () => void }) {
  const pathname = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const current = NAV.find((n) => (n.exact ? pathname === n.to : pathname.startsWith(n.to)));

  return (
    <div className="flex min-h-screen bg-[oklch(0.97_0.012_70)]">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-card transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-6">
          <Link to="/experts" className="flex items-center gap-2">
            <SecretLogo height={26} />
          </Link>
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <p className="px-6 pt-5 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40">Expert Workspace</p>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? "bg-foreground text-background shadow-sm" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-2xl border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.93_0.05_290)] text-xs font-bold text-foreground">AM</div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Dr. Aisha Menon</p>
              <p className="text-xs text-foreground/60">Trichologist</p>
            </div>
            <button onClick={onLogout} aria-label="Sign out" className="rounded-lg p-2 text-foreground/60 hover:bg-muted hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-border bg-card/80 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-muted md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/50">Expert Portal</p>
              <h1 className="font-serif text-2xl font-semibold leading-none">{current?.label ?? "Dashboard"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 hover:bg-muted" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>

      {open && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}

export default ExpertShell;
