import { Link } from "react-router-dom";
import BlogArticleCard from "../../components/BlogArticleCard/BlogArticleCard.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";

function LatestArticleCardSkeleton() {
  return (
    <Card className="blog-card card-skeleton" aria-hidden="true">
      <div className="blog-card-image skeleton-block" />
      <div className="blog-card-body">
        <span className="skeleton-line skeleton-line-short" />
        <span className="skeleton-line skeleton-line-title" />
        <span className="skeleton-line skeleton-line-button" />
      </div>
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
    ascending: false,
    select: "slug,title,excerpt,seo_title,seo_description,image,thumbnail,author,category,published_at,views_count,reading_time,intro",
    publishedOnly: true,
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
