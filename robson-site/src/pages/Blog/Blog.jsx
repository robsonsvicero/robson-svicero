import { useEffect } from "react";
import BlogArticleCard from "../../components/BlogArticleCard/BlogArticleCard.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";

export default function Blog() {
  const { items: blogPosts } = useSupabaseList({
    table: "blog_posts",
    fallback: contentSnapshots.blogPosts.slice(0, 12),
    mapper: mapBlogPost,
    orderBy: "published_at",
    ascending: false,
    select: "slug,title,excerpt,seo_title,seo_description,image,thumbnail,author,category,published_at,views_count,reading_time,intro",
    publishedOnly: true,
    limit: 12,
  });
  const [featuredPost, ...remainingPosts] = blogPosts;

  useEffect(() => {
    if (blogPosts.length === 0) return;

    const candidateImages = [featuredPost?.image || featuredPost?.thumbnail]
      .concat(remainingPosts.slice(0, 5).map((post) => post.thumbnail || post.image))
      .filter(Boolean);

    prefetchImages(candidateImages, { limit: 6 });
  }, [blogPosts, featuredPost, remainingPosts]);

  return (
    <>
      <SEO
        title="Blog sobre Criação de Sites em São Paulo, UX, SEO e IA"
        description="Artigos sobre criação de sites em São Paulo, UX design, SEO técnico, interfaces digitais, estratégia para presença digital e uso de IA como apoio no processo."
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
                Artigos, análises e reflexões sobre websites, branding, experiência digital, IA aplicada ao processo e estratégias para empresas que desejam fortalecer sua presença online em São Paulo e no Brasil.
              </p>
            </div>

            {featuredPost ? (
              <BlogArticleCard
                className="blog-featured-card"
                featured
                post={featuredPost}
                titleAs="h2"
              />
            ) : null}

            <div className="blog-grid">
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
