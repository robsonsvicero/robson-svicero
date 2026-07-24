import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  FolderCheck,
  Lightbulb,
  MousePointerClick,
  Music2,
  Stethoscope,
  Target,
  UserRound,
} from "lucide-react";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contactLinks, routes } from "../../content/siteContent.js";

const clients = [
  {
    icon: Building2,
    title: "Pequenos negócios",
    description: "Empresas que querem se apresentar de forma mais profissional.",
  },
  {
    icon: BadgeCheck,
    title: "MEIs",
    description: "Quem está construindo sua presença e precisa transmitir confiança.",
  },
  {
    icon: UserRound,
    title: "Profissionais liberais",
    description: "Especialistas que precisam tornar seu trabalho claro para novos clientes.",
  },
  {
    icon: Stethoscope,
    title: "Serviços, clínicas e consultórios",
    description: "Negócios que dependem de credibilidade para gerar contatos e oportunidades.",
  },
];

const approach = [
  {
    icon: Lightbulb,
    title: "Clareza",
    description: "O site precisa comunicar bem o que você faz — não apenas ser bonito.",
  },
  {
    icon: Target,
    title: "Estratégia",
    description: "Cada decisão é pensada para gerar contato, credibilidade e conversão.",
  },
  {
    icon: MousePointerClick,
    title: "Técnicas de UX",
    description: "O processo considera a experiência de quem vai usar o site, não só a estética.",
  },
];

const experience = [
  {
    icon: CalendarDays,
    value: "+10",
    label: "anos de experiência",
    description: "Criando sites e experiências digitais desde 2013.",
  },
  {
    icon: FolderCheck,
    value: "+50",
    label: "projetos entregues",
    description: "Soluções desenvolvidas para empresas de diferentes segmentos.",
  },
  {
    icon: Music2,
    value: "Universal Music Store",
    label: "projeto de destaque",
    description: "Atualização do site no maior projeto da minha carreira até hoje.",
    featured: true,
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="Sobre Robson Svicero | Criação de Sites em São Paulo"
        description="Conheça a trajetória de Robson Svicero, profissional de UX e criação de sites desde 2013, e sua abordagem para ajudar pequenos negócios."
        path="/sobre"
      />

      <Layout>
        {/* Seção 1 — Minha história */}
        <Section
          className="about-story-section"
          aria-labelledby="about-title"
          containerClassName="container about-story-layout"
        >
          <div className="stack about-story-copy">
            <p className="eyebrow">Sobre mim</p>
            <h1 id="about-title">Minha história</h1>
            <p className="lead">Como a curiosidade por programação se transformou no trabalho que faço hoje.</p>

            <div className="about-story-text">
              <p>
                Minha história com sites começou em 2013, muito antes de eu imaginar onde isso me
                levaria. Eu gostava de programação e comecei criando sites para amigos próximos,
                usando apenas HTML e CSS. Na época, eu já trabalhava como designer e foi justamente
                essa mistura de interesses que abriu a primeira porta: recebi uma proposta para
                trabalhar como webdesigner.
              </p>
              <p>
                Depois de dois anos nessa função, surgiu um novo convite — trabalhar como UX
                Designer. Para ser sincero, eu nem sabia direito o que um UX Designer fazia. Mesmo
                assim, aceitei o desafio e fui estudar. Passei por algumas empresas, aprendi com
                equipes e projetos diferentes e, na MAEZTRA, tive a oportunidade de participar do
                que considero o maior projeto da minha carreira até hoje: a atualização do site da
                Universal Music Store.
              </p>
              <p>
                Em 2025, decidi dar um novo passo e assumir meus próprios projetos como autônomo.
                Hoje, reúno tudo o que aprendi ao longo dessa trajetória para criar sites
                estratégicos, claros e pensados com técnicas de UX. Meu objetivo é ajudar cada
                negócio a se apresentar melhor e transformar sua presença online em uma ferramenta
                que realmente trabalhe a seu favor.
              </p>
            </div>
          </div>

          <figure className="about-story-portrait">
            <img
              src="/assets/images/sobre-robson.webp"
              alt="Robson Svicero, designer e desenvolvedor de sites"
              width="840"
              height="840"
              loading="eager"
              decoding="async"
            />
            <figcaption>
              <span>Desde 2013</span>
              Design, UX e criação de sites
            </figcaption>
          </figure>
        </Section>

        {/* Seção 2 — Com quem eu trabalho */}
        <Section
          className="surface-band about-clients-section"
          aria-labelledby="about-clients-title"
          containerClassName="container stack about-section-layout"
        >
          <div className="about-section-heading stack">
            <p className="eyebrow">Com quem eu trabalho</p>
            <h2 id="about-clients-title">Sites profissionais para quem faz o negócio acontecer</h2>
            <p className="lead">
              Meu foco é ajudar negócios que precisam de um site que realmente funcione — não só
              que exista.
            </p>
          </div>

          <div className="about-client-grid">
            {clients.map(({ icon: Icon, title, description }) => (
              <Card className="about-client-card" key={title}>
                <span className="about-card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Seção 3 — Minha abordagem */}
        <Section
          className="about-approach-section"
          aria-labelledby="about-approach-title"
          containerClassName="container about-approach-layout"
        >
          <div className="stack about-approach-copy">
            <p className="eyebrow">Minha abordagem</p>
            <h2 id="about-approach-title">Não é só sobre design bonito</h2>
            <p className="lead">
              Um bom site precisa fazer sentido para o seu negócio e para as pessoas que chegam até
              ele.
            </p>
            <p>
              Antes de pensar nas cores ou no visual, procuro entender o que você oferece, quem
              precisa encontrar essa informação e qual ação esperamos dessa pessoa. É isso que
              transforma uma página bonita em uma ferramenta de negócio.
            </p>
          </div>

          <div className="about-approach-list">
            {approach.map(({ icon: Icon, title, description }) => (
              <article className="about-approach-item" key={title}>
                <span className="about-card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Seção 4 — Experiência em números */}
        <Section
          className="dark-band about-experience-section"
          aria-labelledby="about-experience-title"
          containerClassName="container stack about-section-layout"
        >
          <div className="about-section-heading stack">
            <p className="eyebrow">Trajetória e experiência</p>
            <h2 id="about-experience-title">Experiência construída projeto após projeto</h2>
          </div>

          <div className="about-stats-grid">
            {experience.map(({ icon: Icon, value, label, description, featured }) => (
              <article
                className={`about-stat-card${featured ? " about-stat-card-featured" : ""}`}
                key={label}
              >
                <Icon aria-hidden="true" />
                <strong>{value}</strong>
                <span>{label}</span>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Seção 5 — CTA final */}
        <Section
          className="cta-about-band about-final-cta"
          aria-labelledby="about-cta-title"
          containerClassName="container about-final-cta-layout"
        >
          <div className="stack">
            <p className="eyebrow">Vamos conversar?</p>
            <h2 id="about-cta-title">Vamos conversar sobre o seu projeto?</h2>
            <p className="lead">
              Conte um pouco sobre o seu negócio e vamos descobrir juntos como um site profissional
              pode ajudar.
            </p>
          </div>
          <div className="about-final-cta-actions">
            <Button as={Link} to={routes.contact} title="Ir para a página de contato">
              Falar sobre meu projeto
            </Button>
            <Button
              href={contactLinks.whatsapp}
              variant="secondary"
              target="_blank"
              rel="noreferrer noopener"
              title="Conversar pelo WhatsApp"
            >
              Chamar no WhatsApp
            </Button>
          </div>
        </Section>
      </Layout>
    </>
  );
}
