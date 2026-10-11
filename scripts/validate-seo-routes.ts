/**
 * Validates indexable routes vs sitemap and checks for accidental noindex on public pages.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getIndexablePaths, isIndexablePath } from "../seo/indexable-routes";
import { resolveSeo } from "../seo/seo.config";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(ROOT, "public", "sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const url = new URL(m[1]);
  return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
});

const expected = getIndexablePaths().sort();
const found = [...new Set(locs)].sort();

let failed = 0;
const missing = expected.filter((p) => !found.includes(p));
const extra = found.filter((p) => !expected.includes(p));
if (missing.length) {
  console.error("[validate-seo] Missing from sitemap:", missing);
  failed++;
}
if (extra.length) {
  console.error("[validate-seo] Extra URLs in sitemap:", extra);
  failed++;
}

for (const p of expected) {
  if (!isIndexablePath(p)) {
    console.error("[validate-seo] Path marked indexable but fails isIndexablePath:", p);
    failed++;
  }
  const seo = resolveSeo(p);
  if (seo.noindex) {
    console.error("[validate-seo] Accidental noindex on public path:", p);
    failed++;
  }
  if (!seo.title || seo.title.length < 10) {
    console.error("[validate-seo] Weak title:", p);
    failed++;
  }
  if (!seo.description || seo.description.length < 50) {
    console.error("[validate-seo] Weak description:", p);
    failed++;
  }
}

if (resolveSeo("/register").noindex !== true) {
  console.error("[validate-seo] /register should be noindex");
  failed++;
}

if (failed) {
  console.error(`[validate-seo] ${failed} check(s) failed`);
  process.exit(1);
}

console.log(`[validate-seo] OK — ${found.length} sitemap URLs match indexable routes`);
