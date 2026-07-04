import BackToTopButton from "../../components/BackToTopButton/BackToTopButton.jsx";
import CookieBanner from "../../components/CookieBanner/CookieBanner.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { useHomeInteractions } from "../../hooks/useHomeInteractions.js";
import Contact from "../../sections/Contact/Contact.jsx";
import Credibility from "../../sections/Credibility/Credibility.jsx";
import CredibilityBar from "../../sections/CredibilityBar/CredibilityBar.jsx";
import Differentiator from "../../sections/Differentiator/Differentiator.jsx";
import Faq from "../../sections/Faq/Faq.jsx";
import Hero from "../../sections/Hero/Hero.jsx";
import Partners from "../../sections/Partners/Partners.jsx";
import Process from "../../sections/Process/Process.jsx";
import Projects from "../../sections/Projects/Projects.jsx";
import LatestArticles from "../../sections/LatestArticles/LatestArticles.jsx";
import Services from "../../sections/Services/Services.jsx";
import Testimonials from "../../sections/Testimonials/Testimonials.jsx";

export default function Home() {
  const { showCookieBanner, acceptCookies } = useHomeInteractions();

  return (
    <>
      <SEO
        title="Desenvolvedor React.js | Landing Pages, Sites Institucionais e One Page | Robson Svicero"
        description="Desenvolvedor React.js em São Paulo especializado em Landing Pages, Sites Institucionais, Sites One Page e interfaces para produtos digitais com foco em performance, SEO e conversão."
        path="/"
      />
      <Layout mainProps={{ id: "inicio" }}>
        <Hero />
        <CredibilityBar />
        <Partners />
        <Credibility />
        <Differentiator />
        <Services />
        <Projects />
        <LatestArticles />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </Layout>
      <BackToTopButton />
      {showCookieBanner && <CookieBanner onAccept={acceptCookies} />}
    </>
  );
}
