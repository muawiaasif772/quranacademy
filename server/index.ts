import "dotenv/config";
import { config as loadEnv } from "dotenv";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { trialRouter } from "./routes/trial";
import { getMailConfig } from "./lib/mailer";

// `.env` is loaded by "dotenv/config" above; `.env.local` (git-ignored) takes precedence.
loadEnv({ path: ".env.local", override: true });

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.API_PORT) || 3001;
const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "50kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mailConfigured: getMailConfig() !== null });
});

app.use("/api/trial", trialRouter);

// Malformed JSON and other body-parser errors → JSON response instead of an HTML stack trace.
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = typeof err === "object" && err && "status" in err ? Number((err as { status: number }).status) : 500;
  if (status >= 500) console.error("[server]", err);
  res.status(status).json({
    success: false,
    message: status === 400 ? "Invalid request body." : "Unexpected server error.",
  });
});

// In production, also serve the built Vite app so one process can host everything.
const distDir = path.join(ROOT, "dist");
if (isProduction && existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((_req, res) => res.sendFile(path.join(distDir, "index.html")));
}

app.listen(PORT, () => {
  const mail = getMailConfig();
  console.log(`[server] API listening on http://localhost:${PORT}`);
  console.log(
    mail
      ? `[server] Emails will be sent from ${mail.user}; admin notifications go to ${mail.adminEmail}`
      : "[server] WARNING: SMTP_USER / SMTP_PASS / ADMIN_EMAIL not set — /api/trial will return 503",
  );
});
