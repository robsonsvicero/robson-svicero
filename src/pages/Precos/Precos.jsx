import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";

const plans = [
  {
    id: "basic",
    name: "PLANO ESSENCIAL",
    focus: "Presença digital e manutenção",
    tone: "Site robusto com 5-8 páginas, otimizado para SEO básico",
    highlight: "Mais acessível",
    setup: "R$ 3.500,00",
    monthly: "12x R$ 50,00",
    totalMonthly: "R$ 600,00/ano",
    totalInstalments: "12x R$ 341,67",
    totalValue: "R$ 4.100,00",
    cashValue: "R$ 3.895,00",
    composition:
      "Hospedagem (R$ 50) + 2 artigos (R$ 300) + Gestão GMN com 2 posts (R$ 250).",
    bullets: [
      "Criação do site + configuração do GMN",
      "Manutenção mensal essencial",
      "Base de conteúdo para sustentar presença digital",
      "Design responsivo e moderno",
      "5-8 páginas estruturadas (Home, Sobre, Serviços, Blog, Contato)",
      "Otimização on-page (palavras-chave, meta tags)",
      "Integração Google Analytics e Search Console",
      "Certificado SSL incluído",
    ],
  },
  {
    id: "essential",
    name: "PLANO PRO",
    focus: "Crescimento e negócios locais",
    tone: "Site completo com estratégia SEO avançada e blog de conteúdo",
    highlight: "Recomendado",
    setup: "R$ 5.000,00",
    monthly: "12x R$ 108,33",
    totalMonthly: "R$ 1.300,00/ano",
    totalInstalments: "12x R$ 525,00",
    totalValue: "R$ 6.300,00",
    cashValue: "R$ 5.985,00",
    composition:
      "Hospedagem (R$ 50) + 4 artigos (R$ 600) + Gestão GMN com 4 posts (R$ 500) + Estratégia de SEO Local/otimizações on-page recorrentes (R$ 150).",
    bullets: [
      "Tudo do ESSENCIAL, mais:",
      "Blog estruturado com 3 posts de nicho otimizados",
      "SEO local recorrente para ganho de visibilidade",
      "Rich snippets (FAQ, localização, avaliações)",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "PLANO PREMIUM",
    focus: "Dominação de nicho e alta concorrência",
    tone: "Para competir forte em nichos mais disputados",
    highlight: "Maior suporte",
    setup: "R$ 7.500,00",
    monthly: "12x R$ 200,00",
    totalMonthly: "R$ 2.400,00/ano",
    totalInstalments: "12x R$ 825,00",
    totalValue: "R$ 9.900,00",
    cashValue: "R$ 9.405,00",
    composition:
      "Hospedagem (R$ 50) + 8 artigos (R$ 1.100) + Gestão GMN com 8 posts (R$ 800) + Consultoria de SEO aprofundada (backlinks, auditorias técnicas, relatórios completos) (R$ 450).",
    bullets: [
      "Tudo do PRO SEO, mais:",
      "Estrutura para competir em nichos mais disputados",
      "Mais conteúdo e mais presença local",
      "SEO aprofundado com consultoria contínua",
      "Mapa interativo (se aplicável)",
    ],
  },
];

function createWhatsAppHref(planName) {
  const text = encodeURIComponent(
    `Olá! Gostaria de conversar sobre o ${planName} da criação de sites.`,
  );
  return `https://wa.me/5511964932007?text=${text}`;
}

function createPlansSchema() {
  const pageUrl = absoluteUrl(routes.prices);

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
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Planos de criação de sites | Robson Svicero",
        description:
          "Página de planos de criação de sites com setup, mensalidade e manutenção contínua.",
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#plans`,
        name: "Planos de criação de sites",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: plans.map((plan, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: plan.name,
            description: plan.focus,
          },
        })),
      },
    ],
  };
}

export default function Planos() {
  return (
    <>
      <SEO
        title="Planos de Criação de Sites com Manutenção"
        description="Página de planos de criação de sites, manutenção, gestão de GMN e conteúdo mensal para diferentes níveis de necessidade."
        path={routes.prices}
        structuredData={createPlansSchema()}
      />
      <Layout>
        <div className="planos-page">

          <main>
            <section className="section planos-hero" aria-labelledby="planos-title">
              <div className="container planos-hero-grid">
                <div className="stack planos-hero-copy">
                  <p className="eyebrow">Criação de sites com manutenção</p>
                  <h1 id="planos-title">Seu site pode vender mais quando a oferta certa aparece no lugar certo.</h1>
                  <p className="lead">
                    Eu estruturo site, Google Meu Negócio e conteúdo mensal para transformar sua presença digital em um canal real de geração de contatos.
                  </p>
                  <div className="hero-cta">
                    <Button href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                      Quero minha proposta
                    </Button>
                    <Button variant="secondary" href="#planos">
                      Ver pacotes
                    </Button>
                  </div>
                  <p className="page-description">
                    Pacotes pensados para negócio que precisa de presença, manutenção e evolução contínua sem improviso.
                  </p>
                </div>

                <Card className="stack planos-hero-panel" aria-label="Resumo dos planos">
                  <div className="planos-hero-panel-head">
                    <p className="eyebrow">Resumo rápido</p>
                    <strong>3 pacotes prontos para escalar</strong>
                  </div>

                  <div className="planos-hero-stats">
                    <div>
                      <span>Setup</span>
                      <strong>de R$ 3.500 a R$ 7.500</strong>
                    </div>
                    <div>
                      <span>Mensalidade</span>
                      <strong>de R$ 600 a R$ 2.400</strong>
                    </div>
                    <div>
                      <span>Desconto à vista</span>
                      <strong>5% off</strong>
                    </div>
                  </div>

                  <div className="planos-hero-ribbon">
                    <span>Site profissional</span>
                    <span>Manutenção mensal</span>
                    <span>SEO + GMN</span>
                  </div>

                  <p className="meta">
                    Você escolhe a intensidade da operação, e eu organizo a combinação ideal para sua meta.
                  </p>
                </Card>
              </div>
            </section>

            <section className="section" id="planos" aria-labelledby="plans-title">
              <div className="container stack" style={{ gap: "var(--space-8)" }}>
                <div className="split-title">
                  <p className="eyebrow">Planos</p>
                  <h2 id="plans-title">Pacotes criados para atender diferentes níveis de demanda e crescimento</h2>
                  <p className="lead">
                    Compare abaixo o setup, a mensalidade e a composição de cada pacote para escolher o formato que faz mais sentido para o seu momento.
                  </p>
                </div>

                <div className="planos-plan-grid" role="list">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`stack planos-plan-card${plan.featured ? " planos-plan-card--featured" : ""}`}
                      role="listitem"
                    >
                      <div className="planos-plan-head">
                        <div>
                          <p className="eyebrow">{plan.focus}</p>
                          <h3>{plan.name}</h3>
                          <p className="planos-plan-tone">{plan.tone}</p>
                        </div>
                        <span className="planos-plan-badge">{plan.highlight}</span>
                      </div>

                      <div className="planos-plan-prices">
                        <div className="planos-plan-price">
                          <span>Site (UX/UI Design + Desenvolvimento)</span>
                          <strong>{plan.setup}</strong>
                        </div>
                        <div className="planos-plan-price">
                          <span>Hospedagem + SEO</span>
                          <strong>{plan.monthly}</strong>
                          <small>{plan.totalMonthly}</small>
                        </div>
                        <div className="planos-plan-price planos-plan-price--emphasis">
                          <span>Total a prazo</span>
                          <strong>{plan.totalValue}</strong>
                          <small>{plan.totalInstalments}</small>
                        </div>
                        <div className="planos-plan-price">
                          <span>Total à vista</span>
                          <strong>{plan.cashValue}</strong>
                          <small>(5% de desconto)</small>
                        </div>
                      </div>

                      <div className="planos-plan-composition">
                        <p className="meta">Composição do valor de Hospedagem + SEO</p>
                        <p>{plan.composition}</p>
                      </div>

                      <ul className="planos-plan-list">
                        {plan.bullets.map((bullet) => (
                          <li key={bullet}>
                            <span className="planos-check" aria-hidden="true">
                              OK
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="planos-plan-actions">
                        <Button
                          href={createWhatsAppHref(plan.name)}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Quero este plano
                        </Button>

                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section className="section surface-band" aria-labelledby="planos-why-title">
              <div className="container stack" style={{ gap: "var(--space-8)" }}>
                <div className="split-title">
                  <p className="eyebrow">O que está incluso</p>
                  <h2 id="planos-why-title">Tudo o que você precisa para sair do improviso e operar com presença</h2>
                  <p className="lead">
                    Cada pacote combina criação, manutenção e otimização para sustentar resultados depois da entrega.
                  </p>
                </div>

                <div className="grid-3">
                  <Card className="feature">
                    <p className="eyebrow">Setup</p>
                    <h3>Criação do site + configuração GMN</h3>
                    <p>
                      A taxa inicial cobre a construção do site e a preparação da base local para o projeto começar certo.
                    </p>
                  </Card>
                  <Card className="feature">
                    <p className="eyebrow">Recorrência</p>
                    <h3>Conteúdo e manutenção mensal</h3>
                    <p>
                      Os pacotes incluem hospedagem, artigos, posts e evolução contínua conforme o plano escolhido.
                    </p>
                  </Card>
                  <Card className="feature">
                    <p className="eyebrow">À vista</p>
                    <h3>Desconto para pagamento único</h3>
                    <p>
                      Todos os pacotes têm 5% de desconto no pagamento à vista, mantendo o mesmo escopo do plano.
                    </p>
                  </Card>
                </div>
              </div>
            </section>

            <CTA content={pageCtaContent.planosSiteCreation} titleId="planos-cta-title" />
          </main>
        </div>
      </Layout>
    </>
  );
}
