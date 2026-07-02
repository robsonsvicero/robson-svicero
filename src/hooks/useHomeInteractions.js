import { useEffect, useState } from "react";

export function useHomeInteractions() {
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem("cookieConsent");
  });

  useEffect(() => {
    const backToTopBtn = document.querySelector("#backToTopBtn");
    const leadForm = document.querySelector("#leadForm");
    const formStatus = document.querySelector("#formStatus");

    if (!backToTopBtn || !leadForm || !formStatus) {
      return undefined;
    }

    const toggleBackToTop = () => {
      backToTopBtn.classList.toggle("is-visible", window.scrollY > 420);
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const submitLead = async (event) => {
      event.preventDefault();

      const formData = new FormData(leadForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const project = String(formData.get("project") || "").trim();
      const submitBtn = leadForm.querySelector("button[type='submit']");

      if (!name || !email || !project) {
        formStatus.textContent = "Preencha nome, e-mail e uma breve descrição do projeto.";
        formStatus.style.color = "var(--danger)";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      formStatus.textContent = "";
      formStatus.style.color = "var(--muted)";

      try {
        const response = await fetch(leadForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          window.location.href = "/obrigado.html";
          return;
        }

        const data = await response.json();
        formStatus.textContent =
          data?.errors?.map((error) => error.message).join(", ") ||
          "Erro ao enviar. Tente novamente.";
        formStatus.style.color = "var(--danger)";
      } catch {
        formStatus.textContent = "Sem conexão. Verifique sua internet e tente novamente.";
        formStatus.style.color = "var(--danger)";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar mensagem";
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    backToTopBtn.addEventListener("click", scrollToTop);
    leadForm.addEventListener("submit", submitLead);
    toggleBackToTop();

    return () => {
      window.removeEventListener("scroll", toggleBackToTop);
      backToTopBtn.removeEventListener("click", scrollToTop);
      leadForm.removeEventListener("submit", submitLead);
    };
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem("cookieConsent", "true");
    setShowCookieBanner(false);
  };

  return { showCookieBanner, acceptCookies };
}
