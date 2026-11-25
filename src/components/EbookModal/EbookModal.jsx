import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import "./EbookModal.css";

const EBOOK_URL = "https://ebook.robsonsvicero.com.br";
const STORAGE_KEY = "ebook_modal_dismissed";

export default function EbookModal() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // sessionStorage pode estar desativado em contextos restritos
    }
  }, []);

  useEffect(() => {
    // Não exibe o modal no painel administrativo
    if (location.pathname.startsWith("/admin")) {
      return;
    }

    try {
      const alreadyDismissed = sessionStorage.getItem(STORAGE_KEY);
      if (alreadyDismissed) return;
    } catch {
      // continua caso falhe
    }

    // Leve delay para carregar suavemente ao entrar no site
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 900);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Bloqueio de scroll e tecla ESC
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="ebook-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Divulgação do E-book React para Iniciantes"
    >
      <div
        className="ebook-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="ebook-modal-close"
          onClick={handleClose}
          aria-label="Fechar modal"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <a
          href={EBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ebook-modal-image-link"
          onClick={handleClose}
          aria-label="Conhecer o E-book React para Iniciantes"
        >
          <img
            src="/assets/images/ebook-react-iniciantes.jpg"
            alt="E-book React para Iniciantes - Robson Svicero"
            className="ebook-modal-image"
            width={440}
            height={550}
            loading="eager"
          />
        </a>

        <div className="ebook-modal-body">
          <a
            href={EBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ebook-modal-cta"
            onClick={handleClose}
          >
            <span>Acessar E-book Agora</span>
            <ArrowRight size={18} />
          </a>

          <p className="ebook-modal-footer-note">
            <span>Acesso imediato</span> &bull; <span>Apenas R$ 9,90</span>
          </p>
        </div>
      </div>
    </div>
  );
}
