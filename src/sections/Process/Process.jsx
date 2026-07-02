import Section from "../../components/ui/Section/Section.jsx";
import { processContent } from "../../content/siteContent.js";

export default function Process() {
  return (
    <Section
      data-od-id="processo"
      aria-labelledby="sec-processo"
      containerClassName="container grid-1-2"
    >
      <div>
        <p className="eyebrow">{processContent.eyebrow}</p>
        <h2 id="sec-processo">{processContent.title}</h2>
      </div>
      <ol className="process-list" aria-label="Processo de trabalho de Robson Svicero">
        {processContent.steps.map((step) => (
          <li className="process-item" key={step.number}>
            <span className="num" aria-hidden="true">
              {step.number}
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
