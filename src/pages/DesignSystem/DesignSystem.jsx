import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";

const colorTokens = [
  { name: "Background", value: "var(--bg)" },
  { name: "Surface", value: "var(--surface)" },
  { name: "Text", value: "var(--fg)" },
  { name: "Muted", value: "var(--muted)" },
  { name: "Accent", value: "var(--accent)" },
  { name: "Success", value: "var(--success)" },
];

const componentCards = [
  {
    title: "Botoes",
    description: "Variações principais para chamadas de acao, links secundarios e acoes em fundos escuros.",
  },
  {
    title: "Cards",
    description: "Blocos com borda sutil, raio controlado e espacamento consistente para conteudo repetido.",
  },
  {
    title: "Layout",
    description: "Containers, grids e secoes com gutters responsivos definidos pelos tokens globais.",
  },
];

export default function DesignSystem() {
  return (
    <>
      <SEO
        title="Design System | Robson Svicero"
        description="Referencia dos padroes visuais, componentes, tipografia e tokens do site Robson Svicero."
        path="/design-system"
        robots="noindex, follow"
      />
      <Layout>
        <section className="section design-system-page" aria-labelledby="design-system-title">
          <div className="container stack">
            <div className="design-system-header">
              <p className="eyebrow">Design System</p>
              <h1 id="design-system-title">Padroes visuais e componentes do site.</h1>
              <p className="lead">
                Referencia viva para conferir tipografia, cores, botoes, cards e estruturas
                usadas na interface React.
              </p>
              <div className="hero-cta">
                <Button href="#tipografia">Tipografia</Button>
                <Button href="#componentes" variant="secondary">
                  Componentes
                </Button>
              </div>
            </div>

            <section className="design-system-section" id="tipografia" aria-labelledby="typography-title">
              <p className="eyebrow">Tipografia</p>
              <h2 id="typography-title">Escala de texto</h2>
              <div className="design-system-type">
                <h1>Headline principal</h1>
                <h2>Titulo de secao</h2>
                <h3>Titulo de card</h3>
                <p className="lead">Texto de apoio para introduzir secoes importantes.</p>
                <p>Texto padrao para conteudos, descricoes e explicacoes do site.</p>
                <p className="meta">Metadados, datas e marcadores auxiliares.</p>
              </div>
            </section>

            <section className="design-system-section" id="cores" aria-labelledby="colors-title">
              <p className="eyebrow">Cores</p>
              <h2 id="colors-title">Tokens principais</h2>
              <div className="design-system-swatches">
                {colorTokens.map((token) => (
                  <article className="card" key={token.name}>
                    <span className="design-system-swatch" style={{ background: token.value }} />
                    <h3>{token.name}</h3>
                    <p className="meta">{token.value}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="design-system-section" id="componentes" aria-labelledby="components-title">
              <p className="eyebrow">Componentes</p>
              <h2 id="components-title">Pecas de interface</h2>
              <div className="grid-3">
                {componentCards.map((card) => (
                  <article className="card" key={card.title}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
              <div className="design-system-actions">
                <Button href="/contato">Botao primario</Button>
                <Button href="/cases" variant="secondary">
                  Botao secundario
                </Button>
                <Button href="/sobre" variant="dark">
                  Botao escuro
                </Button>
              </div>
            </section>
          </div>
        </section>
      </Layout>
    </>
  );
}
