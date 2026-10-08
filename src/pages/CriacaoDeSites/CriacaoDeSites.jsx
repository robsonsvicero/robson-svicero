import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { Link } from "react-router-dom";
import { contactLinks, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import Process from "../../sections/Process/Process.jsx";
import Faq from "../../sections/Faq/Faq.jsx";

const solutions = [
  {
    title: "Site institucional",
    description:
      "Uma presença digital completa para apresentar sua empresa, serviços, diferenciais e formas de contato com clareza.",
    fit: "Para empresas que precisam transmitir confiança",
  },
  {
    title: "Landing page",
    description:
      "Uma página direta e focada em conversão para campanhas, lançamentos, anúncios ou uma oferta específica.",
    fit: "Para campanhas que precisam gerar contatos",
  },
  {
    title: "Blog profissional",
    description:
      "Uma estrutura editorial para publicar conteúdo, responder dúvidas e apoiar a presença orgânica da empresa.",
    fit: "Para negócios que planejam crescer com conteúdo",
  },
];

const offerings = [
  {
    title: "Mensagem clara",
    description:
      "O visitante precisa entender o que a empresa faz, para quem trabalha e qual é o próximo passo.",
  },
  {
    title: "Navegação bem planejada",
    description:
      "A hierarquia das informações ajuda a pessoa a encontrar respostas e avaliar a oferta com contexto.",
  },
  {
    title: "Experiência responsiva",
    description:
      "Conteúdo e navegação são organizados para diferentes telas, com atenção especial ao uso em celulares.",
  },
  {
    title: "Base técnica para SEO",
    description:
      "Estrutura semântica, páginas organizadas e boas práticas técnicas aplicadas ao escopo do projeto.",
  },
  {
    title: "Contato acessível",
    description:
      "Chamadas para ação e formas de contato posicionadas para facilitar a continuidade da conversa.",
  },
];

const featuredProjects = [
  {
    eyebrow: "Universal Music · UX Design · 2023",
    title: "Redesign Universal Music Store",
    summary:
      "Em parceria com a agência MAEZTRA, Robson atuou como UX Designer no redesign da experiência digital da Universal Music.",
    detail:
      "O trabalho reorganizou a descoberta de lançamentos, produtos e categorias, revisou fluxos de navegação e compra e definiu padrões reutilizáveis para dar mais consistência à plataforma.",
    path: "/cases/redesign-universal-music-store",
  },
  {
    eyebrow: "Instituto Sublim · Site institucional · 2026",
    title: "Um site para apresentar a causa e facilitar doações",
    summary:
      "O Instituto Sublim precisava apresentar seus projetos sociais com clareza e facilitar a aproximação de novos apoiadores.",
    detail:
      "O projeto incluiu arquitetura de conteúdo, interface responsiva e doações via PIX com QR Code dinâmico, conectando a apresentação da organização a um caminho simples para contribuir.",
    path: "/cases/instituto-sublim",
  },
];

const siteCreationFaqContent = {
  eyebrow: "Perguntas frequentes",
  title: "O que alinhar antes de criar seu site",
  lead:
    "Escopo, conteúdo, prazo e investimento são definidos de acordo com as necessidades de cada projeto.",
  questions: [
    {
      question: "Que tipo de site você desenvolve?",
      answer:
        "O projeto pode ser um site institucional, uma landing page ou uma estrutura com blog. A escolha depende do objetivo, do conteúdo e das necessidades da empresa.",
    },
    {
      question: "O que está incluído no projeto?",
      answer:
        "A proposta descreve as páginas, funcionalidades, entregas e etapas incluídas, além dos materiais necessários e dos itens que ficam fora do escopo.",
    },
    {
      question: "Quanto custa criar um site profissional?",
      answer:
        "O investimento depende do tipo de site, da quantidade de páginas, do conteúdo e das funcionalidades necessárias. A proposta é preparada depois de entender o escopo. Você também pode conhecer as opções na página de planos.",
    },
    {
      question: "Quanto tempo leva para desenvolver um site?",
      answer:
        "O prazo é definido na proposta e varia conforme o escopo, a disponibilidade dos conteúdos e o tempo de aprovação de cada etapa.",
    },
    {
      question: "Quem prepara os textos e as imagens?",
      answer:
        "Isso depende do projeto. Antes do início, combinamos quais materiais serão fornecidos pela empresa e se haverá apoio para organizar ou produzir conteúdo.",
    },
    {
      question: "Domínio, hospedagem e manutenção estão incluídos?",
      answer:
        "Esses itens variam de acordo com a proposta. O que está incluído, quem ficará responsável por cada serviço e eventuais custos recorrentes são alinhados antes do início do projeto.",
    },
    {
      question: "Quantas revisões posso solicitar?",
      answer:
        "As rodadas de revisão e o processo de aprovação são descritos na proposta, para que as expectativas fiquem claras antes do início do trabalho.",
    },
    {
      question: "O site já vem preparado para SEO?",
      answer:
        "O projeto pode incluir uma base técnica de SEO on-page, como estrutura semântica, organização das páginas e boas práticas técnicas. Isso não garante posições específicas: o desempenho orgânico também depende da concorrência, da relevância e da evolução do conteúdo e da autoridade do domínio.",
    },
    {
      question: "Você atende apenas empresas de São Paulo?",
      answer:
        "Não. Atendo empresas de São Paulo e de outras regiões do Brasil. As conversas e etapas do projeto podem ser realizadas online.",
    },
  ],
};

const siteCreationCtaContent = {
  eyebrow: "Próximo passo",
  title: "Vamos conversar sobre o site da sua empresa?",
  lead:
    "Conte o que sua empresa faz, o que precisa apresentar e o que espera do novo site. Com essas informações, posso entender o escopo e sugerir um caminho adequado.",
  bandClass: "dark-band",
  primaryAction: {
    label: "Conversar sobre meu projeto",
    href: contactLinks.whatsapp,
    newTab: true,
  },
  secondaryAction: {
    label: "Agendar uma conversa",
    to: routes.schedule,
  },
};

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
        mainEntity: siteCreationFaqContent.questions.map((item) => ({
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
        title="Criação de Sites em São Paulo para Empresas | Robson Svicero"
        description="Criação de sites profissionais em São Paulo para empresas e prestadores de serviço. Estratégia, design, desenvolvimento e SEO técnico para gerar confiança e facilitar o contato."
        path="/criacao-de-sites"
        structuredData={createSiteCreationSchema()}
      />
      <Layout>
        <section className="section service-hero" aria-labelledby="services-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Criação de sites profissionais em São Paulo</p>
              <h1 id="services-title">Criação de sites profissionais para empresas que querem crescer</h1>
              <p className="page-description">
                Planejamento, design e desenvolvimento alinhados ao momento do seu negócio.
              </p>
              <p className="lead">
                Apresente melhor sua empresa, fortaleça sua presença no Google e facilite o contato com quem procura seus serviços.
              </p>
              <p>
                Atendo empresas de São Paulo e de outras regiões do Brasil, com um processo próximo — da definição do conteúdo à publicação do site.
              </p>
              <div className="hero-cta">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Conversar sobre meu projeto
                </Button>
                <Button as={Link} variant="secondary" to="#projetos">
                  Conhecer projetos realizados
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

        <section className="section surface-band" aria-labelledby="solutions-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Sites para diferentes objetivos</p>
              <h2 id="solutions-title">Um site planejado para o momento do seu negócio</h2>
              <p className="lead">
                Cada projeto começa com uma necessidade diferente. A estrutura é definida de acordo com o que a empresa oferece, com quem precisa falar e com a ação que espera do visitante.
              </p>
            </div>
            <div className="grid-3">
              {solutions.map((solution) => (
                <Card className="feature" key={solution.title}>
                  <p className="eyebrow">{solution.fit}</p>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </Card>
              ))}
            </div>
            <p className="lead">
              Nem todo negócio precisa começar com um site extenso. Em alguns casos, uma página bem estruturada é suficiente; em outros, faz sentido planejar desde o início uma presença com várias páginas e conteúdo editorial.
            </p>
            <p>
              Quer conhecer as opções disponíveis?{" "}
              <Link to={routes.prices}>Veja os planos de criação de sites</Link>.
            </p>
          </div>
        </section>

        <section className="section" id="o-que-oferecemos" aria-labelledby="offerings-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">O que faz um site funcionar</p>
              <h2 id="offerings-title">Um site precisa explicar, transmitir confiança e facilitar o próximo passo</h2>
              <p className="lead">
                O visual é importante, mas não trabalha sozinho. Um site profissional também precisa organizar as informações, funcionar bem no celular, deixar clara a oferta e tornar simples o contato com a empresa.
              </p>
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

        <section className="section surface-band" id="projetos" aria-labelledby="featured-projects-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <div className="split-title">
              <p className="eyebrow">Projetos e experiência</p>
              <h2 id="featured-projects-title">Projetos reais, decisões feitas para cada contexto</h2>
              <p className="lead">
                Cada projeto parte de uma necessidade própria. Veja alguns desafios e decisões registrados nos cases, sem promessas de resultados que não possam ser comprovados.
              </p>
            </div>
            <div className="grid-2">
              {featuredProjects.map((project) => (
                <Card className="feature feature-projects-card" key={project.path}>
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p>{project.detail}</p>
                  <div className="featured-projects-btn">
                    <Button as={Link} to={project.path} variant="secondary">
                    Ler o estudo do projeto
                  </Button>
                  </div>                  
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Process />
        <section className="section surface-band" aria-labelledby="service-area-title">
          <div className="container stack" style={{ gap: "var(--space-5)", maxWidth: 780 }}>
            <p className="eyebrow">Atendimento em São Paulo e no Brasil</p>
            <h2 id="service-area-title">Criação de sites em São Paulo, com atendimento também online</h2>
            <p className="lead">
              Atendo empresas de São Paulo e de outras cidades do Brasil. As conversas e etapas do projeto podem ser feitas online, com alinhamentos definidos de acordo com a necessidade de cada trabalho.
            </p>
          </div>
        </section>
        <CTA content={siteCreationCtaContent} titleId="services-cta-title" />
        <Faq content={siteCreationFaqContent} className="surface-band" />
      </Layout>
    </>
  );
}
