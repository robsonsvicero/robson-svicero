import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { contactLinks } from "../../content/siteContent.js";
import { getSiteCreationPageBySlug } from "../../data/siteCreationPages.js";
import { absoluteUrl } from "../../utils/seo.js";
import NotFound from "../NotFound/NotFound.jsx";

function createServiceSchema(page) {
  const pageUrl = absoluteUrl(page.path);
  const providerId = `${absoluteUrl("/")}#professional-service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": providerId,
        name: "Robson Svicero",
        url: absoluteUrl("/"),
        image: absoluteUrl("/assets/images/og-image.webp"),
        telephone: "+55 11 96493-2007",
        email: "ola@robsonsvicero.com.br",
        areaServed: ["São Paulo", "Brasil"],
        priceRange: "$$",
        sameAs: [
          "https://www.linkedin.com/in/robsonsvicero/",
          "https://www.behance.net/robsonsvicero",
          "https://github.com/robsonsvicero",
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.title,
        description: page.seoDescription,
        serviceType: page.eyebrow,
        provider: {
          "@id": providerId,
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
        mainEntity: page.faq.map((item) => ({
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

export default function SiteCreationPage() {
  const { slug } = useParams();
  const page = getSiteCreationPageBySlug(slug || "index");

  if (!page) return <NotFound />;

  const relatedPages = page.relatedPages
    .map((relatedSlug) => getSiteCreationPageBySlug(relatedSlug))
    .filter(Boolean);

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        path={page.path}
        structuredData={createServiceSchema(page)}
      />
      <Layout>
        <section className="section service-hero" aria-labelledby="service-page-title">
          <div className="container service-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1 id="service-page-title">{page.title}</h1>
              <p className="lead">{page.intro}</p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  {page.ctaText}
                </Button>
                <Button variant="secondary" href={slug ? "#processo" : "#opcoes"}>
                  {page.secondaryCtaText}
                </Button>
              </div>
            </div>

            <aside className="service-quick-contact" aria-label="Contato rápido">
              <span className="meta">Contato rápido</span>
              <strong>Converse sobre escopo, prazo e objetivo da página.</strong>
              <p>
                Envie uma mensagem com o tipo de site que você precisa e receba um
                direcionamento inicial para o projeto.
              </p>
              <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                Chamar no WhatsApp
              </Button>
            </aside>
          </div>
        </section>

        <section className="section surface-band" aria-labelledby="for-whom-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Para quem é</p>
              <h2 id="for-whom-title">Quando esta página faz sentido</h2>
            </div>
            <div className="grid-3">
              {page.forWhom.map((item) => (
                <Card className="feature" key={item}>
                  <span className="feature-mark">+</span>
                  <p>{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="deliverables-title">
          <div className="container grid-2">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Entregáveis</p>
              <h2 id="deliverables-title">Base pensada para SEO, clareza e conversão</h2>
              <p className="lead">
                A entrega combina estrutura de conteúdo, design de interface e
                desenvolvimento para transformar tráfego em contato qualificado.
              </p>
            </div>
            <div className="stack">
              {page.outcomes.map((item) => (
                <div className="service-check" key={item}>
                  <span aria-hidden="true">OK</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section dark-band"
          id="processo"
          aria-labelledby="process-title"
        >
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Como funciona</p>
              <h2 id="process-title">Processo transparente do briefing à publicação</h2>
            </div>
            <ol className="timeline">
              {page.process.map((step, index) => (
                <li className="step" key={step}>
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="opcoes" aria-labelledby="related-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Arquitetura MoFU/BoFU</p>
              <h2 id="related-title">Páginas específicas para buscas de alta intenção</h2>
            </div>
            <div className="grid-3">
              {relatedPages.map((relatedPage) => (
                <Card className="feature" key={relatedPage.slug}>
                  <p className="eyebrow">{relatedPage.eyebrow}</p>
                  <h3>{relatedPage.title}</h3>
                  <p>{relatedPage.seoDescription}</p>
                  <Button
                    className="btn-arrow"
                    variant="ghost"
                    as={Link}
                    to={relatedPage.path}
                  >
                    Acessar página
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section surface-band" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title">Dúvidas antes de contratar</h2>
            </div>
            <div className="stack" style={{ gap: "var(--space-3)" }}>
              {page.faq.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
