import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Button, { TrajectoryArrow } from "../../ui/Button/Button.jsx";
import { contactLinks, headerContent } from "../../../content/siteContent.js";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true" width="20" height="20" fill="currentColor">
      <path d="M20.52 3.48A11.83 11.83 0 0 0 12.01 0C5.4 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.58 5.97L0 24l6.18-1.62a11.96 11.96 0 0 0 5.82 1.5h.01C18.63 23.88 24 18.51 24 11.89c0-3.21-1.25-6.22-3.48-8.41Zm-8.51 18.3h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.93 9.93 0 0 1 2.52 12C2.52 6.8 6.76 2.56 11.99 2.56c2.53 0 4.9.99 6.67 2.77a9.37 9.37 0 0 1 2.77 6.63c0 5.21-4.24 9.82-9.42 9.82Zm5.5-7.06c-.3-.15-1.75-.86-2.02-.95-.27-.1-.46-.15-.66.15-.19.3-.76.95-.93 1.14-.17.19-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.53-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.45s1.03 2.85 1.18 3.05c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.75-.72 2-1.41.24-.69.24-1.28.17-1.41-.07-.14-.26-.22-.56-.37Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.14 6.27-1.89 8.91c-.14.63-.52.79-1.05.49l-2.9-2.13-1.4 1.35c-.15.15-.28.28-.58.28l.21-2.94 5.35-4.83c.23-.2-.05-.31-.35-.11L7.76 12.4l-2.9-.9c-.63-.2-.64-.63.13-.94l11.38-4.39c.53-.2 1 .12.82.92Z" />
    </svg>
  );
}

export default function Header() {
  const { logo, navItems, cta } = headerContent;
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactPopoverOpen, setIsContactPopoverOpen] = useState(false);
  const contactPopoverRef = useRef(null);

  const isHomePage = location.pathname === "/";
  const isOverDark = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile overlay on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
    setIsContactPopoverOpen(false);
  }, [location.pathname]);

  // Handle escape and outside clicks
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsContactPopoverOpen(false);
        setOpenSubmenu(null);
      }
    };

    const handleClickOutside = (event) => {
      if (contactPopoverRef.current && !contactPopoverRef.current.contains(event.target)) {
        setIsContactPopoverOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Prevent background scroll when mobile overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`navbar ${isOverDark ? "navbar--over-dark" : ""} ${isScrolled ? "is-scrolled" : ""}`.trim()}
        id="navbar"
        aria-label="Navegação principal"
      >
        <div className="container navbar_inner">
          {/* Logo */}
          <NavLink
            className="navbar_logo"
            to="/"
            aria-label="Robson Svicero — Criação de sites profissionais"
            title="Ir para o início"
          >
            <img
              src={isOverDark || isScrolled ? logo.src : "/assets/images/logo_azul.svg"}
              alt="Robson Svicero"
              className="navbar_logo-img"
              width="200"
              height="30"
            />
          </NavLink>

          {/* Desktop Nav Menu */}
          <nav className="navbar_menu" aria-label="Menu principal">
            {navItems.map((item) => {
              if (item.items?.length) {
                const isSubmenuOpen = openSubmenu === item.label;

                return (
                  <div
                    className="navbar_item navbar_item--has-dropdown"
                    key={`${item.label}-${item.to}`}
                    onMouseEnter={() => setOpenSubmenu(item.label)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <NavLink
                      className="navbar_link"
                      to={item.to}
                      title={item.label}
                    >
                      {item.label}
                      <svg
                        className={`navbar_caret ${isSubmenuOpen ? "is-open" : ""}`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </NavLink>

                    {isSubmenuOpen && (
                      <div className="navbar_dropdown" role="menu">
                        {item.items.map((subItem) => (
                          <NavLink
                            key={`${item.label}-${subItem.label}-${subItem.to}`}
                            className="navbar_dropdown-link"
                            to={subItem.to}
                            role="menuitem"
                            title={subItem.label}
                            onClick={() => setOpenSubmenu(null)}
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={`${item.label}-${item.to}`}
                  className="navbar_link"
                  to={item.to}
                  end={item.to === "/"}
                  title={item.label}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Actions: CTA & Hamburger */}
          <div className="navbar_actions">
            <div className="navbar_cta-wrap" ref={contactPopoverRef}>
              <Button
                variant="primary"
                size="sm"
                className="navbar_cta-link"
                aria-label={cta.label}
                aria-haspopup="menu"
                aria-expanded={isContactPopoverOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContactPopoverOpen((prev) => !prev);
                }}
              >
                Falar com Especialista
              </Button>

              {isContactPopoverOpen && (
                <div className="navbar_popover" role="menu" aria-label="Canais de contato">
                  <p className="navbar_popover-title">Como prefere conversar?</p>
                  <a
                    className="navbar_popover-item"
                    href={contactLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                    role="menuitem"
                    onClick={() => setIsContactPopoverOpen(false)}
                  >
                    <span className="navbar_popover-icon navbar_popover-icon--whatsapp">
                      <WhatsAppIcon />
                    </span>
                    <div className="navbar_popover-copy">
                      <strong>WhatsApp</strong>
                      <span>Conversar em tempo real</span>
                    </div>
                  </a>
                  <a
                    className="navbar_popover-item"
                    href={contactLinks.telegram}
                    target="_blank"
                    rel="noreferrer noopener"
                    role="menuitem"
                    onClick={() => setIsContactPopoverOpen(false)}
                  >
                    <span className="navbar_popover-icon navbar_popover-icon--telegram">
                      <TelegramIcon />
                    </span>
                    <div className="navbar_popover-copy">
                      <strong>Telegram</strong>
                      <span>Mensagem direta segura</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              className={`navbar_hamburger ${isOpen ? "is-open" : ""}`}
              id="nav-toggle"
              type="button"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Trajectory Fullscreen Mobile Overlay */}
      <div
        className={`navbar_overlay ${isOpen ? "is-open" : ""}`}
        id="navOverlay"
        aria-hidden={!isOpen}
      >
        <div className="navbar_overlay-inner">
          <nav className="navbar_overlay-menu" aria-label="Navegação mobile">
            {navItems.map((item) => (
              <div key={`mobile-${item.label}-${item.to}`} className="navbar_overlay-group">
                <NavLink
                  className="navbar_overlay-link"
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
                {item.items && (
                  <div className="navbar_overlay-subitems">
                    {item.items.map((sub) => (
                      <NavLink
                        key={`mob-sub-${sub.to}`}
                        to={sub.to}
                        className="navbar_overlay-sublink"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="navbar_overlay-foot">
            <Button
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="navbar_overlay-cta"
              onClick={() => setIsOpen(false)}
            >
              Vamos Conversar
            </Button>

            <div className="navbar_overlay-channels">
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="navbar_overlay-chip"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
              <a
                href={contactLinks.telegram}
                target="_blank"
                rel="noreferrer noopener"
                className="navbar_overlay-chip"
              >
                <TelegramIcon />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
