import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { pageCtaContent, testimonialsContent } from "../../content/siteContent.js";

export default function Testimonials() {
  const cta = pageCtaContent.home;

  return (
    <Section
      className="testimonials-cta-section cta-home-band"
      data-od-id="depoimentos"
      aria-labelledby="sec-depoimentos"
      containerClassName="container stack testimonials-cta-layout"
    >
      <div className="testimonials-proof">
        <div className="testimonials-proof-heading">
          <p className="eyebrow">{testimonialsContent.eyebrow}</p>
          <h2 id="sec-depoimentos">{testimonialsContent.title}</h2>
        </div>

        <div className="testimonials-proof-grid">
          {testimonialsContent.reviews.map((review) => (
            <Card className="testimonial-proof-card" key={review.author}>
              <div className="testimonial-proof-top" aria-hidden="true">
                <Quote />
                <span>Projeto entregue</span>
              </div>
              <blockquote className="quote">
                “{review.quote}”
              </blockquote>
              <footer className="testimonial-proof-author">
                <p>
                  <strong>{review.author}</strong>
                  <span>{review.role} · {review.business}</span>
                </p>
                <span className="testimonial-proof-segment">{review.segment}</span>
              </footer>
            </Card>
          ))}
        </div>
      </div>

      <div className="testimonials-cta-header">
        <div className="stack testimonials-cta-copy">
          <p className="eyebrow">{cta.eyebrow}</p>
          <h3>{cta.title}</h3>
          <p className="lead">{cta.lead}</p>
        </div>
        <div className="testimonials-cta-actions">
          <Button
            href={cta.primaryAction.href}
            target="_blank"
            rel="noreferrer noopener"
            title="Falar com Robson pelo WhatsApp"
          >
            Falar com Robson
          </Button>
          <Button as={Link} to={cta.secondaryAction.to} variant="secondary" title={cta.secondaryAction.label}>
            {cta.secondaryAction.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
