import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import { Link } from "react-router-dom";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Faq from "../../sections/Faq/Faq.jsx";
import {
  SearchCheck,
  LayoutTemplate,
  Route,
  Smartphone,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Wrench,
  Hammer,
  XCircle,
} from "lucide-react";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";

/* ------------------------------------------------------------------ */
/* Conteúdo                                                            */
/* ------------------------------------------------------------------ */

const signs = [
  {
    title: "A oferta não fica clara",
    description:
      "O visitante precisa ler demais para entender o que você vende, para quem e por que escolher você.",
  },
  {
    title: "A navegação confunde",
    description:
      "Menus longos, páginas sem hierarquia e caminhos que não levam ao contato ou à compra.",
  },
  {
    title: "O visual não passa credibilidade",
    description:
      "A aparência ficou para trás do nível real do seu negócio e afasta quem está comparando fornecedores.",
  },
  {
    title: "A experiência no celular é ruim",
    description:
      "Textos pequenos, botões difíceis de tocar e seções que quebram em telas menores.",
  },
  {
    title: "Contatos e chamadas para ação se perdem",
    description:
      "WhatsApp, formulário e botões estão escondidos ou competem com informação demais.",
  },
];

const decisions = [
  {
    icon: CheckCircle2,
    title: "Manter",
    description:
      "O que já funciona e tem valor: conteúdo bom, URLs com histórico, estrutura que atende o objetivo.",
  },
  {
    icon: Wrench,
    title: "Corrigir",
    description:
      "O que está certo na ideia, mas mal executado: hierarquia, chamadas para ação, clareza e acessibilidade.",
  },
  {
    icon: Hammer,
    title: "Reconstruir",
    description:
      "O que não sustenta mais o negócio: estrutura de páginas, layout e fluxos que precisam ser refeitos.",
  },
];

const packages = [
  {
    id: "one-page",
    name: "Redesign One Page",
    price: "690",
    idealFor: "Quem tem uma página única (site de apresentação ou landing page) que não converte como deveria.",
    scope: [
      "Análise do site atual",
      "Reorganização de uma página",
      "Novo design",
      "Implementação responsiva",
      "Revisão de chamadas para ação e contatos",
      "Testes e publicação",
    ],
  },
  {
    id: "institucional",
    name: "Redesign Institucional",
    price: "1.290",
    idealFor: "Empresas com site de várias páginas cuja estrutura, navegação e apresentação já não acompanham o negócio.",
    featured: true,
    scope: [
      "Diagnóstico completo",
      "Reorganização de até 5 páginas",
      "Novo design",
      "Melhoria de hierarquia e navegação",
      "Implementação responsiva",
      "Metadados essenciais",
      "Testes e publicação",
    ],
  },
  {
    id: "ecommerce",
    name: "Redesign de E-commerce",
    price: "2.497",
    idealFor: "Lojas virtuais que recebem visitas, mas perdem clientes no catálogo, na página de produto ou no carrinho.",
    scope: [
      "Análise da jornada de compra",
      "Melhoria de catálogo, produto, carrinho e navegação",
      "Atualização visual das páginas acordadas",
      "Testes do fluxo principal",
    ],
    note: "Migração e integrações são avaliadas à parte.",
  },
];

const deliverables = [
  {
    icon: SearchCheck,
    title: "Avaliação do site atual",
    description:
      "Clareza da oferta, credibilidade, navegação, acessibilidade, conteúdo e chamadas para ação.",
  },
  {
    icon: Route,
    title: "Recomendação priorizada",
    description: "O que manter, corrigir ou reconstruir, em ordem de impacto.",
  },
  {
    icon: LayoutTemplate,
    title: "Arquitetura da informação",
    description: "Hierarquia de conteúdo e estrutura de páginas conforme o escopo contratado.",
  },
  {
    icon: Smartphone,
    title: "Nova direção visual",
    description: "Interface responsiva, pensada para celular e desktop.",
  },
  {
    icon: ShieldCheck,
    title: "SEO técnico essencial",
    description: "Revisão dos elementos básicos e preservação de URLs quando aplicável.",
  },
  {
    icon: Rocket,
    title: "Publicação e orientação",
    description: "Implementação e testes das páginas acordadas, com explicação do que foi entregue.",
  },
];

const stages = [
  {
    number: "01",
    title: "Análise do site atual",
    description:
      "Avaliação de oferta, navegação, conteúdo, acessibilidade e chamadas para ação, com base nos objetivos do negócio.",
  },
  {
    number: "02",
    title: "Recomendação priorizada",
    description:
      "Definição do que manter, corrigir ou reconstruir, para que o investimento vá para o que muda o resultado.",
  },
  {
    number: "03",
    title: "Estrutura e direção visual",
    description:
      "Nova hierarquia de conteúdo e interface responsiva, validadas antes da implementação.",
  },
  {
    number: "04",
    title: "Implementação e testes",
    description:
      "Desenvolvimento das páginas acordadas, com testes em diferentes telas e do fluxo principal.",
  },
  {
    number: "05",
    title: "Publicação e orientação",
    description:
      "Site no ar e orientação sobre a solução entregue, para você saber o que mudou e como usar.",
  },
];

const outOfScope = [
  "Reescrita completa de todo o conteúdo, fotografia ou identidade visual completa",
  "Migração complexa de conteúdo ou catálogo extenso",
  "Novas funcionalidades, integrações pagas ou reconstrução de sistemas de terceiros",
  "SEO contínuo e campanhas de mídia",
  "Hospedagem, domínio e licenças, exceto quando especificados na proposta",
];

const faqs = [
  {
    question: "Como sei se preciso de um redesign ou de um site novo?",
    answer:
      "A análise inicial responde a isso. Ela separa o que pode ser mantido, o que precisa de correção e o que deve ser reconstruído. Se a base não sustenta mais o negócio, a recomendação pode ser um projeto novo, e isso fica claro antes de você investir.",
  },
  {
    question: "Vou perder o posicionamento que meu site já tem no Google?",
    answer:
      "O trabalho inclui a revisão de elementos essenciais de SEO técnico e a preservação de URLs quando aplicável, justamente para reduzir esse risco. Não há garantia de aumento de tráfego ou de posição. O acompanhamento contínuo de SEO é outro serviço.",
  },
  {
    question: "Preciso escrever todo o conteúdo de novo?",
    answer:
      "Não. O redesign reorganiza e melhora a apresentação do conteúdo existente. A reescrita completa de todos os textos não faz parte do escopo-base e pode ser orçada à parte.",
  },
  {
    question: "Hospedagem e domínio estão incluídos?",
    answer:
      "Não, exceto quando estiverem especificados na proposta. O mesmo vale para licenças de ferramentas e plugins.",
  },
  {
    question: "Posso pedir novas funcionalidades durante o redesign?",
    answer:
      "Novas funcionalidades, integrações pagas e reconstrução de sistemas de terceiros ficam fora do escopo-base, mas podem ser avaliadas e orçadas separadamente.",
  },
  {
    question: "E se minha loja tiver muitos produtos ou integrações?",
    answer:
      "O pacote de e-commerce cobre a jornada de compra e as páginas acordadas. Migração de catálogo extenso e integrações são avaliadas à parte, conforme a complexidade.",
  },
  {
    question: "Qual o prazo?",
    answer:
      "O prazo depende do pacote, do número de páginas e da agilidade na aprovação de cada etapa. Ele é definido na proposta, depois da análise do site atual.",
  },
];

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

function whatsappLink(message) {
  try {
    const url = new URL(contactLinks.whatsapp);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return contactLinks.whatsapp;
  }
}

function createRedesignSchema() {
  const pageUrl = absoluteUrl(routes.redesignService);
  const providerId = `${absoluteUrl("/")}#professional-service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Redesign de sites",
        serviceType: "Redesign de sites institucionais, landing pages e e-commerce",
        provider: { "@id": providerId },
        areaServed: ["São Paulo", "Brasil"],
        url: pageUrl,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Pacotes de redesign de sites",
          itemListElement: packages.map((pkg) => ({
            "@type": "Offer",
            name: pkg.name,
            priceCurrency: "BRL",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "BRL",
              minPrice: Number(pkg.price.replace(".", "")),
            },
            itemOffered: {
              "@type": "Service",
              name: pkg.name,
              description: pkg.scope.join("; "),
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Redesign de Sites em São Paulo | Robson Svicero",
        description:
          "Redesign de sites institucionais, one pages e e-commerce: análise do que manter, corrigir ou reconstruir, novo design responsivo e publicação.",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function RedesignService() {
  return (
    <>
      <SEO
        title="Redesign de Sites em São Paulo | Do diagnóstico à publicação"
        description="Seu site existe, mas não acompanha mais o negócio? Redesign de one page, site institucional e e-commerce, com análise do que manter, corrigir ou reconstruir. A partir de R$ 690."
        path={routes.redesignService}
        structuredData={createRedesignSchema()}
      />

      <Layout>
        {/* 1. Hero */}
        <ScrollReveal as="section" className="section service-hero" aria-labelledby="redesign-title">
          <div className="container service-landing-hero-grid">
            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Serviços • Redesign</p>
              <h1 id="redesign-title">
                Redesign de sites para quem já tem site, mas ele não acompanha mais o negócio.
              </h1>
              <p className="lead">
                Avalio o que deve ser mantido, reorganizado ou reconstruído e entrego um site mais
                claro, mais confiável e mais fácil de navegar, no celular e no desktop.
              </p>
              <div className="hero-cta">
                <Button href="#pacotes">Ver pacotes e valores</Button>
                <Button
                  href={whatsappLink("Olá! Quero conversar sobre o redesign do meu site.")}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                >
                  Falar sobre meu site
                </Button>
              </div>
              <p className="page-description">
                Pacotes a partir de R$ 690, com escopo definido e sem promessa de resultado que
                dependa de fatores fora do site.
              </p>
            </div>

            <figure className="service-landing-visual" aria-hidden="true">
              <div className="service-landing-window">
                <div className="service-landing-window-bar">
                  <span className="service-landing-dot service-landing-dot--red" />
                  <span className="service-landing-dot service-landing-dot--yellow" />
                  <span className="service-landing-dot service-landing-dot--green" />
                  <span className="service-landing-url">seusite.com.br</span>
                </div>

                <div className="service-landing-screen">
                  <div className="service-landing-main">
                    <span className="service-landing-kicker">Redesign</span>
                    <div className="service-landing-line service-landing-line--xl" />
                    <div className="service-landing-line service-landing-line--lg" />
                    <div className="service-landing-actions">
                      <span className="service-landing-pill" />
                      <span className="service-landing-pill service-landing-pill--ghost" />
                    </div>
                    <div className="service-landing-metrics">
                      <span>Clareza</span>
                      <span>Navegação</span>
                      <span>Responsivo</span>
                    </div>
                  </div>

                  <div className="service-landing-side">
                    <div className="service-landing-card service-landing-card--accent">
                      <span>Manter</span>
                      <strong>O que funciona</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Corrigir</span>
                      <strong>O que está fraco</strong>
                    </div>
                    <div className="service-landing-card">
                      <span>Reconstruir</span>
                      <strong>O que não sustenta</strong>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </ScrollReveal>

        {/* 2. Quando faz sentido */}
        <ScrollReveal as="section" className="section landing-includes-section" aria-labelledby="redesign-signs-title">
          <div className="container stack landing-includes-container" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="Quando faz sentido"
              title="Sinais de que seu site precisa de redesign"
              subtitle="O redesign é indicado quando o site existe, mas estrutura, visual, conteúdo ou navegação já não acompanham os objetivos do negócio."
              id="redesign-signs-title"
              align="center"
              className="landing-includes-header"
            />

            <ul className="grid-3 landing-includes-grid" role="list" style={{ listStyle: "none", padding: 0 }}>
              {signs.map((sign) => (
                <li key={sign.title}>
                  <Card className="feature landing-includes-card" style={{ height: "100%" }}>
                    <h3>{sign.title}</h3>
                    <p>{sign.description}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* 3. Manter, corrigir ou reconstruir */}
        <ScrollReveal as="section" className="section landing-deliverables-section" aria-labelledby="redesign-decisions-title">
          <div className="container landing-deliverables-layout">
            <SectionHeader
              label="Como eu decido"
              title="Nem tudo precisa ser refeito"
              subtitle="Antes de desenhar qualquer tela, avalio o site atual e separo o que vale manter do que precisa de ajuste ou de reconstrução. Assim você investe onde há ganho real."
              id="redesign-decisions-title"
              align="left"
              className="landing-deliverables-header"
              style={{ marginBottom: 0 }}
            />

            <div className="landing-deliverables-grid" role="list" aria-label="Critérios de decisão do redesign">
              {decisions.map((item) => {
                const Icon = item.icon;
                return (
                  <Card className="landing-deliverable-card" key={item.title} role="listitem">
                    <div className="landing-deliverable-topline">
                      <span className="landing-deliverable-icon" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 4. Pacotes */}
        <ScrollReveal as="section" className="section surface-band redesign-investment-section" id="pacotes" aria-labelledby="redesign-packages-title">
          <div className="container stack redesign-investment-container">
            <SectionHeader
              label="Investimento"
              title="Pacotes de redesign"
              subtitle="Valores de lançamento da oferta, com escopo-base claro. O valor final é confirmado na proposta, depois da análise do seu site."
              id="redesign-packages-title"
              align="center"
            />

            <div className="redesign-packages-grid" role="list">
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`stack redesign-package-card${pkg.featured ? " redesign-package-card--featured" : ""}`}
                  role="listitem"
                >
                  <div className="redesign-package-copy">
                    <h3 className="redesign-package-name">{pkg.name}</h3>
                    <p className="redesign-package-tone">{pkg.idealFor}</p>
                  </div>

                  <p className="redesign-package-price">
                    <span>a partir de</span> 
                    R$ {pkg.price}
                  </p>

                  <ul className="redesign-package-list">
                    {pkg.scope.map((item) => (
                      <li key={item}>
                        <span className="redesign-package-dot" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.note && <p className="meta">{pkg.note}</p>}

                  <Button
                    href={whatsappLink(`Olá! Tenho interesse no pacote ${pkg.name}.`)}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant={pkg.featured ? "primary" : "secondary"}
                  >
                    Quero o {pkg.name}
                  </Button>
                </Card>
              ))}
            </div>

            <p className="planos-investment-note">
              Seu caso não se encaixa em nenhum pacote?{" "}
              <Link to={routes.contact}>Peça uma proposta sob medida.</Link>
            </p>
          </div>
        </ScrollReveal>

        {/* 5. Entregáveis */}
        <ScrollReveal as="section" className="section landing-includes-section" aria-labelledby="redesign-deliverables-title">
          <div className="container stack landing-includes-container" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="O que inclui"
              title="O que você pode receber no projeto"
              subtitle="Os entregáveis variam conforme o pacote e o escopo acordado na proposta."
              id="redesign-deliverables-title"
              align="center"
              className="landing-includes-header"
            />

            <div className="grid-3 landing-includes-grid" role="list">
              {deliverables.map((item) => {
                const Icon = item.icon;
                return (
                  <Card className="feature landing-includes-card" key={item.title} role="listitem">
                    <span className="landing-includes-icon" aria-hidden="true">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 6. Como funciona */}
        <ScrollReveal as="section" className="section process-section--creation landing-how-it-works-section" aria-labelledby="redesign-stages-title">
          <div className="container grid-1-2">
            <SectionHeader
              label="Como funciona"
              title="Etapas do redesign"
              subtitle="Do diagnóstico à publicação, com decisões claras a cada etapa."
              id="redesign-stages-title"
              align="left"
              style={{ marginBottom: 0 }}
            />

            <ol className="process-list" aria-label="Etapas do redesign de sites">
              {stages.map((stage) => (
                <li className="process-item" key={stage.number}>
                  <span className="num" aria-hidden="true">
                    {stage.number}
                  </span>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>

        {/* 7. Escopo e transparência */}
        <ScrollReveal as="section" className="section landing-deliverables-section redesign-transparency-section" aria-labelledby="redesign-scope-title">
          <div className="container stack redesign-transparency-container">
            <SectionHeader
              label="Transparência"
              title="O que está fora do escopo-base"
              subtitle="Deixar isso claro desde o início evita surpresas. Qualquer item abaixo pode ser avaliado e orçado separadamente."
              id="redesign-scope-title"
              align="center"
            />

            <div className="service-comparison-grid redesign-transparency-grid">
              <article className="comparison-card comparison-card--custom redesign-transparency-card">
                <h3 className="comparison-card-title">Não faz parte do escopo-base</h3>
                <p className="comparison-card-desc">Itens que exigem orçamento ou contratação à parte.</p>
                <ul className="comparison-list">
                  {outOfScope.map((item) => (
                    <li className="comparison-item comparison-item--negative" key={item}>
                      <XCircle size={18} aria-hidden="true" />
                      <span><strong>{item}</strong></span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="comparison-card redesign-transparency-card">
                <h3 className="comparison-card-title">O que eu não prometo</h3>
                <p className="comparison-card-desc">
                  Resultados que dependem de fatores além da entrega do redesign.
                </p>
                <ul className="comparison-list">
                  {[
                    "Aumento garantido de tráfego ou posição no Google",
                    "Aumento garantido de conversões",
                    "Resultados independentes de concorrência, demanda, mídia e conteúdo",
                  ].map((item) => (
                    <li className="comparison-item comparison-item--negative" key={item}>
                      <XCircle size={18} aria-hidden="true" />
                      <span><strong>{item}</strong></span>
                    </li>
                  ))}
                </ul>
                <p className="redesign-transparency-note">
                  Entrego um site mais claro, confiável e bem estruturado para receber esses resultados.
                </p>
              </article>
            </div>
          </div>
        </ScrollReveal>

        {/* 8. FAQ */}
        <ScrollReveal id="redesign-faq">
          <Faq
            content={{
              eyebrow: "Dúvidas frequentes",
              title: "Perguntas sobre o redesign",
              lead: "Respostas diretas sobre escopo, preservação do site atual, prazo e entregáveis.",
              questions: faqs,
            }}
            id="redesign-faq"
            titleId="redesign-faq-title"
          />
        </ScrollReveal>

        <ScrollReveal>
          <CTA content={pageCtaContent.redesignService} titleId="redesign-service-cta-title" />
        </ScrollReveal>
      </Layout>
    </>
  );
}