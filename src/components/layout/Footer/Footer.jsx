import { Link } from "react-router-dom";
import { footerContent } from "../../../content/siteContent.js";

export default function Footer() {
  return (
    <footer className="pagefoot" data-od-id="footer" aria-label="Rodape do site de Robson Svicero">
      <div className="content row-between">
        <span>&copy; {footerContent.copyright}</span>
        <nav className="footer-links" aria-label="Links das redes sociais e contato">
          {footerContent.links.map((link) => (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener me"
              key={link.label}
              title={`Acessar ${link.label}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="footer-page-links" aria-label="Links institucionais">
          <Link to={footerContent.services.href} title={footerContent.services.label}>
            {footerContent.services.label}
          </Link>
          <Link to={footerContent.faq.href} title={footerContent.faq.label}>
            {footerContent.faq.label}
          </Link>
          <Link to={footerContent.privacy.href} title={footerContent.privacy.label}>
            {footerContent.privacy.label}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
