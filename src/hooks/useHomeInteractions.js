import { useEffect, useState } from "react";

export function useHomeInteractions() {
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem("cookieConsent");
  });

  useEffect(() => {
    const backToTopBtn = document.querySelector("#backToTopBtn");

    if (!backToTopBtn) {
      return undefined;
    }

    const toggleBackToTop = () => {
      backToTopBtn.classList.toggle("is-visible", window.scrollY > 420);
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    backToTopBtn.addEventListener("click", scrollToTop);
    toggleBackToTop();

    return () => {
      window.removeEventListener("scroll", toggleBackToTop);
      backToTopBtn.removeEventListener("click", scrollToTop);
    };
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem("cookieConsent", "true");
    setShowCookieBanner(false);
  };

  return { showCookieBanner, acceptCookies };
}
