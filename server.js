import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");
const app = express();
const port = Number(process.env.PORT) || 8080;

app.disable("x-powered-by");

app.use(
  express.static(distPath, {
    index: false,
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
