import { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogArticleCard from "../../components/BlogArticleCard/BlogArticleCard.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";

export default function LatestArticles({
  excludeSlug,
  limit = 3,
  className = "",
  showCta = true,
}) {
  const queryLimit = excludeSlug ? limit + 1 : limit;
  const { items: blogPosts } = useSupabaseList({
    table: "blog_posts",
    fallback: contentSnapshots.blogPosts,
    mapper: mapBlogPost,
    orderBy: "published_at",
    ascending: false,
    select: "slug,title,excerpt,seo_title,seo_description,image,thumbnail,author,category,published_at,views_count,reading_time,intro",
    publishedOnly: true,
    limit: queryLimit,
  });

  const latestPosts = blogPosts
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);

  if (latestPosts.length === 0) return null;

  useEffect(() => {
    if (latestPosts.length === 0) return;

    const candidateImages = latestPosts.map((post) => post.thumbnail || post.image).filter(Boolean);
    prefetchImages(candidateImages, { limit });
  }, [latestPosts, limit]);

  return (
    <Section
      className={`surface-band latest-articles ${className}`.trim()}
      aria-labelledby="sec-ultimos-artigos"
      containerClassName="container stack"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div className="row-between">
        <div style={{ maxWidth: 700 }}>
          <p className="eyebrow">Observatório Digital</p>
          <h2 id="sec-ultimos-artigos">Conteúdos para quem quer um site que gera resultados.</h2>
          <p className="lead">
            Artigos sobre criação de sites, SEO, UX, posicionamento digital e estratégias para transformar visitas em clientes.
          </p>
        </div>
        {showCta && (
          <Button variant="secondary" as={Link} to="/blog" title="Ver todos os artigos">
            Ver todos
          </Button>
        )}
      </div>

      <div className="grid-3 latest-articles-grid">
        {latestPosts.map((post) => (
          <BlogArticleCard
            className="latest-article-card"
            key={post.slug}
            post={post}
            titleAs="h3"
          />
        ))}
      </div>
    </Section>
  );
}
