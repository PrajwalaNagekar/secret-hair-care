import { Link } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { SecretLogo } from "@/components/secret-logo";
import anormosLogo from "@/assets/anormos-logo.png";



/* ------------------------------------------------------------------ */
/*  Document-style proposal — printable, like a Word/Google Doc        */
/* ------------------------------------------------------------------ */

async function forceDownload(url: string, filename: string) {
  try {
    const res = await fetch(url, { credentials: "same-origin" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  } catch {
    window.open(url, "_blank", "noopener");
  }
}

const phases = [
  {
    key: "Phase 1",
    name: "Foundation & Consumer Core",
    weeks: "Weeks 1 – 3",
    pct: "25%",
    cost: "₹2,32,500",
    scope:
      "UI/UX design system finalization, cloud infrastructure, unified database, secure role-based authentication (User · Admin · Expert), Hair Assessment Quiz, Consumer Mobile App (PWA) core — Today's Dashboard and Routine Calendar.",
  },
  {
    key: "Phase 2",
    name: "The Journey & Product Matchmaker",
    weeks: "Weeks 4 – 6",
    pct: "25%",
    cost: "₹2,32,500",
    scope:
      "Intelligent algorithm matching profiles to care schedules, secure photo upload & storage, Compare slider for The Journey, Consumer Web App — Analytics dashboard and Product Cabinet/Matchmaker, push notification & email reminder system.",
  },
  {
    key: "Phase 3",
    name: "Expert & Admin Portals",
    weeks: "Weeks 7 – 9",
    pct: "30%",
    cost: "₹2,79,000",
    scope:
      "Expert's Panel — Client Portfolio, Journey Reviewer, Routine Editor. Admin Panel — Control Tower, User Management, Product Database CMS. Linking expert portal to consumer accounts for routine override and notes.",
  },
  {
    key: "Phase 4",
    name: "Optimization, QA & Go-Live",
    weeks: "Weeks 10 – 12",
    pct: "20%",
    cost: "₹1,86,000",
    scope:
      "End-to-end QA across all 4 platforms, performance optimization for image loading and database queries, User Acceptance Testing, final production deployment and codebase handover.",
  },
];

type Shot = { src: string; title: string; caption: string };

const mobileShots: Shot[] = [
  { src: "/proposal-shots/mobile-welcome.png",    title: "Welcome & Sign-in",        caption: "Frictionless OTP-first onboarding — 'Personalized hair care, in your pocket'. Two clear paths: Create account or Sign in." },
  { src: "/proposal-shots/mobile-home.png",       title: "Today's Dashboard",        caption: "Daily greeting, hair-health streak, Today's Focus checklist (pre-poo, wash, deep condition) and quick actions." },
  { src: "/proposal-shots/mobile-assessment.png", title: "AI Hair Assessment",       caption: "Adaptive quiz — porosity, density, scalp condition, chemical history and goals — produces the user's Hair ID." },
  { src: "/proposal-shots/mobile-shop.png",       title: "Shop & Product Cabinet",   caption: "Catalog filtered by Hair ID, with concern/category filters and the user's wishlist and cart." },
  { src: "/proposal-shots/mobile-tracking.png",   title: "The Journey — Tracking",   caption: "Photo diary with grid overlays, Compare slider between two dates and consistency metrics." },
  { src: "/proposal-shots/mobile-profile.png",    title: "Profile & Subscriptions",  caption: "Account, saved address, orders, active subscription plan, support and notifications." },
];
const webShots: Shot[] = [
  { src: "/proposal-shots/web-home.png",     title: "Home / Storefront",        caption: "Premium responsive landing — hero, brand story and gateways into Shop, Ask-AI and the Journal." },
  { src: "/proposal-shots/web-shop.png",     title: "Shop — Product Matchmaker",caption: "Global catalog filtered by the user's Hair ID — only compatible products surface, with Ingredient Decoded highlights." },
  { src: "/proposal-shots/web-category.png", title: "Category Page",            caption: "Curated category browsing (Treatments, Oils, Cleansers) with concern, type and price filters." },
  { src: "/proposal-shots/web-concern.png",  title: "Concern Hub",              caption: "Concern-driven landing pages (e.g. Hair Fall) bundling routines, products and journal content." },
  { src: "/proposal-shots/web-product.png",  title: "Product Detail",           caption: "Ingredient transparency, reviews, recommended-with picks and add-to-cart with subscription option." },
  { src: "/proposal-shots/web-cart.png",     title: "Cart",                     caption: "Editable cart with applied coupons, shipping estimate and progress to free-delivery threshold." },
  { src: "/proposal-shots/web-checkout.png", title: "Checkout",                 caption: "Single-page checkout — address, payment (UPI / card / netbanking) and order summary." },
  { src: "/proposal-shots/web-track.png",    title: "Order Tracking",           caption: "Real-time order status, carrier tracking and delivery ETA from the user's account." },
  { src: "/proposal-shots/web-account.png",  title: "Account / Hair ID",        caption: "Customer profile, saved addresses, order history, active subscription and Hair ID card." },
  { src: "/proposal-shots/web-ask-ai.png",   title: "Ask AI",                   caption: "Conversational assistant — answers questions and turns the quiz into an instant personalized routine." },
  { src: "/proposal-shots/web-blogs.png",    title: "Journal / Blogs",          caption: "Internal, science-led blog content for community education and search-driven acquisition." },
  { src: "/proposal-shots/web-reviews.png",  title: "Reviews",                  caption: "Verified reviews with photos, ratings breakdown and filterable feedback by hair type." },
  { src: "/proposal-shots/web-about.png",    title: "About",                    caption: "Brand story, founder note and craftsmanship — anchors trust and SEO." },
  { src: "/proposal-shots/web-contact.png",  title: "Contact",                  caption: "Direct contact form, brand email/phone and support channels." },
];
const adminShots: Shot[] = [
  { src: "/proposal-shots/admin-dashboard.png",     title: "Control Tower (Dashboard)", caption: "Platform KPIs — DAU, retention, popular products, subscriptions and revenue at a glance." },
  { src: "/proposal-shots/admin-orders.png",        title: "Orders",                    caption: "Single source of truth for orders with status timelines, refunds and bulk fulfillment actions." },
  { src: "/proposal-shots/admin-shipments.png",     title: "Shipments",                 caption: "Carrier tracking, ETAs and exceptions across active shipments." },
  { src: "/proposal-shots/admin-products.png",      title: "Product Database (CMS)",    caption: "Product catalog with ingredient tagging that feeds directly into the Matchmaker algorithm." },
  { src: "/proposal-shots/admin-customers.png",     title: "Customers",                 caption: "Customer directory with Hair IDs, lifetime value, orders and support history." },
  { src: "/proposal-shots/admin-experts.png",       title: "Experts Management",        caption: "Onboard and vet experts, assign clients, set fees and monitor expert performance." },
  { src: "/proposal-shots/admin-consultations.png", title: "Consultations",             caption: "All consultation bookings — upcoming, awaiting notes, completed and cancelled — across modes." },
  { src: "/proposal-shots/admin-subscriptions.png", title: "Subscriptions",             caption: "Recurring revenue cohort — active plans, churn, MRR and renewal pipeline." },
  { src: "/proposal-shots/admin-content.png",       title: "Content & Journal CMS",     caption: "Author and schedule blog posts, banners and announcements — drives SEO and education." },
  { src: "/proposal-shots/admin-ai.png",            title: "AI Recommendations",        caption: "Tune the matchmaker / routine builder rules without engineering involvement." },
  { src: "/proposal-shots/admin-settings.png",      title: "Settings & Roles",          caption: "Brand settings, payment gateways, shipping zones and team role management." },
];
const expertShots: Shot[] = [
  { src: "/proposal-shots/expert-dashboard.png",     title: "Expert Dashboard",       caption: "High-level client view with alerts for falling consistency or reported reactions." },
  { src: "/proposal-shots/expert-appointments.png",  title: "Appointments",           caption: "Calendar of consultations, reschedules and follow-ups across video, chat and phone." },
  { src: "/proposal-shots/expert-patients.png",      title: "Client Portfolio",       caption: "Detailed Hair IDs, quiz results, chemical history and active routines per client." },
  { src: "/proposal-shots/expert-prescriptions.png", title: "Prescriptions / Routine",caption: "Routine Editor and consultation notes — override AI routines, add custom treatments." },
  { src: "/proposal-shots/expert-chat.png",          title: "Client Chat",            caption: "Secure 1:1 messaging with clients — synced with the consumer app's expert channel." },
  { src: "/proposal-shots/expert-ai-review.png",     title: "AI Review",              caption: "Inspect AI-generated routines for assigned clients and approve, edit or override." },
];

function ProposalPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_85)] py-10 print:bg-white print:py-0">
      {/* Justify body paragraphs in the document */}
      <style>{`
        .doc:not(.cover) p { text-align: justify; text-justify: inter-word; hyphens: auto; }
        .doc:not(.cover) li { text-align: justify; text-justify: inter-word; }
        .doc figcaption, .doc .no-justify, .doc th, .doc td { text-align: inherit; }
      `}</style>
      {/* Toolbar (hidden on print) */}
      <div className="mx-auto mb-6 flex max-w-[8.5in] items-center justify-between px-4 print:hidden">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Suite
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
          <a
            href="/downloads/Secret-Hair-Care-Proposal.docx"
            download="Secret-Hair-Care-Proposal.docx"
            target="_blank"
            rel="noopener"
            onClick={(e) => {
              e.preventDefault();
              forceDownload("/downloads/Secret-Hair-Care-Proposal.docx", "Secret-Hair-Care-Proposal.docx");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download .docx
          </a>
          <a
            href="/downloads/Secret-Hair-Care-Proposal.pdf"
            download="Secret-Hair-Care-Proposal.pdf"
            target="_blank"
            rel="noopener"
            onClick={(e) => {
              e.preventDefault();
              forceDownload("/downloads/Secret-Hair-Care-Proposal.pdf", "Secret-Hair-Care-Proposal.pdf");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#1f5fb8] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download .pdf
          </a>
        </div>
      </div>

      {/* ============== COVER PAGE (Page 1) ============== */}
      <article className="doc cover mx-auto max-w-[8.5in] bg-white text-[11pt] leading-[1.6] text-[#222] shadow-xl print:shadow-none">
        <div className="relative h-[11in] overflow-hidden px-[0.8in] pb-[0.8in] pt-[0.6in]">
          {/* Product hero — web + phone composite */}
          <div className="relative z-10 mt-6 flex items-end justify-center gap-4">
            <img
              src="/proposal-shots/web-home.png"
              alt="Secret Hair Journey — web preview"
              className="w-[68%] max-w-[5.2in] rounded-md border border-[#e6dfd2] shadow-lg"
            />
            <img
              src="/proposal-shots/mobile-home.png"
              alt="Secret Hair Journey — mobile preview"
              className="w-[18%] max-w-[1.6in] rounded-[18px] border border-[#e6dfd2] shadow-lg"
            />
          </div>

          {/* Title block */}
          <div className="relative z-10 mt-20">
            <h1 className="font-sans text-[42pt] font-bold leading-[1.05] tracking-tight text-[#1a1a1a]">
              <span className="font-extrabold">Secret</span>{" "}
              <span className="font-light">Hair Journey</span>
            </h1>
            <p className="mt-2 text-[15pt] font-light text-[#444]">
              Proposal — Intelligent Hair Care &amp; Tracking Platform
            </p>
          </div>

          {/* Decorative blue wave (CSS only) */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-[5.8in] z-0 h-[3in] w-full opacity-100"
            viewBox="0 0 1400 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <path
                key={i}
                d={`M -50 ${120 + i * 5} Q 350 ${20 + i * 4}, 750 ${160 + i * 3.5} T 1500 ${220 + i * 3}`}
                fill="none"
                stroke="#1f5fb8"
                strokeOpacity={0.45 + i * 0.008}
                strokeWidth={0.8}
              />
            ))}
          </svg>

          {/* Footer of cover: prototype link + Anormos logo */}
          <div className="absolute inset-x-[0.8in] bottom-[0.6in] z-10 flex items-end justify-between">
            <div>
              <p className="text-[12pt] text-[#222]">
                Interactive Prototype is hosted at{" "}
                <em className="font-semibold not-italic">secret-hair-care.vercel.app</em>
              </p>
            </div>
            <img src={anormosLogo} alt="Anormos" className="h-[60px] w-auto" />
          </div>
        </div>
      </article>

      {/* ============== PAGE 2 — Intro Note ============== */}
      <Page n={2}>
        <p className="mt-2 italic text-[11pt] text-[#444]">
          This proposal strategically leverages prototype screens and representative data to
          enhance the visualization and clearly articulate the functionality and value of each module.
        </p>

        <Section h="Introduction">
          <P>Dear Team,</P>
          <P>
            Thank you for the opportunity to present this proposal. We appreciate the trust extended to us and recognize the strategic
            importance of this initiative in revolutionizing personal hair care through data, tracking, and personalized routines.
          </P>
          <P>
            Our agency specializes in designing and delivering AI-driven consumer platforms for complex, highly personalized journeys —
            particularly where health, wellness, and e-commerce intersect. Through our analysis of the Secret <em>Hair Journey</em>{" "}
            prototype, it is clear that the modern consumer struggles with generic hair care advice, fragmented routines, and a lack of
            measurable progress tracking. Addressing this requires a unified, intelligent system connecting assessment, personalized
            routines, progress tracking, and product discovery into a single ecosystem.
          </P>
          <P>This proposal is guided by four principles:</P>
          <UL items={[
            "Hyper-Personalization — routines built around real individual hair profiles, not generic demographics.",
            "Visual Validation — seamless photo tracking and side-by-side comparisons to prove product efficacy.",
            "Frictionless UX — an intuitive, mobile-first design that builds daily habits effortlessly.",
            "Embedded Intelligence — AI insights integrated into product recommendations and routine adjustments.",
          ]} />
          <P>Warm regards,<br/><strong>The Development Team</strong></P>
        </Section>
      </Page>

      {/* ============== PAGE 3 — Executive Summary & Business Understanding ============== */}
      <Page n={3}>
        <Section n="1" h="Executive Summary">
          <P>
            We propose to design and implement <strong>Secret Hair Journey</strong>, a cloud-based, AI-enhanced ecosystem that transforms how
            users understand, manage, and track their hair health. The platform is divided into four dedicated interfaces:{" "}
            <strong>Consumer Mobile App, Consumer Web App, Expert's Panel, and Admin Panel</strong>.
          </P>
          <P>The unified user flow:</P>
          <p className="my-3 rounded-md bg-[#f6efe1] px-4 py-3 text-center font-serif text-[12pt] text-[#3b2a17]">
            Assess Profile → Generate Routine → Track Progress → Analyze Results → Recommend Adjustments
          </p>
          <h3 className="mt-4 font-serif text-[12pt] font-semibold text-[#3b2a17]">Expected Outcomes</h3>
          <UL items={[
            "+40% increase in routine adherence via smart scheduling and push reminders.",
            "Highly engaged user base — the visual progress tracker creates a powerful weekly habit loop.",
            "Data-driven product sales through algorithm-matched recommendations based on porosity, density and scalp health.",
          ]} />
        </Section>

        <Section n="2" h="Understanding of Business & Current Challenges">
          <P>The platform operates at the intersection of three verticals:</P>
          <ol className="ml-6 list-decimal space-y-1 text-[11pt]">
            <li>Personal Grooming &amp; Wellness</li>
            <li>Habit Tracking &amp; Analytics</li>
            <li>E-commerce / Product Discovery</li>
          </ol>
          <h3 className="mt-4 font-serif text-[12pt] font-semibold text-[#3b2a17]">Key Challenges Identified</h3>
          <UL items={[
            "Fragmented routine management — users track wash days and treatments in their head or generic note apps, leading to missed treatments and stalled progress.",
            "Lack of visual proof — without a dedicated visual timeline, users lose motivation between Day 1 and Day 60.",
            "Product confusion — users don't know their porosity or scalp type and end up with incompatible products that cause buildup or breakage.",
            "No feedback loop — generic platforms can't adapt routines as a user's hair transitions from damaged to healthy.",
          ]} />
        </Section>
      </Page>

      {/* ============== PAGE 4 — Solution, Workflow, Architecture ============== */}
      <Page n={4} compact>
        <Section n="3" h="Solution Overview — Secret Hair Journey" compact>
          <P>
            Secret Hair Journey is designed as an intelligent ecosystem connecting assessment, scheduling, professional consultation,
            and product discovery into a single habit-building engine.
          </P>
          <h3 className="mt-2 font-serif text-[11pt] font-semibold text-[#3b2a17]">Core Capabilities</h3>
          <UL items={[
            "Smart Profile Assessment — comprehensive onboarding capturing hair type (1A to 4C), porosity, scalp condition, goals and environmental factors.",
            "Dynamic Routine Builder — automatically translates the profile into a weekly schedule with wash days, deep conditioning, oiling and trims.",
            "Visual Journey Tracker — secure private photo diary with grid overlays to visualize length retention and thickness improvements.",
            "Expert Guidance — dedicated channel for trichologists and hair experts to review progress, tweak AI routines and prescribe products.",
          ]} />
        </Section>

        <Section n="4" h="End-to-End Workflow" compact>
          <ol className="ml-6 list-decimal space-y-1 text-[10pt]">
            <li><strong>Onboarding &amp; Assessment</strong> — quiz on current hair state, past chemical treatments and goals.</li>
            <li><strong>Routine Generation</strong> — algorithm produces a personalized 30-day calendar.</li>
            <li><strong>Daily Execution</strong> — gentle push reminders for today's tasks (e.g. "Scalp Massage — 5 mins" or "Clarifying Wash Day").</li>
            <li><strong>Logging &amp; Tracking</strong> — user logs completion and uploads bi-weekly progress photos to The Journey.</li>
            <li><strong>Expert / Algorithm Adjustment</strong> — system or assigned expert reviews data and adjusts the routine dynamically.</li>
            <li><strong>Product Discovery</strong> — user shops for or discovers new products exactly when their routine calls for them.</li>
          </ol>
        </Section>

        <Section n="5" h="Solution Architecture" compact>
          <ul className="ml-6 list-disc space-y-1 text-[10pt]">
            {[
              "Frontend — a responsive web dashboard for management and planners, paired with a mobile app designed for on-the-floor staff to update statuses and receive alerts instantly.",
              "Backend — secure, highly scalable cloud-based microservices that ensure if one module (like ordering) experiences heavy traffic, it doesn't slow down the rest of the platform.",
              "Database — MongoDB for flexible user profiles, routines and product catalogs with secure cloud storage for the private photo gallery.",
              "Stack — full-stack MERN (MongoDB, Express, React, Node) for a single, unified JavaScript codebase across web, mobile and server.",
              "Intelligence Layer — custom algorithms mapping hair types and concerns to structured routines and ingredient lists.",
            ].map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </Section>
      </Page>

      {/* ============== PAGE 5 — Product Experience: Mobile intro ============== */}
      <Page n={5}>
        <Section n="6" h="Product Experience & Application Interfaces">
          <P>
            To deliver a comprehensive ecosystem, the platform is divided into four distinct portals, each tailored to its specific user
            persona. The screenshots that follow are taken directly from the live interactive prototype.
          </P>

          <Subsection n="6.1" h="Consumer Mobile App (PWA)">
            <P><em>The daily companion for end-users, optimized for on-the-go tracking and bathroom usage.</em></P>
            <UL items={[
              "Welcome & OTP Sign-in — phone-first, password-less authentication; signup captures full name, email and phone in three short steps.",
              "Today's Dashboard — greeting, hair-health streak and Today's Focus checklist (pre-poo, wash, deep condition) with quick actions.",
              "AI Hair Assessment — adaptive quiz on porosity, density, scalp condition, chemical history and goals; produces the user's Hair ID.",
              "Shop & Product Cabinet — Hair-ID-filtered catalog with concern, type and category filters, wishlist, cart and Razorpay-style checkout (UPI · Card · Netbanking).",
              "The Journey (Tracking) — photo diary with grid overlays, Compare slider between any two dates and consistency metrics.",
              "Profile & Subscriptions — saved address, order history, active subscription plan, expert chat, notifications and support FAQ.",
            ]} />
          </Subsection>
        </Section>
      </Page>

      {/* Mobile screenshots — 2 per page */}
      <FigurePages shots={mobileShots} mobile heading="Consumer Mobile App — Screens" startN={6} />

      {/* Web App intro */}
      <Page n={9}>
        <Section n="6" h="Product Experience (cont.)">
          <Subsection n="6.2" h="Consumer Web App">
            <P><em>The desktop hub for deep-dive analytics, shopping, and long-term planning.</em></P>
            <UL items={[
              "Storefront & Brand — premium responsive home with hero, brand story and gateways into Shop, Ask-AI and the Journal.",
              "Shop, Categories & Concern Hubs — global catalog plus curated category and concern landing pages (e.g. Hair Fall) bundling routines, products and content.",
              "Product Detail — ingredient transparency, reviews, recommended-with picks and add-to-cart with one-tap subscription.",
              "Cart, Checkout & Order Tracking — single-page checkout with applied coupons and shipping estimate; live order status and carrier ETA from the account.",
              "Account & Hair ID — saved profile, addresses, order history, active subscription and the user's Hair ID card.",
              "Ask AI — conversational assistant that answers questions and turns the quiz into an instant personalized routine.",
              "Journal & Reviews — internal SEO blog content, plus verified reviews with photos and ratings breakdown.",
              "About & Contact — brand story and direct support channels.",
            ]} />
          </Subsection>
        </Section>
      </Page>
      <FigurePages shots={webShots} heading="Consumer Web App — Screens" startN={10} />

      {/* Expert intro */}
      <Page n={17}>
        <Section n="6" h="Product Experience (cont.)">
          <Subsection n="6.3" h="Expert's Panel">
            <P><em>The professional portal for Trichologists, Stylists and Dermatologists to monitor and guide clients.</em></P>
            <UL items={[
              "Dashboard — high-level view of all assigned clients with alerts for falling consistency or adverse reactions.",
              "Appointments — calendar of consultations, reschedules and follow-ups across video, chat and phone.",
              "Client Portfolio — Hair IDs, complete quiz results, chemical history and active routines per client.",
              "Prescriptions & Routine Editor — override AI routines, add custom treatments or swap products with full notes.",
              "Client Chat — secure 1:1 messaging synced with the consumer app's expert channel.",
              "AI Review — inspect AI-generated routines for assigned clients and approve, edit or override.",
              "Earnings — per-consultation revenue, pending payouts and tax-ready statements.",
            ]} />
          </Subsection>
        </Section>
      </Page>
      <FigurePages shots={expertShots} heading="Expert's Panel — Screens" startN={18} />

      {/* Admin intro */}
      <Page n={21}>
        <Section n="6" h="Product Experience (cont.)">
          <Subsection n="6.4" h="Admin Panel">
            <P><em>The command center for platform owners to manage users, content and the business.</em></P>
            <UL items={[
              "Control Tower (Dashboard) — platform KPIs including DAU, retention, popular products, subscriptions and revenue.",
              "Orders & Shipments — single source of truth for orders, refunds, carrier tracking, ETAs and exceptions.",
              "Product Database (CMS) — add and tag products with ingredients so they surface correctly in the Matchmaker.",
              "Customers, Experts & Consultations — onboard and vet experts, assign clients, manage tickets and view all bookings.",
              "Subscriptions — recurring revenue cohort with active plans, churn, MRR and renewal pipeline.",
              "Content & Journal CMS — author and schedule blog posts, banners and announcements.",
              "AI Recommendations — tune the matchmaker / routine builder rules without engineering involvement.",
              "Settings & Roles — brand settings, payment gateways, shipping zones and team role management.",
            ]} />
          </Subsection>
        </Section>
      </Page>
      <FigurePages shots={adminShots} heading="Admin Panel — Screens" startN={22} />

      {/* ============== Roadmap ============== */}
      <Page n={28}>
        <Section n="7" h="Implementation Roadmap (4 Phases)">
          <P>
            The project will be delivered over an accelerated 12-week timeline, mapped to a total project cost of <strong>₹9.30 Lakhs + 18% GST</strong>,
            divided into four distinct, value-driven phases that deliver all four interfaces.
          </P>
          <table className="my-4 w-full border-collapse text-[10pt]">
            <thead>
              <tr className="bg-[#f4eee4] text-left text-[#3b2a17]">
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold">Phase</th>
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold">Timeline</th>
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold">Scope of Work</th>
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold text-right">Cost (INR)</th>
              </tr>
            </thead>
            <tbody>
              {phases.map((p) => (
                <tr key={p.key} className="align-top">
                  <td className="border border-[#e6dfd2] px-3 py-2"><strong>{p.key}</strong><br/><span className="text-[#6a503a]">{p.name}</span></td>
                  <td className="border border-[#e6dfd2] px-3 py-2 whitespace-nowrap">{p.weeks}</td>
                  <td className="border border-[#e6dfd2] px-3 py-2">{p.scope}</td>
                  <td className="border border-[#e6dfd2] px-3 py-2 text-right whitespace-nowrap">{p.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </Page>

      {/* ============== Team Structure (own page) ============== */}
      <Page n={29}>
        <Section n="8" h="Team Structure">
          <table className="my-3 w-full border-collapse text-[10.5pt]">
            <thead>
              <tr className="bg-[#f4eee4] text-left text-[#3b2a17]">
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold">Role</th>
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold">Key Responsibilities</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Project Manager","Primary point of contact; ensures every milestone is hit on time and within budget."],
                ["UI/UX Designer","Crafts the intuitive interface ensuring the apps look premium, clean and engaging across all personas."],
                ["Full-Stack Developer","Writes the core logic, builds the four interfaces and connects the frontend to backend databases."],
                ["QA Engineer","Conducts rigorous automated and manual testing to keep the platform bug-free and data secure across all portals."],
              ].map(([r,d])=>(
                <tr key={r} className="align-top">
                  <td className="border border-[#e6dfd2] px-3 py-2 font-semibold">{r}</td>
                  <td className="border border-[#e6dfd2] px-3 py-2">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </Page>

      {/* ============== Commercials ============== */}
      <Page n={30}>
        <Section n="9" h="Commercials">
          <p className="my-3 rounded-md bg-[#f6efe1] px-4 py-3 text-center font-serif text-[14pt] font-semibold text-[#3b2a17]">
            Total Project Cost: ₹9,30,000 + 18% GST
          </p>
          <P>The structure is divided into milestone-based payments aligned with the four delivery phases to ensure continuous value delivery.</P>
          <table className="my-3 w-full border-collapse text-[10.5pt]">
            <thead>
              <tr className="bg-[#f4eee4] text-left text-[#3b2a17]">
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold">Phase</th>
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold">Milestone</th>
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold text-right">% Allocation</th>
                <th className="border border-[#e6dfd2] px-3 py-2 font-semibold text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {phases.map((p)=>(
                <tr key={p.key}>
                  <td className="border border-[#e6dfd2] px-3 py-2">{p.key}</td>
                  <td className="border border-[#e6dfd2] px-3 py-2">{p.name}</td>
                  <td className="border border-[#e6dfd2] px-3 py-2 text-right">{p.pct}</td>
                  <td className="border border-[#e6dfd2] px-3 py-2 text-right whitespace-nowrap">{p.cost}</td>
                </tr>
              ))}
              <tr className="bg-[#faf5ea] font-semibold text-[#3b2a17]">
                <td className="border border-[#e6dfd2] px-3 py-2">Total</td>
                <td className="border border-[#e6dfd2] px-3 py-2">Full End-to-End Delivery</td>
                <td className="border border-[#e6dfd2] px-3 py-2 text-right">100%</td>
                <td className="border border-[#e6dfd2] px-3 py-2 text-right whitespace-nowrap">₹9,30,000</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-[10.5pt] font-semibold text-[#3b2a17]">
            All amounts above are exclusive of taxes. 18% GST will be applicable on each milestone invoice.
          </p>
          <p className="text-[9.5pt] italic text-[#777]">
            Note: This proposal covers custom software design, development and deployment services. It does not include third-party hosting
            costs (e.g. AWS / Vercel) or domain registrations.
          </p>
        </Section>
      </Page>

      {/* ============== Impact + Risks + Future Roadmap (single page) ============== */}
      <Page n={31}>
        <Section n="10" h="Expected Business Impact">
          <UL items={[
            "High Retention — health and habit-tracking apps with visual progress see ~3x higher 90-day retention vs. standard utility apps.",
            "Monetization Readiness — naturally lends itself to affiliate marketing, brand partnerships, or a premium tier (e.g. 'Secret Hair Journey PRO').",
            "Community Building — a central hub where users feel understood and guided builds immense brand loyalty.",
          ]} />
        </Section>

        <Section n="11" h="Risks & Mitigation">
          <table className="my-3 w-full border-collapse text-[10.5pt]">
            <thead>
              <tr className="bg-[#f4eee4] text-left text-[#3b2a17]">
                <th className="border border-[#e6dfd2] px-3 py-1.5 font-semibold">Risk</th>
                <th className="border border-[#e6dfd2] px-3 py-1.5 font-semibold">Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["User Drop-off","Gamification (streaks, achievement badges) and well-timed, non-intrusive push notifications keep users engaged."],
                ["Data Privacy","Hair and face photos are highly personal — enterprise-grade encryption and strict privacy policies ensure user data is never compromised."],
                ["Scope Creep","With four portals, scope is tightly managed via strict agile delivery, MVP boundaries in Phase 1, and change-request protocols."],
              ].map(([r,m])=>(
                <tr key={r} className="align-top">
                  <td className="border border-[#e6dfd2] px-3 py-1.5 font-semibold">{r}</td>
                  <td className="border border-[#e6dfd2] px-3 py-1.5">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section n="12" h="Future Roadmap (Post-Launch)">
          <P>While the initial four phases cover the complete core ecosystem, the architecture is built to support future scaling:</P>
          <UL items={[
            "Native App Stores — wrap the PWA into React Native for official deployment on the App Store and Google Play.",
            "AI Computer Vision — machine-learning models to automatically analyze uploaded photos for split ends, frizz or thinning.",
          ]} />
        </Section>

        <section className="mt-4 grid grid-cols-2 gap-12 border-t border-[#e6dfd2] pt-3">
          <div>
            <p className="text-[10pt] uppercase tracking-[0.25em] text-[#8a7558]">Accepted by Client</p>
            <div className="mt-6 border-t border-[#444]"></div>
            <p className="mt-1 text-[10pt] text-[#777]">Name, Designation &amp; Date</p>
          </div>
          <div>
            <p className="text-[10pt] uppercase tracking-[0.25em] text-[#8a7558]">For The Development Team</p>
            <div className="mt-6 border-t border-[#444]"></div>
            <p className="mt-1 text-[10pt] text-[#777]">Authorised Signatory &amp; Date</p>
          </div>
        </section>
      </Page>

      {/* ============== END / BACK COVER PAGE ============== */}
      <article className="doc mx-auto mt-8 max-w-[8.5in] bg-white px-[0.9in] py-[0.8in] text-[11pt] leading-[1.65] text-[#222] shadow-xl print:shadow-none print:mt-0">
        <div className="flex h-[9.4in] flex-col items-center justify-center text-center">
          <img src={anormosLogo} alt="Anormos" className="h-[80px] w-auto" />
          <p className="mt-12 italic text-[11pt] text-[#444]">
            Prepared by Anormos — for Secret Hair Journey.
          </p>
          <p className="italic text-[11pt] text-[#444]">
            Document classification: Confidential.
          </p>
          <p className="mt-10 text-[11pt] tracking-[0.2em] text-[#666]">
            ——&nbsp;&nbsp;END OF DOCUMENT&nbsp;&nbsp;——
          </p>
        </div>
      </article>

      <style>{`
        @media print {
          /* Match the Puppeteer PDF exactly: Letter page, zero @page margin.
             All padding/margins are baked into each .doc article. */
          @page { size: 8.5in 11in; margin: 0; }
          html, body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .doc {
            box-shadow: none !important;
            margin: 0 auto !important;
            width: 8.5in !important;
            max-width: 8.5in !important;
            height: 11in !important;
            min-height: 11in !important;
            overflow: hidden !important;
            page-break-after: always;
            break-after: page;
          }
          .doc:last-of-type { page-break-after: auto; break-after: auto; }
          figure, table { break-inside: avoid; page-break-inside: avoid; }
          h2, h3 { break-after: avoid; page-break-after: avoid; }
        }
        .doc h2, .doc h3 { font-family: 'Georgia', 'Times New Roman', serif; }
        .doc { font-family: 'Georgia', 'Times New Roman', serif; }
        .doc.cover, .doc.cover h1 { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; }
      `}</style>
    </div>
  );
}

/* ---------- Building blocks ---------- */

function Page({ n, children, compact }: { n: number; children: React.ReactNode; compact?: boolean }) {
  return (
    <article
      className={
        "doc mx-auto mt-8 max-w-[8.5in] bg-white px-[0.9in] text-[#222] shadow-xl print:shadow-none print:mt-0 " +
        (compact
          ? "pt-[0.4in] pb-[0.4in] text-[10pt] leading-[1.45]"
          : "pt-[0.55in] pb-[0.7in] text-[11pt] leading-[1.65]")
      }
    >
      <header className={compact ? "mb-3" : "mb-6"}>
        <div className="flex items-center justify-between">
          <img src={anormosLogo} alt="Anormos" className="h-[36px] w-auto" />
          <span className="font-serif text-[13pt] text-[#666]">{n}</span>
        </div>
        <div className="mt-3 flex h-[7px] w-full overflow-hidden rounded-full">
          <div className="flex-1 bg-[#5a87c4]" />
          <div className="flex-1 bg-[#a9c2e2]" />
          <div className="flex-1 bg-[#244e8d]" />
          <div className="flex-1 bg-[#16365f]" />
        </div>
      </header>
      {children}
    </article>
  );
}

function Section({ n, h, children, compact }: { n?: string; h: string; children: React.ReactNode; compact?: boolean }) {
  return (
    <section className={compact ? "pp mt-3" : "pp mt-6"}>
      <h2
        className={
          (compact
            ? "mb-1 border-b border-[#e6dfd2] pb-0.5 font-serif text-[13pt] "
            : "mb-2 border-b border-[#e6dfd2] pb-1 font-serif text-[16pt] ") +
          "font-semibold text-[#3b2a17]"
        }
      >
        {n ? `${n}. ` : ""}{h}
      </h2>
      <div className={compact ? "space-y-1" : "space-y-2"}>{children}</div>
    </section>
  );
}

function Subsection({ n, h, children }: { n: string; h: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="mb-2 font-serif text-[13pt] font-semibold text-[#3b2a17]">{n} {h}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[11pt] text-[#222]">{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="ml-6 list-disc space-y-1.5 text-[11pt]">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

function FigureBlock({ shot, mobile }: { shot: Shot; mobile?: boolean }) {
  return (
    <figure className="rounded-md border border-[#e6dfd2] bg-[#fafaf6] p-1.5">
      <img
        src={shot.src}
        alt={shot.title}
        className={`mx-auto block rounded border border-[#e6dfd2] bg-white object-contain ${
          mobile
            ? "max-h-[3.3in] w-auto max-w-[2.1in]"
            : "h-auto w-full max-h-[3.4in] max-w-[6.3in]"
        }`}
        loading="eager"
        decoding="sync"
      />
      <figcaption className="mt-1.5 text-center text-[10pt] text-[#3b2a17]">
        <strong>{shot.title}</strong>
        <span className="mt-0.5 block text-[9.5pt] italic leading-snug text-[#555]">{shot.caption}</span>
      </figcaption>
    </figure>
  );
}

function FigurePages({ shots, mobile = false, heading, startN }: { shots: Shot[]; mobile?: boolean; heading?: string; startN: number }) {
  // Group into pairs of 2 — one page per pair
  const pairs: Shot[][] = [];
  for (let i = 0; i < shots.length; i += 2) pairs.push(shots.slice(i, i + 2));
  return (
    <>
      {pairs.map((pair, idx) => (
        <Page key={`${heading}-${idx}`} n={startN + idx} compact>
          {heading && idx === 0 ? (
            <h3 className="mb-1.5 font-serif text-[12pt] font-semibold text-[#3b2a17]">{heading}</h3>
          ) : null}
          <div className="mt-1 flex flex-col gap-2">
            {pair.map((s) => (
              <FigureBlock key={s.src} shot={s} mobile={mobile} />
            ))}
          </div>
        </Page>
      ))}
    </>
  );
}

export default ProposalPage;
