"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = { productId: number; quantity: number };
type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gustulegeei-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed.filter((x) => Number.isInteger(x.productId) && Number.isInteger(x.quantity) && x.quantity > 0));
      }
    } catch { /* Ignore invalid local cart data. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: (productId) => setItems((current) => {
      const found = current.find((item) => item.productId === productId);
      return found
        ? current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item)
        : [...current, { productId, quantity: 1 }];
    }),
    setQuantity: (productId, quantity) => setItems((current) => quantity <= 0
      ? current.filter((item) => item.productId !== productId)
      : current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(Math.floor(quantity), 99) } : item)),
    remove: (productId) => setItems((current) => current.filter((item) => item.productId !== productId)),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart trebuie folosit în interiorul CartProvider.");
  return context;
}
