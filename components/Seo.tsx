import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  ORGANIZATION_JSON_LD,
  SITE_NAME,
  SITE_URL,
  WEBSITE_JSON_LD,
  resolveSeo,
  type PageSeo,
} from "../seo/seo.config";

// ─────────────────────────────────────────────────────────────────────────────
// Head helpers — update tags in place so the static defaults in index.html
// are replaced (not duplicated) on every route change.
// ─────────────────────────────────────────────────────────────────────────────
function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function applySeo(seo: PageSeo, pathname: string) {
  const canonical = `${SITE_URL}${seo.canonicalPath ?? pathname}`;
  const image = seo.image ?? DEFAULT_OG_IMAGE;

  document.title = seo.title;
  upsertMeta("name", "description", seo.description);
  upsertMeta("name", "robots", seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  upsertLink("canonical", canonical);

  // Open Graph
  upsertMeta("property", "og:type", seo.type ?? "website");
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:locale", "en_US");
  upsertMeta("property", "og:title", seo.title);
  upsertMeta("property", "og:description", seo.description);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:image", image);

  // Twitter
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", seo.title);
  upsertMeta("name", "twitter:description", seo.description);
  upsertMeta("name", "twitter:image", image);

  // Structured data
  upsertJsonLd("ld-organization", ORGANIZATION_JSON_LD);
  upsertJsonLd("ld-website", WEBSITE_JSON_LD);
  upsertJsonLd("ld-page", {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  });
  upsertJsonLd("ld-extra", seo.jsonLd ?? []);
}

/**
 * Mount once inside <Router>. Resolves SEO metadata for the current route
 * (static pages + dynamic /course/:slug) and writes it into <head>.
 */
export function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(resolveSeo(pathname), pathname);
  }, [pathname]);

  return null;
}
