"use client";

import Script from "next/script";

const telegramMiniAppInit = `
(() => {
  const tele = window.Telegram?.WebApp;
  if (!tele) return;

  const isTelegramMiniApp =
    typeof tele.platform === "string" && tele.platform.length > 0 && tele.platform !== "unknown";

  try {
    tele.ready?.();
    tele.expand?.();
  } catch {}

  if (!isTelegramMiniApp) return;

  document.documentElement.classList.add("telegram-mini-app");

  const syncTelegramTheme = () => {
    const backgroundColor =
      tele.backgroundColor || tele.themeParams?.bg_color || "#F7F5F0";
    const textColor =
      tele.themeParams?.text_color || "#1A2640";
    const headerColor =
      tele.headerColor || tele.themeParams?.header_bg_color || backgroundColor;

    document.documentElement.style.setProperty("--tg-app-bg", backgroundColor);
    document.documentElement.style.setProperty("--tg-app-text", textColor);
    document.documentElement.style.setProperty("--tg-header-bg", headerColor);
    document.body.style.backgroundColor = backgroundColor;

    const themeMeta = document.querySelector("meta[name='theme-color']");
    if (themeMeta) {
      themeMeta.setAttribute("content", headerColor);
    }
  };

  syncTelegramTheme();
  tele.onEvent?.("themeChanged", syncTelegramTheme);

  window.olisHaptic = (style = "light") => {
    try {
      tele.HapticFeedback?.impactOccurred?.(style);
    } catch {}
  };

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const isPremiumTap = target.closest(
        "button, [role='button'], a, .group img, img[alt*='product' i], img[alt*='dress' i]"
      );

      if (isPremiumTap) window.olisHaptic("light");
    },
    { passive: true }
  );

  const style = document.createElement("style");
  style.textContent = \`
    .telegram-mini-app header {
      display: none !important;
    }

    .telegram-mini-app body {
      background: var(--tg-app-bg, #F7F5F0) !important;
    }
  \`;
  document.head.appendChild(style);

  const showMainButton = ({
    text = "EXPLORE COLLECTION",
    color = "#C5A55A",
    textColor = "#1A2640",
    onClick,
  } = {}) => {
    if (!tele.MainButton) return;

    try {
      tele.MainButton.setParams?.({
        text,
        color,
        text_color: textColor,
        is_visible: true,
        is_active: true,
      });
    } catch {}

    if (window.__olisMainButtonHandler) {
      tele.MainButton.offClick?.(window.__olisMainButtonHandler);
    }

    window.__olisMainButtonHandler =
      onClick ||
      (() => {
        window.olisHaptic("light");
        window.location.href = "/shop";
      });

    try {
      tele.MainButton.onClick?.(window.__olisMainButtonHandler);
      tele.MainButton.show?.();
    } catch {}
  };

  window.showOlisTelegramMainButton = showMainButton;

  const goToShop = () => {
    window.olisHaptic("light");
    window.location.href = "/shop";
  };

  const clickPurchaseButton = () => {
    window.olisHaptic("light");

    const purchaseButton = Array.from(document.querySelectorAll("button, a")).find(
      (element) => element.textContent?.trim().toLowerCase() === "purchase now"
    );

    if (purchaseButton instanceof HTMLElement) {
      purchaseButton.click();
      return;
    }

    window.location.href = "/checkout";
  };

  const syncMainButtonToRoute = () => {
    const path = window.location.pathname;

    if (path === "/") {
      showMainButton({ onClick: goToShop });
      return;
    }

    if (path.startsWith("/products/")) {
      showMainButton({
        text: "PURCHASE NOW",
        onClick: clickPurchaseButton,
      });
      return;
    }

    if (path === "/shop" || path === "/new-arrivals" || path === "/best-sellers") {
      showMainButton({
        text: "EXPLORE COLLECTION",
        onClick: goToShop,
      });
      return;
    }

    try {
      tele.MainButton?.hide?.();
    } catch {}
  };

  const notifyRouteChange = () => {
    window.setTimeout(syncMainButtonToRoute, 0);
  };

  ["pushState", "replaceState"].forEach((methodName) => {
    const original = history[methodName];
    history[methodName] = function (...args) {
      const result = original.apply(this, args);
      notifyRouteChange();
      return result;
    };
  });

  window.addEventListener("popstate", notifyRouteChange);
  syncMainButtonToRoute();
})();
`;

export default function TelegramMiniAppInit() {
  return (
    <Script id="telegram-mini-app-init" strategy="afterInteractive">
      {telegramMiniAppInit}
    </Script>
  );
}
