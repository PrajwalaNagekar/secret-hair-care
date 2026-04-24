import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowLeft,
  BatteryFull,
  Bell,
  Bot,
  Calendar,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Heart,
  HelpCircle,
  Home,
  ImagePlus,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Package,
  Phone,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Signal,
  Sparkles,
  SprayCan,
  Star,
  Stethoscope,
  TrendingUp,
  Upload,
  User,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  activeSubscription,
  appointmentDays,
  appointmentSlots,
  buildAdaptiveFlow,
  consultationHistory,
  defaultAssessmentAnswers,
  expertReplyMap,
  experts,
  generateExpertFeedback,
  generateRecommendation,
  hairTypes,
  homeQuickActions,
  initialExpertChat,
  mockOrders,
  notificationItems,
  products,
  subscriptionPlans,
  supportFaq,
  usageMilestones,
  userQuickReplies,
  wishlistItems,
  type AssessmentAnswers,
  type ChatMessage,
  type DynamicQuestion,
} from "@/lib/secret-hair-care-data";

type BottomTab = "Home" | "Assessment" | "Shop" | "Tracking" | "Profile";
type AssessmentView =
  | "intro"
  | "questions"
  | "summary"
  | "expertUpload"
  | "expertSchedule"
  | "expertBooked"
  | "expertSummary"
  | "expertChat"
  | "paymentCart"
  | "paymentCheckout"
  | "paymentSuccess";
type ShopView = "browse" | "detail" | "cart" | "checkout" | "success" | "orders";
type AuthView = "welcome" | "signIn" | "signUp" | "verifyOtp";
type AuthMode = "signIn" | "signUp";
type ProfilePage =
  | null
  | "details"
  | "hair"
  | "consults"
  | "orders"
  | "wishlist"
  | "subscription"
  | "address"
  | "notifications"
  | "support";

type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  ageRange: string;
  city: string;
  hairProfileLabel: string;
};

type Address = {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  addressType: string;
};

const defaultUserProfile: UserProfile = {
  fullName: "Sarah Mehra",
  email: "sarah@secrethaircare.app",
  phone: "+91 98765 43210",
  ageRange: "26-34",
  city: "Mumbai",
  hairProfileLabel: "Wavy hair · Less shedding goal",
};

const defaultAddress: Address = {
  fullName: "Sarah Mehra",
  phone: "+91 98765 43210",
  line1: "18B, Palm Residency",
  line2: "Bandra West",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400050",
  addressType: "Home",
};

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  addressType: "Home",
};

const navTabs: { label: BottomTab; icon: typeof Home }[] = [
  { label: "Home", icon: Home },
  { label: "Assessment", icon: Bot },
  { label: "Shop", icon: ShoppingBag },
  { label: "Tracking", icon: Activity },
  { label: "Profile", icon: User },
];

export function SecretHairCareApp() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<BottomTab>("Home");
  const [authView, setAuthView] = useState<AuthView>("welcome");
  const [authMode, setAuthMode] = useState<AuthMode>("signUp");
  const [otpCode, setOtpCode] = useState("");
  const [pendingPhone, setPendingPhone] = useState(defaultUserProfile.phone);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [signupDetails, setSignupDetails] = useState(defaultUserProfile);
  const [savedAddress, setSavedAddress] = useState<Address>(defaultAddress);
  const [checkoutAddress, setCheckoutAddress] = useState<Address>(defaultAddress);
  const [assessmentView, setAssessmentView] = useState<AssessmentView>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(defaultAssessmentAnswers);
  const [selectedDay, setSelectedDay] = useState<(typeof appointmentDays)[number]["id"]>(appointmentDays[3].id);
  const [selectedSlot, setSelectedSlot] = useState<(typeof appointmentSlots)[number]>(appointmentSlots[4]);
  const [selectedExpert, setSelectedExpert] = useState(experts[0].id);
  const [assessmentCart, setAssessmentCart] = useState<string[]>([]);
  const [assessmentCoupon, setAssessmentCoupon] = useState("AIHAIR10");
  const [shopView, setShopView] = useState<ShopView>("browse");
  const [shopConcernFilter, setShopConcernFilter] = useState("All");
  const [shopTypeFilter, setShopTypeFilter] = useState("All");
  const [shopCategoryFilter, setShopCategoryFilter] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [wishlist, setWishlist] = useState<string[]>([products[1].id]);
  const [shopCart, setShopCart] = useState<string[]>([]);
  const [purchased, setPurchased] = useState(false);
  const [trackingUploadOpen, setTrackingUploadOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackTags, setFeedbackTags] = useState<string[]>([]);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [profilePage, setProfilePage] = useState<ProfilePage>(null);
  const [notificationsReturnTab, setNotificationsReturnTab] = useState<BottomTab | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialExpertChat);
  const [chatTyping, setChatTyping] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [homeSearch, setHomeSearch] = useState("");
  const [shopSearch, setShopSearch] = useState("");
  const [activePlanId, setActivePlanId] = useState<string>(activeSubscription.planId);
  const [todaysFocusDone, setTodaysFocusDone] = useState<string[]>([]);
  // Razorpay-style payment sheet state
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("sarah@upi");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [netbankingBank, setNetbankingBank] = useState("HDFC Bank");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever the visible view changes
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, authView, assessmentView, shopView, profilePage, questionIndex]);

  useEffect(() => {
    const t = setTimeout(() => setSplashVisible(false), 1700);
    return () => clearTimeout(t);
  }, []);

  // Adaptive flow rebuilds whenever concern selection changes
  const dynamicFlow = useMemo<DynamicQuestion[]>(
    () => buildAdaptiveFlow(answers.concerns),
    [answers.concerns],
  );
  const totalSteps = dynamicFlow.length + 1; // +1 for the profile/goal step
  const isProfileStep = questionIndex >= dynamicFlow.length;
  const currentQuestion: DynamicQuestion | null = isProfileStep
    ? null
    : dynamicFlow[questionIndex] ?? null;

  const recommendation = useMemo(() => generateRecommendation(answers), [answers]);
  const expertFeedback = useMemo(() => generateExpertFeedback(answers), [answers]);

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? products[0];
  const filteredProducts = products.filter((product) => {
    const concernMatch = shopConcernFilter === "All" || product.concerns.includes(shopConcernFilter);
    const typeMatch = shopTypeFilter === "All" || product.hairTypes.includes(shopTypeFilter);
    const categoryMatch = shopCategoryFilter === "All" || product.category === shopCategoryFilter;
    const searchMatch =
      shopSearch.trim().length === 0 ||
      `${product.name} ${product.category} ${product.purpose}`
        .toLowerCase()
        .includes(shopSearch.toLowerCase());
    return concernMatch && typeMatch && categoryMatch && searchMatch;
  });

  // Today's focus products = the recommended kit (first 3)
  const todaysFocusProducts = recommendation.kitProducts.length
    ? recommendation.kitProducts.slice(0, 3)
    : products.slice(0, 3);

  const assessmentCartProducts = products.filter((product) => assessmentCart.includes(product.id));
  // shopCart stores repeated ids — group into product+qty pairs preserving insertion order
  const shopCartGrouped = (() => {
    const order: string[] = [];
    const counts = new Map<string, number>();
    for (const id of shopCart) {
      if (!counts.has(id)) order.push(id);
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return order
      .map((id) => {
        const product = products.find((p) => p.id === id);
        return product ? { product, qty: counts.get(id) ?? 1 } : null;
      })
      .filter((entry): entry is { product: (typeof products)[number]; qty: number } => entry !== null);
  })();
  const shopCartCount = shopCart.length;
  const shopCartProducts = shopCartGrouped.map((g) => g.product);
  const activePlanDetails =
    subscriptionPlans.find((plan) => plan.id === activePlanId) ?? subscriptionPlans[0];

  const toggleConcern = (option: string) => {
    setAnswers((prev) => {
      const has = prev.concerns.includes(option);
      const next = has ? prev.concerns.filter((c) => c !== option) : [...prev.concerns, option];
      return { ...prev, concerns: next };
    });
  };

  const setDynamicSingle = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, dynamic: { ...prev.dynamic, [qid]: value } }));
  };

  const toggleDynamicMulti = (qid: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev.dynamic[qid] as string[] | undefined) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, dynamic: { ...prev.dynamic, [qid]: next } };
    });
  };

  const isDynamicSelected = (q: DynamicQuestion, option: string) => {
    const val = answers.dynamic[q.id];
    if (q.type === "multi") return Array.isArray(val) && val.includes(option);
    return val === option;
  };

  const moveToProtectedTab = (tab: BottomTab) => {
    if (!isAuthenticated) {
      setAuthMode(tab === "Shop" ? "signIn" : "signUp");
      setAuthView(tab === "Shop" ? "signIn" : "signUp");
      return;
    }
    setActiveTab(tab);
    if (tab === "Assessment" && assessmentView === "intro") {
      setAssessmentView("intro");
    }
    if (tab === "Shop") {
      setShopView("browse");
    }
  };

  const startAssessment = () => {
    setActiveTab("Assessment");
    setAssessmentView("questions");
    setQuestionIndex(0);
    setAnswers({ ...defaultAssessmentAnswers });
  };

  const beginSignupFlow = () => {
    setAuthMode("signUp");
    setPendingPhone(signupDetails.phone);
    setAuthView("verifyOtp");
    setOtpCode("");
  };

  const beginSigninFlow = () => {
    setAuthMode("signIn");
    setPendingPhone(userProfile.phone || pendingPhone);
    setAuthView("verifyOtp");
    setOtpCode("");
  };

  const completeAuth = () => {
    if (otpCode.length !== 6) return;
    const profile = authMode === "signUp" ? signupDetails : userProfile;
    setIsAuthenticated(true);
    setUserProfile(profile);
    setPendingPhone(profile.phone);
    setSavedAddress((prev) => ({ ...prev, fullName: profile.fullName, phone: profile.phone }));
    setCheckoutAddress((prev) => ({ ...prev, fullName: profile.fullName, phone: profile.phone }));
    if (authMode === "signUp") {
      setAnswers({
        ...defaultAssessmentAnswers,
        gender: signupDetails.hairProfileLabel.includes("Men")
          ? "Men"
          : signupDetails.hairProfileLabel.includes("Prefer")
            ? "Prefer not to say"
            : "Women",
      });
      setActiveTab("Assessment");
      setAssessmentView("questions");
      setQuestionIndex(0);
    } else {
      setActiveTab("Home");
      setAssessmentView("intro");
    }
    setAuthView("welcome");
    setOtpCode("");
  };

  const continueQuestionnaire = () => {
    // Block leaving the intro step until at least one concern is picked
    if (currentQuestion?.id === "concerns" && answers.concerns.length === 0) {
      return;
    }
    if (questionIndex < totalSteps - 1) {
      setQuestionIndex((prev) => prev + 1);
      return;
    }
    const generated = generateRecommendation(answers);
    setAssessmentCart(generated.kitProducts.map((item) => item.id));
    setAssessmentView("summary");
  };


  const goToAssessmentPayment = () => {
    if (!assessmentCart.length) {
      setAssessmentCart(recommendation.kitProducts.map((item) => item.id));
    }
    setCheckoutAddress((prev) => ({
      ...prev,
      fullName: userProfile.fullName,
      phone: userProfile.phone,
    }));
    setAssessmentView("paymentCart");
  };

  const validatePaymentSelection = (): string => {
    if (paymentMethod === "upi") {
      if (!/^[\w.-]+@[\w]+$/.test(upiId.trim())) return "Enter a valid UPI ID (e.g. name@bank)";
    } else if (paymentMethod === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      if (digits.length < 12 || digits.length > 19) return "Card number must be 12–19 digits";
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) return "Expiry must be MM/YY";
      if (!/^\d{3,4}$/.test(cardCvv)) return "CVV must be 3–4 digits";
      if (cardName.trim().length < 2) return "Enter the cardholder name";
    } else if (paymentMethod === "netbanking") {
      if (!netbankingBank) return "Select a bank to continue";
    }
    return "";
  };

  const runRazorpayPayment = (onSuccess: () => void) => {
    const err = validatePaymentSelection();
    if (err) {
      setPaymentError(err);
      return;
    }
    setPaymentError("");
    setPaymentProcessing(true);
    // Simulate Razorpay processing flow
    setTimeout(() => {
      setPaymentProcessing(false);
      onSuccess();
    }, 1400);
  };

  const completeAssessmentPayment = () => {
    runRazorpayPayment(() => {
      setPurchased(true);
      setSavedAddress(checkoutAddress);
      setAssessmentView("paymentSuccess");
    });
  };

  const completeShopPayment = () => {
    runRazorpayPayment(() => {
      setPurchased(true);
      setSavedAddress(checkoutAddress);
      setShopView("success");
    });
  };

  const indianBanks = [
    "HDFC Bank",
    "ICICI Bank",
    "State Bank of India",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Yes Bank",
    "Punjab National Bank",
    "IndusInd Bank",
  ];

  const renderRazorpaySheet = (amount: number) => (
    <div className="surface-card mt-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold">Razorpay Secure</p>
            <p className="text-[10px] text-muted-foreground">PCI DSS · 3D-Secure</p>
          </div>
        </div>
        <p className="text-sm font-bold">₹{amount}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {([
          { id: "upi", label: "UPI" },
          { id: "card", label: "Card" },
          { id: "netbanking", label: "Net Bank" },
        ] as const).map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setPaymentMethod(m.id);
              setPaymentError("");
            }}
            className={`rounded-2xl py-2.5 text-xs font-semibold ${
              paymentMethod === m.id ? "bg-foreground text-background" : "bg-muted text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {paymentMethod === "upi" && (
        <div className="space-y-2">
          <Label>UPI ID</Label>
          <div className="field-shell">
            <Input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@bank"
              className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {["@okhdfcbank", "@ybl", "@paytm", "@axl"].map((suffix) => (
              <button
                key={suffix}
                onClick={() => setUpiId(`${userProfile.fullName.split(" ")[0].toLowerCase()}${suffix}`)}
                className="chip"
              >
                {suffix}
              </button>
            ))}
          </div>
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="space-y-2">
          <Label>Card number</Label>
          <div className="field-shell">
            <Input
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 19);
                setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
              }}
              placeholder="1234 5678 9012 3456"
              className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Expiry</Label>
              <div className="field-shell">
                <Input
                  inputMode="numeric"
                  value={cardExpiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                    if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                    setCardExpiry(v);
                  }}
                  placeholder="MM/YY"
                  className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div>
              <Label>CVV</Label>
              <div className="field-shell">
                <Input
                  inputMode="numeric"
                  type="password"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="•••"
                  className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
          <Label>Name on card</Label>
          <div className="field-shell">
            <Input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Cardholder name"
              className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      )}

      {paymentMethod === "netbanking" && (
        <div className="space-y-2">
          <Label>Select your bank</Label>
          <div className="grid grid-cols-2 gap-2">
            {indianBanks.map((bank) => (
              <button
                key={bank}
                onClick={() => setNetbankingBank(bank)}
                className={`rounded-2xl px-3 py-2 text-left text-xs font-semibold ${
                  netbankingBank === bank
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
                }`}
              >
                {bank}
              </button>
            ))}
          </div>
        </div>
      )}

      {paymentError && (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
          {paymentError}
        </p>
      )}

      {paymentProcessing && (
        <div className="rounded-xl bg-muted p-3 text-center text-xs text-muted-foreground">
          Connecting to Razorpay…
        </div>
      )}
    </div>
  );

  const renderTopBar = (title: string, subtitle?: string, backAction?: () => void) => (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {backAction ? (
        <button className="secondary-cta h-10 w-10 rounded-full p-0" onClick={backAction}>
          <ArrowLeft className="h-4 w-4" />
        </button>
      ) : (
        <button className="secondary-cta h-10 w-10 rounded-full p-0">
          <Bell className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  const renderAuth = () => {
    if (authView === "welcome") {
      return (
        <div className="empty-center">
          <div className="auth-mini-hero w-full animate-in fade-in-0 duration-500">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[11px] font-medium text-foreground">
              <Sparkles className="h-3 w-3" /> Secret Hair Care
            </div>
            <h1 className="text-[32px] font-semibold leading-tight text-foreground">
              Personalized hair care, in your pocket.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Sign in with your phone — quick OTP, no passwords.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                className="primary-cta"
                onClick={() => {
                  setAuthMode("signUp");
                  setAuthView("signUp");
                }}
              >
                Create account
              </button>
              <button
                className="secondary-cta"
                onClick={() => {
                  setAuthMode("signIn");
                  setAuthView("signIn");
                }}
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] text-muted-foreground">
            By continuing you agree to our Terms & Privacy.
          </p>
        </div>
      );
    }

    if (authView === "signIn") {
      return (
        <>
          {renderTopBar("Sign in", "Continue your hair journey", () => setAuthView("welcome"))}
          <div className="flex min-h-[calc(100dvh-200px)] flex-col justify-center">
            <Card className="rounded-[28px] border-border bg-card shadow-sm">
              <CardContent className="space-y-5 p-6">
                <div>
                  <Label className="mb-2 block">Phone number</Label>
                  <div className="field-shell">
                    <Input
                      value={pendingPhone}
                      onChange={(event) => setPendingPhone(event.target.value)}
                      placeholder="+91 98765 43210"
                      className="h-12 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div className="surface-soft flex items-start gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  Enter your phone number to receive a one-time code.
                </div>
                <Button className="primary-cta w-full" onClick={beginSigninFlow}>
                  Send OTP
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      );
    }

    if (authView === "signUp") {
      return (
        <>
          {renderTopBar("Create account", "Set up your personalized profile", () => setAuthView("welcome"))}
          <Card className="rounded-[28px] border-border bg-card shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div>
                <Label className="mb-2 block">Full name</Label>
                <div className="field-shell">
                  <Input
                    value={signupDetails.fullName}
                    onChange={(event) => setSignupDetails((prev) => ({ ...prev, fullName: event.target.value }))}
                    placeholder="Your full name"
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Email address</Label>
                <div className="field-shell">
                  <Input
                    value={signupDetails.email}
                    onChange={(event) => setSignupDetails((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="you@example.com"
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Phone number</Label>
                <div className="field-shell">
                  <Input
                    value={signupDetails.phone}
                    onChange={(event) => setSignupDetails((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder="+91 98765 43210"
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-2 block">Age range</Label>
                  <div className="flex flex-wrap gap-2">
                    {["18-25", "26-34", "35-44", "45+"].map((option) => (
                      <button
                        key={option}
                        className={`chip ${signupDetails.ageRange === option ? "chip-active" : ""}`}
                        onClick={() => setSignupDetails((prev) => ({ ...prev, ageRange: option }))}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">City</Label>
                  <div className="field-shell">
                    <Input
                      value={signupDetails.city}
                      onChange={(event) => setSignupDetails((prev) => ({ ...prev, city: event.target.value }))}
                      placeholder="Mumbai"
                      className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Hair profile</Label>
                <div className="flex flex-wrap gap-2">
                  {["Women · early recovery", "Men · density support", "Prefer not to say · balanced routine"].map((option) => (
                    <button
                      key={option}
                      className={`chip ${signupDetails.hairProfileLabel === option ? "chip-active" : ""}`}
                      onClick={() => setSignupDetails((prev) => ({ ...prev, hairProfileLabel: option }))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="surface-soft text-xs text-muted-foreground">
                After OTP verification, new users go directly into the AI questionnaire and can continue into AI suggestions or expert review.
              </div>
              <Button className="primary-cta w-full" onClick={beginSignupFlow}>
                Continue with OTP
              </Button>
            </CardContent>
          </Card>
        </>
      );
    }

    return (
      <>
        {renderTopBar("Verify OTP", authMode === "signUp" ? "Secure your new account" : "Verify and continue", () => setAuthView(authMode))}
        <div className="flex min-h-[calc(100dvh-200px)] flex-col justify-center">
          <Card className="rounded-[28px] border-border bg-card shadow-sm">
            <CardContent className="space-y-6 p-6">
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Code sent to {pendingPhone}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Use the demo OTP <span className="font-semibold text-foreground">482731</span> to continue the prototype.
                </p>
              </div>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {authMode === "signUp" && (
                <div className="surface-soft flex items-start gap-3 text-xs text-muted-foreground">
                  <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  Once verified, we create your profile and launch the questionnaire.
                </div>
              )}
              <Button
                className="primary-cta w-full"
                onClick={completeAuth}
                disabled={otpCode.length !== 6}
              >
                Verify & continue
              </Button>
              {otpCode.length !== 6 && (
                <p className="text-center text-[11px] text-muted-foreground">
                  Enter the 6-digit code to continue.
                </p>
              )}
              <button className="secondary-cta w-full" onClick={() => setOtpCode("482731")}>
                Auto-fill demo OTP
              </button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderHome = () => {
    const sub = activeSubscription;
    const overallProgress = Math.round(
      (sub.productsUsed.reduce((s, p) => s + p.used / p.total, 0) / sub.productsUsed.length) * 100,
    );
    return (
      <>
        <div className="mb-4 flex items-start justify-between">
          <button
            onClick={() => moveToProtectedTab("Profile")}
            className="flex h-12 w-12 items-center justify-center rounded-full text-foreground"
            style={{ background: "color-mix(in oklab, var(--accent-gold) 70%, white)" }}
            aria-label="Open profile"
          >
            <User className="h-5 w-5" />
          </button>
          <div className="flex-1 px-3">
            <p className="text-sm font-medium text-foreground">Hi, {userProfile.fullName.split(" ")[0]}</p>
            <p className="text-xs text-muted-foreground">{sub.planName} member</p>
          </div>
          <button
            onClick={() => {
              setNotificationsReturnTab(activeTab);
              setActiveTab("Profile");
              setProfilePage("notifications");
            }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            {notificationItems.filter((n) => n.unread).length > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-card" />
            )}
          </button>
        </div>

        <h1 className="display-heading mb-4">Your Hair, Reset.</h1>

        <form
          className="surface-card mb-3 flex items-center gap-2 rounded-full px-4 py-2.5 shadow-none"
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = homeSearch.trim();
            setShopSearch(trimmed);
            moveToProtectedTab("Shop");
          }}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={homeSearch}
            onChange={(event) => setHomeSearch(event.target.value)}
            placeholder="Search routines, products"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button
            type="submit"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
        </form>

        {homeSearch.trim().length > 0 && (
          <div className="mb-3 surface-card">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Quick matches
            </p>
            <div className="space-y-2">
              {products
                .filter((p) =>
                  `${p.name} ${p.category} ${p.purpose}`.toLowerCase().includes(homeSearch.toLowerCase()),
                )
                .slice(0, 3)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProductId(p.id);
                      moveToProtectedTab("Shop");
                      setShopView("detail");
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl bg-muted p-2 text-left"
                  >
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.category} · ₹{p.price}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
            </div>
          </div>
        )}

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {homeQuickActions.map((q) => (
            <button
              key={q.id}
              onClick={() => {
                if (q.label === "AI Assessment") startAssessment();
                else if (q.label === "Expert Chat") {
                  setActiveTab("Assessment");
                  setAssessmentView("expertChat");
                } else moveToProtectedTab("Tracking");
              }}
              className={`chip-pill chip-pill-${q.tone} whitespace-nowrap`}
            >
              {q.label}
              <span className="chip-count">{q.count}</span>
            </button>
          ))}
        </div>

        {/* Today's focus — expanded inline with product images */}
        <div className="hero-card mb-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Today's focus</p>
            <span className="chip-count bg-foreground text-background">
              {todaysFocusDone.length}/{todaysFocusProducts.length} done
            </span>
          </div>
          <h2 className="mt-1 display-heading text-[26px]">
            {recommendation.routine[0]?.title ?? "Apply night serum"}
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            {recommendation.routine[0]?.subtitle ?? "Massage 60 sec, then sleep"}
          </p>

          <div className="mt-4 space-y-2">
            {todaysFocusProducts.map((p, i) => {
              const time = ["Morning", "Midday", "Night"][i] ?? "Anytime";
              const done = todaysFocusDone.includes(p.id);
              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 rounded-2xl bg-card/70 p-2 transition-opacity ${
                    done ? "opacity-60" : ""
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold leading-tight truncate ${
                        done ? "line-through" : ""
                      }`}
                    >
                      {p.name}
                    </p>
                    <p className="text-[11px] text-foreground/60">{p.category} · {time}</p>
                  </div>
                  <button
                    onClick={() => {
                      setTodaysFocusDone((prev) =>
                        prev.includes(p.id)
                          ? prev.filter((id) => id !== p.id)
                          : [...prev, p.id],
                      );
                    }}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                      done
                        ? "bg-foreground text-background"
                        : "bg-card text-foreground border border-border"
                    }`}
                    aria-pressed={done}
                  >
                    {done ? "✓ Done" : "Mark done"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Daily progress bar reflecting marked-done steps */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-foreground/70">
              <span>Today's progress</span>
              <span>
                {Math.round(
                  (todaysFocusDone.length / Math.max(todaysFocusProducts.length, 1)) * 100,
                )}
                %
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-card/60">
              <div
                className="h-full rounded-full bg-foreground transition-all"
                style={{
                  width: `${
                    (todaysFocusDone.length / Math.max(todaysFocusProducts.length, 1)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Subscription tracker */}
        <button
          onClick={() => {
            setActiveTab("Profile");
            setProfilePage("subscription");
          }}
          className="surface-card mb-3 w-full text-left"
          style={{ background: "color-mix(in oklab, var(--accent-mint) 40%, white)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">My Plan</p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{sub.planName}</h3>
              <p className="mt-0.5 text-xs text-foreground/70">Renews {sub.nextBillingDate} · in {sub.daysToNextBilling} days</p>
            </div>
            <span className="chip-count bg-foreground text-background">{sub.status}</span>
          </div>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-foreground/70">
              <span>Routine adherence</span>
              <span>{sub.routineAdherence}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-card/60">
              <div className="h-full rounded-full bg-foreground" style={{ width: `${sub.routineAdherence}%` }} />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-card/70 py-2">
              <p className="text-[10px] text-muted-foreground">Used</p>
              <p className="text-sm font-bold">{overallProgress}%</p>
            </div>
            <div className="rounded-xl bg-card/70 py-2">
              <p className="text-[10px] text-muted-foreground">Cycle</p>
              <p className="text-sm font-bold">{sub.cyclesCompleted}/{sub.totalCycles}</p>
            </div>
            <div className="rounded-xl bg-card/70 py-2">
              <p className="text-[10px] text-muted-foreground">Day</p>
              <p className="text-sm font-bold">34</p>
            </div>
          </div>
          <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
            View full plan <ChevronRight className="h-3 w-3" />
          </p>
        </button>

        {/* Recommended routine */}
        <div className="surface-card mb-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold">Recommended routine</h3>
            <button className="text-xs font-semibold text-foreground" onClick={() => setActiveTab("Tracking")}>
              View all
            </button>
          </div>
          <div className="space-y-2">
            {recommendation.routine.map((item, i) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-muted p-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground"
                  style={{ background: ["var(--accent-lilac)", "var(--accent-mint)", "var(--accent-cream)"][i % 3] }}
                >
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="surface-card tone-mint">
            <TrendingUp className="mb-2 h-5 w-5" />
            <p className="text-xs text-foreground/70">Hair score</p>
            <p className="text-2xl font-bold">{recommendation.score.hairHealthScore}</p>
            <p className="text-[10px] text-foreground/60">+8 since week 1</p>
          </div>
          <div className="surface-card tone-sand">
            <Activity className="mb-2 h-5 w-5" />
            <p className="text-xs text-foreground/70">Adherence</p>
            <p className="text-2xl font-bold">{sub.routineAdherence}%</p>
            <p className="text-[10px] text-foreground/60">Across {sub.cyclesCompleted} cycles</p>
          </div>
        </div>

        {/* Expert chat CTA */}
        <button
          onClick={() => {
            setActiveTab("Assessment");
            setAssessmentView("expertChat");
          }}
          className="surface-card mb-3 flex w-full items-center gap-3 text-left"
          style={{ background: "color-mix(in oklab, var(--accent-lilac) 55%, white)" }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Chat with your expert</p>
            <p className="text-xs text-foreground/70">Dr. Aisha · usually replies in 5 min</p>
          </div>
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </>
    );
  };

  const renderQuestionnaire = () => {
    if (assessmentView === "intro") {
      return (
        <>
          {renderTopBar("AI Hair Assessment", "Adaptive — branches by what you select")}
          <div className="empty-center">
            <div className="surface-card w-full">
              <div className="mb-4 inline-flex rounded-full bg-brand-soft p-3 text-brand">
                <Bot className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">A diagnosis-style consultation</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Pick your concerns and we'll ask only the questions that matter — under 3 minutes.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-[11px] text-muted-foreground">
                <div className="surface-soft py-3">Condition-based<br />questions</div>
                <div className="surface-soft py-3">Hair Health<br />Score</div>
                <div className="surface-soft py-3">Smart kit<br />mapping</div>
              </div>
              <button className="primary-cta mt-6 w-full" onClick={startAssessment}>
                Begin questionnaire
              </button>
            </div>
          </div>
        </>
      );
    }

    if (assessmentView === "questions") {
      const progress = ((questionIndex + 1) / totalSteps) * 100;
      const groupLabel = isProfileStep
        ? "Final touches"
        : currentQuestion?.group === "intro"
          ? "Getting started"
          : currentQuestion?.group === "lifestyle"
            ? "Lifestyle"
            : `About: ${currentQuestion?.group}`;

      return (
        <>
          {renderTopBar(
            "Assessment",
            `Step ${questionIndex + 1} of ${totalSteps}`,
            () => (questionIndex ? setQuestionIndex((prev) => prev - 1) : setAssessmentView("intro")),
          )}
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex min-h-[calc(100dvh-260px)] flex-col justify-center">
            <div className="surface-card w-full animate-in fade-in-0 duration-300">
              <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {groupLabel}
                {currentQuestion?.secondary && <span className="text-brand"> · quick check</span>}
              </div>

              {!isProfileStep && currentQuestion && (
                <>
                  <h2 className="text-xl font-semibold leading-snug">{currentQuestion.title}</h2>
                  {currentQuestion.helper && (
                    <p className="mb-5 mt-2 text-sm text-muted-foreground">{currentQuestion.helper}</p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {currentQuestion.options.map((option) => {
                      const selected =
                        currentQuestion.id === "concerns"
                          ? answers.concerns.includes(option)
                          : isDynamicSelected(currentQuestion, option);
                      return (
                        <button
                          key={option}
                          className={`chip ${selected ? "chip-active" : ""}`}
                          onClick={() => {
                            if (currentQuestion.id === "concerns") {
                              toggleConcern(option);
                              return;
                            }
                            if (currentQuestion.type === "multi") {
                              toggleDynamicMulti(currentQuestion.id, option);
                            } else {
                              setDynamicSingle(currentQuestion.id, option);
                            }
                          }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {currentQuestion.id === "concerns" && answers.concerns.length > 2 && (
                    <p className="mt-4 rounded-xl bg-muted p-3 text-[11px] text-muted-foreground">
                      Many concerns selected — we'll focus deeply on your top 2 ({answers.concerns.slice(0, 2).join(", ")}) and ask quick checks for the rest.
                    </p>
                  )}
                </>
              )}

              {isProfileStep && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">A few final details</h2>
                  <p className="text-sm text-muted-foreground">
                    Confirms personalization for your kit.
                  </p>
                  <div className="rounded-2xl bg-muted p-4 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">Profile captured at signup</p>
                    <p className="mt-1.5">
                      {userProfile.fullName} · {userProfile.email} · {userProfile.phone}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2.5 text-xs font-medium text-muted-foreground">Hair type</p>
                    <div className="flex flex-wrap gap-2">
                      {hairTypes.map((option) => (
                        <button
                          key={option}
                          className={`chip ${answers.hairType === option ? "chip-active" : ""}`}
                          onClick={() => setAnswers((prev) => ({ ...prev, hairType: option }))}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2.5 text-xs font-medium text-muted-foreground">Gender profile</p>
                    <div className="flex flex-wrap gap-2">
                      {["Women", "Men", "Prefer not to say"].map((option) => (
                        <button
                          key={option}
                          className={`chip ${answers.gender === option ? "chip-active" : ""}`}
                          onClick={() => setAnswers((prev) => ({ ...prev, gender: option }))}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2.5 text-xs font-medium text-muted-foreground">Primary goal</p>
                    <div className="flex flex-wrap gap-2">
                      {["Length retention", "Faster-looking growth", "Less shedding"].map((option) => (
                        <button
                          key={option}
                          className={`chip ${answers.goal === option ? "chip-active" : ""}`}
                          onClick={() => setAnswers((prev) => ({ ...prev, goal: option }))}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button
                className="primary-cta mt-6 w-full disabled:opacity-50"
                disabled={currentQuestion?.id === "concerns" && answers.concerns.length === 0}
                onClick={continueQuestionnaire}
              >
                {questionIndex < totalSteps - 1 ? "Continue" : "See my personalized plan"}
              </button>
            </div>
          </div>
        </>
      );
    }

    if (assessmentView === "summary") {
      const score = recommendation.score;
      const summary = recommendation.summary;
      return (
        <>
          {renderTopBar("Your Hair Summary", "AI-personalized diagnosis")}

          <div className="surface-card">
            <div className="flex items-center gap-4">
              <div
                className="score-ring"
                style={{ ["--score" as string]: score.hairHealthScore }}
              >
                <div className="score-ring-inner">
                  <span className="text-[11px] text-muted-foreground">Score</span>
                  <span className="text-2xl font-semibold">{score.hairHealthScore}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Hair Health Score</p>
                <h2 className="text-base font-semibold leading-tight">{summary.headline}</h2>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="surface-soft py-1.5 text-center">
                    <p className="text-muted-foreground">Scalp</p>
                    <p className="font-semibold">{score.scalpHealth}</p>
                  </div>
                  <div className="surface-soft py-1.5 text-center">
                    <p className="text-muted-foreground">Lifestyle load</p>
                    <p className="font-semibold">{score.lifestyleImpact}%</p>
                  </div>
                </div>
              </div>
            </div>

            {score.concernScores.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Concern severity breakdown</p>
                {score.concernScores
                  .slice()
                  .sort((a, b) => b.score - a.score)
                  .map((c) => (
                    <div key={c.concern} className="surface-soft">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-foreground">{c.concern}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            c.level === "Significant"
                              ? "severity-significant"
                              : c.level === "Moderate"
                                ? "severity-moderate"
                                : "severity-mild"
                          }`}
                        >
                          {c.level}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${c.score}%` }} />
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="mt-4 space-y-1.5">
              {summary.insights.map((line) => (
                <p key={line} className="text-xs leading-relaxed text-muted-foreground">
                  • {line}
                </p>
              ))}
            </div>

          </div>

          <div className="mt-3 surface-card">
            <h3 className="mb-2 text-sm font-semibold">Risk indicators & condition insights</h3>
            <div className="space-y-2">
              {recommendation.insights.map((insight) => (
                <div key={insight.title} className="surface-soft">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>{insight.title}</span>
                    <span className="text-muted-foreground">{insight.score}%</span>
                  </div>
                  <div className="mb-1 h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${insight.score}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 surface-card">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Customized kit</h3>
              <span className="text-xs text-muted-foreground">{recommendation.kitProducts.length} products</span>
            </div>
            <div className="space-y-2">
              {recommendation.kitProducts.map((product) => (
                <div key={product.id} className="surface-soft flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.purpose}</p>
                    <p className="text-xs text-muted-foreground">{product.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">₹{product.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Why this kit?</p>
              <p className="mt-1">{recommendation.reasoning}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="primary-cta" onClick={goToAssessmentPayment}>
                Proceed to Payment
              </button>
              <button className="secondary-cta" onClick={() => setAssessmentView("expertUpload")}>
                Go with Expert Opinion
              </button>
            </div>
          </div>
        </>
      );
    }

    if (assessmentView === "expertUpload") {
      return (
        <>
          {renderTopBar("Expert Opinion", "Upload current scalp and hair photos", () => setAssessmentView("summary"))}
          <div className="surface-card">
            <div className="grid grid-cols-2 gap-2">
              {[
                "Front hairline",
                "Crown view",
                "Scalp close-up",
                "Side texture",
              ].map((label) => (
                <div key={label} className="surface-soft col-span-1 h-24">
                  <div className="flex h-full flex-col items-center justify-center text-center text-xs text-muted-foreground">
                    <Camera className="mb-1 h-4 w-4" />
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Your expert will review these images with concern data before your call. No diagnosis claims are made in-app.
            </p>
            <button className="secondary-cta mt-3 w-full">
              <ImagePlus className="mr-2 h-4 w-4" /> Upload photos
            </button>
            <button className="primary-cta mt-3 w-full" onClick={() => setAssessmentView("expertSchedule")}>Continue to scheduling</button>
          </div>
        </>
      );
    }

    if (assessmentView === "expertSchedule") {
      return (
        <>
          {renderTopBar("Schedule Call", "Choose your slot and expert", () => setAssessmentView("expertUpload"))}
          <div className="surface-card">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> October 2026
            </div>
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {appointmentDays.map((day) => (
                <button
                  key={day.id}
                  className={`chip min-w-14 flex-col py-2 ${selectedDay === day.id ? "chip-active" : ""}`}
                  onClick={() => setSelectedDay(day.id)}
                >
                  <span>{day.label}</span>
                  <span className="text-[11px]">{day.date}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {appointmentSlots.map((slot) => (
                <button
                  key={slot}
                  className={`chip ${selectedSlot === slot ? "chip-active" : ""}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {experts.map((expert) => (
              <button
                key={expert.id}
                className={`surface-card w-full text-left ${selectedExpert === expert.id ? "ring-2 ring-ring" : ""}`}
                onClick={() => setSelectedExpert(expert.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{expert.name}</p>
                    <p className="text-xs text-muted-foreground">{expert.specialization}</p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p className="inline-flex items-center gap-1 text-foreground">
                      <Star className="h-3 w-3" /> {expert.rating}
                    </p>
                    <p>{expert.experience}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{expert.availability}</p>
              </button>
            ))}
          </div>

          <button className="primary-cta mt-3 w-full" onClick={() => setAssessmentView("expertBooked")}>Book expert call</button>
        </>
      );
    }

    if (assessmentView === "expertBooked") {
      const expert = experts.find((item) => item.id === selectedExpert) ?? experts[0];
      return (
        <>
          {renderTopBar("Booking Confirmed", "Consultation scheduled")}
          <div className="surface-card text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold">You're set for {selectedSlot}</h2>
            <p className="mt-1 text-sm text-muted-foreground">with {expert.name} · {expert.specialization}</p>
            <p className="mt-3 rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
              We’ve shared your concern profile and uploaded photos for pre-call review.
            </p>
            <button className="primary-cta mt-4 w-full" onClick={() => setAssessmentView("expertSummary")}>View post-call recommendation</button>
          </div>
        </>
      );
    }

    if (assessmentView === "expertSummary") {
      const expertKit = Array.from(new Set([...assessmentCart, "scalp-calm"]))
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is (typeof products)[number] => Boolean(product));

      return (
        <>
          {renderTopBar("Expert Recommendation", "Updated after consultation")}
          <div className="surface-card">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              <Stethoscope className="h-3 w-3" /> Review completed by expert
            </div>
            <h3 className="text-sm font-semibold">{expertFeedback.headline}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{expertFeedback.summary}</p>
            <div className="mt-3 space-y-2">
              {expertFeedback.notes.map((note) => (
                <div key={note} className="surface-soft text-xs text-muted-foreground">{note}</div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Predefined follow-up</p>
              <p className="mt-1">{expertFeedback.followUp}</p>
            </div>
            <div className="mt-3 space-y-2">
              {expertKit.map((product) => (
                <div key={product.id} className="surface-soft flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.purpose}</p>
                  </div>
                  <p className="text-sm font-semibold">₹{product.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                className="secondary-cta"
                onClick={() => setAssessmentView("expertChat")}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Chat
              </button>
              <button
                className="primary-cta"
                onClick={() => {
                  setAssessmentCart(expertKit.map((item) => item.id));
                  setAssessmentView("paymentCart");
                }}
              >
                Proceed to payment
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              You can share feedback after your order is placed.
            </p>
          </div>
        </>
      );
    }

    if (assessmentView === "expertChat") {
      const sendQuickReply = (reply: string) => {
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        const userMsg: ChatMessage = {
          id: `u-${Date.now()}`,
          from: "user",
          text: reply,
          time,
        };
        setChatMessages((prev) => [...prev, userMsg]);
        setChatTyping(true);
        setTimeout(() => {
          const expertReply = expertReplyMap[reply] ?? "Thanks for the message — I'll get back to you shortly.";
          const reply2 = new Date();
          const time2 = `${reply2.getHours().toString().padStart(2, "0")}:${reply2.getMinutes().toString().padStart(2, "0")}`;
          setChatMessages((prev) => [
            ...prev,
            { id: `e-${Date.now()}`, from: "expert", text: expertReply, time: time2 },
          ]);
          setChatTyping(false);
        }, 900);
      };

      const expert = experts.find((e) => e.id === selectedExpert) ?? experts[0];

      return (
        <>
          {renderTopBar("Expert Chat", `${expert.name} · ${expert.specialization}`, () =>
            setAssessmentView("expertSummary"),
          )}
          <div className="surface-card mb-3 flex items-center gap-3" style={{ background: "color-mix(in oklab, var(--accent-lilac) 50%, white)" }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{expert.name}</p>
              <p className="text-xs text-foreground/70">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Online · {expert.experience}
              </p>
            </div>
            <a
              href={`tel:${expert.name.replace(/[^a-z0-9]/gi, "")}`}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "tel:+919876543210";
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card"
              aria-label={`Call ${expert.name}`}
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

          <div className="surface-card mb-3 space-y-2">
            {chatMessages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
                    m.from === "user"
                      ? "bg-foreground text-background rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[9px] ${m.from === "user" ? "text-background/60" : "text-muted-foreground"}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
            {chatTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted px-3 py-2 text-xs text-muted-foreground">typing…</div>
              </div>
            )}
          </div>

          <div className="surface-card">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Quick replies
            </p>
            <div className="flex flex-wrap gap-2">
              {userQuickReplies.map((q) => (
                <button key={q} className="chip" onClick={() => sendQuickReply(q)}>
                  {q}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
              <input
                placeholder="Pick a quick reply above"
                disabled
                className="flex-1 bg-transparent text-xs outline-none"
              />
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </>
      );
    }

    if (assessmentView === "paymentCart") {
      const subtotal = assessmentCartProducts.reduce((sum, item) => sum + item.price, 0);
      const discount = Math.round(subtotal * 0.1);
      const shipping = 99;
      const total = subtotal - discount + shipping;
      return (
        <>
          {renderTopBar("Cart & Payment", "Razorpay-style mock checkout", () => setAssessmentView("summary"))}
          <div className="surface-card">
            <div className="space-y-2">
              {assessmentCartProducts.map((item) => (
                <div key={item.id} className="surface-soft flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 surface-soft">
              <label className="text-xs text-muted-foreground">Coupon</label>
              <input
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                value={assessmentCoupon}
                onChange={(event) => setAssessmentCoupon(event.target.value)}
              />
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Coupon ({assessmentCoupon})</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button className="primary-cta mt-4 w-full" onClick={() => setAssessmentView("paymentCheckout")}>Continue to checkout</button>
          </div>
        </>
      );
    }

    if (assessmentView === "paymentCheckout") {
      const subtotalA = assessmentCartProducts.reduce((sum, item) => sum + item.price, 0);
      const discountA = Math.round(subtotalA * 0.1);
      const shippingA = 99;
      const totalA = subtotalA - discountA + shippingA;
      return (
        <>
          {renderTopBar("Secure Checkout", "Razorpay-style payment experience", () => setAssessmentView("paymentCart"))}
          <div className="surface-card space-y-4">
            <div>
              <p className="text-sm font-semibold">Delivery address</p>
              <p className="text-xs text-muted-foreground">Address is collected only while placing the order.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-2 block">Full name</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.fullName}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, fullName: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Phone</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.phone}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, phone: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Address line 1</Label>
              <div className="field-shell">
                <Input
                  value={checkoutAddress.line1}
                  onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, line1: event.target.value }))}
                  className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Address line 2</Label>
              <div className="field-shell">
                <Input
                  value={checkoutAddress.line2}
                  onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, line2: event.target.value }))}
                  className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="mb-2 block">City</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.city}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, city: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">State</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.state}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, state: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Pincode</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.pincode}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, pincode: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Address type</Label>
              <div className="flex gap-2">
                {["Home", "Work", "Other"].map((option) => (
                  <button
                    key={option}
                    className={`chip ${checkoutAddress.addressType === option ? "chip-active" : ""}`}
                    onClick={() => setCheckoutAddress((prev) => ({ ...prev, addressType: option }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {renderRazorpaySheet(totalA)}

          <button
            className="primary-cta mt-3 w-full"
            disabled={paymentProcessing}
            onClick={completeAssessmentPayment}
          >
            {paymentProcessing ? "Processing…" : `Pay ₹${totalA}`}
          </button>
        </>
      );
    }

    if (assessmentView === "paymentSuccess") {
      const deliverySteps = [
        { label: "Payment received", done: true },
        { label: "Order packed at warehouse", done: true },
        { label: "Out for delivery", done: false },
        { label: "Delivered", done: false },
      ];
      return (
        <>
          {renderTopBar("Order Confirmed", "Payment successful")}
          <div className="surface-card text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold">Your kit is on the way</h2>
            <p className="mt-1 text-sm text-muted-foreground">Order SHC-4128 · Delivery expected in 3-5 days.</p>
            <div className="mt-3 rounded-2xl bg-muted p-3 text-left text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Delivery to</p>
              <p className="mt-1">{savedAddress.line1}, {savedAddress.line2}, {savedAddress.city}, {savedAddress.state} {savedAddress.pincode}</p>
            </div>
          </div>

          <div className="mt-3 surface-card">
            <h3 className="mb-3 text-sm font-semibold">Delivery tracking</h3>
            <div className="space-y-2">
              {deliverySteps.map((step, idx) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      step.done ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.done ? <Check className="h-3.5 w-3.5" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>
                  <p className={`text-xs ${step.done ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-muted p-2 text-[11px] text-muted-foreground">
              Your subscription auto-renews on the next cycle. You can leave feedback after using the kit from the Tracking tab.
            </p>
          </div>

          <button className="primary-cta mt-3 w-full" onClick={() => setActiveTab("Tracking")}>
            Go to Hair Journey
          </button>
        </>
      );
    }

    return null;
  };

  const renderShopTopBar = () => (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Shop</h1>
        <p className="text-sm text-muted-foreground">Buy directly without assessment</p>
      </div>
      <button
        onClick={() => setShopView("cart")}
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background shadow-md"
        aria-label="Open cart"
      >
        <ShoppingBag className="h-4 w-4" />
        {shopCartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-background">
            {shopCartCount}
          </span>
        )}
      </button>
    </div>
  );

  const renderShop = () => {
    if (shopView === "browse") {
      const activeFilterCount =
        (shopConcernFilter !== "All" ? 1 : 0) +
        (shopTypeFilter !== "All" ? 1 : 0) +
        (shopCategoryFilter !== "All" ? 1 : 0);
      return (
        <>
          {renderShopTopBar()}
          <div className="mb-4 flex items-center gap-2">
            <div className="surface-card flex flex-1 items-center gap-2 rounded-full px-4 py-2.5 shadow-none">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={shopSearch}
                onChange={(event) => setShopSearch(event.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent text-sm outline-none"
              />
              {shopSearch && (
                <button
                  onClick={() => setShopSearch("")}
                  className="text-[10px] font-semibold text-muted-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              onClick={() => setFilterSheetOpen(true)}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-md"
              aria-label="Open filters"
            >
              <Settings2 className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-background">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {activeFilterCount > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {shopConcernFilter !== "All" && (
                <button className="chip chip-active" onClick={() => setShopConcernFilter("All")}>
                  {shopConcernFilter} ×
                </button>
              )}
              {shopTypeFilter !== "All" && (
                <button className="chip chip-active" onClick={() => setShopTypeFilter("All")}>
                  {shopTypeFilter} ×
                </button>
              )}
              {shopCategoryFilter !== "All" && (
                <button className="chip chip-active" onClick={() => setShopCategoryFilter("All")}>
                  {shopCategoryFilter} ×
                </button>
              )}
            </div>
          )}

          <p className="mb-3 text-xs text-muted-foreground">
            {filteredProducts.length} products
          </p>

          <div className="space-y-3">
            {filteredProducts.map((product) => {
              const qty = shopCart.filter((id) => id === product.id).length;
              return (
                <div
                  key={product.id}
                  className="surface-card cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setShopView("detail");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProductId(product.id);
                      setShopView("detail");
                    }
                  }}
                >
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="product-thumb"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-tight">{product.name}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{product.category} · {product.quantity}</p>
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-bold">₹{product.price}</p>
                        {qty === 0 ? (
                          <button
                            className="px-3 py-1.5 text-xs rounded-full font-semibold bg-foreground text-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShopCart((prev) => [...prev, product.id]);
                            }}
                          >
                            Add to cart
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 rounded-full bg-foreground text-background px-1.5 py-1">
                            <button
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 text-background"
                              aria-label="Decrease quantity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShopCart((prev) => {
                                  const idx = prev.lastIndexOf(product.id);
                                  if (idx < 0) return prev;
                                  return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
                                });
                              }}
                            >
                              −
                            </button>
                            <span className="min-w-5 text-center text-xs font-semibold">{qty}</span>
                            <button
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 text-background"
                              aria-label="Increase quantity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShopCart((prev) => [...prev, product.id]);
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      className="bottom-tab"
                      onClick={(e) => {
                        e.stopPropagation();
                        setWishlist((prev) =>
                          prev.includes(product.id) ? prev.filter((item) => item !== product.id) : [...prev, product.id],
                        );
                      }}
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-current text-brand" : ""}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }

    if (shopView === "detail") {
      return (
        <>
          {renderTopBar("Product detail", selectedProduct.category, () => setShopView("browse"))}
          <div className="relative overflow-hidden rounded-[26px] border border-border bg-muted">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-56 w-full object-cover"
            />
            <button
              onClick={() =>
                setWishlist((prev) =>
                  prev.includes(selectedProduct.id)
                    ? prev.filter((item) => item !== selectedProduct.id)
                    : [...prev, selectedProduct.id],
                )
              }
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-md"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`h-4 w-4 ${
                  wishlist.includes(selectedProduct.id) ? "fill-current text-brand" : "text-foreground"
                }`}
              />
            </button>
          </div>
          <div className="mt-4 surface-card">
            <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{selectedProduct.category} · {selectedProduct.quantity}</p>
            <p className="mt-3 text-sm text-muted-foreground">{selectedProduct.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedProduct.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-lg font-bold">₹{selectedProduct.price}</p>
            <button
              className="primary-cta mt-5 w-full"
              onClick={() => {
                setShopCart((prev) => [...prev, selectedProduct.id]);
                setCheckoutAddress((prev) => ({
                  ...prev,
                  fullName: userProfile.fullName,
                  phone: userProfile.phone,
                }));
                // Return to shop browse so user can keep adding more products
                setShopView("browse");
              }}
            >
              Add to cart
            </button>
          </div>
        </>
      );
    }

    if (shopView === "cart") {
      const subtotal = shopCartGrouped.reduce((sum, g) => sum + g.product.price * g.qty, 0);
      const shipping = shopCartGrouped.length ? 99 : 0;
      const total = subtotal + shipping;
      return (
        <>
          {renderTopBar("Shop cart", `${shopCartCount} item(s)`, () => setShopView("browse"))}
          <div className="surface-card space-y-3">
            {shopCartGrouped.length ? (
              shopCartGrouped.map(({ product, qty }) => (
                <div key={product.id} className="surface-soft flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.quantity} · ₹{product.price}</p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-1.5 py-1">
                      <button
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 text-background"
                        aria-label={`Decrease ${product.name}`}
                        onClick={() => {
                          setShopCart((prev) => {
                            const idx = prev.lastIndexOf(product.id);
                            if (idx < 0) return prev;
                            return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
                          });
                        }}
                      >
                        −
                      </button>
                      <span className="min-w-5 text-center text-xs font-semibold">{qty}</span>
                      <button
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 text-background"
                        aria-label={`Increase ${product.name}`}
                        onClick={() => setShopCart((prev) => [...prev, product.id])}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">₹{product.price * qty}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-muted p-6 text-center text-sm text-muted-foreground">Your cart is empty.</div>
            )}
            <button
              className="secondary-cta mt-2 w-full"
              onClick={() => setShopView("browse")}
            >
              + Add more products
            </button>
            <div className="pt-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="mt-1 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button className="primary-cta mt-2 w-full" onClick={() => setShopView("checkout")}>Checkout</button>
            <button className="secondary-cta mt-2 w-full" onClick={() => setShopView("orders")}>View order history</button>
          </div>
        </>
      );
    }

    if (shopView === "checkout") {
      const subtotalS = shopCartGrouped.reduce((sum, g) => sum + g.product.price * g.qty, 0);
      const shippingS = shopCartGrouped.length ? 99 : 0;
      const totalS = subtotalS + shippingS;
      return (
        <>
          {renderTopBar("Shop checkout", "Secure payment", () => setShopView("cart"))}
          <div className="surface-card space-y-4">
            <div>
              <p className="text-sm font-semibold">Delivery address</p>
              <p className="text-xs text-muted-foreground">Address is required before the order is placed.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-2 block">Full name</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.fullName}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, fullName: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Phone</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.phone}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, phone: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Address line 1</Label>
              <div className="field-shell">
                <Input
                  value={checkoutAddress.line1}
                  onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, line1: event.target.value }))}
                  className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Address line 2</Label>
              <div className="field-shell">
                <Input
                  value={checkoutAddress.line2}
                  onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, line2: event.target.value }))}
                  className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="mb-2 block">City</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.city}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, city: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">State</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.state}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, state: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Pincode</Label>
                <div className="field-shell">
                  <Input
                    value={checkoutAddress.pincode}
                    onChange={(event) => setCheckoutAddress((prev) => ({ ...prev, pincode: event.target.value }))}
                    className="h-11 rounded-[18px] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {renderRazorpaySheet(totalS)}

          <button
            className="primary-cta mt-3 w-full"
            disabled={paymentProcessing || shopCartProducts.length === 0}
            onClick={completeShopPayment}
          >
            {paymentProcessing ? "Processing…" : `Pay ₹${totalS}`}
          </button>
        </>
      );
    }

    if (shopView === "success") {
      return (
        <>
          {renderTopBar("Order placed", "Shopping payment successful")}
          <div className="surface-card text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold">Thanks for shopping with Secret Hair Care</h2>
            <p className="mt-2 text-sm text-muted-foreground">Your order has been added to order history.</p>
            <p className="mt-2 text-xs text-muted-foreground">Shipping to {savedAddress.city}, {savedAddress.state} · {savedAddress.pincode}</p>
            <button className="primary-cta mt-4 w-full" onClick={() => setShopView("orders")}>Open order history</button>
          </div>
        </>
      );
    }

    return (
      <>
        {renderTopBar("Order history", "All your past purchases", () => setShopView("browse"))}
        <div className="space-y-2">
          {mockOrders.map((order) => (
            <div key={order.id} className="surface-card">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold">{order.id}</p>
                <span className="chip">{order.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">{order.date}</p>
              <p className="mt-1 text-xs text-muted-foreground">{order.items.join(" • ")}</p>
              <p className="mt-2 text-sm font-semibold">₹{order.total}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderTracking = () => {
    const sub = activeSubscription;
    if (!purchased) {
      return (
        <>
          {renderTopBar("Hair Journey", "Track progress post-purchase")}
          <div className="empty-center text-center">
            <div className="surface-card w-full max-w-sm">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground">
                <Clock3 className="h-7 w-7" />
              </div>
              <h2 className="display-heading text-[22px]">Your journey unlocks after checkout</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete an assessment or buy from shop to start your 90-day hair journey.
              </p>
              <button className="primary-cta mt-4 w-full" onClick={startAssessment}>
                Start assessment
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {renderTopBar("Hair Journey", "Usage, reminders, and progress")}

        <div className="hero-card mb-3" style={{ background: "color-mix(in oklab, var(--accent-lilac) 60%, white)" }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Today's routine</p>
          <h2 className="mt-1 display-heading text-[26px]">Apply night serum</h2>
          <p className="mt-1 text-xs text-foreground/70">Next wash: tomorrow · 8:00 AM</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="chip">Day 34 of 90</span>
            <span className="chip">{sub.routineAdherence}% adherence</span>
          </div>
        </div>

        <div className="surface-card mb-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold">Product usage</h3>
            <button
              className="text-xs font-semibold text-foreground"
              onClick={() => {
                setActiveTab("Profile");
                setProfilePage("subscription");
              }}
            >
              View plan
            </button>
          </div>
          <div className="space-y-3">
            {sub.productsUsed.map((p) => {
              const pct = Math.round((p.used / p.total) * 100);
              return (
                <div key={p.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-muted-foreground">{p.used}/{p.total} {p.unit}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-foreground" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="surface-card mb-3">
          <h3 className="mb-2 text-base font-bold">Hair progress timeline</h3>
          <div className="space-y-2">
            {usageMilestones.map((milestone) => (
              <div key={milestone.id} className="surface-soft">
                <p className="text-sm font-semibold">{milestone.title}</p>
                <p className="text-xs text-muted-foreground">{milestone.note}</p>
                <div className="mt-2 h-1.5 rounded-full bg-card">
                  <div className="h-full rounded-full bg-foreground" style={{ width: `${milestone.progress * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card mb-3">
          <h3 className="text-base font-bold">15-day photo check-in</h3>
          <p className="mt-1 text-xs text-muted-foreground">Upload progress photos so your expert can review and share feedback.</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="surface-soft flex h-24 items-center justify-center text-center text-xs text-muted-foreground">
              Before
            </div>
            <div className="surface-soft flex h-24 items-center justify-center text-center text-xs text-muted-foreground">
              After
            </div>
          </div>
          <button className="secondary-cta mt-3 w-full" onClick={() => setTrackingUploadOpen((prev) => !prev)}>
            <ImagePlus className="mr-2 h-4 w-4" /> {trackingUploadOpen ? "Photos uploaded" : "Upload progress images"}
          </button>
          {trackingUploadOpen && (
            <div className="mt-2 rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
              3 photos sent to your expert for review.
            </div>
          )}
        </div>

        {/* Expert review of uploaded photos — appears once user uploads */}
        {trackingUploadOpen && (
          <div
            className="surface-card mb-3"
            style={{ background: "color-mix(in oklab, var(--accent-lilac) 45%, white)" }}
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-card/70 px-3 py-1 text-[11px] font-semibold">
              <Stethoscope className="h-3 w-3" /> Expert feedback
            </div>
            <p className="text-sm font-bold">{expertFeedback.headline}</p>
            <p className="mt-1 text-xs text-foreground/80">{expertFeedback.summary}</p>
            <div className="mt-2 space-y-1">
              {expertFeedback.notes.slice(0, 2).map((note) => (
                <p key={note} className="rounded-xl bg-card/60 p-2 text-[11px] text-foreground/80">• {note}</p>
              ))}
            </div>
            <button
              className="secondary-cta mt-3 w-full"
              onClick={() => {
                setActiveTab("Assessment");
                setAssessmentView("expertChat");
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" /> Reply to expert
            </button>
          </div>
        )}

        {/* User feedback — moved here per flow (after usage tracking & photo uploads) */}
        <div className="surface-card mb-3">
          {feedbackSent ? (
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold">Thanks for your feedback</p>
              <p className="mt-1 text-xs text-muted-foreground">Your inputs help us refine your next kit.</p>
            </div>
          ) : (
            <>
              <h3 className="text-sm font-semibold">How is the kit working so far?</h3>
              <p className="mt-1 text-xs text-muted-foreground">Rate your routine after using the kit.</p>
              <div className="mt-3 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setFeedbackRating(n)} aria-label={`Rate ${n}`}>
                    <Star className={`h-6 w-6 ${n <= feedbackRating ? "fill-brand text-brand" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Less hair fall", "Softer texture", "Calmer scalp", "More shine", "No change yet", "Needs review"].map((tag) => {
                  const active = feedbackTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      className={`chip ${active ? "chip-active" : ""}`}
                      onClick={() =>
                        setFeedbackTags((prev) =>
                          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
                        )
                      }
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <textarea
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                placeholder="Notes for your expert (optional)"
                rows={3}
                className="mt-3 w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button
                className="primary-cta mt-3 w-full disabled:opacity-50"
                disabled={feedbackRating === 0}
                onClick={() => setFeedbackSent(true)}
              >
                Send to expert
              </button>
            </>
          )}
        </div>

        <div
          className="surface-card mb-3"
          style={{ background: "color-mix(in oklab, var(--accent-mint) 50%, white)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Next refill</p>
              <p className="mt-1 text-base font-bold">{sub.nextBillingDate}</p>
              <p className="text-xs text-foreground/70">{sub.planName} · in {sub.daysToNextBilling} days</p>
            </div>
            <button
              onClick={() => {
                setActiveTab("Profile");
                setProfilePage("subscription");
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </>
    );
  };

  /* ---------------- PROFILE PAGES ---------------- */

  const profileMenu: {
    id: Exclude<ProfilePage, null>;
    label: string;
    icon: typeof User;
    description: string;
    badge?: string;
  }[] = [
    { id: "details", label: "User details", icon: User, description: "Personal info & contact" },
    { id: "hair", label: "Hair profile", icon: Sparkles, description: "Type, goal & concerns" },
    { id: "consults", label: "Consultations", icon: Stethoscope, description: "Past & upcoming experts", badge: `${consultationHistory.length}` },
    { id: "orders", label: "Orders", icon: Package, description: "Track & re-order", badge: `${mockOrders.length}` },
    { id: "wishlist", label: "Wishlist", icon: Heart, description: "Saved products", badge: `${wishlistItems.length}` },
    { id: "subscription", label: "My Plan", icon: ShieldCheck, description: "Subscription & usage" },
    { id: "address", label: "Address", icon: MapPin, description: "Delivery details" },
    { id: "notifications", label: "Notifications", icon: Bell, description: "Reminders & updates", badge: `${notificationItems.filter((n) => n.unread).length}` },
    { id: "support", label: "Support & FAQ", icon: HelpCircle, description: "Help center" },
  ];

  const renderSubscriptionPage = () => {
    const sub = activeSubscription;
    return (
      <>
        {renderTopBar("My Plan", "Subscription & usage tracking", () => setProfilePage(null))}
        <div className="hero-card mb-3" style={{ background: "color-mix(in oklab, var(--accent-mint) 60%, white)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Active plan</p>
              <h2 className="mt-1 display-heading text-[26px]">{activePlanDetails.name}</h2>
              <p className="text-xs text-foreground/70">{activePlanDetails.cadence} · ₹{sub.pricePerCycle}</p>
            </div>
            <span className="chip-count bg-foreground text-background">{sub.status}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-card/70 p-2 text-center">
              <p className="text-[10px] text-muted-foreground">Started</p>
              <p className="text-xs font-bold">{sub.startedOn}</p>
            </div>
            <div className="rounded-xl bg-card/70 p-2 text-center">
              <p className="text-[10px] text-muted-foreground">Cycle</p>
              <p className="text-xs font-bold">{sub.cyclesCompleted}/{sub.totalCycles}</p>
            </div>
            <div className="rounded-xl bg-card/70 p-2 text-center">
              <p className="text-[10px] text-muted-foreground">Adherence</p>
              <p className="text-xs font-bold">{sub.routineAdherence}%</p>
            </div>
          </div>
        </div>

        <div className="surface-card mb-3" style={{ background: "color-mix(in oklab, var(--accent-cream) 60%, white)" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Next renewal</p>
              <p className="text-base font-bold">{sub.nextBillingDate}</p>
              <p className="text-xs text-foreground/70">In {sub.daysToNextBilling} days · ₹{sub.pricePerCycle}</p>
            </div>
          </div>
        </div>

        <div className="surface-card mb-3">
          <h3 className="mb-3 text-base font-bold">Usage tracking</h3>
          <div className="space-y-4">
            {sub.productsUsed.map((p) => {
              const pct = Math.round((p.used / p.total) * 100);
              const product = products.find((prod) => prod.id === p.productId);
              return (
                <div key={p.name} className="flex items-start gap-3">
                  {product && (
                    <img
                      src={product.image}
                      alt={p.name}
                      className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <p className="font-semibold truncate">{p.name}</p>
                      <p className="text-muted-foreground shrink-0">{p.used}/{p.total} {p.unit}</p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-foreground" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">{pct}% used · approx {p.total - p.used} {p.unit} remaining</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="surface-card mb-3">
          <h3 className="mb-2 text-base font-bold">Upcoming shipment</h3>
          <p className="text-xs text-muted-foreground">{sub.upcomingShipment.date}</p>
          <div className="mt-2 space-y-1.5">
            {sub.upcomingShipment.items.map((it) => (
              <div key={it} className="flex items-center gap-2 text-xs">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{it}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-xl bg-muted p-2 text-[11px] text-muted-foreground">
            Shipping to: {sub.upcomingShipment.address}
          </p>
        </div>

        <div className="surface-card mb-3">
          <h3 className="mb-2 text-base font-bold">Plan benefits</h3>
          <div className="grid grid-cols-2 gap-2">
            {sub.benefits.map((b) => (
              <div key={b} className="flex items-start gap-2 rounded-xl bg-muted p-2 text-xs">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="secondary-cta">Pause plan</button>
          <button className="primary-cta">
            <CreditCard className="mr-2 h-4 w-4" /> Manage
          </button>
        </div>

        {/* Subscription end-of-cycle loop back to assessment */}
        <div
          className="surface-card mt-3"
          style={{ background: "color-mix(in oklab, var(--accent-cream) 70%, white)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">When this plan ends</p>
          <p className="mt-1 text-sm font-bold">Re-assess and get an updated kit</p>
          <p className="mt-1 text-xs text-foreground/70">
            After cycle {sub.totalCycles}, retake the AI assessment so your next plan reflects your latest concerns and progress.
          </p>
          <button
            className="primary-cta mt-3 w-full"
            onClick={() => {
              setActiveTab("Assessment");
              setAssessmentView("intro");
              setProfilePage(null);
            }}
          >
            Restart assessment
          </button>
        </div>

        <div className="surface-card mt-3">
          <h3 className="mb-2 text-sm font-bold">Switch plans</h3>
          <p className="mb-2 text-[11px] text-muted-foreground">
            You're on <span className="font-semibold text-foreground">{activePlanDetails.name}</span>. Tap a plan to switch — change applies from your next renewal on {sub.nextBillingDate}.
          </p>
          <div className="space-y-2">
            {subscriptionPlans.map((plan) => {
              const isActive = plan.id === activePlanId;
              return (
                <button
                  key={plan.id}
                  onClick={() => setActivePlanId(plan.id)}
                  className={`w-full text-left surface-soft text-xs ${
                    isActive ? "ring-2 ring-foreground" : ""
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{plan.name}</p>
                    <span className="chip">{plan.savings}</span>
                  </div>
                  <p className="mt-0.5 text-muted-foreground">{plan.cadence}</p>
                  <p className="mt-1 text-muted-foreground">{plan.description}</p>
                  <p
                    className={`mt-2 inline-flex items-center gap-1 text-[11px] font-semibold ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Check className="h-3 w-3" /> Selected — applies next cycle
                      </>
                    ) : (
                      <>Switch to this plan</>
                    )}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const renderProfileDetailsPage = () => (
    <>
      {renderTopBar("User details", "Personal info & contact", () => setProfilePage(null))}
      <div className="surface-card mb-3 text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-foreground"
          style={{ background: "color-mix(in oklab, var(--accent-gold) 70%, white)" }}
        >
          <User className="h-9 w-9" />
        </div>
        <p className="mt-2 text-base font-bold">{userProfile.fullName}</p>
        <p className="text-xs text-muted-foreground">{userProfile.hairProfileLabel}</p>
      </div>

      <div className="surface-card space-y-3 text-sm">
        {[
          { icon: Phone, label: "Phone", value: userProfile.phone },
          { icon: Mail, label: "Email", value: userProfile.email },
          { icon: User, label: "Age range", value: userProfile.ageRange },
          { icon: MapPin, label: "City", value: userProfile.city },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="primary-cta mt-3 w-full">Edit details</button>
    </>
  );

  const renderHairProfilePage = () => (
    <>
      {renderTopBar("Hair profile", "Type, goal & concerns", () => setProfilePage(null))}
      <div className="hero-card mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Saved profile</p>
        <h2 className="mt-1 display-heading text-[24px]">{userProfile.hairProfileLabel}</h2>
      </div>
      <div className="surface-card space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Hair type</span>
          <span className="font-semibold">{answers.hairType || "Wavy"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Primary goal</span>
          <span className="font-semibold">{answers.goal || "Less shedding"}</span>
        </div>
        <div>
          <p className="text-muted-foreground">Top concerns</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(answers.concerns.length ? answers.concerns : ["Hair fall", "Dryness"]).map((c) => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </div>
      </div>
      <button
        className="primary-cta mt-3 w-full"
        onClick={() => {
          setActiveTab("Assessment");
          setAssessmentView("intro");
          setProfilePage(null);
        }}
      >
        Retake assessment
      </button>
    </>
  );

  const renderConsultsPage = () => (
    <>
      {renderTopBar("Consultations", "Past & upcoming experts", () => setProfilePage(null))}
      <div className="space-y-2">
        {consultationHistory.map((c) => (
          <div key={c.id} className="surface-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">{c.expert}</p>
              <span className="chip">{c.status}</span>
            </div>
            <p className="text-xs text-muted-foreground">{c.specialization} · {c.date}</p>
            <p className="mt-2 text-xs text-foreground/80">{c.summary}</p>
          </div>
        ))}
      </div>
      <button
        className="primary-cta mt-3 w-full"
        onClick={() => {
          setActiveTab("Assessment");
          setAssessmentView("expertSchedule");
          setProfilePage(null);
        }}
      >
        Book new consultation
      </button>
    </>
  );

  const renderOrdersPage = () => (
    <>
      {renderTopBar("Orders", "Past purchases", () => setProfilePage(null))}
      <div className="space-y-3">
        {mockOrders.map((o) => {
          const orderProducts = (o.productIds ?? [])
            .map((pid) => products.find((p) => p.id === pid))
            .filter((p): p is (typeof products)[number] => Boolean(p));
          return (
            <div key={o.id} className="surface-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{o.id}</p>
                <span className="chip">{o.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">{o.date}</p>
              <div className="mt-3 flex -space-x-2">
                {orderProducts.map((p) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt={p.name}
                    className="h-12 w-12 rounded-xl border-2 border-card object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="mt-2 space-y-1">
                {orderProducts.map((p) => (
                  <p key={p.id} className="text-[11px] text-muted-foreground">
                    • {p.name}
                  </p>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-base font-bold">₹{o.total}</p>
                <button className="secondary-cta px-3 py-1.5 text-xs">Re-order</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderWishlistPage = () => (
    <>
      {renderTopBar("Wishlist", "Saved products", () => setProfilePage(null))}
      <div className="space-y-3">
        {wishlistItems.map((w) => {
          const product = products.find((p) => p.id === w.productId);
          return (
            <div key={w.id} className="surface-card flex items-center gap-3">
              {product && (
                <img
                  src={product.image}
                  alt={w.name}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                  loading="lazy"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-tight">{w.name}</p>
                <p className="text-[11px] text-muted-foreground">{w.note}</p>
                <p className="mt-1 text-sm font-bold">₹{w.price}</p>
              </div>
              <button
                className="rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background"
                onClick={() => {
                  if (w.productId) setShopCart((prev) => [...prev, w.productId]);
                  setActiveTab("Shop");
                  setShopView("cart");
                  setProfilePage(null);
                }}
              >
                Move to cart
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="primary-cta mt-3 w-full"
        onClick={() => {
          setActiveTab("Shop");
          setShopView("browse");
          setProfilePage(null);
        }}
      >
        Browse shop
      </button>
    </>
  );

  const renderAddressPage = () => (
    <>
      {renderTopBar("Address", "Delivery details", () => setProfilePage(null))}
      <div className="surface-card">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">{savedAddress.fullName}</p>
          <span className="chip">{savedAddress.addressType}</span>
        </div>
        <p className="text-xs text-muted-foreground">{savedAddress.phone}</p>
        <p className="mt-2 text-sm">
          {savedAddress.line1}
          {savedAddress.line2 ? `, ${savedAddress.line2}` : ""}, {savedAddress.city}, {savedAddress.state} {savedAddress.pincode}
        </p>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Address is reconfirmed at every checkout — you can edit it before placing an order.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="secondary-cta">Edit</button>
        <button className="primary-cta">Add new</button>
      </div>
    </>
  );

  const renderNotificationsPage = () => (
    <>
      {renderTopBar("Notifications", "Reminders & updates", () => {
        setProfilePage(null);
        if (notificationsReturnTab && notificationsReturnTab !== "Profile") {
          setActiveTab(notificationsReturnTab);
        }
        setNotificationsReturnTab(null);
      })}
      <div className="space-y-2">
        {notificationItems.map((n) => (
          <div key={n.id} className={`surface-card ${n.unread ? "border-foreground/30" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">{n.title}</p>
              <span className="text-[10px] text-muted-foreground">{n.time}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
            {n.unread && <span className="mt-2 inline-block chip">New</span>}
          </div>
        ))}
      </div>
    </>
  );

  const renderSupportPage = () => (
    <>
      {renderTopBar("Support & FAQ", "Help center", () => setProfilePage(null))}
      <div className="space-y-2">
        {supportFaq.map((f) => (
          <div key={f.id} className="surface-card">
            <p className="text-sm font-bold">{f.q}</p>
            <p className="mt-1 text-xs text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>
      <div className="surface-card mt-3 flex items-center gap-2">
        <Mail className="h-4 w-4 text-foreground" />
        <span className="text-sm">care@secrethaircare.app</span>
      </div>
      <button className="primary-cta mt-3 w-full">
        <MessageSquareText className="mr-2 h-4 w-4" /> Chat with support
      </button>
    </>
  );

  const renderProfilePage = () => {
    switch (profilePage) {
      case "details": return renderProfileDetailsPage();
      case "hair": return renderHairProfilePage();
      case "consults": return renderConsultsPage();
      case "orders": return renderOrdersPage();
      case "wishlist": return renderWishlistPage();
      case "subscription": return renderSubscriptionPage();
      case "address": return renderAddressPage();
      case "notifications": return renderNotificationsPage();
      case "support": return renderSupportPage();
      default: return null;
    }
  };

  const renderProfile = () => {
    if (profilePage) return renderProfilePage();
    return (
      <>
        {renderTopBar("Profile", "Your account & care history")}

        <div className="hero-card mb-3" style={{ background: "color-mix(in oklab, var(--accent-lilac) 60%, white)" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-foreground"
              style={{ background: "color-mix(in oklab, var(--accent-gold) 70%, white)" }}
            >
              <User className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold">{userProfile.fullName}</p>
              <p className="text-xs text-foreground/70">{userProfile.hairProfileLabel}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-card/70 py-2">
              <p className="text-[10px] text-muted-foreground">Orders</p>
              <p className="text-sm font-bold">{mockOrders.length}</p>
            </div>
            <div className="rounded-xl bg-card/70 py-2">
              <p className="text-[10px] text-muted-foreground">Consults</p>
              <p className="text-sm font-bold">{consultationHistory.length}</p>
            </div>
            <div className="rounded-xl bg-card/70 py-2">
              <p className="text-[10px] text-muted-foreground">Score</p>
              <p className="text-sm font-bold">{recommendation.score.hairHealthScore}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {profileMenu.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                className="surface-card flex w-full items-center gap-3 text-left"
                onClick={() => setProfilePage(s.id)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{s.label}</p>
                  <p className="text-[11px] text-muted-foreground">{s.description}</p>
                </div>
                {s.badge && <span className="chip-count bg-muted">{s.badge}</span>}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <button
          className="secondary-cta mt-3 w-full"
          onClick={() => {
            setIsAuthenticated(false);
            setAuthView("welcome");
            setProfilePage(null);
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </button>
      </>
    );
  };

  const renderScreen = () => {
    if (!isAuthenticated || authView !== "welcome") {
      return renderAuth();
    }
    if (activeTab === "Home") {
      return renderHome();
    }
    if (activeTab === "Assessment") {
      return renderQuestionnaire();
    }
    if (activeTab === "Shop") {
      return renderShop();
    }
    if (activeTab === "Tracking") {
      return renderTracking();
    }
    return renderProfile();
  };

  return (
    <main className="ios-device-stage">
      <div className="ios-device-frame" aria-label="iPhone 16 frame">
        <div className="ios-side-buttons" aria-hidden="true" />
        <section className="ios-device-shell" aria-label="Secret Hair Care iPhone app prototype">
          <div className="ios-notch" />
          <div className="ios-screen">
          <div className="ios-status-bar">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-foreground">
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <BatteryFull className="h-3.5 w-3.5" />
            </div>
          </div>

          {splashVisible && (
            <div className="splash-screen" aria-hidden="true">
              <div className="splash-mark">
                <Sparkles className="h-9 w-9" />
              </div>
              <h1 className="mt-5 text-xl font-semibold text-foreground">Secret Hair Care</h1>
              <p className="mt-1 text-xs text-muted-foreground">Premium · Personalized · Private</p>
              <div className="splash-ring">
                <div className="splash-ring-fill" />
              </div>
            </div>
          )}

          <div className="screen-scroll" ref={scrollRef}>{renderScreen()}</div>

          {isAuthenticated && authView === "welcome" && (
            <nav className="bottom-nav" aria-label="Primary">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const selected = activeTab === tab.label;
                return (
                  <button
                    key={tab.label}
                    aria-label={tab.label}
                    className={`bottom-tab ${selected ? "bottom-tab-active" : ""}`}
                    onClick={() => moveToProtectedTab(tab.label)}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </nav>
          )}

          {filterSheetOpen && (
            <>
              <div
                className="filter-sheet-backdrop"
                onClick={() => setFilterSheetOpen(false)}
                aria-hidden="true"
              />
              <div className="filter-sheet" role="dialog" aria-label="Filters">
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button
                    onClick={() => {
                      setShopConcernFilter("All");
                      setShopTypeFilter("All");
                      setShopCategoryFilter("All");
                    }}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Reset all
                  </button>
                </div>

                <div className="mb-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Hair type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Straight", "Wavy", "Curly", "Coily"].map((option) => (
                      <button
                        key={option}
                        className={`chip ${shopTypeFilter === option ? "chip-active" : ""}`}
                        onClick={() => setShopTypeFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Concern
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Hair fall", "Dandruff", "Dryness", "Frizz", "Oily scalp", "Thinning", "Slow growth", "Scalp sensitivity"].map((option) => (
                      <button
                        key={option}
                        className={`chip ${shopConcernFilter === option ? "chip-active" : ""}`}
                        onClick={() => setShopConcernFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Shampoo", "Serum", "Oil", "Conditioner", "Supplement", "Scalp Treatment"].map((option) => (
                      <button
                        key={option}
                        className={`chip ${shopCategoryFilter === option ? "chip-active" : ""}`}
                        onClick={() => setShopCategoryFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="primary-cta w-full"
                  onClick={() => setFilterSheetOpen(false)}
                >
                  Show {filteredProducts.length} products
                </button>
              </div>
            </>
          )}
          </div>
        </section>
      </div>
    </main>
  );
}
