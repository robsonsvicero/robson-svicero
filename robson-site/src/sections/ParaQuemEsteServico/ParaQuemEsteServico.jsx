import {
  ArrowRight,
  ArrowBigRight,
  BriefcaseBusiness,
  Building2,
  CircleAlert,
  Megaphone,
  Road,
  Store,
  Speech,
  ShieldCheck,
  Stethoscope,
  Warehouse,
  TrendingUp,
  Target,
} from "lucide-react";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contactLinks } from "../../content/siteContent.js";

const audiences = [
  {
    icon: BriefcaseBusiness,
    title: "Prestadores de serviço",
    pain: "Quando é difícil explicar o valor do serviço ou transformar visitas em contatos.",
  },
  {
    icon: Stethoscope,
    title: "Clínicas e consultórios",
    pain: "Quando a experiência digital não transmite a mesma confiança que o atendimento presencial.",
  },
  {
    icon: Store,
    title: "Pequenas empresas",
    pain: "Quando a empresa cresceu, mas sua presença digital ainda parece estar no início.",
  },
  {
    icon: Warehouse,
    title: "Negócios locais",
    pain: "Quando o cliente encontra a empresa nas redes sociais, mas não encontra informações suficientes para avançar na decisão.",
  },
];

const commonPains = [
  "Sua proposta de valor não fica clara",
  "Seus diferenciais passam despercebidos",
  "O cliente não encontra as informações que precisa",
  "A experiência não transmite a confiança esperada",
  "O próximo passo não está claro",
  "A empresa depende demais de canais que não controla",
];

const benefits = [
  {
    icon: Speech,
    problem: "Explicar",
    benefit: "Deixar claro o que sua empresa oferece, para quem e qual valor entrega.",
    description: "",
  },
  {
    icon: Megaphone,
    problem: "Convencer",
    benefit: "Apresentar informações, diferenciais e evidências que ajudam o visitante a confiar na empresa.",
    description: "",
  },
  {
    icon: ArrowBigRight,
    problem: "Orientar",
    benefit: "Conduzir o visitante para o próximo passo, sem deixar dúvidas sobre o que fazer.",
    description: "",
  },
  {
    icon: Target,
    problem: "Ser encontrada",
    benefit: "Estruturar conteúdo e tecnologia para facilitar a descoberta da empresa em mecanismos de busca.",
    description: "",
  },
  {
    icon: Road,
    problem: "Facilitar o contato",
    benefit: "Reduzir barreiras entre o interesse do visitante e uma oportunidade comercial.",
    description: "",
  },
];

export default function ParaQuemEsteServico() {
  return (
    <Section
      className="para-quem-section"
      id="para-quem"
      aria-labelledby="para-quem-title"
      containerClassName="container stack para-quem-layout"
    >
      <header className="para-quem-header stack">
        <p className="eyebrow">Para empresas que precisam resolver problemas digitais</p>
        <h2 id="para-quem-title">Nem todo negócio precisa apenas de um site novo. Às vezes, o problema está na forma como a empresa apresenta seus serviços, explica seu valor ou conduz o cliente até o contato.</h2>
        <p className="lead">
          O trabalho começa entendendo esse cenário para definir o que a experiência digital precisa fazer pelo negócio.
        </p>
      </header>

      {/* Bloco 1 — Ideal para */}
      <div className="stack para-quem-block">
        <h3>Ideal para</h3>
        <div className="para-quem-audience-grid">
          {audiences.map(({ icon: Icon, title, pain }) => (
            <Card className="para-quem-audience-card" key={title}>
              <span className="para-quem-icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <h4>{title}</h4>
                <p>{pain}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bloco 2 — Dores comuns */}
      <div className="para-quem-pains">
        <div className="stack para-quem-pains-copy">
          <p className="eyebrow">Você se identifica?</p>
          <h3>Um bom negócio pode perder oportunidades por uma experiência digital ruim</h3>
          <p>
            Seu cliente pode chegar até sua empresa pelo Google, Instagram, indicação ou anúncio. Mas, antes de entrar em contato, ele precisa entender rapidamente quem você é, o que oferece e por que deveria considerar sua empresa.</p>
          <p>
            Quando essa experiência não funciona, algumas oportunidades são perdidas antes mesmo do primeiro contato.
          </p>
        </div>
        <ul className="para-quem-pain-list">
          {commonPains.map((pain) => (
            <li key={pain}>
              <CircleAlert aria-hidden="true" />
              <span>{pain}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bloco 3 — Por que você precisa de um site */}
      <div className="para-quem-conversion stack">
        <div className="para-quem-conversion-header">
          <p className="eyebrow">Da dificuldade ao resultado</p>
          <h3>O que uma boa experiência digital precisa fazer</h3>
        </div>

        <div className="para-quem-benefit-grid">
          {benefits.map(({ icon: Icon, problem, benefit, description }) => (
            <article className="para-quem-benefit-card" key={problem}>
              <span className="para-quem-benefit-icon" aria-hidden="true">
                <Icon />
              </span>
              <p className="para-quem-problem">{problem}</p>
              <ArrowRight className="para-quem-arrow" aria-hidden="true" />
              <strong>{benefit}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="para-quem-cta">
          <p>Seu negócio merece uma presença digital à altura do trabalho que você entrega.</p>
          <Button
            href={contactLinks.telegram}
            target="_blank"
            rel="noreferrer noopener"
            title="Quero meu site profissional pelo WhatsApp"
          >
            Quero meu site profissional
          </Button>
        </div>
      </div>
    </Section>
  );
}
