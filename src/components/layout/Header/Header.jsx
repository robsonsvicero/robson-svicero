import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button/Button.jsx";
import { headerContent } from "../../../content/siteContent.js";

export default function Header() {
  const { logo, navItems, cta } = headerContent;
  const [isOpen, setIsOpen] = useState(false);
  const topnavRef = useRef(null);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 920) setIsOpen(false);
    };

    const closeOnOutsideClick = (event) => {
      if (!topnavRef.current?.contains(event.target)) setIsOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    document.addEventListener("click", closeOnOutsideClick);

    return () => {
      window.removeEventListener("resize", closeOnDesktop);
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, []);

  return (
    <header
      className={`topnav ${isOpen ? "open" : ""}`.trim()}
      data-od-id="topnav"
      ref={topnavRef}
    >
      <div className="container topnav-inner">
        <NavLink className="logo" to="/" aria-label="Robson Svicero - Início" title="Ir para o início">
          <img
            src={logo.src}
            alt={logo.alt}
            title={logo.alt}
            width={logo.width}
            height={logo.height}
          />
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Abrir menu de navegacao"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="toggle-bar1" />
          <span className="toggle-bar2" />
          <span className="toggle-bar3" />
        </button>

        <nav id="primary-nav" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <NavLink
              key={`${item.label}-${item.to}`}
              to={item.to}
              end={item.to === "/"}
              title={`Ir para ${item.label}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button
          className="topnav-cta topnav-cta-whatsapp"
          href={cta.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${cta.label} ${cta.phone}`}
          title={`${cta.label} pelo WhatsApp`}
        >
          <span className="topnav-cta-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M20.52 3.48A11.83 11.83 0 0 0 12.01 0C5.4 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.58 5.97L0 24l6.18-1.62a11.96 11.96 0 0 0 5.82 1.5h.01C18.63 23.88 24 18.51 24 11.89c0-3.21-1.25-6.22-3.48-8.41Zm-8.51 18.3h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.93 9.93 0 0 1 2.52 12C2.52 6.8 6.76 2.56 11.99 2.56c2.53 0 4.9.99 6.67 2.77a9.37 9.37 0 0 1 2.77 6.63c0 5.21-4.24 9.82-9.42 9.82Zm5.5-7.06c-.3-.15-1.75-.86-2.02-.95-.27-.1-.46-.15-.66.15-.19.3-.76.95-.93 1.14-.17.19-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.53-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.45s1.03 2.85 1.18 3.05c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.75-.72 2-1.41.24-.69.24-1.28.17-1.41-.07-.14-.26-.22-.56-.37Z" />
            </svg>
          </span>
          <span className="topnav-cta-text">
            <strong>{cta.label}</strong>
            <span>{cta.phone}</span>
          </span>
        </Button>
      </div>
    </header>
  );
}
