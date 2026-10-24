/**
 * After Vite build: emit route-specific index.html files so Netlify serves unique
 * title, canonical, meta, and noscript content per URL (SPA fallback otherwise
 * returns identical homepage HTML for every path).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COURSES } from "../data";
import { buildBreadcrumbJsonLd } from "../seo/breadcrumbs";
import { getIndexablePaths } from "../seo/indexable-routes";
import { DEFAULT_OG_IMAGE, SITE_URL, resolveSeo, type PageSeo } from "../seo/seo.config";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const TEMPLATE_PATH = path.join(DIST, "index.html");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function patchMeta(html: string, attr: "name" | "property", key: string, content: string): string {
  const re = new RegExp(
    `<meta ${attr}="${key}" content="[^"]*"\\s*/?>`,
    "i",
  );
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  return re.test(html) ? html.replace(re, tag) : html;
}

function patchHead(html: string, seo: PageSeo, pathname: string): string {
  const canonicalPath = seo.canonicalPath ?? pathname;
  const canonical = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const image = seo.image ?? DEFAULT_OG_IMAGE;
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  out = patchMeta(out, "name", "description", seo.description);
  if (seo.keywords) {
    if (/<meta name="keywords"/i.test(out)) {
      out = patchMeta(out, "name", "keywords", seo.keywords);
    } else {
      out = out.replace("</head>", `  <meta name="keywords" content="${escapeAttr(seo.keywords)}" />\n  </head>`);
    }
  }
  out = patchMeta(out, "name", "robots", robots);
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
  );
  out = patchMeta(out, "property", "og:title", seo.title);
  out = patchMeta(out, "property", "og:description", seo.description);
  out = patchMeta(out, "property", "og:url", canonical);
  out = patchMeta(out, "property", "og:image", image);
  out = patchMeta(out, "name", "twitter:title", seo.title);
  out = patchMeta(out, "name", "twitter:description", seo.description);
  out = patchMeta(out, "name", "twitter:image", image);
  out = patchMeta(out, "property", "og:type", seo.type ?? "website");
  return out;
}

function crawlNavLinks(): string {
  const links = [
    ["/courses", "Courses"],
    ["/pricing", "Pricing"],
    ["/book-free-trial", "Free trial"],
    ["/tutors", "Tutors"],
    ["/how-it-works", "How it works"],
    ["/faq", "FAQ"],
    ["/contact", "Contact"],
  ];
  return links.map(([href, label]) => `<a href="${href}">${label}</a>`).join(" · ");
}

function courseLinksHtml(): string {
  return COURSES
    .map(
      (c) =>
        `<a href="/course/${c.slug}">${escapeHtml(c.title)}</a>`,
    )
    .join(" · ");
}

function buildNoscript(seo: PageSeo, pathname: string): string {
  const courseMatch = pathname.match(/^\/course\/([^/]+)$/);
  const course = courseMatch
    ? COURSES.find((c) => c.slug === courseMatch[1])
    : undefined;

  const h1 = course
    ? escapeHtml(course.title)
    : escapeHtml(seo.title.split("|")[0].trim());

  const body = course
    ? `<p style="margin:0 0 1rem;color:#334155">${escapeHtml(course.longDescription)}</p>
       <p style="margin:0 0 1rem;color:#334155"><strong>Level:</strong> ${escapeHtml(course.level)} · <strong>Duration:</strong> ${escapeHtml(course.duration)}</p>
       <p style="margin:0 0 1rem"><a href="/book-free-trial">Book a free trial</a> · <a href="/courses">All courses</a></p>
       <p style="margin:0;font-size:0.9rem;color:#64748b"><strong>More courses:</strong> ${courseLinksHtml()}</p>`
    : `<p style="margin:0 0 1rem;color:#334155">${escapeHtml(seo.description)}</p>
       <p style="margin:0"><strong>Explore:</strong> ${crawlNavLinks()}</p>`;

  return `<noscript data-route="${escapeAttr(pathname)}">
      <div style="max-width:42rem;margin:1.5rem auto;padding:0 1rem;font-family:system-ui,sans-serif;line-height:1.6">
        <h1 style="font-size:1.35rem;margin:0 0 0.75rem">${h1}</h1>
        ${body}
      </div>
    </noscript>`;
}

function replaceNoscript(html: string, noscript: string): string {
  if (/<noscript[\s>]/i.test(html)) {
    return html.replace(/<noscript[\s\S]*?<\/noscript>/i, noscript);
  }
  return html.replace(/<body([^>]*)>/i, `<body$1>\n    ${noscript}`);
}

function injectPageJsonLd(html: string, seo: PageSeo, pathname: string): string {
  const canonicalPath = seo.canonicalPath ?? pathname;
  const canonical = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const breadcrumb = buildBreadcrumbJsonLd(pathname);
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };

  const blocks: unknown[] = [pageLd];
  if (breadcrumb) blocks.push(breadcrumb);
  if (seo.jsonLd?.length) blocks.push(...seo.jsonLd);

  // Remove any prior prerender scripts from the Vite template copy
  let out = html.replace(
    /\s*<script type="application\/ld\+json" id="ld-prerender-\d+">[\s\S]*?<\/script>/gi,
    "",
  );

  const scriptTags = blocks
    .map(
      (block, i) =>
        `<script type="application/ld+json" id="ld-prerender-${i}">${JSON.stringify(block)}</script>`,
    )
    .join("\n    ");

  return out.replace("</head>", `    ${scriptTags}\n  </head>`);
}

function writeRouteHtml(pathname: string, template: string): void {
  const seo = resolveSeo(pathname);
  const canonicalPath = seo.canonicalPath ?? pathname;
  let html = patchHead(template, seo, pathname);
  html = replaceNoscript(html, buildNoscript(seo, pathname));
  html = injectPageJsonLd(html, seo, pathname);

  const outFile =
    canonicalPath === "/"
      ? TEMPLATE_PATH
      : path.join(DIST, canonicalPath.replace(/^\//, ""), "index.html");

  if (canonicalPath !== "/") {
    mkdirSync(path.dirname(outFile), { recursive: true });
  }
  writeFileSync(outFile, html, "utf8");
}

function main(): void {
  if (!existsSync(TEMPLATE_PATH)) {
    throw new Error("Run after vite build — dist/index.html missing");
  }
  const template = readFileSync(TEMPLATE_PATH, "utf8");
  const paths = getIndexablePaths();

  for (const p of paths) {
    writeRouteHtml(p, template);
  }

  console.log(`[route-html] Wrote ${paths.length} route-specific HTML shells under dist/`);
}

main();
