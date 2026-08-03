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
    title: "Configuração estratégica",
    description:
      "Estruturação completa do perfil para refletir com clareza serviços, diferenciais e áreas de atuação.",
  },
  {
    title: "Otimização local",
    description:
      "Ajustes de categorias, descrições, atributos e publicações para melhorar relevância em buscas locais.",
  },
  {
    title: "Gestão de presença",
    description:
      "Direcionamento contínuo para manter o perfil ativo, confiável e preparado para gerar contatos qualificados.",
  },
];

const deliverables = [
  "Diagnóstico do perfil atual com pontos de melhoria.",
  "Plano de otimização local com ajustes prioritários.",
  "Configuração de informações-chave para fortalecer credibilidade.",
  "Diretrizes de manutenção para manter consistência e crescimento.",
];

const stages = [
  {
    number: "01",
    title: "Análise",
    description: "Levantamento do cenário atual, concorrência local e oportunidades de posicionamento.",
  },
  {
    number: "02",
    title: "Otimização",
    description: "Ajustes estruturais no perfil para melhorar clareza, confiança e relevância de busca.",
  },
  {
    number: "03",
    title: "Ativação",
    description: "Organização de conteúdo e publicações para manter o perfil ativo e atrativo.",
  },
  {
    number: "04",
    title: "Ritmo",
    description: "Plano de continuidade para sustentar crescimento e geração de novos contatos.",
  },
];

function createGmnServiceSchema() {
  const pageUrl = absoluteUrl(routes.gmnService);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Gestão de Google Meu Negócio",
        serviceType: "Gestão de presença local",
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
        name: "Gestão de GMN | Robson Svicero",
        description:
          "Serviço de gestão de Google Meu Negócio para melhorar presença local, visibilidade e geração de contatos.",
      },
    ],
  };
}

export default function GestaoGMN() {
  return (
    <>
      <SEO
        title="Gestão de GMN | Presença local com mais visibilidade"
        description="Serviço de Gestão de Google Meu Negócio para fortalecer sua presença local e gerar mais contatos qualificados."
        path={routes.gmnService}
        structuredData={createGmnServiceSchema()}
      />

      <Layout>
        <section className="section service-hero" aria-labelledby="gmn-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Serviços • Gestão de GMN</p>
              <h1 id="gmn-title">Presença local bem estruturada para ser encontrado no momento certo.</h1>
              <p className="lead">
                A gestão de Google Meu Negócio organiza seu perfil para aumentar visibilidade local,
                transmitir confiança e facilitar o contato de quem já está procurando pelo seu serviço.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Falar sobre gestão de GMN
                </Button>
                <Button as={Link} to={routes.services} variant="secondary">
                  Voltar para serviços
                </Button>
              </div>
              <p className="page-description">
                Ideal para negócios locais que precisam melhorar alcance no Google Maps e nas pesquisas da região.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">local-presence.maps</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Perfil local</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>Perfil</span>
                      <span>Avaliações</span>
                      <span>Local</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Foco</span>
                      <strong>Busca local</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Objetivo</span>
                      <strong>Mais contatos</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Entrega</span>
                      <strong>Plano de gestão</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="section" aria-labelledby="gmn-pillars-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">O que inclui</p>
              <h2 id="gmn-pillars-title">Pilares do serviço de Gestão de GMN</h2>
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

        <section className="section dark-band" aria-labelledby="gmn-deliverables-title">
          <div className="container grid-2">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Entregáveis</p>
              <h2 id="gmn-deliverables-title">O que você recebe ao final do projeto</h2>
              <p className="lead">
                Um direcionamento prático para fortalecer presença local, manter o perfil ativo
                e ampliar a geração de oportunidades comerciais.
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

        <section className="section" aria-labelledby="gmn-stages-title">
          <div className="container grid-1-2">
            <div>
              <p className="eyebrow">Como funciona</p>
              <h2 id="gmn-stages-title">Etapas do trabalho em Gestão de GMN</h2>
            </div>

            <ol className="process-list" aria-label="Etapas do serviço de gestão de Google Meu Negócio">
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

        <CTA content={pageCtaContent.gmnService} titleId="gmn-service-cta-title" />
      </Layout>
    </>
  );
}
