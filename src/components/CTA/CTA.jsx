import { Link } from "react-router-dom";
import Button from "../ui/Button/Button.jsx";

function renderAction(action, variant = "primary") {
  if (!action?.label) return null;

  if (action.to) {
    return (
      <Button key={`${action.label}-${variant}`} as={Link} to={action.to} variant={variant} title={action.label}>
        {action.label}
      </Button>
    );
  }

  const isExternal = action.newTab || action.href?.startsWith("http");

  return (
    <Button
      key={`${action.label}-${variant}`}
      href={action.href}
      variant={variant}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      title={action.label}
    >
      {action.label}
    </Button>
  );
}

export default function CTA({
  content,
  titleId = "cta-title",
  sectionClassName = "",
}) {
  if (!content) return null;

  return (
    <section
      className={`section cta-section ${content.bandClass || "surface-band"} ${sectionClassName}`.trim()}
      aria-labelledby={titleId}
    >
      <div className="container cta-section-layout">
        <div className="stack cta-section-copy" style={{ gap: "var(--space-3)" }}>
          {content.eyebrow ? <span className="section-label">{content.eyebrow}</span> : null}
          <h2 id={titleId} className="section_heading" style={{ marginBottom: "0.5rem" }}>{content.title}</h2>
          {content.lead ? <p className="section_lede">{content.lead}</p> : null}
        </div>

        <div className="hero-cta cta-section-actions">
          {renderAction(content.primaryAction, "primary")}
          {renderAction(content.secondaryAction, "secondary")}
        </div>
      </div>
    </section>
  );
}
