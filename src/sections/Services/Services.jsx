import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { servicesContent } from "../../content/siteContent.js";

export default function Services() {
  return (
    <Section
      id="servicos"
      data-od-id="servicos"
      aria-labelledby="sec-servicos"
      containerClassName="container stack"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div style={{ maxWidth: 680 }}>
        <p className="eyebrow">{servicesContent.eyebrow}</p>
        <h2 id="sec-servicos">{servicesContent.title}</h2>
      </div>
      <div className="grid-3">
        {servicesContent.items.map((service) => (
          <Card className="feature" key={service.title}>
            <div className="feature-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={service.iconPath} />
              </svg>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
