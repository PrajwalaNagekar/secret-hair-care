// Shared data + types for the Secret Hair Care webapp.
// Product information sourced from thesecrethaircare.com (names, prices, image URLs).
export type WebProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string; // Real product image URL
  description: string;
  benefits: string[];
  ingredients: string[];
  size: string;
  rating: number;
  reviewCount: number;
  concerns: string[];
};

export const WEB_CATEGORIES = [
  { slug: "hair-oils", name: "Hair Oils" },
  { slug: "shampoos-conditioners", name: "Shampoos & Conditioners" },
  { slug: "combo-kits", name: "Combo Kits" },
  { slug: "hair-masks-combs", name: "Hair Masks & Combs" },
  { slug: "hair-perfumes", name: "Hair Perfumes" },
  { slug: "supplements", name: "Supplements" },
];

export const WEB_CONCERNS = [
  { slug: "hair-fall", name: "Hair Fall" },
  { slug: "growth", name: "Hair Growth" },
  { slug: "greying", name: "Grey Hair" },
  { slug: "dandruff", name: "Dandruff" },
];

// Real product catalog from thesecrethaircare.com
export const WEB_PRODUCTS: WebProduct[] = [
  {
    id: "p1",
    slug: "black-charm-oil-200-ml",
    name: "Black Charm Oil 200 ml",
    category: "hair-oils",
    price: 1049,
    image:
      "https://thesecrethaircare.com/storage/153/whGjDTPbtfWg7e7vigWZfqwQDI6eIc-metaSU1HXzEwMDAyLW1pbi5qcGc=-.webp",
    description:
      "A signature blend designed to control hair fall and stimulate roots, infused with curry leaves, hibiscus and amla.",
    benefits: ["Controls hair fall", "Strengthens roots", "Adds shine", "Reduces premature greying"],
    ingredients: ["Coconut oil", "Hibiscus", "Curry leaves", "Amla", "Brahmi", "Bhringraj"],
    size: "200 ml",
    rating: 4.8,
    reviewCount: 1240,
    concerns: ["hair-fall", "thinning", "greying"],
  },
  {
    id: "p2",
    slug: "love-affhair-50-ml",
    name: "Love Aff.Hair 50 ml",
    category: "hair-perfumes",
    price: 1399,
    image:
      "https://thesecrethaircare.com/storage/378/FBRlTwUXmfKpcGnrmnkp0oVZ9fqbbO-metabG92ZSBhZmYuaGFpciAwMi5wbmc=-.webp",
    description:
      "A luxurious hair perfume that lingers gently with floral notes, leaving your hair softly scented all day.",
    benefits: ["Long-lasting fragrance", "Non-sticky", "Tames frizz", "Travel friendly"],
    ingredients: ["Rose absolute", "Jasmine", "Sandalwood", "Vanilla"],
    size: "50 ml",
    rating: 4.9,
    reviewCount: 542,
    concerns: ["dryness"],
  },
  {
    id: "p3",
    slug: "most-shopped-combo",
    name: "Most Shopped Combo",
    category: "combo-kits",
    price: 1797,
    image:
      "https://thesecrethaircare.com/storage/437/Jss9cNUsLFByfPrXbStCZ4jWFfVgXF-metaMDFiLVNlY3JldC1iYW5uZXItMTA4MC14LTEwODAuanBn-.webp",
    description:
      "Our customer favourite — a curated combo pairing the bestselling oil with a complementary cleanser for visible results.",
    benefits: ["Complete starter routine", "Customer favourite", "Saves on individual prices", "Suits all hair types"],
    ingredients: ["Hibiscus", "Curry leaves", "Amla", "Coconut oil", "Aloe vera"],
    size: "Bundle",
    rating: 4.7,
    reviewCount: 832,
    concerns: ["hair-fall", "thinning"],
  },
  {
    id: "p4",
    slug: "hibiscus-shampoo-200-ml",
    name: "Hibiscus Shampoo 200 ml",
    category: "shampoos-conditioners",
    price: 829,
    image:
      "https://thesecrethaircare.com/storage/137/dx7MRR4opaME5Qd1jKx2u3sNBJ0xqj-metaSU1HXzEwMDA2LW1pbi5qcGc=-.webp",
    description:
      "Sulfate-free shampoo with hibiscus extract, gently cleansing while strengthening every strand.",
    benefits: ["Sulfate free", "Gentle cleanse", "Strengthens hair", "Color safe"],
    ingredients: ["Hibiscus extract", "Aloe vera", "Coconut surfactant", "Vitamin E"],
    size: "200 ml",
    rating: 4.6,
    reviewCount: 967,
    concerns: ["hair-fall", "dryness"],
  },
  {
    id: "p5",
    slug: "blue-lilly-oil-200-ml",
    name: "Blue Lilly Oil 200 ml",
    category: "hair-oils",
    price: 1049,
    image:
      "https://thesecrethaircare.com/storage/131/JBE1EYUYfn094j2E6TRlpGD7LnxF9p-metaSU1HXzEwMDA0LW1pbi5qcGc=-.webp",
    description:
      "A cooling blue lilly–infused oil that calms the scalp, supports growth and adds a soft natural sheen.",
    benefits: ["Cools the scalp", "Supports growth", "Reduces dryness", "Light, non-greasy"],
    ingredients: ["Blue Lilly", "Coconut oil", "Bhringraj", "Brahmi"],
    size: "200 ml",
    rating: 4.7,
    reviewCount: 615,
    concerns: ["growth", "thinning", "scalp-care"],
  },
  {
    id: "p6",
    slug: "you-me-secret-gift-box",
    name: "You, Me & SECRET Gift Box",
    category: "combo-kits",
    price: 2199,
    image:
      "https://thesecrethaircare.com/storage/416/U0SibLus8Eav009nYDl6a2g5QVQLwQ-metaSU1HXzk3OTMtMi5qcGc=-.webp",
    description: "A beautifully curated gift box of our most-loved products, perfect for sharing with the people you love.",
    benefits: ["Premium packaging", "Curated picks", "Includes greeting card", "Gift-ready"],
    ingredients: ["Coconut", "Hibiscus", "Amla", "Floral notes"],
    size: "Box set",
    rating: 4.9,
    reviewCount: 412,
    concerns: ["growth", "dryness"],
  },
  {
    id: "p7",
    slug: "bamboo-paddle-hair-brush",
    name: "Bamboo Paddle Hair Brush",
    category: "hair-masks-combs",
    price: 799,
    image:
      "https://thesecrethaircare.com/storage/386/0vFV5EUZRgjANHao79ll88X16TT2oL-metac2VjcmV0IDEtMSAwMi1taW4ucG5n-.webp",
    description:
      "Hand-crafted bamboo paddle brush. Gentle on the scalp, anti-static and built to last for years.",
    benefits: ["Anti-static", "Improves circulation", "Eco-friendly", "Hand crafted"],
    ingredients: ["Bamboo", "Natural bristles"],
    size: "Single",
    rating: 4.8,
    reviewCount: 711,
    concerns: ["scalp-care"],
  },
  {
    id: "p8",
    slug: "ahuta-aloe-vera-gel-100-gms",
    name: "Ahuta Aloe vera Gel 100 gms",
    category: "hair-masks-combs",
    price: 349,
    image:
      "https://thesecrethaircare.com/storage/169/z7dztvIYyb6oXOw0k9BuBpFbPvd0SC-metaSU1HXzEwMDI1LW1pbi5qcGc=-.webp",
    description:
      "Pure aloe vera gel — clean, plant-based and ethically sourced for hair and skin.",
    benefits: ["Pure aloe", "No chemicals", "Vegan", "Multipurpose"],
    ingredients: ["Aloe vera", "Natural preservative"],
    size: "100 g",
    rating: 4.7,
    reviewCount: 522,
    concerns: ["scalp-care", "dryness"],
  },
  {
    id: "p9",
    slug: "elephant-head-massager",
    name: "Elephant Head Massager",
    category: "hair-masks-combs",
    price: 399,
    image:
      "https://thesecrethaircare.com/storage/339/P4o80555woaFcMELXEyPHFCCs6AQE4-metaSU1HXzk5MDkuUE5H-.webp",
    description: "A gentle scalp massager designed to relax muscles and improve oil absorption during your champi.",
    benefits: ["Improves circulation", "Relieves stress", "Pairs with oil", "Travel friendly"],
    ingredients: ["Food-grade silicone"],
    size: "Single",
    rating: 4.6,
    reviewCount: 287,
    concerns: ["scalp-care"],
  },
  {
    id: "p10",
    slug: "flango-conditioner-flaxseeds-mango-200-ml",
    name: "Flango Conditioner (Flaxseeds & Mango) 200 ml",
    category: "shampoos-conditioners",
    price: 799,
    image:
      "https://thesecrethaircare.com/storage/171/8s578kQZUM8CVLq309mKMGIU6uhoUw-metaSU1HXzEwMDEwLW1pbi5qcGc=-.webp",
    description: "A nourishing conditioner blending flaxseeds and mango butter for soft, manageable, shiny hair.",
    benefits: ["Deep conditioning", "Adds shine", "Detangles", "Color safe"],
    ingredients: ["Flaxseeds", "Mango butter", "Argan oil"],
    size: "200 ml",
    rating: 4.6,
    reviewCount: 489,
    concerns: ["dryness"],
  },
  {
    id: "p11",
    slug: "blue-lilly-oil-100-ml",
    name: "Blue Lilly Oil 100 ml",
    category: "hair-oils",
    price: 529,
    image:
      "https://thesecrethaircare.com/storage/149/63OFMAJnNK28BGNpbJ8ihc4NigMcvZ-metaSU1HXzk5OTMtbWluLmpwZw==-.webp",
    description:
      "A travel-friendly bottle of our cooling Blue Lilly oil, perfect for daily root nourishment.",
    benefits: ["Cools the scalp", "Supports growth", "Travel-friendly", "Light formula"],
    ingredients: ["Blue Lilly", "Coconut oil", "Bhringraj"],
    size: "100 ml",
    rating: 4.5,
    reviewCount: 233,
    concerns: ["growth", "thinning"],
  },
  {
    id: "p12",
    slug: "hibiscus-shampoo-100-ml",
    name: "Hibiscus Shampoo 100 ml",
    category: "shampoos-conditioners",
    price: 409,
    image:
      "https://thesecrethaircare.com/storage/135/Xd5ohpFogzGuh9dkEXeoRalTg1SpDU-metaSU1HXzk5OTYtbWluLmpwZw==-.webp",
    description:
      "Travel-size sulfate-free hibiscus shampoo. The same gentle, strengthening cleanse you love, in a pocket-friendly bottle.",
    benefits: ["Sulfate free", "Travel size", "Strengthens hair", "Color safe"],
    ingredients: ["Hibiscus extract", "Aloe vera", "Coconut surfactant", "Vitamin E"],
    size: "100 ml",
    rating: 4.6,
    reviewCount: 287,
    concerns: ["hair-fall", "dryness"],
  },
  {
    id: "p13",
    slug: "black-charm-oil-500-ml",
    name: "Black Charm Oil 500 ml",
    category: "hair-oils",
    price: 2629,
    image:
      "https://thesecrethaircare.com/storage/155/YIHHmWJiTeAqidJoFHGPhSYGonv3X2-metaSU1HXzEwMDE1LW1pbi5qcGc=-.webp",
    description: "Family-size pack of our signature Black Charm Oil — best value for committed routines.",
    benefits: ["Best value", "Controls hair fall", "Strengthens roots", "Reduces premature greying"],
    ingredients: ["Coconut oil", "Hibiscus", "Curry leaves", "Amla", "Brahmi", "Bhringraj"],
    size: "500 ml",
    rating: 4.8,
    reviewCount: 921,
    concerns: ["hair-fall", "thinning", "greying"],
  },
  {
    id: "p14",
    slug: "blue-lilly-oil-500-ml",
    name: "Blue Lilly Oil 500 ml",
    category: "hair-oils",
    price: 2629,
    image:
      "https://thesecrethaircare.com/storage/133/PcIYiPKcSQUjsj1FvauEiTdYH90NcI-metaSU1HXzEwMDE0LW1pbi5qcGc=-.webp",
    description: "Family-size pack of our cooling Blue Lilly oil for the whole household.",
    benefits: ["Best value", "Cools scalp", "Supports growth", "Multi-user pack"],
    ingredients: ["Blue Lilly", "Coconut oil", "Bhringraj", "Brahmi"],
    size: "500 ml",
    rating: 4.7,
    reviewCount: 412,
    concerns: ["growth", "scalp-care"],
  },
  {
    id: "p15",
    slug: "hibiscus-shampoo-500-ml",
    name: "Hibiscus Shampoo 500 ml",
    category: "shampoos-conditioners",
    price: 2069,
    image:
      "https://thesecrethaircare.com/storage/139/pcLN3CqHTzrXzMKbqGqFvx3uLx0Ccx-metaSU1HXzEwMDIxLW1pbi5qcGc=-.webp",
    description: "Family-size hibiscus shampoo — sulfate-free care that lasts longer.",
    benefits: ["Sulfate free", "Family size", "Strengthens hair", "Better value"],
    ingredients: ["Hibiscus extract", "Aloe vera", "Coconut surfactant", "Vitamin E"],
    size: "500 ml",
    rating: 4.7,
    reviewCount: 522,
    concerns: ["hair-fall", "dryness"],
  },
  {
    id: "p16",
    slug: "flango-conditioner-flaxseeds-mango-500-ml",
    name: "Flango Conditioner (Flaxseeds & Mango) 500 ml",
    category: "shampoos-conditioners",
    price: 1997,
    image:
      "https://thesecrethaircare.com/storage/173/bY3fOBduPLltUCsHRSk150LMb31deA-metaSU1HXzEwMDEzLW1pbi5qcGc=-.webp",
    description: "Family-size Flango Conditioner with flaxseeds and mango butter for everyday softness.",
    benefits: ["Family size", "Deep conditioning", "Adds shine", "Detangles"],
    ingredients: ["Flaxseeds", "Mango butter", "Argan oil"],
    size: "500 ml",
    rating: 4.6,
    reviewCount: 318,
    concerns: ["dryness"],
  },
];

export const WEB_REVIEWS = [
  {
    name: "Aanya R.",
    location: "Mumbai",
    rating: 5,
    title: "My hair fall stopped in 3 weeks",
    body: "I tried so many oils but Black Charm actually worked. My pillow is finally clean in the morning.",
    product: "Black Charm Oil 200 ml",
  },
  {
    name: "Priya S.",
    location: "Bengaluru",
    rating: 5,
    title: "Smells divine, lasts all day",
    body: "Love Aff.Hair is a holy grail product. People always ask what perfume I'm wearing.",
    product: "Love Aff.Hair 50 ml",
  },
  {
    name: "Meera K.",
    location: "Chennai",
    rating: 4,
    title: "Genuine, natural, no nonsense",
    body: "The combo is a complete routine. My only wish is that the bottle was bigger!",
    product: "Most Shopped Combo",
  },
  {
    name: "Sneha P.",
    location: "Delhi",
    rating: 5,
    title: "Finally a clean shampoo",
    body: "No sulfates, no harsh chemicals. My color stays vibrant week after week.",
    product: "Hibiscus Shampoo 200 ml",
  },
  {
    name: "Rhea M.",
    location: "Hyderabad",
    rating: 5,
    title: "Beautifully packaged gift",
    body: "I gifted this to my mom for her birthday. The presentation was as luxe as the products.",
    product: "You, Me & SECRET Gift Box",
  },
  {
    name: "Tanya G.",
    location: "Pune",
    rating: 4,
    title: "Healthier, thicker hair",
    body: "Used the Blue Lilly oil for 2 months. My ponytail feels noticeably thicker.",
    product: "Blue Lilly Oil 200 ml",
  },
];

export type WebBlog = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  content: string[]; // paragraphs
};

export const WEB_BLOGS: WebBlog[] = [
  {
    slug: "why-you-need-to-add-hair-masks-to-your-hair-care-routine",
    title: "Why You Need To Add Hair Masks To Your Hair Care Routine",
    excerpt:
      "Curious about hair masks? Wondering if you really need to add yet another product to your hair care routine? Here's the case for masks and how to choose the right one.",
    image:
      "https://thesecrethaircare.com/storage/301/P8XYKvtzHAY7aZwCmFq9lC3wTOeIsc-metaMS5QTkc=-.webp",
    date: "October 03, 2025",
    readTime: "5 min read",
    author: "The Secret Team",
    category: "Hair Rituals",
    content: [
      "If your routine already includes a shampoo, a conditioner and a weekly oil massage, you might wonder whether a hair mask is really necessary. The honest answer is: yes, especially if your hair is exposed to heat, pollution, hard water or frequent styling.",
      "A hair mask works on a different layer than your daily conditioner. While conditioner smooths the cuticle for short-term softness, a mask penetrates deeper to repair, hydrate and reinforce the strand from within. Used once a week, it can transform dull, brittle hair into something noticeably stronger and shinier.",
      "When choosing a mask, look for plant-based ingredients like hibiscus, flaxseed, mango butter and amla — they nourish without weighing hair down. Avoid masks with silicones high on the ingredient list; they create a coating but do not actually repair.",
      "How to use it: shampoo as usual, squeeze out excess water, apply a generous layer from mid-lengths to ends, and leave it on for 10–20 minutes. Rinse thoroughly. For a deeper treatment, wrap your hair in a warm towel — the gentle heat helps the mask absorb better.",
      "Stick with it for four to six weeks and you will see a real difference in texture, shine and breakage. A mask is not an extra step. It is the step that quietly does the heavy lifting.",
    ],
  },
  {
    slug: "premature-greying-everything-you-need-to-know",
    title: "Premature Greying: Everything You Need To Know",
    excerpt:
      "It's always alarming to find those first few strands of grey hair. For most Asians, this usually happens earlier than expected — here's what causes it and how to slow it down.",
    image:
      "https://thesecrethaircare.com/storage/302/mGRCxNm1WZkZFe4QLvT3hRXuOf8VlM-metaMi5KUEc=-.webp",
    date: "February 05, 2025",
    readTime: "7 min read",
    author: "The Secret Team",
    category: "Hair Science",
    content: [
      "Spotting your first grey strand can be unsettling, especially when it shows up earlier than you expected. Premature greying — defined as significant greying before the age of 25 — is more common in South Asian populations than you might think, and it is rarely about age alone.",
      "Hair gets its colour from melanin, produced by cells called melanocytes inside each follicle. When these cells slow down or stop functioning, new strands grow in without pigment. Genetics play the largest role: if your parents greyed early, you likely will too.",
      "Beyond genetics, several lifestyle factors accelerate the process. Chronic stress can disrupt melanocyte activity. Deficiencies in Vitamin B12, iron, copper and Vitamin D are strongly linked to early greying. Smoking, harsh chemical treatments and prolonged exposure to UV also contribute.",
      "What helps: a balanced diet rich in leafy greens, eggs, nuts and seeds; weekly oil massages with ingredients like bhringraj, amla and curry leaves; managing stress through sleep, movement and downtime; and switching to gentle, sulfate-free cleansers.",
      "While you cannot reverse hair that is already grey, you can absolutely slow the progression and improve the health of the pigmented hair you still have. Consistency is everything — the scalp responds to care given over months, not days.",
    ],
  },
  {
    slug: "packing-for-a-trip-dont-forget-these-travel-hair-kit-must-haves",
    title: "Packing For A Trip? Don't Forget These Travel Hair Kit Must-Haves",
    excerpt:
      "We pay a lot of attention to outfits, shoes, and makeup before a holiday — but our hair routine deserves the same care. Here's the perfect travel kit.",
    image:
      "https://thesecrethaircare.com/storage/303/HSdtBbqGzs80P8lMi5hNHTDKCk4ecr-metaMy5wbmc=-.webp",
    date: "October 03, 2024",
    readTime: "4 min read",
    author: "The Secret Team",
    category: "Travel & Lifestyle",
    content: [
      "Travel disrupts your hair more than you might think. New water, climate shifts, sun, salt, chlorine and missed wash days all add up. Building a small, intentional travel kit means your hair stays calm no matter where you land.",
      "Start with a 100ml shampoo and conditioner. Stick to sulfate-free formulas so you do not strip the scalp during back-to-back travel days. Decant into refillable bottles if your favourites only come in larger sizes.",
      "Add a 100ml hair oil. A weekly oil massage is the single best thing you can do for travel-stressed hair. It restores moisture, soothes the scalp and protects against environmental damage.",
      "Include a wide-tooth wooden comb or bamboo paddle brush. Plastic brushes generate static, especially in dry hotel air. A natural-fibre brush is gentler and travels well.",
      "Finish with a hair perfume and a silk or satin scrunchie. The perfume keeps strands feeling fresh between washes; the scrunchie prevents creases and breakage while you sleep on unfamiliar pillows.",
      "Pack everything in a small zip pouch and you have a routine that travels in under 500g. Your hair will thank you when you get home.",
    ],
  },
  {
    slug: "is-this-hormone-causing-your-hair-loss",
    title: "Is This Hormone Causing Your Hair Loss?",
    excerpt:
      "There are many external (and internal) factors that affect our hair. Did you know one common hormone could be silently triggering your hair loss?",
    image:
      "https://thesecrethaircare.com/storage/304/7nuMfO0lngzM3OOxEuKZAHpaxLcLoV-metaNC5KUEc=-.webp",
    date: "April 03, 2024",
    readTime: "6 min read",
    author: "The Secret Team",
    category: "Hair Science",
    content: [
      "If you have been losing more hair than usual and cannot pinpoint why, the answer may be hormonal. One of the most common — yet least discussed — culprits is dihydrotestosterone, or DHT.",
      "DHT is a derivative of testosterone, present in both men and women. In sensitive individuals, DHT binds to hair follicles on the scalp and gradually shrinks them. Over time, follicles produce thinner, weaker strands until they stop producing hair altogether. This pattern, known as androgenic alopecia, is the leading cause of long-term hair thinning.",
      "Other hormones contribute too. An underactive thyroid slows hair growth and increases shedding. Postpartum drops in oestrogen cause noticeable hair fall around three to four months after delivery. PCOS often triggers diffuse thinning at the crown.",
      "What you can do: get a blood panel to check thyroid, iron, ferritin, Vitamin D and Vitamin B12 levels. Eat enough protein — hair is made of keratin, and deficient diets show on the scalp first. Use scalp massages with oils containing rosemary, bhringraj or pumpkin seed, all of which have been studied for DHT-related hair fall.",
      "Hormonal hair loss is rarely solved overnight, but it is highly manageable when caught early. If shedding feels excessive or persistent for more than three months, speak with a dermatologist or trichologist for a tailored plan.",
    ],
  },
];

export function formatINR(value: number) {
  return `₹ ${value.toLocaleString("en-IN")}`;
}
