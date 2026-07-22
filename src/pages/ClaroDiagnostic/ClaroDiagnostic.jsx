import { useState } from "react";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import { contactContent } from "../../content/siteContent.js";

export default function ClaroDiagnostic() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("muted");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const requiredFields = ["name", "site_url", "segment", "audience", "site_objective"];
    const hasEmptyField = requiredFields.some(
      (field) => !String(formData.get(field) || "").trim(),
    );

    if (hasEmptyField) {
      setStatusType("error");
      setStatus("Preencha todos os campos para solicitar o diagnóstico.");
      return;
    }

    setIsSubmitting(true);
    setStatusType("muted");
    setStatus("");

    try {
      const response = await fetch(contactContent.formAction, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Não foi possível enviar o formulário.");

      form.reset();
      setStatusType("success");
      setStatus("Solicitação enviada com sucesso. Em breve entrarei em contato.");
    } catch {
      setStatusType("error");
      setStatus("Não foi possível enviar agora. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Diagnóstico C.L.A.R.O. para Sites"
        description="Solicite uma análise estratégica do seu site com o diagnóstico C.L.A.R.O. e identifique oportunidades de clareza, experiência e conversão."
        path="/diagnostico-claro"
        keywords="diagnóstico de site, análise de site, diagnóstico C.L.A.R.O., UX, SEO, conversão, Robson Svicero"
      />

      <Layout>
        <section className="claro-diagnostic-hero" aria-labelledby="claro-diagnostic-title">
          <div className="container claro-diagnostic-hero-layout">
            <div className="claro-diagnostic-copy">
              <p className="eyebrow">Diagnóstico estratégico</p>
              <h1 id="claro-diagnostic-title">
                Descubra o que impede seu site de ser mais claro e eficiente.
              </h1>
              <p className="lead">
                Solicite o diagnóstico C.L.A.R.O. e receba uma análise inicial da sua
                presença digital, considerando clareza, lógica, acessibilidade,
                relevância e otimização.
              </p>
              <a className="claro-diagnostic-anchor" href="#solicitar-diagnostico">
                Solicitar diagnóstico
              </a>
            </div>

            <figure className="claro-diagnostic-visual">
              <img
                src="/assets/images/metodo_claro_binho.webp"
                alt="Personagem do método C.L.A.R.O. apresentando o diagnóstico de sites"
                width="640"
                height="640"
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className="section claro-diagnostic-form-section" id="solicitar-diagnostico">
          <div className="container claro-diagnostic-form-layout">
            <div className="claro-diagnostic-form-copy">
              <p className="eyebrow">Vamos começar</p>
              <h2>Conte um pouco sobre o site.</h2>
              <p>
                Estas informações formam o ponto de partida da análise. Preencha os
                dados ao lado para que eu possa entender o contexto e o objetivo do
                seu projeto.
              </p>
              <div className="claro-diagnostic-note">
                <strong>O que acontece depois?</strong>
                <p>
                  Vou revisar as informações e entrar em contato para alinhar os
                  próximos passos do diagnóstico.
                </p>
              </div>
            </div>

            <form
              className="claro-diagnostic-form"
              action={contactContent.formAction}
              method="POST"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Solicitação do diagnóstico C.L.A.R.O."
            >
              <input type="hidden" name="_subject" value="Nova solicitação — Diagnóstico C.L.A.R.O." />
              <input type="hidden" name="request_type" value="Diagnóstico C.L.A.R.O." />

              <div className="field">
                <label htmlFor="claro-name">Nome do solicitante</label>
                <input className="input" id="claro-name" name="name" autoComplete="name" required placeholder="Como você se chama?" />
              </div>

              <div className="field">
                <label htmlFor="claro-url">URL do site</label>
                <input className="input" id="claro-url" name="site_url" type="url" inputMode="url" autoComplete="url" required placeholder="https://seusite.com.br" />
              </div>

              <div className="field">
                <label htmlFor="claro-segment">Segmento</label>
                <input className="input" id="claro-segment" name="segment" required placeholder="Ex.: saúde, tecnologia, serviços" />
              </div>

              <div className="field">
                <label htmlFor="claro-audience">Público principal</label>
                <textarea className="textarea" id="claro-audience" name="audience" required placeholder="Quem você deseja alcançar com o site?" />
              </div>

              <div className="field">
                <label htmlFor="claro-objective">Objetivo do site</label>
                <textarea className="textarea" id="claro-objective" name="site_objective" required placeholder="Ex.: gerar contatos, vender, apresentar serviços ou fortalecer a marca" />
              </div>

              <Button as="button" variant="dark" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar diagnóstico C.L.A.R.O."}
              </Button>

              <p className="claro-diagnostic-privacy">
                Ao enviar, você concorda com o tratamento dos dados para retorno desta solicitação, conforme a <a href="/privacidade">Política de Privacidade</a>.
              </p>

              {status && (
                <p className={`status is-${statusType}`} role="status" aria-live="polite">
                  {status}
                </p>
              )}
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}
