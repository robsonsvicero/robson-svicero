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
  "Seu site não transmite profissionalismo",
  "Os visitantes não entram em contato",
  "Sua empresa depende apenas das redes sociais",
  "Você perde oportunidades para concorrentes mais bem posicionados",
  "Seu site é lento ou antigo",
];

const benefits = [
  {
    icon: ShieldCheck,
    problem: "Sem credibilidade online",
    benefit: "Passe mais credibilidade",
    description: "Seu site mostra que sua empresa é profissional desde o primeiro contato.",
  },
  {
    icon: Building2,
    problem: "Sem geração de contatos",
    benefit: "Gere mais oportunidades",
    description: "Transforme visitantes em contatos e pedidos de orçamento.",
  },
  {
    icon: TrendingUp,
    problem: "Sem SEO + estratégia",
    benefit: "Seja encontrado no Google",
    description: "Tenha uma presença digital preparada para atrair novos clientes.",
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
        <h2 id="para-quem-title">Este serviço é para empresas que precisam de um site que trabalhe a favor do negócio.</h2>
        <p className="lead">
          Ideal para quem quer fortalecer sua presença digital, transmitir credibilidade e conquistar mais clientes.
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
          <h3>Seu site deveria ajudar sua empresa a vender, não atrapalhar.</h3>
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
          <h3>O que um bom site faz pela sua empresa</h3>
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
