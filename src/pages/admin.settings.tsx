import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";



type Item = { label: string; value: string };
type Section = { title: string; items: Item[] };

const INITIAL_SECTIONS: Section[] = [
  {
    title: "Brand",
    items: [
      { label: "Brand name", value: "Secret Hair Care" },
      { label: "Domain", value: "thesecrethaircare.com" },
      { label: "Support email", value: "info@thesecrethaircare.com" },
      { label: "Support phone", value: "+91 81477 85553" },
    ],
  },
  {
    title: "Storefront",
    items: [
      { label: "Default currency", value: "INR (₹)" },
      { label: "GST", value: "Inclusive — GST 2.0 enabled" },
      { label: "Free shipping above", value: "₹ 999" },
      { label: "International shipping", value: "Enabled" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Pickup warehouse", value: "Chennai – Velachery" },
      { label: "Default carrier", value: "Delhivery" },
      { label: "AI plan auto-review", value: "After 24h if no expert" },
      { label: "Subscription cycles", value: "Smart Refill 30d · Recovery 45d" },
    ],
  },
];

function AdminSettings() {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [editing, setEditing] = useState<{ s: number; i: number } | null>(null);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const startEdit = (s: number, i: number) => {
    setEditing({ s, i });
    setDraft(sections[s].items[i].value);
  };

  const saveEdit = () => {
    if (!editing) return;
    setSections((prev) => {
      const next = prev.map((sec) => ({ ...sec, items: sec.items.map((it) => ({ ...it })) }));
      next[editing.s].items[editing.i].value = draft.trim() || next[editing.s].items[editing.i].value;
      return next;
    });
    setToast(`${sections[editing.s].items[editing.i].label} updated`);
    setEditing(null);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="space-y-6">
      {sections.map((s, sIdx) => (
        <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-serif text-xl font-semibold">{s.title}</h3>
          <dl className="mt-4 divide-y divide-border">
            {s.items.map((it, iIdx) => {
              const isEditing = editing?.s === sIdx && editing?.i === iIdx;
              return (
                <div key={it.label} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <dt className="text-foreground/60">{it.label}</dt>
                  <dd className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          autoFocus
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") setEditing(null);
                          }}
                          className="w-64 rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
                        />
                        <button
                          onClick={saveEdit}
                          aria-label="Save"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background hover:opacity-90"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          aria-label="Cancel"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border hover:bg-muted"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="font-medium">{it.value}</span>
                        <button
                          onClick={() => startEdit(sIdx, iIdx)}
                          aria-label={`Edit ${it.label}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-muted"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default AdminSettings;
