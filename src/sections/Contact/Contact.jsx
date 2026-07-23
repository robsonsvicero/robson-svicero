import Button from "../../components/ui/Button/Button.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contactContent } from "../../content/siteContent.js";
import { useContactForm } from "../../hooks/useContactForm.js";

export default function Contact() {
  const { status, statusType, isSubmitting, handleSubmit } = useContactForm({
    formAction: contactContent.formAction,
  });

  return (
    <Section
      id="contato"
      data-od-id="contato"
      aria-labelledby="sec-contato"
      containerClassName="container contact-panel"
    >
      <div className="stack">
        <p className="eyebrow">{contactContent.eyebrow}</p>
        <h2 id="sec-contato">{contactContent.title}</h2>
        <p className="lead">{contactContent.lead}</p>
        <div className="stack" style={{ gap: "var(--space-3)" }}>
          {contactContent.links.map((link) => (
            <Button
              href={link.href}
              variant={link.variant}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              title={link.label}
              key={link.label}
            >
              {link.label}
            </Button>
          ))}
        </div>
        <p className="meta">{contactContent.meta}</p>
      </div>

      <form
        className="form-grid"
        id="leadForm"
        action={contactContent.formAction}
        method="POST"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulário de contato"
      >
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input className="input" id="name" name="name" autoComplete="name" required placeholder="Seu nome" />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="voce@empresa.com"
          />
        </div>
        <div className="field">
          <label htmlFor="project">Sobre o projeto</label>
          <textarea
            className="textarea"
            id="project"
            name="project"
            required
            placeholder="Conte em poucas linhas o que você precisa construir."
          />
        </div>
        <Button as="button" variant="dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar mensagem"}
        </Button>
        {status && (
          <p
            className="status"
            id="formStatus"
            role="status"
            aria-live="polite"
            style={{ color: statusType === "error" ? "var(--danger)" : statusType === "success" ? "var(--success)" : "var(--muted)" }}
          >
            {status}
          </p>
        )}
      </form>
    </Section>
  );
}
