import { useEffect, useRef, useState } from "react";
import { contactLinks } from "../../content/siteContent.js";

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v8A2.5 2.5 0 0 1 18.5 16H9.2l-4.8 4v-4H5.5A2.5 2.5 0 0 1 3 13.5v-8Zm2.5-.5a.5.5 0 0 0-.5.5v8c0 .28.22.5.5.5h2.3v1.7l3.08-1.7H18.5a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-13Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.52 3.48A11.83 11.83 0 0 0 12.01 0C5.4 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.58 5.97L0 24l6.18-1.62a11.96 11.96 0 0 0 5.82 1.5h.01C18.63 23.88 24 18.51 24 11.89c0-3.21-1.25-6.22-3.48-8.41Zm-8.51 18.3h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.93 9.93 0 0 1 2.52 12C2.52 6.8 6.76 2.56 11.99 2.56c2.53 0 4.9.99 6.67 2.77a9.37 9.37 0 0 1 2.77 6.63c0 5.21-4.24 9.82-9.42 9.82Zm5.5-7.06c-.3-.15-1.75-.86-2.02-.95-.27-.1-.46-.15-.66.15-.19.3-.76.95-.93 1.14-.17.19-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.53-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.45s1.03 2.85 1.18 3.05c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.75-.72 2-1.41.24-.69.24-1.28.17-1.41-.07-.14-.26-.22-.56-.37Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.14 6.27-1.89 8.91c-.14.63-.52.79-1.05.49l-2.9-2.13-1.4 1.35c-.15.15-.28.28-.58.28l.21-2.94 5.35-4.83c.23-.2-.05-.31-.35-.11L7.76 12.4l-2.9-.9c-.63-.2-.64-.63.13-.94l11.38-4.39c.53-.2 1 .12.82.92Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className={`whatsapp-float-wrapper${isOpen ? " is-open" : ""}`} ref={wrapperRef}>
      {isOpen && (
        <div className="whatsapp-float-popover" role="menu" aria-label="Opções de contato">
          <p className="whatsapp-float-title">Como você prefere falar comigo?</p>

          <a
            className="whatsapp-float-option"
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="whatsapp-float-option-icon whatsapp-float-option-icon--whatsapp" aria-hidden="true">
              <WhatsAppIcon />
            </span>
            <span className="whatsapp-float-option-copy">
              <strong>WhatsApp</strong>
              <span>Conversar pelo WhatsApp</span>
            </span>
          </a>

          <a
            className="whatsapp-float-option"
            href={contactLinks.telegram}
            target="_blank"
            rel="noreferrer noopener"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="whatsapp-float-option-icon whatsapp-float-option-icon--telegram" aria-hidden="true">
              <TelegramIcon />
            </span>
            <span className="whatsapp-float-option-copy">
              <strong>Telegram</strong>
              <span>Conversar pelo Telegram</span>
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        className="whatsapp-float"
        aria-label="Abrir opções de contato"
        title="Abrir opções de contato"
        onClick={() => setIsOpen((current) => !current)}
      >
        <MessageIcon />
      </button>
    </div>
  );
}
