import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { pageCtaContent } from "../../content/siteContent.js";

const processSteps = [
  "Imersão e entendimento do projeto",
  "Arquitetura da informação e experiência do usuário (UX)",
  "Design de interfaces (UI)",
  "Desenvolvimento Front-end",
  "Validação, refinamentos e acompanhamento da entrega",
];

const expectations = [
  "Claras e intuitivas para o usuário",
  "Alinhadas aos objetivos do negócio",
  "Visualmente consistentes com a marca",
  "Preparadas para evoluir ao longo do tempo",
];

export default function About() {
  return (
    <>
      <SEO
        title="Sobre Robson Svicero"
        description="Conheça a trajetória, experiência e forma de trabalho de Robson Svicero em criação de sites, UX/UI, branding, desenvolvimento front-end e uso complementar de IA."
        path="/sobre"
      />
      <Layout>
        <section className="section about-page" aria-labelledby="about-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="about-hero">
              <div className="stack about-hero-copy">
                <p className="eyebrow">Sobre</p>
                <h1 id="about-title">
                  Estratégia, experiência e tecnologia para transformar ideias em
                  sites profissionais.
                </h1>
                <p className="lead">
                  Meu nome é <strong>Robson Svicero</strong> e atuo há mais de 10
                  anos desenvolvendo experiências digitais que unem estratégia,
                  design e desenvolvimento.
                </p>
              </div>
              <figure className="about-portrait">
                <img
                  src="/assets/images/sobre-robson.webp"
                  alt="Robson Svicero"
                  width="840"
                  height="420"
                  loading="eager"
                  decoding="async"
                />
              </figure>
            </div>

            <div className="about-content">
              <div className="about-copy">
                <p>
                  Ao longo da minha trajetória, participei de projetos para
                  empresas de diferentes segmentos, criando sites profissionais,
                  identidades visuais de apoio e produtos digitais, sempre com um
                  objetivo em comum: transformar necessidades de negócio em
                  soluções claras, funcionais e relevantes para as pessoas.
                </p>
                <p>
                  Acredito que um bom projeto digital vai muito além da
                  estética. Ele precisa comunicar valor, transmitir confiança e
                  facilitar a jornada de quem o utiliza.
                </p>
                <p>
                  Foi essa visão que me levou a construir uma atuação
                  multidisciplinar, combinando <strong>UX Design</strong>,{" "}
                  <strong>UI Design</strong>, <strong>Branding</strong> e{" "}
                  <strong>Desenvolvimento Front-end</strong>. Em vez de trabalhar
                  apenas uma etapa do processo, acompanho o projeto desde a
                  definição da estratégia até a implementação da interface,
                  garantindo consistência entre conceito, experiência e execução.
                </p>
              </div>
            </div>

            <div className="grid-2 about-section">
              <div className="stack">
                <p className="eyebrow">Visão completa</p>
                <h2>Uma visão completa do processo</h2>
              </div>
              <div className="about-copy">
                <p>
                  Durante minha carreira, tive a oportunidade de colaborar em
                  projetos para empresas e organizações de diferentes portes,
                  desenvolvendo sites profissionais, plataformas digitais,
                  sistemas e identidades visuais de apoio.
                </p>
                <p>
                  Essa diversidade de experiências me permite compreender
                  rapidamente os desafios de cada negócio e propor soluções que
                  equilibram objetivos comerciais, necessidades dos usuários e
                  viabilidade técnica.
                </p>
                <p>
                  Mais do que entregar telas ou código, meu foco é construir
                  experiências digitais que façam sentido para quem utiliza e
                  tragam resultados para quem investe.
                </p>
              </div>
            </div>

            <div className="grid-2 about-section">
              <div className="stack">
                <p className="eyebrow">Como trabalho</p>
                <h2>Um processo integrado do entendimento à entrega</h2>
                <p className="lead">
                  Cada projeto começa entendendo o negócio, seus objetivos e o
                  perfil das pessoas que irão utilizar a solução.
                </p>
              </div>
              <Card as="div">
                <ol className="about-list">
                  {processSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Card>
            </div>

            <div className="grid-2 about-section">
              <div className="stack">
                <p className="eyebrow">O que esperar</p>
                <h2>Soluções pensadas para evoluir com a marca</h2>
                <p>
                  Independentemente do tamanho do projeto, busco entregar
                  soluções que sejam:
                </p>
              </div>
              <Card as="div">
                <ul className="about-list">
                  {expectations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="about-copy">
              <p>
                Seja no desenvolvimento de um site profissional, de uma identidade
                visual de apoio ou de um produto digital, meu compromisso é criar
                experiências que fortaleçam a presença da marca e contribuam para
                seus resultados.
              </p>
              <p>
                Se você procura um profissional capaz de unir estratégia, design
                e desenvolvimento em um único processo, será um prazer conhecer o
                seu projeto.
              </p>
            </div>
          </div>
        </section>

            <CTA content={pageCtaContent.about} titleId="about-cta-title" />
      </Layout>
    </>
  );
}
