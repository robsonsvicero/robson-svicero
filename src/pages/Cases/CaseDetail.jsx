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
  const galleryImages = project ? [project.image, ...(project.galleryImages || [])].filter(Boolean) : [];
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
                <button
                  className="case-detail-hero-media case-image-button"
                  type="button"
                  onClick={() => openImage(0)}
                  aria-label="Ampliar imagem principal"
                >
                  <img
                    className="case-detail-hero-image"
                    src={project.image}
                    alt={project.alt || `Imagem principal do projeto ${project.title}`}
                    title={project.alt || `Imagem principal do projeto ${project.title}`}
                    loading="eager"
                    decoding="async"
                  />
                </button>
              )}
            </div>
          </header>

          <section className="section" aria-label="Descrição do projeto">
            <div className="container">
              <div className="stack" style={{ gap: "var(--space-4)", maxWidth: 820 }}>
                <span className="meta">Descrição completa</span>
                <RichTextContent>{project.fullDescription}</RichTextContent>
              </div>
            </div>
          </section>

          {project.galleryImages?.length > 0 && (
            <div className="case-gallery-strip" aria-label="Galeria do projeto">
              {project.galleryImages.map((image, index) => (
                <button
                  className="case-gallery-strip-item case-image-button"
                  type="button"
                  key={image}
                  onClick={() => openImage(index + 1)}
                  aria-label={`Ampliar imagem ${index + 2}`}
                >
                  <img
                    src={image}
                    alt={`${project.alt || project.title} - imagem ${index + 2}`}
                    title={`${project.alt || project.title} - imagem ${index + 2}`}
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
