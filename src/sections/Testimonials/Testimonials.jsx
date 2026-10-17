import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
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
        <SectionHeader
          label={testimonialsContent.eyebrow || "Depoimentos"}
          title={testimonialsContent.title}
          subtitle={testimonialsContent.lead}
          id="sec-depoimentos"
          align="left"
        />

        <div className="testimonials-proof-grid">
          {testimonialsContent.reviews.map((review) => (
            <ScrollReveal className="testimonial-proof-reveal" key={review.author}>
            <Card className="testimonial-proof-card glass-card">
              <div className="testimonial-proof-top" aria-hidden="true">
                <Quote />
                <span>Projeto entregue</span>
              </div>
              <blockquote className="quote">
                {`\u201C${review.quote}\u201D`}
              </blockquote>
              <footer className="testimonial-proof-author">
                <p>
                  <strong>{review.author}</strong>
                  <span>{review.role} · {review.business}</span>
                </p>
                <span className="testimonial-proof-segment">{review.segment}</span>
              </footer>
            </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="testimonials-cta-header">
        <ScrollReveal className="stack testimonials-cta-copy">
          <p className="eyebrow">{cta.eyebrow}</p>
          <h3>{cta.title}</h3>
          <p className="lead">{cta.lead}</p>
        </ScrollReveal>
        <ScrollReveal className="testimonials-cta-actions">
          <Button
            href={cta.primaryAction.href}
            target="_blank"
            rel="noreferrer noopener"
            title="Conversar com Robson no WhatsApp"
          >
            Conversar no WhatsApp
          </Button>
          <Button as={Link} to={cta.secondaryAction.to} variant="secondary" title={cta.secondaryAction.label}>
            {cta.secondaryAction.label}
          </Button>
        </ScrollReveal>
      </div>
    </Section>
  );
}
