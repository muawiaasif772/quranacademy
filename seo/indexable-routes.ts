import { COURSES } from "../data";
import { resolveSeo, STATIC_PAGES } from "./seo.config";

/**
 * Paths that should appear in sitemap.xml and be treated as indexable.
 * Derived from the same SEO rules as <RouteSeo /> (no noindex, canonical = self, valid course slug).
 */
export function isIndexablePath(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const seo = resolveSeo(path);

  if (seo.noindex) return false;

  const canonical = seo.canonicalPath ?? path;
  if (canonical !== path) return false;

  if (path.startsWith("/course/")) {
    const slug = path.slice("/course/".length);
    return COURSES.some((c) => c.slug === slug);
  }

  return path === "/" || Boolean(STATIC_PAGES[path]);
}

export function getIndexablePaths(): string[] {
  const staticPaths = Object.keys(STATIC_PAGES).filter(isIndexablePath);
  const coursePaths = COURSES.map((c) => `/course/${c.slug}`);
  return [...staticPaths, ...coursePaths].sort((a, b) => a.localeCompare(b));
}

/** Sitemap hints (optional per URL). */
export function sitemapHints(path: string): { changefreq: string; priority: string } {
  if (path === "/") return { changefreq: "weekly", priority: "1.0" };
  if (path === "/courses" || path === "/pricing" || path === "/book-free-trial") {
    return { changefreq: "monthly", priority: "0.9" };
  }
  if (path.startsWith("/course/")) return { changefreq: "monthly", priority: "0.8" };
  if (path === "/tutors") return { changefreq: "monthly", priority: "0.8" };
  if (path === "/how-it-works" || path === "/faq") return { changefreq: "monthly", priority: "0.7" };
  if (path === "/reviews" || path === "/contact") return { changefreq: "yearly", priority: "0.6" };
  return { changefreq: "yearly", priority: "0.3" };
}
