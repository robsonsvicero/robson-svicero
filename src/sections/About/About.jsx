import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contactLinks, homeAboutContent } from "../../content/siteContent.js";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
      <path d="M20.52 3.48A11.83 11.83 0 0 0 12.01 0C5.4 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.58 5.97L0 24l6.18-1.62a11.96 11.96 0 0 0 5.82 1.5h.01C18.63 23.88 24 18.51 24 11.89c0-3.21-1.25-6.22-3.48-8.41Zm-8.51 18.3h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.93 9.93 0 0 1 2.52 12C2.52 6.8 6.76 2.56 11.99 2.56c2.53 0 4.9.99 6.67 2.77a9.37 9.37 0 0 1 2.77 6.63c0 5.21-4.24 9.82-9.42 9.82Zm5.5-7.06c-.3-.15-1.75-.86-2.02-.95-.27-.1-.46-.15-.66.15-.19.3-.76.95-.93 1.14-.17.19-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.53-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.45s1.03 2.85 1.18 3.05c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.75-.72 2-1.41.24-.69.24-1.28.17-1.41-.07-.14-.26-.22-.56-.37Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.14 6.27-1.89 8.91c-.14.63-.52.79-1.05.49l-2.9-2.13-1.4 1.35c-.15.15-.28.28-.58.28l.21-2.94 5.35-4.83c.23-.2-.05-.31-.35-.11L7.76 12.4l-2.9-.9c-.63-.2-.64-.63.13-.94l11.38-4.39c.53-.2 1 .12.82.92Z" />
    </svg>
  );
}

export default function About() {
  const { eyebrow, title, description, complement, highlights, image, primaryCta, secondaryCta } = homeAboutContent;
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const contactMenuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target)) {
        setIsContactMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <Section
      className="home-about-section"
      data-od-id="sobre-resumo"
      aria-labelledby="home-about-title"
      containerClassName="container home-about-layout"
    >
      <figure className="home-about-media">
        <img src={image.src} alt={image.alt} title={image.alt} loading="lazy" decoding="async" />
      </figure>
      <div className="home-about-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="home-about-title">{title}</h2>
        <p className="lead">{description}</p>
        <p>{complement}</p>
        <ul className="home-about-highlights" aria-label="Principais áreas de atuação">
          {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <div className="home-about-actions">
          <Button as={Link} to={primaryCta.to} variant="dark" title={primaryCta.label}>{primaryCta.label}</Button>

          <div className="home-about-cta-menu" ref={contactMenuRef}>
            <button
              type="button"
              className="topnav-cta home-about-cta-trigger"
              aria-label="Abrir opções de contato"
              title={secondaryCta.label}
              aria-expanded={isContactMenuOpen}
              aria-haspopup="menu"
              onClick={(event) => {
                event.stopPropagation();
                setIsContactMenuOpen((current) => !current);
              }}
            >
              <span className="topnav-cta-text">
                <strong>{secondaryCta.label}</strong>
              </span>
            </button>

            {isContactMenuOpen && (
              <div className="topnav-cta-popover home-about-cta-popover" role="menu" aria-label="Opções de contato">
                <p className="topnav-cta-popover-title">Como você prefere falar comigo?</p>

                <a
                  className="topnav-cta-option"
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  role="menuitem"
                  onClick={() => setIsContactMenuOpen(false)}
                >
                  <span className="topnav-cta-option-icon topnav-cta-option-icon--whatsapp" aria-hidden="true">
                    <WhatsAppIcon />
                  </span>
                  <span className="topnav-cta-option-copy">
                    <strong>WhatsApp</strong>
                    <span>Conversar pelo WhatsApp</span>
                  </span>
                </a>

                <a
                  className="topnav-cta-option"
                  href={contactLinks.telegram}
                  target="_blank"
                  rel="noreferrer noopener"
                  role="menuitem"
                  onClick={() => setIsContactMenuOpen(false)}
                >
                  <span className="topnav-cta-option-icon topnav-cta-option-icon--telegram" aria-hidden="true">
                    <TelegramIcon />
                  </span>
                  <span className="topnav-cta-option-copy">
                    <strong>Telegram</strong>
                    <span>Conversar pelo Telegram</span>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
