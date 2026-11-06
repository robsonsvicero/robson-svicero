import { useEffect } from "react";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { absoluteUrl } from "../../utils/seo.js";
import CredibilityBar from "../../sections/CredibilityBar/CredibilityBar.jsx";
import Hero from "../../sections/Hero/Hero.jsx";
import HomeCta from "../../sections/HomeCta/HomeCta.jsx";
import Projects from "../../sections/Projects/Projects.jsx";
import Services from "../../sections/Services/Services.jsx";
import Testimonials from "../../sections/Testimonials/Testimonials.jsx";
import LatestArticles from "../../sections/LatestArticles/LatestArticles.jsx";

function createHomeSchema() {
  const homeUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${homeUrl}#professional-service`,
        name: "Robson Svicero",
        url: homeUrl,
        image: absoluteUrl("/assets/images/og-image.webp"),
        telephone: "+55 11 96493-2007",
        areaServed: ["São Paulo", "Brasil"],
        serviceType: "Criação de sites profissionais",
        email: "ola@robsonsvicero.com.br",
        sameAs: [
          "https://www.instagram.com/robson.svicero",
          "https://www.linkedin.com/in/robsonsvicero/",
          "https://github.com/robsonsvicero",
          "https://www.behance.net/robsonsvicero",
        ],
        description:
          "Criação de sites profissionais com foco em SEO, performance, conversão e atendimento para empresas em São Paulo.",
      },
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        url: homeUrl,
        name: "Robson Svicero",
        description:
          "Criação de sites profissionais em São Paulo com foco em performance, SEO e conversão.",
        inLanguage: "pt-BR",
        publisher: {
          "@id": `${homeUrl}#professional-service`,
        },
      },
    ],
  };
}

export default function Home() {
  useEffect(() => {
    const modelContext = navigator.modelContext;
    if (!modelContext?.registerTool) return undefined;

    return modelContext.registerTool({
      name: "get-site-services",
      description: "Lista os serviços de criação de sites, UX, landing pages, SEO e identidade visual oferecidos por Robson Svicero.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: async () => ({
        content: [{ type: "text", text: "Criação de sites, UX Design, landing pages, SEO, redesign e identidade visual. Contato: ola@robsonsvicero.com.br." }],
      }),
    });
  }, []);

  return (
    <>
      <SEO
        title="Criação de Sites Profissionais em São Paulo"
        description="Criação de sites profissionais em São Paulo com foco em SEO, performance, conversão e experiência do usuário para empresas e marcas."
        path="/"
        structuredData={createHomeSchema()}
      />
      <Layout mainProps={{ id: "inicio" }}>
        <Hero />
        <Services />
        <Projects />
        <Testimonials />
        <LatestArticles />
        <HomeCta />
      </Layout>
    </>
  );
}
