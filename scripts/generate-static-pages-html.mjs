import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const PROJECT_ROOT = process.cwd();
const DIST_PATH = path.join(PROJECT_ROOT, "dist");
const INDEX_HTML_PATH = path.join(DIST_PATH, "index.html");

const CANONICAL_PATHS = [
  "/",
  "/criacao-de-sites",
  "/criacao-de-sites-sao-paulo",
  "/planos",
  "/precos",
  "/servicos/ux-design",
  "/servicos/landing-page",
  "/servicos/seo",
  "/servicos/redesign",
  "/servicos/identidade-visual",
  "/cases",
  "/sobre",
  "/contato",
  "/diagnostico-claro",
  "/metodo-claro",
  "/agendamentos",
  "/cartao",
  "/privacidade",
  "/faq",
];

const APP_INTERNAL_ROUTES = [
  {
    path: "/admin",
    title: "Painel Administrativo | Robson Svicero",
    robots: "noindex, nofollow",
  },
  {
    path: "/admin/login",
    title: "Login Administrativo | Robson Svicero",
    robots: "noindex, nofollow",
  },
  {
    path: "/agendamento",
    title: "Agendamento | Robson Svicero",
    robots: "noindex, nofollow",
  },
  {
    path: "/exclusao-dados",
    title: "Instruções para Exclusão de Dados | Robson Svicero",
    robots: "noindex, nofollow",
  },
];

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") return "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

function toAbsoluteUrl(pathname, siteUrl) {
  const safePath = normalizePathname(pathname);
  return safePath === "/" ? siteUrl : `${siteUrl}${safePath}`;
}

function setCanonicalAndOgUrl(html, canonicalUrl) {
  let next = html;

  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(next)) {
    next = next.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    next = next.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  if (/<meta\s+property=["']og:url["'][^>]*>/i.test(next)) {
    next = next.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  } else {
    next = next.replace("</head>", `  <meta property="og:url" content="${canonicalUrl}" />\n</head>`);
  }

  return next;
}

function setPlansPrerenderMetadata(html) {
  let next = html;
  const title = "Planos de Criação de Sites em São Paulo | Robson Svicero";
  const description = "Conheça planos de criação de sites profissionais, landing pages e lojas virtuais em São Paulo. Atendimento direto, suporte e manutenção.";

  next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  next = next.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}" />`);
  next = next.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}" />`);
  next = next.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}" />`);

  const prerenderedContent = `
  <noscript>
    <main>
      <h1>Criação de sites profissionais em São Paulo para gerar contatos.</h1>
      <p>Conheça os planos Landing Page, Site One Page, Site Institucional e E-commerce, com preço a partir de R$ 490 e prazos definidos.</p>
      <h2>Planos de criação de sites</h2>
      <p>Landing Page, Site One Page, Site Institucional e E-commerce com suporte e manutenção disponíveis.</p>
    </main>
  </noscript>`;

  if (!next.includes("<noscript>")) {
    next = next.replace(/<body[^>]*>/i, (match) => `${match}${prerenderedContent}`);
  }

  return next;
}

function setSeoPrerenderMetadata(html) {
  let next = html;
  const title = "SEO Mensal em São Paulo: planos de conteúdo e SEO local | Robson Svicero";
  const description = "SEO mensal em São Paulo com artigos otimizados, on-page, estratégia local, publicações no Perfil da Empresa no Google e relatórios claros.";
  next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  next = next.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}" />`);
  next = next.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}" />`);
  next = next.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}" />`);

  const prerenderedContent = `
  <noscript>
    <main>
      <h1>SEO mensal para empresas de São Paulo aparecerem no Google.</h1>
      <p>Planos a partir de R$ 1.197 por mês com conteúdo otimizado, estratégia local, perfil da empresa e relatórios.</p>
      <h2>Planos de SEO mensal</h2>
      <p>SEO Starter, SEO Local Avançado e SEO Escala.</p>
    </main>
  </noscript>`;
  if (!next.includes("<noscript>")) next = next.replace(/<body[^>]*>/i, (match) => `${match}${prerenderedContent}`);
  return next;
}

async function loadSnapshotProjectPaths() {
  try {
    const snapshotUrl = `${pathToFileURL(path.join(PROJECT_ROOT, "src", "data", "contentSnapshots.js")).href}?v=${Date.now()}`;
    const mod = await import(snapshotUrl);
    const projectPaths = (mod.contentSnapshots?.projects || [])
      .map((project) => normalizePathname(project.path || `/cases/${project.slug || ""}`))
      .filter((projectPath) => projectPath.startsWith("/cases/") && projectPath !== "/cases/");

    return projectPaths;
  } catch {
    return [];
  }
}

async function writeRouteHtml(indexHtml, pathname, siteUrl) {
  const canonicalUrl = toAbsoluteUrl(pathname, siteUrl);
  let routeHtml = setCanonicalAndOgUrl(indexHtml, canonicalUrl);
  if (pathname === "/planos") routeHtml = setPlansPrerenderMetadata(routeHtml);
  if (pathname === "/servicos/seo") routeHtml = setSeoPrerenderMetadata(routeHtml);

  if (pathname === "/") {
    await writeFile(INDEX_HTML_PATH, routeHtml, "utf-8");
    return;
  }

  const outputDir = path.join(DIST_PATH, pathname.replace(/^\//, ""));
  const outputPath = path.join(outputDir, "index.html");

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, routeHtml, "utf-8");
}

async function writeAppRouteHtml(indexHtml, routeConfig, siteUrl) {
  const { path: routePath, title, robots } = routeConfig;
  const canonicalUrl = toAbsoluteUrl(routePath, siteUrl);
  let routeHtml = setCanonicalAndOgUrl(indexHtml, canonicalUrl);

  if (title) {
    routeHtml = routeHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
    routeHtml = routeHtml.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}" />`);
  }

  if (robots) {
    if (/<meta\s+name=["']robots["'][^>]*>/i.test(routeHtml)) {
      routeHtml = routeHtml.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${robots}" />`);
    } else {
      routeHtml = routeHtml.replace("</head>", `  <meta name="robots" content="${robots}" />\n</head>`);
    }
  }

  // Substitui o fallback da home pelo placeholder limpo de carregamento da aplicação
  routeHtml = routeHtml.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<\/body>/i,
    '<div id="root">\n    <main style="min-height:70vh;display:flex;align-items:center;justify-content:center;color:#8FB2EC;"><p>Carregando...</p></main>\n  </div>\n</body>'
  );

  const outputDir = path.join(DIST_PATH, routePath.replace(/^\//, ""));
  const outputPath = path.join(outputDir, "index.html");

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, routeHtml, "utf-8");
}

async function write404Html(indexHtml, siteUrl) {
  const canonicalUrl = toAbsoluteUrl("/404", siteUrl);
  let html404 = setCanonicalAndOgUrl(indexHtml, canonicalUrl);

  const title = "Página não encontrada | Robson Svicero";
  const description = "O endereço acessado não existe ou foi movido.";

  html404 = html404.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html404 = html404.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}" />`);
  html404 = html404.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}" />`);
  html404 = html404.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}" />`);

  if (/<meta\s+name=["']robots["'][^>]*>/i.test(html404)) {
    html404 = html404.replace(/<meta\s+name=["']robots["'][^>]*>/i, '<meta name="robots" content="noindex, follow" />');
  } else {
    html404 = html404.replace("</head>", '  <meta name="robots" content="noindex, follow" />\n</head>');
  }

  const fallback404 = `<div id="root">
    <main id="inicio" class="section">
      <div class="container stack" style="gap: var(--space-6, 1.5rem); max-width: 760px; text-align: center; margin: 0 auto; padding: 5rem 1rem;">
        <p class="eyebrow" style="color: var(--accent-300, #8FB2EC); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">404</p>
        <h1 style="color: #fff; font-size: 2.5rem; margin: 0.5rem 0;">Página não encontrada</h1>
        <p class="lead" style="color: var(--dark-100, #E7EAEE); font-size: 1.125rem; margin-bottom: 2rem;">O endereço acessado não existe ou foi movido.</p>
        <div class="hero-cta" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/" class="btn btn--primary" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--accent-600, #0052CC); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Voltar para home</a>
          <a href="/#contato" class="btn btn--secondary" style="display: inline-block; padding: 0.75rem 1.5rem; background: transparent; border: 1px solid var(--accent-500, #3D6FD0); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Falar sobre um projeto</a>
        </div>
      </div>
    </main>
  </div>
</body>`;

  html404 = html404.replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/i, fallback404);

  // Escreve dist/404.html (usado pelo Apache/LiteSpeed ErrorDocument e RewriteRule)
  const dist404HtmlPath = path.join(DIST_PATH, "404.html");
  await writeFile(dist404HtmlPath, html404, "utf-8");

  // Escreve dist/404/index.html (para caso a URL /404 seja acessada diretamente)
  const dir404 = path.join(DIST_PATH, "404");
  await mkdir(dir404, { recursive: true });
  await writeFile(path.join(dir404, "index.html"), html404, "utf-8");
}

async function run() {
  const siteUrl = (process.env.VITE_SITE_URL || "https://robsonsvicero.com.br").replace(/\/$/, "");

  let indexHtml = "";
  try {
    indexHtml = await readFile(INDEX_HTML_PATH, "utf-8");
  } catch {
    console.warn("[static-html] Nao foi possivel ler dist/index.html. Rode este script apos o vite build.");
    return;
  }

  const snapshotProjectPaths = await loadSnapshotProjectPaths();
  const allPaths = [...new Set([...CANONICAL_PATHS, ...snapshotProjectPaths])].map(normalizePathname);

  for (const pathname of allPaths) {
    await writeRouteHtml(indexHtml, pathname, siteUrl);
  }

  for (const appRoute of APP_INTERNAL_ROUTES) {
    await writeAppRouteHtml(indexHtml, appRoute, siteUrl);
  }

  await write404Html(indexHtml, siteUrl);

  console.log(
    `[static-html] Gerado: ${allPaths.length} rotas canonicas, ${APP_INTERNAL_ROUTES.length} rotas de app (incluindo admin) e pagina 404 estilizada.`
  );
}

run().catch((error) => {
  console.warn(`[static-html] ${error.message}`);
});
