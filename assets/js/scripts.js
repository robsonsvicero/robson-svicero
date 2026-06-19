const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");

if (leadForm && formStatus) {
  leadForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const project = String(formData.get("project") || "").trim();

    if (!name || !email || !project) {
      formStatus.textContent = "Preencha nome, e-mail e uma breve descrição do projeto.";
      return;
    }

    const subject = encodeURIComponent("Projeto freelance com Robson Svicero");
    const body = encodeURIComponent(
      `Olá Robson,\n\nMeu nome é ${name}.\nMeu e-mail é ${email}.\n\nQuero conversar sobre este projeto:\n${project}\n\nObrigado.`
    );

    formStatus.textContent = "Mensagem preparada. Seu cliente de e-mail será aberto agora.";
    window.location.href = `mailto:ola@robsonsvicero.com.br?subject=${subject}&body=${body}`;
  });
}

const topnav = document.querySelector(".topnav");
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