export const siteSeo = {
  siteName: "Robson Svicero",
  baseUrl: "https://robsonsvicero.com.br",
  defaultTitle:
    "Desenvolvedor React.js | Landing Pages, Sites Institucionais e One Page | Robson Svicero",
  defaultDescription:
    "Desenvolvedor React.js em São Paulo especializado na criação de Landing Pages, Sites Institucionais, Sites One Page e interfaces para produtos digitais.",
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

export function createPageSeo({ title, description, path = "/", robots = "index, follow" }) {
  return {
    title: formatTitle(title),
    description: description || siteSeo.defaultDescription,
    canonical: absoluteUrl(path),
    robots,
  };
}
