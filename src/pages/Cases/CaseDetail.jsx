import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Layout from "../../components/layout/Layout/Layout.jsx";
import RichTextContent from "../../components/RichTextContent/RichTextContent.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import CTA from "../../components/CTA/CTA.jsx";
import { pageCtaContent } from "../../content/siteContent.js";
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
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const galleryImages = project?.galleryImages || [];
  const activeImage = activeImageIndex === null ? null : galleryImages[activeImageIndex];

  useEffect(() => {
    if (activeImageIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImageIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveImageIndex((currentIndex) => (currentIndex - 1 + galleryImages.length) % galleryImages.length);
      }
      if (event.key === "ArrowRight") {
        setActiveImageIndex((currentIndex) => (currentIndex + 1) % galleryImages.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImageIndex, galleryImages.length]);

  const openImage = (index) => setActiveImageIndex(index);
  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + galleryImages.length) % galleryImages.length);
  };
  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % galleryImages.length);
  };

  if (!project && isLoading) return null;
  if (!project) return <NotFound />;

  const narrativeSections = [
    { key: "context", eyebrow: "Contexto", title: "O ponto de partida", value: project.context },
    { key: "challenge", eyebrow: "Desafio", title: "O que precisava ser resolvido", value: project.challenge },
    { key: "solution", eyebrow: "Solução", title: "Como o projeto foi conduzido", value: project.solution },
    { key: "results", eyebrow: "Resultado", title: "O que o projeto passou a comunicar", value: project.results },
  ].filter((section) => section.value);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seoDescription || project.description,
    image: project.image,
    url: project.path,
    dateCreated: project.publishedAt,
    creator: {
      "@type": "Person",
      name: "Robson Svicero",
    },
    ...(project.clientName ? { about: project.clientName } : {}),
  };

  return (
    <>
      <SEO
        title={project.seoTitle}
        description={project.seoDescription}
        path={project.path}
        image={project.image}
        type="article"
        structuredData={structuredData}
      />
      <Layout>
        <article className="case-detail" aria-labelledby="case-title">
          <header className="case-detail-hero">
            <div className="container case-detail-hero-layout">
              <div className="case-detail-hero-content">
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

              {project.image && (
                <figure className="case-detail-hero-media">
                  <img
                    className="case-detail-hero-image"
                    src={project.image}
                    alt={project.alt || `Imagem principal do projeto ${project.title}`}
                    title={project.alt || `Imagem principal do projeto ${project.title}`}
                    loading="eager"
                    decoding="async"
                  />
                </figure>
              )}
            </div>
          </header>

          {(project.clientName || project.projectYear || project.segment || project.createdSystem || project.externalUrl) && (
            <section className="case-detail-facts" aria-label="Ficha técnica do projeto">
              <div className="container case-detail-facts-grid">
                {[
                  ["Cliente", project.clientName, null],
                  ["Ano", project.projectYear, null],
                  ["Segmento", project.segment, null],
                  ["Site / sistema criado", project.createdSystem, project.externalUrl],
                ].filter(([, value]) => value).map(([label, value, href]) => (
                  <div className="case-detail-fact" key={label}>
                    <span className="meta">{label}</span>
                    {href ? (
                      <a className="case-detail-fact-link" href={href} target="_blank" rel="noreferrer noopener">
                        {value}
                      </a>
                    ) : (
                      <strong>{value}</strong>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {narrativeSections.map((section) => (
            <section className="section case-detail-story-section" key={section.key} aria-labelledby={`case-${section.key}-title`}>
              <div className="container case-detail-narrative">
                <div className="case-detail-narrative-heading">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2 id={`case-${section.key}-title`}>{section.title}</h2>
                </div>
                <div className="case-detail-narrative-copy">
                  <RichTextContent>{section.value}</RichTextContent>
                </div>
              </div>
            </section>
          ))}

          {project.galleryImages?.length > 0 && (
            <div className="case-gallery-strip" aria-label="Galeria do projeto">
              {project.galleryImages.map((image, index) => (
                <button
                  className="case-gallery-strip-item case-image-button"
                  type="button"
                  key={image}
                  onClick={() => openImage(index)}
                  aria-label={`Ampliar imagem ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${project.alt || project.title} - imagem ${index + 1}`}
                    title={`${project.alt || project.title} - imagem ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}

          <CTA content={pageCtaContent.caseDetail} titleId="case-detail-cta-title" />
        </article>
      </Layout>
      {activeImage && (
        <div
          className="case-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização da imagem ${activeImageIndex + 1} de ${galleryImages.length}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveImageIndex(null);
          }}
        >
          <button className="case-lightbox-close" type="button" onClick={() => setActiveImageIndex(null)} aria-label="Fechar visualização">
            <X size={24} aria-hidden="true" />
          </button>
          <button className="case-lightbox-control case-lightbox-previous" type="button" onClick={showPreviousImage} aria-label="Imagem anterior">
            <ChevronLeft size={32} aria-hidden="true" />
          </button>
          <img
            className="case-lightbox-image"
            src={activeImage}
            alt={`${project.alt || project.title} - imagem ${activeImageIndex + 1}`}
          />
          <button className="case-lightbox-control case-lightbox-next" type="button" onClick={showNextImage} aria-label="Próxima imagem">
            <ChevronRight size={32} aria-hidden="true" />
          </button>
          <p className="case-lightbox-counter" aria-live="polite">
            {activeImageIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </>
  );
}
