/// <reference types="vite/client" />

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
