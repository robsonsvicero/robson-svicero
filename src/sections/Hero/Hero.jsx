import Button from "../../components/ui/Button/Button.jsx";
import { heroContent } from "../../content/siteContent.js";

export default function Hero() {
  const { eyebrow, title, lead, note, media, primaryCta, secondaryCta } = heroContent;

  return (
    <section
      className="section hero hero-editorial"
      data-od-id="hero"
      aria-label="Apresentação principal - Criação de sites, UX/UI Designer, Robson Svicero"
    >
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source media="(max-width: 640px)" srcSet={media.mobile} />
          <img
            className="hero-image"
            src={media.desktop}
            alt=""
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
        <div className="hero-overlay" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <div className="hero-cta">
            <Button
              href={primaryCta.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {primaryCta.label}
            </Button>
            <Button variant="secondary" href={secondaryCta.href}>
              {secondaryCta.label}
            </Button>
          </div>
          <p className="hero-note">{note}</p>
        </div>
      </div>
    </section>
  );
}
