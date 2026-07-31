import { useState, useEffect } from "react";
import { User, Phone, AtSign, LogOut, Edit3, Check, X } from "lucide-react";
import { useTelegram } from "@/hooks/useTelegram";

type ProfileData = {
  firstName: string;
  lastName: string;
  phone: string;
};

export function ProfilePage() {
  const { tg, haptic, hapticSuccess } = useTelegram();

  const tgUser = tg?.initDataUnsafe?.user as
    | {
        id?: number;
        first_name?: string;
        last_name?: string;
        username?: string;
        photo_url?: string;
        is_premium?: boolean;
      }
    | undefined;

  const [profile, setProfile] = useState<ProfileData>({
    firstName: tgUser?.first_name ?? "",
    lastName: tgUser?.last_name ?? "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("fv_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {}
    }
  }, []);

  const handleSave = () => {
    haptic("medium");
    localStorage.setItem("fv_profile", JSON.stringify(profile));
    setEditing(false);
    hapticSuccess();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    haptic("light");
    const savedProfile = localStorage.getItem("fv_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {}
    } else {
      setProfile({
        firstName: tgUser?.first_name ?? "",
        lastName: tgUser?.last_name ?? "",
        phone: "",
      });
    }
    setEditing(false);
  };

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-6">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {tgUser?.photo_url ? (
            <img
              src={tgUser.photo_url}
              alt="Аватар"
              className="h-24 w-24 rounded-full object-cover ring-4 ring-sun-soft"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sun-soft ring-4 ring-sun-soft/50">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          {tgUser?.is_premium && (
            <span className="absolute -bottom-1 -right-1 rounded-full bg-sun px-2 py-0.5 text-[10px] font-bold shadow-soft">
              ⭐ Premium
            </span>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">
            {profile.firstName} {profile.lastName}
          </h2>
          {tgUser?.username && (
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <AtSign className="h-3.5 w-3.5" />
              {tgUser.username}
            </p>
          )}
        </div>
      </div>

      {/* Saved notification */}
      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-sky-soft px-4 py-3 text-sm animate-rise-in">
          <Check className="h-4 w-4 text-leaf" />
          Данные сохранены
        </div>
      )}

      {/* Profile form */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Личные данные</h3>
          {!editing ? (
            <button
              onClick={() => {
                haptic("light");
                setEditing(true);
              }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Edit3 className="h-4 w-4" />
              Изменить
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:brightness-105"
              >
                <Check className="h-4 w-4" />
                Сохранить
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Field
            icon={<User className="h-4 w-4" />}
            label="Имя"
            value={profile.firstName}
            editing={editing}
            onChange={(v) => setProfile((p) => ({ ...p, firstName: v }))}
            placeholder="Введите имя"
          />
          <Field
            icon={<User className="h-4 w-4" />}
            label="Фамилия"
            value={profile.lastName}
            editing={editing}
            onChange={(v) => setProfile((p) => ({ ...p, lastName: v }))}
            placeholder="Введите фамилию"
          />
          <Field
            icon={<Phone className="h-4 w-4" />}
            label="Телефон"
            value={profile.phone}
            editing={editing}
            onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
            placeholder="+7 (___) ___-__-__"
            type="tel"
          />
        </div>
      </div>

      {/* Order history placeholder */}
      <div className="mt-10">
        <h3 className="text-lg font-bold">Заказы</h3>
        <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-8 text-center">
          <Package className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">У вас пока нет заказов</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
  editing,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </span>
        {editing ? (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-0.5 w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/40"
          />
        ) : (
          <span className="mt-0.5 block text-sm font-semibold text-foreground">
            {value || <span className="text-muted-foreground/40">{placeholder}</span>}
          </span>
        )}
      </div>
    </label>
  );
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
