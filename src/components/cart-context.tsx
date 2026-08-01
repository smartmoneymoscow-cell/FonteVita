import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, type Product, type ProductId } from "@/data/products";

export type CartLine = { product: Product; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: ProductId) => void;
  inc: (id: ProductId) => void;
  dec: (id: ProductId) => void;
  remove: (id: ProductId) => void;
  clear: () => void;
};

const STORAGE_KEY = "fontevita-cart";

function loadStoredItems(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed;
  } catch {
    return {};
  }
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>(loadStoredItems);
  const [open, setOpen] = useState(false);
  const skipSave = useRef(true);

  // Persist to localStorage (skip initial render since we just loaded)
  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // quota exceeded — silently ignore
    }
  }, [items]);

  const add = useCallback((id: ProductId) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);
  const inc = add;
  const dec = useCallback((id: ProductId) => {
    setItems((prev) => {
      const next = { ...prev };
      const q = (next[id] ?? 0) - 1;
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  }, []);
  const remove = useCallback((id: ProductId) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);
  const clear = useCallback(() => {
    setItems({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const lines = useMemo(
    () =>
      Object.entries(items)
        .map(([id, qty]) => {
          const product = products.find((p) => p.id === id);
          return product ? { product, qty } : null;
        })
        .filter(Boolean) as CartLine[],
    [items],
  );

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0);

  return (
    <Ctx.Provider value={{ lines, count, total, open, setOpen, add, inc, dec, remove, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
