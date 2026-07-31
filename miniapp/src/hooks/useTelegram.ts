import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready(): void;
        expand(): void;
        close(): void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          setParams(params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }): void;
          onClick(fn: () => void): void;
          offClick(fn: () => void): void;
        };
        BackButton: {
          isVisible: boolean;
          show(): void;
          hide(): void;
          onClick(fn: () => void): void;
          offClick(fn: () => void): void;
        };
        HapticFeedback: {
          impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
          notificationOccurred(type: "error" | "success" | "warning"): void;
          selectionChanged(): void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
          header_bg_color?: string;
          accent_text_color?: string;
          section_bg_color?: string;
          section_header_text_color?: string;
          subtitle_text_color?: string;
          destructive_text_color?: string;
        };
        initData: string;
        initDataUnsafe: Record<string, unknown>;
        colorScheme: "light" | "dark";
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        platform: string;
      };
    };
  }
}

export function useTelegram() {
  const tg = window.Telegram?.WebApp;
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!tg) return;
    tg.ready();
    tg.expand();
    setColorScheme(tg.colorScheme);

    // Apply Telegram theme colors to CSS variables
    const params = tg.themeParams;
    if (params.bg_color) {
      document.documentElement.style.setProperty("--tg-bg", params.bg_color);
    }
    if (params.text_color) {
      document.documentElement.style.setProperty("--tg-text", params.text_color);
    }
    if (params.hint_color) {
      document.documentElement.style.setProperty("--tg-hint", params.hint_color);
    }
    if (params.button_color) {
      document.documentElement.style.setProperty("--tg-button", params.button_color);
    }
    if (params.button_text_color) {
      document.documentElement.style.setProperty("--tg-button-text", params.button_text_color);
    }
    if (params.secondary_bg_color) {
      document.documentElement.style.setProperty("--tg-secondary-bg", params.secondary_bg_color);
    }
  }, [tg]);

  const haptic = useCallback(
    (style: "light" | "medium" | "heavy" | "rigid" | "soft" = "light") => {
      tg?.HapticFeedback.impactOccurred(style);
    },
    [tg],
  );

  const hapticSuccess = useCallback(() => {
    tg?.HapticFeedback.notificationOccurred("success");
  }, [tg]);

  const hapticError = useCallback(() => {
    tg?.HapticFeedback.notificationOccurred("error");
  }, [tg]);

  const hapticSelection = useCallback(() => {
    tg?.HapticFeedback.selectionChanged();
  }, [tg]);

  return {
    tg,
    colorScheme,
    haptic,
    hapticSuccess,
    hapticError,
    hapticSelection,
    themeParams: tg?.themeParams,
    platform: tg?.platform ?? "unknown",
    isExpanded: tg?.isExpanded ?? true,
  };
}
