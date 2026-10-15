import { getIndexablePaths } from "../../seo/indexable-routes";
import { buildSitemapXml } from "../../seo/sitemap-xml";

/**
 * Dynamic sitemap: URLs from getIndexablePaths() (static routes + courses in data.ts).
 */
export const handler = async () => {
  const buildTime = process.env.NETLIFY_BUILD_TIME?.slice(0, 10);
  const lastmod = buildTime || new Date().toISOString().slice(0, 10);

  const xml = buildSitemapXml(
    getIndexablePaths().map((path) => ({ path, lastmod })),
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
    body: xml,
  };
};
