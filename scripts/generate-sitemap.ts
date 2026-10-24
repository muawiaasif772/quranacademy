/**
 * Writes public/sitemap.xml from actual indexable routes (seo/indexable-routes.ts).
 * Run automatically before `vite build`.
 */
import { execSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COURSES } from "../data";
import { getIndexablePaths } from "../seo/indexable-routes";
import { SITE_URL } from "../seo/seo.config";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Map each public path to source files used for git lastmod. */
/** Page-specific sources only — shared SEO config is excluded so one commit does not reset every lastmod. */
const LASTMOD_SOURCES: Record<string, string[]> = {
  "/": ["pages/Home.tsx"],
  "/courses": ["pages/Courses.tsx", "data.ts"],
  "/pricing": ["pages/Pricing.tsx"],
  "/book-free-trial": ["pages/BookTrial.tsx"],
  "/tutors": ["pages/Tutors.tsx"],
  "/how-it-works": ["pages/HowItWorks.tsx"],
  "/faq": ["pages/FAQ.tsx", "data.ts"],
  "/contact": ["pages/Contact.tsx"],
  "/reviews": ["pages/Reviews.tsx"],
  "/privacy-policy": ["pages/Privacypolicy.tsx"],
  "/terms-of-service": ["pages/Termsofservice.tsx"],
};

const COURSE_LASTMOD_FILES = ["data.ts", "pages/Coursedetail.tsx", "seo/course-meta.ts"];

function gitLastMod(relativePaths: string[]): string | undefined {
  const dates: string[] = [];
  for (const rel of relativePaths) {
    const abs = path.join(ROOT, rel);
    if (!existsSync(abs)) continue;
    try {
      const out = execSync(`git log -1 --format=%cs -- "${rel}"`, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (out) dates.push(out.slice(0, 10));
    } catch {
      // Not a git repo or git unavailable — omit lastmod for this URL.
    }
  }
  if (!dates.length) return undefined;
  return dates.sort().at(-1)!;
}

function lastModForPath(routePath: string): string | undefined {
  if (routePath.startsWith("/course/")) return gitLastMod(COURSE_LASTMOD_FILES);
  const files = LASTMOD_SOURCES[routePath];
  return files ? gitLastMod(files) : gitLastMod(["index.html", "App.tsx", "components/Seo.tsx"]);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function locForPath(routePath: string): string {
  if (routePath === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${routePath}/`;
}

const paths = getIndexablePaths();
const urls = paths.map((p) => {
  const loc = locForPath(p);
  const lastmod = lastModForPath(p);
  const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodLine}
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

const outPath = path.join(ROOT, "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`[sitemap] Wrote ${paths.length} URLs to public/sitemap.xml`);

const courseInSitemap = paths.filter((p) => p.startsWith("/course/")).length;
if (courseInSitemap !== COURSES.length) {
  console.error(
    `[sitemap] Expected ${COURSES.length} course URLs, got ${courseInSitemap}`,
  );
  process.exit(1);
}
