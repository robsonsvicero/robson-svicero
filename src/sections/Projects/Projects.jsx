import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { projectsContent } from "../../content/siteContent.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";

function ProjectCardSkeleton() {
  return (
    <Card className="case-card card-skeleton" aria-hidden="true">
      <div className="case-visual skeleton-block" />
      <span className="skeleton-line skeleton-line-title" />
      <span className="skeleton-line" />
      <span className="skeleton-line skeleton-line-medium" />
      <span className="skeleton-line skeleton-line-button" />
    </Card>
  );
}

export default function Projects() {
  const { items: projects, isLoading } = useSupabaseList({
    table: "projects",
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url",
    limit: 3,
  });
  const shouldShowSkeletons = isLoading && projects.length === 0;

  return (
    <Section
      className="dark-band"
      id="projetos"
      data-od-id="projetos"
      aria-labelledby="sec-projetos"
      containerClassName="container stack"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div className="row-between">
        <div style={{ maxWidth: 700 }}>
          <p className="eyebrow">{projectsContent.eyebrow}</p>
          <h2 id="sec-projetos">{projectsContent.title}</h2>
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
        {shouldShowSkeletons &&
          Array.from({ length: 3 }, (_, index) => <ProjectCardSkeleton key={index} />)}
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
