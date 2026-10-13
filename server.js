import express from "express";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");
const indexHtmlPath = path.join(distPath, "index.html");
const app = express();
const port = Number(process.env.PORT) || 8080;
const rebuildSecret = process.env.HOSTINGER_REBUILD_SECRET || "";
const execAsync = promisify(exec);

async function loadDotEnvFiles() {
  for (const fileName of [".env", ".env.local"]) {
    try {
      const content = await readFile(path.join(__dirname, fileName), "utf-8");

      for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;

        const separatorIndex = line.indexOf("=");
        if (separatorIndex === -1) continue;

        const key = line.slice(0, separatorIndex).trim();
        if (key in process.env) continue;

        let value = line.slice(separatorIndex + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        process.env[key] = value;
      }
    } catch {
      // Os arquivos .env são opcionais; o servidor também aceita variáveis do ambiente.
    }
  }
}

await loadDotEnvFiles();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const siteUrl = (process.env.VITE_SITE_URL || "https://robsonsvicero.com.br").replace(/\/$/, "");
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function absoluteUrl(value) {
  if (!value) return `${siteUrl}/assets/images/og-image.webp`;

  try {
    return new URL(value, `${siteUrl}/`).href;
  } catch {
    return `${siteUrl}/assets/images/og-image.webp`;
  }
}

function createArticleHtml(indexHtml, post) {
  const title = escapeHtml(post.seo_title || post.title || "Artigo | Robson Svicero");
  const description = escapeHtml(
    post.seo_description || post.excerpt || "Artigo publicado por Robson Svicero.",
  );
  const image = escapeHtml(absoluteUrl(post.image || post.thumbnail));
  const url = escapeHtml(post.canonical_url || `${siteUrl}/blog/${post.slug}`);

  let html = indexHtml
    .replace(/<title>.*?<\/title>/is, `<title>${title}</title>`)
    .replace(
      /<meta\s+(?:name|property)=["'](?:description|og:[^"']+|twitter:[^"']+)["'][^>]*>\s*/gi,
      "",
    )
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");

  const metaTags = `
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${title}" />
  <meta property="og:site_name" content="Robson Svicero" />
  <meta property="og:locale" content="pt_BR" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:image:alt" content="${title}" />`;

  return html.replace("</head>", `${metaTags}\n</head>`);
}

app.disable("x-powered-by");
app.use(express.json());

app.post("/api/rebuild", async (req, res) => {
  const providedSecret = String(req.headers["x-rebuild-secret"] || "");

  if (!rebuildSecret) {
    return res.status(503).json({
      ok: false,
      message: "HOSTINGER_REBUILD_SECRET não configurado.",
    });
  }

  if (providedSecret !== rebuildSecret) {
    return res.status(401).json({
      ok: false,
      message: "Não autorizado.",
    });
  }

  try {
    const { stdout, stderr } = await execAsync("npm run build", {
      cwd: __dirname,
      env: { ...process.env, FORCE_COLOR: "0" },
      timeout: 300000,
    });

    return res.status(200).json({
      ok: true,
      message: "Rebuild executado com sucesso.",
      output: stdout || stderr || "Sem saída.",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.stderr || error.message || "Falha ao realizar rebuild.",
    });
  }
});

// Entrega metadados atuais do Supabase para crawlers de compartilhamento,
// sem depender de regenerar os HTMLs estáticos a cada novo artigo.
app.get("/blog/:slug", async (req, res, next) => {
  if (!supabase) return next();

  try {
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, seo_title, seo_description, image, thumbnail, canonical_url")
      .eq("slug", req.params.slug)
      .maybeSingle();

    if (error) throw error;
    if (!post) {
      res.set("Cache-Control", "no-store");
      return res.sendFile(indexHtmlPath);
    }

    const indexHtml = await readFile(indexHtmlPath, "utf-8");
    res.set("Cache-Control", "no-store");
    return res.type("html").send(createArticleHtml(indexHtml, post));
  } catch (error) {
    console.error(`[blog-meta] Falha ao gerar HTML para ${req.params.slug}:`, error.message);
    res.set("Cache-Control", "no-store");
    return res.sendFile(indexHtmlPath);
  }
});

app.use(
  express.static(distPath, {
    index: "index.html",
    maxAge: "1h",
    etag: true,
    lastModified: true,
  }),
);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, status: "healthy" });
});

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor de produção rodando em http://0.0.0.0:${port}`);
});
