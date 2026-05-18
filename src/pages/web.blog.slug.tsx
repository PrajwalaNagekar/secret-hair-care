import { Link, Navigate, useParams } from "react-router-dom";
import { WEB_BLOGS } from "@/lib/web-data";
import { ArrowLeft, ArrowRight } from "lucide-react";



function BlogDetailPage() {
  const { slug } = useParams() as any;
  const blog = WEB_BLOGS.find((b) => b.slug === slug);
  if (!blog) return <Navigate to="/404" replace />;

  const others = WEB_BLOGS.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <Link
        to="/web/blogs"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground/60 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All Blogs
      </Link>

      <header className="mt-6">
        <p className="font-secret text-xs uppercase tracking-[0.3em] text-foreground/60">
          {blog.category}
        </p>
        <h1 className="mt-3 font-secret-display text-4xl leading-tight md:text-6xl">
          {blog.title}
        </h1>
        <p className="mt-4 text-sm text-foreground/60">
          {blog.author} · {blog.date} · {blog.readTime}
        </p>
      </header>

      <div className="mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-muted">
        <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
      </div>

      <div className="prose mt-10 max-w-none text-base leading-relaxed text-foreground/85">
        <p className="font-serif text-xl italic text-foreground/70">{blog.excerpt}</p>
        {blog.content.map((para, i) => (
          <p key={i} className="mt-5">
            {para}
          </p>
        ))}
      </div>

      {others.length > 0 && (
        <section className="mt-20">
          <h2 className="font-secret-display text-3xl">Keep reading</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((b) => (
              <Link
                key={b.slug}
                to={`/web/blog/${b.slug}`}
                
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="font-serif text-lg font-semibold leading-snug">{b.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-widest">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default BlogDetailPage;
