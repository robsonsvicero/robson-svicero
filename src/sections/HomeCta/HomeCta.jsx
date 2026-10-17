import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import { contactLinks, routes } from "../../content/siteContent.js";

export default function HomeCta() {
  return (
    <Section
      className="home-cta-section cta-home-band"
      aria-labelledby="home-cta-title"
      containerClassName="container home-cta-layout"
    >
      <ScrollReveal className="stack home-cta-copy">
        <p className="eyebrow">Vamos conversar</p>
        <h2 id="home-cta-title">Seu próximo passo digital pode começar hoje.</h2>
        <p className="lead">
          Vamos entender o que seu negócio precisa e encontrar juntos o melhor
          caminho para avançar.
        </p>
      </ScrollReveal>
      <ScrollReveal className="home-cta-actions">
        <Button
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          title="Conversar no WhatsApp"
        >
          Conversar no WhatsApp
        </Button>
        <Button
          as={Link}
          to={routes.schedule}
          variant="secondary"
          title="Agende uma conversa"
        >
          Agende uma conversa
        </Button>
      </ScrollReveal>
    </Section>
  );
}
