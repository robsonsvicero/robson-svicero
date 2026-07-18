import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, faqContent, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import Process from "../../sections/Process/Process.jsx";
import Faq from "../../sections/Faq/Faq.jsx";

const offerings = [
  {
    title: "Estratégia e conteúdo",
    description:
      "Organizamos a mensagem, a hierarquia da página e os pontos que precisam ficar claros logo no primeiro contato.",
  },
  {
    title: "Design sob medida",
    description:
      "Criamos uma interface alinhada à sua marca, com leitura rápida, presença profissional e comportamento responsivo.",
  },
  {
    title: "Desenvolvimento e SEO base",
    description:
      "Entregamos o site em React com estrutura semântica, performance, SEO on-page e base preparada para crescer.",
  },
];

const aiHighlights = [
  "Uso IA para acelerar pesquisa, organização de referências e refinamento inicial de texto.",
  "A direção estratégica, o tom da marca e a revisão final continuam sendo conduzidos por mim.",
  "Isso ajuda a ganhar velocidade sem abrir mão de consistência, clareza e personalidade.",
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

function createServicesSchema() {
  const pageUrl = absoluteUrl(routes.services);

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

export default function Services() {
  return (
    <>
      <SEO
        title="Criação de sites profissionais"
        description="Criação de sites profissionais com foco em clareza, credibilidade, SEO, conversão e uso de IA como apoio no processo."
        path="/servicos"
        structuredData={createServicesSchema()}
      />
      <Layout>
        <section className="section service-hero" aria-labelledby="services-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Criação de sites</p>
              <h1 id="services-title">Um foco, um serviço: criar o seu site profissional.</h1>
              <p className="lead">
                Estruturamos a presença digital da sua marca com uma página clara, responsiva e
                preparada para apresentar melhor sua oferta, ganhar credibilidade e gerar
                contato.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Falar no WhatsApp
                </Button>
                <Button variant="secondary" href="#o-que-oferecemos">
                  Ver a estrutura
                </Button>
              </div>
              <p className="page-description">
                Sites pensados para empresas e profissionais que precisam sair da presença
                improvisada e entrar em uma base digital mais confiável.
              </p>
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

        <section className="section" aria-labelledby="ai-title">
          <div className="container grid-2">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">IA no processo</p>
              <h2 id="ai-title">Crio sites alinhados com o uso de IA como apoio de produção</h2>
              <p className="lead">
                A IA entra como uma ferramenta para acelerar pesquisa, estruturar ideias e ajudar
                no refinamento do conteúdo. O resultado final continua sendo estratégico, humano e
                ajustado à voz da sua marca.
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

        <section className="section" aria-labelledby="admin-title">
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
        
        <CTA content={pageCtaContent.services} titleId="services-cta-title" />

        <section hidden aria-hidden="true" className="section" id="servicos-inclusos">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Serviços inclusos na criação do seu site profissional</p>
              <h2>Base preparada para entregar o projeto completo</h2>
            </div>
            <div className="grid-3">
              {includedServices.map((item) => (
                <Card className="feature" key={item}>
                  <p>{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Process />
        <Faq />
      </Layout>
    </>
  );
}
