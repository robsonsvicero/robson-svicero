import SEO from "../../components/seo/SEO.jsx";

const links = [
  {
    label: "Falar pelo WhatsApp",
    href: "https://wa.me/5511964932007?text=Ol%C3%A1!%20Vi%20seu%20cart%C3%A3o%20digital%20e%20gostaria%20de%20conversar.",
  },
  {
    label: "Visitar meu site",
    href: "https://robsonsvicero.com.br",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/robsonsvicero",
  },
  {
    label: "E-mail",
    href: "mailto:ola@robsonsvicero.com.br",
  },
];

export default function DigitalCard() {
  return (
    <>
      <SEO
        title="Cartao digital interativo | Robson Svicero"
        description="Cartao digital de Robson Svicero com links para WhatsApp, site, Instagram e e-mail."
        path="/cartao"
      />
      <main className="digital-card-page">
        <article className="digital-card" aria-label="Cartao digital interativo">
          <img
            className="digital-card-avatar"
            src="/assets/images/robson-portrait.webp"
            alt="Robson Svicero"
            width="640"
            height="800"
          />
          <h1>Robson Svicero</h1>
          <p className="digital-card-tagline">Desenvolvedor web | UX Designer</p>
          <p className="digital-card-copy">
            Landing Pages, Sites Institucionais e interfaces que combinam estrategia,
            velocidade e clareza.
          </p>

          <div className="digital-card-links">
            {links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer noopener" key={link.label}>
                {link.label}
              </a>
            ))}
          </div>

          <p className="digital-card-footer">&copy; 2026 Robson Svicero</p>
        </article>
      </main>
    </>
  );
}
