import Button from "../../components/ui/Button/Button.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { claroMethodContent } from "../../content/siteContent.js";

export default function ClaroMethod() {
  return (
    <Section
      className="claro-method-section surface-band"
      data-od-id="metodo-claro"
      aria-labelledby="metodo-claro-title"
      containerClassName="container claro-method-layout"
    >
      <div className="claro-method-copy">
        <p className="eyebrow">{claroMethodContent.eyebrow}</p>
        <h2 id="metodo-claro-title">{claroMethodContent.title}</h2>
        <p className="lead">{claroMethodContent.description}</p>
        <Button
          href={claroMethodContent.cta.href}
          variant="dark"
          target="_blank"
          rel="noreferrer noopener"
        >
          {claroMethodContent.cta.label}
        </Button>
      </div>

      <ol className="claro-method-pillars" aria-label="Cinco pilares do Método C.L.A.R.O.">
        {claroMethodContent.pillars.map((pillar) => (
          <li key={pillar.initial}>
            <span aria-hidden="true">{pillar.initial}</span>
            <strong>{pillar.label}</strong>
          </li>
        ))}
      </ol>
    </Section>
  );
}
