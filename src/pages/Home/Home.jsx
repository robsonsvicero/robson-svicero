import CookieBanner from "../../components/CookieBanner/CookieBanner.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { pageCtaContent } from "../../content/siteContent.js";
import { useHomeInteractions } from "../../hooks/useHomeInteractions.js";
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

export default function Home() {
  const { showCookieBanner, acceptCookies } = useHomeInteractions();

  return (
    <>
      <SEO
        title="Criação de Sites Profissionais | Robson Svicero"
        description="Desenvolvedor web em São Paulo especializado na criação de sites profissionais com foco em performance, SEO, conversão e uso complementar de IA."
        path="/"
      />
      <Layout mainProps={{ id: "inicio" }}>
        <Hero />
        <CredibilityBar />
        <Services />
        <About />
        <Testimonials />
        <ClaroMethod />
        <Partners />
        <Projects />
        <LatestArticles />
        <CTA content={pageCtaContent.home} titleId="home-cta-title" />
        <Contact />
      </Layout>
      {showCookieBanner && <CookieBanner onAccept={acceptCookies} />}
    </>
  );
}
