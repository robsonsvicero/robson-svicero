import Section from "../../components/ui/Section/Section.jsx";
import { faqContent } from "../../content/siteContent.js";

export default function Faq({
  content = faqContent,
  id = "faq",
  titleId = "sec-faq",
  className = "",
}) {
  return (
    <Section
      id={id}
      className={className}
      data-od-id="faq"
      aria-labelledby={titleId}
      itemScope
      itemType="https://schema.org/FAQPage"
      containerClassName="container faq-layout"
    >
      <div className="faq-intro">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id={titleId}>{content.title}</h2>
        <p className="lead">{content.lead}</p>
      </div>

      <div className="faq-list">
        {content.questions.map((item) => (
          <details
            className="faq-item"
            key={item.question}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary itemProp="name">{item.question}</summary>
            <div
              className="faq-answer"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p itemProp="text">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
