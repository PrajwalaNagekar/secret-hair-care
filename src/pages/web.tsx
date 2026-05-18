import { Link, Outlet, useLocation } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, MapPin, Menu, X, Facebook, Instagram, Youtube, MessageCircle, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CartProvider, useCart } from "@/lib/web-cart";
import { AuthProvider, useAuth } from "@/lib/web-auth";
import { WEB_CATEGORIES, WEB_CONCERNS } from "@/lib/web-data";
import { SecretLogo } from "@/components/secret-logo";



function WebLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <AnnouncementBar />
          <WebHeader />
          <NavBar />
          <main className="min-h-[60vh]">
            <Outlet />
          </main>
          <WebFooter />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

function AnnouncementBar() {
  const messages = [
    "✨ GST 2.0 pricing updated.",
    "🚚 Delivering across India and Internationally.",
    "♥ Experience the power of South India's best natural hair oils",
  ];
  return (
    <div className="overflow-hidden bg-[oklch(0.9_0.06_45)] py-2 text-xs font-medium text-foreground/80">
      <div className="flex animate-[marquee_30s_linear_infinite] gap-12 whitespace-nowrap px-4">
        {[...messages, ...messages, ...messages].map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function WebHeader() {
  // Standalone logo bar above the nav. Visible on load, hides on scroll-down,
  // reappears on scroll-up. The nav remains sticky (handled separately).
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 24) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`flex justify-center border-b border-border/60 bg-card/60 backdrop-blur transition-[max-height,opacity,padding] duration-300 ease-out ${
        hidden ? "max-h-0 overflow-hidden py-0 opacity-0" : "max-h-40 py-4 opacity-100 md:py-6"
      }`}
    >
      <Link to="/web" aria-label="Secret Hair Care home" className="flex items-center">
        <SecretLogo height={40} className="md:hidden" />
        <SecretLogo height={60} className="hidden md:block" />
      </Link>
    </div>
  );
}

function NavBar() {
  const [open, setOpen] = useState<"shop" | "concern" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useLocation().pathname;
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navRef = useRef<HTMLElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const navLink = (active: boolean) =>
    `text-sm font-semibold uppercase tracking-[0.18em] transition-colors hover:text-foreground ${active ? "text-foreground" : "text-foreground/70"}`;

  return (
    <nav ref={navRef} className="sticky top-0 z-30 border-b border-border/60 bg-[oklch(0.95_0.025_60)]/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobileOpen((s) => !s)} aria-label="Menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Inline nav items */}
        <ul className="hidden flex-1 items-center justify-center gap-7 md:flex lg:gap-9">
          <li className="relative">
            <span className="inline-flex items-center">
              <Link
                to="/web/shop"
                onClick={() => setOpen(null)}
                className={navLink(pathname.endsWith("/shop"))}
              >
                Shop
              </Link>
              <button
                type="button"
                onClick={() => setOpen(open === "shop" ? null : "shop")}
                className={`ml-1 ${navLink(false)}`}
                aria-label="Toggle shop categories"
                aria-expanded={open === "shop"}
              >
                ▾
              </button>
            </span>
            {open === "shop" && (
              <div className="absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 animate-in fade-in-0 slide-in-from-top-2 rounded-xl border border-border bg-card py-2 shadow-xl">
                <ul className="flex w-56 flex-col">
                  {WEB_CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/web/category/${c.slug}`}
                        
                        onClick={() => setOpen(null)}
                        className="block whitespace-nowrap px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li className="relative">
            <span className="inline-flex items-center">
              <Link
                to={`/web/concern/${WEB_CONCERNS[0]?.slug ?? "hair-fall"}`}
                
                onClick={() => setOpen(null)}
                className={navLink(pathname.includes("/concern/"))}
              >
                Concern
              </Link>
              <button
                type="button"
                onClick={() => setOpen(open === "concern" ? null : "concern")}
                className={`ml-1 ${navLink(false)}`}
                aria-label="Toggle concern list"
                aria-expanded={open === "concern"}
              >
                ▾
              </button>
            </span>
            {open === "concern" && (
              <div className="absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 animate-in fade-in-0 slide-in-from-top-2 rounded-xl border border-border bg-card py-2 shadow-xl">
                <ul className="flex w-56 flex-col">
                  {WEB_CONCERNS.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/web/concern/${c.slug}`}
                        
                        onClick={() => setOpen(null)}
                        className="block whitespace-nowrap px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to="/web/blogs" onClick={() => setOpen(null)} className={navLink(pathname.endsWith("/blogs"))}>Blogs</Link>
          </li>
          <li>
            <Link to="/web/contact" onClick={() => setOpen(null)} className={navLink(pathname.endsWith("/contact"))}>Contact</Link>
          </li>
          <li>
            <Link to="/web/ask-ai" onClick={() => setOpen(null)} className={navLink(pathname.endsWith("/ask-ai"))}>
              Ask AI
            </Link>
          </li>
          <li>
            <Link to="/web/track" onClick={() => setOpen(null)} className={`inline-flex items-center gap-1.5 ${navLink(pathname.endsWith("/track"))}`}>
              <MapPin className="h-3.5 w-3.5" /> Track Order
            </Link>
          </li>
        </ul>

        {/* Right-side icons — generous spacing */}
        <div className="flex shrink-0 items-center gap-5 md:gap-7">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          {user ? (
            <>
              <Link to="/web/account" aria-label="Account"><User className="h-5 w-5" /></Link>
              <button onClick={logout} aria-label="Sign out" className="hidden md:inline">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link to="/web/login" aria-label="Sign in"><User className="h-5 w-5" /></Link>
          )}
          <Link to="/web/account" aria-label="Wishlist" className="hidden sm:inline">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/web/cart" aria-label="Cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-border/60 bg-card px-4 py-3 md:px-8">
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <Search className="h-4 w-4 text-foreground/50" />
            <input
              type="text"
              placeholder="Search hair oils, shampoos, kits…"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-foreground/40"
              autoFocus
            />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-border/60 bg-card px-4 py-3 md:hidden">
          <ul className="space-y-1 text-sm font-medium">
            <li><Link to="/web/shop" onClick={() => setMobileOpen(false)} className="block py-2 font-semibold">Shop — All Products</Link></li>
            <li className="pt-1 text-xs uppercase tracking-wider text-foreground/50">By Category</li>
            {WEB_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/web/category/${c.slug}`}
                  
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 pl-4 text-foreground/70"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 text-xs uppercase tracking-wider text-foreground/50">Concern</li>
            {WEB_CONCERNS.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/web/concern/${c.slug}`}
                  
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 pl-4 text-foreground/70"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li><Link to="/web/blogs" onClick={() => setMobileOpen(false)} className="block py-2">Blogs</Link></li>
            <li><Link to="/web/track" onClick={() => setMobileOpen(false)} className="block py-2">Track Order</Link></li>
            <li><Link to="/web/contact" onClick={() => setMobileOpen(false)} className="block py-2">Contact</Link></li>
            <li><Link to="/web/ask-ai" onClick={() => setMobileOpen(false)} className="block py-2">✨ Ask AI</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function WebFooter() {
  return (
    <footer className="mt-16 bg-[oklch(0.82_0.09_55)] text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-5 md:px-8">
        {/* FOLLOW US — left */}
        <div className="md:col-span-1">
          <h3 className="font-serif text-xl font-semibold tracking-wide">FOLLOW US</h3>
          <p className="mt-4 text-sm text-foreground/80">Stay close to the rituals, launches and stories.</p>
          <div className="mt-5 flex gap-4">
            <a href="https://www.instagram.com/secrethairoil" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-70">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-70">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:opacity-70">
              <Youtube className="h-6 w-6" />
            </a>
            <a href="https://wa.me/+918147785553" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:opacity-70">
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-serif text-xl font-semibold tracking-wide">SHOP</h3>
          <ul className="mt-5 space-y-3 text-sm font-medium uppercase tracking-wider">
            <li><Link to="/web/shop" className="hover:opacity-70">All Products</Link></li>
            <li><Link to={`/web/category/${"hair-oils"}`}  className="hover:opacity-70">Hair Oils</Link></li>
            <li><Link to={`/web/category/${"shampoos-conditioners"}`}  className="hover:opacity-70">Shampoos &amp; Conditioners</Link></li>
            <li><Link to={`/web/category/${"hair-masks-combs"}`}  className="hover:opacity-70">Hair Masks &amp; Combs</Link></li>
            <li><Link to={`/web/category/${"combo-kits"}`}  className="hover:opacity-70">Combo Kits</Link></li>
          </ul>
        </div>

        {/* QUICK LINK */}
        <div>
          <h3 className="font-serif text-xl font-semibold tracking-wide">QUICK LINK</h3>
          <ul className="mt-5 space-y-3 text-sm font-medium uppercase tracking-wider">
            <li><Link to="/web/contact" className="hover:opacity-70">FAQs</Link></li>
            <li><Link to="/web/blogs" className="hover:opacity-70">Blogs</Link></li>
            <li><Link to="/web/track" className="hover:opacity-70">Track Order</Link></li>
            <li><Link to="/web/about" className="hover:opacity-70">Our Policies</Link></li>
            <li><Link to="/web/about" className="hover:opacity-70">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        {/* MAILING LIST */}
        <div>
          <h3 className="font-serif text-xl font-semibold tracking-wide">JOIN OUR MAILING LIST</h3>
          <p className="mt-3 text-sm text-foreground/80">
            Be the first to know about launches, rituals and offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex items-center gap-2 rounded-full border-2 border-foreground bg-transparent px-1 py-1"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="w-full bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-foreground/50"
            />
            <button
              type="submit"
              className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-background hover:opacity-90"
            >
              Join
            </button>
          </form>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-serif text-xl font-semibold tracking-wide">CONTACT</h3>
          <p className="mt-5 text-sm">Secret Haircare Private Ltd.</p>
          <p className="mt-3 text-sm">
            <a href="mailto:info@thesecrethaircare.com" className="hover:opacity-70">info@thesecrethaircare.com</a>
          </p>
          <p className="mt-3 text-sm">
            <a href="tel:+918147785553" className="hover:opacity-70">+91-8147785553</a>
          </p>
          <p className="mt-5 text-sm">
            2320, 2nd floor, Muddinapalya main road, D group layout, Bangalore, Karnataka-560091
          </p>
        </div>
      </div>
      <div className="border-t border-foreground/30 px-4 py-5 text-xs text-foreground/80 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span>© {new Date().getFullYear()} Secret Haircare Pvt Ltd</span>
          <Link to="/" className="hover:opacity-70">Back to App Suite</Link>
        </div>
      </div>
    </footer>
  );
}

export default WebLayout;
