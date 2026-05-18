import { Leaf, Heart, ShieldCheck, Award } from "lucide-react";



function AboutPage() {
  return (
    <div>
      <section className="bg-[oklch(0.25_0.04_45)] py-20 text-[oklch(0.96_0.02_70)]">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[oklch(0.85_0.1_75)]">
            Our Story
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-7xl">
            A Secret <span className="italic">worth sharing.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[oklch(0.96_0.02_70)]/80">
            Born in South India, Secret Hair Care is the result of generations of natural rituals
            distilled into beautifully formulated products. Plant based, ethically sourced and
            crafted with care.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
        <div className="flex h-96 items-center justify-center overflow-hidden rounded-3xl bg-[oklch(0.92_0.06_140)] shadow-md">
          <img src="https://thesecrethaircare.com/storage/153/whGjDTPbtfWg7e7vigWZfqwQDI6eIc-metaSU1HXzEwMDAyLW1pbi5qcGc=-.webp" alt="Secret Hair Care" className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">Rooted in tradition</h2>
          <p className="mt-5 text-foreground/70">
            Every Secret formula starts with ingredients trusted for centuries — hibiscus, amla,
            curry leaves, bhringraj, brahmi. We slow-infuse, sun-dry and bottle small batches so
            the potency stays intact from leaf to scalp.
          </p>
          <p className="mt-4 text-foreground/70">
            We believe that what you put on your hair should be as clean as what you put in your
            body. No sulfates, no parabens, no silicones. Just nature, beautifully bottled.
          </p>
        </div>
      </section>

      <section className="bg-[oklch(0.94_0.04_55)] py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="text-center font-serif text-4xl font-semibold md:text-5xl">Our Promise</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { icon: Leaf, title: "100% Natural", desc: "Plant based formulas, every bottle." },
              { icon: Heart, title: "Cruelty Free", desc: "Never tested on animals. Ever." },
              { icon: ShieldCheck, title: "Clean Ingredients", desc: "No sulfates, parabens or silicones." },
              { icon: Award, title: "Crafted in India", desc: "Slow batches, made with care." },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-3xl bg-card p-7 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.92_0.06_140)]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">From the founder</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Hair care, the way our grandmothers knew it.
          </h2>
          <p className="mt-5 text-foreground/70">
            "I grew up watching my grandmother oil my hair every Sunday. The hibiscus from her
            garden, curry leaves crushed by hand, coconut oil simmered slowly over a wood stove —
            this was care. Secret is my way of bringing those rituals to every modern home."
          </p>
          <p className="mt-4 text-sm font-semibold">— Founder, Secret Hair Care</p>
        </div>
        <div className="flex h-96 items-center justify-center rounded-3xl bg-gradient-to-br from-[oklch(0.9_0.05_60)] to-[oklch(0.78_0.07_45)] text-9xl shadow-md">
          🌺
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
