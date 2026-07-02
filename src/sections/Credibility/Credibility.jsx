import Section from "../../components/ui/Section/Section.jsx";
import { credibilityContent } from "../../content/siteContent.js";

export default function Credibility() {
  return (
    <Section
      data-od-id="credibilidade"
      aria-labelledby="sec-credibilidade"
      containerClassName="container grid-2-1"
    >
      <div>
        <p className="eyebrow">{credibilityContent.eyebrow}</p>
        <h2 id="sec-credibilidade">{credibilityContent.title}</h2>
      </div>
      <div className="stack">
        <p className="lead">{credibilityContent.lead}</p>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          {credibilityContent.description}
        </p>
      </div>
    </Section>
  );
}
