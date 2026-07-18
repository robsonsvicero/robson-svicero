export const siteSeo = {
  siteName: "Robson Svicero",
  baseUrl: "https://robsonsvicero.com.br",
  defaultImage: "https://robsonsvicero.com.br/assets/images/og-image.webp",
  defaultTitle: "Criação de Sites Profissionais | Robson Svicero",
  defaultDescription:
    "Desenvolvedor web em São Paulo especializado na criação de sites profissionais com foco em performance, SEO, experiência do usuário e uso complementar de IA.",
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
