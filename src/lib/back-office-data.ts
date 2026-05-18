// Shared mock data for Admin Panel and Expert Portal.
// Mirrors entities present in the mobile app + web storefront so both
// back-office surfaces show realistic, connected information.

import { WEB_PRODUCTS, type WebProduct } from "@/lib/web-data";

export type AdminOrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: AdminOrderStatus;
  items: { productId: string; name: string; qty: number; price: number }[];
  shipping: { city: string; state: string; pincode: string };
  paymentMethod: "UPI" | "Card" | "COD" | "Net Banking";
  trackingId?: string;
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  joined: string;
  orders: number;
  spent: number;
  hairType: "Straight" | "Wavy" | "Curly" | "Coily";
  topConcern: string;
  subscription: "Smart Refill" | "Complete Recovery" | "None";
  aiScore: number;
  assignedExpert?: string;
};

export type ConsultationStatus = "Upcoming" | "In Progress" | "Completed" | "Cancelled" | "Awaiting Notes";

export type AdminConsultation = {
  id: string;
  customer: string;
  customerId: string;
  expert: string;
  expertId: string;
  date: string;
  time: string;
  mode: "Chat" | "Audio";
  status: ConsultationStatus;
  concern: string;
  fee: number;
  notes?: string;
};

export type AIRecommendation = {
  id: string;
  customer: string;
  customerId: string;
  date: string;
  hairScore: number;
  topConcerns: { concern: string; severity: "Mild" | "Moderate" | "Significant"; score: number }[];
  recommendedProducts: string[];
  expertReviewed: boolean;
  reviewer?: string;
};

export type AdminSubscription = {
  id: string;
  customer: string;
  customerId: string;
  plan: "Smart Refill" | "Complete Recovery";
  status: "Active" | "Paused" | "Cancelled";
  startDate: string;
  nextBilling: string;
  cyclesCompleted: number;
  pricePerCycle: number;
  adherence: number;
};

export type ShipmentStatus = "Label created" | "Picked up" | "In transit" | "Out for delivery" | "Delivered" | "Returned";

export type AdminShipment = {
  id: string;
  orderId: string;
  customer: string;
  carrier: "Delhivery" | "BlueDart" | "Shadowfax" | "Ekart";
  trackingNumber: string;
  status: ShipmentStatus;
  estimatedDelivery: string;
  destination: string;
};

export type AdminExpert = {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  rating: number;
  experience: string;
  consultations: number;
  earnings: number;
  status: "Active" | "On leave" | "Inactive" | "Pending";
  languages: string[];
};

/* ------------------------------ DATA ------------------------------ */

export const ADMIN_EXPERTS: AdminExpert[] = [
  {
    id: "exp-1",
    name: "Dr. Aisha Menon",
    specialization: "Trichology & scalp recovery",
    email: "aisha.menon@secrethaircare.app",
    phone: "+91 98452 11220",
    rating: 4.9,
    experience: "11 years",
    consultations: 312,
    earnings: 248_400,
    status: "Active",
    languages: ["English", "Hindi", "Malayalam"],
  },
  {
    id: "exp-2",
    name: "Dr. Rhea Kapoor",
    specialization: "Hair nutrition & routine planning",
    email: "rhea.kapoor@secrethaircare.app",
    phone: "+91 98212 33445",
    rating: 4.8,
    experience: "8 years",
    consultations: 184,
    earnings: 156_300,
    status: "Active",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: "exp-3",
    name: "Dr. Neil D'Souza",
    specialization: "Scalp sensitivity & styling damage",
    email: "neil.dsouza@secrethaircare.app",
    phone: "+91 90080 56712",
    rating: 4.7,
    experience: "9 years",
    consultations: 221,
    earnings: 192_800,
    status: "Active",
    languages: ["English", "Hindi", "Marathi"],
  },
  {
    id: "exp-4",
    name: "Dr. Ananya Iyer",
    specialization: "Postpartum & hormonal hair loss",
    email: "ananya.iyer@secrethaircare.app",
    phone: "+91 98410 77821",
    rating: 4.9,
    experience: "13 years",
    consultations: 401,
    earnings: 312_500,
    status: "On leave",
    languages: ["English", "Tamil", "Hindi"],
  },
];

export const ADMIN_CUSTOMERS: AdminCustomer[] = [
  { id: "c-1001", name: "Sarah Krishnan", email: "sarah.k@example.com", phone: "+91 98765 12340", city: "Mumbai", joined: "12 Jan 2026", orders: 6, spent: 12_480, hairType: "Wavy", topConcern: "Hair fall", subscription: "Smart Refill", aiScore: 72, assignedExpert: "Dr. Aisha Menon" },
  { id: "c-1002", name: "Aanya Reddy", email: "aanya.r@example.com", phone: "+91 90873 22310", city: "Bengaluru", joined: "04 Feb 2026", orders: 4, spent: 8_140, hairType: "Curly", topConcern: "Frizz", subscription: "Complete Recovery", aiScore: 81, assignedExpert: "Dr. Rhea Kapoor" },
  { id: "c-1003", name: "Priya Sharma", email: "priya.s@example.com", phone: "+91 98810 11220", city: "Delhi", joined: "18 Feb 2026", orders: 2, spent: 3_240, hairType: "Straight", topConcern: "Dryness", subscription: "None", aiScore: 65, assignedExpert: "Dr. Neil D'Souza" },
  { id: "c-1004", name: "Meera Iyer", email: "meera.i@example.com", phone: "+91 90040 55671", city: "Chennai", joined: "20 Feb 2026", orders: 9, spent: 18_770, hairType: "Wavy", topConcern: "Thinning", subscription: "Smart Refill", aiScore: 58, assignedExpert: "Dr. Aisha Menon" },
  { id: "c-1005", name: "Sneha Patel", email: "sneha.p@example.com", phone: "+91 99877 14422", city: "Ahmedabad", joined: "01 Mar 2026", orders: 3, spent: 5_980, hairType: "Curly", topConcern: "Dandruff", subscription: "None", aiScore: 70, assignedExpert: "Dr. Rhea Kapoor" },
  { id: "c-1006", name: "Rhea Mathur", email: "rhea.m@example.com", phone: "+91 90121 88823", city: "Hyderabad", joined: "11 Mar 2026", orders: 5, spent: 11_320, hairType: "Straight", topConcern: "Greying", subscription: "Smart Refill", aiScore: 76 },
  { id: "c-1007", name: "Tanya Gupta", email: "tanya.g@example.com", phone: "+91 99201 55678", city: "Pune", joined: "22 Mar 2026", orders: 7, spent: 14_500, hairType: "Wavy", topConcern: "Slow growth", subscription: "Complete Recovery", aiScore: 63, assignedExpert: "Dr. Neil D'Souza" },
  { id: "c-1008", name: "Kavya Nair", email: "kavya.n@example.com", phone: "+91 98477 66554", city: "Kochi", joined: "02 Apr 2026", orders: 1, spent: 1_399, hairType: "Coily", topConcern: "Scalp sensitivity", subscription: "None", aiScore: 84 },
];

const productById = (id: string): WebProduct | undefined => WEB_PRODUCTS.find((p) => p.id === id);

const order = (
  id: string,
  customer: string,
  email: string,
  date: string,
  status: AdminOrderStatus,
  items: { productId: string; qty: number }[],
  shipping: AdminOrder["shipping"],
  paymentMethod: AdminOrder["paymentMethod"],
  trackingId?: string,
): AdminOrder => {
  const enriched = items.map((i) => {
    const p = productById(i.productId);
    return { productId: i.productId, name: p?.name ?? i.productId, qty: i.qty, price: p?.price ?? 0 };
  });
  return {
    id,
    customer,
    email,
    date,
    status,
    items: enriched,
    shipping,
    paymentMethod,
    trackingId,
    total: enriched.reduce((s, x) => s + x.price * x.qty, 0),
  };
};

export const ADMIN_ORDERS: AdminOrder[] = [
  order("SHC-3041", "Sarah Krishnan", "sarah.k@example.com", "23 Apr 2026", "Processing", [{ productId: "p1", qty: 1 }, { productId: "p4", qty: 1 }], { city: "Mumbai", state: "MH", pincode: "400050" }, "UPI", "DLV89124501"),
  order("SHC-3040", "Aanya Reddy", "aanya.r@example.com", "23 Apr 2026", "Pending", [{ productId: "p3", qty: 1 }], { city: "Bengaluru", state: "KA", pincode: "560001" }, "Card"),
  order("SHC-3039", "Meera Iyer", "meera.i@example.com", "22 Apr 2026", "Shipped", [{ productId: "p5", qty: 1 }, { productId: "p11", qty: 1 }], { city: "Chennai", state: "TN", pincode: "600042" }, "UPI", "BLR77129922"),
  order("SHC-3038", "Tanya Gupta", "tanya.g@example.com", "22 Apr 2026", "Delivered", [{ productId: "p2", qty: 1 }], { city: "Pune", state: "MH", pincode: "411001" }, "Card", "DLV88123410"),
  order("SHC-3037", "Priya Sharma", "priya.s@example.com", "21 Apr 2026", "Delivered", [{ productId: "p10", qty: 1 }, { productId: "p9", qty: 2 }], { city: "Delhi", state: "DL", pincode: "110001" }, "COD", "EKT55671220"),
  order("SHC-3036", "Sneha Patel", "sneha.p@example.com", "20 Apr 2026", "Cancelled", [{ productId: "p12", qty: 1 }], { city: "Ahmedabad", state: "GJ", pincode: "380001" }, "Net Banking"),
  order("SHC-3035", "Rhea Mathur", "rhea.m@example.com", "19 Apr 2026", "Delivered", [{ productId: "p6", qty: 1 }], { city: "Hyderabad", state: "TS", pincode: "500001" }, "UPI", "SHX44128771"),
  order("SHC-3034", "Kavya Nair", "kavya.n@example.com", "18 Apr 2026", "Refunded", [{ productId: "p2", qty: 1 }], { city: "Kochi", state: "KL", pincode: "682001" }, "Card"),
  order("SHC-3033", "Sarah Krishnan", "sarah.k@example.com", "16 Apr 2026", "Delivered", [{ productId: "p1", qty: 1 }], { city: "Mumbai", state: "MH", pincode: "400050" }, "UPI", "DLV82211390"),
];

export const ADMIN_CONSULTATIONS: AdminConsultation[] = [
  { id: "cn-2001", customer: "Sarah Krishnan", customerId: "c-1001", expert: "Dr. Aisha Menon", expertId: "exp-1", date: "25 Apr 2026", time: "07:30 PM", mode: "Audio", status: "Upcoming", concern: "Hair fall follow-up", fee: 599 },
  { id: "cn-2002", customer: "Tanya Gupta", customerId: "c-1007", expert: "Dr. Neil D'Souza", expertId: "exp-3", date: "25 Apr 2026", time: "10:00 AM", mode: "Chat", status: "Upcoming", concern: "Slow growth review", fee: 399 },
  { id: "cn-2003", customer: "Aanya Reddy", customerId: "c-1002", expert: "Dr. Rhea Kapoor", expertId: "exp-2", date: "24 Apr 2026", time: "06:15 PM", mode: "Audio", status: "Awaiting Notes", concern: "Frizz routine plan", fee: 599 },
  { id: "cn-2004", customer: "Meera Iyer", customerId: "c-1004", expert: "Dr. Aisha Menon", expertId: "exp-1", date: "23 Apr 2026", time: "01:30 PM", mode: "Audio", status: "Completed", concern: "Thinning consultation", fee: 599, notes: "Reviewed crown photos. Started Density Signal Serum nightly. Re-evaluate in 4 weeks." },
  { id: "cn-2005", customer: "Priya Sharma", customerId: "c-1003", expert: "Dr. Neil D'Souza", expertId: "exp-3", date: "22 Apr 2026", time: "08:30 AM", mode: "Audio", status: "Completed", concern: "Dryness onboarding", fee: 399, notes: "Switched to Velvet Repair Conditioner. Added pre-wash oil ritual once a week." },
  { id: "cn-2006", customer: "Sneha Patel", customerId: "c-1005", expert: "Dr. Rhea Kapoor", expertId: "exp-2", date: "20 Apr 2026", time: "04:15 PM", mode: "Chat", status: "Cancelled", concern: "Dandruff", fee: 399 },
];

export const ADMIN_AI: AIRecommendation[] = [
  { id: "ai-9001", customer: "Sarah Krishnan", customerId: "c-1001", date: "22 Apr 2026", hairScore: 72, topConcerns: [{ concern: "Hair fall", severity: "Moderate", score: 58 }, { concern: "Dryness", severity: "Mild", score: 32 }], recommendedProducts: ["p1", "p4", "p11"], expertReviewed: true, reviewer: "Dr. Aisha Menon" },
  { id: "ai-9002", customer: "Aanya Reddy", customerId: "c-1002", date: "21 Apr 2026", hairScore: 81, topConcerns: [{ concern: "Frizz", severity: "Moderate", score: 49 }], recommendedProducts: ["p10", "p2"], expertReviewed: true, reviewer: "Dr. Rhea Kapoor" },
  { id: "ai-9003", customer: "Meera Iyer", customerId: "c-1004", date: "21 Apr 2026", hairScore: 58, topConcerns: [{ concern: "Thinning", severity: "Significant", score: 74 }, { concern: "Hair fall", severity: "Moderate", score: 51 }], recommendedProducts: ["p5", "p11", "p1"], expertReviewed: false },
  { id: "ai-9004", customer: "Tanya Gupta", customerId: "c-1007", date: "20 Apr 2026", hairScore: 63, topConcerns: [{ concern: "Slow growth", severity: "Moderate", score: 55 }], recommendedProducts: ["p5", "p11"], expertReviewed: false },
  { id: "ai-9005", customer: "Kavya Nair", customerId: "c-1008", date: "19 Apr 2026", hairScore: 84, topConcerns: [{ concern: "Scalp sensitivity", severity: "Mild", score: 28 }], recommendedProducts: ["p8", "p12"], expertReviewed: true, reviewer: "Dr. Neil D'Souza" },
  { id: "ai-9006", customer: "Rhea Mathur", customerId: "c-1006", date: "18 Apr 2026", hairScore: 76, topConcerns: [{ concern: "Greying", severity: "Moderate", score: 47 }], recommendedProducts: ["p1", "p7"], expertReviewed: false },
];

export const ADMIN_SUBSCRIPTIONS: AdminSubscription[] = [
  { id: "sub-501", customer: "Sarah Krishnan", customerId: "c-1001", plan: "Smart Refill", status: "Active", startDate: "12 Mar 2026", nextBilling: "12 May 2026", cyclesCompleted: 2, pricePerCycle: 1899, adherence: 84 },
  { id: "sub-502", customer: "Aanya Reddy", customerId: "c-1002", plan: "Complete Recovery", status: "Active", startDate: "08 Feb 2026", nextBilling: "30 Apr 2026", cyclesCompleted: 3, pricePerCycle: 2499, adherence: 91 },
  { id: "sub-503", customer: "Meera Iyer", customerId: "c-1004", plan: "Smart Refill", status: "Active", startDate: "20 Feb 2026", nextBilling: "05 May 2026", cyclesCompleted: 3, pricePerCycle: 1899, adherence: 78 },
  { id: "sub-504", customer: "Tanya Gupta", customerId: "c-1007", plan: "Complete Recovery", status: "Paused", startDate: "22 Mar 2026", nextBilling: "—", cyclesCompleted: 1, pricePerCycle: 2499, adherence: 60 },
  { id: "sub-505", customer: "Rhea Mathur", customerId: "c-1006", plan: "Smart Refill", status: "Active", startDate: "11 Mar 2026", nextBilling: "11 May 2026", cyclesCompleted: 2, pricePerCycle: 1899, adherence: 88 },
];

export const ADMIN_SHIPMENTS: AdminShipment[] = [
  { id: "shp-1", orderId: "SHC-3041", customer: "Sarah Krishnan", carrier: "Delhivery", trackingNumber: "DLV89124501", status: "Label created", estimatedDelivery: "27 Apr 2026", destination: "Mumbai, MH" },
  { id: "shp-2", orderId: "SHC-3039", customer: "Meera Iyer", carrier: "BlueDart", trackingNumber: "BLR77129922", status: "In transit", estimatedDelivery: "26 Apr 2026", destination: "Chennai, TN" },
  { id: "shp-3", orderId: "SHC-3038", customer: "Tanya Gupta", carrier: "Delhivery", trackingNumber: "DLV88123410", status: "Delivered", estimatedDelivery: "22 Apr 2026", destination: "Pune, MH" },
  { id: "shp-4", orderId: "SHC-3037", customer: "Priya Sharma", carrier: "Ekart", trackingNumber: "EKT55671220", status: "Delivered", estimatedDelivery: "21 Apr 2026", destination: "Delhi, DL" },
  { id: "shp-5", orderId: "SHC-3035", customer: "Rhea Mathur", carrier: "Shadowfax", trackingNumber: "SHX44128771", status: "Out for delivery", estimatedDelivery: "Today", destination: "Hyderabad, TS" },
];

export const ADMIN_REVENUE_SERIES = [
  { day: "Mon", value: 24500 },
  { day: "Tue", value: 31200 },
  { day: "Wed", value: 28800 },
  { day: "Thu", value: 35400 },
  { day: "Fri", value: 42100 },
  { day: "Sat", value: 51300 },
  { day: "Sun", value: 47800 },
];

export const ADMIN_TOP_PRODUCTS = [
  { id: "p1", units: 312, revenue: 327_288 },
  { id: "p3", units: 184, revenue: 459_816 },
  { id: "p4", units: 240, revenue: 198_960 },
  { id: "p11", units: 168, revenue: 201_432 },
  { id: "p2", units: 132, revenue: 184_668 },
];

export const ADMIN_BLOG_POSTS = [
  { id: "b-1", title: "Natural vs Chemical Hair Care", author: "Dr. Aisha Menon", status: "Published" as const, date: "12 Apr 2026", views: 4_320 },
  { id: "b-2", title: "The Ultimate Monsoon Hair Care Routine", author: "Dr. Rhea Kapoor", status: "Published" as const, date: "28 Mar 2026", views: 3_810 },
  { id: "b-3", title: "5 Ayurvedic Rituals for Healthier Hair", author: "Founders' Desk", status: "Draft" as const, date: "—", views: 0 },
  { id: "b-4", title: "Why Sulfate-Free Shampoo Matters", author: "Dr. Neil D'Souza", status: "Published" as const, date: "28 Feb 2026", views: 2_540 },
];

export function formatINR(value: number) {
  return `₹ ${value.toLocaleString("en-IN")}`;
}

export function statusTone(s: string): string {
  const map: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-800 border-amber-200",
    Processing: "bg-blue-100 text-blue-800 border-blue-200",
    Shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Cancelled: "bg-rose-100 text-rose-800 border-rose-200",
    Refunded: "bg-zinc-200 text-zinc-700 border-zinc-300",
    Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Paused: "bg-amber-100 text-amber-800 border-amber-200",
    Upcoming: "bg-blue-100 text-blue-800 border-blue-200",
    "In Progress": "bg-violet-100 text-violet-800 border-violet-200",
    Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Awaiting Notes": "bg-amber-100 text-amber-800 border-amber-200",
    "On leave": "bg-amber-100 text-amber-800 border-amber-200",
    Inactive: "bg-zinc-200 text-zinc-700 border-zinc-300",
    Published: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Draft: "bg-zinc-200 text-zinc-700 border-zinc-300",
    Mild: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Moderate: "bg-amber-100 text-amber-800 border-amber-200",
    Significant: "bg-rose-100 text-rose-800 border-rose-200",
    "Label created": "bg-zinc-200 text-zinc-700 border-zinc-300",
    "Picked up": "bg-blue-100 text-blue-800 border-blue-200",
    "In transit": "bg-indigo-100 text-indigo-800 border-indigo-200",
    "Out for delivery": "bg-violet-100 text-violet-800 border-violet-200",
    Returned: "bg-rose-100 text-rose-800 border-rose-200",
  };
  return map[s] ?? "bg-zinc-100 text-zinc-700 border-zinc-200";
}
