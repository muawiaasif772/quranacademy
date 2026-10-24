import { COURSES, FAQS } from "../data";
import type { Course } from "../types";
import { brandLogoAbsolute } from "./brand-assets";
import { coursePageMeta } from "./course-meta";
import { SITE_OG_IMAGE_PATH } from "./image-assets";
import { PAGE_KEYWORD_THEMES } from "./keyword-map";

export const SITE_URL = "https://aliflaammeeminstitute.online";
export const SITE_NAME = "Alif Laam Meem Academy";
export const SITE_ALTERNATE_NAME = "Alif Laam Meem Islamic Institute";
/** Canonical homepage (trailing slash). */
export const SITE_HOME_URL = `${SITE_URL}/`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}${SITE_OG_IMAGE_PATH}`;
export const CONTACT_PHONE = "+92 300 6873200";
export const CONTACT_EMAIL = "infoaliflaameem@gmail.com";

/** E.164 digits only (no +), for https://wa.me/ links */
export const WHATSAPP_NUMBER_DIGITS = CONTACT_PHONE.replace(/\D/g, "");

const DEFAULT_WHATSAPP_MESSAGE =
  "Assalamu Alaikum! I would like to inquire about Quran classes at Alif Laam Meem Academy.";

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

export interface PageSeo {
  /** Full <title>. Keep ≤ 60 chars where possible. */
  title: string;
  /** Meta description. Aim for 120–160 chars. */
  description: string;
  /** Comma-separated keywords for <meta name="keywords">, from seo/keyword-map.ts.
   *  Note: Google does not use the keywords meta tag for ranking. It is
   *  included because the user asked for it and some smaller engines still
   *  read it; real keyword ranking comes from titles, headings and content. */
  keywords?: string;
  /** Canonical path (no domain). Defaults to the current pathname. */
  canonicalPath?: string;
  /** Absolute URL for og:image / twitter:image. */
  image?: string;
  /** "website" (default) or "article". */
  type?: "website" | "article";
  /** Set true for pages that should not be indexed (e.g. duplicate routes). */
  noindex?: boolean;
  /** Extra JSON-LD objects for this page. */
  jsonLd?: Record<string, unknown>[];
}

const absolute = (pathOrUrl: string) =>
  /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;

/** Canonical path for a route, matching how Apache serves route shells.
 *  Apache redirects /pricing -> /pricing/ (directory with index.html), so
 *  canonicals and sitemap URLs must use the trailing-slash form, or Google
 *  sees a sitemap URL that 301s to a page whose canonical points back to
 *  the redirecting URL. Homepage stays "/". */
export function canonicalPathFor(pathname: string): string {
  if (pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Site-wide structured data (Organization + WebSite). Rendered on every page.
// ─────────────────────────────────────────────────────────────────────────────
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  url: SITE_HOME_URL,
  logo: brandLogoAbsolute(SITE_URL),
  image: DEFAULT_OG_IMAGE,
  description:
    "Online Quran academy offering personalised 1-on-1 Quran, Tajweed, Hifz, Arabic and Islamic Studies classes for kids and adults with certified male and female tutors.",
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  areaServed: "Worldwide",
  sameAs: [] as string[],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      contactType: "customer service",
      availableLanguage: ["English", "Arabic", "Urdu"],
    },
  ],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_HOME_URL,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  description:
    "Official website of Alif Laam Meem Academy — live 1-on-1 online Quran, Tajweed, Hifz, Arabic and Islamic Studies classes.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

// ─────────────────────────────────────────────────────────────────────────────
// Static routes
// ─────────────────────────────────────────────────────────────────────────────
export const STATIC_PAGES: Record<string, PageSeo> = {
  "/": {
    title: "Alif Laam Meem Academy | Online Quran Classes for Kids & Adults",
    description:
      "Live 1-on-1 online Quran classes for kids and adults: Noorani Qaida, Tajweed, Hifz, Arabic and Islamic Studies. Book a free trial.",
    canonicalPath: "/",
  },
  "/courses": {
    title: "Online Quran Courses | Noorani Qaida, Tajweed, Hifz & Arabic",
    description:
      "Browse online Quran courses: Noorani Qaida, Tajweed, Hifz, Arabic, Islamic Studies for kids, and Tafsir. All taught live, one student per tutor.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Online Quran Courses",
        itemListElement: COURSES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/course/${c.slug}/`,
          name: c.title,
        })),
      },
    ],
  },
  "/pricing": {
    title: "Pricing & Plans | Affordable Online Quran Classes",
    description:
      "Simple pricing: Lite $26/mo, Standard $44/mo (Most Popular), Family $75/mo for 2 students. All 30-minute live lessons, 3 or 5 classes per week.",
  },
  "/book-free-trial": {
    title: "Book a Free Trial Quran Class | No Credit Card Required",
    description:
      "Book a free 30-minute 1-on-1 online Quran trial. Choose your course, days and a male or female tutor. Matched within 24 hours.",
  },
  "/register": {
    title: "Book a Free Trial Quran Class | No Credit Card Required",
    description:
      "Book a free 30-minute 1-on-1 online Quran trial. Choose your course, days and a male or female tutor. Matched within 24 hours.",
    canonicalPath: "/book-free-trial/",
    noindex: true,
  },
  "/tutors": {
    title: "Our Quran Tutors | Certified Male & Female Teachers",
    description:
      "Meet our certified Quran tutors with Ijazah and years of teaching experience. Choose a male or female teacher who speaks your language and fits your schedule.",
  },
  "/how-it-works": {
    title: "How Online Quran Classes Work | Alif Laam Meem Academy",
    description:
      "From free trial to first lesson in 4 simple steps. See how live 1-on-1 online Quran classes work and how we match you with a tutor.",
  },
  "/faq": {
    title: "Frequently Asked Questions | Online Quran Classes",
    description:
      "Answers to common questions about our online Quran classes: how lessons work, teacher choice, timings, equipment, family discounts, refunds and age limits.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  },
  "/contact": {
    title: "Contact Us | Alif Laam Meem Academy",
    description:
      "Get in touch with Alif Laam Meem Academy by WhatsApp, phone or email. We reply within hours and are available 24/7 to help you start online Quran classes.",
  },
  "/reviews": {
    title: "Student Reviews & Testimonials | Alif Laam Meem Academy",
    description:
      "Read reviews from students and parents around the world who learn Quran, Tajweed and Arabic online with Alif Laam Meem Academy's certified tutors.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Alif Laam Meem Academy",
    description:
      "How Alif Laam Meem Academy collects, uses and protects your personal information when you use our website and online Quran classes.",
  },
  "/terms-of-service": {
    title: "Terms of Service | Alif Laam Meem Academy",
    description:
      "Terms and conditions for using Alif Laam Meem Academy's website and enrolling in our online Quran, Tajweed and Arabic classes.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic course pages: /course/:slug
// ─────────────────────────────────────────────────────────────────────────────
export function courseSeo(course: Course): PageSeo {
  const path = `/course/${course.slug}`;
  const meta = coursePageMeta(course);
  const theme = PAGE_KEYWORD_THEMES[path];
  return {
    title: meta.title,
    description: meta.description,
    canonicalPath: `${path}/`,
    keywords: theme ? [theme.primary, ...theme.secondary].join(", ") : undefined,
    image: absolute(course.image),
    type: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.description,
        url: `${SITE_URL}${path}/`,
        image: absolute(course.image),
        provider: { "@id": `${SITE_URL}/#organization` },
        educationalLevel: course.level,
        timeRequired: course.duration,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: course.duration,
        },
      },
    ],
  };
}

export const NOT_FOUND_SEO: PageSeo = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist.",
  noindex: true,
};

/** Resolve SEO config for a pathname. */
export function resolveSeo(pathname: string): PageSeo {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  const courseMatch = path.match(/^\/course\/([^/]+)$/);
  if (courseMatch) {
    const course = COURSES.find((c) => c.slug === courseMatch[1]);
    return course ? courseSeo(course) : NOT_FOUND_SEO;
  }

  const page = STATIC_PAGES[path];
  if (!page) return NOT_FOUND_SEO;
  const theme = PAGE_KEYWORD_THEMES[path];
  // Canonical always uses the trailing-slash form (see canonicalPathFor),
  // unless the page already sets its own canonical (e.g. /register).
  return {
    ...page,
    keywords: theme ? [theme.primary, ...theme.secondary].join(", ") : undefined,
    canonicalPath: page.canonicalPath
      ? canonicalPathFor(page.canonicalPath)
      : canonicalPathFor(path),
  };
}
