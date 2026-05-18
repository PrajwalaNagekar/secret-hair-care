import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Sparkles, ShieldCheck, Award, Truck, Globe2, Gift, Star } from "lucide-react";
import { WEB_CATEGORIES, WEB_PRODUCTS, WEB_REVIEWS, formatINR } from "@/lib/web-data";
import { useCart } from "@/lib/web-cart";
import { useState, useEffect } from "react";



function WebHome() {
  return (
    <div>
      <Hero />
      <Categories />
      <MostLoved />
      <AloeBanner />
      <Promises />
      <NewLaunch />
      <StoreSection />
      <Services />
      <HappyClients />
    </div>
  );
}

function Hero() {
  const slides = [
    {
      eyebrow: "A SECRET WORTH SHARING",
      title: "Experience the power of",
      highlight: "Natural Products",
      cta: "Shop Now",
      bg: "linear-gradient(120deg, oklch(0.25 0.04 50) 0%, oklch(0.18 0.02 40) 60%)",
      image: WEB_PRODUCTS[0].image,
    },
    {
      eyebrow: "BLACK CHARM OIL",
      title: "Stop hair fall in",
      highlight: "Just 30 days",
      cta: "Discover Black Charm",
      bg: "linear-gradient(120deg, oklch(0.4 0.07 60) 0%, oklch(0.25 0.04 45) 60%)",
      image: WEB_PRODUCTS[0].image,
    },
    {
      eyebrow: "MOST SHOPPED COMBO",
      title: "Customer favourite",
      highlight: "Most Shopped Combo",
      cta: "Shop the Combo",
      bg: "linear-gradient(120deg, oklch(0.35 0.05 35) 0%, oklch(0.22 0.03 40) 60%)",
      image: WEB_PRODUCTS[2].image,
    },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative">
      <div
        className="relative flex min-h-[420px] items-center overflow-hidden md:min-h-[560px]"
        style={{ background: slides[active].bg }}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 text-[oklch(0.96_0.02_70)] md:grid-cols-2 md:px-8">
          <div>
            <p className="font-secret text-xs uppercase tracking-[0.4em] text-[oklch(0.96_0.02_70)]/70">
              {slides[active].eyebrow}
            </p>
            <h1 className="mt-4 font-secret-display text-5xl leading-[1.05] md:text-7xl">
              {slides[active].title}
              <br />
              <span className="font-secret-display italic text-[oklch(0.85_0.1_75)]">{slides[active].highlight}!</span>
            </h1>
            <Link
              to="/web/shop"
              className="font-secret mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[oklch(0.96_0.02_70)] bg-transparent px-7 py-3 text-sm font-semibold uppercase hover:bg-[oklch(0.96_0.02_70)] hover:text-foreground"
            >
              {slides[active].cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-full bg-[oklch(0.96_0.02_70)]/95 shadow-2xl md:h-96 md:w-96">
              <img src={slides[active].image} alt="" className="h-full w-full object-cover" />
              <div className="absolute -inset-3 rounded-full border border-[oklch(0.85_0.1_75)]/30" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${active === i ? "w-8 bg-[oklch(0.85_0.1_75)]" : "w-3 bg-[oklch(0.96_0.02_70)]/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="bg-[oklch(0.94_0.04_55)] py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4 md:px-8">
        {WEB_CATEGORIES.slice(0, 4).map((c) => {
          const sample = WEB_PRODUCTS.find((p) => p.category === c.slug);
          return (
            <Link
              key={c.slug}
              to={`/web/category/${c.slug}`}
              
              className="group flex flex-col items-center gap-3 rounded-3xl bg-card p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[oklch(0.92_0.05_60)] transition-transform group-hover:scale-105 md:h-32 md:w-32">
                {sample && <img src={sample.image} alt={c.name} className="h-full w-full object-cover" />}
              </div>
              <p className="font-serif text-lg font-semibold md:text-xl">{c.name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function MostLoved() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">Most-loved</h2>
          <p className="text-foreground/60">Tried, tested and then trusted by our shoppers</p>
          <Link to="/web/shop" className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] underline-offset-4 hover:underline">
            See more
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {WEB_PRODUCTS.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }: { product: typeof WEB_PRODUCTS[number] }) {
  const { add } = useCart();
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
      <Link to={`/web/product/${product.slug}`}  className="relative block aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {product.originalPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
            Save {formatINR(product.originalPrice - product.price)}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/50">
          {product.category.replace(/-/g, " ")}
        </p>
        <Link
          to={`/web/product/${product.slug}`}
          
          className="font-serif text-base font-semibold leading-snug hover:text-foreground/80"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-xs text-foreground/60">
          <Star className="h-3 w-3 fill-current text-[oklch(0.78_0.12_80)]" />
          {product.rating} ({product.reviewCount})
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div>
            <span className="font-semibold">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-xs text-foreground/40 line-through">{formatINR(product.originalPrice)}</span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            add(product.id);
          }}
          className="mt-2 rounded-full border border-foreground bg-transparent py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function AloeBanner() {
  const aloe = WEB_PRODUCTS.find((p) => p.slug === "ahuta-aloe-vera-gel-100-gms") ?? WEB_PRODUCTS[7];
  return (
    <section className="bg-[oklch(0.92_0.06_140)]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8">
        <div className="flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-[oklch(0.85_0.08_140)] shadow-inner md:h-96">
          <img src={aloe.image} alt={aloe.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Ahuta Aloe vera Gel
            <br />
            <span className="italic">Pure & plant based</span>
          </h2>
          <p className="mt-5 text-foreground/70">
            Clean, plant-based aloe vera gel. Multipurpose for hair, scalp and skin —
            soothing, hydrating and a daily essential.
          </p>
          <Link
            to={`/web/product/${aloe.slug}`}
            
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90"
          >
            View Product <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  const promises = [
    { icon: Leaf, title: "Fresh", desc: "Sourced from nature" },
    { icon: ShieldCheck, title: "Cruelty Free", desc: "Never tested on animals" },
    { icon: Sparkles, title: "No Chemicals", desc: "Clean every bottle" },
    { icon: Award, title: "100% Natural", desc: "Plant based always" },
  ];
  return (
    <section className="border-y border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
          Our promise to you
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-foreground/70">
          Secret prides itself on being one with all living beings around it. Our products are
          ethically sourced, environmentally conscious and non toxic.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {promises.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.92_0.06_140)]">
                  <Icon className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-lg font-semibold">{p.title}</p>
                <p className="text-xs text-foreground/60">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NewLaunch() {
  const featured = WEB_PRODUCTS.find((p) => p.slug === "love-affhair-50-ml") ?? WEB_PRODUCTS[1];
  return (
    <section className="bg-[oklch(0.25_0.04_45)] text-[oklch(0.96_0.02_70)]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[oklch(0.85_0.1_75)]">
            Secret's New Launch
          </p>
          <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">
            {featured.name}
          </h2>
          <p className="mt-5 text-[oklch(0.96_0.02_70)]/80">
            {featured.description}
          </p>
          <Link
            to={`/web/product/${featured.slug}`}
            
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[oklch(0.85_0.1_75)] px-7 py-3 text-sm font-semibold uppercase tracking-widest text-[oklch(0.85_0.1_75)] hover:bg-[oklch(0.85_0.1_75)] hover:text-foreground"
          >
            View Product <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex h-80 items-center justify-center overflow-hidden rounded-3xl bg-[oklch(0.18_0.02_40)] shadow-2xl md:h-96">
          <img src={featured.image} alt={featured.name} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function StoreSection() {
  const cover = WEB_PRODUCTS[2].image;
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-4 md:grid-cols-2 md:px-8">
        <div className="flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[oklch(0.88_0.05_60)] to-[oklch(0.78_0.07_50)] shadow-md md:h-96">
          <img src={cover} alt="Our Store" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Visit Us</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Our Store</h2>
          <p className="mt-3 text-xl font-serif italic text-foreground/80">Secret Haircare</p>
          <p className="mt-3 text-foreground/70">
            Palladium Mall, LG Floor, Phoenix Marketcity, Velachery, Chennai, Tamil Nadu — 600042
          </p>
          <p className="mt-2 text-foreground/70">
            Phone: <a href="tel:+918147785553" className="font-semibold hover:text-foreground">+91 81477 85553</a>
          </p>
          <a
            href="https://maps.app.goo.gl/ErAKfdrtRQtxqnX4A"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border-2 border-foreground px-6 py-2.5 text-sm font-semibold uppercase tracking-widest hover:bg-foreground hover:text-background"
          >
            Locate Store <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: Globe2, title: "Pan India Shipping", desc: "Shipping to all pin codes anywhere in India" },
    { icon: Truck, title: "World-wide Shipping", desc: "Delivering Secret across the world" },
    { icon: Gift, title: "Corporate Gifting", desc: "Customised gifting at scale. Email info@thesecrethaircare.com" },
  ];
  return (
    <section className="bg-[oklch(0.94_0.04_55)] py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 md:px-8">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="flex flex-col items-center gap-4 rounded-3xl bg-card p-8 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-semibold">{it.title}</h3>
              <p className="text-sm text-foreground/70">{it.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HappyClients() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="text-center font-serif text-4xl font-semibold md:text-5xl">Our Happy Clients</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {WEB_REVIEWS.slice(0, 3).map((r) => (
            <div key={r.name} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-[oklch(0.78_0.12_80)]" />
                ))}
              </div>
              <p className="mt-3 font-serif text-lg font-semibold">{r.title}</p>
              <p className="mt-2 text-sm text-foreground/70">"{r.body}"</p>
              <div className="mt-4 flex items-center justify-between text-xs text-foreground/60">
                <span>— {r.name}, {r.location}</span>
                <span className="italic">{r.product}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/web/reviews" className="text-sm font-semibold uppercase tracking-[0.2em] underline-offset-4 hover:underline">
            Read all reviews
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WebHome;
