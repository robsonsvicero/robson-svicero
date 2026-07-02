import Section from "../../components/ui/Section/Section.jsx";
import { faqContent } from "../../content/siteContent.js";

export default function Faq() {
  return (
    <Section
      id="faq"
      data-od-id="faq"
      aria-labelledby="sec-faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      containerClassName="container faq-layout"
    >
      <div className="faq-intro">
        <p className="eyebrow">{faqContent.eyebrow}</p>
        <h2 id="sec-faq">{faqContent.title}</h2>
        <p className="lead">{faqContent.lead}</p>
      </div>

      <div className="faq-list">
        {faqContent.questions.map((item) => (
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
