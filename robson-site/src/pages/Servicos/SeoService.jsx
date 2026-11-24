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
    title: "Diagnóstico técnico",
    description:
      "Análise de estrutura, performance, rastreabilidade e indexação para identificar barreiras que prejudicam seu posicionamento.",
  },
  {
    title: "SEO on-page estratégico",
    description:
      "Ajustes de arquitetura de conteúdo, headings, metadados e intenção de busca para melhorar relevância nas páginas-chave.",
  },
  {
    title: "Plano de evolução",
    description:
      "Prioridades claras para evoluir o SEO com consistência, focando no que traz impacto real de visibilidade e conversão.",
  },
];

const deliverables = [
  "Relatório de diagnóstico com gargalos técnicos e oportunidades.",
  "Mapa de ajustes on-page por página prioritária.",
  "Recomendações para estrutura de conteúdo e intenção de busca.",
  "Plano de ações com prioridade de implementação.",
];

const stages = [
  {
    number: "01",
    title: "Auditoria",
    description: "Levantamento completo de fatores técnicos e semânticos que impactam indexação e ranking.",
  },
  {
    number: "02",
    title: "Prioridade",
    description: "Definição do que corrigir primeiro para gerar ganhos mais rápidos de clareza e visibilidade.",
  },
  {
    number: "03",
    title: "Implementação",
    description: "Aplicação dos ajustes técnicos e on-page de acordo com o plano estabelecido.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    description: "Revisão dos resultados e direcionamento das próximas otimizações.",
  },
];

function createSeoServiceSchema() {
  const pageUrl = absoluteUrl(routes.seoService);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "SEO",
        serviceType: "SEO técnico e on-page",
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
        name: "SEO | Robson Svicero",
        description:
          "Serviço de SEO técnico e on-page para melhorar visibilidade orgânica, estrutura de conteúdo e performance de busca.",
      },
    ],
  };
}

export default function SeoService() {
  return (
    <>
      <SEO
        title="SEO | Diagnóstico técnico e otimização on-page"
        description="Serviço de SEO para melhorar a visibilidade orgânica do seu site com diagnóstico técnico, ajustes on-page e plano de evolução."
        path={routes.seoService}
        structuredData={createSeoServiceSchema()}
      />

      <Layout>
        <section className="section service-hero" aria-labelledby="seo-service-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Serviços • SEO</p>
              <h1 id="seo-service-title">SEO para aumentar sua visibilidade com base técnica sólida.</h1>
              <p className="lead">
                O serviço de SEO combina diagnóstico técnico e otimização on-page para facilitar
                indexação, melhorar relevância e ampliar suas oportunidades de tráfego qualificado.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Falar sobre SEO
                </Button>
                <Button as={Link} to={routes.services} variant="secondary">
                  Voltar para serviços
                </Button>
              </div>
              <p className="page-description">
                Ideal para sites com baixa visibilidade orgânica, queda de tráfego ou conteúdo sem direcionamento claro.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">organic-growth.signal</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">SEO técnico + on-page</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>Indexação</span>
                      <span>Semântica</span>
                      <span>Performance</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Foco</span>
                      <strong>Visibilidade</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Objetivo</span>
                      <strong>Tráfego qualificado</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Entrega</span>
                      <strong>Plano de SEO</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="section" aria-labelledby="seo-pillars-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">O que inclui</p>
              <h2 id="seo-pillars-title">Pilares do serviço de SEO</h2>
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

        <section className="section dark-band" aria-labelledby="seo-deliverables-title">
          <div className="container grid-2">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Entregáveis</p>
              <h2 id="seo-deliverables-title">O que você recebe ao final do projeto</h2>
              <p className="lead">
                Um direcionamento objetivo para melhorar performance orgânica com prioridades
                claras, implementação orientada e evolução contínua.
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

        <section className="section" aria-labelledby="seo-stages-title">
          <div className="container grid-1-2">
            <div>
              <p className="eyebrow">Como funciona</p>
              <h2 id="seo-stages-title">Etapas do trabalho em SEO</h2>
            </div>

            <ol className="process-list" aria-label="Etapas do serviço de SEO">
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

        <CTA content={pageCtaContent.seoService} titleId="seo-service-cta-title" />
      </Layout>
    </>
  );
}
