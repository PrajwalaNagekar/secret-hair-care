import { useState, useRef, useEffect } from "react";
import { Send, Search, Phone, ChevronDown } from "lucide-react";
import { ADMIN_CUSTOMERS } from "@/lib/back-office-data";
import {
  EXPERT_RESPONSE_TEMPLATES,
  appendMessage,
  loadThread,
  nowTime,
  saveThread,
  subscribe as subscribeChat,
  type BridgeMessage,
} from "@/lib/chat-bridge";



const ME = "Dr. Aisha Menon";

type Msg = { id: string; from: "expert" | "customer"; text: string; time: string };

const SEED_THREADS: Record<string, Msg[]> = {
  "c-1001": [
    { id: "m1", from: "customer", text: "Hi Dr Aisha — my pillow looked cleaner this morning, fewer strands.", time: "09:12" },
    { id: "m2", from: "expert", text: "That's wonderful Sarah! Keep applying the Density Signal Serum every night for 4 more weeks.", time: "09:18" },
    { id: "m3", from: "customer", text: "Got it. Should I continue the supplement too?", time: "09:20" },
    { id: "m4", from: "expert", text: "Yes — keep the supplement going for the full 90-day cycle. Have you noticed any change in the front hairline?", time: "09:22" },
    { id: "m5", from: "customer", text: "Yes, the baby hairs near the temples look more visible. I'll send a photo this weekend.", time: "09:25" },
  ],
  "c-1004": [
    { id: "m1", from: "customer", text: "Doctor, my crown looks slightly fuller — should I share a photo?", time: "Yesterday" },
    { id: "m2", from: "expert", text: "Yes please share, ideally in natural light.", time: "Yesterday" },
    { id: "m3", from: "customer", text: "Sent! Also — is it okay to color my hair next week or should I wait?", time: "Yesterday" },
    { id: "m4", from: "expert", text: "Photos look promising 🌿. For colouring — please wait at least 10 more days so the scalp is not stressed mid-treatment.", time: "08:02" },
    { id: "m5", from: "customer", text: "Okay noted. Should I keep washing twice a week with the hibiscus shampoo?", time: "08:14" },
  ],
};

// Realistic mock customer auto-replies based on what the expert says.
function mockCustomerReply(expertMsg: string, customerName: string): string {
  const m = expertMsg.toLowerCase();
  const first = customerName.split(" ")[0];

  if (/(hi|hello|hey|good (morning|evening|afternoon))/.test(m)) {
    return `Hi Dr Aisha! Thanks for checking in — actually I had a quick question about my routine.`;
  }
  if (/(serum|density|active)/.test(m)) {
    return "Got it, I've been applying it every night before bed. Should I increase the dose or stay at 4 drops?";
  }
  if (/(shampoo|wash|cleanse)/.test(m)) {
    return "Okay, I'll switch to twice a week. Can I keep using the hibiscus shampoo or should I rotate?";
  }
  if (/(conditioner|mask|deep)/.test(m)) {
    return "Sure — I'll add the mask on Sunday nights. How long should I leave it on?";
  }
  if (/(oil|massage|champi)/.test(m)) {
    return "I tried the rosemary oil last weekend, scalp felt much calmer the next day. Should I do it twice weekly?";
  }
  if (/(photo|picture|image|upload|share)/.test(m)) {
    return "Sure, I'll send fresh hairline and crown shots in natural light tomorrow morning.";
  }
  if (/(supplement|biotin|vitamin|tablet|capsule)/.test(m)) {
    return "Yes, I've been taking it daily after breakfast. No side effects so far.";
  }
  if (/(refill|reorder|kit|subscription)/.test(m)) {
    return "My current bottle should last another 10 days — should I reorder now or wait?";
  }
  if (/(pause|stop|hold|skip)/.test(m)) {
    return "Okay, I'll pause for a couple of days and watch how my scalp settles.";
  }
  if (/(itch|red|burn|irritat|sensitiv)/.test(m)) {
    return "It's mostly around the temples and only after wash days. No bleeding or visible patches.";
  }
  if (/(diet|sleep|stress|water|hydrat|protein)/.test(m)) {
    return "Sleep has been around 6 hours, work has been hectic. I'll try to fix it and drink more water.";
  }
  if (/(appointment|consultation|call|book|schedule)/.test(m)) {
    return "Could we do Friday evening around 7? I'm free after work.";
  }
  if (/(progress|week|improvement|track)/.test(m)) {
    return "I do feel a difference — my parting looks less wide than it did a month ago.";
  }
  if (/(colour|color|dye|highlight|bleach|chemical)/.test(m)) {
    return "Got it, I'll postpone the colour appointment till you give the green signal.";
  }
  if (/(heat|straighten|blow ?dry|iron)/.test(m)) {
    return "Understood — I'll air-dry from now on and avoid the straightener.";
  }
  if (/(price|cost|bundle|combo|discount)/.test(m)) {
    return "Sounds good. Could you share the bundle link so I can check it out?";
  }
  if (/(thank|great|good job|well done|amazing)/.test(m)) {
    return "Thank you so much! Really appreciate the personalised attention 🌿";
  }
  if (/(\?|how|when|what|where|why)/.test(m)) {
    return `Good question — I'm not 100% sure. Could you guide me on what's best?`;
  }

  const generic = [
    "Got it, thank you Dr Aisha.",
    `Okay noted! Will start from tomorrow.`,
    "That makes sense. I'll follow this for the next 2 weeks.",
    `Thanks for clarifying — I was actually wondering about this.`,
    `Sure thing, I'll log this in my routine tracker.`,
    "Perfect — I'll send an update next Sunday.",
    `Will do! Anything I should especially watch for?`,
  ];
  return generic[Math.floor(Math.random() * generic.length)] + ` — ${first}`;
}

function ExpertChat() {
  const myCustomers = ADMIN_CUSTOMERS.filter((c) => c.assignedExpert === ME);
  const [active, setActive] = useState(myCustomers[0]?.id ?? null);
  const [threads, setThreads] = useState<Record<string, Msg[]>>(SEED_THREADS);
  const [draft, setDraft] = useState("");
  const [q, setQ] = useState("");
  const [typing, setTyping] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const BRIDGE_CUSTOMER = "c-1001"; // shared with the mobile app demo user

  // Sync the bridged thread (mobile app ↔ expert panel) for c-1001.
  useEffect(() => {
    const initial = SEED_THREADS[BRIDGE_CUSTOMER] ?? [];
    const seed: BridgeMessage[] = initial.map((m) => ({
      id: m.id,
      from: m.from === "customer" ? "user" : "expert",
      text: m.text,
      time: m.time,
    }));
    const existing = loadThread(BRIDGE_CUSTOMER, seed);
    setThreads((t) => ({
      ...t,
      [BRIDGE_CUSTOMER]: existing.map((m) => ({
        id: m.id,
        from: m.from === "user" ? "customer" : "expert",
        text: m.text,
        time: m.time,
      })),
    }));
    const unsub = subscribeChat(BRIDGE_CUSTOMER, (msgs) => {
      setThreads((t) => ({
        ...t,
        [BRIDGE_CUSTOMER]: msgs.map((m) => ({
          id: m.id,
          from: m.from === "user" ? "customer" : "expert",
          text: m.text,
          time: m.time,
        })),
      }));
    });
    return unsub;
  }, []);

  const messages = active ? threads[active] ?? [] : [];
  const activeCustomer = myCustomers.find((p) => p.id === active);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, active, typing]);

  const send = (overrideText?: string) => {
    const text = (overrideText ?? draft).trim();
    if (!text || !active || !activeCustomer) return;
    const time = nowTime();
    const msg: Msg = { id: `m-${Date.now()}`, from: "expert", text, time };

    if (active === BRIDGE_CUSTOMER) {
      // Push expert message into the shared bridge so the mobile app receives it.
      appendMessage(BRIDGE_CUSTOMER, { id: msg.id, from: "expert", text, time });
      setDraft("");
      return;
    }

    setThreads((t) => ({ ...t, [active]: [...(t[active] ?? []), msg] }));
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      const replyText = mockCustomerReply(text, activeCustomer.name);
      setThreads((t) => ({
        ...t,
        [active]: [...(t[active] ?? []), { id: `m-${Date.now()}-r`, from: "customer", text: replyText, time: nowTime() }],
      }));
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const filtered = myCustomers.filter((p) => q === "" || p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="grid gap-4 md:grid-cols-[300px_1fr]" style={{ height: "calc(100dvh - 200px)" }}>
      {/* Threads list */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border p-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
            <Search className="h-4 w-4 text-foreground/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className="w-full bg-transparent text-sm outline-none" />
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100% - 64px)" }}>
          {filtered.map((p) => {
            const lastMsg = (threads[p.id] ?? [])[((threads[p.id]?.length ?? 1) - 1)];
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`flex w-full items-center gap-3 border-b border-border px-3 py-3 text-left transition-colors ${active === p.id ? "bg-muted" : "hover:bg-muted/40"}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="truncate text-xs text-foreground/60">{lastMsg?.text ?? "No messages yet"}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
        {activeCustomer ? (
          <>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="font-serif text-lg font-semibold">{activeCustomer.name}</p>
                <p className="text-xs text-foreground/60">{activeCustomer.topConcern} · AI score {activeCustomer.aiScore}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${activeCustomer.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                  aria-label={`Call ${activeCustomer.name}`}
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-800">Online</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[oklch(0.97_0.012_60)] p-5">
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "expert" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.from === "expert" ? "bg-foreground text-background" : "bg-card border border-border"}`}>
                      <p>{m.text}</p>
                      <p className={`mt-1 text-[10px] ${m.from === "expert" ? "text-background/60" : "text-foreground/50"}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-border bg-card px-4 py-2 text-xs text-foreground/60">
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
            </div>

            <div className="border-t border-border bg-card p-3">
              <div className="mb-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTemplatesOpen((v) => !v)}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold text-foreground/70 hover:bg-muted"
                >
                  Templates <ChevronDown className={`h-3 w-3 transition-transform ${templatesOpen ? "rotate-180" : ""}`} />
                </button>
                {templatesOpen && (
                  <span className="text-[11px] text-foreground/50">Click to insert into the message.</span>
                )}
              </div>
              {templatesOpen && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {EXPERT_RESPONSE_TEMPLATES.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => {
                        setDraft(t.text);
                        setTemplatesOpen(false);
                      }}
                      className="rounded-full border border-border bg-background px-3 py-1 text-[11px] hover:bg-muted"
                      title={t.text}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 rounded-full border border-border bg-background pl-4 pr-1.5">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message…"
                  className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-foreground/40"
                />
                <button onClick={() => send()} aria-label="Send" className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background hover:opacity-90">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-foreground/60">Select a customer to chat</div>
        )}
      </div>
    </div>
  );
}

export default ExpertChat;
