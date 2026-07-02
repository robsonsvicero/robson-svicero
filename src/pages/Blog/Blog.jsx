import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { posts } from "../../data/blog.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";

export default function Blog() {
  const { items: blogPosts } = useSupabaseList({
    table: "blog_posts",
    fallback: posts,
    mapper: mapBlogPost,
    orderBy: "published_at",
  });

  return (
    <>
      <SEO
        title="Blog sobre UX, React, SEO e Landing Pages"
        description="Artigos sobre UX Design, React.js, SEO técnico, landing pages, interfaces digitais e estratégia para presença digital."
        path="/blog"
      />
      <Layout>
        <section className="section" aria-labelledby="blog-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <div className="stack" style={{ gap: "var(--space-5)", maxWidth: 780 }}>
              <p className="eyebrow">Conteúdo</p>
              <h1 id="blog-title">Blog sobre UX, React, SEO e presença digital</h1>
              <p className="lead">
                Artigos para transformar conhecimento de design, desenvolvimento e estratégia
                digital em páginas mais claras, encontráveis e eficientes.
              </p>
            </div>

            <div className="grid-3">
              {blogPosts.map((post) => (
                <Card className="feature" key={post.slug}>
                  <p className="eyebrow">{post.category}</p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <p className="meta">
                    {post.publishedAt} - {post.readingTime}
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
