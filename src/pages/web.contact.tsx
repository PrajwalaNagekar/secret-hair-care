import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Check } from "lucide-react";



function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">We'd love to hear from you</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold md:text-6xl">Contact us</h1>
      </div>

      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-4">
          <Card icon={MapPin} title="Visit our store">
            Palladium Mall, LG Floor, Phoenix Marketcity, Velachery, Chennai, Tamil Nadu — 600042
          </Card>
          <Card icon={Phone} title="Call us">
            <a href="tel:+918147785553" className="hover:text-foreground">+91 81477 85553</a>
          </Card>
          <Card icon={Mail} title="Email us">
            <a href="mailto:info@thesecrethaircare.com" className="hover:text-foreground">info@thesecrethaircare.com</a>
          </Card>
          <Card icon={MessageCircle} title="WhatsApp">
            <a href="https://wa.me/+918147785553" target="_blank" rel="noreferrer" className="hover:text-foreground">
              Message us on WhatsApp
            </a>
          </Card>
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-3xl border border-border bg-card p-6 md:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.92_0.06_140)]">
                <Check className="h-8 w-8 text-[oklch(0.45_0.15_140)]" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-semibold">Thanks for reaching out!</h3>
              <p className="mt-2 text-foreground/70">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl font-semibold">Send us a message</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input label="First name" required />
                <Input label="Last name" required />
                <Input label="Email" type="email" required />
                <Input label="Phone" type="tel" />
              </div>
              <div className="mt-4">
                <Input label="Subject" />
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">Message</span>
                <textarea
                  rows={5}
                  required
                  className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-foreground"
                />
              </label>
              <button type="submit" className="mt-6 w-full rounded-full bg-foreground py-3.5 text-sm font-semibold uppercase tracking-widest text-background hover:opacity-90 md:w-auto md:px-10">
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-serif text-lg font-semibold">{title}</p>
        <p className="mt-1 text-sm text-foreground/70">{children}</p>
      </div>
    </div>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">{label}</span>
      <input
        {...rest}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}

export default ContactPage;
