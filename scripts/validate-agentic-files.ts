/**
 * Validates llms.txt structure, ai-catalog.json schema shape, and dist copies.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "../seo/seo.config";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const URN_PATTERN = /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/;

let failed = 0;

function fail(msg: string) {
  console.error(`[validate-agentic] ${msg}`);
  failed++;
}

function checkTextFile(relPath: string, label: string, firstLinePrefix?: string) {
  const filePath = path.join(ROOT, relPath);
  if (!existsSync(filePath)) {
    fail(`Missing ${label}: ${relPath}`);
    return;
  }
  const text = readFileSync(filePath, "utf8");
  if (text.trimStart().startsWith("<!DOCTYPE") || text.trimStart().startsWith("<html")) {
    fail(`${label} looks like HTML, not plain text/JSON`);
  }
  if (firstLinePrefix && !text.startsWith(firstLinePrefix)) {
    fail(`${label} must start with ${firstLinePrefix}`);
  }
}

function validateAiCatalog(relPath: string, label: string) {
  const filePath = path.join(ROOT, relPath);
  if (!existsSync(filePath)) {
    fail(`Missing ${label}: ${relPath}`);
    return;
  }
  const raw = readFileSync(filePath, "utf8");
  if (raw.trimStart().startsWith("<")) {
    fail(`${label} is HTML, not JSON`);
    return;
  }
  let data: {
    specVersion?: string;
    entries?: Array<Record<string, unknown>>;
    host?: Record<string, unknown>;
  };
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail(`${label}: invalid JSON — ${e}`);
    return;
  }
  if (data.specVersion !== "1.0") fail(`${label}: specVersion must be "1.0"`);
  if (!Array.isArray(data.entries) || data.entries.length === 0) {
    fail(`${label}: entries must be a non-empty array`);
  }
  const ids = new Set<string>();
  for (const entry of data.entries ?? []) {
    for (const key of ["identifier", "displayName", "type"]) {
      if (typeof entry[key] !== "string" || !entry[key]) {
        fail(`${label}: entry missing ${key}`);
      }
    }
    const hasUrl = typeof entry.url === "string" && entry.url.length > 0;
    const hasData = entry.data !== undefined && typeof entry.data === "object";
    if (hasUrl === hasData) {
      fail(`${label}: entry must have exactly one of url or data`);
    }
    if (hasUrl && !String(entry.url).startsWith(SITE_URL)) {
      fail(`${label}: url must use production SITE_URL: ${entry.url}`);
    }
    if (typeof entry.identifier === "string" && !URN_PATTERN.test(entry.identifier)) {
      fail(`${label}: invalid URN: ${entry.identifier}`);
    }
    if (typeof entry.identifier === "string") {
      if (ids.has(entry.identifier)) fail(`${label}: duplicate identifier ${entry.identifier}`);
      ids.add(entry.identifier);
    }
    const rq = entry.representativeQueries;
    if (rq !== undefined) {
      if (!Array.isArray(rq) || rq.length < 2 || rq.length > 5) {
        fail(`${label}: representativeQueries must have 2–5 items when present`);
      }
    }
  }
}

function validateLlms(relPath: string, label: string) {
  const filePath = path.join(ROOT, relPath);
  if (!existsSync(filePath)) {
    fail(`Missing ${label}`);
    return;
  }
  const text = readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  if (!lines[0]?.startsWith("# ")) {
    fail(`${label}: first line must be H1 (# Title)`);
  }
  const quoteIdx = lines.findIndex((l) => l.startsWith("> "));
  if (quoteIdx === -1) {
    fail(`${label}: missing blockquote summary (line starting with "> ")`);
  }
  const h2Sections = lines.filter((l) => l.startsWith("## "));
  if (h2Sections.length === 0) {
    fail(`${label}: must include at least one ## section`);
  }
  if (!text.includes("## Optional")) {
    fail(`${label}: should include an "## Optional" section per convention`);
  }
  const links = [...text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)];
  if (links.length < 5) fail(`${label}: expected multiple markdown links`);
  for (const [, , url] of links) {
    if (!url.startsWith(SITE_URL)) {
      fail(`${label}: link must use site URL: ${url}`);
    }
  }
}

checkTextFile("public/llms.txt", "public/llms.txt", "# ");
validateLlms("public/llms.txt", "public/llms.txt");
validateAiCatalog("public/ai-catalog.json", "public/ai-catalog.json");
validateAiCatalog("public/.well-known/ai-catalog.json", "public/.well-known/ai-catalog.json");

for (const rel of ["dist/llms.txt", "dist/ai-catalog.json", "dist/.well-known/ai-catalog.json"]) {
  if (!existsSync(path.join(ROOT, rel))) {
    fail(`Missing post-build file: ${rel}`);
  }
}

const robots = readFileSync(path.join(ROOT, "public", "robots.txt"), "utf8");
if (!robots.includes(`${SITE_URL}/sitemap.xml`)) {
  fail("robots.txt must reference sitemap.xml");
}

if (failed) {
  console.error(`[validate-agentic] ${failed} check(s) failed`);
  process.exit(1);
}

console.log("[validate-agentic] OK — llms.txt and ai-catalog manifests validated");
