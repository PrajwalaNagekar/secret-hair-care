import { Link } from "react-router-dom";
import { WEB_BLOGS } from "@/lib/web-data";
import { ArrowRight } from "lucide-react";



function BlogsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-12 text-center">
        <p className="font-secret text-xs uppercase tracking-[0.3em] text-foreground/60">The Journal</p>
        <h1 className="mt-3 font-secret-display text-5xl font-semibold md:text-6xl">Blogs</h1>
        <p className="mt-3 text-foreground/60">Stories, science and rituals from our team.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {WEB_BLOGS.map((b) => (
          <Link
            key={b.slug}
            to={`/web/blog/${b.slug}`}
            
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-lg"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <p className="text-xs uppercase tracking-wider text-foreground/60">
                {b.date} · {b.readTime}
              </p>
              <h2 className="font-serif text-2xl font-semibold leading-snug">{b.title}</h2>
              <p className="text-sm text-foreground/70">{b.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold uppercase tracking-widest group-hover:underline">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogsPage;
