import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import LatestArticles from "../../sections/LatestArticles/LatestArticles.jsx";
import Process from "../../sections/Process/Process.jsx";
import Projects from "../../sections/Projects/Projects.jsx";

const localBenefits = [
  {
    title: "Estratégia para São Paulo",
    description:
      "A página organiza sua oferta para conversar com empresas e clientes que pesquisam soluções na cidade e na região.",
  },
  {
    title: "Presença profissional",
    description:
      "Uma experiência responsiva, rápida e alinhada à sua marca para transmitir confiança desde o primeiro acesso.",
  },
  {
    title: "Contato sem complicação",
    description:
      "CTAs claros e integração com WhatsApp para facilitar o próximo passo de quem já está pronto para conversar.",
  },
];

function createLocalPageSchema() {
  const pageUrl = absoluteUrl(routes.siteCreationSaoPaulo);
  const businessUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${businessUrl}#professional-service`,
        name: "Robson Svicero",
        url: businessUrl,
        telephone: "+55 11 96493-2007",
        areaServed: {
          "@type": "City",
          name: "São Paulo",
          containedInPlace: {
            "@type": "Country",
            name: "Brasil",
          },
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Criação de sites em São Paulo",
        description:
          "Criação de sites profissionais para empresas de São Paulo, com foco em clareza, performance, SEO e geração de contatos.",
        serviceType: "Criação de sites profissionais",
        provider: {
          "@id": `${businessUrl}#professional-service`,
        },
        areaServed: {
          "@type": "City",
          name: "São Paulo",
        },
        url: pageUrl,
      },
    ],
  };
}

export default function CriacaoDeSitesSaoPaulo() {
  return (
    <>
      <SEO
        title="Criação de Sites em São Paulo | Robson Svicero"
        description="Criação de sites profissionais em São Paulo para empresas que querem transmitir confiança, aparecer melhor no Google e gerar mais contatos."
        path={routes.siteCreationSaoPaulo}
        structuredData={createLocalPageSchema()}
      />
      <Layout>
        <section className="section service-hero" aria-labelledby="sao-paulo-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Criação de sites em São Paulo</p>
              <h1 id="sao-paulo-title">
                Criação de sites em São Paulo para negócios que querem crescer com presença digital profissional
              </h1>
              <p className="lead">
                Desenvolvo sites para empresas de São Paulo que precisam aparecer melhor, transmitir confiança e receber mais contatos pelo WhatsApp.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Criar meu site em São Paulo
                </Button>
                <Button variant="secondary" href="#beneficios-locais">
                  Conhecer a estrutura
                </Button>
              </div>
              <p className="page-description">
                Atendimento em São Paulo e projetos remotos para todo o Brasil.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">site-em-sao-paulo.dev</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Presença local</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>São Paulo</span>
                      <span>SEO local</span>
                      <span>WhatsApp</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Foco</span>
                      <strong>Presença local</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Objetivo</span>
                      <strong>Mais contatos</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Atendimento</span>
                      <strong>Direto e remoto</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="section surface-band" id="beneficios-locais" aria-labelledby="local-benefits-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Por que criar seu site em São Paulo</p>
              <h2 id="local-benefits-title">Uma presença digital preparada para o seu mercado</h2>
              <p className="lead">
                Seu site precisa explicar o valor do negócio, facilitar a decisão e criar um caminho simples até o contato.
              </p>
            </div>

            <div className="grid-3" role="list">
              {localBenefits.map((benefit) => (
                <Card className="feature" key={benefit.title} role="listitem">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Projects />
        <Process />
        <CTA content={pageCtaContent.siteCreationSaoPaulo} titleId="sao-paulo-cta-title" />
        <LatestArticles limit={3} />
      </Layout>
    </>
  );
}
