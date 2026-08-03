import { useState, type FormEvent } from "react";
import { Check, Send, Star, User, MapPin, MessageSquare } from "lucide-react";
import { products } from "@/data/products";
import { submitReview, type ReviewSubmission } from "@/lib/order-service";

export function ReviewForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [form, setForm] = useState<ReviewSubmission>({
    name: "",
    city: "",
    productId: "",
    rating: 5,
    text: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const update = (field: keyof ReviewSubmission, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || !form.productId) return;

    submitReview(form);
    setSubmitted(true);
    onSubmitted?.();

    // Reset after delay
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", city: "", productId: "", rating: 5, text: "" });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="soft-card flex flex-col items-center gap-3 p-6 text-center animate-rise-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-soft">
          <Check className="h-6 w-6 text-leaf" />
        </div>
        <p className="text-sm font-bold">Спасибо за отзыв!</p>
        <p className="text-xs text-muted-foreground">
          Он появится на сайте после модерации.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="soft-card p-6 sm:p-7">
      <h3 className="text-lg font-bold">Оставить отзыв</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Поделитесь опытом — это поможет другим покупателям.
      </p>

      <div className="mt-5 space-y-4">
        {/* Product select */}
        <div>
          <label className="text-sm font-bold">Продукт</label>
          <select
            value={form.productId}
            onChange={(e) => update("productId", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Выберите продукт</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-bold">Оценка</label>
          <div className="mt-1.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => update("rating", star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star} из 5`}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoverRating || form.rating)
                      ? "fill-sun text-sun"
                      : "text-border"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold">
            <User className="h-4 w-4" />
            Имя
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Как вас зовут?"
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* City */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold">
            <MapPin className="h-4 w-4" />
            Город
            <span className="text-xs font-normal text-muted-foreground">(необязательно)</span>
          </label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Москва"
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Review text */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold">
            <MessageSquare className="h-4 w-4" />
            Отзыв
          </label>
          <textarea
            value={form.text}
            onChange={(e) => update("text", e.target.value)}
            placeholder="Расскажите о вашем опыте..."
            required
            rows={4}
            className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!form.name.trim() || !form.text.trim() || !form.productId}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
        Отправить отзыв
      </button>
    </form>
  );
}
