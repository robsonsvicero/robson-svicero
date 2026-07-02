import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import { getPostBySlug } from "../../data/blog.js";
import { useSupabaseItem } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";
import NotFound from "../NotFound/NotFound.jsx";

export default function BlogPost() {
  const { slug } = useParams();
  const { item: post, isLoading } = useSupabaseItem({
    table: "blog_posts",
    slug,
    fallback: getPostBySlug(slug),
    mapper: mapBlogPost,
  });

  if (!post && isLoading) return null;
  if (!post) return <NotFound />;

  return (
    <>
      <SEO title={post.seoTitle} description={post.seoDescription} path={post.path} />
      <Layout>
        <article className="section" aria-labelledby="post-title">
          <div className="container stack" style={{ gap: "var(--space-12)" }}>
            <header className="stack" style={{ gap: "var(--space-5)", maxWidth: 820 }}>
              <p className="eyebrow">{post.category}</p>
              <h1 id="post-title">{post.title}</h1>
              <p className="lead">{post.intro}</p>
              <p className="meta">
                Publicado em {post.publishedAt} - leitura de {post.readingTime}
              </p>
            </header>

            <div className="grid-1-2">
              <aside>
                <Card>
                  <span className="meta">Conteúdo</span>
                  <h2>Resumo</h2>
                  <p>{post.excerpt}</p>
                  <Button className="btn-arrow" variant="ghost" as={Link} to="/blog">
                    Voltar ao blog
                  </Button>
                </Card>
              </aside>

              <div className="stack">
                {post.sections.map((section) => (
                  <section key={section.title} className="stack" style={{ gap: "var(--space-3)" }}>
                    <h2>{section.title}</h2>
                    <p style={{ margin: 0, color: "var(--muted)" }}>{section.body}</p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}
