/**
 * Writes public/llms.txt, public/ai-catalog.json, and public/.well-known/ai-catalog.json.
 * Run before `vite build`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COURSES } from "../data";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "../seo/seo.config";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const DOMAIN = new URL(SITE_URL).hostname;

function urn(segment: string, name: string): string {
  return `urn:air:${DOMAIN}:${segment}:${name}`;
}

type CatalogEntry = {
  identifier: string;
  displayName: string;
  type: string;
  url: string;
  description?: string;
  representativeQueries?: string[];
};

function pageEntry(
  segment: string,
  name: string,
  displayName: string,
  urlPath: string,
  description: string,
  queries?: [string, string],
): CatalogEntry {
  const entry: CatalogEntry = {
    identifier: urn(segment, name),
    displayName,
    type: "text/html",
    url: urlPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${urlPath}`,
    description,
  };
  if (queries) entry.representativeQueries = queries;
  return entry;
}

const catalogEntries: CatalogEntry[] = [
  {
    identifier: urn("resource", "llms-txt"),
    displayName: "LLM site guide (llms.txt)",
    type: "text/plain",
    url: `${SITE_URL}/llms.txt`,
    description:
      "Curated overview of Alif Laam Meem Islamic Institute for language models and agents.",
    representativeQueries: [
      "What online Quran courses does Alif Laam Meem offer?",
      "How do I book a free trial Quran class?",
    ],
  },
  pageEntry(
    "page",
    "home",
    "Homepage",
    "/",
    "Overview of online 1-on-1 Quran, Tajweed, Hifz, Arabic, and Islamic Studies programs.",
    [
      "Alif Laam Meem online Quran academy for kids and adults",
      "Book a free Quran trial class online",
    ],
  ),
  pageEntry("page", "courses", "Course catalog", "/courses", "List of all Quran and Islamic study programs."),
  pageEntry(
    "page",
    "book-free-trial",
    "Book a free trial",
    "/book-free-trial",
    "Free trial registration form; academy responds within about 24 hours.",
    [
      "Register for a free online Quran trial lesson",
      "Sign up for Alif Laam Meem free trial",
    ],
  ),
  pageEntry("page", "faq", "FAQ", "/faq", "Answers about classes, tutors, scheduling, and pricing."),
  pageEntry("page", "contact", "Contact", "/contact", "Contact form and academy contact details."),
  pageEntry("page", "pricing", "Pricing", "/pricing", "Tuition plans and family discounts."),
  pageEntry("page", "tutors", "Tutors", "/tutors", "Certified male and female Quran tutors."),
  pageEntry("page", "how-it-works", "How it works", "/how-it-works", "How online lessons are delivered."),
  ...COURSES.map((c) =>
    pageEntry(
      "course",
      c.slug,
      c.title,
      `/course/${c.slug}`,
      c.description,
    ),
  ),
  {
    identifier: urn("resource", "sitemap"),
    displayName: "XML sitemap",
    type: "application/xml",
    url: `${SITE_URL}/sitemap.xml`,
    description: "Indexable public URLs for this website.",
  },
];

const aiCatalog = {
  specVersion: "1.0" as const,
  host: {
    displayName: "Alif Laam Meem Islamic Institute",
    identifier: SITE_URL,
    documentationUrl: `${SITE_URL}/llms.txt`,
    logoUrl: `${SITE_URL}/assets/images/images.png`,
  },
  entries: catalogEntries,
};

const llmsLines = [
  `# ${SITE_NAME}`,
  "",
  `> Online Quran academy (Alif Laam Meem Islamic Institute) offering live 1-on-1 classes for children and adults worldwide: Noorani Qaida, Tajweed, Hifz memorization, Arabic, Islamic Studies for kids, and Tafsir. Certified male and female tutors. Flexible scheduling. Book a free trial on the website; no credit card required.`,
  "",
  `Contact: ${CONTACT_PHONE}, ${CONTACT_EMAIL}. WhatsApp: https://wa.me/93006873200`,
  "",
  "## Key pages",
  "",
  `- [Home](${SITE_URL}/): Academy overview and main call-to-action`,
  `- [Courses](${SITE_URL}/courses): Full program catalog`,
  `- [Book a free trial](${SITE_URL}/book-free-trial): Trial registration form`,
  `- [Pricing](${SITE_URL}/pricing): Plans and family discounts`,
  `- [Tutors](${SITE_URL}/tutors): Male and female teachers`,
  `- [How it works](${SITE_URL}/how-it-works): Online lesson process`,
  `- [FAQ](${SITE_URL}/faq): Common questions about classes`,
  `- [Contact](${SITE_URL}/contact): Reach the support team`,
  `- [Reviews](${SITE_URL}/reviews): Student testimonials`,
  "",
  "## Courses",
  "",
  ...COURSES.map(
    (c) =>
      `- [${c.title}](${SITE_URL}/course/${c.slug}): ${c.description}`,
  ),
  "",
  "## Optional",
  "",
  `- [Privacy policy](${SITE_URL}/privacy-policy)`,
  `- [Terms of service](${SITE_URL}/terms-of-service)`,
  `- [Sitemap](${SITE_URL}/sitemap.xml)`,
  `- [AI catalog manifest](${SITE_URL}/.well-known/ai-catalog.json)`,
  "",
];

const llmsTxt = llmsLines.join("\n");
const catalogJson = `${JSON.stringify(aiCatalog, null, 2)}\n`;

writeFileSync(path.join(PUBLIC, "llms.txt"), llmsTxt, "utf8");
writeFileSync(path.join(PUBLIC, "ai-catalog.json"), catalogJson, "utf8");

const wellKnownDir = path.join(PUBLIC, ".well-known");
mkdirSync(wellKnownDir, { recursive: true });
writeFileSync(path.join(wellKnownDir, "ai-catalog.json"), catalogJson, "utf8");

console.log("[agentic] Wrote llms.txt, ai-catalog.json, .well-known/ai-catalog.json");
