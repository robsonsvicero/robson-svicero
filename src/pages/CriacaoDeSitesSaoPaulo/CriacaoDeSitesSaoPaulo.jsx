import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import LatestArticles from "../../sections/LatestArticles/LatestArticles.jsx";
import Process from "../../sections/Process/Process.jsx";
import Projects from "../../sections/Projects/Projects.jsx";
import Faq from "../../sections/Faq/Faq.jsx";

const localBenefits = [
  {
    title: "Estratégia para São Paulo",
    description:
      "A página organiza sua oferta para conversar com empresas e clientes que pesquisam soluções na cidade e na região.",
  },
  {
    title: "Presença profissional",
    description:
      "Uma experiência responsiva, rápida e alinhada à sua marca para transmitir confiança desde o primeiro acesso.",
  },
  {
    title: "Contato sem complicação",
    description:
      "CTAs claros e integração com WhatsApp para facilitar o próximo passo de quem já está pronto para conversar.",
  },
];

const localFaqContent = {
  eyebrow: "Perguntas frequentes",
  title: "Dúvidas sobre criação de sites em São Paulo",
  lead:
    "Entenda o processo, os prazos e o que considerar antes de contratar um site para sua empresa.",
  questions: [
    {
      question: "Quanto custa criar um site em São Paulo?",
      answer:
        "O investimento varia conforme o objetivo, o número de páginas, os recursos de integração e a complexidade do conteúdo. Landing pages possuem escopo mais enxuto, enquanto sites institucionais e lojas virtuais exigem planejamento adicional. A proposta apresenta o investimento total antes do início.",
    },
    {
      question: "Quanto tempo leva para publicar um site profissional?",
      answer:
        "O prazo depende do formato e da disponibilidade de aprovação dos textos, imagens e conteúdos da empresa. Após alinharmos o escopo, informo cronograma, entregas e marcos de aprovação antes do projeto começar.",
    },
    {
      question: "Você atende empresas de todos os bairros de São Paulo?",
      answer:
        "Sim. O atendimento pode ser remoto, com reuniões e aprovações online, atendendo empresas de qualquer região da cidade e da grande São Paulo. Também é possível conversar presencialmente conforme a disponibilidade e o escopo.",
    },
    {
      question: "O site será otimizado para pesquisas locais?",
      answer:
        "A estrutura inclui base técnica de SEO, títulos claros, conteúdo relevante, metadados, sitemap e dados estruturados. Para aumentar a presença local, o projeto pode considerar páginas de serviço, Google Business Profile e chamadas para contato ligadas à região.",
    },
    {
      question: "Vocês fornecem domínio, hospedagem e conteúdo?",
      answer:
        "Posso orientar ou realizar a configuração de domínio e hospedagem. Textos, fotos e materiais existentes podem ser aproveitados; quando necessário, organizamos o conteúdo junto com você para preservar a identidade da empresa e comunicar a proposta com clareza.",
    },
    {
      question: "Qual formato de site é mais adequado para minha empresa?",
      answer:
        "Landing pages são indicadas para campanhas e ofertas específicas. Sites institucionais servem para apresentar a empresa, serviços, diferenciais e canais de contato. A escolha considera seu público, processo comercial, prazo e objetivo de crescimento.",
    },
  ],
};

function createLocalPageSchema() {
  const pageUrl = absoluteUrl(routes.siteCreationSaoPaulo);
  const businessUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${businessUrl}#professional-service`,
        name: "Robson Svicero",
        url: businessUrl,
        telephone: "+55 11 96493-2007",
        email: "ola@robsonsvicero.com.br",
        areaServed: {
          "@type": "City",
          name: "São Paulo",
          containedInPlace: {
            "@type": "Country",
            name: "Brasil",
          },
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Criação de sites em São Paulo",
        description:
          "Criação de sites profissionais para empresas de São Paulo, com foco em clareza, performance, SEO e geração de contatos.",
        serviceType: "Criação de sites profissionais",
        provider: {
          "@id": `${businessUrl}#professional-service`,
        },
        areaServed: {
          "@type": "City",
          name: "São Paulo",
        },
        url: pageUrl,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Criação de Sites em São Paulo | Robson Svicero",
        description:
          "Site profissional para empresas de São Paulo com estratégia, design responsivo, SEO técnico e geração de contatos.",
        isPartOf: {
          "@id": `${businessUrl}#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: businessUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Criação de sites em São Paulo",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: localFaqContent.questions.map((item) => ({
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

export default function CriacaoDeSitesSaoPaulo() {
  return (
    <>
      <SEO
        title="Criação de Sites em São Paulo | Orçamento e Projetos"
        description="Criação de sites profissionais em São Paulo: estratégia, design responsivo, desenvolvimento e SEO técnico para gerar confiança e transformar visitantes em contatos."
        path={routes.siteCreationSaoPaulo}
        structuredData={createLocalPageSchema()}
      />
      <Layout>
        <ScrollReveal as="section" className="section service-hero" aria-labelledby="sao-paulo-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Criação de sites em São Paulo</p>
              <h1 id="sao-paulo-title">
                Criação de sites em São Paulo com estratégia para gerar confiança e contatos
              </h1>
              <p className="lead">
                Eu transformo sua presença digital em uma experiência clara, rápida e orientada a negócios: do posicionamento à publicação, seu site apresenta a empresa certa para o cliente certo.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Criar meu site em São Paulo
                </Button>
                <Button variant="secondary" href="#beneficios-locais">
                  Conhecer a estrutura
                </Button>
              </div>
              <p className="page-description">
                Atendimento em São Paulo e projetos remotos para todo o Brasil.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">site-em-sao-paulo.dev</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Presença local</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>São Paulo</span>
                      <span>SEO local</span>
                      <span>WhatsApp</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Foco</span>
                      <strong>Presença local</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Objetivo</span>
                      <strong>Mais contatos</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Atendimento</span>
                      <strong>Direto e remoto</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section surface-band local-benefits-section" id="beneficios-locais" aria-labelledby="local-benefits-title">
          <div className="container stack local-benefits-container" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="Por que criar seu site em São Paulo"
              title="Uma presença digital preparada para o seu mercado"
              subtitle="Sua empresa compete por atenção, confiança e espaço de resposta. Um site bem estruturado organiza sua oferta, apresenta provas relevantes e cria um caminho simples até o contato."
              id="local-benefits-title"
              align="center"
              className="local-benefits-header"
            />

            <div className="grid-3 local-benefits-grid" role="list">
              {localBenefits.map((benefit) => (
                <Card className="feature local-benefit-card" key={benefit.title} role="listitem">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section" aria-labelledby="local-site-formats-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="Formato certo para o objetivo"
              title="Escolha do site para cada momento do negócio"
              subtitle="Antes de definir telas, definimos a função do projeto. Assim, recursos e estrutura ficam alinhados ao seu processo comercial."
              id="local-site-formats-title"
              align="center"
            />

            <div className="grid-3 local-benefits-grid">
              <Card className="feature local-benefit-card">
                <h3>Site institucional</h3>
                <p>
                  Apresenta serviços, diferenciais, experiência e canais de contato. É a estrutura indicada para negócios que precisam construir autoridade e facilitar a avaliação da empresa.
                </p>
              </Card>
              <Card className="feature local-benefit-card">
                <h3>Landing page</h3>
                <p>
                  Conduz visitantes de campanhas, anúncios ou propostas comerciais para uma única ação. Funciona bem quando a empresa precisa captar contatos para uma oferta específica.
                </p>
              </Card>
              <Card className="feature local-benefit-card">
                <h3>Site com busca orgânica</h3>
                <p>
                  Reúne páginas de serviços, conteúdo estratégico e base técnica de SEO para responder dúvidas do mercado e ampliar oportunidades de encontro com clientes.
                </p>
              </Card>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Process className="process-section--creation" />
        </ScrollReveal>
        <ScrollReveal>
          <Faq
            content={localFaqContent}
            id="perguntas-sao-paulo"
            titleId="sao-paulo-faq-title"
          />
        </ScrollReveal>
        <ScrollReveal>
          <CTA className="surface-band"content={pageCtaContent.siteCreationSaoPaulo} titleId="sao-paulo-cta-title" />
        </ScrollReveal>
        <ScrollReveal>
          <LatestArticles limit={3} />
        </ScrollReveal>
      </Layout>
    </>
  );
}
