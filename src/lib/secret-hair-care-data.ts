export type ProductCategory =
  | "Shampoo"
  | "Serum"
  | "Oil"
  | "Conditioner"
  | "Supplement"
  | "Scalp Treatment";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  purpose: string;
  price: number;
  quantity: string;
  description: string;
  tags: string[];
  hairTypes: string[];
  concerns: string[];
  tone: "lilac" | "sand" | "mint" | "pearl";
  image: string;
};

export type ExpertProfile = {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  availability: string;
  nextSlot: string;
  languages: string[];
};

export type ExpertFeedback = {
  headline: string;
  summary: string;
  notes: string[];
  followUp: string;
};

export const authHighlights = [
  {
    id: "trusted-plan",
    title: "Personalized routines",
    detail: "AI-led kits and human-reviewed next steps.",
  },
  {
    id: "private-checkin",
    title: "Private check-ins",
    detail: "Phone OTP sign-in and 15-day photo reminders.",
  },
  {
    id: "expert-guidance",
    title: "Expert-backed",
    detail: "Consult summaries use predefined expert wording.",
  },
] as const;

export const concernOptions = [
  "Hair fall",
  "Dandruff",
  "Dryness",
  "Frizz",
  "Oily scalp",
  "Thinning",
  "Slow growth",
  "Scalp sensitivity",
] as const;

export const hairTypes = ["Straight", "Wavy", "Curly", "Coily"] as const;

export const washFrequencies = [
  "Daily",
  "2–3 times a week",
  "Once a week",
  "Only when needed",
] as const;

export const currentProductOptions = [
  "Clarifying shampoo",
  "Anti-dandruff shampoo",
  "Hair oil",
  "Leave-in serum",
  "Heat protectant",
  "Supplements",
  "No current routine",
] as const;

export const lifestyleTriggers = [
  "Recent stress",
  "Irregular sleep",
  "Diet changes",
  "Hormonal shifts",
  "Recent travel",
  "Postpartum phase",
] as const;

export const experts: ExpertProfile[] = [
  {
    id: "expert-1",
    name: "Dr. Aisha Menon",
    specialization: "Trichology & scalp recovery",
    rating: 4.9,
    experience: "11 years",
    availability: "Online today",
    nextSlot: "Today · 7:30 PM",
    languages: ["English", "Hindi"],
  },
  {
    id: "expert-2",
    name: "Dr. Rhea Kapoor",
    specialization: "Hair nutrition & routine planning",
    rating: 4.8,
    experience: "8 years",
    availability: "Available tomorrow",
    nextSlot: "Tomorrow · 10:00 AM",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: "expert-3",
    name: "Dr. Neil D'Souza",
    specialization: "Scalp sensitivity & styling damage",
    rating: 4.7,
    experience: "9 years",
    availability: "3 slots left",
    nextSlot: "Fri · 6:15 PM",
    languages: ["English", "Hindi", "Marathi"],
  },
];

export const appointmentDays = [
  { id: "day-1", label: "Mon", date: "24" },
  { id: "day-2", label: "Tue", date: "25" },
  { id: "day-3", label: "Wed", date: "26" },
  { id: "day-4", label: "Thu", date: "27" },
  { id: "day-5", label: "Fri", date: "28" },
] as const;

export const appointmentSlots = ["08:30 AM", "10:00 AM", "01:30 PM", "04:15 PM", "07:30 PM"] as const;

export const products: Product[] = [
  {
    id: "shampoo-balance",
    name: "Root Reset Cleanse",
    category: "Shampoo",
    purpose: "Gentle cleansing for scalp balance",
    price: 549,
    quantity: "200 ml",
    description: "A lightweight daily cleanser for flakes, oil swings, and residue-heavy routines.",
    tags: ["Best seller", "Daily reset"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Dandruff", "Oily scalp", "Scalp sensitivity"],
    tone: "pearl",
    image: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "serum-density",
    name: "Density Signal Serum",
    category: "Serum",
    purpose: "Targets visible thinning and weaker roots",
    price: 899,
    quantity: "60 ml",
    description: "A fast-absorbing night serum designed to support fuller-looking roots.",
    tags: ["AI pick", "Night routine"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Thinning", "Slow growth"],
    tone: "lilac",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "oil-repair",
    name: "Silk Bond Hair Oil",
    category: "Oil",
    purpose: "Smooths frizz and seals dry ends",
    price: 699,
    quantity: "50 ml",
    description: "A non-sticky pre-wash oil for rough texture and split-end prone lengths.",
    tags: ["Frizz control", "Pre-wash"],
    hairTypes: ["Wavy", "Curly", "Coily", "Straight"],
    concerns: ["Frizz", "Dryness"],
    tone: "sand",
    image: "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "conditioner-soft",
    name: "Velvet Repair Conditioner",
    category: "Conditioner",
    purpose: "Detangles, softens, and protects brittle strands",
    price: 649,
    quantity: "180 ml",
    description: "A silky conditioner that improves slip and reduces tugging.",
    tags: ["Smooth finish", "Shower essential"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Dryness", "Frizz"],
    tone: "mint",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "supplement-core",
    name: "Inside Out Support",
    category: "Supplement",
    purpose: "Supports routine consistency from within",
    price: 1199,
    quantity: "30 sachets",
    description: "A daily add-on for users with stress, diet shifts, and density goals.",
    tags: ["30-day plan", "Routine booster"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Thinning", "Slow growth"],
    tone: "sand",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "scalp-calm",
    name: "Calm Scalp Concentrate",
    category: "Scalp Treatment",
    purpose: "Comforts visible irritation and wash-day sensitivity",
    price: 799,
    quantity: "45 ml",
    description: "A cooling leave-on scalp treatment for itch-prone, reactive scalps.",
    tags: ["Expert favorite", "Sensitive scalp"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Scalp sensitivity", "Dandruff", "Oily scalp"],
    tone: "mint",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "shampoo-volume",
    name: "Cloud Lift Volumizer Shampoo",
    category: "Shampoo",
    purpose: "Adds visible body to flat, fine roots",
    price: 599,
    quantity: "200 ml",
    description: "A lightweight foaming wash that lifts roots without weighing strands down.",
    tags: ["Volumizing", "Fine hair"],
    hairTypes: ["Straight", "Wavy"],
    concerns: ["Thinning", "Slow growth"],
    tone: "lilac",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "mask-deep",
    name: "Midnight Repair Mask",
    category: "Conditioner",
    purpose: "Weekly deep treatment for dry, damaged lengths",
    price: 949,
    quantity: "150 ml",
    description: "A rich overnight-style mask infused with bond-rebuilding peptides.",
    tags: ["Weekly ritual", "Deep treatment"],
    hairTypes: ["Wavy", "Curly", "Coily"],
    concerns: ["Dryness", "Frizz"],
    tone: "sand",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "serum-shine",
    name: "Glass Finish Shine Serum",
    category: "Serum",
    purpose: "Adds glossy polish to mid-lengths and ends",
    price: 749,
    quantity: "40 ml",
    description: "A weightless silicone-free finishing serum for visible shine and frizz control.",
    tags: ["Finishing", "Anti-frizz"],
    hairTypes: ["Straight", "Wavy", "Curly"],
    concerns: ["Frizz", "Dryness"],
    tone: "pearl",
    image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "oil-rosemary",
    name: "Rosemary Root Activator Oil",
    category: "Oil",
    purpose: "Stimulates scalp circulation for stronger roots",
    price: 849,
    quantity: "60 ml",
    description: "A botanical scalp oil with rosemary, peppermint, and biotin complex.",
    tags: ["Scalp ritual", "Botanical"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Slow growth", "Thinning"],
    tone: "mint",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "scalp-exfoliant",
    name: "Weekly Scalp Polish",
    category: "Scalp Treatment",
    purpose: "Gentle exfoliation for buildup and flakes",
    price: 879,
    quantity: "100 ml",
    description: "A salicylic-acid scrub that clears product buildup and dead skin weekly.",
    tags: ["Exfoliant", "Weekly"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Dandruff", "Oily scalp"],
    tone: "lilac",
    image: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=600&q=85&auto=format&fit=crop",
  },
  {
    id: "supplement-biotin",
    name: "Biotin Glow Gummies",
    category: "Supplement",
    purpose: "Daily biotin, zinc and folate support",
    price: 999,
    quantity: "60 gummies",
    description: "Tasty fruit gummies with biotin, zinc and folate for hair, skin and nails.",
    tags: ["Daily ritual", "Vegan"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Thinning", "Slow growth"],
    tone: "sand",
    image: "https://images.unsplash.com/photo-1626958390399-d6e92e0c0d51?w=600&q=85&auto=format&fit=crop",
  },
];

export const subscriptionPlans = [
  {
    id: "plan-smart",
    name: "Smart Refill",
    cadence: "Every 30 days",
    savings: "Save 10%",
    description: "Perfect for first 90 days of routine consistency.",
  },
  {
    id: "plan-complete",
    name: "Complete Recovery",
    cadence: "Every 45 days",
    savings: "Save 14%",
    description: "Adds expert check-ins and replenishment reminders.",
  },
] as const;

export const activeSubscription = {
  planId: "plan-smart",
  planName: "Smart Refill",
  status: "Active",
  startedOn: "12 Mar 2026",
  nextBillingDate: "12 May 2026",
  daysToNextBilling: 12,
  pricePerCycle: 1899,
  cyclesCompleted: 2,
  totalCycles: 6,
  routineAdherence: 84, // %
  productsUsed: [
    { productId: "shampoo-balance", name: "Root Reset Cleanse", used: 12, total: 16, unit: "washes" },
    { productId: "serum-density", name: "Density Signal Serum", used: 38, total: 60, unit: "uses" },
    { productId: "oil-repair", name: "Silk Bond Hair Oil", used: 5, total: 8, unit: "applications" },
  ],
  upcomingShipment: {
    date: "12 May 2026",
    items: ["Root Reset Cleanse · refill", "Density Signal Serum · refill"],
    address: "18B, Palm Residency, Bandra West, Mumbai",
  },
  benefits: ["Free shipping", "10% recurring discount", "Priority expert slots", "Skip / pause anytime"],
} as const;

export const usageMilestones = [
  {
    id: "milestone-1",
    title: "Week 1 scalp reset",
    note: "Log your first wash, serum use, and any visible irritation changes.",
    progress: 0.3,
  },
  {
    id: "milestone-2",
    title: "Day 15 image check-in",
    note: "Upload fresh hairline and crown photos to compare consistency and texture.",
    progress: 0.62,
  },
  {
    id: "milestone-3",
    title: "Month 2 density review",
    note: "Review product adherence and refill timing with your assigned expert.",
    progress: 0.82,
  },
] as const;

export const mockOrders = [
  {
    id: "SHC-2048",
    date: "12 Apr 2026",
    total: 2147,
    status: "Delivered",
    items: ["Root Reset Cleanse", "Density Signal Serum", "Velvet Repair Conditioner"],
    productIds: ["shampoo-balance", "serum-density", "conditioner-soft"],
  },
  {
    id: "SHC-1982",
    date: "18 Mar 2026",
    total: 1598,
    status: "Delivered",
    items: ["Silk Bond Hair Oil", "Calm Scalp Concentrate"],
    productIds: ["oil-repair", "scalp-calm"],
  },
] as const;

export const consultationHistory = [
  {
    id: "consult-1",
    date: "10 Apr 2026",
    expert: "Dr. Anika Rao",
    specialization: "Trichologist",
    summary: "Reviewed scalp images. Confirmed mild telogen shedding. Continue serum 2x/day.",
    status: "Completed",
  },
  {
    id: "consult-2",
    date: "22 Feb 2026",
    expert: "Dr. Karan Mehta",
    specialization: "Dermatologist",
    summary: "Discussed dandruff flare. Switched to anti-fungal cleanse twice weekly.",
    status: "Completed",
  },
] as const;

export const wishlistItems = [
  { id: "wish-1", productId: "conditioner-soft", name: "Velvet Repair Conditioner", price: 649, note: "Saved · 2 days ago" },
  { id: "wish-2", productId: "scalp-calm", name: "Calm Scalp Concentrate", price: 899, note: "Saved · 1 week ago" },
  { id: "wish-3", productId: "oil-repair", name: "Silk Bond Hair Oil", price: 549, note: "Saved · 3 weeks ago" },
] as const;

export const notificationItems = [
  {
    id: "notif-1",
    title: "Your refill is due in 5 days",
    body: "Reorder Root Reset Cleanse to avoid a routine gap.",
    time: "2h ago",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Day 15 image check-in",
    body: "Upload fresh hairline and crown photos for progress comparison.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Order SHC-2048 delivered",
    body: "Rate your products to help personalize future kits.",
    time: "12 Apr",
    unread: false,
  },
] as const;

export type ChatMessage = {
  id: string;
  from: "expert" | "user";
  text: string;
  time: string;
};

export const initialExpertChat: ChatMessage[] = [
  {
    id: "m1",
    from: "expert",
    text: "Hi Sarah! I've reviewed your assessment and uploaded photos. How are you feeling about your routine this week?",
    time: "10:12",
  },
  {
    id: "m2",
    from: "expert",
    text: "Quick reminder: night-time serum application gives the best results when scalp is fully dry.",
    time: "10:13",
  },
];

export const userQuickReplies = [
  "Routine is going well 👍",
  "I have a question about the serum",
  "My scalp still feels itchy",
  "Can I switch products?",
  "When is my next check-in?",
  "Thanks for the help!",
] as const;

export const expertReplyMap: Record<string, string> = {
  "Routine is going well 👍":
    "That's wonderful to hear! Keep going — most users notice visible texture changes in week 6. I'll check in again before your next refill.",
  "I have a question about the serum":
    "Sure! Apply 4–5 drops directly to the scalp at night, massage for 60 seconds, and don't rinse. Avoid using it on the same night as oil treatments.",
  "My scalp still feels itchy":
    "Got it. Let's pause the active serum for 2 nights and use only the Calm Scalp Concentrate. If itching continues after 3 days, share a photo and I'll re-evaluate.",
  "Can I switch products?":
    "Yes, but let's wait until your 6-week mark before swapping the core products — switching too early dilutes the result. We can adjust supporting items anytime.",
  "When is my next check-in?":
    "Your next scheduled check-in is in 8 days. I'll also be available on chat for quick questions until then.",
  "Thanks for the help!":
    "Always happy to help 💜 Don't forget your Day 15 image upload — it really helps me track your progress.",
};

export const homeQuickActions = [
  { id: "qa-1", label: "AI Assessment", tone: "lilac" as const, count: "3 min" },
  { id: "qa-2", label: "Expert Chat", tone: "gold" as const, count: "Online" },
  { id: "qa-3", label: "Routine", tone: "mint" as const, count: "Day 34" },
];

export const supportFaq = [
  {
    id: "faq-1",
    q: "How are my recommendations generated?",
    a: "We combine your assessment answers, lifestyle inputs, and optional expert review to map products to your concerns.",
  },
  {
    id: "faq-2",
    q: "When can I expect results?",
    a: "Most users notice scalp comfort in 2 weeks and visible texture or shedding changes in 6–8 weeks of consistent use.",
  },
  {
    id: "faq-3",
    q: "Can I edit my delivery address?",
    a: "Yes — your default address is captured at checkout and can be updated before placing your next order.",
  },
  {
    id: "faq-4",
    q: "How do I reach support?",
    a: "Email care@secrethaircare.app or message us in-app between 9 AM – 9 PM IST.",
  },
] as const;


/* ============================================================
   DYNAMIC QUESTIONNAIRE ENGINE
   ============================================================ */

export type QuestionType = "single" | "multi";

export type DynamicQuestion = {
  id: string;
  /** Logical group: shared = always shown, or one of the concerns */
  group:
    | "intro"
    | "Hair fall"
    | "Dandruff"
    | "Dryness"
    | "Frizz"
    | "Oily scalp"
    | "Thinning"
    | "Slow growth"
    | "Scalp sensitivity"
    | "lifestyle"
    | "image";
  title: string;
  helper?: string;
  type: QuestionType;
  options: readonly string[];
  /** Optional icon name (lucide) — handled in UI */
  icon?: string;
  /** Weight per option for severity scoring (0..3) */
  weights?: Record<string, number>;
  /** Marks question as "secondary" (asked briefly when concern is not top-2) */
  secondary?: boolean;
};

/** Intro question — always first */
export const introQuestion: DynamicQuestion = {
  id: "concerns",
  group: "intro",
  title: "What are you noticing most right now?",
  helper: "Pick everything that feels relevant. We'll adapt the next questions for you.",
  type: "multi",
  options: concernOptions,
};

/** Per-concern question modules. Each has primary (full) and secondary (short) sets. */
export const conditionModules: Record<string, DynamicQuestion[]> = {
  "Hair fall": [
    {
      id: "hf_duration",
      group: "Hair fall",
      title: "How long have you been experiencing hair fall?",
      type: "single",
      options: ["Less than 1 month", "1–3 months", "3–6 months", "6+ months"],
      weights: { "Less than 1 month": 1, "1–3 months": 2, "3–6 months": 3, "6+ months": 3 },
    },
    {
      id: "hf_type",
      group: "Hair fall",
      title: "What type of hair fall is it?",
      helper: "Look at the strands you lose most.",
      type: "single",
      options: ["From roots (with bulb)", "Breakage (mid-length)", "Not sure"],
      weights: { "From roots (with bulb)": 3, "Breakage (mid-length)": 2, "Not sure": 1 },
    },
    {
      id: "hf_intensity",
      group: "Hair fall",
      title: "How heavy does it feel?",
      type: "single",
      options: ["Light (50–100/day)", "Moderate (100–200)", "Heavy (200+)"],
      weights: { "Light (50–100/day)": 1, "Moderate (100–200)": 2, "Heavy (200+)": 3 },
    },
    {
      id: "hf_when",
      group: "Hair fall",
      title: "When do you notice it most?",
      type: "multi",
      options: ["Washing", "Combing", "All the time"],
      weights: { Washing: 1, Combing: 1, "All the time": 2 },
    },
    {
      id: "hf_triggers",
      group: "Hair fall",
      title: "Any recent triggers?",
      helper: "Pick all that apply in the last 3 months.",
      type: "multi",
      options: ["Stress", "Weight loss", "Illness", "Hormonal changes", "None"],
      weights: { Stress: 2, "Weight loss": 2, Illness: 2, "Hormonal changes": 2, None: 0 },
    },
    {
      id: "hf_family",
      group: "Hair fall",
      title: "Family history of hair loss?",
      type: "single",
      options: ["Yes", "No", "Not sure"],
      weights: { Yes: 2, No: 0, "Not sure": 1 },
    },
  ],
  Dandruff: [
    {
      id: "dn_visible",
      group: "Dandruff",
      title: "Do you see visible flakes?",
      type: "single",
      options: ["Yes", "No"],
      weights: { Yes: 2, No: 0 },
    },
    {
      id: "dn_type",
      group: "Dandruff",
      title: "What kind of flakes?",
      type: "single",
      options: ["Dry white flakes", "Yellow sticky flakes", "Not sure"],
      weights: { "Dry white flakes": 2, "Yellow sticky flakes": 3, "Not sure": 1 },
    },
    {
      id: "dn_scalp",
      group: "Dandruff",
      title: "How does your scalp feel?",
      type: "multi",
      options: ["Itchy", "Redness", "Irritation", "Comfortable"],
      weights: { Itchy: 2, Redness: 2, Irritation: 2, Comfortable: 0 },
    },
    {
      id: "dn_when",
      group: "Dandruff",
      title: "When is it worst?",
      type: "single",
      options: ["After wash", "Day 2–3", "Always present"],
      weights: { "After wash": 1, "Day 2–3": 2, "Always present": 3 },
    },
    {
      id: "dn_oily",
      group: "Dandruff",
      title: "Do you also feel scalp oiliness?",
      type: "single",
      options: ["Yes", "Sometimes", "No"],
      weights: { Yes: 2, Sometimes: 1, No: 0 },
    },
  ],
  Dryness: [
    {
      id: "dr_texture",
      group: "Dryness",
      title: "How does your hair texture feel?",
      type: "multi",
      options: ["Rough", "Unmanageable", "Frizzy in humidity"],
      weights: { Rough: 2, Unmanageable: 2, "Frizzy in humidity": 1 },
    },
    {
      id: "dr_heat",
      group: "Dryness",
      title: "Do you use heat styling?",
      type: "single",
      options: ["Yes", "Occasionally", "No"],
      weights: { Yes: 2, Occasionally: 1, No: 0 },
    },
    {
      id: "dr_oil",
      group: "Dryness",
      title: "How often do you oil your hair?",
      type: "single",
      options: ["Weekly", "Occasionally", "Rarely / Never"],
      weights: { Weekly: 0, Occasionally: 1, "Rarely / Never": 2 },
    },
    {
      id: "dr_when",
      group: "Dryness",
      title: "When does dryness show up?",
      type: "single",
      options: ["Right after wash", "Day after wash", "Always dry"],
      weights: { "Right after wash": 2, "Day after wash": 1, "Always dry": 3 },
    },
  ],
  Frizz: [
    {
      id: "fz_texture",
      group: "Frizz",
      title: "How would you describe your frizz?",
      type: "multi",
      options: ["Halo of flyaways", "Whole length", "Only in humidity"],
      weights: { "Halo of flyaways": 1, "Whole length": 3, "Only in humidity": 2 },
    },
    {
      id: "fz_heat",
      group: "Frizz",
      title: "Heat styling frequency?",
      type: "single",
      options: ["Daily", "Weekly", "Rare"],
      weights: { Daily: 3, Weekly: 2, Rare: 1 },
    },
  ],
  "Oily scalp": [
    {
      id: "os_speed",
      group: "Oily scalp",
      title: "How quickly does your scalp get oily?",
      type: "single",
      options: ["Same day", "Next day", "After 2–3 days"],
      weights: { "Same day": 3, "Next day": 2, "After 2–3 days": 1 },
    },
    {
      id: "os_signs",
      group: "Oily scalp",
      title: "What do you notice?",
      type: "multi",
      options: ["Greasy look", "Flat hair", "Bad odor"],
      weights: { "Greasy look": 2, "Flat hair": 1, "Bad odor": 2 },
    },
    {
      id: "os_freq",
      group: "Oily scalp",
      title: "How often do you shampoo?",
      type: "single",
      options: ["Daily", "Alternate days", "Weekly"],
      weights: { Daily: 1, "Alternate days": 1, Weekly: 2 },
    },
  ],
  Thinning: [
    {
      id: "th_partition",
      group: "Thinning",
      title: "Have you noticed a wider partition?",
      type: "single",
      options: ["Yes", "Slightly", "No"],
      weights: { Yes: 3, Slightly: 2, No: 0 },
    },
    {
      id: "th_volume",
      group: "Thinning",
      title: "Reduced volume over time?",
      type: "single",
      options: ["Yes, noticeable", "A little", "No"],
      weights: { "Yes, noticeable": 3, "A little": 2, No: 0 },
    },
    {
      id: "th_area",
      group: "Thinning",
      title: "Where is thinning most visible?",
      type: "single",
      options: ["Front", "Crown", "Overall"],
      weights: { Front: 2, Crown: 2, Overall: 3 },
    },
  ],
  "Slow growth": [
    {
      id: "sg_rate",
      group: "Slow growth",
      title: "How do you feel about your growth rate?",
      type: "single",
      options: ["Very slow", "Normal", "Not sure"],
      weights: { "Very slow": 3, Normal: 0, "Not sure": 1 },
    },
    {
      id: "sg_tried",
      group: "Slow growth",
      title: "Have you tried growth treatments before?",
      type: "single",
      options: ["Yes", "No"],
      weights: { Yes: 1, No: 1 },
    },
    {
      id: "sg_trim",
      group: "Slow growth",
      title: "Do you trim regularly?",
      type: "single",
      options: ["Yes", "Sometimes", "No"],
      weights: { Yes: 0, Sometimes: 1, No: 2 },
    },
  ],
  "Scalp sensitivity": [
    {
      id: "ss_freq",
      group: "Scalp sensitivity",
      title: "How often do you feel itching?",
      type: "single",
      options: ["Rare", "Frequent", "Constant"],
      weights: { Rare: 1, Frequent: 2, Constant: 3 },
    },
    {
      id: "ss_signs",
      group: "Scalp sensitivity",
      title: "What sensations do you experience?",
      type: "multi",
      options: ["Burning", "Red patches", "Pain", "Tightness"],
      weights: { Burning: 3, "Red patches": 2, Pain: 3, Tightness: 1 },
    },
  ],
};

/** Lifestyle questions — always asked, lightweight */
export const lifestyleQuestions: DynamicQuestion[] = [
  {
    id: "lf_stress",
    group: "lifestyle",
    title: "Stress level lately?",
    type: "single",
    options: ["Low", "Medium", "High"],
    weights: { Low: 0, Medium: 1, High: 2 },
  },
  {
    id: "lf_sleep",
    group: "lifestyle",
    title: "Average sleep per night?",
    type: "single",
    options: ["Less than 6h", "6–8h", "8h+"],
    weights: { "Less than 6h": 2, "6–8h": 0, "8h+": 0 },
  },
  {
    id: "lf_diet",
    group: "lifestyle",
    title: "Diet type?",
    type: "single",
    options: ["Veg", "Non-veg", "Mixed"],
  },
  {
    id: "lf_water",
    group: "lifestyle",
    title: "Daily water intake?",
    type: "single",
    options: ["Less than 1.5L", "1.5–2.5L", "2.5L+"],
    weights: { "Less than 1.5L": 2, "1.5–2.5L": 0, "2.5L+": 0 },
  },
  {
    id: "lf_exercise",
    group: "lifestyle",
    title: "Exercise frequency?",
    type: "single",
    options: ["Rare", "1–3x / week", "4+ / week"],
    weights: { Rare: 1, "1–3x / week": 0, "4+ / week": 0 },
  },
];

/** Optional final image-based mock analysis step */
export const imageAnalysisStep: DynamicQuestion = {
  id: "image_upload",
  group: "image",
  title: "Optional: upload a scalp / hair photo",
  helper: "Our mock AI will surface visible signals. You can also skip this.",
  type: "single",
  options: ["Skip for now", "I uploaded a photo"],
};

/** Build adaptive flow from selected concerns. */
export function buildAdaptiveFlow(selectedConcerns: string[]): DynamicQuestion[] {
  const flow: DynamicQuestion[] = [introQuestion];
  if (!selectedConcerns.length) {
    return [...flow, ...lifestyleQuestions];
  }

  // Priority ordering: keep first 2 as primary (full set), rest as secondary (1 short Q each)
  const primary = selectedConcerns.slice(0, 2);
  const secondary = selectedConcerns.slice(2);

  const seenIds = new Set<string>();
  const pushUnique = (q: DynamicQuestion) => {
    if (seenIds.has(q.id)) return;
    seenIds.add(q.id);
    flow.push(q);
  };

  primary.forEach((concern) => {
    (conditionModules[concern] || []).forEach(pushUnique);
  });

  // Smart merging: avoid duplicate scalp questions when both Hair fall + Dandruff
  // (Dandruff scalp Qs already added; if Hair fall asked first it's fine — dn_scalp is distinct.)
  // Merge Dryness + Frizz: skip the redundant frizz texture if both are primary.
  if (primary.includes("Dryness") && primary.includes("Frizz")) {
    const idx = flow.findIndex((q) => q.id === "fz_texture");
    if (idx >= 0) flow.splice(idx, 1);
  }

  // Secondary concerns — pick the most diagnostic single question from each module
  secondary.forEach((concern) => {
    const mod = conditionModules[concern];
    if (!mod?.length) return;
    const q = { ...mod[0], secondary: true };
    pushUnique(q);
  });

  // Lifestyle always
  lifestyleQuestions.forEach(pushUnique);

  return flow;
}

/* ============================================================
   ANSWERS + SCORING
   ============================================================ */

export type AssessmentAnswers = {
  concerns: string[];
  dynamic: Record<string, string | string[]>;
  hairType: string;
  gender: string;
  goal: string;
  imageUploaded: boolean;
};

export const defaultAssessmentAnswers: AssessmentAnswers = {
  concerns: [],
  dynamic: {},
  hairType: "Wavy",
  gender: "Women",
  goal: "Less shedding",
  imageUploaded: false,
};

export type ConcernScore = {
  concern: string;
  score: number; // 0..100
  level: "Mild" | "Moderate" | "Significant";
};

export type AssessmentScore = {
  hairHealthScore: number; // 0..100, higher = healthier
  scalpHealth: number; // 0..100
  lifestyleImpact: number; // 0..100, higher = more negative impact
  concernScores: ConcernScore[];
  topConcern?: ConcernScore;
};

const sumWeights = (
  questions: DynamicQuestion[],
  answers: AssessmentAnswers,
): { actual: number; max: number } => {
  let actual = 0;
  let max = 0;
  questions.forEach((q) => {
    if (!q.weights) return;
    const optMax = Math.max(...Object.values(q.weights));
    if (q.type === "multi") {
      max += optMax * 1.5; // moderate cap for multi
      const sel = (answers.dynamic[q.id] as string[]) || [];
      sel.forEach((opt) => {
        actual += q.weights?.[opt] ?? 0;
      });
    } else {
      max += optMax;
      const sel = answers.dynamic[q.id] as string | undefined;
      if (sel) actual += q.weights[sel] ?? 0;
    }
  });
  return { actual, max };
};

export function scoreAssessment(answers: AssessmentAnswers): AssessmentScore {
  const concerns = answers.concerns;
  const concernScores: ConcernScore[] = concerns.map((concern) => {
    const mod = conditionModules[concern] || [];
    const { actual, max } = sumWeights(mod, answers);
    const ratio = max ? actual / max : 0.4;
    const score = Math.round(ratio * 100);
    const level: ConcernScore["level"] =
      score >= 66 ? "Significant" : score >= 33 ? "Moderate" : "Mild";
    return { concern, score, level };
  });

  // Lifestyle impact (higher = worse)
  const { actual: lfActual, max: lfMax } = sumWeights(lifestyleQuestions, answers);
  const lifestyleImpact = Math.round((lfMax ? lfActual / lfMax : 0) * 100);

  // Scalp health (lower = worse) — derived from dandruff/oily/sensitivity if present
  const scalpModules = ["Dandruff", "Oily scalp", "Scalp sensitivity"]
    .filter((c) => concerns.includes(c))
    .flatMap((c) => conditionModules[c] || []);
  const { actual: scActual, max: scMax } = sumWeights(scalpModules, answers);
  const scalpHealth = scalpModules.length
    ? Math.max(20, 100 - Math.round((scActual / Math.max(scMax, 1)) * 80))
    : 82;

  // Hair health composite: invert avg concern severity, blend lifestyle, blend scalp
  const avgConcern =
    concernScores.length
      ? concernScores.reduce((sum, c) => sum + c.score, 0) / concernScores.length
      : 25;
  const concernPart = 100 - avgConcern; // healthier when severity low
  const lifestylePart = 100 - lifestyleImpact;
  const hairHealthScore = Math.max(
    20,
    Math.min(99, Math.round(concernPart * 0.55 + lifestylePart * 0.2 + scalpHealth * 0.25)),
  );

  const topConcern =
    concernScores.slice().sort((a, b) => b.score - a.score)[0];

  return { hairHealthScore, scalpHealth, lifestyleImpact, concernScores, topConcern };
}

/* ============================================================
   SMART SUMMARY + RECOMMENDATION
   ============================================================ */

const productPriorityByConcern: Record<string, string[]> = {
  "Hair fall": ["serum-density", "supplement-core", "shampoo-balance"],
  Thinning: ["serum-density", "supplement-core", "conditioner-soft"],
  Dandruff: ["shampoo-balance", "scalp-calm"],
  Frizz: ["oil-repair", "conditioner-soft"],
  Dryness: ["oil-repair", "conditioner-soft"],
  "Oily scalp": ["shampoo-balance", "scalp-calm"],
  "Slow growth": ["serum-density", "supplement-core"],
  "Scalp sensitivity": ["scalp-calm", "shampoo-balance"],
};

export type SmartSummary = {
  headline: string;
  insights: string[];
  imageInsights: string[];
};

export function generateSmartSummary(
  answers: AssessmentAnswers,
  score: AssessmentScore,
): SmartSummary {
  const insights: string[] = [];
  const top = score.topConcern;

  if (top) {
    const triggerHints: string[] = [];
    if (score.lifestyleImpact >= 50) triggerHints.push("stress and sleep patterns");
    const hfTriggers = (answers.dynamic["hf_triggers"] as string[]) || [];
    if (hfTriggers.includes("Hormonal changes")) triggerHints.push("hormonal shifts");
    if (hfTriggers.includes("Weight loss")) triggerHints.push("recent weight changes");
    const trigger = triggerHints.length ? ` likely influenced by ${triggerHints.join(" and ")}` : "";
    insights.push(
      `You are experiencing ${top.level.toLowerCase()} ${top.concern.toLowerCase()}${trigger}.`,
    );
  }

  if (answers.concerns.includes("Dandruff") || answers.concerns.includes("Oily scalp")) {
    insights.push("Your scalp shows signs of an oil–dry imbalance that benefits from a reset cleanser.");
  }
  if (answers.concerns.includes("Dryness") || answers.concerns.includes("Frizz")) {
    insights.push("Hair texture indicates a moisture deficiency — focus on hydration and bond support.");
  }
  if (score.lifestyleImpact >= 60) {
    insights.push("Lifestyle load is currently high — reminder-led routines will protect consistency.");
  }
  if (!insights.length) {
    insights.push("Your profile looks balanced — a maintenance routine should keep things on track.");
  }

  const headline =
    score.hairHealthScore >= 75
      ? "You're in good shape — a few targeted tweaks ahead"
      : score.hairHealthScore >= 55
        ? "A focused 90-day plan should move things forward"
        : "Time for an active reset — let's go step by step";

  const imageInsights = answers.imageUploaded
    ? [
        "Mild scalp dryness detected near partition",
        "Hair density appears slightly reduced at crown",
        "Mid-length texture suggests minor cuticle lift",
      ]
    : [];

  return { headline, insights, imageInsights };
}

export function generateRecommendation(answers: AssessmentAnswers) {
  const score = scoreAssessment(answers);
  const summary = generateSmartSummary(answers, score);
  const concernMatches = answers.concerns.length ? answers.concerns : ["Hair fall", "Dryness"];
  const scoredProductIds = new Set<string>();

  concernMatches.forEach((concern) => {
    productPriorityByConcern[concern]?.forEach((productId) => scoredProductIds.add(productId));
  });

  if (score.lifestyleImpact >= 50) {
    scoredProductIds.add("supplement-core");
  }
  if (score.scalpHealth < 60) {
    scoredProductIds.add("scalp-calm");
    scoredProductIds.add("shampoo-balance");
  }

  const kitProductIds = Array.from(scoredProductIds).slice(0, 4);
  const kitProducts = products.filter((product) => kitProductIds.includes(product.id));
  const subtotal = kitProducts.reduce((sum, product) => sum + product.price, 0);

  const insights = [
    {
      title: "Scalp balance",
      detail:
        score.scalpHealth < 60
          ? "Calming and reset support recommended"
          : "Stable with preventive support",
      score: 100 - score.scalpHealth,
    },
    {
      title: "Strand resilience",
      detail:
        concernMatches.includes("Dryness") || concernMatches.includes("Frizz")
          ? "Repair-first approach suggested"
          : "Maintenance-focused strengthening",
      score: Math.min(95, Math.max(20, (score.topConcern?.score ?? 40))),
    },
    {
      title: "Routine consistency",
      detail:
        score.lifestyleImpact >= 50
          ? "Lifestyle-aware reminders should help"
          : "Strong adherence predicted",
      score: score.lifestyleImpact || 30,
    },
  ];

  const routine = [
    {
      title: "Cleanse",
      subtitle:
        score.scalpHealth < 60
          ? "Use a balancing cleanser 2–3 times a week"
          : "Use during core wash days",
    },
    {
      title: "Treat",
      subtitle:
        concernMatches.includes("Hair fall") || concernMatches.includes("Thinning")
          ? "Apply density serum at night to target root visibility"
          : "Use scalp treatment on concern-led days",
    },
    {
      title: "Seal & support",
      subtitle: "Finish with moisture or supplement support for long-term consistency",
    },
  ];

  const reasoning = `Based on ${concernMatches.slice(0, 3).join(", ").toLowerCase()} and your ${answers.hairType.toLowerCase()} hair profile, this kit prioritizes ${score.scalpHealth < 60 ? "scalp recovery" : "comfort"}, visible strengthening, and a routine that fits your week.`;

  return {
    concernMatches,
    kitProducts,
    subtotal,
    reasoning,
    insights,
    routine,
    score,
    summary,
    summaryTitle: `${answers.goal || "Healthier hair"} plan`,
    summaryNote: summary.headline,
  };
}

export function generateExpertFeedback(answers: AssessmentAnswers): ExpertFeedback {
  const concernMatches = answers.concerns.length ? answers.concerns : ["Hair fall", "Dryness"];
  const notes: string[] = [];

  if (
    concernMatches.some((concern) =>
      ["Dandruff", "Oily scalp", "Scalp sensitivity"].includes(concern),
    )
  ) {
    notes.push(
      "Visible scalp reactivity suggests a scalp-first routine with calm-down support on non-wash days.",
    );
  }

  if (concernMatches.some((concern) => ["Hair fall", "Thinning", "Slow growth"].includes(concern))) {
    notes.push(
      "Density-focused products are suitable when paired with consistent night application and progress tracking.",
    );
  }

  if (concernMatches.some((concern) => ["Dryness", "Frizz"].includes(concern))) {
    notes.push(
      "Mid-length and ends appear to benefit from barrier support, lower-friction styling, and moisture layering.",
    );
  }

  if (!notes.length) {
    notes.push(
      "Current hair condition appears suitable for a maintenance-led routine with lightweight support products.",
    );
  }

  const scalpFocused = notes[0]?.includes("scalp-first");
  const densityFocused = notes.some((note) => note.includes("Density-focused"));

  return {
    headline: scalpFocused
      ? "Scalp comfort and barrier reset"
      : densityFocused
        ? "Consistency-led density support"
        : "Texture and resilience support",
    summary: scalpFocused
      ? "The expert review favors reducing visible scalp stress first, then reinforcing the growth routine."
      : densityFocused
        ? "The expert review supports a structured 90-day plan centered on density support and adherence."
        : "The expert review suggests keeping the routine simple, moisture-aware, and easy to sustain.",
    notes: notes.slice(0, 3),
    followUp:
      "Predefined follow-up: upload updated photos in 15 days so the next recommendation can compare texture, scalp comfort, and visible fullness.",
  };
}
