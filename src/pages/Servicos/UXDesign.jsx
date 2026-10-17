import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import { Link } from "react-router-dom";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { SearchCheck, LayoutTemplate, PenTool, Target } from "lucide-react";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";

const pillars = [
  {
    icon: SearchCheck,
    title: "Pesquisa orientada por objetivo",
    description:
      "Entendimento de contexto, público e pontos de fricção para definir o que precisa ser priorizado na experiência.",
  },
  {
    icon: LayoutTemplate,
    title: "Arquitetura e fluxo",
    description:
      "Estruturação de jornadas e hierarquia de informação para facilitar compreensão e tomada de decisão.",
  },
  {
    icon: PenTool,
    title: "Protótipos para validar",
    description:
      "Wireframes e protótipos navegáveis para testar hipóteses antes da implementação final.",
  },
];

const deliverables = [
  {
    icon: SearchCheck,
    title: "Diagnóstico da experiência",
    description: "Diagnóstico da experiência atual com pontos críticos e oportunidades.",
  },
  {
    icon: Target,
    title: "Mapa da jornada",
    description: "Mapa de fluxo com etapas principais da jornada do usuário.",
  },
  {
    icon: LayoutTemplate,
    title: "Arquitetura de informação",
    description: "Estrutura de conteúdo e hierarquia de informação por tela.",
  },
  {
    icon: PenTool,
    title: "Protótipo navegável",
    description: "Protótipo navegável com orientações para design e desenvolvimento.",
  },
];

const stages = [
  {
    number: "01",
    title: "Imersão",
    description: "Levantamento de contexto, metas e principais bloqueios da experiência atual.",
  },
  {
    number: "02",
    title: "Estratégia",
    description: "Definição de jornada, prioridade de conteúdo e critérios de decisão para a interface.",
  },
  {
    number: "03",
    title: "Prototipação",
    description: "Construção de wireframes e protótipos para validar clareza, navegação e conversão.",
  },
  {
    number: "04",
    title: "Direcionamento",
    description: "Handoff com recomendações práticas para implementação e evolução contínua.",
  },
];

function createUxDesignSchema() {
  const pageUrl = absoluteUrl(routes.uxDesignService);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "UX Design",
        serviceType: "UX Design",
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
        name: "UX Design | Robson Svicero",
        description:
          "Serviço de UX Design com pesquisa, arquitetura de informação e prototipação para melhorar clareza, usabilidade e conversão.",
      },
    ],
  };
}

export default function UXDesign() {
  return (
    <>
      <SEO
        title="UX Design | Estrutura, fluxo e prototipação"
        description="Serviço de UX Design para estruturar jornadas digitais com mais clareza, reduzir fricções e melhorar a conversão do seu site."
        path={routes.uxDesignService}
        structuredData={createUxDesignSchema()}
      />

      <Layout>
        <ScrollReveal as="section" className="section service-hero" aria-labelledby="ux-design-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Serviços • UX Design</p>
              <h1 id="ux-design-title">Experiências mais claras para transformar visita em decisão.</h1>
              <p className="lead">
                O trabalho de UX Design organiza conteúdo, jornada e interface para que a pessoa
                entenda sua oferta mais rápido e saiba exatamente qual próximo passo dar.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Falar sobre UX Design
                </Button>
                <Button as={Link} to={routes.services} variant="secondary">
                  Voltar para serviços
                </Button>
              </div>
              <p className="page-description">
                Ideal para empresas com site confuso, baixa conversão ou dificuldade para comunicar valor.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">ux-clarity.flow</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Jornada do usuário</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>Pesquisa</span>
                      <span>Fluxo</span>
                      <span>Protótipo</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Foco</span>
                      <strong>Clareza</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Objetivo</span>
                      <strong>Conversão</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Entrega</span>
                      <strong>Direcionamento</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section landing-includes-section" aria-labelledby="ux-pillars-title">
          <div className="container stack landing-includes-container" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="O que inclui"
              title="Pilares do serviço de UX Design"
              subtitle="Fundamentos essenciais para criar experiências intuitivas, envolventes e orientadas à conversão."
              id="ux-pillars-title"
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

        <ScrollReveal as="section" className="section landing-deliverables-section" aria-labelledby="ux-deliverables-title">
          <div className="container landing-deliverables-layout">
            <SectionHeader
              label="Entregáveis"
              title="O que você recebe ao final do projeto"
              subtitle="Um direcionamento prático para corrigir fricções da experiência e evoluir sua presença digital com mais consistência."
              id="ux-deliverables-title"
              align="left"
              className="landing-deliverables-header"
              style={{ marginBottom: 0 }}
            />

            <div className="landing-deliverables-grid" role="list" aria-label="Entregáveis do serviço de UX Design">
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

        <ScrollReveal as="section" className="section process-section--creation landing-how-it-works-section" aria-labelledby="ux-stages-title">
          <div className="container grid-1-2">
            <SectionHeader
              label="Como funciona"
              title="Etapas do trabalho em UX Design"
              subtitle="Processo claro e colaborativo para assegurar que cada decisão de design atenda aos objetivos do seu usuário e do seu negócio."
              id="ux-stages-title"
              align="left"
              style={{ marginBottom: 0 }}
            />

            <ol className="process-list" aria-label="Etapas do serviço de UX Design">
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
          <CTA content={pageCtaContent.uxDesignService} titleId="ux-design-cta-title" />
        </ScrollReveal>
      </Layout>
    </>
  );
}
