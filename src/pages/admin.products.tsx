import { useState } from "react";
import { Search, Plus, Edit2 } from "lucide-react";
import { WEB_PRODUCTS, WEB_CATEGORIES } from "@/lib/web-data";
import { formatINR } from "@/lib/back-office-data";



function AdminProducts() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = WEB_PRODUCTS.filter((p) =>
    (cat === "all" || p.category === cat) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 md:max-w-xs">
            <Search className="h-4 w-4 text-foreground/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
            <option value="all">All categories</option>
            {WEB_CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> Add product
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-foreground/60">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3 hidden md:table-cell">Category</th>
              <th className="px-5 py-3 hidden lg:table-cell">Concerns</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3 hidden md:table-cell">Stock</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className={i % 2 ? "bg-background/40" : ""}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-muted"><img src={p.image} alt={p.name} className="h-full w-full object-cover" /></div>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-foreground/60">{p.size}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 hidden md:table-cell capitalize text-foreground/70">{p.category.replace(/-/g, " ")}</td>
                <td className="px-5 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {p.concerns.slice(0, 2).map((c) => (
                      <span key={c} className="rounded-full bg-muted px-2 py-0.5 text-[10px] capitalize">{c.replace(/-/g, " ")}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3 font-semibold">{formatINR(p.price)}</td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">In stock</span>
                </td>
                <td className="px-5 py-3">⭐ {p.rating}</td>
                <td className="px-5 py-3 text-right">
                  <button className="rounded-lg p-2 hover:bg-muted" aria-label="Edit"><Edit2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
