import { COURSES } from "../data";
import { BLOG_POSTS } from "../data/blog";
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
  const canonicalStripped = canonical === "/" ? "/" : canonical.replace(/\/+$/, "");
  if (canonicalStripped !== path) return false;

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    return BLOG_POSTS.some((p) => p.slug === slug);
  }

  if (path.startsWith("/course/")) {
    const slug = path.slice("/course/".length);
    return COURSES.some((c) => c.slug === slug);
  }

  return path === "/" || Boolean(STATIC_PAGES[path]);
}

export function getIndexablePaths(): string[] {
  const staticPaths = Object.keys(STATIC_PAGES).filter(isIndexablePath);
  const coursePaths = COURSES.map((c) => `/course/${c.slug}`);
  const blogPaths = BLOG_POSTS.map((p) => `/blog/${p.slug}`);
  return [...staticPaths, ...coursePaths, ...blogPaths].sort((a, b) => a.localeCompare(b));
}
