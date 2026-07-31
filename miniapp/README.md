# FonteVita — Telegram Mini App

> ⚠️ **Это НЕ сайт.** Это Telegram Mini App — приложение, которое работает внутри Telegram.
> Сайт находится в корне репозитория (папка `src/` на уровне выше).

Мини-приложение FonteVita для Telegram. Каталог БАДов (коллаген, магний, омега-3) с корзиной и оформлением заказа прямо внутри мессенджера.

## Что это

Telegram Mini App — это веб-приложение, которое открывается внутри Telegram по кнопке. Пользователь не покидает мессенджер, всё работает как нативное приложение.

## Telegram-специфичные фичи

- 📱 **MainButton** — кнопка «Оформить» внизу экрана Telegram, показывается когда есть товары в корзине
- ⬅️ **BackButton** — кнопка «Назад» при открытии корзины
- 📳 **HapticFeedback** — тактильный отклик при добавлении товаров, навигации, оформлении заказа
- 🎨 **Theme integration** — цвета адаптируются под тему пользователя Telegram
- 📐 **Safe areas** — корректные отступы для устройств с вырезами (iPhone и др.)
- 📏 **expand()** — приложение занимает всю высоту экрана Telegram

## Стек

- React 19 + Vite 8
- Tailwind CSS 4
- Telegram Web App SDK (нативный скрипт `telegram-web-app.js`)
- Lucide React (иконки)

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Готовые файлы → `dist/`

## Деплой

### GitHub Pages
При пуше в `main` автоматически деплоется через GitHub Actions (workflow `.github/workflows/deploy.yml`).

### Другие хостинги
Загрузите содержимое `dist/` на любой статический хостинг (Vercel, Netlify, Cloudflare Pages и т.д.).

## Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Установите Mini App URL через `/setmenubutton` → укажите URL вашего приложения
3. Для валидации заказов — настройте бэкенд для проверки `initData`

## Структура

```
miniapp/
├── index.html              # HTML с Telegram Web App SDK
├── package.json
├── vite.config.ts
├── public/                 # Изображения продуктов
│   ├── logo.png
│   ├── collagen.png
│   ├── magnesium.png
│   ├── omega.png
│   └── ...
└── src/
    ├── main.tsx            # Точка входа + инициализация Telegram SDK
    ├── App.tsx             # Главный компонент
    ├── styles.css          # Стили (Tailwind + кастомные)
    ├── hooks/
    │   └── useTelegram.ts  # Хук для Telegram Web App API
    ├── components/
    │   ├── CartContext.tsx  # Контекст корзины
    │   ├── CartPanel.tsx   # Панель корзины + Telegram MainButton
    │   ├── ProductCard.tsx # Карточка товара с haptic feedback
    │   ├── SiteHeader.tsx  # Шапка
    │   ├── Quiz.tsx        # Квиз-подбор добавки
    │   ├── Reviews.tsx     # Отзывы
    │   ├── Faq.tsx         # Частые вопросы
    │   └── Reveal.tsx      # Анимация появления при скролле
    └── data/
        └── products.ts     # Данные о продуктах
```
