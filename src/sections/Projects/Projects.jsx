import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { projectsContent } from "../../content/siteContent.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";

export default function Projects() {
  const { items: projects } = useSupabaseList({
    table: "projects",
    mapper: mapProject,
    orderBy: "created_at",
  });

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
        >
          {projectsContent.cta.label}
        </Button>
      </div>

      <div className="grid-3">
        {projects.map((project) => (
          <Card
            className="case-card"
            key={project.title}
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <div className="case-visual">
              <img
                src={project.image}
                alt={project.alt}
                loading="lazy"
                decoding="async"
                width="800"
                height="264"
              />
            </div>
            <h3 itemProp="name">{project.title}</h3>
            <p itemProp="description">{project.metaDescription}</p>
            <Button
              className="btn-arrow"
              variant="ghost"
              as={Link}
              to={project.path}
              itemProp="url"
            >
              Ver case
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}
