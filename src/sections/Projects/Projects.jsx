import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { projectsContent } from "../../content/siteContent.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { getProjectBadges, mapProject } from "../../lib/contentMappers.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";

function ProjectScrollCard({ project }) {
  const badges = getProjectBadges(project);
  return (
    <Card as={Link} to={project.path} aria-label={`Ver case: ${project.title}`} title={`Ver case: ${project.title}`} className="case-card clickable-card" itemScope itemType="https://schema.org/CreativeWork" itemProp="url">
      <div className="case-card-image">
        {project.thumbnail && <img src={project.thumbnail} alt={project.alt || `Projeto ${project.title}`} loading="lazy" />}
      </div>
      <div className="case-card-body">
        {badges.length > 0 && <div className="case-card-badges">{badges.map((badge) => <span className="case-card-badge" key={badge}>{badge}</span>)}</div>}
        <div className="case-card-content">
          <h3 itemProp="name">{project.title}</h3>
          <p itemProp="description">{project.metaDescription}</p>
        </div>
      </div>
      <div className="case-card-footer"><span>{project.niche || project.clientName || "Projeto digital"}</span><strong>Ver case <i><ArrowUpRight size={18} /></i></strong></div>
    </Card>
  );
}

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const { items: projects } = useSupabaseList({
    table: "projects",
    fallback: contentSnapshots.projects.slice(0, 3),
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,badge,niche,client_name,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url",
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
      className="surface-band projects-section"
      id="projetos"
      data-od-id="projetos"
      aria-labelledby="sec-projetos"
      containerClassName="container stack projects-container"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div className="row-between" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
        <SectionHeader
          label={projectsContent.eyebrow || "Cases & Projetos"}
          title={projectsContent.title}
          subtitle={projectsContent.lead}
          id="sec-projetos"
          align="left"
          style={{ marginBottom: 0 }}
        />
        <Button
          variant="secondary"
          as={Link}
          to={projectsContent.cta.href}
          title="Ver todos os cases"
        >
          {projectsContent.cta.label}
        </Button>
      </div>

      <div className="projects-scroll-stage">
        <div className="grid-3 projects-grid">
          {projects.map((project, index) => (
            <motion.div
              className="projects-card-motion"
              key={project.title}
              initial={reducedMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, delay: reducedMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectScrollCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
