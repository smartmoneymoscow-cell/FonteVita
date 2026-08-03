/**
 * Order service — abstraction layer for order submission.
 *
 * Currently stores orders in localStorage and provides mailto: fallback.
 * Can be swapped for a real API (Stripe, YooKassa, custom backend) by
 * changing the `submitOrder` function implementation.
 */

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
};

export type OrderCustomer = {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment?: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  customer: OrderCustomer;
  total: number;
  createdAt: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
};

const ORDERS_KEY = "fontevita_orders";

function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FV-${date}-${rand}`;
}

/** Save order to localStorage */
function saveOrder(order: Order): void {
  try {
    const existing = localStorage.getItem(ORDERS_KEY);
    const orders: Order[] = existing ? JSON.parse(existing) : [];
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // quota exceeded — silently ignore
  }
}

/** Get all orders from localStorage */
export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Get order by ID */
export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

/** Build mailto: link for order notification */
function buildMailtoLink(order: Order): string {
  const subject = encodeURIComponent(`Заказ ${order.id} — FonteVita`);
  const body = [
    `Заказ: ${order.id}`,
    `Дата: ${new Date(order.createdAt).toLocaleString("ru-RU")}`,
    "",
    "Товары:",
    ...order.items.map(
      (item) => `  • ${item.name} × ${item.qty} = ${(item.price * item.qty).toLocaleString("ru-RU")} ₽`
    ),
    "",
    `Итого: ${order.total.toLocaleString("ru-RU")} ₽`,
    "",
    "Клиент:",
    `  Имя: ${order.customer.name}`,
    `  Телефон: ${order.customer.phone}`,
    `  Email: ${order.customer.email}`,
    `  Адрес: ${order.customer.address}`,
    order.customer.comment ? `  Комментарий: ${order.customer.comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:orders@fontevita.ru?subject=${subject}&encodeURIComponent(body)`;
}

/** Format order as text for clipboard / display */
export function formatOrderText(order: Order): string {
  return [
    `🧾 Заказ ${order.id}`,
    `📅 ${new Date(order.createdAt).toLocaleString("ru-RU")}`,
    "",
    "📦 Товары:",
    ...order.items.map(
      (item) => `  • ${item.name} × ${item.qty} — ${(item.price * item.qty).toLocaleString("ru-RU")} ₽`
    ),
    "",
    `💰 Итого: ${order.total.toLocaleString("ru-RU")} ₽`,
    "",
    "👤 Клиент:",
    `  ${order.customer.name}`,
    `  📱 ${order.customer.phone}`,
    `  ✉️ ${order.customer.email}`,
    `  📍 ${order.customer.address}`,
    order.customer.comment ? `  💬 ${order.customer.comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Validate phone number (Russian format) */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return /^(\+7|8)\d{10}$/.test(cleaned);
}

/** Validate email */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Submit an order.
 *
 * Current implementation:
 * 1. Generates order ID
 * 2. Saves to localStorage
 * 3. Opens mailto: link for notification
 * 4. Copies order text to clipboard
 *
 * To integrate with a real backend, replace the body of this function
 * with an API call (e.g., fetch("/api/orders", { method: "POST", ... }))
 */
export async function submitOrder(
  items: OrderItem[],
  customer: OrderCustomer
): Promise<{ order: Order; orderText: string }> {
  const order: Order = {
    id: generateOrderId(),
    items,
    customer,
    total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  // 1. Persist locally
  saveOrder(order);

  // 2. Build formatted text
  const orderText = formatOrderText(order);

  // 3. Try to copy to clipboard
  try {
    await navigator.clipboard.writeText(orderText);
  } catch {
    // clipboard not available — silently ignore
  }

  // 4. TODO: Replace with real API call
  // await fetch("/api/orders", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(order),
  // });

  return { order, orderText };
}

/**
 * Submit a product review.
 *
 * Currently stores in localStorage.
 * Can be swapped for a real API endpoint.
 */
export type ReviewSubmission = {
  name: string;
  city: string;
  productId: string;
  rating: number;
  text: string;
};

const REVIEWS_KEY = "fontevita_reviews";

export function submitReview(review: ReviewSubmission): void {
  try {
    const existing = localStorage.getItem(REVIEWS_KEY);
    const reviews: (ReviewSubmission & { id: string; createdAt: string })[] =
      existing ? JSON.parse(existing) : [];
    reviews.push({
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    // silently ignore
  }
}

export function getStoredReviews(): (ReviewSubmission & {
  id: string;
  createdAt: string;
})[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
