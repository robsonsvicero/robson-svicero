import BlogArticleCard from "../../components/BlogArticleCard/BlogArticleCard.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";

function BlogCardSkeleton() {
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

function BlogFeaturedCardSkeleton() {
  return (
    <Card className="blog-card blog-card-featured card-skeleton" aria-hidden="true">
      <div className="blog-card-image skeleton-block" />
      <div className="blog-card-body">
        <span className="skeleton-line skeleton-line-short" />
        <span className="skeleton-line skeleton-line-title" />
        <span className="skeleton-line" />
        <span className="skeleton-line skeleton-line-medium" />
        <span className="skeleton-line skeleton-line-button" />
      </div>
    </Card>
  );
}

export default function Blog() {
  const { items: blogPosts, isLoading } = useSupabaseList({
    table: "blog_posts",
    mapper: mapBlogPost,
    orderBy: "published_at",
    ascending: false,
    select: "slug,title,excerpt,seo_title,seo_description,image,thumbnail,author,category,published_at,views_count,reading_time,intro",
    limit: 12,
  });
  const shouldShowSkeletons = isLoading && blogPosts.length === 0;
  const [featuredPost, ...remainingPosts] = blogPosts;

  return (
    <>
      <SEO
        title="Blog sobre Criação de sites, UX, SEO e IA"
        description="Artigos sobre criação de sites, UX design, SEO técnico, interfaces digitais, estratégia para presença digital e uso de IA como apoio no processo."
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
                Artigos, análises e reflexões sobre websites, branding, experiência digital, IA aplicada ao processo e estratégias para empresas que desejam fortalecer sua presença online.
              </p>
            </div>

            {shouldShowSkeletons ? (
              <BlogFeaturedCardSkeleton />
            ) : featuredPost ? (
              <BlogArticleCard
                className="blog-featured-card"
                featured
                post={featuredPost}
                titleAs="h2"
              />
            ) : null}

            <div className="blog-grid">
              {shouldShowSkeletons &&
                Array.from({ length: 3 }, (_, index) => <BlogCardSkeleton key={index} />)}
              {remainingPosts.map((post) => (
                <BlogArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
