import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const PROJECT_ROOT = process.cwd();
const DIST_PATH = path.join(PROJECT_ROOT, "dist");
const INDEX_HTML_PATH = path.join(DIST_PATH, "index.html");

function parseEnvFile(content) {
  const env = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

async function loadDotEnvFiles() {
  const envFiles = [".env", ".env.local"];
  for (const fileName of envFiles) {
    const filePath = path.join(PROJECT_ROOT, fileName);
    try {
      const raw = await readFile(filePath, "utf-8");
      const parsed = parseEnvFile(raw);
      for (const [key, value] of Object.entries(parsed)) {
        if (!(key in process.env)) process.env[key] = value;
      }
    } catch {
      // Ignore missing env files.
    }
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function fetchBlogPosts(supabaseUrl, supabaseAnonKey) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, seo_description, image")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(`Falha ao buscar posts do Supabase: ${error.message}`);
  }
  return data || [];
}

async function generateBlogHtmls() {
  await loadDotEnvFiles();

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  const siteUrl = process.env.VITE_SITE_URL || "https://robsonsvicero.com.br";

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[blog-html] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY nao encontrados. Pulando geracao de HTMLs do blog.");
    return;
  }

  let indexHtml = "";
  try {
    indexHtml = await readFile(INDEX_HTML_PATH, "utf-8");
  } catch (error) {
    console.error("[blog-html] Nao foi possivel ler o dist/index.html. Certifique-se de rodar este script APOS o vite build.");
    return;
  }

  const posts = await fetchBlogPosts(supabaseUrl, supabaseAnonKey);

  for (const post of posts) {
    if (!post.slug) continue;

    const title = escapeHtml(post.title);
    const description = escapeHtml(post.seo_description || post.excerpt);
    const image = escapeHtml(post.image);
    const url = `${siteUrl}/blog/${post.slug}`;

    let postHtml = indexHtml;

    // Replace <title>
    postHtml = postHtml.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
    
    // Remove default OG and Twitter meta tags to prevent duplicates
    postHtml = postHtml.replace(/<meta property="og:[^>]*>/g, "");
    postHtml = postHtml.replace(/<meta name="twitter:[^>]*>/g, "");
    postHtml = postHtml.replace(/<meta name="description"[^>]*>/g, "");

    // Add OG and Twitter tags just before </head>
    const metaTags = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    `;

    postHtml = postHtml.replace("</head>", `${metaTags}\n  </head>`);

    const dirPath = path.join(DIST_PATH, "blog", post.slug);
    await mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, "index.html");
    await writeFile(filePath, postHtml, "utf-8");
  }

  console.log(`[blog-html] Foram gerados ${posts.length} arquivos HTML estaticos para o blog.`);
}

generateBlogHtmls().catch((error) => {
  console.error(`[blog-html] Erro: ${error.message}`);
  process.exit(1);
});
