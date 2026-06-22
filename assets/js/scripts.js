const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");

if (leadForm && formStatus) {
  leadForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name    = String(formData.get("name")    || "").trim();
    const email   = String(formData.get("email")   || "").trim();
    const project = String(formData.get("project") || "").trim();

    if (!name || !email || !project) {
      formStatus.textContent = "Preencha nome, e-mail e uma breve descrição do projeto.";
      formStatus.style.color = "var(--danger)";
      return;
    }

    const submitBtn = leadForm.querySelector("button[type='submit']");
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
      } else {
        const data = await response.json();
        const errorMsg = data?.errors?.map((e) => e.message).join(", ")
          || "Erro ao enviar. Tente novamente.";
        formStatus.textContent = errorMsg;
        formStatus.style.color = "var(--danger)";
      }
    } catch (err) {
      formStatus.textContent = "Sem conexão. Verifique sua internet e tente novamente.";
      formStatus.style.color = "var(--danger)";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensagem";
    }
  });
}

/* ─── Menu hambúrguer ─────────────────────────────── */

const topnav     = document.querySelector(".topnav");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (topnav && menuToggle && primaryNav) {
  const closeMenu = () => {
    topnav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = topnav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!topnav.contains(event.target)) closeMenu();
  });
}

/* ─── Cookie Consent Banner ────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cookieConsent")) {
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML = `
      <div class="cookie-content">
        <p>Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar navegando, você concorda com a nossa <a href="/privacidade.html">Política de Privacidade</a>.</p>
        <button class="btn btn-primary btn-cookie" id="acceptCookies">Entendi e Aceito</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById("acceptCookies").addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "true");
      banner.classList.add("cookie-hide");
      setTimeout(() => banner.remove(), 500);
    });
  }
});