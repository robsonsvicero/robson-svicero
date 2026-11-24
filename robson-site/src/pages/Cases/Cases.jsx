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
import { stripRichText } from "../../utils/richText.js";

export default function Cases() {
  const { items: projects } = useSupabaseList({
    table: "projects",
    fallback: contentSnapshots.projects,
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,badge,niche,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url,segment",
    limit: 12,
    cache: false,
  });

  useEffect(() => {
    if (projects.length === 0) return;

    const candidateImages = projects
      .slice(0, 8)
      .map((project) => project.thumbnail)
      .filter(Boolean);

    prefetchImages(candidateImages, { limit: 8 });
  }, [projects]);

  return (
    <>
      <SEO
        title="Projetos de Criação de Sites em São Paulo"
        description="Projetos de criação de sites em São Paulo com foco em clareza, performance, conversão e uso complementar de IA no processo."
        path="/cases"
      />
      <Layout>
        <section className="section" aria-labelledby="cases-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack" style={{ gap: "var(--space-5)", maxWidth: 780 }}>
              <p className="eyebrow">Projetos</p>
              <h1 id="cases-title">Projetos de design e desenvolvimento de sites</h1>
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
                >
                  {project.thumbnail && (
                    <div className="case-card-image">
                      <img src={project.thumbnail} alt={project.alt || project.title} loading="lazy" />
                    </div>
                  )}
                  <div className="case-card-body">
                    {project.badge && (
                      <div className="case-card-badges">
                        {project.badge.split(",").map((b) => b.trim()).filter(Boolean).map((b) => (
                          <span className="case-card-badge" key={b}>{b}</span>
                        ))}
                      </div>
                    )}
                    <div className="case-card-content">
                      <h3>{project.title}</h3>
                      <p>{project.metaDescription || stripRichText(project.description)}</p>
                    </div>
                  </div>
                  <div className="case-card-footer">
                    <span className="case-card-niche">{project.niche || project.segment || ""}</span>
                    <span className="case-card-link">
                      Ver case
                      <span className="case-card-link-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </span>
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
