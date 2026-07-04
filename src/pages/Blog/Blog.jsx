import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
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

function BlogCardSkeleton() {
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

export default function Blog() {
  const { items: blogPosts, isLoading } = useSupabaseList({
    table: "blog_posts",
    mapper: mapBlogPost,
    orderBy: "published_at",
    ascending: true,
    select: "slug,title,excerpt,seo_title,seo_description,image,thumbnail,author,category,published_at,views_count,reading_time,intro",
    limit: 12,
  });
  const shouldShowSkeletons = isLoading && blogPosts.length === 0;

  return (
    <>
      <SEO
        title="Blog sobre UX, React, SEO e Landing Pages"
        description="Artigos sobre UX Design, React.js, SEO técnico, landing pages, interfaces digitais e estratégia para presença digital."
        path="/blog"
      />
      <Layout>
        <section className="section blog-page" aria-labelledby="blog-title">
          <div className="container stack blog-page-stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack blog-page-header" style={{ gap: "var(--space-5)" }}>
              <p className="eyebrow">Conteúdo</p>
              <h1 id="blog-title">Observatório Digital</h1>
              <p className="lead">Onde estratégia, experiência e tecnologia se encontram.</p>
              <p className="lead page-description">
                Artigos, análises e reflexões sobre websites, branding, experiência digital e estratégias para empresas que desejam fortalecer sua presença online.
              </p>
            </div>

            <div className="blog-grid">
              {shouldShowSkeletons &&
                Array.from({ length: 4 }, (_, index) => <BlogCardSkeleton key={index} />)}
              {blogPosts.map((post) => (
                <Card className="feature blog-card" key={post.slug}>
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
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <p className="meta">
                    {formatPostDate(post.publishedAt)} - {post.readingTime} - {formatViewsCount(post.viewsCount)} visualizações
                  </p>
                  <Button className="btn-arrow" variant="ghost" as={Link} to={post.path}>
                    Ler artigo
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
