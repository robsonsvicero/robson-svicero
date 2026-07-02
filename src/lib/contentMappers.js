export function mapBlogPost(row) {
  return {
    slug: row.slug,
    path: `/blog/${row.slug}`,
    title: row.title,
    excerpt: row.excerpt,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    category: row.category,
    publishedAt: row.published_at,
    readingTime: row.reading_time,
    intro: row.intro,
    sections: row.sections || [],
  };
}

export function mapProject(row) {
  return {
    slug: row.slug,
    path: `/cases/${row.slug}`,
    title: row.title,
    description: row.description,
    fullDescription: row.full_description,
    metaDescription: row.meta_description,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    image: row.image,
    alt: row.alt,
    externalUrl: row.external_url,
  };
}
