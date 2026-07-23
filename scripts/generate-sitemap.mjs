import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const PROJECT_ROOT = process.cwd();
const SITEMAP_PATH = path.join(PROJECT_ROOT, "public", "sitemap.xml");

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

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function extractLoc(urlBlock) {
  const match = urlBlock.match(/<loc>([^<]+)<\/loc>/i);
  return match?.[1] || "";
}

function isBlogLoc(loc) {
  if (!loc) return false;

  try {
    const pathname = new URL(loc).pathname;
    return pathname === "/blog" || pathname.startsWith("/blog/");
  } catch {
    return loc.includes("/blog");
  }
}

function normalizeDate(dateValue) {
  if (!dateValue) return new Date().toISOString().slice(0, 10);
  const normalized = String(dateValue).trim();
  if (!normalized) return new Date().toISOString().slice(0, 10);
  return normalized.includes("T") ? normalized.split("T")[0] : normalized;
}

function createUrlBlock({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${normalizeDate(lastmod)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function getUrlsetOpenTag(xml) {
  const match = xml.match(/^[\s\S]*?<urlset[^>]*>/i);
  if (!match) throw new Error("Nao foi possivel encontrar a abertura <urlset> no sitemap.xml.");
  return match[0];
}

function getSiteOriginFromSitemap(xml) {
  const homeMatch = xml.match(/<loc>(https?:\/\/[^<]+)<\/loc>/i);
  if (!homeMatch) throw new Error("Nao foi possivel identificar o dominio base no sitemap.xml.");
  return new URL(homeMatch[1]).origin;
}

async function fetchBlogPosts(supabaseUrl, supabaseAnonKey) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug,published_at,updated_at")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(`Falha ao buscar posts do Supabase: ${error.message}`);
  }

  return data || [];
}

function buildBlogBlocks(siteOrigin, posts) {
  const blogIndexLastmod = posts.length
    ? normalizeDate(posts[0].updated_at || posts[0].published_at)
    : new Date().toISOString().slice(0, 10);

  const blocks = [
    createUrlBlock({
      loc: `${siteOrigin}/blog`,
      lastmod: blogIndexLastmod,
      changefreq: "weekly",
      priority: "0.8",
    }),
  ];

  for (const post of posts) {
    if (!post?.slug) continue;

    blocks.push(
      createUrlBlock({
        loc: `${siteOrigin}/blog/${post.slug}`,
        lastmod: normalizeDate(post.updated_at || post.published_at),
        changefreq: "monthly",
        priority: "0.7",
      }),
    );
  }

  return blocks;
}

function replaceBlogBlocks(xml, blogBlocks) {
  const urlsetOpenTag = getUrlsetOpenTag(xml);
  const allBlocks = xml.match(/<url>[\s\S]*?<\/url>/gi) || [];
  const rebuiltBlocks = [];
  let inserted = false;

  for (const block of allBlocks) {
    const loc = extractLoc(block);

    if (isBlogLoc(loc)) {
      if (!inserted) {
        rebuiltBlocks.push(...blogBlocks);
        inserted = true;
      }
      continue;
    }

    rebuiltBlocks.push(block.trim());
  }

  if (!inserted) rebuiltBlocks.push(...blogBlocks);

  return `${urlsetOpenTag}\n${rebuiltBlocks.join("\n")}\n</urlset>\n`;
}

async function run() {
  await loadDotEnvFiles();

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[sitemap] VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY nao encontrados. Mantendo sitemap atual.");
    return;
  }

  const rawSitemap = await readFile(SITEMAP_PATH, "utf-8");
  const siteOrigin = getSiteOriginFromSitemap(rawSitemap);
  const posts = await fetchBlogPosts(supabaseUrl, supabaseAnonKey);
  const blogBlocks = buildBlogBlocks(siteOrigin, posts);
  const nextSitemap = replaceBlogBlocks(rawSitemap, blogBlocks);

  await writeFile(SITEMAP_PATH, nextSitemap, "utf-8");
  console.log(`[sitemap] Sitemap atualizado com ${posts.length} artigo(s) do blog.`);
}

run().catch((error) => {
  console.error(`[sitemap] ${error.message}`);
  process.exit(1);
});
