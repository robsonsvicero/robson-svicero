import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";
import CTA from "../../components/CTA/CTA.jsx";
import { pageCtaContent } from "../../content/siteContent.js";

function CaseCardSkeleton() {
  return (
    <Card className="case-card card-skeleton" aria-hidden="true">
      <figure className="case-card-media skeleton-block" />
      <span className="skeleton-line skeleton-line-title" />
      <span className="skeleton-line" />
      <span className="skeleton-line skeleton-line-medium" />
      <span className="skeleton-line skeleton-line-button" />
    </Card>
  );
}

export default function Cases() {
  const { items: projects, isLoading } = useSupabaseList({
    table: "projects",
    mapper: mapProject,
    orderBy: "published_at",
    select: "slug,title,published_at,description,meta_description,seo_title,seo_description,image,thumbnail,alt,external_url",
    limit: 12,
  });
  const shouldShowSkeletons = isLoading && projects.length === 0;

  return (
    <>
      <SEO
        title="Cases | Criação de sites"
        description="Projetos e cases de criação de sites profissionais com foco em clareza, performance, conversão e uso complementar de IA no processo."
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
              {shouldShowSkeletons &&
                Array.from({ length: 4 }, (_, index) => <CaseCardSkeleton key={index} />)}
              {projects.map((project) => (
                <Card className="case-card" key={project.slug}>
                  {project.thumbnail && (
                    <figure className="case-card-media">
                      <img
                        src={project.thumbnail}
                        alt={project.alt || project.title}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="500"
                      />
                    </figure>
                  )}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Button className="btn-arrow" variant="ghost" as={Link} to={project.path}>
                    Ver case
                  </Button>
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
