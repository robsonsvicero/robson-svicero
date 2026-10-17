import Button from "../../components/ui/Button/Button.jsx";
import { heroContent } from "../../content/siteContent.js";
import HeroParticles from "./HeroParticles.jsx";

export default function Hero() {
  const { title, subtitle, lead, primaryCta, secondaryCta } = heroContent;

  return (
    <section
      className="section_hero section_hero--blue"
      data-od-id="hero"
      aria-label="Apresentação principal - Desenvolvimento de sites profissionais"
    >
      <HeroParticles />
      <div className="container">
        <div className="hero_inner">
          <span className="hero_eyebrow">
            Desenvolvimento Web de Alta Performance
          </span>
          <h1 className="hero_heading">
            {title}
            <br />
            <em>{subtitle}</em>
          </h1>
          <p className="hero_description">{lead}</p>
          <div className="hero_buttons">
            <Button
              href={primaryCta.href}
              variant="primary"
              target="_blank"
              rel="noreferrer noopener"
              title={primaryCta.label}
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="outline"
              title={secondaryCta.label}
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="hero_logos">
          <div className="hero_logos-label">
            Experiência comprovada em estratégia, UX e engenharia web
          </div>
          <div className="hero_logos-row">
            <div className="hero_trust-pill">
              <strong>+10 anos</strong>
              <span>criando experiências digitais</span>
            </div>
            <div className="hero_trust-pill">
              <strong>100%</strong>
              <span>foco em conversão & SEO</span>
            </div>
            <div className="hero_trust-pill">
              <strong>Design & Código</strong>
              <span>sem intermediários</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
