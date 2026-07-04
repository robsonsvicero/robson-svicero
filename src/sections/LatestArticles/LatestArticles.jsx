import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";

function formatPostDate(date) {
  if (!date) return "";

  const [year, month, day] = date.split("T")[0].split("-");
  if (!year || !month || !day) return date;

  return `${day}/${month}/${year}`;
}

function formatViewsCount(viewsCount) {
  const safeViews = Number.isFinite(Number(viewsCount)) ? Number(viewsCount) : 0;
  return new Intl.NumberFormat("pt-BR").format(safeViews);
}

function LatestArticleCardSkeleton() {
  return (
    <Card className="feature blog-card card-skeleton" aria-hidden="true">
      <div className="blog-card-image skeleton-block" />
      <span className="skeleton-line skeleton-line-short" />
      <span className="skeleton-line skeleton-line-title" />
      <span className="skeleton-line" />
      <span className="skeleton-line skeleton-line-medium" />
      <span className="skeleton-line skeleton-line-button" />
    </Card>
  );
}

export default function LatestArticles({
  excludeSlug,
  limit = 3,
  className = "",
  showCta = true,
}) {
  const queryLimit = excludeSlug ? limit + 1 : limit;
  const { items: blogPosts, isLoading } = useSupabaseList({
    table: "blog_posts",
    mapper: mapBlogPost,
    orderBy: "published_at",
    ascending: true,
    select: "slug,title,excerpt,seo_title,seo_description,image,thumbnail,author,category,published_at,views_count,reading_time,intro",
    limit: queryLimit,
  });

  const latestPosts = blogPosts
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);

  if (!isLoading && latestPosts.length === 0) return null;

  const shouldShowSkeletons = isLoading && latestPosts.length === 0;

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
          <h2 id="sec-ultimos-artigos">Últimos artigos</h2>
        </div>
        {showCta && (
          <Button variant="secondary" as={Link} to="/blog">
            Ver todos
          </Button>
        )}
      </div>

      <div className="grid-3 latest-articles-grid">
        {shouldShowSkeletons &&
          Array.from({ length: limit }, (_, index) => <LatestArticleCardSkeleton key={index} />)}
        {latestPosts.map((post) => (
          <Card className="feature blog-card latest-article-card" key={post.slug}>
            {post.thumbnail && (
              <img
                className="blog-card-image"
                src={post.thumbnail}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                width="800"
                height="500"
              />
            )}
            <p className="eyebrow">{post.category}</p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <p className="meta blog-card-meta">
              <span>{formatPostDate(post.publishedAt)}</span>
              <span>{post.readingTime}</span>
              <span className="blog-meta-item">
                <Eye aria-hidden="true" />
                <span className="visually-hidden">Visualizacoes:</span>
                {formatViewsCount(post.viewsCount)}
              </span>
            </p>
            <Button className="btn-arrow" variant="ghost" as={Link} to={post.path}>
              Ler artigo
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}
