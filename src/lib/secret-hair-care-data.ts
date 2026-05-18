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
  "Hair growth",
  "Grey hair",
  "Dandruff",
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
    id: "black-charm-oil-200",
    name: "Black Charm Oil 200 ml",
    category: "Oil",
    purpose: "Controls hair fall and strengthens roots",
    price: 1049,
    quantity: "200 ml",
    description: "Signature Ayurvedic oil with curry leaves, hibiscus, amla and bhringraj — designed to control hair fall and reduce premature greying.",
    tags: ["Best seller", "Ayurvedic"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Grey hair"],
    tone: "sand",
    image: "https://thesecrethaircare.com/storage/153/whGjDTPbtfWg7e7vigWZfqwQDI6eIc-metaSU1HXzEwMDAyLW1pbi5qcGc=-.webp",
  },
  {
    id: "blue-lilly-oil-200",
    name: "Blue Lilly Oil 200 ml",
    category: "Oil",
    purpose: "Cooling oil that supports hair growth",
    price: 1049,
    quantity: "200 ml",
    description: "Cooling Blue Lilly–infused oil that calms the scalp and supports stronger, longer growth.",
    tags: ["Cooling", "Growth"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair growth", "Hair fall"],
    tone: "lilac",
    image: "https://thesecrethaircare.com/storage/131/JBE1EYUYfn094j2E6TRlpGD7LnxF9p-metaSU1HXzEwMDA0LW1pbi5qcGc=-.webp",
  },
  {
    id: "hibiscus-shampoo-200",
    name: "Hibiscus Shampoo 200 ml",
    category: "Shampoo",
    purpose: "Sulfate-free strengthening cleanse",
    price: 829,
    quantity: "200 ml",
    description: "Gentle sulfate-free shampoo with hibiscus extract that cleanses while strengthening every strand.",
    tags: ["Sulfate free", "Daily"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Dandruff"],
    tone: "pearl",
    image: "https://thesecrethaircare.com/storage/137/dx7MRR4opaME5Qd1jKx2u3sNBJ0xqj-metaSU1HXzEwMDA2LW1pbi5qcGc=-.webp",
  },
  {
    id: "flango-conditioner-200",
    name: "Flango Conditioner 200 ml",
    category: "Conditioner",
    purpose: "Flaxseed & mango softening conditioner",
    price: 799,
    quantity: "200 ml",
    description: "A nourishing conditioner blending flaxseeds and mango butter for soft, manageable, shiny hair.",
    tags: ["Nourishing", "Detangles"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Dandruff"],
    tone: "mint",
    image: "https://thesecrethaircare.com/storage/171/8s578kQZUM8CVLq309mKMGIU6uhoUw-metaSU1HXzEwMDEwLW1pbi5qcGc=-.webp",
  },
  {
    id: "most-shopped-combo",
    name: "Most Shopped Combo",
    category: "Scalp Treatment",
    purpose: "Customer-favourite starter routine",
    price: 1797,
    quantity: "Bundle",
    description: "Curated combo pairing the bestselling oil with a complementary cleanser for visible results.",
    tags: ["Bundle", "Starter"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Hair growth"],
    tone: "sand",
    image: "https://thesecrethaircare.com/storage/437/Jss9cNUsLFByfPrXbStCZ4jWFfVgXF-metaMDFiLVNlY3JldC1iYW5uZXItMTA4MC14LTEwODAuanBn-.webp",
  },
  {
    id: "love-affhair-50",
    name: "Love Aff.Hair 50 ml",
    category: "Serum",
    purpose: "Long-lasting hair perfume",
    price: 1399,
    quantity: "50 ml",
    description: "A luxurious hair perfume that lingers gently with floral notes, leaving your hair softly scented all day.",
    tags: ["Fragrance", "Travel"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair growth"],
    tone: "lilac",
    image: "https://thesecrethaircare.com/storage/378/FBRlTwUXmfKpcGnrmnkp0oVZ9fqbbO-metabG92ZSBhZmYuaGFpciAwMi5wbmc=-.webp",
  },
  {
    id: "ahuta-aloe-gel",
    name: "Ahuta Aloe Vera Gel 100 g",
    category: "Scalp Treatment",
    purpose: "Pure aloe for scalp & skin",
    price: 349,
    quantity: "100 g",
    description: "Pure aloe vera gel — clean, plant-based and ethically sourced for hair and skin care.",
    tags: ["Vegan", "Multipurpose"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Dandruff"],
    tone: "mint",
    image: "https://thesecrethaircare.com/storage/169/z7dztvIYyb6oXOw0k9BuBpFbPvd0SC-metaSU1HXzEwMDI1LW1pbi5qcGc=-.webp",
  },
  {
    id: "elephant-massager",
    name: "Elephant Head Massager",
    category: "Scalp Treatment",
    purpose: "Boosts circulation during champi",
    price: 399,
    quantity: "Single",
    description: "A gentle scalp massager designed to relax muscles and improve oil absorption during your champi.",
    tags: ["Tool", "Champi"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair growth", "Dandruff"],
    tone: "pearl",
    image: "https://thesecrethaircare.com/storage/339/P4o80555woaFcMELXEyPHFCCs6AQE4-metaSU1HXzk5MDkuUE5H-.webp",
  },
  {
    id: "bamboo-brush",
    name: "Bamboo Paddle Hair Brush",
    category: "Scalp Treatment",
    purpose: "Anti-static, scalp-friendly brush",
    price: 799,
    quantity: "Single",
    description: "Hand-crafted bamboo paddle brush. Gentle on the scalp, anti-static and built to last for years.",
    tags: ["Eco", "Daily"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Dandruff", "Hair growth"],
    tone: "sand",
    image: "https://thesecrethaircare.com/storage/386/0vFV5EUZRgjANHao79ll88X16TT2oL-metac2VjcmV0IDEtMSAwMi1taW4ucG5n-.webp",
  },
  {
    id: "you-me-secret-box",
    name: "You, Me & SECRET Gift Box",
    category: "Scalp Treatment",
    purpose: "Curated gift set of bestsellers",
    price: 2199,
    quantity: "Box set",
    description: "A beautifully curated gift box of our most-loved products, perfect for sharing with the people you love.",
    tags: ["Gift", "Premium"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair growth", "Hair fall"],
    tone: "lilac",
    image: "https://thesecrethaircare.com/storage/416/U0SibLus8Eav009nYDl6a2g5QVQLwQ-metaSU1HXzk3OTMtMi5qcGc=-.webp",
  },
  {
    id: "black-charm-oil-500",
    name: "Black Charm Oil 500 ml",
    category: "Oil",
    purpose: "Family-size hair fall oil",
    price: 2629,
    quantity: "500 ml",
    description: "Family-size pack of our signature Black Charm Oil — best value for committed routines.",
    tags: ["Best value", "Family"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Grey hair"],
    tone: "sand",
    image: "https://thesecrethaircare.com/storage/155/YIHHmWJiTeAqidJoFHGPhSYGonv3X2-metaSU1HXzEwMDE1LW1pbi5qcGc=-.webp",
  },
  {
    id: "hibiscus-shampoo-100",
    name: "Hibiscus Shampoo 100 ml",
    category: "Shampoo",
    purpose: "Travel-size sulfate-free cleanse",
    price: 409,
    quantity: "100 ml",
    description: "Travel-size sulfate-free hibiscus shampoo — same gentle, strengthening cleanse in a pocket-friendly bottle.",
    tags: ["Travel", "Sulfate free"],
    hairTypes: ["Straight", "Wavy", "Curly", "Coily"],
    concerns: ["Hair fall", "Dandruff"],
    tone: "pearl",
    image: "https://thesecrethaircare.com/storage/135/Xd5ohpFogzGuh9dkEXeoRalTg1SpDU-metaSU1HXzk5OTYtbWluLmpwZw==-.webp",
  },
];

// Aliases — older code referenced legacy product ids. Keep them pointing at the
// closest matching product so existing references continue to work.
const PRODUCT_ID_ALIASES: Record<string, string> = {
  "shampoo-balance": "hibiscus-shampoo-200",
  "serum-density": "blue-lilly-oil-200",
  "oil-repair": "black-charm-oil-200",
  "conditioner-soft": "flango-conditioner-200",
  "supplement-core": "most-shopped-combo",
  "scalp-calm": "ahuta-aloe-gel",
  "shampoo-volume": "hibiscus-shampoo-100",
  "mask-deep": "you-me-secret-box",
  "serum-shine": "love-affhair-50",
  "oil-rosemary": "black-charm-oil-500",
  "scalp-exfoliant": "elephant-massager",
  "supplement-biotin": "bamboo-brush",
};

export function resolveProductId(id: string): string {
  return PRODUCT_ID_ALIASES[id] ?? id;
}

export const subscriptionPlans = [
  {
    id: "plan-smart",
    name: "Daily Routine",
    cadence: "Every 30 days",
    savings: "Save 10%",
    description: "Perfect for first 90 days of routine consistency.",
  },
  {
    id: "plan-complete",
    name: "Complete Recovery",
    cadence: "Every 3 months",
    savings: "Save 14%",
    description: "Adds expert check-ins and replenishment reminders.",
  },
] as const;

export const activeSubscription = {
  planId: "plan-smart",
  planName: "Daily Routine",
  status: "Active",
  startedOn: "12 Mar 2026",
  nextBillingDate: "12 May 2026",
  daysToNextBilling: 12,
  pricePerCycle: 1899,
  cyclesCompleted: 2,
  totalCycles: 6,
  routineAdherence: 84, // %
  productsUsed: [
    { productId: "hibiscus-shampoo-200", name: "Hibiscus Shampoo", used: 12, total: 16, unit: "washes" },
    { productId: "blue-lilly-oil-200", name: "Blue Lilly Oil", used: 38, total: 60, unit: "uses" },
    { productId: "black-charm-oil-200", name: "Black Charm Oil", used: 5, total: 8, unit: "applications" },
  ],
  upcomingShipment: {
    date: "12 May 2026",
    items: ["Hibiscus Shampoo · refill", "Blue Lilly Oil · refill"],
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
    total: 2677,
    status: "Delivered",
    items: ["Hibiscus Shampoo 200 ml", "Blue Lilly Oil 200 ml", "Flango Conditioner 200 ml"],
    productIds: ["hibiscus-shampoo-200", "blue-lilly-oil-200", "flango-conditioner-200"],
  },
  {
    id: "SHC-1982",
    date: "18 Mar 2026",
    total: 1398,
    status: "Delivered",
    items: ["Black Charm Oil 200 ml", "Ahuta Aloe Vera Gel"],
    productIds: ["black-charm-oil-200", "ahuta-aloe-gel"],
  },
] as const;

export const consultationHistory = [
  {
    id: "consult-1",
    date: "10 Apr 2026",
    expert: "Dr. Anika Rao",
    specialization: "Trichologist",
    summary: "Reviewed scalp images. Confirmed mild telogen shedding. Continue Black Charm Oil 2x/week.",
    status: "Completed",
  },
  {
    id: "consult-2",
    date: "22 Feb 2026",
    expert: "Dr. Karan Mehta",
    specialization: "Dermatologist",
    summary: "Discussed dandruff flare. Switched to Hibiscus Shampoo twice weekly.",
    status: "Completed",
  },
] as const;

export const wishlistItems = [
  { id: "wish-1", productId: "flango-conditioner-200", name: "Flango Conditioner 200 ml", price: 799, note: "Saved · 2 days ago" },
  { id: "wish-2", productId: "ahuta-aloe-gel", name: "Ahuta Aloe Vera Gel", price: 349, note: "Saved · 1 week ago" },
  { id: "wish-3", productId: "black-charm-oil-200", name: "Black Charm Oil 200 ml", price: 1049, note: "Saved · 3 weeks ago" },
] as const;

export const notificationItems = [
  {
    id: "notif-1",
    title: "Your refill is due in 5 days",
    body: "Reorder your Daily Routine kit to avoid a gap.",
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
    | "Hair growth"
    | "Grey hair"
    | "Dandruff"
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
  "Hair growth": [
    {
      id: "hg_rate",
      group: "Hair growth",
      title: "How do you feel about your current growth rate?",
      type: "single",
      options: ["Very slow", "Slower than before", "Normal", "Not sure"],
      weights: { "Very slow": 3, "Slower than before": 2, Normal: 0, "Not sure": 1 },
    },
    {
      id: "hg_partition",
      group: "Hair growth",
      title: "Have you noticed a wider partition or thinner ponytail?",
      type: "single",
      options: ["Yes", "Slightly", "No"],
      weights: { Yes: 3, Slightly: 2, No: 0 },
    },
    {
      id: "hg_area",
      group: "Hair growth",
      title: "Where do you most want to see growth?",
      type: "single",
      options: ["Front / hairline", "Crown", "Overall length", "Edges"],
      weights: { "Front / hairline": 2, Crown: 2, "Overall length": 1, Edges: 2 },
    },
    {
      id: "hg_tried",
      group: "Hair growth",
      title: "Have you tried growth treatments before?",
      type: "single",
      options: ["Yes", "No"],
      weights: { Yes: 1, No: 1 },
    },
    {
      id: "hg_trim",
      group: "Hair growth",
      title: "Do you trim regularly?",
      type: "single",
      options: ["Yes", "Sometimes", "No"],
      weights: { Yes: 0, Sometimes: 1, No: 2 },
    },
  ],
  "Grey hair": [
    {
      id: "gr_age_started",
      group: "Grey hair",
      title: "When did you first notice grey strands?",
      type: "single",
      options: ["Before 20", "20s", "30s", "40+"],
      weights: { "Before 20": 3, "20s": 2, "30s": 1, "40+": 0 },
    },
    {
      id: "gr_extent",
      group: "Grey hair",
      title: "How widespread is the greying?",
      type: "single",
      options: ["A few strands", "Patchy", "Across the head", "Mostly grey"],
      weights: { "A few strands": 1, Patchy: 2, "Across the head": 2, "Mostly grey": 3 },
    },
    {
      id: "gr_area",
      group: "Grey hair",
      title: "Where is greying most visible?",
      type: "multi",
      options: ["Temples", "Front", "Crown", "Beard / sideburns", "All over"],
      weights: { Temples: 1, Front: 2, Crown: 2, "Beard / sideburns": 1, "All over": 3 },
    },
    {
      id: "gr_family",
      group: "Grey hair",
      title: "Family history of premature greying?",
      type: "single",
      options: ["Yes", "No", "Not sure"],
      weights: { Yes: 2, No: 0, "Not sure": 1 },
    },
    {
      id: "gr_color",
      group: "Grey hair",
      title: "Do you currently colour your hair?",
      type: "single",
      options: ["Regularly", "Occasionally", "Never"],
      weights: { Regularly: 2, Occasionally: 1, Never: 0 },
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

  // (No special merging needed for the current 4-concern set.)

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
  /** Intensity per selected concern, 1..10 */
  intensity: Record<string, number>;
  dynamic: Record<string, string | string[]>;
  hairType: string;
  gender: string;
  goal: string;
  imageUploaded: boolean;
};

export const defaultAssessmentAnswers: AssessmentAnswers = {
  concerns: [],
  intensity: {},
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
  const scalpModules = ["Dandruff"]
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
  "Hair fall": ["black-charm-oil-200", "hibiscus-shampoo-200", "flango-conditioner-200"],
  "Hair growth": ["blue-lilly-oil-200", "most-shopped-combo", "elephant-massager"],
  "Grey hair": ["black-charm-oil-200", "black-charm-oil-500", "hibiscus-shampoo-200"],
  Dandruff: ["hibiscus-shampoo-200", "ahuta-aloe-gel", "bamboo-brush"],
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

  if (answers.concerns.includes("Dandruff")) {
    insights.push("Your scalp shows signs of an oil–dry imbalance that benefits from a gentle reset cleanser.");
  }
  if (answers.concerns.includes("Grey hair")) {
    insights.push("Pigment cells are sensitive to nutrition and stress — Ayurvedic oils can help slow visible greying.");
  }
  if (answers.concerns.includes("Hair growth")) {
    insights.push("Growth phase support benefits from circulation rituals and consistent night application.");
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
  const concernMatches = answers.concerns.length ? answers.concerns : ["Hair fall"];
  const scoredProductIds = new Set<string>();

  concernMatches.forEach((concern) => {
    productPriorityByConcern[concern]?.forEach((productId) => scoredProductIds.add(productId));
  });

  if (score.lifestyleImpact >= 50) {
    scoredProductIds.add("most-shopped-combo");
  }
  if (score.scalpHealth < 60) {
    scoredProductIds.add("ahuta-aloe-gel");
    scoredProductIds.add("hibiscus-shampoo-200");
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
        concernMatches.includes("Hair growth") || concernMatches.includes("Grey hair")
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
      title: "Daily Routine",
      subtitle:
        score.scalpHealth < 60
          ? "Use a balancing cleanser 2–3 times a week"
          : "Use during core wash days",
    },
    {
      title: "Treat",
      subtitle:
        concernMatches.includes("Hair fall") || concernMatches.includes("Hair growth")
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
  const concernMatches = answers.concerns.length ? answers.concerns : ["Hair fall"];
  const notes: string[] = [];

  if (concernMatches.includes("Dandruff")) {
    notes.push(
      "Visible scalp reactivity suggests a scalp-first routine with calm-down support on non-wash days.",
    );
  }

  if (concernMatches.some((concern) => ["Hair fall", "Hair growth"].includes(concern))) {
    notes.push(
      "Density-focused products are suitable when paired with consistent night application and progress tracking.",
    );
  }

  if (concernMatches.includes("Grey hair")) {
    notes.push(
      "Premature greying responds best to consistent oiling rituals, antioxidant nutrition, and stress reduction.",
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
