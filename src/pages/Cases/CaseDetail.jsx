import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import RichTextContent from "../../components/RichTextContent/RichTextContent.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import { useSupabaseItem } from "../../hooks/useSupabaseContent.js";
import { mapProject } from "../../lib/contentMappers.js";
import NotFound from "../NotFound/NotFound.jsx";

export default function CaseDetail() {
  const { slug } = useParams();
  const { item: project, isLoading } = useSupabaseItem({
    table: "projects",
    slug,
    mapper: mapProject,
  });

  if (!project && isLoading) return null;
  if (!project) return <NotFound />;

  return (
    <>
      <SEO
        title={project.seoTitle}
        description={project.seoDescription}
        path={project.path}
      />
      <Layout>
        <article className="case-detail" aria-labelledby="case-title">
          <header className="case-detail-hero">
            {project.image && (
              <img
                className="case-detail-hero-image"
                src={project.image}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
            )}
            <div className="case-detail-hero-overlay" />
            <div className="container case-detail-hero-content">
              <p className="eyebrow">Case</p>
              <h1 id="case-title">{project.title}</h1>
              <p className="lead">{project.description}</p>
              <div className="hero-cta">
                {project.externalUrl && (
                  <Button href={project.externalUrl} target="_blank" rel="noreferrer noopener">
                    Abrir projeto
                  </Button>
                )}
                <Button variant="secondary" as={Link} to="/cases">
                  Ver todos os cases
                </Button>
              </div>
            </div>
          </header>

          {project.galleryImages?.length > 0 && (
            <div className="case-gallery-strip" aria-label="Galeria do projeto">
              {project.galleryImages.map((image, index) => (
                <figure className="case-gallery-strip-item" key={image}>
                  <img
                    src={image}
                    alt={`${project.alt || project.title} - imagem ${index + 2}`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          )}

          <section className="section" aria-label="Descrição do projeto">
            <div className="container">
              <div className="stack" style={{ gap: "var(--space-4)", maxWidth: 820 }}>
                <span className="meta">Descrição completa</span>
                <RichTextContent>{project.fullDescription}</RichTextContent>
              </div>
            </div>
          </section>
        </article>
      </Layout>
    </>
  );
}
