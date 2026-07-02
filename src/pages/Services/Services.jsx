import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { services } from "../../data/services.js";
import { siteCreationPages } from "../../data/siteCreationPages.js";

export default function Services() {
  return (
    <>
      <SEO
        title="Serviços de UX, UI e Desenvolvimento React"
        description="Serviços de UX/UI Design, desenvolvimento front-end React, landing pages e sites institucionais com foco em performance, SEO e conversão."
        path="/servicos"
      />
      <Layout>
        <section className="section" aria-labelledby="services-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack" style={{ gap: "var(--space-5)", maxWidth: 760 }}>
              <p className="eyebrow">Serviços</p>
              <h1 id="services-title">Serviços para fortalecer sua presença digital</h1>
              <p className="lead">
                Estratégia, design e desenvolvimento trabalhando juntos para criar interfaces
                mais claras, profissionais e preparadas para conversão.
              </p>
            </div>

            <div className="grid-2">
              {services.map((service) => (
                <Card className="feature" key={service.slug}>
                  <p className="eyebrow">{service.eyebrow}</p>
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                  <Button className="btn-arrow" variant="ghost" as={Link} to={service.path}>
                    Conhecer serviço
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
