import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { homeAboutContent } from "../../content/siteContent.js";

export default function About() {
  const { eyebrow, title, description, complement, highlights, image, primaryCta, secondaryCta } = homeAboutContent;

  return (
    <Section
      className="home-about-section bg-white"
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
          <Button href={secondaryCta.href} variant="secondary" target="_blank" rel="noreferrer noopener" title={secondaryCta.label}>
            {secondaryCta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
