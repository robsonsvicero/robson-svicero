import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import CTA from "../../components/CTA/CTA.jsx";

const pillars = [
  {
    initial: "C",
    name: "Clareza",
    question: "A empresa comunica de forma compreensível?",
    description:
      "Avalia se o visitante entende rapidamente o que é oferecido, para quem, quais benefícios existem e qual deve ser o próximo passo.",
  },
  {
    initial: "L",
    name: "Legitimidade",
    question: "A presença digital transmite confiança?",
    description:
      "Observa se evidências consistentes sustentam a percepção de competência, experiência, transparência e credibilidade.",
  },
  {
    initial: "A",
    name: "Acessibilidade",
    question: "As pessoas conseguem avançar sem barreiras?",
    description:
      "Considera se diferentes pessoas podem compreender, navegar e agir com autonomia e o menor esforço desnecessário possível.",
  },
  {
    initial: "R",
    name: "Relevância",
    question: "O conteúdo responde às necessidades reais do público?",
    description:
      "Analisa o alinhamento entre a comunicação da empresa e as dúvidas, expectativas, problemas e momento de decisão do visitante.",
  },
  {
    initial: "O",
    name: "Orientação",
    question: "A jornada conduz naturalmente para a próxima etapa?",
    description:
      "Verifica se o site facilita decisões e conduz o visitante, de forma clara e natural, até a ação que representa o objetivo do negócio.",
  },
];

const methodCta = {
  eyebrow: "Diagnóstico C.L.A.R.O.",
  title: "Descubra onde sua presença digital pode evoluir.",
  lead:
    "Uma análise estruturada para identificar barreiras, reduzir incertezas e transformar oportunidades em um plano claro de melhoria.",
  primaryAction: { label: "Solicitar diagnóstico", to: "/diagnostico-claro" },
  secondaryAction: { label: "Falar sobre o projeto", to: "/contato" },
};

export default function ClaroMethodPage() {
  return (
    <>
      <SEO
        title="Método C.L.A.R.O. | Estratégia para Presenças Digitais"
        description="Conheça o Método C.L.A.R.O., framework estratégico criado por Robson Svicero para reduzir dúvidas, construir confiança e facilitar decisões em presenças digitais."
        path="/metodo-claro"
        keywords="Método C.L.A.R.O., diagnóstico de sites, estratégia digital, clareza, legitimidade, acessibilidade, relevância, orientação"
      />

      <Layout>
        <section className="section claro-method-page-hero" aria-labelledby="claro-method-page-title">
          <div className="container claro-method-page-hero-grid">
            <div className="stack claro-method-page-hero-copy" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Framework estratégico</p>
              <h1 id="claro-method-page-title">Método C.L.A.R.O.</h1>
              <p className="lead">
                Menos dúvidas. Mais confiança.<br />Decisões mais fáceis.
              </p>
            </div>

            <figure className="claro-method-page-hero-visual">
              <picture>
                <img
                  src="/assets/images/hero_web_metodo.webp"
                  alt="Representação visual do Método C.L.A.R.O."
                  width="1600"
                  height="900"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </figure>
          </div>
        </section>

        <section className="section claro-method-page-intro" aria-labelledby="claro-method-intro-title">
          <div className="container claro-method-page-intro-grid">
            <div className="stack" style={{ gap: "var(--space-4)" }}>
              <p className="eyebrow">Definição oficial</p>
              <h2 id="claro-method-intro-title">
                Uma presença digital deve ajudar pessoas a decidir com segurança.
              </h2>
            </div>
            <div className="claro-method-page-prose">
              <p>
                O Método C.L.A.R.O. é um framework estratégico de diagnóstico e
                evolução de presenças digitais, desenvolvido para avaliar a
                capacidade de um ambiente digital em reduzir dúvidas, construir
                confiança e facilitar decisões.
              </p>
              <p>
                Em vez de observar design, tecnologia, SEO ou marketing de forma
                isolada, o método analisa a experiência como um sistema integrado,
                no qual cada elemento influencia a percepção do usuário e os
                resultados do negócio.
              </p>
            </div>
          </div>
        </section>

        <section className="section surface-band" aria-labelledby="claro-principle-title">
          <div className="container claro-method-principle">
            <p className="eyebrow">Princípio fundamental</p>
            <h2 id="claro-principle-title">
              A confiança aumenta na mesma proporção em que as dúvidas diminuem.
            </h2>
            <p className="lead">
              Cada título, imagem, botão, página e interação pode reduzir incertezas
              ou criar obstáculos. O método identifica esses sinais e transforma a
              análise em orientações práticas de evolução.
            </p>
            <div className="claro-method-flow" aria-label="Relação entre clareza, confiança e decisão">
              <span>Menos dúvidas</span>
              <i aria-hidden="true">→</i>
              <span>Menor esforço</span>
              <i aria-hidden="true">→</i>
              <span>Mais confiança</span>
              <i aria-hidden="true">→</i>
              <span>Decisões mais fáceis</span>
            </div>
          </div>
        </section>

        <section className="section claro-method-page-pillars-section" id="pilares" aria-labelledby="claro-pillars-title">
          <div className="container">
            <div className="claro-method-page-section-heading">
              <p className="eyebrow">O sistema C.L.A.R.O.</p>
              <h2 id="claro-pillars-title">Cinco dimensões que trabalham em conjunto.</h2>
              <p className="lead">
                Nenhum pilar é suficiente isoladamente. Juntos, eles mostram como a
                experiência digital constrói compreensão, confiança e direção.
              </p>
            </div>

            <ol className="claro-method-page-pillars">
              {pillars.map((pillar) => (
                <li key={pillar.initial}>
                  <span className="claro-method-page-initial" aria-hidden="true">
                    {pillar.initial}
                  </span>
                  <div>
                    <h3>{pillar.name}</h3>
                    <p className="claro-method-page-question">{pillar.question}</p>
                    <p>{pillar.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section claro-method-page-scope" aria-labelledby="claro-scope-title">
          <div className="container claro-method-page-scope-grid">
            <div className="stack" style={{ gap: "var(--space-4)" }}>
              <p className="eyebrow">Um modelo de interpretação</p>
              <h2 id="claro-scope-title">Mais do que avaliar um site bonito.</h2>
              <p className="lead">
                O método investiga se a presença digital ajuda uma pessoa a tomar
                uma decisão com segurança.
              </p>
            </div>
            <div className="claro-method-page-scope-cards">
              <article>
                <h3>O que o método é</h3>
                <p>
                  Uma análise estratégica da jornada, das mensagens, das evidências
                  e dos pontos de decisão que aproximam a experiência dos objetivos
                  do negócio.
                </p>
              </article>
              <article>
                <h3>O que o método não é</h3>
                <p>
                  Não é apenas uma avaliação estética, auditoria técnica, checklist
                  de SEO, certificação de acessibilidade ou guia isolado de UX e
                  marketing.
                </p>
              </article>
            </div>
          </div>
        </section>

        <CTA content={methodCta} titleId="claro-method-cta-title" />
      </Layout>
    </>
  );
}
