// Cross-app chat bridge between mobile app and expert panel.
// Backed by localStorage so messages flow either direction in real time
// across tabs / sub-routes (mock real-time behaviour, no backend).

export type BridgeMessage = {
  id: string;
  from: "expert" | "user";
  text: string;
  time: string; // HH:mm
};

const STORAGE_PREFIX = "shc-chat:";
const EVENT_NAME = "shc-chat-update";

export function chatKey(customerId: string) {
  return `${STORAGE_PREFIX}${customerId}`;
}

export function loadThread(customerId: string, seed: BridgeMessage[] = []): BridgeMessage[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(chatKey(customerId));
    if (!raw) {
      if (seed.length) saveThread(customerId, seed);
      return seed;
    }
    return JSON.parse(raw) as BridgeMessage[];
  } catch {
    return seed;
  }
}

export function saveThread(customerId: string, messages: BridgeMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(chatKey(customerId), JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { customerId } }));
  } catch {
    /* noop */
  }
}

export function appendMessage(customerId: string, message: BridgeMessage) {
  const next = [...loadThread(customerId), message];
  saveThread(customerId, next);
}

export function subscribe(
  customerId: string,
  cb: (msgs: BridgeMessage[]) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail as { customerId: string } | undefined;
    if (detail?.customerId && detail.customerId !== customerId) return;
    cb(loadThread(customerId));
  };
  const storageHandler = (e: StorageEvent) => {
    if (e.key && e.key === chatKey(customerId)) cb(loadThread(customerId));
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
}

export function nowTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// The mobile app demo user always maps to the same customer id used
// in the expert panel mock data, so the two sides see the same thread.
export const DEMO_CUSTOMER_ID = "c-1001";

export const EXPERT_RESPONSE_TEMPLATES: { label: string; text: string }[] = [
  {
    label: "Welcome",
    text: "Hi! I've reviewed your assessment. How are you feeling about your routine this week?",
  },
  {
    label: "Application tip",
    text: "Apply 4–5 drops to your scalp at night, massage for 60 seconds, and don't rinse off.",
  },
  {
    label: "Pause actives",
    text: "Let's pause the active serum for 2 nights and use only the calming concentrate. Share a photo if irritation continues.",
  },
  {
    label: "Photo request",
    text: "Could you share a fresh hairline and crown photo in natural light? It really helps me track progress.",
  },
  {
    label: "Reorder reminder",
    text: "You're on day 34 — let's reorder your kit so there's no routine gap. I'll add it to your subscription.",
  },
  {
    label: "Schedule call",
    text: "Happy to jump on a quick call. Does Friday evening around 7 PM work for you?",
  },
  {
    label: "Encourage consistency",
    text: "Most users see visible texture changes around week 6 — keep going! You're doing great.",
  },
];
