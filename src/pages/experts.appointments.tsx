import { useState } from "react";
import { MessageCircle, Phone, CalendarPlus } from "lucide-react";
import { ADMIN_CONSULTATIONS, statusTone, formatINR, type AdminConsultation } from "@/lib/back-office-data";



const TABS = ["Upcoming", "Awaiting Notes", "Completed", "Cancelled"] as const;

function ExpertAppointments() {
  const [tab, setTab] = useState<typeof TABS[number]>("Upcoming");
  const [open, setOpen] = useState<AdminConsultation | null>(null);
  const filtered = ADMIN_CONSULTATIONS.filter((c) => c.status === tab);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${tab === t ? "bg-foreground text-background" : "border border-border bg-card hover:bg-muted"}`}>
              {t} ({ADMIN_CONSULTATIONS.filter((c) => c.status === t).length})
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90">
          <CalendarPlus className="h-4 w-4" /> Block time
        </button>
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 && <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-foreground/60">No {tab.toLowerCase()} appointments.</p>}
        {filtered.map((c) => {
          const ModeIcon = c.mode === "Chat" ? MessageCircle : Phone;
          return (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                    {c.customer.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold">{c.customer}</p>
                    <p className="text-xs text-foreground/60">{c.concern}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs"><ModeIcon className="h-3.5 w-3.5" /> {c.mode}</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">{c.date} · {c.time}</span>
                  <span className="text-sm font-semibold">{formatINR(c.fee)}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(c.status)}`}>{c.status}</span>
                </div>
              </div>

              {c.notes && (
                <p className="mt-3 rounded-xl bg-muted/40 p-3 text-xs text-foreground/70">
                  <strong className="font-semibold text-foreground/80">Notes: </strong>{c.notes}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {c.status === "Upcoming" && (
                  <>
                    <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:opacity-90">Join {c.mode.toLowerCase()}</button>
                    <button className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold hover:bg-muted">Reschedule</button>
                  </>
                )}
                {c.status === "Awaiting Notes" && (
                  <button onClick={() => setOpen(c)} className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:opacity-90">Add notes</button>
                )}
                {c.status === "Completed" && (
                  <button onClick={() => setOpen(c)} className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold hover:bg-muted">View summary</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {open && <NotesModal consult={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function NotesModal({ consult, onClose }: { consult: AdminConsultation; onClose: () => void }) {
  const [notes, setNotes] = useState(consult.notes ?? "");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Consultation</p>
        <h2 className="font-serif text-2xl font-semibold">{consult.customer}</h2>
        <p className="mt-1 text-sm text-foreground/70">{consult.date} · {consult.time} · {consult.mode}</p>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">Consultation notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          placeholder="Recommendations, next check-in, prescriptions…"
          className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">Cancel</button>
          <button onClick={onClose} className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90">Save & close</button>
        </div>
      </div>
    </div>
  );
}

export default ExpertAppointments;
