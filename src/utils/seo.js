export const siteSeo = {
  siteName: "Robson Svicero",
  publisher: "Robson Svicero",
  defaultKeywords:
    "criação de sites, criação de sites em São Paulo, desenvolvimento de sites, sites profissionais, landing pages, UX design, UI design, SEO técnico, Robson Svicero",
  baseUrl: "https://robsonsvicero.com.br",
  defaultImage: "https://robsonsvicero.com.br/assets/images/og-image.webp",
  defaultTitle: "Criação de Sites Profissionais em São Paulo | Robson Svicero",
  defaultDescription:
    "Criação de sites profissionais em São Paulo com foco em SEO, performance, conversão e experiência do usuário.",
};

export function formatTitle(title) {
  if (!title) return siteSeo.defaultTitle;
  if (title.includes(siteSeo.siteName)) return title;
  return `${title} | ${siteSeo.siteName}`;
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteSeo.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageSeo({
  title,
  description,
  path = "/",
  canonical,
  image,
  type = "website",
  robots = "index, follow",
  twitterCard = "summary_large_image",
  keywords = siteSeo.defaultKeywords,
  publisher = siteSeo.publisher,
}) {
  const canonicalUrl = canonical ? absoluteUrl(canonical) : absoluteUrl(path);
  const resolvedTitle = formatTitle(title);
  const resolvedDescription = description || siteSeo.defaultDescription;
  const resolvedImage = absoluteUrl(image || siteSeo.defaultImage);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical: canonicalUrl,
    robots,
    keywords,
    publisher,
    openGraph: {
      type,
      url: canonicalUrl,
      title: resolvedTitle,
      description: resolvedDescription,
      image: resolvedImage,
      siteName: siteSeo.siteName,
      locale: "pt_BR",
    },
    twitter: {
      card: twitterCard,
      title: resolvedTitle,
      description: resolvedDescription,
      image: resolvedImage,
    },
  };
}
