import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FacebookComments from "../../components/FacebookComments/FacebookComments.jsx";
import Layout from "../../components/layout/Layout/Layout.jsx";
import RichTextContent from "../../components/RichTextContent/RichTextContent.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { useSupabaseItem } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";
import { isSupabaseConfigured, supabase } from "../../lib/supabaseClient.js";
import LatestArticles from "../../sections/LatestArticles/LatestArticles.jsx";
import { absoluteUrl } from "../../utils/seo.js";
import NotFound from "../NotFound/NotFound.jsx";

const BLOG_VISITOR_KEY_STORAGE = "od_blog_visitor_key";

function getPostParagraphs(post) {
  if (post.content) {
    return post.content
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return post.sections.map((section) => section.body).filter(Boolean);
}

function hasHtmlContent(content = "") {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

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

function getOrCreateVisitorKey() {
  if (typeof window === "undefined") return null;

  try {
    const existingKey = window.localStorage.getItem(BLOG_VISITOR_KEY_STORAGE);
    if (existingKey) return existingKey;

    const createdKey = window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    window.localStorage.setItem(BLOG_VISITOR_KEY_STORAGE, createdKey);
    return createdKey;
  } catch {
    return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const { item: post, isLoading } = useSupabaseItem({
    table: "blog_posts",
    slug,
    mapper: mapBlogPost,
  });
  const [viewsCount, setViewsCount] = useState(0);

  useEffect(() => {
    setViewsCount(post?.viewsCount ?? 0);
  }, [post?.slug, post?.viewsCount]);

  useEffect(() => {
    if (!isSupabaseConfigured || !post?.slug) return;

    const visitorKey = getOrCreateVisitorKey();
    if (!visitorKey) return;

    let isMounted = true;

    async function registerView() {
      const { data, error } = await supabase.rpc("register_blog_post_view", {
        p_post_slug: post.slug,
        p_visitor_key: visitorKey,
      });

      if (error || !isMounted) return;

      if (Number.isFinite(Number(data))) {
        setViewsCount(Number(data));
      }
    }

    registerView();

    return () => {
      isMounted = false;
    };
  }, [post?.slug]);

  if (!post && isLoading) return null;
  if (!post) return <NotFound />;

  const paragraphs = getPostParagraphs(post);
  const commentsUrl = post.canonicalUrl || absoluteUrl(post.path);
  const hasRichContent = hasHtmlContent(post.content);

  return (
    <>
      <SEO title={post.seoTitle} description={post.seoDescription} path={post.path} />
      <Layout>
        <article className="blog-article" aria-labelledby="post-title">
          <header className="blog-hero">
            {post.image && (
              <img className="blog-hero-image" src={post.image} alt="" aria-hidden="true" />
            )}
            <div className="blog-hero-overlay" />
            <div className="container blog-hero-content">
              <p className="eyebrow">{post.category}</p>
              <h1 id="post-title">{post.title}</h1>
              {post.seoDescription && <p className="lead">{post.seoDescription}</p>}
              <p className="blog-hero-meta">
                Publicação: {formatPostDate(post.publishedAt)} / Autor:{" "}
                {post.author || "Robson Svicero"} / Leitura: {post.readingTime} / Visualizações: {formatViewsCount(viewsCount)}
              </p>
            </div>
          </header>

          <div className="section">
            <div className="container blog-article-layout">
              <div className="blog-article-content">
                {post.intro && <p className="blog-article-intro">{post.intro}</p>}
                {hasRichContent
                  ? <RichTextContent>{post.content}</RichTextContent>
                  : post.content
                    ? paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  : post.sections.map((section) => (
                      <section key={section.title} className="blog-article-section">
                        <h2>{section.title}</h2>
                        <p>{section.body}</p>
                      </section>
                    ))}
              </div>
            </div>
          </div>
          <LatestArticles excludeSlug={post.slug} showCta={false} className="blog-latest-articles" />
          <div className="container blog-comments-container">
            <FacebookComments url={commentsUrl} />
          </div>
        </article>
      </Layout>
    </>
  );
}
