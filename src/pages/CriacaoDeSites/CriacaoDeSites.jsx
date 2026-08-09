import Layout from "../../components/layout/Layout/Layout.jsx";
import { Link } from "react-router-dom";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, faqContent, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import Process from "../../sections/Process/Process.jsx";
import Faq from "../../sections/Faq/Faq.jsx";
import { ArrowRight } from "lucide-react";

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

const aiHighlights = [
  "Sua empresa já existe, mas o site não transmite confiança.",
  "Você recebe poucas mensagens pelo site.",
  "Quer aparecer melhor nas buscas do Google.",
  "Precisa de uma presença digital profissional sem complicação.",
];

const adminHighlights = [
  "Atualização de textos, imagens e chamadas principais sem refazer o site.",
  "Edição de seções-chave como serviços, destaques e provas sociais.",
  "Base pensada para acompanhar novas páginas e ajustes futuros.",
];

const includedServices = [
  "Briefing e diagnóstico inicial",
  "Arquitetura da informação",
  "Copy base para a página",
  "Direção visual e UI",
  "Desenvolvimento em React",
  "SEO on-page essencial",
  "Publicação e orientação de uso",
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
                  Falar no WhatsApp
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

        <section className="section surface-band" aria-labelledby="ai-title">
          <div className="container grid-2">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Ideal para</p>
              <h2 id="ai-title">Esse serviço é para você se...</h2>
              <p className="lead">
                Seu negócio já existe, mas a sua presença digital ainda não transmite a mesma confiança e profissionalismo do trabalho que você entrega.
              </p>
            </div>

            <Card className="stack" as="div">
              {aiHighlights.map((item) => (
                <div className="service-check" key={item}>
                  <span aria-hidden="true">OK</span>
                  <p>{item}</p>
                </div>
              ))}
            </Card>
          </div>
        </section>

        <section className="section" id="o-que-oferecemos" aria-labelledby="offerings-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">O que oferecemos</p>
              <h2 id="offerings-title">Uma estrutura completa para o seu site principal</h2>
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

        <section className="section surface-band" aria-labelledby="admin-title">
          <div className="container grid-2">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Painel administrativo</p>
              <h2 id="admin-title">Um painel simples para manter o site vivo depois da entrega</h2>
              <p className="lead">
                Quando o projeto pede autonomia na rotina de atualização, a base pode incluir um
                painel administrativo para manter textos, imagens e blocos importantes sob
                controle.
              </p>
            </div>

            <Card className="stack">
              {adminHighlights.map((item) => (
                <div className="service-check" key={item}>
                  <span aria-hidden="true">OK</span>
                  <p>{item}</p>
                </div>
              ))}
            </Card>
          </div>
        </section>
        
        <CTA content={pageCtaContent.siteCreation} titleId="services-cta-title" />

        <section className="section site-included-services" id="servicos-inclusos" aria-labelledby="servicos-inclusos-title">
          <div className="container stack site-included-services-stack">
            <div className="site-included-services-header stack">
              <p className="eyebrow">Serviços inclusos na criação do seu site profissional</p>
              <h2 id="servicos-inclusos-title">Base preparada para entregar o projeto completo</h2>
              <p className="lead">
                Desenvolvimento de sites profissionais para pequenas empresas e prestadores de serviço em São Paulo, com foco em clareza, desempenho e geração de contatos.
              </p>
            </div>
            <div className="site-included-services-grid" role="list">
              {includedServices.map((item) => (
                <Card className="feature" key={item}>
                  <p>{item}</p>
                </Card>
                
              ))}
            </div>

            <div className="site-included-services-note">
              <p className="lead">
                Essa base já contempla os elementos essenciais para um site profissional, mas
                algumas frentes podem ser aprofundadas de forma estratégica conforme o estágio do
                seu negócio.
              </p>
              <div className="site-included-services-links" aria-label="Serviços complementares">
                <Link className="included-link" to={routes.claroMethod}>Método C.L.A.R.O. <ArrowRight className="included-arrow" aria-hidden="true" /></Link>
                <Link className="included-link" to={routes.seoService}>SEO para negócios locais <ArrowRight className="included-arrow" aria-hidden="true" /></Link>
                <Link className="included-link" to={routes.uxDesignService}>UX Design <ArrowRight className="included-arrow" aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </section>

        <Process />
        <Faq />
      </Layout>
    </>
  );
}
