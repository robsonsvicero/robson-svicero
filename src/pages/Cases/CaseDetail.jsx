import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import { getCaseBySlug } from "../../data/cases.js";
import { useSupabaseItem } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";
import NotFound from "../NotFound/NotFound.jsx";

export default function CaseDetail() {
  const { slug } = useParams();
  const { item: project, isLoading } = useSupabaseItem({
    table: "projects",
    slug,
    fallback: getCaseBySlug(slug),
    mapper: mapProject,
  });

  if (!project && isLoading) return null;
  if (!project) return <NotFound />;

  return (
    <>
      <SEO
        title={project.seoTitle}
        description={project.seoDescription}
        path={project.path}
      />
      <Layout>
        <section className="section" aria-labelledby="case-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack" style={{ gap: "var(--space-5)", maxWidth: 820 }}>
              <p className="eyebrow">Case</p>
              <h1 id="case-title">{project.title}</h1>
              <p className="lead">{project.description}</p>
              <div className="hero-cta">
                <Button href={project.externalUrl} target="_blank" rel="noreferrer noopener">
                  Abrir projeto
                </Button>
                <Button variant="secondary" as={Link} to="/cases">
                  Ver todos os cases
                </Button>
              </div>
            </div>

            <div className="case-visual" style={{ height: 360 }}>
              <img
                src={project.image}
                alt={project.alt}
                loading="eager"
                decoding="async"
                width="1200"
                height="630"
              />
            </div>

            <div className="stack" style={{ gap: "var(--space-4)", maxWidth: 820 }}>
              <span className="meta">Descrição completa</span>
              <p className="lead">{project.fullDescription}</p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
