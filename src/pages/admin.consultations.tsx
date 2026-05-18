import { Video, MessageCircle, Phone } from "lucide-react";
import { ADMIN_CONSULTATIONS, statusTone, formatINR } from "@/lib/back-office-data";



function AdminConsultations() {
  const groups = {
    Upcoming: ADMIN_CONSULTATIONS.filter((c) => c.status === "Upcoming"),
    "Awaiting Notes": ADMIN_CONSULTATIONS.filter((c) => c.status === "Awaiting Notes"),
    Completed: ADMIN_CONSULTATIONS.filter((c) => c.status === "Completed"),
    Cancelled: ADMIN_CONSULTATIONS.filter((c) => c.status === "Cancelled"),
  };

  const Mode = ({ m }: { m: string }) => {
    const Icon = m === "Video" ? Video : m === "Chat" ? MessageCircle : Phone;
    return <Icon className="h-3.5 w-3.5" />;
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(groups).map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">{k}</p>
            <p className="mt-1 font-serif text-3xl font-semibold">{v.length}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-foreground/60">
            <tr>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Expert</th>
              <th className="px-5 py-3 hidden md:table-cell">Date / time</th>
              <th className="px-5 py-3">Mode</th>
              <th className="px-5 py-3 hidden lg:table-cell">Concern</th>
              <th className="px-5 py-3">Fee</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {ADMIN_CONSULTATIONS.map((c, i) => (
              <tr key={c.id} className={i % 2 ? "bg-background/40" : ""}>
                <td className="px-5 py-3 font-semibold">{c.customer}</td>
                <td className="px-5 py-3 text-foreground/80">{c.expert}</td>
                <td className="px-5 py-3 hidden md:table-cell">{c.date}<span className="text-foreground/60"> · {c.time}</span></td>
                <td className="px-5 py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-xs"><Mode m={c.mode} /> {c.mode}</span></td>
                <td className="px-5 py-3 hidden lg:table-cell text-foreground/70">{c.concern}</td>
                <td className="px-5 py-3 font-semibold">{formatINR(c.fee)}</td>
                <td className="px-5 py-3"><span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(c.status)}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminConsultations;
