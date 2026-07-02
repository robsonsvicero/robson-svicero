import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";

export default function PagePlaceholder({ eyebrow, title, description, seo }) {
  return (
    <>
      {seo && <SEO {...seo} />}
      <Layout>
        <section className="section" aria-labelledby="placeholder-title">
          <div className="container stack" style={{ gap: "var(--space-6)", maxWidth: 760 }}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="placeholder-title">{title}</h1>
            <p className="lead">{description}</p>
            <div className="hero-cta">
              <Button href="/">Voltar para home</Button>
              <Button variant="secondary" href="/#contato">
                Falar sobre um projeto
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
