import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
      <path d="M20.52 3.48A11.83 11.83 0 0 0 12.01 0C5.4 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.58 5.97L0 24l6.18-1.62a11.96 11.96 0 0 0 5.82 1.5h.01C18.63 23.88 24 18.51 24 11.89c0-3.21-1.25-6.22-3.48-8.41Zm-8.51 18.3h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.93 9.93 0 0 1 2.52 12C2.52 6.8 6.76 2.56 11.99 2.56c2.53 0 4.9.99 6.67 2.77a9.37 9.37 0 0 1 2.77 6.63c0 5.21-4.24 9.82-9.42 9.82Zm5.5-7.06c-.3-.15-1.75-.86-2.02-.95-.27-.1-.46-.15-.66.15-.19.3-.76.95-.93 1.14-.17.19-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.53-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.45s1.03 2.85 1.18 3.05c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.75-.72 2-1.41.24-.69.24-1.28.17-1.41-.07-.14-.26-.22-.56-.37Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.14 6.27-1.89 8.91c-.14.63-.52.79-1.05.49l-2.9-2.13-1.4 1.35c-.15.15-.28.28-.58.28l.21-2.94 5.35-4.83c.23-.2-.05-.31-.35-.11L7.76 12.4l-2.9-.9c-.63-.2-.64-.63.13-.94l11.38-4.39c.53-.2 1 .12.82.92Z" />
    </svg>
  );
}

const plans = [
  {
    id: "landing",
    name: "LANDING PAGE",
    focus: "CAPTAÇÃO DE LEADS",
    tone: "Uma página estratégica focada em conversão",
    highlight: "FOCO EM CONVERSÃO",
    bullets: [
      "Página única com estrutura de venda",
      "Foco em captação de clientes ou leads",
      "Integração com WhatsApp e botões de ação",
      "Design responsivo e moderno",
      "Estrutura pensada para campanhas e anúncios",
      "Otimização básica para o Google",
    ],
    forWho: "Ideal para divulgar um produto ou serviço específico, rodar campanhas de tráfego pago e validar ofertas sem precisar de um site completo.",
  },
  {
    id: "essential",
    name: "PLANO ESSENCIAL",
    focus: "PRESENÇA DIGITAL E MANUTENÇÃO",
    tone: "Tudo o que sua empresa precisa para ter uma presença digital profissional",
    highlight: "MAIS ACESSÍVEL",
    bullets: [
      "Desenvolvimento de site institucional",
      "Hospedagem + Certificado SSL + Manutenção mensal essencial",
      "Base de conteúdo para sustentar presença digital",
      "Design responsivo e moderno",
      "Estrutura otimizada para SEO básico",
      "Integração Google Analytics e Search Console",
      "Suporte técnico conforme necessidade",
    ],
    forWho: "Para empresas e prestadores de serviço que precisam de um site profissional para apresentar seus produtos ou serviços, gerar credibilidade, apoiar campanhas e fortalecer sua presença online, sem depender de produção constante de conteúdo.",
  },
  {
    id: "pro",
    name: "PLANO PRO",
    focus: "CRESCIMENTO E NEGÓCIOS LOCAIS",
    tone: "Mais estrutura para crescer e atrair mais clientes",
    highlight: "RECOMENDADO",
    bullets: [
      "Tudo do ESSENCIAL, mais:",
      "Blog integrado e estruturado para publicações de conteúdo",
      "SEO avançado (estrutura ampliada)",
      "Rich snippets (FAQ, localização, avaliações)",
      "Melhor potencial de ranqueamento no Google",
    ],
    forWho: "Para empresas e prestadores de serviço que querem crescer no Google, gerar tráfego orgânico e transformar o site em uma ferramenta ativa de marketing e captação de clientes.",
    featured: true,
  },
  {
    id: "premium",
    name: "PLANO PREMIUM",
    focus: "DOMINAÇÃO DE NICHO E ALTA CONCORRÊNCIA",
    tone: "Soluções sob medida para o seu negócio",
    highlight: "MAIOR SUPORTE",
    bullets: [
      "Tudo do PRO, mais:",
      "Estrutura planejada de acordo com o seu objetivo",
      "Arquitetura pensada para performance e crescimento",
      "Integrações, se necessárias (sistemas, APIs, etc)",
      "Mapa interativo (se aplicável)",
    ],
    forWho: "Para empresas e prestadores de serviço que precisam de uma solução mais avançada, com integrações, regras específicas ou uma estrutura personalizada além de um site institucional ou landing page.",
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
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const contactMenuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target)) {
        setIsContactMenuOpen(false);
      }
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, []);

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
                    Eu organizo seu site e Google Meu Negócio para colocar a oferta certa diante das pessoas certas para transformar visitas em contatos.
                  </p>
                  <div className="hero-cta">
                    <div className="topnav-cta-wrapper" ref={contactMenuRef}>
                      <Button
                        as="button"
                        type="button"
                        className="topnav-cta topnav-cta-whatsapp"
                        aria-expanded={isContactMenuOpen}
                        aria-haspopup="menu"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsContactMenuOpen((current) => !current);
                        }}
                      >
                        <span className="topnav-cta-text">
                          <strong>Quero a minha proposta</strong>
                        </span>
                      </Button>

                      {isContactMenuOpen && (
                        <div className="topnav-cta-popover" role="menu" aria-label="Opções de contato" style={{ textAlign: "left" }}>
                          <p className="topnav-cta-popover-title">Como você prefere falar comigo?</p>

                          <a
                            className="topnav-cta-option"
                            href={contactLinks.whatsapp}
                            target="_blank"
                            rel="noreferrer noopener"
                            role="menuitem"
                            onClick={() => setIsContactMenuOpen(false)}
                          >
                            <span className="topnav-cta-option-icon topnav-cta-option-icon--whatsapp" aria-hidden="true">
                              <WhatsAppIcon />
                            </span>
                            <span className="topnav-cta-option-copy">
                              <strong>WhatsApp</strong>
                              <span>Conversar pelo WhatsApp</span>
                            </span>
                          </a>

                          <a
                            className="topnav-cta-option"
                            href={contactLinks.telegram}
                            target="_blank"
                            rel="noreferrer noopener"
                            role="menuitem"
                            onClick={() => setIsContactMenuOpen(false)}
                          >
                            <span className="topnav-cta-option-icon topnav-cta-option-icon--telegram" aria-hidden="true">
                              <TelegramIcon />
                            </span>
                            <span className="topnav-cta-option-copy">
                              <strong>Telegram</strong>
                              <span>Conversar pelo Telegram</span>
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="page-description">
                    Planos pensados para negócio que precisa de presença, manutenção e evolução contínua sem improviso.
                  </p>
                </div>

                <Card className="stack planos-hero-panel" aria-label="Resumo dos planos">
                  <div className="planos-hero-panel-head">
                    <p className="eyebrow">Resumo rápido</p>
                    <strong>Do essencial à evolução contínua</strong>
                  </div>

                  <div className="planos-hero-stats">
                    <div>
                      <strong>COMECE</strong>
                      <span>Tenha uma presença digital profissional
                        Site institucional ou landing page com foco em clareza, experiência e conversão.</span>
                    </div>
                    <div>
                      <strong>ESTRUTURE</strong>
                      <span>Melhore sua presença digital
                        Redesign, ajustes de UX, SEO e melhorias para transformar seu site em uma ferramenta de negócio.</span>
                    </div>
                    <div>
                      <strong>EVOLUA</strong>
                      <span>Mantenha e faça seu site crescer
                        Manutenção, conteúdo, SEO e melhorias contínuas de acordo com novas necessidades.</span>
                    </div>
                  </div>

                  <div className="planos-hero-ribbon">
                    <span>Site profissional</span>
                    <span>Manutenção mensal</span>
                    <span>SEO + GMN</span>
                  </div>

                  <p className="meta">
                    Cada negócio está em um momento diferente. Por isso, a solução é definida de acordo com o que sua empresa realmente precisa.
                  </p>
                </Card>
              </div>
            </section>

            <section className="section" id="planos" aria-labelledby="plans-title">
              <div className="container stack" style={{ gap: "var(--space-8)" }}>
                <div className="split-title">
                  <p className="eyebrow">Planos</p>
                  <h2 id="plans-title">Planos criados para atender diferentes níveis de demanda e crescimento</h2>
                  <p className="lead">
                    Compare abaixo o setup e a composição de cada pacote para escolher o formato que faz mais sentido para o seu momento.
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

                      <div className="planos-plan-for-who">
                        <strong>Para quem é este modelo?</strong>
                        <p>{plan.forWho}</p>
                      </div>

                      <div className="planos-plan-actions">
                        <Button
                          href={createWhatsAppHref(plan.name)}
                          target="_blank"
                          rel="noreferrer noopener"
                          variant={plan.featured ? "primary" : "outline"}
                        >
                          Quero este plano
                        </Button>

                      </div>
                    </Card>
                  ))}
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
