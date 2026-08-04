import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";
import CTA from "../../components/CTA/CTA.jsx";
import { pageCtaContent } from "../../content/siteContent.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";

export default function Cases() {
  const { items: projects } = useSupabaseList({
    table: "projects",
    fallback: contentSnapshots.projects,
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,badge,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url",
    limit: 12,
  });

  useEffect(() => {
    if (projects.length === 0) return;

    const candidateImages = projects
      .slice(0, 8)
      .map((project) => project.thumbnail || project.image)
      .filter(Boolean);

    prefetchImages(candidateImages, { limit: 8 });
  }, [projects]);

  return (
    <>
      <SEO
        title="Cases de Criação de Sites em São Paulo"
        description="Projetos e cases de criação de sites em São Paulo com foco em clareza, performance, conversão e uso complementar de IA no processo."
        path="/cases"
      />
      <Layout>
        <section className="section" aria-labelledby="cases-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack" style={{ gap: "var(--space-5)", maxWidth: 780 }}>
              <p className="eyebrow">Projetos</p>
              <h1 id="cases-title">Cases de design e desenvolvimento de sites</h1>
              <p className="lead">
                Projetos que mostram estratégia, UX/UI Design e implementação front-end
                trabalhando juntos para tornar sites mais claros, confiáveis e preparados para conversão.
              </p>
            </div>

            <div className="grid-3">
              {projects.map((project) => (
                <Card
                  as={Link}
                  to={project.path}
                  aria-label={`Ver case: ${project.title}`}
                  className="case-card clickable-card"
                  key={project.slug}
                  style={{
                    backgroundImage: `url('${project.thumbnail}')`,
                  }}
                >
                  {project.badge && (
                    <span className="case-card-badge">{project.badge}</span>
                  )}
                  <div className="case-card-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <CTA content={pageCtaContent.cases} titleId="cases-cta-title" />
      </Layout>
    </>
  );
}
