import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";

export default function ServiceDetail({ service }) {
  return (
    <>
      <SEO
        title={service.seoTitle}
        description={service.seoDescription}
        path={service.path}
      />
      <Layout>
        <section className="section" aria-labelledby="service-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack" style={{ gap: "var(--space-5)", maxWidth: 780 }}>
              <p className="eyebrow">{service.eyebrow}</p>
              <h1 id="service-title">{service.title}</h1>
              <p className="lead">{service.intro}</p>
              <div className="hero-cta">
                <Button href="/#contato">Solicitar orçamento</Button>
                <Button variant="secondary" as={Link} to="/servicos">
                  Ver todos os serviços
                </Button>
              </div>
            </div>

            <div className="grid-2">
              <Card>
                <span className="meta">Entregáveis</span>
                <ul>
                  {service.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
              <Card>
                <span className="meta">Processo</span>
                <ol>
                  {service.process.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
