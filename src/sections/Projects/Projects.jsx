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

export default function Projects() {
  const { items: projects } = useSupabaseList({
    table: "projects",
    fallback: contentSnapshots.projects.slice(0, 3),
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url",
    limit: 3,
  });

  useEffect(() => {
    if (projects.length === 0) return;

    const candidateImages = projects.map((project) => project.thumbnail || project.image).filter(Boolean);
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
            <div className="case-visual">
              <img
                src={project.thumbnail}
                alt={project.alt || `Prévia do projeto ${project.title}`}
                title={project.alt || `Prévia do projeto ${project.title}`}
                loading="lazy"
                decoding="async"
                width="800"
                height="264"
              />
            </div>
            <h3 itemProp="name">{project.title}</h3>
            <p itemProp="description">{project.metaDescription}</p>
            <span className="btn btn-ghost btn-arrow">
              Ver case
            </span>
          </Card>
        ))}
      </div>
    </Section>
  );
}
