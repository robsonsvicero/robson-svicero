import { useState } from "react";
import "./AnnouncementBar.css";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      className="announcement-bar"
      role="region"
      aria-label="Aviso promocional"
    >
      <div className="container announcement-bar__inner">
        <div className="announcement-bar__content">
          <span className="announcement-bar__badge" aria-hidden="true">
            PROMOÇÃO
          </span>
          <p className="announcement-bar__text">
            <strong className="announcement-bar__highlight">PROMOÇÃO DE BLACK-FRIDAY</strong>
            <span className="announcement-bar__separator" aria-hidden="true">—</span>
            <span>Landing Page para sua oferta de Black-Friday</span>
            <span className="announcement-bar__price-tag">
              POR: <strong>R$ 297,00</strong>
            </span>
            <span className="announcement-bar__divider" aria-hidden="true">|</span>
            <a
              href="https://black-friday.robsonsvicero.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-bar__link"
            >
              <span>Saiba mais em: black-friday.robsonsvicero.com.br</span>
              <svg
                className="announcement-bar__icon"
                viewBox="0 0 16 16"
                width="14"
                height="14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="m8.289 8.664-6.25 6.25A.94.94 0 0 1 .71 13.586L6.297 8 .712 2.414A.94.94 0 0 1 2.04 1.086l6.25 6.25a.937.937 0 0 1-.001 1.328Zm6.25-1.328-6.25-6.25A.94.94 0 0 0 6.96 2.414L12.547 8 6.96 13.587a.94.94 0 0 0 1.328 1.328l6.25-6.25a.938.938 0 0 0 0-1.328v-.001Z" />
              </svg>
            </a>
          </p>
        </div>
        <button
          type="button"
          className="announcement-bar__close"
          onClick={() => setIsVisible(false)}
          aria-label="Fechar aviso promocional"
        >
          <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
