import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import { contactContent } from "../../content/siteContent.js";
import { useContactForm } from "../../hooks/useContactForm.js";

const emailLink = contactContent.links.find((link) => link.href.startsWith("mailto:"));
const whatsappLink = contactContent.links.find((link) => link.label.includes("WhatsApp"));

export default function Contact() {
  const { status, statusType, isSubmitting, handleSubmit } = useContactForm({
    formAction: contactContent.formAction,
  });

  return (
    <>
      <SEO
        title="Contato | Robson Svicero"
        description="Entre em contato para conversar sobre criação de sites institucionais, landing pages e UX/UI Design."
        path="/contato"
      />
      <Layout>
        <section className="section contact-page" aria-labelledby="contact-title">
          <div className="container contact-page-hero">
            <div className="stack contact-page-copy">
              <p className="eyebrow">{contactContent.eyebrow}</p>
              <h1 id="contact-title">{contactContent.title}</h1>
              <p className="lead">{contactContent.lead}</p>
              <p>
                Use o formulário para enviar um resumo do que você precisa, ou fale direto
                pelo canal que fizer mais sentido para o momento do projeto.
              </p>
            </div>

            <div className="contact-direct" aria-label="Canais diretos">
              <a className="contact-method" href={emailLink.href}>
                <span>E-mail</span>
                <strong>ola@robsonsvicero.com.br</strong>
              </a>
              <a
                className="contact-method"
                href={whatsappLink.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>WhatsApp</span>
                <strong>11 96493-2007</strong>
              </a>
            </div>
          </div>

          <div className="container contact-page-grid">
            <form
              className="contact-page-form"
              action={contactContent.formAction}
              method="POST"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulário de contato"
            >
              <input type="hidden" name="_subject" value="Novo contato pelo site" />

              <div className="field">
                <label htmlFor="contact-name">Nome</label>
                <input
                  className="input"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-email">E-mail</label>
                <input
                  className="input"
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="voce@empresa.com"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-phone">WhatsApp</label>
                <input
                  className="input"
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-service">Tipo de projeto</label>
                <select className="input" id="contact-service" name="service" defaultValue="">
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option>Landing Page</option>
                  <option>Site institucional</option>
                  <option>Site One Page</option>
                  <option>UX/UI Design</option>
                  <option>Identidade Visual</option>
                </select>
              </div>

              <div className="field contact-message-field">
                <label htmlFor="contact-project">Sobre o projeto</label>
                <textarea
                  className="textarea"
                  id="contact-project"
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
                  role="status"
                  aria-live="polite"
                  style={{ color: statusType === "error" ? "var(--danger)" : statusType === "success" ? "var(--success)" : "var(--muted)" }}
                >
                  {status}
                </p>
              )}
            </form>

            <aside className="contact-aside" aria-label="Resumo dos canais de contato">
              <p className="eyebrow">Atendimento</p>
              <h2>Vamos organizar o próximo passo.</h2>
              <p>
                Depois do envio, a conversa segue por e-mail ou WhatsApp para entender
                objetivo, prazo, escopo e melhor formato de entrega.
              </p>
              <div className="contact-aside-actions">
                <Button href={emailLink.href} variant="primary">
                  Enviar e-mail
                </Button>
                <Button
                  href={whatsappLink.href}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Chamar no WhatsApp
                </Button>
              </div>
              <p className="meta">{contactContent.meta}</p>
            </aside>
          </div>
        </section>
      </Layout>
    </>
  );
}
