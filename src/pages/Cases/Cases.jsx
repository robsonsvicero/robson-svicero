import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";

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
    orderBy: "created_at",
    select: "slug,title,description,meta_description,seo_title,seo_description,image,alt,external_url",
    limit: 12,
  });
  const shouldShowSkeletons = isLoading && projects.length === 0;

  return (
    <>
      <SEO
        title="Cases de UX, UI e Desenvolvimento React"
        description="Projetos e cases de UX/UI Design, landing pages, sites institucionais e desenvolvimento front-end com foco em clareza, performance e conversão."
        path="/cases"
      />
      <Layout>
        <section className="section" aria-labelledby="cases-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack" style={{ gap: "var(--space-5)", maxWidth: 780 }}>
              <p className="eyebrow">Projetos</p>
              <h1 id="cases-title">Cases de design e desenvolvimento</h1>
              <p className="lead">
                Projetos que mostram estratégia, UX/UI Design e implementação front-end
                trabalhando juntos para tornar ofertas digitais mais claras e confiáveis.
              </p>
            </div>

            <div className="grid-2">
              {shouldShowSkeletons &&
                Array.from({ length: 4 }, (_, index) => <CaseCardSkeleton key={index} />)}
              {projects.map((project) => (
                <Card className="case-card" key={project.slug}>
                  {project.image && (
                    <figure className="case-card-media">
                      <img
                        src={project.image}
                        alt={project.alt || project.title}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="500"
                      />
                    </figure>
                  )}
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <Button className="btn-arrow" variant="ghost" as={Link} to={project.path}>
                    Ver case
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
