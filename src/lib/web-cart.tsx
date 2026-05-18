import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WEB_PRODUCTS, type WebProduct } from "@/lib/web-data";

export type CartLine = { product: WebProduct; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  update: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "secret-web-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return;
      const parsed = JSON.parse(raw) as { id: string; quantity: number }[];
      const restored = parsed
        .map((entry) => {
          const product = WEB_PRODUCTS.find((p) => p.id === entry.id);
          return product ? { product, quantity: entry.quantity } : null;
        })
        .filter((line): line is CartLine => line !== null);
      setLines(restored);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const slim = lines.map((line) => ({ id: line.product.id, quantity: line.quantity }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const add = (productId: string, qty = 1) => {
      const product = WEB_PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      setLines((prev) => {
        const existing = prev.find((line) => line.product.id === productId);
        if (existing) {
          return prev.map((line) =>
            line.product.id === productId
              ? { ...line, quantity: line.quantity + qty }
              : line,
          );
        }
        return [...prev, { product, quantity: qty }];
      });
    };
    const remove = (productId: string) =>
      setLines((prev) => prev.filter((line) => line.product.id !== productId));
    const update = (productId: string, qty: number) =>
      setLines((prev) =>
        prev
          .map((line) =>
            line.product.id === productId ? { ...line, quantity: Math.max(0, qty) } : line,
          )
          .filter((line) => line.quantity > 0),
      );
    const clear = () => setLines([]);
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    return { lines, add, remove, update, clear, count, subtotal };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
