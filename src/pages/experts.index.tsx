import { Link } from "react-router-dom";
import { CalendarClock, Sparkles, MessageSquare, ArrowUpRight, Star, Users } from "lucide-react";
import { ADMIN_CONSULTATIONS, ADMIN_AI, ADMIN_CUSTOMERS, statusTone, formatINR } from "@/lib/back-office-data";



const ME = "Dr. Aisha Menon";
const ME_ID = "exp-1";

function ExpertDashboard() {
  const myConsults = ADMIN_CONSULTATIONS.filter((c) => c.expert === ME);
  const upcoming = myConsults.filter((c) => c.status === "Upcoming" || c.status === "Awaiting Notes");
  const completed = myConsults.filter((c) => c.status === "Completed");
  const myPatients = ADMIN_CUSTOMERS.filter((c) => c.assignedExpert === ME);
  const aiToReview = ADMIN_AI.filter((a) => !a.expertReviewed);

  const stats = [
    { label: "Today's appointments", value: upcoming.filter((c) => c.date === "25 Apr 2026").length, icon: CalendarClock, tint: "bg-[oklch(0.93_0.05_290)]" },
    { label: "My customers", value: myPatients.length, icon: Users, tint: "bg-[oklch(0.93_0.05_140)]" },
    { label: "AI plans to review", value: aiToReview.length, icon: Sparkles, tint: "bg-[oklch(0.93_0.05_80)]" },
    { label: "Avg rating", value: "4.9", icon: Star, tint: "bg-[oklch(0.93_0.06_60)]" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.95_0.05_290)] to-[oklch(0.93_0.06_60)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Good morning</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold">Welcome back, {ME}</h2>
        <p className="mt-1 text-sm text-foreground/70">You have {upcoming.length} upcoming consultations and {aiToReview.length} AI plans waiting for your review.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}><Icon className="h-5 w-5" strokeWidth={1.75} /></div>
              <p className="mt-4 text-xs font-medium text-foreground/60">{s.label}</p>
              <p className="mt-1 font-serif text-3xl font-semibold">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold">Today & tomorrow</h3>
            <Link to="/experts/appointments" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider hover:text-foreground/70">View all <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="space-y-2">
            {upcoming.length === 0 && <p className="text-sm text-foreground/60">No upcoming appointments. Enjoy your day ✨</p>}
            {upcoming.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{c.customer}</p>
                  <p className="text-xs text-foreground/60">{c.date} · {c.time} · {c.mode}</p>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(c.status)}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold">AI plans awaiting you</h3>
            <Link to="/experts/ai-review" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider hover:text-foreground/70">Review <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="space-y-2">
            {aiToReview.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{a.customer}</p>
                  <p className="text-xs text-foreground/60">{a.topConcerns.map((t) => t.concern).join(", ")} · score {a.hairScore}</p>
                </div>
                <button className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background hover:opacity-90">Review</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold">Recent completed consultations</h3>
          <span className="text-xs text-foreground/60">Earnings this month: {formatINR(48_400)}</span>
        </div>
        <ul className="divide-y divide-border">
          {completed.map((c) => (
            <li key={c.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {c.customer.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.customer}</p>
                  <p className="text-xs text-foreground/60">{c.concern} · {c.date}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{formatINR(c.fee)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hidden but used to satisfy unused-id complaint in some builds */}
      <span className="hidden">{ME_ID}</span>
    </div>
  );
}

export default ExpertDashboard;
