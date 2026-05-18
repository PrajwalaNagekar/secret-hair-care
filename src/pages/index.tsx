import { Link } from "react-router-dom";
import { Smartphone, Globe, ShieldCheck, UserCog, ArrowUpRight, FileText } from "lucide-react";
import { SecretLogo } from "@/components/secret-logo";



const apps = [
  {
    title: "Mobile App",
    label: "iOS prototype",
    description:
      "Full iPhone 16 prototype with AI hair diagnosis, expert consultation, shopping, payment and tracking.",
    to: "/mobile" as const,
    icon: Smartphone,
    status: "Live",
    accent: "from-[oklch(0.95_0.04_70)] to-[oklch(0.9_0.06_50)]",
  },
  {
    title: "Web App",
    label: "Customer storefront",
    description:
      "Browse hair oils, shampoos, combo kits and masks. Shop by concern, read reviews and check out securely.",
    to: "/web" as const,
    icon: Globe,
    status: "Live",
    accent: "from-[oklch(0.93_0.045_55)] to-[oklch(0.88_0.07_45)]",
  },
  {
    title: "Admin Panel",
    label: "Operations dashboard",
    description:
      "Manage products, orders, inventory, customers and content from a single back-office console.",
    to: "/admin" as const,
    icon: ShieldCheck,
    status: "Live",
    accent: "from-[oklch(0.92_0.04_60)] to-[oklch(0.86_0.05_75)]",
  },
  {
    title: "Expert's Panel",
    label: "Consultant workspace",
    description:
      "Trichologists and stylists can view bookings, run consultations, and track customer hair journeys.",
    to: "/experts" as const,
    icon: UserCog,
    status: "Live",
    accent: "from-[oklch(0.94_0.035_65)] to-[oklch(0.88_0.06_55)]",
  },
  {
    title: "Project Proposal",
    label: "Investor & client deck",
    description:
      "A complete business proposal for the Secret Hair Care ecosystem — phases, scope, timelines and ₹8.9L investment plan.",
    to: "/proposal" as const,
    icon: FileText,
    status: "New",
    accent: "from-[oklch(0.9_0.05_70)] to-[oklch(0.83_0.07_50)]",
  },
];

function LandingHub() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top announcement bar */}
      <div className="w-full bg-[oklch(0.9_0.06_45)] py-2.5 text-center text-xs font-medium text-foreground/80 tracking-wide">
        ✨ Experience Secret Hair Care — across mobile, web, admin & expert experiences
      </div>

      {/* Header */}
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center">
            <SecretLogo height={28} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/60">
          The Secret Hair Care Suite
        </p>
      </section>


      {/* Apps grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.to}
                to={app.to}
                className={`group relative overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br ${app.accent} p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full bg-card/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/70 backdrop-blur">
                    {app.status}
                  </span>
                </div>

                <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-foreground/50">
                  {app.label}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
                  {app.title}
                </h2>
                <p className="mt-3 max-w-md text-sm text-foreground/70">{app.description}</p>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  Open {app.title}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-foreground/60 md:flex-row">
          <SecretLogo height={22} />
          <p>© {new Date().getFullYear()} Secret Hair Care. Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingHub;
