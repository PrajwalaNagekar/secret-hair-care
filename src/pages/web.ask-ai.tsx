import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Sparkles, Phone, ShoppingBag, ArrowRight } from "lucide-react";
import { WEB_PRODUCTS, formatINR, type WebProduct } from "@/lib/web-data";
import { useAuth } from "@/lib/web-auth";
import { useCart } from "@/lib/web-cart";
import askAiLogo from "@/assets/secret-logo-black.png";



type Concern = "Hair fall" | "Hair growth" | "Grey hair" | "Dandruff";
const CONCERNS: Concern[] = ["Hair fall", "Hair growth", "Grey hair", "Dandruff"];
const concernAlias: Record<Concern, string[]> = {
  "Hair fall": ["hair-fall", "thinning"],
  "Hair growth": ["growth", "thinning"],
  "Grey hair": ["greying"],
  Dandruff: ["dandruff", "scalp-care"],
};

type Step = "concern" | "intensity" | "duration" | "age" | "scalp" | "diet" | "results";
const ORDER: Step[] = ["concern", "intensity", "duration", "age", "scalp", "diet", "results"];

type Answers = {
  concern?: Concern;
  intensity: number;
  duration?: string;
  age?: string;
  scalp?: string;
  diet?: string;
};

function AskAiPage() {
  const [step, setStep] = useState<Step>("concern");
  const [answers, setAnswers] = useState<Answers>({ intensity: 5 });
  const [authPrompt, setAuthPrompt] = useState<null | "checkout" | "expert">(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { add } = useCart();

  const recs = useMemo<WebProduct[]>(() => {
    if (!answers.concern) return [];
    const keys = concernAlias[answers.concern];
    return WEB_PRODUCTS.filter((p) => p.concerns.some((c) => keys.includes(c))).slice(0, 4);
  }, [answers.concern]);

  const goNext = () => {
    const idx = ORDER.indexOf(step);
    if (idx >= 0 && idx < ORDER.length - 1) setStep(ORDER[idx + 1]);
  };
  const goPrev = () => {
    const idx = ORDER.indexOf(step);
    if (idx > 0) setStep(ORDER[idx - 1]);
  };

  const proceedCheckout = () => {
    if (!user) return setAuthPrompt("checkout");
    recs.forEach((p) => add(p.id));
    navigate("/web/cart");
  };
  const connectExpert = () => {
    if (!user) return setAuthPrompt("expert");
    navigate("/web/contact");
  };

  const reset = () => {
    setStep("concern");
    setAnswers({ intensity: 5 });
    setAuthPrompt(null);
  };

  const stepIndex = ORDER.indexOf(step);
  const progress = ((stepIndex + 1) / ORDER.length) * 100;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-8 text-center">
        <img
          src={askAiLogo}
          alt="Secret Hair Care"
          width={1376}
          height={768}
          loading="lazy"
          className="mx-auto mb-4 h-16 w-auto md:h-20"
        />
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/70">
          <Sparkles className="h-3 w-3" /> Ask Secret AI
        </div>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">Personalised Hair Consultation</h1>
        <p className="mt-3 text-sm text-foreground/70 md:text-base">
          Answer a few questions and get a personalised hair-care plan in under a minute.
        </p>
      </div>

      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-border">
        <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
        {step === "concern" && (
          <Question label="Step 1 — Concern" title="What's your main concern right now?">
            <ChipGrid>
              {CONCERNS.map((c) => (
                <Chip
                  key={c}
                  active={answers.concern === c}
                  onClick={() => {
                    setAnswers({ ...answers, concern: c });
                    setTimeout(goNext, 150);
                  }}
                >
                  {c}
                </Chip>
              ))}
            </ChipGrid>
          </Question>
        )}

        {step === "intensity" && (
          <Question label="Step 2 — Severity" title={`On a scale of 1–10, how intense is your ${answers.concern}?`}>
            <div className="mx-auto max-w-md">
              <input
                type="range"
                min={1}
                max={10}
                value={answers.intensity}
                onChange={(e) => setAnswers({ ...answers, intensity: Number(e.target.value) })}
                className="w-full accent-foreground"
              />
              <div className="mt-2 flex justify-between text-xs text-foreground/60">
                <span>Mild</span>
                <span className="font-semibold text-foreground text-base">{answers.intensity} / 10</span>
                <span>Severe</span>
              </div>
            </div>
            <Footer onPrev={goPrev} onNext={goNext} nextLabel="Continue" />
          </Question>
        )}

        {step === "duration" && (
          <Question label="Step 3 — Duration" title="How long have you experienced this?">
            <ChipGrid>
              {["< 1 month", "1–3 months", "3–6 months", "6+ months"].map((o) => (
                <Chip key={o} active={answers.duration === o} onClick={() => { setAnswers({ ...answers, duration: o }); setTimeout(goNext, 150); }}>{o}</Chip>
              ))}
            </ChipGrid>
            <Footer onPrev={goPrev} />
          </Question>
        )}

        {step === "age" && (
          <Question label="Step 4 — Age" title="What's your age range?">
            <ChipGrid>
              {["Under 18", "18–25", "26–35", "36–45", "46+"].map((o) => (
                <Chip key={o} active={answers.age === o} onClick={() => { setAnswers({ ...answers, age: o }); setTimeout(goNext, 150); }}>{o}</Chip>
              ))}
            </ChipGrid>
            <Footer onPrev={goPrev} />
          </Question>
        )}

        {step === "scalp" && (
          <Question label="Step 5 — Scalp" title="How would you describe your scalp?">
            <ChipGrid>
              {["Oily", "Dry", "Normal", "Combination"].map((o) => (
                <Chip key={o} active={answers.scalp === o} onClick={() => { setAnswers({ ...answers, scalp: o }); setTimeout(goNext, 150); }}>{o}</Chip>
              ))}
            </ChipGrid>
            <Footer onPrev={goPrev} />
          </Question>
        )}

        {step === "diet" && (
          <Question label="Step 6 — Lifestyle" title="How is your diet & water intake?">
            <ChipGrid>
              {["Balanced", "Low protein", "Low water", "Inconsistent"].map((o) => (
                <Chip key={o} active={answers.diet === o} onClick={() => { setAnswers({ ...answers, diet: o }); setTimeout(goNext, 150); }}>{o}</Chip>
              ))}
            </ChipGrid>
            <Footer onPrev={goPrev} />
          </Question>
        )}

        {step === "results" && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Your plan</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
                Personalised for {answers.concern} (severity {answers.intensity}/10)
              </h2>
              <p className="mt-2 text-sm text-foreground/70">
                Based on your answers, here's the routine our AI recommends. An expert can fine-tune it for you.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {recs.map((p) => (
                <Link
                  key={p.id}
                  to={`/web/product/${p.id}`}
                  
                  className="group flex gap-4 rounded-2xl border border-border bg-background p-4 transition-shadow hover:shadow-md"
                >
                  <img src={p.image} alt={p.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-semibold">{p.name}</p>
                    <p className="text-xs text-foreground/60">{p.category}</p>
                    <p className="mt-2 text-sm font-semibold">{formatINR(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>

            {authPrompt && (
              <div className="rounded-2xl border border-foreground/40 bg-foreground/5 p-4 text-sm">
                <p className="font-semibold">
                  Sign in to {authPrompt === "expert" ? "connect with an expert" : "proceed to checkout"}
                </p>
                <p className="mt-1 text-foreground/70">It only takes a moment.</p>
                <div className="mt-3 flex gap-2">
                  <Link to="/web/login" className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-background">Sign In</Link>
                  <Link to="/web/register" className="rounded-full border border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]">Create Account</Link>
                </div>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <button onClick={proceedCheckout} className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:opacity-90">
                <ShoppingBag className="h-4 w-4" /> Proceed to Checkout
              </button>
              <button onClick={connectExpert} className="flex items-center justify-center gap-2 rounded-full border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-foreground/5">
                <Phone className="h-4 w-4" /> Connect with Expert
              </button>
            </div>

            <div className="text-center">
              <button onClick={reset} className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground">
                Restart questionnaire
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-8 text-center text-xs text-foreground/50">
        Not medical advice. For severe scalp conditions, please consult a dermatologist.
      </p>
    </div>
  );
}

function Question({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">{label}</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ChipGrid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap justify-center gap-3">{children}</div>;
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
        active ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Footer({ onPrev, onNext, nextLabel }: { onPrev?: () => void; onNext?: () => void; nextLabel?: string }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onPrev ? (
        <button onClick={onPrev} className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground">
          ← Back
        </button>
      ) : <span />}
      {onNext && (
        <button onClick={onNext} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:opacity-90">
          {nextLabel ?? "Next"} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default AskAiPage;
