import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
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
import IconInfoCard from "../../components/IconInfoCard/IconInfoCard.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import HeroParticles from "../../sections/Hero/HeroParticles.jsx";
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
    description: "O site precisa comunicar bem o que você faz e não apenas ser bonito.",
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

function CountUp({ value, prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(reducedMotion ? value : 0);
  const roundedCount = useTransform(count, (latest) => `${prefix}${Math.round(latest)}`);

  useEffect(() => {
    if (!isInView) return undefined;
    if (reducedMotion) {
      count.set(value);
      return undefined;
    }

    const controls = animate(count, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [count, isInView, reducedMotion, value]);

  return <motion.strong ref={ref}>{roundedCount}</motion.strong>;
}

function StatValue({ value }) {
  const numericValue = /^\+\d+$/.test(value);
  if (!numericValue) return <strong>{value}</strong>;

  return <CountUp value={Number(value.slice(1))} prefix="+" />;
}

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
          <HeroParticles />
          <div className="stack about-story-copy">
            <p className="eyebrow">Sobre o estúdio</p>
            <h1 id="about-title">Criação de sites profissionais, pensados para o seu negócio.</h1>
            <p className="lead">Desde a curiosidade por programação até a criação de sites que ajudam negócios a crescer.</p>

            <div className="about-story-text">
              <p>
                O <strong>Robson Svicero Estúdio de Design</strong> cria sites profissionais que unem estratégia, design e experiência do usuário. Cada projeto é desenvolvido para apresentar sua marca com clareza, transmitir confiança e ajudar seu negócio a alcançar seus objetivos.
              </p>
              <p>
                Minha trajetória na área começou em <strong>2013</strong>, com a criação de sites em HTML e CSS. Desde então, trabalhei como designer e webdesigner e ampliei minha atuação para UX, identidade visual e SEO — conhecimentos que hoje contribuem para criar sites mais completos, intuitivos e bem preparados para o ambiente digital.
              </p>
              <p>
                O processo começa pela compreensão do negócio, do público e dos objetivos do projeto. A partir disso, cada site ganha uma estrutura clara, uma identidade visual coerente e uma experiência simples de navegar. Quando necessário, também integro fundamentos de SEO para ajudar o site a ser encontrado nos mecanismos de busca.
              </p>
              <p>
                O atendimento é próximo e cada projeto é acompanhado com atenção aos detalhes, da primeira conversa à entrega. O objetivo é criar um site que represente bem sua marca e funcione como uma ferramenta para o seu negócio.
              </p>
              <p>
                <strong>
                  São Paulo, SP · Atendimento remoto em todo o Brasil
                </strong>
              </p>
            </div>
          </div>
          <div className="about-story-container">
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
              <span className="image-description" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>São Paulo, SP · atendimento remoto em todo o Brasil
              </span>
          </div>
        </Section>

        {/* Seção 2 — Com quem eu trabalho */}
        <Section
          className="surface-band about-clients-section"
          aria-labelledby="about-clients-title"
          containerClassName="container stack about-section-layout"
        >
          <SectionHeader
            label="Com quem trabalhamos"
            title="Sites profissionais para quem faz o negócio acontecer"
            subtitle="O site deve realmente funcionar e não apenas existir. Ele precisa transmitir credibilidade, responder às dúvidas do cliente sobre como você pode ajudá-lo e orientá-lo na tomada de decisão."
            id="about-clients-title"
            align="center"
          />

          <div className="about-client-grid">
            {clients.map(({ icon: Icon, title, description }) => (
              <ScrollReveal className="about-client-reveal" key={title}>
                <IconInfoCard
                  icon={Icon}
                  title={title}
                  description={description}
                  className="about-client-card"
                />
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Seção 3 — Nossa abordagem */}
        <Section
          className="about-approach-section"
          aria-labelledby="about-approach-title"
          containerClassName="container about-approach-layout"
        >
          <div className="about-approach-copy">
            <SectionHeader
              label="Nossa abordagem"
              title="Não é só sobre design bonito"
              subtitle={"Um bom site precisa fazer sentido para o seu negócio e para as pessoas que chegam até ele."}
              id="about-approach-title"
              align="left"
              style={{ marginBottom: 0 }}
            />
            <p className="about-approach-detail">Antes de pensar nas cores ou no visual, procuramos entender o que você oferece, quem precisa encontrar essa informação e qual ação esperamos dessa pessoa. É isso que transforma uma página bonita em uma ferramenta de negócio.</p>
          </div>

          <div className="about-approach-list">
            {approach.map(({ icon: Icon, title, description }) => (
              <ScrollReveal className="about-approach-reveal" key={title}>
                <article className="about-approach-item">
                  <span className="about-card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Seção 4 — Experiência em números */}
        <Section
          className="surface-band about-experience-section"
          aria-labelledby="about-experience-title"
          containerClassName="container stack about-section-layout"
        >
          <ScrollReveal className="about-section-heading stack">
            <p className="eyebrow">Trajetória e experiência</p>
            <h2 id="about-experience-title">Experiência construída projeto após projeto</h2>
          </ScrollReveal>

          <div className="about-stats-grid">
            {experience.map(({ icon: Icon, value, label, description, featured }) => (
              <ScrollReveal
                className={`about-stat-reveal${featured ? " about-stat-reveal-featured" : ""}`}
                key={label}
              >
                <article className={`about-stat-card${featured ? " about-stat-card-featured" : ""}`}>
                  <Icon aria-hidden="true" />
                  <StatValue value={value} />
                  <span>{label}</span>
                  <p>{description}</p>
                </article>
              </ScrollReveal>
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
            <Button
              href={contactLinks.whatsapp}
              variant="primary"
              target="_blank"
              rel="noreferrer noopener"
              title="Conversar sobre um projeto"
            >
              Conversar sobre um projeto
            </Button>
            <Button
              href={routes.cases}
              variant="secondary"
              target="_blank"
              rel="noreferrer noopener"
              title="Ver projetos anteriores"
            >
              Ver projetos anteriores
            </Button>
          </div>
        </Section>
      </Layout>
    </>
  );
}
