import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { testimonialsContent } from "../../content/siteContent.js";

export default function Testimonials() {
  return (
    <Section
      className="surface-band"
      data-od-id="depoimentos"
      aria-labelledby="sec-depoimentos"
      containerClassName="container stack"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div style={{ maxWidth: 680 }}>
        <p className="eyebrow">{testimonialsContent.eyebrow}</p>
        <h2 id="sec-depoimentos">{testimonialsContent.title}</h2>
      </div>
      <div className="grid-3">
        {testimonialsContent.reviews.map((review) => (
          <Card key={review.author} itemScope itemType="https://schema.org/Review">
            <span itemProp="itemReviewed" itemScope itemType="https://schema.org/Person">
              <meta itemProp="name" content="Robson Svicero - UX/UI Designer e Desenvolvedor" />
            </span>
            <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content="5" />
              <meta itemProp="bestRating" content="5" />
            </span>
            <blockquote className="quote" itemProp="reviewBody">
              "{review.quote}"
            </blockquote>
            <p className="quote-author" itemProp="author" itemScope itemType="https://schema.org/Person">
              <span itemProp="name">{review.author}</span>
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
