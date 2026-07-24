import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CircleAlert,
  School,
  ShieldCheck,
  Stethoscope,
  Store,
  TrendingUp,
} from "lucide-react";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contactLinks } from "../../content/siteContent.js";

const audiences = [
  {
    icon: BriefcaseBusiness,
    title: "Prestadores de serviço",
    pain: "Sites que não explicam claramente o que você faz",
  },
  {
    icon: Stethoscope,
    title: "Clínicas e consultórios",
    pain: "Sites que não transmitem confiança para pacientes",
  },
  {
    icon: School,
    title: "Escolas pequenas",
    pain: "Sites desatualizados que não passam credibilidade",
  },
  {
    icon: Store,
    title: "Comércios e pequenos negócios locais",
    pain: "Presença online fraca ou inexistente",
  },
];

const commonPains = [
  "Seu site atual não gera contatos ou vendas",
  "Sua empresa só tem Instagram e carece de um site profissional",
  "Você já tentou criar um site sozinho e não obteve o resultado desejado",
  "Seu site parece amador e não passa credibilidade",
  "Você não sabe por onde começar para ter presença online",
];

const benefits = [
  {
    icon: Building2,
    problem: "Sem site claro",
    benefit: "Mais clareza sobre o que você oferece",
    description: "Apresente seus serviços de forma simples e ajude o cliente a entender como você pode ajudá-lo.",
  },
  {
    icon: ShieldCheck,
    problem: "Sem credibilidade online",
    benefit: "Mais confiança para seus clientes",
    description: "Tenha uma presença profissional que transmite segurança antes mesmo do primeiro contato.",
  },
  {
    icon: TrendingUp,
    problem: "Sem geração de contatos",
    benefit: "Mais oportunidades de negócio",
    description: "Transforme visitas em conversas com caminhos claros para orçamento e atendimento.",
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
        <p className="eyebrow">Seu negócio mais profissional online</p>
        <h2 id="para-quem-title">Para quem é este serviço?</h2>
        <p className="lead">
          Ideal para prestadores de serviço, clínicas, consultórios, escolas pequenas e negócios que
          precisam se apresentar melhor online.
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
          <h3>Dores comuns dos pequenos negócios</h3>
          <p>
            Uma presença digital fraca pode fazer bons clientes desistirem antes mesmo de conhecer
            a qualidade do seu trabalho.
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
          <h3>Por que você precisa de um site</h3>
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
            href={contactLinks.whatsapp}
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
