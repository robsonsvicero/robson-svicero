import { useEffect } from "react";
import ReactGA from "react-ga4";
import {
  BadgeCheck,
  BarChart3,
  Check,
  CircleCheck,
  CircleX,
  CalendarDays,
  FileText,
  LayoutTemplate,
  MapPinned,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  Wrench,
} from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { contactLinks, routes, seoFaqContent } from "../../content/siteContent.js";
import { absoluteUrl } from "../../utils/seo.js";
import Faq from "../../sections/Faq/Faq.jsx";

export const seoPlans = [
  {
    id: "seo-starter",
    name: "SEO Starter",
    idealFor: "Quem está começando e precisa de constância para criar presença orgânica.",
    summary: "Conteúdo mensal e direção essencial para construir consistência de SEO.",
    price: "899",
    priceValue: 899,
    articles: "2 artigos otimizados",
    posts: "2 publicações",
    features: [
      "2 artigos otimizados por mês",
      "2 publicações no Perfil da Empresa no Google",
      "Monitoramento básico de palavras-chave",
      "Revisão editorial",
      "Recomendações essenciais mensais",
    ],
    ctaLabel: "Quero o SEO Starter",
  },
  {
    id: "seo-local-avancado",
    name: "SEO Local Avançado",
    idealFor: "Negócios que dependem de busca local, como clínicas, escritórios e prestadores de serviço.",
    summary: "Estratégia local, conteúdo e otimização de páginas para buscas regionais.",
    price: "1.367",
    priceValue: 1367,
    articles: "4 artigos otimizados",
    posts: "4 publicações",
    features: [
      "4 artigos otimizados por mês",
      "4 publicações no Perfil da Empresa no Google",
      "On-page nas páginas priorizadas",
      "Estratégia para buscas locais",
      "Acompanhamento de palavras-chave",
      "Recomendações mensais",
    ],
    ctaLabel: "Quero o SEO Local Avançado",
    featured: true,
  },
  {
    id: "seo-escala",
    name: "SEO Escala",
    idealFor: "Mercados competitivos e empresas que precisam ampliar a cobertura de conteúdo.",
    summary: "Maior volume de conteúdo, auditoria técnica e acompanhamento estratégico.",
    price: "2.097",
    priceValue: 2097,
    articles: "8 artigos otimizados",
    posts: "8 publicações",
    features: [
      "Tudo do SEO Local Avançado",
      "8 artigos otimizados por mês",
      "8 publicações no Perfil da Empresa no Google",
      "Auditoria técnica mensal com prioridades",
      "Relatórios de conversão com dados disponíveis",
    ],
    ctaLabel: "Quero o SEO Escala",
  },
];

const forWhom = [
  {
    icon: SearchCheck,
    title: "Meu site existe, mas não aparece no Google",
    description: "Preciso entender quais páginas, palavras e ajustes técnicos podem destravar visibilidade.",
    action: "Começar pelo diagnóstico",
  },
  {
    icon: Target,
    title: "Meu tráfego caiu e não sei o porquê",
    description: "Quero identificar mudanças observáveis, prioridades e pontos que merecem investigação.",
    action: "Avaliar o SEO Starter",
  },
  {
    icon: LayoutTemplate,
    title: "Tenho conteúdo, mas sem estratégia",
    description: "Preciso organizar temas, páginas locais e intenções de busca em um plano consistente.",
    action: "Conhecer o plano Local Avançado",
  },
];

const comparisonRows = [
  ["Artigos otimizados por mês", "2", "4", "8"],
  ["Publicações no Perfil da Empresa no Google", "2", "4", "8"],
  ["Otimização on-page", "Essencial", "Páginas prioritárias", "Páginas prioritárias"],
  ["Estratégia para buscas locais", "Direção básica", "Completa", "Completa"],
  ["Monitoramento de palavras-chave", "Básico", "Acompanhamento mensal", "Acompanhamento mensal"],
  ["Auditoria técnica", "Inicial", "Semestral", "Mensal"],
  ["Relatório de conversão", "Resumo mensal", "Completo", "Completo, com dados disponíveis"],
];

const roadmap = [
  {
    period: "Mês 1",
    title: "Diagnóstico e direção",
    description: "Levantar o cenário, definir palavras-chave e prioridades, corrigir o básico e iniciar as primeiras publicações.",
  },
  {
    period: "Meses 2 e 3",
    title: "Consistência e otimização",
    description: "Produzir conteúdo, aplicar ajustes on-page nas páginas aprovadas e acompanhar os primeiros sinais nos relatórios.",
  },
  {
    period: "Meses 4 a 6",
    title: "Análise e ajuste",
    description: "Avaliar tendências, revisar prioridades e decidir continuar, ampliar ou ajustar o plano conforme os resultados observados.",
  },
];

const deliverables = [
  ["Artigo otimizado", "Pesquisa de intenção de busca, pauta, estrutura de títulos, texto, metadados e revisão on-page."],
  ["Publicação no Perfil da Empresa no Google", "Criação a partir de material, ofertas e informações aprovados pelo cliente."],
  ["Monitoramento de palavras-chave", "Acompanhamento de tendências e variações observáveis; não garante uma posição específica."],
  ["Otimização on-page", "Conteúdo, títulos, headings, links internos, metadados e organização das páginas prioritárias."],
  ["Estratégia local", "Páginas e conteúdos alinhados aos serviços e às áreas atendidas, com consistência das informações comerciais."],
  ["Auditoria técnica mensal", "Problemas observáveis listados e priorizados. Implementações grandes, integrações e desenvolvimento são orçados à parte."],
  ["Relatório de conversão", "Apresentação de eventos e metas apenas quando o rastreamento estiver corretamente configurado."],
];

const deliverableIcons = [FileText, MapPinned, TrendingUp, Settings2, MapPinned, Wrench, BarChart3];

const seoExtras = [
  "Gestão de avaliações e mensagens",
  "Fotografia profissional",
  "Ferramentas pagas específicas do projeto",
  "Bancos de imagens",
  "Desenvolvimento fora do escopo",
  "Mídia paga",
  "Compra de links",
];

function trackEvent(name, parameters = {}) {
  if (typeof window !== "undefined") ReactGA.event(name, parameters);
}

function whatsappUrl(planName) {
  const message = encodeURIComponent(`Olá! Quero saber mais sobre o plano ${planName} de SEO mensal.`);
  return `${contactLinks.whatsapp.split("?")[0]}?text=${message}`;
}

function createSeoServiceSchema() {
  const pageUrl = absoluteUrl(routes.seoService);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${absoluteUrl("/")}#professional-service`,
        name: "Robson Svicero",
        url: absoluteUrl("/"),
        areaServed: ["São Paulo", "Brasil"],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "SEO mensal",
        serviceType: "SEO técnico, on-page, local e conteúdo",
        provider: { "@id": `${absoluteUrl("/")}#professional-service` },
        areaServed: ["São Paulo", "Brasil"],
        url: pageUrl,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "SEO Mensal em São Paulo | Robson Svicero",
        description: "Planos de SEO mensal em São Paulo com conteúdo, otimização, estratégia local e relatório.",
      },
      {
        "@type": "OfferCatalog",
        "@id": `${pageUrl}#offers`,
        name: "Planos de SEO mensal",
        itemListElement: seoPlans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          priceCurrency: "BRL",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.priceValue,
            priceCurrency: "BRL",
            unitText: "MONTH",
          },
          itemOffered: { "@type": "Service", name: plan.name, description: plan.summary },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: seoFaqContent.questions.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export default function SeoService() {
  useEffect(() => {
    const tracked = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || tracked.has(entry.target.id)) return;
        tracked.add(entry.target.id);
        trackEvent("scroll_depth_section", { section_id: entry.target.id });
      });
    }, { threshold: 0.25 });

    ["planos-seo", "seo-comparativo", "seo-faq"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="SEO Mensal em São Paulo: planos de conteúdo e SEO local | Robson Svicero"
        description="SEO mensal em São Paulo com artigos otimizados, on-page, estratégia local, publicações no Perfil da Empresa no Google e relatórios claros."
        path={routes.seoService}
        structuredData={createSeoServiceSchema()}
      />

      <Layout>
        <div className="seo-page">
        <ScrollReveal as="section" className="section service-hero" aria-labelledby="seo-service-title">
          <div className="container planos-hero-grid seo-hero-grid">
            <div className="stack planos-hero-copy seo-hero-copy">
              <p className="eyebrow">SEO mensal em São Paulo</p>
              <h1 id="seo-service-title">SEO mensal para empresas de São Paulo aparecerem no Google e receberem mais contatos.</h1>
              <p className="lead">
                Conteúdo otimizado, ajustes técnicos e Perfil da Empresa no Google trabalhando juntos,
                com entregas claras e relatório mensal do que foi feito e do que mudou.
              </p>
              <div className="hero-cta">
                <p className="page-description">
                  Três planos para construir presença orgânica com constância, sem prometer atalhos.
                </p>
                <Button href="#planos-seo" onClick={() => trackEvent("seo_plans_anchor_click")}>
                  Ver planos de SEO
                </Button>
                <Button
                  href={`${contactLinks.whatsapp}?text=${encodeURIComponent("Olá! Quero pedir um diagnóstico de SEO.")}`}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => trackEvent("seo_diagnostic_click")}
                >
                  Pedir um diagnóstico
                </Button>
              </div>
            </div>
            <Card className="stack planos-hero-panel seo-hero-summary" aria-label="Resumo dos planos de SEO">
              <div className="planos-hero-panel-head">
                <p className="eyebrow">Resumo rápido</p>
                <strong>Presença orgânica todo mês</strong>
              </div>
              <div className="planos-hero-stats">
                <div>
                  <strong><a href="#planos-seo">SEO STARTER</a></strong>
                  <span>R$ 1.197/mês — constância, conteúdo e recomendações essenciais.</span>
                </div>
                <div>
                  <strong><a href="#planos-seo">SEO LOCAL AVANÇADO</a></strong>
                  <span>R$ 1.997/mês — mais conteúdo, on-page e estratégia regional.</span>
                </div>
                <div>
                  <strong><a href="#planos-seo">SEO ESCALA</a></strong>
                  <span>R$ 3.497/mês — volume, auditoria técnica e relatório de conversão.</span>
                </div>
              </div>
              <div className="planos-hero-ribbon">
                <span>Conteúdo</span>
                <span>SEO local</span>
                <span>Relatório mensal</span>
              </div>
            </Card>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" id="para-quem" className="section seo-for-whom-section" aria-labelledby="seo-for-whom-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="Para quem é"
              title="Reconhece algum destes cenários?"
              id="seo-for-whom-title"
              align="center"
            />
            <div className="seo-for-whom-grid">
              {forWhom.map((item) => {
                const Icon = item.icon;
                return (
                  <Card className="seo-for-whom-card" key={item.title}>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href="#planos-seo">{item.action}</a>
                  </Card>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" id="planos-seo" className="section seo-plans-section" aria-labelledby="seo-plans-title">
          <div className="container stack seo-plans-container" style={{ gap: "var(--space-8)" }}>
            <SectionHeader
              label="Planos mensais"
              title="Escolha o ritmo de crescimento do seu conteúdo"
              subtitle="Os valores podem variar conforme o nicho, a concorrência e a complexidade técnica."
              id="seo-plans-title"
              align="center"
            />
            <div className="seo-plans-grid" role="list">
              {seoPlans.map((plan) => (
                <Card className={`seo-plan-card${plan.featured ? " seo-plan-card--featured" : ""}`} key={plan.id} role="listitem">
                  {plan.featured && <span className="seo-plan-badge">Mais escolhido</span>}
                  <div>
                    <h3>{plan.name}</h3>
                    <p className="seo-plan-ideal"><strong>Ideal para:</strong> {plan.idealFor}</p>
                  </div>
                  <div className="seo-plan-price"><strong>R$ {plan.price}</strong><span>/ mês</span></div>
                  <ul className="seo-plan-list">
                    {plan.features.map((feature) => (
                      <li key={feature}><Check size={17} aria-hidden="true" /><span>{feature}</span></li>
                    ))}
                  </ul>
                  <Button
                    href={whatsappUrl(plan.name)}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => trackEvent("seo_plan_cta_click", { plan_id: plan.id })}
                  >
                    {plan.ctaLabel}
                  </Button>
                </Card>
              ))}
            </div>
            <p className="seo-contract-note">
              Contrato inicial recomendado de 3 a 6 meses. A cada ciclo, as prioridades são revistas para orientar continuidade ou ajustes.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" id="seo-comparativo" className="section seo-comparison-section" aria-labelledby="seo-comparison-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <SectionHeader label="Comparativo" title="O que muda de um plano para outro" id="seo-comparison-title" align="center" />
            <div className="seo-comparison-scroll" tabIndex="0" aria-label="Tabela comparativa dos planos">
              <table className="seo-comparison">
                <thead><tr><th>Inclusões</th>{seoPlans.map((plan) => <th key={plan.id}>{plan.name}</th>)}</tr></thead>
                <tbody>{comparisonRows.map((row) => (
                  <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section seo-roadmap-section" aria-labelledby="seo-roadmap-title">
          <div className="container stack" style={{ gap: "var(--space-10)" }}>
            <SectionHeader
              label="Roadmap"
              title="Os primeiros meses construem uma base confiável"
              subtitle="SEO leva meses para produzir sinais consistentes, especialmente quando concorrência, histórico do domínio e estrutura precisam ser considerados."
              id="seo-roadmap-title"
              align="center"
            />
            <ol className="seo-roadmap-list">
              {roadmap.map((item) => (
                <li key={item.period}><span>{item.period}</span><h3>{item.title}</h3><p>{item.description}</p></li>
              ))}
            </ol>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section seo-deliverables-section" aria-labelledby="seo-deliverables-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <SectionHeader label="Entregáveis todo mês" title="O que cada entrega significa" id="seo-deliverables-title" align="center" />
            <div className="seo-deliverables-grid">
              {deliverables.map(([title, description], index) => {
                const Icon = deliverableIcons[index];
                return (
                  <article className="seo-deliverable-card" key={title}>
                    <div className="seo-deliverable-icon" aria-hidden="true">
                      <Icon size={22} />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                );
              })}
              <aside className="seo-exclusions">
                <h3>Não está incluído</h3>
                <ul>
                  {seoExtras.map((extra) => (
                    <li key={extra}>
                      <CircleCheck size={19} aria-hidden="true" />
                      <span>{extra}</span>
                    </li>
                  ))}
                </ul>
                <p>Artigos-padrão têm até 1.500 palavras. Temas extensos, complexos, regulados ou com pesquisa especializada são avaliados antes de aceitar ou orçar separadamente.</p>
              </aside>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section seo-report-section" aria-labelledby="seo-report-title">
          <div className="container seo-report-layout">
            <SectionHeader
              label="Relatório de exemplo"
              title="Você sabe exatamente o que aconteceu no mês"
              subtitle="Modelo anonimizado para dar visibilidade sem depender de cases ou resultados prometidos."
              id="seo-report-title"
              align="left"
              style={{ marginBottom: 0 }}
            />
            <Card className="seo-report-card">
              <div className="seo-report-head">
                <div>
                  <span className="seo-report-eyebrow">Resumo mensal</span>
                  <strong>Relatório de junho</strong>
                </div>
                <span className="seo-report-period"><CalendarDays size={16} aria-hidden="true" /> Mês 3</span>
              </div>
              <dl className="seo-report-grid">
                <div className="seo-report-item">
                  <dt>Entregas do mês</dt>
                  <dd><strong>4 artigos</strong><span>4 publicações · 8 páginas revistas</span></dd>
                </div>
                <div className="seo-report-item">
                  <dt>Indicadores disponíveis</dt>
                  <dd><strong>Dados locais</strong><span>Impressões, consultas e conversões</span></dd>
                </div>
                <div className="seo-report-item">
                  <dt>Aprendizados</dt>
                  <dd><strong>Crescimento de busca</strong><span>Buscas comerciais cresceram em 2 áreas atendidas</span></dd>
                </div>
                <div className="seo-report-item seo-report-item--next">
                  <dt>Próximos passos</dt>
                  <dd><strong>Plano de ação</strong><span>Ampliar conteúdo de serviços e revisar páginas prioritárias</span></dd>
                </div>
              </dl>
              <p>Indicadores variam conforme o rastreamento, o histórico do domínio e a disponibilidade de dados.</p>
            </Card>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="section seo-promises-section" aria-labelledby="seo-promises-title">
          <div className="container stack" style={{ gap: "var(--space-8)" }}>
            <SectionHeader label="Compromisso" title="O que prometo — e o que não prometo" id="seo-promises-title" align="center" />
            <div className="seo-promises-grid">
              <article className="comparison-card comparison-card--custom seo-promises-card">
                <h3 className="comparison-card-title"><BadgeCheck size={22} aria-hidden="true" /> Prometo</h3>
                <p className="comparison-card-desc">Entrega responsável, alinhada ao que pode ser feito dentro do plano contratado.</p>
                <ul className="comparison-list">
                  {["Entregas combinadas todo mês", "Relatório claro e rastreável", "Execução dentro das diretrizes dos buscadores", "Orientação honesta sobre prioridades"].map((item) => (
                    <li className="comparison-item comparison-item--positive" key={item}>
                      <Check size={18} aria-hidden="true" />
                      <span><strong>{item}</strong></span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="comparison-card seo-promises-card">
                <h3 className="comparison-card-title"><ShieldCheck size={22} aria-hidden="true" /> Não prometo</h3>
                <p className="comparison-card-desc">Resultados reais dependem de fatores que nenhuma agência pode controlar isoladamente.</p>
                <ul className="comparison-list">
                  {[
                    "Posição específica no Google",
                    "Volume garantido de tráfego",
                    "Vendas ou contatos garantidos",
                    "Resultados independentes de concorrência, histórico, qualidade do site, demanda e mudanças nos buscadores",
                  ].map((item) => (
                    <li className="comparison-item comparison-item--negative" key={item}>
                      <CircleX size={18} aria-hidden="true" />
                      <span><strong>{item}</strong></span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal id="seo-faq">
          <Faq
            content={seoFaqContent}
            id="seo-faq"
            titleId="seo-faq-title"
            onQuestionToggle={(question) => trackEvent("seo_faq_open", { question })}
          />
        </ScrollReveal>

        <CTA content={{
          eyebrow: "Diagnóstico de SEO",
          title: "Descubra por onde começar",
          lead: "Solicite um diagnóstico e receba prioridades claras antes de escolher um plano mensal.",
          primaryAction: {
            label: "Pedir diagnóstico",
            href: `${contactLinks.whatsapp}?text=${encodeURIComponent("Olá! Quero pedir um diagnóstico de SEO.")}`,
            newTab: true,
          },
        }} titleId="seo-service-cta-title" sectionClassName="seo-final-cta" />
        </div>
      </Layout>
    </>
  );
}
