import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { getProjectBadges, mapProject } from "../../lib/contentMappers.js";
import CTA from "../../components/CTA/CTA.jsx";
import { pageCtaContent } from "../../content/siteContent.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { stripHtml } from "../../utils/richText.js";

export default function Cases() {
  const reducedMotion = useReducedMotion();
  const { items: projects } = useSupabaseList({
    table: "projects",
    fallback: contentSnapshots.projects,
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,badge,niche,client_name,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url",
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
        <section className="section cases-page" aria-labelledby="cases-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack cases-page-header">
              <p className="eyebrow">Projetos</p>
              <h1 id="cases-title">Projetos de design e desenvolvimento de sites</h1>
              <p className="lead">
                Projetos que mostram estratégia, UX/UI Design e implementação front-end
                trabalhando juntos para tornar sites mais claros, confiáveis e preparados para conversão.
              </p>
            </div>

            <div className="grid-3 cases-grid">
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={reducedMotion ? false : { opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.7, delay: reducedMotion ? 0 : (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CaseCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <CTA content={pageCtaContent.cases} titleId="cases-cta-title" />
      </Layout>
    </>
  );
}

function CaseCard({ project }) {
  const badges = getProjectBadges(project);
  return (
    <Card
                  as={Link}
                  to={project.path}
                  aria-label={`Ver case: ${project.title}`}
                  className="case-card clickable-card"
                >
                  <div className="case-card-image">
                    {project.thumbnail && <img src={project.thumbnail} alt={project.alt || `Projeto ${project.title}`} loading="lazy" />}
                  </div>
                  <div className="case-card-body">
                    {badges.length > 0 && <div className="case-card-badges">{badges.map((badge) => <span className="case-card-badge" key={badge}>{badge}</span>)}</div>}
                    <div className="case-card-content"><h3>{project.title}</h3><p>{stripHtml(project.metaDescription || project.description)}</p></div>
                  </div>
                  <div className="case-card-footer"><span>{project.niche || project.clientName || "Projeto digital"}</span><strong>Ver case <i><ArrowRight size={18} /></i></strong></div>
    </Card>
  );
}
