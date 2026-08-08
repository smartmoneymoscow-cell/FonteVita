# FonteVita — витамины и БАДы для всей семьи

Современный одностраничный сайт бренда FonteVita с каталогом БАдов, интерактивным подбором, корзиной и оформлением заказа.

## 🌐 Live

- **GitHub Pages**: https://smartmoneymoscow-cell.github.io/FonteVita/
- **Lovable**: https://fontevita-vitality-hub.lovable.app

## Технологии

| Технология | Версия | Назначение |
|---|---|---|
| React | 19 | UI-фреймворк |
| TanStack Start | 1.x | SSR, роутинг, серверные функции |
| TanStack Router | 1.x | Файловый роутинг |
| TanStack Query | 5.x | Асинхронное состояние |
| Tailwind CSS | 4 | Утилитарные стили |
| Lucide React | — | Иконки |
| Vite | 8 | Сборка и dev-сервер |
| TypeScript | 5.8 | Типизация |

## Структура проекта

```
src/
├── assets/                        # Изображения баночек, логотип, аватары
├── components/
│   ├── blog/
│   │   ├── article-card.tsx       # Карточка статьи для списков
│   │   ├── article-content.tsx    # Контент статьи (блоки)
│   │   ├── article-cover.tsx      # Обложка статьи
│   │   ├── article-faq.tsx        # FAQ внутри статьи
│   │   ├── blog-header.tsx        # Шапка блога
│   │   ├── breadcrumbs.tsx        # Хлебные крошки
│   │   ├── category-pill.tsx      # Бейдж категории
│   │   ├── related-products.tsx   # Рекомендованные товары
│   │   └── table-of-contents.tsx  # Оглавление статьи
│   ├── cart-context.tsx           # Контекст корзины с localStorage
│   ├── cart-panel.tsx             # Боковая панель корзины
│   ├── checkout-form.tsx          # Форма оформления заказа
│   ├── faq.tsx                    # Аккордеон FAQ
│   ├── hero-bottles.tsx           # Анимированные баночки на главной
│   ├── product-card.tsx           # Карточка товара с раскрытием
│   ├── quiz.tsx                   # Интерактивный подбор БАДа
│   ├── reveal.tsx                 # Анимация появления (Intersection Observer)
│   ├── reviews.tsx                # Карточки отзывов
│   ├── site-footer.tsx            # Подвал сайта
│   └── site-header.tsx            # Шапка сайта
├── data/
│   ├── blog-categories.ts         # Категории блога
│   ├── blog-posts.ts              # Статьи блога
│   └── products.ts                # Данные о продуктах (цены, состав, дозировки)
├── hooks/
│   └── use-mobile.tsx             # Определение мобильного устройства
├── lib/
│   ├── error-capture.ts           # Перехват ошибок
│   ├── error-page.ts              # Страница ошибки
│   ├── lovable-error-reporting.ts # Отчёт об ошибках
│   ├── order-service.ts           # Сервис оформления заказов
│   └── seo-schema.ts              # JSON-LD схемы для SEO
├── routes/
│   ├── __root.tsx                 # Корневой layout (шрифты, мета, 404)
│   ├── account.tsx                # Личный кабинет
│   ├── blog/
│   │   ├── index.tsx              # Список статей блога
│   │   ├── $slug.tsx              # Страница отдельной статьи
│   │   └── category/$category.tsx # Статьи по категории
│   └── index.tsx                  # Главная страница
├── styles.css                     # Глобальные стили, тема, анимации
├── router.tsx                     # Конфигурация TanStack Router
├── server.ts                      # SSR entry point
└── start.ts                       # TanStack Start instance

miniapp/                           # Telegram Mini App
├── src/
│   ├── App.tsx                    # Корневой компонент
│   ├── components/                # UI-компоненты мини-приложения
│   ├── data/products.ts           # Данные о продуктах
│   ├── hooks/useTelegram.ts       # Хук Telegram WebApp API
│   └── styles.css                 # Стили мини-приложения
└── package.json
```

## Продукты

| Продукт | Дозировка | Капсулы | Цена |
|---|---|---|---|
| Коллаген | 2000 мг коллагена + 160 мг витамина C | 120 | 1 490 ₽ |
| Магний + B6 | 2010 мг хелата магния + 6 мг B6 | 120 | 1 190 ₽ |
| Омега 3 | 3000 мг липидного комплекса | 180 | 1 690 ₽ |

## Возможности

- **Карточки товаров** — раскрытие с деталями (состав, дозировка, приём), кнопка «В корзину» с анимацией перелёта
- **Корзина** — боковая панель с изменением количества, удалением, итогом и оформлением заказа, сохраняется в localStorage
- **Подбор за 30 секунд** — интерактивный квиз из 3 вопросов с рекомендацией продукта
- **Качество и подлинность** — блок о защите упаковки и инструкция проверки через «Честный знак»
- **Отзывы** — карточки покупателей с оценками
- **FAQ** — аккордеон с частыми вопросами
- **SEO** — мета-теги Open Graph, JSON-LD Schema.org, canonical URL
- **Адаптивность** — мобильная и десктопная вёрстка
- **Анимации** — плавное появление блоков (Intersection Observer), парящие баночки, pop-бейджи

## Разработка

```sh
git clone https://github.com/smartmoneymoscow-cell/FonteVita.git
cd FonteVita
npm i
npm run dev
```

## Деплой

Автоматический на GitHub Pages при пуше в `main` через GitHub Actions.

## Лицензия

© 2026 FonteVita. Все права защищены.

> БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со специалистом.
