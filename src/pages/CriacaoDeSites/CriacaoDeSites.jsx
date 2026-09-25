import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, faqContent, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import Process from "../../sections/Process/Process.jsx";
import Faq from "../../sections/Faq/Faq.jsx";

const solutions = [
  {
    title: "Site institucional",
    description:
      "Uma presença digital completa para apresentar sua empresa, serviços, diferenciais e formas de contato com clareza.",
    fit: "Para empresas que precisam transmitir confiança",
  },
  {
    title: "Landing page",
    description:
      "Uma página direta e focada em conversão para campanhas, lançamentos, anúncios ou uma oferta específica.",
    fit: "Para campanhas que precisam gerar contatos",
  },
  {
    title: "Blog profissional",
    description:
      "Uma estrutura editorial preparada para publicar conteúdo, responder dúvidas e construir autoridade no Google.",
    fit: "Para negócios que querem crescer com conteúdo",
  },
];

const offerings = [
  {
    title: "Clareza da oferta",
    description:
      "Organizamos a mensagem, a hierarquia da página e os pontos que precisam ficar claros logo no primeiro contato.",
  },
  {
    title: "Confiança no primeiro acesso",
    description:
      "Criamos uma interface alinhada à sua marca, com leitura rápida, presença profissional e comportamento responsivo.",
  },
  {
    title: "Velocidade e presença no Google",
    description:
      "Entregamos o site em React com estrutura semântica, performance, SEO on-page e base preparada para crescer.",
  },
];

function createSiteCreationSchema() {
  const pageUrl = absoluteUrl(routes.siteCreation);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${absoluteUrl("/")}#professional-service`,
        name: "Robson Svicero",
        url: absoluteUrl("/"),
        image: absoluteUrl("/assets/images/og-image.webp"),
        telephone: "+55 11 96493-2007",
        email: "ola@robsonsvicero.com.br",
        areaServed: ["São Paulo", "Brasil"],
        sameAs: [
          "https://www.linkedin.com/in/robsonsvicero/",
          "https://www.behance.net/robsonsvicero",
          "https://github.com/robsonsvicero",
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Criação de sites profissionais",
        description:
          "Criação de sites profissionais com foco em clareza, credibilidade, SEO e conversão.",
        serviceType: "Criação de sites",
        provider: {
          "@id": `${absoluteUrl("/")}#professional-service`,
        },
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqContent.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export default function CriacaoDeSites() {
  return (
    <>
      <SEO
        title="Criação de Sites para Pequenas Empresas em São Paulo | Robson Svicero"
        description="Desenvolvimento de sites profissionais, rápidos e responsivos para pequenas empresas, prestadores de serviço e negócios locais em São Paulo. SEO básico e WhatsApp integrado."
        path="/criacao-de-sites"
        structuredData={createSiteCreationSchema()}
      />
      <Layout>
        <section className="section service-hero" aria-labelledby="services-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Criação de sites</p>
              <h1 id="services-title">Criação de sites profissionais para pequenas empresas</h1>
              <p className="page-description">
                Um foco, um serviço: criar o seu site profissional.
              </p>
              <p className="lead">
                Desenvolvimento de sites profissionais para pequenas empresas, prestadores de serviço e negócios locais que precisam transmitir confiança, aparecer melhor no Google e gerar mais contatos pelo WhatsApp.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Conversar pelo WhatsApp
                </Button>
                <Button variant="secondary" href="#o-que-oferecemos">
                  Ver o que está incluso
                </Button>
              </div>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">site-profissional.dev</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Página inicial</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>SEO base</span>
                      <span>UX/UI</span>
                      <span>React</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Oferta</span>
                      <strong>Site profissional</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Contato</span>
                      <strong>CTA direto</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Admin</span>
                      <strong>Conteúdo editável</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="section surface-band" aria-labelledby="solutions-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Soluções</p>
              <h2 id="solutions-title">Uma estrutura para cada objetivo do negócio</h2>
              <p className="lead">
                O mesmo cuidado estratégico e técnico se adapta ao momento da sua empresa, ao tipo de oferta e à ação que você quer gerar.
              </p>
            </div>
            <div className="grid-3">
              {solutions.map((solution) => (
                <Card className="feature" key={solution.title}>
                  <p className="eyebrow">{solution.fit}</p>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="o-que-oferecemos" aria-labelledby="offerings-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">O que faz um site funcionar</p>
              <h2 id="offerings-title">Clareza, confiança e presença no Google</h2>
            </div>
            <div className="grid-3">
              {offerings.map((item) => (
                <Card className="feature" key={item.title}>
                  <p className="eyebrow">{item.title}</p>
                  <p>{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Process />
        <CTA content={pageCtaContent.siteCreation} titleId="services-cta-title" />
        <Faq className="surface-band" />
      </Layout>
    </>
  );
}
