import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import { Link } from "react-router-dom";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { Target, LayoutTemplate, Gauge, SearchCheck, PenTool, Code2 } from "lucide-react";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";

const pillars = [
  {
    icon: Target,
    title: "Mensagem orientada à conversão",
    description:
      "Organização da oferta, do argumento principal e da chamada para ação para facilitar a decisão do visitante.",
  },
  {
    icon: LayoutTemplate,
    title: "Estrutura pensada para campanhas",
    description:
      "Blocos curtos, prova social e fluxo de leitura que funcionam bem para anúncios, lançamentos e captação de leads.",
  },
  {
    icon: Gauge,
    title: "Base pronta para medir resultados",
    description:
      "Landing page desenvolvida com SEO essencial, performance e rastreio preparados para acompanhar a campanha.",
  },
];

const deliverables = [
  {
    icon: SearchCheck,
    title: "Diagnóstico da oferta",
    description: "Objetivo da campanha, público e proposta de valor alinhados à conversão.",
  },
  {
    icon: LayoutTemplate,
    title: "Estrutura da página",
    description: "Hierarquia de conteúdo organizada para conduzir a leitura e a decisão.",
  },
  {
    icon: PenTool,
    title: "Direção visual e textual",
    description: "Interface e texto-base pensados para comunicar valor e gerar ação.",
  },
  {
    icon: Code2,
    title: "Implementação pronta",
    description: "Desenvolvimento em React com SEO essencial e experiência responsiva.",
  },
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
        <ScrollReveal as="section" className="section service-hero" aria-labelledby="landing-page-title">
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
        </ScrollReveal>

        <ScrollReveal as="section" className="section landing-includes-section" aria-labelledby="landing-pillars-title">
          <div className="container stack landing-includes-container" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="O que inclui"
              title="Pilares do serviço de Landing Page"
              subtitle="Elementos estratégicos de copy, design persuasivo e infraestrutura veloz para maximizar conversões."
              id="landing-pillars-title"
              align="center"
              className="landing-includes-header"
            />

            <div className="grid-3 landing-includes-grid" role="list">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card className="feature landing-includes-card" key={pillar.title} role="listitem">
                    <span className="landing-includes-icon" aria-hidden="true">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section landing-deliverables-section" aria-labelledby="landing-deliverables-title">
          <div className="container landing-deliverables-layout">
            <SectionHeader
              label="Entregáveis"
              title="Tudo o que sua campanha precisa para sair do papel."
              subtitle="Uma entrega completa para publicar, medir e evoluir sua landing page com segurança."
              id="landing-deliverables-title"
              align="left"
              className="landing-deliverables-header"
              style={{ marginBottom: 0 }}
            />

            <div className="landing-deliverables-grid" role="list" aria-label="Entregáveis do projeto">
              {deliverables.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card className="landing-deliverable-card" key={item.title} role="listitem">
                    <div className="landing-deliverable-topline">
                      <span className="landing-deliverable-icon" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                      <span className="landing-deliverable-number">0{index + 1}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section process-section--creation landing-how-it-works-section" aria-labelledby="landing-stages-title">
          <div className="container grid-1-2">
            <SectionHeader
              label="Como funciona"
              title="Etapas do trabalho em Landing Page"
              subtitle="Do diagnóstico do público ao teste e publicação da página com rastreamento completo de métricas."
              id="landing-stages-title"
              align="left"
              style={{ marginBottom: 0 }}
            />

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
        </ScrollReveal>

        <ScrollReveal>
          <CTA content={pageCtaContent.landingPageService} titleId="landing-page-cta-title" />
        </ScrollReveal>
      </Layout>
    </>
  );
}
