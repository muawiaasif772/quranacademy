/**
 * Validates indexable routes vs sitemap, XML shape, robots.txt, and post-build dist copy.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COURSES } from "../data";
import { getIndexablePaths, isIndexablePath } from "../seo/indexable-routes";
import {
  BRAND_FAVICON_48_PATH,
  BRAND_FAVICON_PATH,
} from "../seo/brand-assets";
import { resolveSeo, SITE_NAME, SITE_URL, WEBSITE_JSON_LD } from "../seo/seo.config";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

function pathnameFromLoc(loc: string): string {
  const url = new URL(loc);
  return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
}

function validateSitemapXml(filePath: string, label: string): number {
  let failed = 0;
  if (!existsSync(filePath)) {
    console.error(`[validate-seo] Missing ${label}: ${filePath}`);
    return 1;
  }

  const sitemap = readFileSync(filePath, "utf8");

  if (!sitemap.startsWith("<?xml")) {
    console.error(`[validate-seo] ${label}: must start with XML declaration`);
    failed++;
  }
  if (!/<urlset[\s>]/.test(sitemap)) {
    console.error(`[validate-seo] ${label}: missing <urlset>`);
    failed++;
  }
  if (/<changefreq>|<priority>/.test(sitemap)) {
    console.error(`[validate-seo] ${label}: changefreq/priority should not be present`);
    failed++;
  }

  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);

  if (locs.length !== getIndexablePaths().length) {
    console.error(
      `[validate-seo] ${label}: expected ${getIndexablePaths().length} <loc>, found ${locs.length}`,
    );
    failed++;
  }

  const pathSet = new Set<string>();
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE_URL}`)) {
      console.error(`[validate-seo] ${label}: loc must use SITE_URL (${SITE_URL}): ${loc}`);
      failed++;
    }
    if (loc.startsWith("http://")) {
      console.error(`[validate-seo] ${label}: loc must be HTTPS: ${loc}`);
      failed++;
    }
    const p = pathnameFromLoc(loc);
    if (pathSet.has(p)) {
      console.error(`[validate-seo] ${label}: duplicate path in sitemap: ${p}`);
      failed++;
    }
    pathSet.add(p);
  }

  for (const lastmod of lastmods) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
      console.error(`[validate-seo] ${label}: invalid lastmod format: ${lastmod}`);
      failed++;
    }
  }

  const expected = getIndexablePaths().sort();
  const found = [...pathSet].sort();

  const missing = expected.filter((p) => !found.includes(p));
  const extra = found.filter((p) => !expected.includes(p));
  if (missing.length) {
    console.error(`[validate-seo] ${label}: missing from sitemap:`, missing);
    failed++;
  }
  if (extra.length) {
    console.error(`[validate-seo] ${label}: extra URLs in sitemap:`, extra);
    failed++;
  }

  const courseUrls = found.filter((p) => p.startsWith("/course/"));
  if (courseUrls.length !== COURSES.length) {
    console.error(
      `[validate-seo] ${label}: expected ${COURSES.length} course URLs, found ${courseUrls.length}`,
    );
    failed++;
  }
  for (const c of COURSES) {
    const coursePath = `/course/${c.slug}`;
    if (!found.includes(coursePath)) {
      console.error(`[validate-seo] ${label}: missing course slug: ${c.slug}`);
      failed++;
    }
  }

  return failed;
}

let failed = 0;

failed += validateSitemapXml(path.join(ROOT, "public", "sitemap.xml"), "public/sitemap.xml");
failed += validateSitemapXml(path.join(ROOT, "dist", "sitemap.xml"), "dist/sitemap.xml");

const robotsPath = path.join(ROOT, "public", "robots.txt");
if (!existsSync(robotsPath)) {
  console.error("[validate-seo] Missing public/robots.txt");
  failed++;
} else {
  const robots = readFileSync(robotsPath, "utf8");
  const sitemapLine = robots
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.toLowerCase().startsWith("sitemap:"));
  if (!sitemapLine || !sitemapLine.includes(SITEMAP_URL)) {
    console.error(`[validate-seo] robots.txt must contain: Sitemap: ${SITEMAP_URL}`);
    failed++;
  }
}

const expected = getIndexablePaths();
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

const indexHtml = readFileSync(path.join(ROOT, "index.html"), "utf8");
if (!indexHtml.includes('id="ld-website"')) {
  console.error("[validate-seo] index.html must include static WebSite JSON-LD (id=ld-website)");
  failed++;
}
if (!indexHtml.includes(`application-name" content="${SITE_NAME}"`)) {
  console.error("[validate-seo] index.html must include application-name meta");
  failed++;
}
if (!indexHtml.includes(BRAND_FAVICON_48_PATH)) {
  console.error("[validate-seo] index.html must reference 48x48 favicon");
  failed++;
}
for (const fav of [
  path.join(ROOT, "public", BRAND_FAVICON_PATH.slice(1)),
  path.join(ROOT, "public", BRAND_FAVICON_48_PATH.slice(1)),
  path.join(ROOT, "public", "favicon.ico"),
]) {
  if (!existsSync(fav)) {
    console.error(`[validate-seo] Missing favicon asset: ${fav}`);
    failed++;
  }
}
if (WEBSITE_JSON_LD.name !== SITE_NAME || WEBSITE_JSON_LD.url !== `${SITE_URL}/`) {
  console.error("[validate-seo] WEBSITE_JSON_LD name/url must match SITE_NAME and homepage URL");
  failed++;
}

const homeHtml = readFileSync(path.join(ROOT, "dist", "index.html"), "utf8");
const coursesShell = path.join(ROOT, "dist", "courses", "index.html");
if (!existsSync(coursesShell)) {
  console.error("[validate-seo] Missing dist/courses/index.html — run generate-route-html-shells.ts");
  failed++;
} else {
  const coursesHtml = readFileSync(coursesShell, "utf8");
  const homeTitle = homeHtml.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  const coursesTitle = coursesHtml.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  if (!coursesTitle || coursesTitle === homeTitle) {
    console.error("[validate-seo] courses/index.html must have a unique <title> vs homepage");
    failed++;
  }
  if (!coursesHtml.includes('rel="canonical" href="https://alif-laam-meem-islamic-insitute.netlify.app/courses"')) {
    console.error("[validate-seo] courses/index.html canonical must point to /courses");
    failed++;
  }
}

const sampleCourseShell = path.join(ROOT, "dist", "course", "noorani-qaida", "index.html");
if (!existsSync(sampleCourseShell)) {
  console.error("[validate-seo] Missing dist/course/noorani-qaida/index.html");
  failed++;
} else {
  const html = readFileSync(sampleCourseShell, "utf8");
  if (!html.includes("/course/noorani-qaida")) {
    console.error("[validate-seo] course shell canonical must reference its own URL");
    failed++;
  }
}

if (resolveSeo("/register").noindex !== true) {
  console.error("[validate-seo] /register should be noindex");
  failed++;
}
if (isIndexablePath("/register")) {
  console.error("[validate-seo] /register must not appear in indexable paths");
  failed++;
}

if (failed) {
  console.error(`[validate-seo] ${failed} check(s) failed`);
  process.exit(1);
}

console.log(`[validate-seo] OK — ${expected.length} sitemap URLs match indexable routes`);
