import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogArticleCard from "../../components/BlogArticleCard/BlogArticleCard.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";

export default function Blog() {
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const { items: blogPosts } = useSupabaseList({
    table: "blog_posts",
    fallback: contentSnapshots.blogPosts,
    mapper: mapBlogPost,
    orderBy: "published_at",
    ascending: false,
    select: "slug,title,excerpt,seo_title,seo_description,image,thumbnail,author,category,published_at,views_count,reading_time,intro",
    publishedOnly: true,
  });
  const categories = [...new Set(
    blogPosts.flatMap((post) => String(post.category || "")
      .split(",")
      .map((category) => category.trim())
      .filter(Boolean)),
  )].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const filteredPosts = selectedCategory === "Todas"
    ? blogPosts
    : blogPosts.filter((post) => String(post.category || "")
      .split(",")
      .some((category) => category.trim() === selectedCategory));
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = filteredPosts.length > visibleCount;
  const mostReadPosts = [...blogPosts]
    .sort((a, b) => Number(b.viewsCount || 0) - Number(a.viewsCount || 0))
    .slice(0, 5);
  const [featuredPost, ...remainingPosts] = visiblePosts;

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
          <div className="container stack blog-page-stack">
            <div className="stack blog-page-header">
              <p className="eyebrow">Conteúdo</p>
              <h1 id="blog-title">Observatório Digital</h1>
              <p className="lead">Onde estratégia, experiência e tecnologia se encontram.</p>
              <p className="lead page-description">
                Artigos, análises e reflexões sobre websites, branding, experiência digital, IA aplicada ao processo e estratégias para empresas que desejam fortalecer sua presença online em São Paulo e no Brasil.
              </p>
            </div>

            <div className="blog-content-layout">
              <div className="blog-main">
                {featuredPost ? (
                  <BlogArticleCard
                    className="blog-featured-card"
                    featured
                    post={featuredPost}
                    titleAs="h2"
                  />
                ) : (
                  <p className="blog-empty-state">Nenhum artigo encontrado nesta categoria.</p>
                )}

                <div className="blog-grid">
                  {remainingPosts.map((post) => (
                    <BlogArticleCard key={post.slug} post={post} />
                  ))}
                </div>
                {hasMorePosts && (
                  <div className="blog-load-more-wrap">
                    <button
                      className="button button--secondary btn-secondary blog-load-more"
                      type="button"
                      onClick={() => setVisibleCount((count) => count + 3)}
                    >
                      Carregar mais
                    </button>
                  </div>
                )}
              </div>

              <aside className="blog-sidebar" aria-label="Explore os artigos">
                <section className="blog-sidebar-section" aria-labelledby="blog-categories-title">
                  <h2 id="blog-categories-title">Categorias</h2>
                  <ul className="blog-category-list">
                    {["Todas", ...categories].map((category) => (
                      <li key={category}>
                        <button
                          className="blog-category-button"
                          type="button"
                          aria-pressed={selectedCategory === category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setVisibleCount(11);
                          }}
                        >
                          {category === "Todas" ? "Todas as categorias" : category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="blog-sidebar-section" aria-labelledby="most-read-title">
                  <h2 id="most-read-title">Mais lidos</h2>
                  {mostReadPosts.length > 0 ? (
                    <ol className="blog-most-read-list">
                      {mostReadPosts.map((post) => (
                        <li key={post.slug}>
                          <Link to={post.path}>{post.title}</Link>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="blog-sidebar-empty">Os artigos mais lidos aparecerão aqui.</p>
                  )}
                </section>
              </aside>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
