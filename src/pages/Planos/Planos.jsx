import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { contactLinks, pageCtaContent, routes } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import { testimonialsContent } from "../../content/siteContent.js";
import { BadgeCheck, Clock3, Globe2, ShieldCheck, Quote } from "lucide-react";
import Projects from "../../sections/Projects/Projects.jsx";
import Faq from "../../sections/Faq/Faq.jsx";
import ReactGA from "react-ga4";

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
    name: "Landing Page",
    focus: "LANDING PAGE",
    idealFor: "Quem vai rodar anúncios ou divulgar uma oferta específica.",
    result: "Receber contatos direto no WhatsApp.",
    tone: "Página única para campanha em São Paulo, Google Ads ou tráfego direto. Foco em conversão.",
    price: "490",
    priceNote: "O investimento pode variar por integrações e produção de conteúdo.",
    ctaLabel: "Quero uma landing page",
    badge: null,
    timeline: "Pronto em 7 a 10 dias",
    bullets: [
      "1 página otimizada",
      "WhatsApp + formulário",
      "Hospedagem 12 meses",
    ],
  },
  {
    id: "one-page",
    name: "Site One Page",
    focus: "PÁGINA ÚNICA",
    idealFor: "Quem precisa apresentar a empresa completa sem uma arquitetura extensa.",
    result: "Centralizar sua oferta, provas e contato em uma jornada objetiva.",
    tone: "Uma página estratégica para apresentar serviços, diferenciais e caminho de contato.",
    price: "690",
    priceNote: "Seções extras, animações e integrações podem alterar o valor.",
    ctaLabel: "Quero um site One Page",
    badge: null,
    timeline: "Pronto em 10 a 15 dias",
    bullets: [
      "Estrutura completa em uma página",
      "SEO local técnico",
      "Suporte de 90 dias",
    ],
  },
  {
    id: "institutional",
    name: "MAIS ESCOLHIDO",
    focus: "Site Institucional",
    idealFor: "Prestadores de serviço, clínicas e empresas que querem ser encontradas.",
    result: "Ser encontrado por quem busca seu serviço na região.",
    tone: "Estrutura completa para apresentar a empresa, seus serviços e diferenciais com autoridade.",
    price: "890",
    priceNote: "Até 5 páginas; cada página adicional custa R$ 75.",
    ctaLabel: "Quero um site institucional",
    badge: "Mais escolhido",
    timeline: "Pronto em 15 a 20 dias",
    bullets: [
      "Até 5 páginas incluídas",
      "SEO local + schema",
      "Suporte de 90 dias",
    ],
    featured: true,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    focus: "E-COMMERCE",
    idealFor: "Quem quer vender produtos ou serviços online todos os dias.",
    result: "Receber por Pix, boleto e cartão sem depender de marketplace.",
    tone: "Loja virtual com Pix, boleto e cartão para empresas de São Paulo venderem online.",
    price: "1.997",
    priceNote: "O catálogo, integrações e formas de pagamento podem alterar o valor.",
    ctaLabel: "Quero vender online",
    badge: null,
    timeline: "Pronto em 25 a 45 dias",
    bullets: [
      "Catálogo + carrinho",
      "Integração de pagamento",
      "Treinamento completo",
    ],
  },
];

const maintenancePlans = [
  {
    name: "Essencial",
    price: "129",
    description: "Site no ar, infraestrutura protegida e suporte técnico básico.",
    bullets: ["Hospedagem e domínio inclusos", "Até 1 pequena alteração por mês", "Resposta em até 3 dias úteis"],
  },
  {
    name: "Profissional",
    price: "279",
    description: "Infraestrutura e rotina de atualização para empresas que precisam fazer mudanças com frequência.",
    bullets: ["Hospedagem e domínio inclusos", "Até 3 pequenas alterações por mês", "Resposta em até 2 dias úteis"],
    featured: true,
  },
  {
    name: "Avançado",
    price: "449",
    description: "Acompanhamento técnico próximo, manutenção preventiva e verificações contínuas.",
    bullets: ["Hospedagem e domínio inclusos", "Até 5 pequenas alterações por mês", "SEO técnico básico e relatório"],
  },
];

const plansFaq = [
  {
    question: "Quanto custa manter o site depois do primeiro ano?",
    answer: "Após o primeiro ano, o plano Essencial começa em R$ 129 por mês. Hospedagem, domínio padrão e o nível de suporte e alterações variam conforme o plano contratado.",
  },
  {
    question: "Já tenho domínio ou site. Posso aproveitar?",
    answer: "Sim. Podemos avaliar o domínio, migração, conteúdo e estrutura atual. Quando aproveitarmos o que já existe, a proposta deixa claro o que será reutilizado e o que precisa ser desenvolvido.",
  },
  {
    question: "O que está incluído no suporte de 90 dias?",
    answer: "Pequenas atualizações de conteúdo já existente, troca de imagem fornecida pelo cliente, correção de links e alterações simples em telefone, endereço ou horário. Novas páginas, funcionalidades e mudanças estruturais são orçadas à parte.",
  },
  {
    question: "Quantas revisões estão incluídas?",
    answer: "A proposta inclui duas rodadas de revisão dentro do escopo aprovado. Novas direções, páginas ou alterações fora do escopo precisam ser avaliadas separadamente.",
  },
  {
    question: "O site é meu? Posso levar para outra hospedagem?",
    answer: "O domínio e o projeto pertencem ao contratante. Você pode solicitar migração para outra hospedagem; custos, disponibilidade de acesso e ajustes técnicos necessários são avaliados antes da transferência.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Os projetos podem ser pagos por entrada, parcelamento ou Pix. As condições de entrada, parcelas e desconto são apresentadas na proposta antes da contratação.",
  },
  {
    question: "Em quanto tempo meu site fica pronto e o que preciso enviar?",
    answer: "O prazo começa após o alinhamento do escopo e depende do formato contratado. Normalmente são necessários logo, textos ou referências, fotos, informações comerciais, contato e aprovações dentro do cronograma.",
  },
  {
    question: "Você cuida do Google Meu Negócio e do SEO?",
    answer: "O projeto inclui a base técnica de SEO. Configuração e gestão contínua do Google Meu Negócio são serviços avulsos, assim como produção de conteúdo e campanhas recorrentes de SEO.",
  },
];

function getPlanWhatsAppUrl(planName) {
  const message = encodeURIComponent(
    `Olá! Quero o plano ${planName} para o meu projeto. Pode me explicar como funciona?`
  );
  return `https://wa.me/5511964932007?text=${message}`;
}

function trackEvent(name, parameters = {}) {
  if (typeof window === "undefined") return;
  ReactGA.event(name, parameters);
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
          "Planos de criação de sites com desenvolvimento, suporte e manutenção contínua.",
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
            description: plan.tone,
            offers: {
              "@type": "Offer",
              price: plan.price.replace(".", ""),
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: pageUrl,
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: plansFaq.map((item) => ({
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

export default function Planos() {
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const contactMenuRef = useRef(null);
  const contactButtonRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target)) {
        setIsContactMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setIsContactMenuOpen(false);
      contactButtonRef.current?.focus();
    };
    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tracked = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || tracked.has(entry.target.id)) return;
        tracked.add(entry.target.id);
        trackEvent("scroll_depth_section", { section_id: entry.target.id });
      });
    }, { threshold: 0.25 });

    ["planos", "evolucao", "faq"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Planos de Criação de Sites em São Paulo | Robson Svicero"
        description="Conheça planos de criação de sites profissionais, landing pages e lojas virtuais em São Paulo. Atendimento direto, suporte e manutenção. Solicite seu orçamento."
        path={routes.prices}
        structuredData={createPlansSchema()}
      />
      <Layout>
        <div className="planos-page">

          <main>
            <div className="container">
              <p className="meta" style={{ textAlign: "center" }}>
                Landing page de campanha: R$ 297 — oferta pontual da Black Friday, válida somente para campanhas específicas.
              </p>
            </div>
            <ScrollReveal as="section" className="section planos-hero" aria-labelledby="planos-title">
              <div className="container planos-hero-grid">
                <div className="stack planos-hero-copy">
                  <p className="eyebrow">Criação de sites profissionais</p>
                  <h1 id="planos-title">Criação de sites profissionais em São Paulo para gerar contatos.</h1>
                  <p className="lead">
                    Crio seu site com estratégia, preço fechado e prazo definido para apresentar sua empresa, transmitir confiança e gerar contatos.
                  </p>
                  <div className="hero-cta">
                    <p className="page-description">
                      Planos pensados para negócio que precisa de presença, manutenção e evolução contínua sem improviso.
                    </p>
                    <div className="planos-proposal-wrap" ref={contactMenuRef}>
                      <Button
                        as="button"
                        type="button"
                        ref={contactButtonRef}
                        variant="primary"
                        aria-expanded={isContactMenuOpen}
                        aria-haspopup="dialog"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsContactMenuOpen((current) => {
                            trackEvent(current ? "contact_popover_close" : "contact_popover_open");
                            return !current;
                          });
                        }}
                      >
                        Quero a minha proposta
                      </Button>

                      {isContactMenuOpen && (
                        <div className="topnav-cta-popover" role="dialog" aria-label="Opções de contato" style={{ textAlign: "left" }}>
                          <p className="topnav-cta-popover-title">Como você prefere falar comigo?</p>

                          <a
                            className="topnav-cta-option"
                            href={contactLinks.whatsapp}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={() => {
                              trackEvent("contact_channel_click", { channel: "whatsapp" });
                              setIsContactMenuOpen(false);
                            }}
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
                            onClick={() => {
                              trackEvent("contact_channel_click", { channel: "telegram" });
                              setIsContactMenuOpen(false);
                            }}
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
                    <Button as="a" href="#planos" variant="secondary">
                      Ver planos
                    </Button>
                  </div>
                </div>

                <Card className="stack planos-hero-panel" aria-label="Resumo dos planos">
                  <div className="planos-hero-panel-head">
                    <p className="eyebrow">Resumo rápido</p>
                    <strong>Do essencial à evolução contínua</strong>
                  </div>

                  <div className="planos-hero-stats">
                    <div>
                      <strong><a href="#planos">COMECE</a></strong>
                      <span>Escolha um site institucional ou uma landing page para lançar sua presença profissional.</span>
                    </div>
                    <div>
                      <strong><a href="#manutencao">EVOLUA</a></strong>
                      <span>Mantenha, atualize e acompanhe seu site com suporte contínuo.</span>
                    </div>
                    <div>
                      <strong><a href="#evolucao">ESTRUTURE</a></strong>
                      <span>Evolua sua experiência com redesign, ajustes de UX e SEO.</span>
                    </div>
                  </div>

                  <div className="planos-hero-ribbon">
                    <span>Site profissional</span>
                    <span>Manutenção mensal</span>
                    <span>SEO técnico</span>
                  </div>

                  <p className="meta">
                    Cada negócio está em um momento diferente. Por isso, a solução é definida de acordo com o que sua empresa realmente precisa.
                  </p>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal as="section" className="section planos-trust" aria-label="Garantias da contratação">
              <div className="container planos-trust-grid">
                <div><BadgeCheck aria-hidden="true" /><span><strong>Preço fechado</strong><small>Escopo claro na proposta</small></span></div>
                <div><Clock3 aria-hidden="true" /><span><strong>Prazo definido</strong><small>Incluído em contrato</small></span></div>
                <div><Globe2 aria-hidden="true" /><span><strong>1º ano incluso</strong><small>Hospedagem, SSL e domínio</small></span></div>
                <div><ShieldCheck aria-hidden="true" /><span><strong>Suporte</strong><small>Após a entrega do projeto</small></span></div>
              </div>
            </ScrollReveal>

            <ScrollReveal as="section" className="section surface-band planos-investment" id="planos" aria-labelledby="plans-title">
              <div className="container stack planos-investment-container">
                <SectionHeader
                  label="Investimento"
                  title="Quanto preciso investir para criar um site em São Paulo"
                  subtitle="Valores transparentes para tirar seu site do papel. Todos os planos incluem hospedagem, certificado SSL e domínio .com.br no primeiro ano, sem custos escondidos."
                  id="plans-title"
                  align="center"
                />

                <div className="planos-plan-grid planos-investment-grid" role="list">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`stack planos-plan-card planos-investment-card${plan.featured ? " planos-plan-card--featured" : ""}`}
                      role="listitem"
                    >
                      <div className="planos-investment-copy">
                        <p className="eyebrow">{plan.focus}</p>
                        {plan.badge && <span className="planos-plan-badge">{plan.badge}</span>}
                          <p className="planos-plan-ideal"><strong>Ideal para:</strong> {plan.idealFor}</p>
                          <p className="planos-plan-result"><strong>Resultado:</strong> {plan.result}</p>
                          <p className="planos-plan-tone">{plan.tone}</p>
                      </div>

                      <p className="planos-investment-price"><span>a partir de</span> R$ {plan.price}</p>
                      <p className="planos-investment-price-note">{plan.priceNote}</p>
                      <p className="meta">{plan.timeline}</p>

                      <ul className="planos-plan-list">
                        {plan.bullets.map((bullet) => (
                          <li key={bullet}>
                            <span className="planos-investment-dot" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        href={getPlanWhatsAppUrl(plan.name)}
                        target="_blank"
                        rel="noreferrer noopener"
                        variant={plan.featured ? "primary" : "secondary"}
                        data-plan={plan.id}
                        onClick={() => trackEvent("plan_cta_click", { plan_id: plan.id })}
                      >
                        {plan.ctaLabel}
                      </Button>
                    </Card>
                  ))}
                </div>
                <p className="planos-investment-note">Precisa de algo customizado? <Link to={routes.contact}>Solicite um orçamento sob medida para sua empresa em São Paulo.</Link></p>
                <p className="planos-investment-note">Pagamento facilitado: entrada + parcelas ou Pix. Condições apresentadas na proposta.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal as="section" className="section surface-band" aria-labelledby="how-it-works-title">
              <div className="container stack" style={{ gap: "var(--space-8)" }}>
                <SectionHeader
                  label="Como funciona"
                  title="Do briefing à publicação sem improviso"
                  subtitle="Cada etapa define prazo, responsáveis, aprovações e entregas antes do projeto avançar."
                  id="how-it-works-title"
                  align="center"
                />
                <ol className="grid-3 local-benefits-grid planos-process">
                  <li><Card className="feature local-benefit-card"><span>01</span><h3>Conversa e briefing</h3><p>Alinhamos objetivo, público, conteúdo e prazo. Você envia logo, textos disponíveis, fotos e referências.</p></Card></li>
                  <li><Card className="feature local-benefit-card"><span>02</span><h3>Proposta e escopo fechado</h3><p>Receba formato, entregas, investimento, cronograma e forma de pagamento antes da aprovação.</p></Card></li>
                  <li><Card className="feature local-benefit-card"><span>03</span><h3>Desenvolvimento e validação</h3><p>Estrutura, interface e conteúdo são desenvolvidos em etapas, com duas rodadas de revisão no escopo aprovado.</p></Card></li>
                  <li><Card className="feature local-benefit-card"><span>04</span><h3>Publicação e suporte</h3><p>Após a aprovação, configuramos domínio e publicação. O suporte de ajustes simples começa após a entrega.</p></Card></li>
                </ol>
              </div>
            </ScrollReveal>

            <ScrollReveal as="section" className="section" id="manutencao" aria-labelledby="maintenance-title">
              <div className="container stack" style={{ gap: "var(--space-8)" }}>
                <SectionHeader
                  label="Depois da entrega"
                  title="Mantenha o site protegido, atualizado e sob controle"
                  subtitle="A manutenção é opcional e contratada após a entrega. Inclui hospedagem, domínio padrão e pequenas alterações dentro dos limites de cada plano."
                  id="maintenance-title"
                  align="center"
                />
                <div className="planos-plan-grid planos-investment-grid planos-maintenance-grid" role="list">
                  {maintenancePlans.map((plan) => (
                    <Card
                      key={plan.name}
                      className={`stack planos-plan-card planos-investment-card${plan.featured ? " planos-plan-card--featured" : ""}`}
                      role="listitem"
                    >
                      <div className="planos-investment-copy">
                        <p className="eyebrow">Manutenção</p>
                        <h3>{plan.name}</h3>
                        <p className="planos-plan-tone">{plan.description}</p>
                      </div>
                      <p className="planos-investment-price"><span>mensal a partir de</span> R$ {plan.price}</p>
                      <ul className="planos-plan-list">
                        {plan.bullets.map((bullet) => (
                          <li key={bullet}>
                            <span className="planos-investment-dot" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        href={getPlanWhatsAppUrl(`Manutenção ${plan.name}`)}
                        target="_blank"
                        rel="noreferrer noopener"
                        variant={plan.featured ? "primary" : "secondary"}
                        data-plan={`maintenance-${plan.name.toLowerCase()}`}
                        onClick={() => trackEvent("plan_cta_click", { plan_id: `maintenance-${plan.name.toLowerCase()}` })}
                      >
                        Quero manutenção
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal as="section" className="section surface-band" aria-labelledby="comparison-title" id="evolucao">
              <div className="container stack" style={{ gap: "var(--space-8)" }}>
                <SectionHeader
                  label="Evolução e comparação"
                  title="Compare os formatos e escolha com segurança"
                  subtitle="A diferença está na profundidade da estrutura, na complexidade das integrações e no prazo do projeto."
                  id="comparison-title"
                  align="center"
                />
                <div className="planos-comparison-scroll">
                  <table className="planos-comparison">
                    <thead><tr><th>Incluído</th><th>Landing Page</th><th>Site One Page</th><th>Site Institucional</th><th>E-commerce</th></tr></thead>
                    <tbody>
                      <tr><th>Páginas</th><td>1 página</td><td>1 página</td><td>Até 5 páginas</td><td>Catálogo completo</td></tr>
                      <tr><th>SEO local</th><td>Base técnica</td><td>Incluído</td><td>Incluído</td><td>Estrutura básica</td></tr>
                      <tr><th>E-commerce</th><td>—</td><td>—</td><td>—</td><td>Incluído</td></tr>
                      <tr><th>Prazo</th><td>7 a 10 dias</td><td>10 a 15 dias</td><td>15 a 20 dias</td><td>25 a 45 dias</td></tr>
                      <tr><th>Suporte</th><td>90 dias</td><td>90 dias</td><td>90 dias</td><td>90 dias</td></tr>
                      <tr><th>Treinamento</th><td>—</td><td>—</td><td>Opcional</td><td>Incluído</td></tr>
                      <tr><th>Manutenção</th><td>Opcional</td><td>Opcional</td><td>Opcional</td><td>Opcional</td></tr>
                    </tbody>
                  </table>
                </div>
                <Card className="feature local-benefit-card planos-evolution-card">
                  <p className="eyebrow">Redesign e SEO</p>
                  <h3>Quando o objetivo é evoluir além da manutenção</h3>
                  <p>Para ajustes de arquitetura, redesign, novas integrações, estratégia de conteúdo ou crescimento orgânico, definimos um escopo separado e o investimento antes da execução.</p>
                  <Button href={getPlanWhatsAppUrl("Redesign ou SEO")} target="_blank" rel="noreferrer noopener">Solicitar diagnóstico de evolução</Button>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal as="section" className="section surface-band testimonials-cta-section cta-home-band" aria-labelledby="plans-testimonials-title">
              <div className="container stack testimonials-proof">
                <SectionHeader
                  label={testimonialsContent.eyebrow}
                  id="plans-testimonials-title"
                  align="left"
                  className="testimonials-proof-header-label-only"
                />
                <div className="testimonials-proof-grid">
                  {testimonialsContent.reviews.map((review) => (
                    <Card className="testimonial-proof-card glass-card" key={review.author}>
                      <div className="testimonial-proof-top" aria-hidden="true">
                        <Quote />
                        <span>Projeto entregue</span>
                      </div>
                      <blockquote className="quote">“{review.quote}”</blockquote>
                      <footer className="testimonial-proof-author">
                        <p>
                          <strong>{review.author}</strong>
                          <span>{review.role} · {review.business}</span>
                        </p>
                        <span className="testimonial-proof-segment">{review.segment}</span>
                      </footer>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal id="faq">
              <Projects />
            </ScrollReveal>

            <ScrollReveal>
              <Faq
                content={{
                  eyebrow: "Perguntas frequentes",
                  title: "Tudo o que você precisa saber antes de contratar",
                  lead: "Respostas diretas sobre investimento, prazo, propriedade do site, suporte e próximos passos.",
                  questions: plansFaq,
                }}
                id="planos-faq"
                titleId="planos-faq-title"
              />
            </ScrollReveal>



            <ScrollReveal>
              <CTA content={pageCtaContent.planosSiteCreation} titleId="planos-cta-title" />
            </ScrollReveal>
          </main>
        </div>
      </Layout>
    </>
  );
}
