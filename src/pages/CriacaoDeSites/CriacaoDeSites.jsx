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
import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import HeroParticles from "../../sections/Hero/HeroParticles.jsx";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Search,
  Smartphone,
  Layers,
  Code2,
  XCircle,
} from "lucide-react";

const solutions = [
  {
    title: "Site institucional de autoridade",
    badge: "Mais Procurado",
    isFeatured: true,
    description:
      "Apresente sua empresa com o mesmo padrão visual e técnico das grandes marcas. Ideal para consultorias, escritórios, clínicas e negócios B2B.",
    fit: "Para empresas que fecham contratos de maior valor",
    features: [
      "Arquitetura de conteúdo e navegação intuitiva",
      "Página Sobre com construção sólida de autoridade",
      "Apresentação clara de serviços e diferenciais",
      "Integração direta com WhatsApp e canais de contato",
      "Estrutura otimizada para SEO local e institucional",
    ],
  },
  {
    title: "Landing page de alta conversão",
    badge: "Campanhas & Anúncios",
    isFeatured: false,
    description:
      "Uma página de impacto focada em uma única ação: transformar cliques do Google Ads e Meta Ads em conversas no WhatsApp e propostas comerciais.",
    fit: "Para campanhas que exigem retorno rápido",
    features: [
      "Copywriting focado em benefícios e quebra de objeções",
      "Carregamento instantâneo em menos de 1 segundo",
      "Formulário leve com validação e rastreamento",
      "Design responsivo otimizado para o polegar no celular",
      "Preparado para tags de rastreamento (GA4, Meta Pixel)",
    ],
  },
  {
    title: "Site com blog & SEO contínuo",
    badge: "Crescimento Orgânico",
    isFeatured: false,
    description:
      "Uma estrutura editorial completa para educar seu mercado, responder dúvidas frequentes e conquistar posições orgânicas duradouras no Google.",
    fit: "Para quem deseja atrair clientes organicamente",
    features: [
      "Blog integrado com sistema de publicação intuitivo",
      "Categorias, autores, tags e busca de artigos",
      "Dados estruturados (Schema Article) para o Google",
      "Velocidade e indexação técnica de alta performance",
      "Total autonomia para publicar sem depender de terceiros",
    ],
  },
];

const pillars = [
  {
    icon: Sparkles,
    title: "Design Exclusivo no Figma",
    description:
      "Nada de templates genéricos ou temas comprados. Cada tela é desenhada sob medida para refletir a autoridade única da sua empresa.",
  },
  {
    icon: Code2,
    title: "Engenharia Rápida em React",
    description:
      "Desenvolvido com tecnologias modernas (React + Vite). O site abre instantaneamente no celular, evitando que você perca visitantes por lentidão.",
  },
  {
    icon: Search,
    title: "SEO Técnico desde o Início",
    description:
      "Semântica HTML5, sitemap XML, robots.txt e dados estruturados (Schema.org) configurados para o Google entender seu negócio.",
  },
  {
    icon: Smartphone,
    title: "Experiência Mobile Impecável",
    description:
      "Mais de 80% do tráfego atual vem de celulares. Cada botão, texto e espaçamento é planejado para navegação fluida em qualquer tamanho de tela.",
  },
  {
    icon: Layers,
    title: "Painel de Conteúdo Autônomo",
    description:
      "Você terá liberdade para editar textos, fotos, depoimentos e publicar novos artigos com simplicidade, sem custos recorrentes de manutenção básica.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança & Contato Acessível",
    description:
      "Código limpo, hospedagem moderna e botões de contato estrategicamente posicionados para facilitar o caminho até o seu WhatsApp.",
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
    "Escopo, conteúdo, prazo e investimento são definidos com total clareza antes do início do projeto.",
  questions: [
    {
      question: "Que tipo de site você desenvolve?",
      answer:
        "O projeto pode ser um site institucional de autoridade, uma landing page focada em conversão ou uma plataforma com blog integrado. A escolha é feita de acordo com o modelo de negócio e o momento da sua empresa.",
    },
    {
      question: "O que está incluído no projeto de criação?",
      answer:
        "A proposta detalha as etapas incluídas: alinhamento estratégico, wireframes no Figma, design de interface (UI), desenvolvimento em React com código limpo, SEO técnico, integração com canais de contato e publicação no domínio.",
    },
    {
      question: "Quanto custa criar um site profissional?",
      answer:
        "O investimento depende do tipo de site, quantidade de páginas e recursos especiais. Trabalhamos com escopos sob medida e também oferecemos planos estruturados para facilitar seu planejamento financeiro.",
    },
    {
      question: "Quanto tempo leva para o site ficar pronto?",
      answer:
        "Landing pages costumam levar de 1 a 2 semanas. Sites institucionais completos geralmente ficam prontos entre 2 e 4 semanas, dependendo da disponibilidade dos conteúdos e do tempo de aprovação de cada etapa.",
    },
    {
      question: "Quem prepara os textos e as imagens?",
      answer:
        "Podemos trabalhar com os materiais que sua empresa já possui ou conduzir a estruturação do conteúdo durante a fase de diagnóstico, garantindo textos claros, persuasivos e orientados para conversão.",
    },
    {
      question: "Domínio e hospedagem estão incluídos?",
      answer:
        "Orientamos toda a configuração do domínio e utilizamos infraestrutura de alta velocidade (Vercel, Hostinger ou Cloudflare). Tudo fica registrado em nome da sua empresa, garantindo total controle e propriedade sobre seus ativos digitais.",
    },
    {
      question: "O site já vem preparado para o Google (SEO)?",
      answer:
        "Sim. Aplicamos as melhores práticas de SEO técnico on-page: tags semânticas HTML5, metadados Open Graph, Schema.org para busca rica, sitemap XML e otimização para atingir notas elevadas nos Core Web Vitals.",
    },
    {
      question: "Você atende apenas empresas de São Paulo?",
      answer:
        "Embora tenha base em São Paulo, atendo empresas em todo o Brasil e no exterior. O processo é 100% colaborativo e conduzido online, com alinhamentos diretos e pontuais.",
    },
  ],
};

const siteCreationCtaContent = {
  eyebrow: "Próximo passo",
  title: "Vamos conversar sobre o site da sua empresa?",
  lead:
    "Conte o que seu negócio faz e o que você espera do novo site. Analisarei seu momento e recomendarei a melhor estrutura para gerar resultados reais.",
  bandClass: "cta-home-band",
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
        {/* HERO SECTION — REDESIGN TRAJECTORY */}
        <section className="section service-creation-hero" aria-labelledby="services-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "1.25rem" }}>
              <p className="eyebrow">Criação de Sites Profissionais em São Paulo</p>
              <h1 id="services-title">
                Criação de Sites Profissionais que <em>Transformam Visitas em Clientes</em>
              </h1>
              <p className="lead">
                Planejamento estratégico, UX Design exclusivo no Figma e engenharia moderna em React.
                Construa uma presença digital com autoridade sólida, velocidade extrema e caminho direto para o WhatsApp.
              </p>

              {/* Value chips */}
              <div className="service-hero-chips">
                <span className="service-hero-chip">
                  <Zap size={14} />
                  <span>Carregamento &lt; 1s (Core Web Vitals)</span>
                </span>
                <span className="service-hero-chip">
                  <Search size={14} />
                  <span>SEO Técnico &amp; Schema.org</span>
                </span>
                <span className="service-hero-chip">
                  <ShieldCheck size={14} />
                  <span>Painel Administrativo Autônomo</span>
                </span>
              </div>

              {/* Hero CTA buttons */}
              <div className="hero_buttons">
                <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                  Conversar sobre meu projeto
                </Button>
                <Button as={Link} variant="secondary" to={routes.prices}>
                  Conhecer planos &amp; valores
                </Button>
              </div>
            </div>

            {/* SERVICE LANDING WINDOW — IDENTICAL TO REFERENCE IMAGE */}
            <figure className="service-landing-visual" aria-label="Demonstração visual da interface de um site profissional">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">site-profissional.dev</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">PÁGINA INICIAL</span>
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
                      <strong>
                        Site<br />profissional
                      </strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Contato</span>
                      <strong>CTA direto</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Admin</span>
                      <strong>
                        Conteúdo<br />editável
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        {/* PROOF & STATS STRIP */}
        <section className="service-proof-strip" aria-label="Indicadores de excelência e experiência">
          <div className="container">
            <div className="service-proof-grid">
              <div className="service-proof-item">
                <span className="service-proof-value">+12 Anos</span>
                <span className="service-proof-label">Criando experiências digitais desde 2013</span>
              </div>
              <div className="service-proof-item">
                <span className="service-proof-value">100% Exclusivo</span>
                <span className="service-proof-label">Sem templates prontos ou Elementor pesado</span>
              </div>
              <div className="service-proof-item">
                <span className="service-proof-value">&lt; 1 Segundo</span>
                <span className="service-proof-label">Velocidade máxima no Google PageSpeed</span>
              </div>
              <div className="service-proof-item">
                <span className="service-proof-value">Autonomia Total</span>
                <span className="service-proof-label">Painel simples para gerenciar seu conteúdo</span>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section className="section surface-band" aria-labelledby="solutions-title">
          <div className="container stack" style={{ gap: "2.5rem" }}>
            <SectionHeader
              label="Formatos &amp; Soluções"
              title="Um site planejado para o momento exato do seu negócio"
              subtitle="Nem toda empresa precisa da mesma estrutura. Definimos o formato com base no seu objetivo: transmitir autoridade comercial, acelerar campanhas pagas ou atrair clientes organicamente."
              id="solutions-title"
              align="center"
            />

            <div className="solutions-cards-grid">
              {solutions.map((item) => (
                <ScrollReveal key={item.title}>
                  <div className="solution-trajectory-card">
                    <span
                      className={`solution-trajectory-badge ${
                        item.isFeatured
                          ? "solution-trajectory-badge--featured"
                          : "solution-trajectory-badge--standard"
                      }`}
                    >
                      {item.badge}
                    </span>
                    <h3 className="solution-trajectory-title">{item.title}</h3>
                    <p className="solution-trajectory-desc">{item.description}</p>
                    <ul className="solution-trajectory-list">
                      {item.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle2 size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="solution-trajectory-footer">
                      <Button
                        href={contactLinks.whatsapp}
                        target="_blank"
                        rel="noreferrer noopener"
                        variant={item.isFeatured ? "primary" : "secondary"}
                      >
                        Quero este formato
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <p style={{ color: "var(--ink-500)", fontSize: "0.95rem" }}>
                Quer comparar escopos e valores em detalhes?{" "}
                <Link to={routes.prices} style={{ color: "var(--accent-600)", fontWeight: 600 }}>
                  Conheça nossa página de planos &amp; investimentos &rarr;
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* PILLARS OF EXCELLENCE */}
        <section className="section" id="o-que-oferecemos" aria-labelledby="offerings-title">
          <div className="container stack" style={{ gap: "3rem" }}>
            <SectionHeader
              label="Engenharia &amp; Design"
              title="O que faz um site profissional realmente funcionar"
              subtitle="O visual refinado é apenas o primeiro passo. Cada elemento é desenvolvido para orientar a leitura, carregar rapidamente no celular e tornar o contato natural e sem atritos."
              id="offerings-title"
              align="center"
            />

            <div className="pillars-trajectory-grid">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <ScrollReveal key={pillar.title}>
                    <div className="pillar-trajectory-card">
                      <div className="pillar-icon-box" aria-hidden="true">
                        <Icon size={22} />
                      </div>
                      <h3>{pillar.title}</h3>
                      <p>{pillar.description}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* MANDATORY TAGLINE REVEAL SECTION (B11) */}
        <section className="service-tagline-reveal" aria-label="Filosofia de criação de sites">
          <div className="container">
            <span className="service-tagline-eyebrow">Propósito &amp; Retorno</span>
            <blockquote className="service-tagline-quote">
              &ldquo;Um site profissional não é apenas um endereço digital. É o{" "}
              <em>principal vendedor da sua empresa</em> trabalhando 24 horas por dia.&rdquo;
            </blockquote>
            <p className="service-tagline-author">
              Clareza na mensagem, velocidade instantânea no clique e confiança imediata desde o primeiro acesso.
            </p>
          </div>
        </section>

        {/* COMPARISON: CUSTOM VS GENERIC BUILDERS */}
        <section className="service-comparison-section" aria-labelledby="comparison-title">
          <div className="container">
            <SectionHeader
              label="Decisão Inteligente"
              title="Por que investir em um site sob medida?"
              subtitle="Veja as diferenças práticas entre contratar engenharia personalizada e recorrer a construtores amadores ou plugins pesados."
              id="comparison-title"
              align="center"
            />

            <div className="service-comparison-grid">
              <div className="comparison-card comparison-card--custom">
                <h3 className="comparison-card-title">Desenvolvimento Sob Medida com Robson</h3>
                <p className="comparison-card-desc">Planejado especificamente para o posicionamento e metas do seu negócio.</p>
                <ul className="comparison-list">
                  <li className="comparison-item comparison-item--positive">
                    <CheckCircle2 size={18} />
                    <span>
                      <strong>Velocidade &lt; 1 segundo:</strong> código limpo em React que passa com nota máxima no Google.
                    </span>
                  </li>
                  <li className="comparison-item comparison-item--positive">
                    <CheckCircle2 size={18} />
                    <span>
                      <strong>Design Exclusivo em Figma:</strong> alinhado à sua marca, sem parecer um template genérico.
                    </span>
                  </li>
                  <li className="comparison-item comparison-item--positive">
                    <CheckCircle2 size={18} />
                    <span>
                      <strong>Segurança Total:</strong> sem dezenas de plugins vulneráveis que quebram com atualizações.
                    </span>
                  </li>
                  <li className="comparison-item comparison-item--positive">
                    <CheckCircle2 size={18} />
                    <span>
                      <strong>SEO Técnico Estruturado:</strong> dados Schema.org e semântica pura para indexação eficiente.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="comparison-card">
                <h3 className="comparison-card-title">Templates Prontos &amp; WordPress Genérico</h3>
                <p className="comparison-card-desc">Soluções pré-fabricadas que acumulam lentidão e custos inesperados.</p>
                <ul className="comparison-list">
                  <li className="comparison-item comparison-item--negative">
                    <XCircle size={18} />
                    <span>
                      <strong>Carregamento Lento (4 a 8s):</strong> perda comprovada de mais de 40% dos visitantes no celular.
                    </span>
                  </li>
                  <li className="comparison-item comparison-item--negative">
                    <XCircle size={18} />
                    <span>
                      <strong>Aparência Igual à dos Concorrentes:</strong> temas populares que não transmitem autoridade real.
                    </span>
                  </li>
                  <li className="comparison-item comparison-item--negative">
                    <XCircle size={18} />
                    <span>
                      <strong>Dependência de Plugins Pagos:</strong> constantes erros de incompatibilidade e risco de invasão.
                    </span>
                  </li>
                  <li className="comparison-item comparison-item--negative">
                    <XCircle size={18} />
                    <span>
                      <strong>SEO Superficial:</strong> código inchado que dificulta a leitura dos robôs de busca.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="section section_testimonial--navy" id="projetos" aria-labelledby="featured-projects-title">
          <div className="container stack" style={{ gap: "2.5rem" }}>
            <SectionHeader
              label="Projetos &amp; Experiência"
              title="Projetos reais, decisões estratégicas comprovadas"
              subtitle="Cada trabalho responde a um desafio real de posicionamento e negócio. Conheça alguns dos estudos de caso desenvolvidos."
              id="featured-projects-title"
              align="center"
            />

            <div className="grid-2">
              {featuredProjects.map((project) => (
                <ScrollReveal className="featured-project-reveal" key={project.path}>
                  <Card className="feature feature-projects-card info-card">
                    <span className="info-card-chip">{project.eyebrow}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <p>{project.detail}</p>
                    <div className="featured-projects-btn">
                      <Button as={Link} to={project.path} variant="outline">
                        Ler o estudo do projeto
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Button as={Link} to={routes.cases} variant="outline">
                Ver todos os cases realizados &rarr;
              </Button>
            </div>
          </div>
        </section>

        {/* WORKFLOW PROCESS */}
        <Process className="process-section--creation" />

        {/* COVERAGE AREA */}
        <section
          className="section surface-band service-area-home-background"
          aria-labelledby="service-area-title"
        >
          <HeroParticles />
          <div className="container">
            <SectionHeader
              label="Atendimento em São Paulo e em Todo o Brasil"
              title="Criação de sites em São Paulo com processo 100% digital"
              subtitle="Atendo empresas de São Paulo e de qualquer região do país. Todo o processo de reuniões, apresentação de wireframes e alinhamentos é conduzido de forma ágil e próxima pela internet."
              id="service-area-title"
              align="center"
              isDark
              className="service-area-header"
            />
          </div>
        </section>

        {/* FAQ SECTION */}
        <Faq content={siteCreationFaqContent} className="dark-band" />

        {/* FINAL CTA SECTION */}
        <CTA content={siteCreationCtaContent} titleId="services-cta-title" />
      </Layout>
    </>
  );
}
