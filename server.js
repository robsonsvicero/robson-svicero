import express from "express";
import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");
const app = express();
const port = Number(process.env.PORT) || 8080;
const rebuildSecret = process.env.HOSTINGER_REBUILD_SECRET || "";
const execAsync = promisify(exec);

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

app.get("/*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor de produção rodando em http://0.0.0.0:${port}`);
});
