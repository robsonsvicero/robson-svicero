import { Link } from "react-router-dom";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";

const pillars = [
  {
    title: "Mensagem orientada à conversão",
    description:
      "Organização da oferta, do argumento principal e da chamada para ação para facilitar a decisão do visitante.",
  },
  {
    title: "Estrutura pensada para campanhas",
    description:
      "Blocos curtos, prova social e fluxo de leitura que funcionam bem para anúncios, lançamentos e captação de leads.",
  },
  {
    title: "Base pronta para medir resultados",
    description:
      "Landing page desenvolvida com SEO essencial, performance e rastreio preparados para acompanhar a campanha.",
  },
];

const deliverables = [
  "Diagnóstico da oferta e do objetivo da campanha.",
  "Estrutura da landing page com hierarquia de conteúdo.",
  "Direção visual e texto base orientados à conversão.",
  "Implementação em React com SEO e responsividade.",
];

const stages = [
  {
    number: "01",
    title: "Estratégia",
    description: "Entendimento da oferta, público, objeções e objetivo de conversão da página.",
  },
  {
    number: "02",
    title: "Estrutura",
    description: "Definição da narrativa, da ordem dos blocos e das provas que ajudam a vender.",
  },
  {
    number: "03",
    title: "Design e conteúdo",
    description: "Criação da interface e dos textos-base para sustentar a decisão do visitante.",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description: "Entrega da landing page pronta para publicar, medir e evoluir com a campanha.",
  },
];

function createLandingPageSchema() {
  const pageUrl = absoluteUrl(routes.landingPageService);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Landing Page",
        serviceType: "Landing page de conversão",
        provider: {
          "@type": "ProfessionalService",
          name: "Robson Svicero",
          url: absoluteUrl("/"),
        },
        areaServed: "Brasil",
        url: pageUrl,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Landing Page | Robson Svicero",
        description:
          "Serviço de Landing Page para campanhas, lançamentos e captação de leads com foco em conversão.",
      },
    ],
  };
}

export default function LandingPage() {
  return (
    <>
      <SEO
        title="Landing Page | Página de conversão para campanhas"
        description="Serviço de Landing Page para campanhas, lançamentos e captação de leads com foco em conversão, clareza e desempenho."
        path={routes.landingPageService}
        structuredData={createLandingPageSchema()}
      />

      <Layout>
        <section className="section service-hero" aria-labelledby="landing-page-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Serviços • Landing Page</p>
              <h1 id="landing-page-title">Uma landing page feita para conduzir o visitante à ação.</h1>
              <p className="lead">
                Crio páginas únicas para campanhas, lançamentos e captação de leads, com narrativa
                objetiva, prova social e CTA claro para aumentar a conversão.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Falar sobre Landing Page
                </Button>
                <Button as={Link} to={routes.services} variant="secondary">
                  Voltar para serviços
                </Button>
              </div>
              <p className="page-description">
                Ideal para campanhas, ofertas específicas, lançamentos e páginas focadas em gerar contatos.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">conversion-page.one</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Página de campanha</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>Oferta</span>
                      <span>Prova social</span>
                      <span>CTA</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Foco</span>
                      <strong>Conversão</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Objetivo</span>
                      <strong>Leads</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Entrega</span>
                      <strong>Página pronta</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="section" aria-labelledby="landing-pillars-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">O que inclui</p>
              <h2 id="landing-pillars-title">Pilares do serviço de Landing Page</h2>
            </div>

            <div className="grid-3" role="list">
              {pillars.map((pillar) => (
                <Card className="feature" key={pillar.title} role="listitem">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section dark-band" aria-labelledby="landing-deliverables-title">
          <div className="container grid-2">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Entregáveis</p>
              <h2 id="landing-deliverables-title">O que você recebe ao final do projeto</h2>
              <p className="lead">
                Uma landing page pronta para publicar, com a base necessária para comunicar, medir
                e otimizar a oferta com mais clareza.
              </p>
            </div>

            <Card className="stack" as="div">
              {deliverables.map((item) => (
                <div className="service-check" key={item}>
                  <span aria-hidden="true">OK</span>
                  <p>{item}</p>
                </div>
              ))}
            </Card>
          </div>
        </section>

        <section className="section" aria-labelledby="landing-stages-title">
          <div className="container grid-1-2">
            <div>
              <p className="eyebrow">Como funciona</p>
              <h2 id="landing-stages-title">Etapas do trabalho em Landing Page</h2>
            </div>

            <ol className="process-list" aria-label="Etapas do serviço de Landing Page">
              {stages.map((stage) => (
                <li className="process-item" key={stage.number}>
                  <span className="num" aria-hidden="true">
                    {stage.number}
                  </span>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CTA content={pageCtaContent.landingPageService} titleId="landing-page-cta-title" />
      </Layout>
    </>
  );
}