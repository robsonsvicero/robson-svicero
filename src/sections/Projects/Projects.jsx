import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { projectsContent } from "../../content/siteContent.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";
import { stripRichText } from "../../utils/richText.js";

export default function Projects() {
  const { items: projects } = useSupabaseList({
    table: "projects",
    fallback: contentSnapshots.projects.slice(0, 3),
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,badge,niche,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url,segment",
    limit: 3,
    cache: false,
  });

  useEffect(() => {
    if (projects.length === 0) return;

    const candidateImages = projects.map((project) => project.thumbnail).filter(Boolean);
    prefetchImages(candidateImages, { limit: 3 });
  }, [projects]);

  return (
    <Section
      className="surface-band"
      id="projetos"
      data-od-id="projetos"
      aria-labelledby="sec-projetos"
      containerClassName="container stack"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div className="row-between">
        <div className="projects-header stack" style={{ maxWidth: 700 }}>
          <p className="eyebrow">{projectsContent.eyebrow}</p>
          <h2 id="sec-projetos">{projectsContent.title}</h2>
          <p className="lead">{projectsContent.lead}</p>
        </div>
        <Button
          variant="secondary"
          as={Link}
            to={projectsContent.cta.href}
            title="Ver todos os cases"
        >
          {projectsContent.cta.label}
        </Button>
      </div>

      <div className="grid-3">
        {projects.map((project) => (
          <Card
            as={Link}
            to={project.path}
            aria-label={`Ver case: ${project.title}`}
            title={`Ver case: ${project.title}`}
            className="case-card clickable-card"
            key={project.title}
            itemScope
            itemType="https://schema.org/CreativeWork"
            itemProp="url"
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
                <h3 itemProp="name">{project.title}</h3>
                <p itemProp="description">{project.metaDescription || stripRichText(project.description)}</p>
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
    </Section>
  );
}
