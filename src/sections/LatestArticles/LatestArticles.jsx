import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import BlogArticleCard from "../../components/BlogArticleCard/BlogArticleCard.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import { contentSnapshots } from "../../data/contentSnapshots.js";
import { useSupabaseList } from "../../hooks/useSupabaseContent.js";
import { mapBlogPost } from "../../lib/contentMappers.js";
import { prefetchImages } from "../../utils/imagePrefetch.js";

import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";

const articlesContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.18,
    },
  },
};

const articleCardVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function LatestArticles({
  excludeSlug,
  limit = 3,
  className = "",
  showCta = true,
}) {
  const reducedMotion = useReducedMotion();
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

  useEffect(() => {
    if (latestPosts.length === 0) return;

    const candidateImages = latestPosts.map((post) => post.thumbnail || post.image).filter(Boolean);
    prefetchImages(candidateImages, { limit });
  }, [latestPosts, limit]);

  if (latestPosts.length === 0) return null;

  return (
    <Section
      className={`surface-band latest-articles ${className}`.trim()}
      aria-labelledby="sec-ultimos-artigos"
      containerClassName="container stack"
      containerStyle={{ gap: "var(--space-12)" }}
    >
      <div className="row-between" style={{ alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
        <SectionHeader
          label="Observatório Digital"
          title="Conteúdos para quem quer um site que gera resultados."
          subtitle="Artigos sobre criação de sites, SEO, UX, posicionamento digital e estratégias para transformar visitas em clientes."
          id="sec-ultimos-artigos"
          align="left"
          style={{ marginBottom: 0 }}
        />
        
      </div>

      <motion.div
        className="grid-3 latest-articles-grid"
        aria-label="Artigos recentes"
        variants={articlesContainerVariants}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {latestPosts.map((post) => (
          <motion.div
            key={post.slug}
            className="latest-article-motion-card"
            variants={articleCardVariants}
          >
            <BlogArticleCard
              className="latest-article-card"
              post={post}
              titleAs="h3"
            />
          </motion.div>
        ))}
      </motion.div>
      {showCta && (
        <div className="blog-btn">
          <Button variant="secondary" as={Link} to="/blog" title="Ver todos os artigos">
            Ver todos
          </Button>
        </div>
      )}
    </Section>
  );
}
