import { useState, useEffect } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Check,
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Home,
  Building,
  Mailbox,
  MessageSquare,
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useTelegram } from "@/hooks/useTelegram";
import { formatPrice } from "@/data/products";

type CheckoutForm = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postalCode: string;
  comment: string;
};

function loadProfile(): Partial<CheckoutForm> {
  try {
    const raw = localStorage.getItem("fv_profile");
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function InputField({
  icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
          {label}
          {required && <span className="text-coral"> *</span>}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-0.5 w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/40"
        />
      </div>
    </label>
  );
}

export function CartPage() {
  const { lines, total, count, inc, dec, remove, clear } = useCart();
  const { haptic, hapticSuccess, hapticError } = useTelegram();
  const [ordered, setOrdered] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(() => {
    const p = loadProfile();
    return {
      firstName: p.firstName ?? "",
      lastName: p.lastName ?? "",
      phone: p.phone ?? "",
      city: p.city ?? "",
      street: p.street ?? "",
      building: p.building ?? "",
      apartment: p.apartment ?? "",
      postalCode: p.postalCode ?? "",
      comment: "",
    };
  });

  // Auto-fill from profile when entering checkout
  useEffect(() => {
    if (checkoutMode) {
      const p = loadProfile();
      setForm((f) => ({
        ...f,
        firstName: f.firstName || p.firstName || "",
        lastName: f.lastName || p.lastName || "",
        phone: f.phone || p.phone || "",
        city: f.city || p.city || "",
        street: f.street || p.street || "",
        building: f.building || p.building || "",
        apartment: f.apartment || p.apartment || "",
        postalCode: f.postalCode || p.postalCode || "",
      }));
    }
  }, [checkoutMode]);

  const set = (k: keyof CheckoutForm, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canSubmit = !!(form.firstName && form.phone && form.city && form.street);

  const handleOrder = () => {
    if (!canSubmit) {
      hapticError();
      return;
    }
    hapticSuccess();
    setOrdered(true);
    setCheckoutMode(false);
    // Log order data (ready for backend integration)
    console.log("Order:", {
      items: lines.map((l) => ({ id: l.product.id, qty: l.qty })),
      total: total + (total < 3000 ? 350 : 0),
      customer: form,
      initData: window.Telegram?.WebApp?.initData ?? "",
    });
    clear();
    setTimeout(() => setOrdered(false), 5000);
  };

  // Empty cart (but not after ordering)
  if (lines.length === 0 && !ordered) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="sun-blob flex h-20 w-20 items-center justify-center rounded-full">
          <ShoppingBag className="h-9 w-9" />
        </div>
        <p className="text-base font-semibold text-muted-foreground">
          Корзина пуста
        </p>
        <p className="text-sm text-muted-foreground/70">
          Добавьте витамины из каталога
        </p>
      </div>
    );
  }

  // ============ CHECKOUT FORM ============
  if (checkoutMode) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-4">
        {/* Back button */}
        <button
          onClick={() => {
            haptic("light");
            setCheckoutMode(false);
          }}
          className="mb-4 flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к корзине
        </button>

        <h2 className="mb-4 text-lg font-bold">Оформление заказа</h2>

        {/* Contact info */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-bold text-muted-foreground">
            Контактные данные
          </h3>
          <div className="space-y-2">
            <InputField
              icon={<User className="h-4 w-4" />}
              label="Имя"
              value={form.firstName}
              onChange={(v) => set("firstName", v)}
              placeholder="Иван"
              required
            />
            <InputField
              icon={<User className="h-4 w-4" />}
              label="Фамилия"
              value={form.lastName}
              onChange={(v) => set("lastName", v)}
              placeholder="Иванов"
            />
            <InputField
              icon={<Phone className="h-4 w-4" />}
              label="Телефон"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              placeholder="+7 (999) 123-45-67"
              type="tel"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-bold text-muted-foreground">
            Адрес доставки
          </h3>
          <div className="space-y-2">
            <InputField
              icon={<MapPin className="h-4 w-4" />}
              label="Город"
              value={form.city}
              onChange={(v) => set("city", v)}
              placeholder="Москва"
              required
            />
            <InputField
              icon={<Home className="h-4 w-4" />}
              label="Улица"
              value={form.street}
              onChange={(v) => set("street", v)}
              placeholder="ул. Пушкина"
              required
            />
            <div className="grid grid-cols-3 gap-2">
              <InputField
                icon={<Building className="h-4 w-4" />}
                label="Дом"
                value={form.building}
                onChange={(v) => set("building", v)}
                placeholder="10"
              />
              <InputField
                icon={<Home className="h-4 w-4" />}
                label="Кв"
                value={form.apartment}
                onChange={(v) => set("apartment", v)}
                placeholder="42"
              />
              <InputField
                icon={<Mailbox className="h-4 w-4" />}
                label="Индекс"
                value={form.postalCode}
                onChange={(v) => set("postalCode", v)}
                placeholder="101000"
              />
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold text-muted-foreground">
            Комментарий
          </h3>
          <label className="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
            <span className="shrink-0 pt-0.5 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
            </span>
            <textarea
              value={form.comment}
              onChange={(e) => set("comment", e.target.value)}
              placeholder="Комментарий к заказу (необязательно)"
              rows={2}
              className="w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/40 resize-none"
            />
          </label>
        </div>

        {/* Order summary */}
        <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Товары ({count})</span>
            <span className="font-semibold">{formatPrice(total)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Доставка</span>
            <span className="font-semibold text-leaf">
              {total >= 3000 ? "Бесплатно" : "350 ₽"}
            </span>
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Итого</span>
            <span className="font-display text-2xl font-bold">
              {formatPrice(total + (total < 3000 ? 350 : 0))}
            </span>
          </div>
          <button
            onClick={handleOrder}
            disabled={!canSubmit}
            className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Подтвердить заказ
          </button>
          {!canSubmit && (
            <p className="text-center text-xs text-muted-foreground/70">
              Заполните имя, телефон, город и улицу
            </p>
          )}
        </div>
      </div>
    );
  }

  // ============ CART VIEW ============
  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-4">
      {ordered && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-sky-soft px-4 py-3 text-sm animate-rise-in">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
          <p>Заказ оформлен! Мы свяжемся с вами для подтверждения доставки.</p>
        </div>
      )}

      <h2 className="mb-4 text-lg font-bold">
        Корзина <span className="text-muted-foreground">({count})</span>
      </h2>

      <ul className="space-y-3">
        {lines.map(({ product, qty }) => (
          <li
            key={product.id}
            className="flex gap-3 rounded-2xl border border-border bg-card p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-20 w-20 shrink-0 rounded-xl bg-secondary object-contain"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-sm font-bold">{product.name}</p>
                <button
                  onClick={() => {
                    haptic("light");
                    remove(product.id);
                  }}
                  aria-label={`Удалить ${product.name}`}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {product.capsules}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                  <button
                    onClick={() => {
                      haptic("light");
                      dec(product.id);
                    }}
                    className="rounded-full bg-card p-1 transition-transform hover:scale-110"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">
                    {qty}
                  </span>
                  <button
                    onClick={() => {
                      haptic("light");
                      inc(product.id);
                    }}
                    className="rounded-full bg-card p-1 transition-transform hover:scale-110"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-extrabold">
                  {formatPrice(product.price * qty)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="mt-6 space-y-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Доставка</span>
          <span className="font-semibold text-leaf">
            {total >= 3000 ? "Бесплатно" : "350 ₽"}
          </span>
        </div>
        {total < 3000 && (
          <div className="text-xs text-muted-foreground/70">
            Бесплатная доставка от 3 000 ₽ · осталось{" "}
            <span className="font-bold">{formatPrice(3000 - total)}</span>
          </div>
        )}
        <div className="border-t border-border pt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Итого</span>
          <span className="font-display text-2xl font-bold">
            {formatPrice(total + (total < 3000 ? 350 : 0))}
          </span>
        </div>
        <button
          onClick={() => {
            haptic("medium");
            setCheckoutMode(true);
          }}
          disabled={lines.length === 0}
          className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
