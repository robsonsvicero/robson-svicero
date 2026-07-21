import CookieBanner from "../../components/CookieBanner/CookieBanner.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { pageCtaContent } from "../../content/siteContent.js";
import { useHomeInteractions } from "../../hooks/useHomeInteractions.js";
import { absoluteUrl } from "../../utils/seo.js";
import Contact from "../../sections/Contact/Contact.jsx";
import About from "../../sections/About/About.jsx";
import ClaroMethod from "../../sections/ClaroMethod/ClaroMethod.jsx";
import CredibilityBar from "../../sections/CredibilityBar/CredibilityBar.jsx";
import Faq from "../../sections/Faq/Faq.jsx";
import Hero from "../../sections/Hero/Hero.jsx";
import Partners from "../../sections/Partners/Partners.jsx";
import Projects from "../../sections/Projects/Projects.jsx";
import LatestArticles from "../../sections/LatestArticles/LatestArticles.jsx";
import Services from "../../sections/Services/Services.jsx";
import Testimonials from "../../sections/Testimonials/Testimonials.jsx";

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
  const { showCookieBanner, acceptCookies } = useHomeInteractions();

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
        <CredibilityBar />
        <Services />
        <About />
        <Testimonials />
        <CTA content={pageCtaContent.home} titleId="home-cta-title" />
        <ClaroMethod />
        <Partners />
        <Projects />
        <LatestArticles />
        <Contact />
      </Layout>
      {showCookieBanner && <CookieBanner onAccept={acceptCookies} />}
    </>
  );
}
