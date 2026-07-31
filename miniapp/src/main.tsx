import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// Initialize Telegram Web App
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  // Apply theme
  document.documentElement.style.setProperty("--tg-bg", tg.themeParams.bg_color || "");
  document.documentElement.style.setProperty("--tg-text", tg.themeParams.text_color || "");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
