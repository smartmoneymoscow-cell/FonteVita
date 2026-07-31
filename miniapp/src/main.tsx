import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// Initialize Telegram Web App
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  const params = tg.themeParams;
  if (params.bg_color) document.documentElement.style.setProperty("--tg-bg", params.bg_color);
  if (params.text_color) document.documentElement.style.setProperty("--tg-text", params.text_color);
}

// Mount app and hide preloader
const root = document.getElementById("root")!;
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Fade out preloader after first render
requestAnimationFrame(() => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => preloader.remove(), 600);
    }
  }, 400);
});
