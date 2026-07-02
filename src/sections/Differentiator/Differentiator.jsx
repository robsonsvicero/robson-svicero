import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { differentiatorContent } from "../../content/siteContent.js";

export default function Differentiator() {
  return (
    <Section
      className="surface-band"
      id="diferencial"
      data-od-id="diferencial"
      aria-labelledby="sec-diferencial"
    >
      <div className="split-title">
        <p className="eyebrow">{differentiatorContent.eyebrow}</p>
        <h2 id="sec-diferencial">{differentiatorContent.title}</h2>
      </div>

      <div className="comparison">
        {differentiatorContent.columns.map((column) => (
          <Card as="div" key={column.meta}>
            <span className="meta">{column.meta}</span>
            <div className={column.className}>
              {column.items.map((item) => (
                <div className="compare-row" key={item.title}>
                  <span className="symbol" aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <br />
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <ol className="timeline" aria-label="Etapas do processo de trabalho">
        {differentiatorContent.timeline.map((step) => (
          <li className="step" key={step.number}>
            <span className="num" aria-hidden="true">
              {step.number}
            </span>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
