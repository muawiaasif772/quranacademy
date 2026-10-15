import { getIndexablePaths } from "./indexable-routes";
import { SITE_URL } from "./seo.config";

export type SitemapUrl = {
  path: string;
  lastmod?: string;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Absolute URL for a site path (homepage uses trailing slash). */
export function sitemapLocForPath(routePath: string): string {
  if (routePath === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${routePath}`;
}

/**
 * Build sitemap XML from indexable routes (static pages + courses in data.ts).
 * Add a course or STATIC_PAGES entry → it appears here automatically.
 */
export function buildSitemapXml(urls?: SitemapUrl[]): string {
  const entries =
    urls ??
    getIndexablePaths().map((path) => ({
      path,
    }));

  const body = entries
    .map(({ path, lastmod }) => {
      const loc = sitemapLocForPath(path);
      const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
      return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodLine}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}
