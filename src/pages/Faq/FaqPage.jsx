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
        <Faq
          content={faqPageContent}
          id="perguntas"
          titleId="faq-list-title"
          className="faq-page-list"
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
