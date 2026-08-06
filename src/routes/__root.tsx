import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoAsset from "../assets/logo-mark.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FonteVita — витамины и БАДы для всей семьи" },
      {
        name: "description",
        content:
          "FonteVita: коллаген, магний + B6 и омега 3 в проверенных дозировках. Сертифицированные БАДы для энергии, спокойствия и красоты. Доставка по России.",
      },
      { property: "og:site_name", content: "FonteVita" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "FonteVita — витамины и БАДы для всей семьи" },
      {
        property: "og:description",
        content:
          "Коллаген, магний + B6 и омега 3 в честных дозировках. Сертифицированное качество FonteVita. Доставка по России.",
      },
      { property: "og:url", content: "https://fontevita.ru/" },
      {
        property: "og:image",
        content:
          "https://fontevita.ru/__l5e/assets-v1/ace176ff-1b22-489c-a209-196f67f2c7b6/logo-mark.png",
      },
      { property: "og:locale", content: "ru_RU" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FonteVita — витамины и БАДы для всей семьи" },
      {
        name: "twitter:description",
        content:
          "Коллаген, магний + B6 и омега 3 в честных дозировках. Сертифицированное качество.",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#f5a623" },
      { name: "author", content: "FonteVita" },
      {
        name: "keywords",
        content:
          "FonteVita, витамины, БАДы, коллаген, магний, омега 3, добавки, здоровье, Россия",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Nunito:wght@400;600;700;800&display=swap",
      },
      { rel: "icon", href: logoAsset.url, type: "image/png" },
      { rel: "apple-touch-icon", href: logoAsset.url },
      { rel: "canonical", href: "https://fontevita.ru/" },
      { rel: "alternate", hrefLang: "ru", href: "https://fontevita.ru/" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function ReplainWidget() {
  useEffect(() => {
    (window as any).replainSettings = { id: 'bdfb7302-81d5-4ce8-bf9b-d92aa1020761' };
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://widget.replain.cc/dist/client.js';
    document.body.appendChild(s);
  }, []);
  return null;
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <ReplainWidget />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
