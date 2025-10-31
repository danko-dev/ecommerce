import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useUser();
  const currentKeyRef = useRef(null);

  const getStorageKey = () => (user?.id ? `cart:${user.id}` : "cart:guest");
  const readStoredCart = (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
  const writeStoredCart = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  // On first mount and whenever user changes, hydrate from the appropriate key.
  // If logging in, merge guest cart into user cart once.
  useEffect(() => {
    const nextKey = getStorageKey();
    const prevKey = currentKeyRef.current;

    if (prevKey === null) {
      // initial load
      const initial = readStoredCart(nextKey);
      setCart(Array.isArray(initial) ? initial : []);
      currentKeyRef.current = nextKey;
      return;
    }

    if (prevKey !== nextKey) {
      // user context switched (guest -> user or user -> guest)
      const fromGuestToUser = prevKey === "cart:guest" && nextKey !== "cart:guest";
      if (fromGuestToUser) {
        const guest = readStoredCart("cart:guest");
        const userExisting = readStoredCart(nextKey);
        // merge by product id, summing qty
        const idToItem = new Map();
        [...userExisting, ...guest].forEach((item) => {
          const existing = idToItem.get(item.id);
          if (existing) {
            idToItem.set(item.id, { ...existing, qty: (existing.qty || 1) + (item.qty || 1) });
          } else {
            idToItem.set(item.id, { ...item, qty: item.qty || 1 });
          }
        });
        const merged = Array.from(idToItem.values());
        setCart(merged);
        writeStoredCart(nextKey, merged);
        try { localStorage.removeItem("cart:guest"); } catch {}
      } else {
        // switching user->guest or between users: load target cart
        const target = readStoredCart(nextKey);
        setCart(Array.isArray(target) ? target : []);
      }
      currentKeyRef.current = nextKey;
    }
  }, [user]);

  // persist to localStorage on change
  useEffect(() => {
    const key = getStorageKey();
    currentKeyRef.current = key;
    writeStoredCart(key, cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => {
    const total = cart.reduce((sum, p) => sum + p.price * (p.qty || 1), 0);
    const count = cart.reduce((sum, p) => sum + (p.qty || 1), 0);
    return { cart, addToCart, removeFromCart, updateQty, clearCart, total, count };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
