import { Plus, Edit2, FileText } from "lucide-react";
import { ADMIN_BLOG_POSTS, statusTone } from "@/lib/back-office-data";



function AdminContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">Manage announcements, blog posts and homepage banners.</p>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {ADMIN_BLOG_POSTS.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.92_0.04_60)]">
                  <FileText className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold leading-tight">{p.title}</h3>
                  <p className="text-xs text-foreground/60">{p.author} · {p.date}</p>
                </div>
              </div>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusTone(p.status)}`}>{p.status}</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
              <span className="text-foreground/60">{p.views.toLocaleString()} views</span>
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-foreground/70">
                <Edit2 className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContent;
