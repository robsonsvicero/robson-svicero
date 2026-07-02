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
        <NavLink className="logo" to="/" aria-label="Robson Svicero - Início">
          <img
            src={logo.src}
            alt={logo.alt}
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
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button
          className="topnav-cta"
          href={cta.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {cta.label}
        </Button>
      </div>
    </header>
  );
}
