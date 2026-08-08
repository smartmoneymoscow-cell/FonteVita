import { useState, useEffect } from "react";
import { Package, Clock, CheckCircle2, Truck, ChevronRight, ShoppingBag } from "lucide-react";
import { useTelegram } from "@/hooks/useTelegram";
import { formatPrice } from "@/data/products";

export type Order = {
  id: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipping" | "delivered";
};

const statusLabels: Record<Order["status"], { label: string; color: string; icon: typeof Package }> = {
  pending: { label: "Ожидает подтверждения", color: "text-sun bg-sun-soft", icon: Clock },
  confirmed: { label: "Подтверждён", color: "text-sky bg-sky-soft", icon: CheckCircle2 },
  shipping: { label: "В доставке", color: "text-primary bg-sun-soft", icon: Truck },
  delivered: { label: "Доставлен", color: "text-leaf bg-sky-soft", icon: CheckCircle2 },
};

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem("fv_orders");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function OrdersPage() {
  const { haptic } = useTelegram();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="sun-blob flex h-20 w-20 items-center justify-center rounded-full">
          <Package className="h-9 w-9" />
        </div>
        <p className="text-base font-semibold text-muted-foreground">
          Нет заказов
        </p>
        <p className="text-sm text-muted-foreground/70">
          Ваши заказы будут отображаться здесь
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-4">
      <h2 className="mb-4 text-lg font-bold">Мои заказы</h2>

      <div className="space-y-3">
        {orders.map((order) => {
          const status = statusLabels[order.status];
          const StatusIcon = status.icon;
          return (
            <button
              key={order.id}
              onClick={() => haptic("light")}
              className="w-full rounded-2xl border border-border bg-card p-4 text-left transition-all active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">
                      #{order.id.slice(-6).toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${status.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold">
                    {order.items.map((i) => i.name).join(", ")}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {order.items.length} {order.items.length === 1 ? "товар" : "товаров"} · {formatPrice(order.total)}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground/70">
                <Clock className="h-3 w-3" />
                {new Date(order.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper to save an order (used by CartPage)
export function saveOrder(order: Order) {
  try {
    const raw = localStorage.getItem("fv_orders");
    const orders: Order[] = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem("fv_orders", JSON.stringify(orders));
  } catch {}
}
