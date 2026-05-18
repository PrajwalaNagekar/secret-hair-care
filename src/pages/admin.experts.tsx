import { useState } from "react";
import { Star, Mail, Phone, Plus, X, Check } from "lucide-react";
import { ADMIN_EXPERTS, statusTone, formatINR, type AdminExpert } from "@/lib/back-office-data";



function AdminExperts() {
  const [experts, setExperts] = useState<AdminExpert[]>(ADMIN_EXPERTS);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleInvite = (e: AdminExpert) => {
    setExperts((prev) => [e, ...prev]);
    setOpen(false);
    setToast(`Invite sent to ${e.email}`);
    setTimeout(() => setToast(null), 2800);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">Onboard, manage and pay your trichology and consultation team.</p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Invite expert
        </button>
      </div>

      {toast && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <Check className="h-4 w-4" /> {toast}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {experts.map((e) => (
          <div key={e.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  {e.name.split(" ").slice(-2).map((s) => s[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold">{e.name}</p>
                  <p className="text-xs text-foreground/60">{e.specialization}</p>
                </div>
              </div>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(e.status)}`}>{e.status}</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Rating</p>
                <p className="font-serif text-lg font-semibold inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {e.rating}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Consults</p>
                <p className="font-serif text-lg font-semibold">{e.consultations}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-2">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60">Earnings</p>
                <p className="font-serif text-sm font-semibold">{formatINR(e.earnings)}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-foreground/70">
              <p className="flex items-center gap-2"><Mail className="h-3 w-3" /> {e.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-3 w-3" /> {e.phone}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{e.experience}</span>
              {e.languages.map((l) => <span key={l} className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{l}</span>)}
            </div>
          </div>
        ))}
      </div>

      {open && <InviteModal onClose={() => setOpen(false)} onSubmit={handleInvite} existingCount={experts.length} />}
    </div>
  );
}

function InviteModal({ onClose, onSubmit, existingCount }: { onClose: () => void; onSubmit: (e: AdminExpert) => void; existingCount: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("Trichology & scalp recovery");
  const [experience, setExperience] = useState("5 years");
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [error, setError] = useState<string | null>(null);

  const toggleLang = (l: string) => {
    setLanguages((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) { setError("Please enter the expert's full name."); return; }
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    if (phone.replace(/\D/g, "").length < 10) { setError("Enter a valid phone number."); return; }
    if (languages.length === 0) { setError("Pick at least one language."); return; }
    onSubmit({
      id: `exp-${Date.now()}`,
      name: name.trim(),
      specialization,
      email: email.trim(),
      phone: phone.trim(),
      rating: 0,
      experience,
      consultations: 0,
      earnings: 0,
      status: "Pending",
      languages,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <form onSubmit={submit} className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Onboard expert · #{existingCount + 1}</p>
            <h2 className="font-serif text-2xl font-semibold">Invite a new expert</h2>
            <p className="mt-1 text-xs text-foreground/60">They'll receive an email to set their password and start receiving bookings.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-muted" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>

        <div className="space-y-4">
          <Field label="Full name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Maya Iyer" className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20" />
          </Field>

          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="expert@secrethaircare.app" className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20" />
            </Field>
            <Field label="Phone">
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20" />
            </Field>
          </div>

          <Field label="Specialization">
            <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20">
              <option>Trichology & scalp recovery</option>
              <option>Hair nutrition & routine planning</option>
              <option>Scalp sensitivity & styling damage</option>
              <option>Postpartum hair loss</option>
              <option>Pediatric trichology</option>
            </select>
          </Field>

          <Field label="Experience">
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20">
              {["2 years", "5 years", "8 years", "11 years", "15+ years"].map((x) => <option key={x}>{x}</option>)}
            </select>
          </Field>

          <Field label="Languages">
            <div className="flex flex-wrap gap-2">
              {["English", "Hindi", "Tamil", "Telugu", "Marathi", "Punjabi", "Bengali"].map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => toggleLang(l)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${languages.includes(l) ? "bg-foreground text-background" : "border border-border hover:bg-muted"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {error && <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">Cancel</button>
          <button type="submit" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90">Send invite</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">{label}</label>
      {children}
    </div>
  );
}

export default AdminExperts;
