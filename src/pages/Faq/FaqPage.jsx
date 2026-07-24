import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { faqPageContent, pageCtaContent, routes } from "../../content/siteContent.js";
import Faq from "../../sections/Faq/Faq.jsx";
import { absoluteUrl } from "../../utils/seo.js";

function createFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(routes.faq)}#faq`,
    mainEntity: faqPageContent.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FaqPage() {
  return (
    <>
      <SEO
        title="Perguntas Frequentes sobre Criação de Sites"
        description="Tire suas dúvidas sobre valores, prazos, processo, SEO, responsividade, painel administrativo e criação de sites profissionais."
        path={routes.faq}
        structuredData={createFaqSchema()}
      />

      <Layout>
        <section className="section faq-page-hero" aria-labelledby="faq-page-title">
          <div className="container stack faq-page-hero-copy">
            <p className="eyebrow">Perguntas frequentes</p>
            <h1 id="faq-page-title">Dúvidas antes de criar seu site?</h1>
            <p className="lead">
              Encontre respostas claras sobre como funciona o projeto, o que está incluído e o que
              considerar antes de começar.
            </p>
          </div>
        </section>

        <Faq
          content={faqPageContent}
          id="perguntas"
          titleId="faq-list-title"
          className="surface-band faq-page-list"
        />

        <CTA
          content={pageCtaContent.home}
          titleId="faq-page-cta-title"
          sectionClassName="faq-page-cta"
        />
      </Layout>
    </>
  );
}
