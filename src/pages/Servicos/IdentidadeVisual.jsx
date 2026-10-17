import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import { Link } from "react-router-dom";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { Target, LayoutTemplate, Gauge, SearchCheck, PenTool } from "lucide-react";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";

const pillars = [
  {
    icon: Target,
    title: "Posicionamento visual",
    description:
      "Direção criativa baseada no posicionamento da marca para garantir coerência entre discurso e percepção.",
  },
  {
    icon: LayoutTemplate,
    title: "Sistema de identidade",
    description:
      "Definição de logo, paleta, tipografia e elementos de apoio para uma comunicação consistente em todos os pontos de contato.",
  },
  {
    icon: Gauge,
    title: "Aplicação com clareza",
    description:
      "Guia prático para manter unidade visual em site, redes sociais, materiais institucionais e apresentações.",
  },
];

const deliverables = [
  {
    icon: SearchCheck,
    title: "Diagnóstico visual",
    description: "Diagnóstico visual da presença atual com oportunidades de melhoria.",
  },
  {
    icon: Target,
    title: "Conceito criativo",
    description: "Conceito criativo com direção estética e verbal da marca.",
  },
  {
    icon: LayoutTemplate,
    title: "Kit de identidade",
    description: "Kit de identidade com logo, cores, tipografia e componentes base.",
  },
  {
    icon: PenTool,
    title: "Guia de uso",
    description: "Guia de uso para manter consistência no dia a dia.",
  },
];

const stages = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Análise da identidade atual, concorrência e percepção desejada para a marca.",
  },
  {
    number: "02",
    title: "Direção",
    description: "Construção do conceito visual alinhado ao posicionamento e objetivos de negócio.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description: "Criação dos elementos centrais da identidade com variações e regras de aplicação.",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Organização dos ativos finais e guia para aplicação consistente da marca.",
  },
];

function createVisualIdentitySchema() {
  const pageUrl = absoluteUrl(routes.visualIdentityService);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Identidade Visual",
        serviceType: "Branding e Identidade Visual",
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
        name: "Identidade Visual | Robson Svicero",
        description:
          "Serviço de identidade visual para estruturar uma marca consistente com posicionamento, clareza e reconhecimento.",
      },
    ],
  };
}

export default function IdentidadeVisual() {
  return (
    <>
      <SEO
        title="Identidade Visual | Marca consistente e profissional"
        description="Serviço de identidade visual para construir uma presença de marca coerente, memorável e alinhada aos objetivos do seu negócio."
        path={routes.visualIdentityService}
        structuredData={createVisualIdentitySchema()}
      />

      <Layout>
        <ScrollReveal as="section" className="section service-hero" aria-labelledby="identidade-visual-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Serviços • Identidade Visual</p>
              <h1 id="identidade-visual-title">Uma identidade visual que comunica valor com consistência.</h1>
              <p className="lead">
                A identidade visual organiza a forma como sua marca aparece no mundo digital para
                gerar reconhecimento, confiança e coerência em cada ponto de contato.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Falar sobre identidade visual
                </Button>
                <Button as={Link} to={routes.services} variant="secondary">
                  Voltar para serviços
                </Button>
              </div>
              <p className="page-description">
                Ideal para negócios que precisam sair da comunicação improvisada e assumir uma presença mais profissional.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">brand-system.studio</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Sistema de marca</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>Logo</span>
                      <span>Cores</span>
                      <span>Tipografia</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Foco</span>
                      <strong>Consistência</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Objetivo</span>
                      <strong>Reconhecimento</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Entrega</span>
                      <strong>Guia de marca</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section landing-includes-section" aria-labelledby="identidade-pillars-title">
          <div className="container stack landing-includes-container" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="O que inclui"
              title="Pilares do serviço de Identidade Visual"
              subtitle="Criação de marcas, tipografia, paletas de cores e manuais de identidade preparados para escala."
              id="identidade-pillars-title"
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

        <ScrollReveal as="section" className="section landing-deliverables-section" aria-labelledby="identidade-deliverables-title">
          <div className="container landing-deliverables-layout">
            <SectionHeader
              label="Entregáveis"
              title="O que você recebe ao final do projeto"
              subtitle="Uma base visual clara para sustentar sua comunicação com mais profissionalismo em campanhas, canais digitais e materiais institucionais."
              id="identidade-deliverables-title"
              align="left"
              className="landing-deliverables-header"
              style={{ marginBottom: 0 }}
            />

            <div className="landing-deliverables-grid" role="list" aria-label="Entregáveis do serviço de identidade visual">
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

        <ScrollReveal as="section" className="section process-section--creation landing-how-it-works-section" aria-labelledby="identidade-stages-title">
          <div className="container grid-1-2">
            <SectionHeader
              label="Como funciona"
              title="Etapas do trabalho em Identidade Visual"
              subtitle="Imersão na história e valores da sua marca, exploração de caminhos criativos e consolidação das diretrizes."
              id="identidade-stages-title"
              align="left"
              style={{ marginBottom: 0 }}
            />

            <ol className="process-list" aria-label="Etapas do serviço de identidade visual">
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
          <CTA content={pageCtaContent.visualIdentityService} titleId="identidade-visual-cta-title" />
        </ScrollReveal>
      </Layout>
    </>
  );
}
