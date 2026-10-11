import { COURSES, FAQS } from "../data";
import type { Course } from "../types";

export const SITE_URL = "https://alif-laam-meem-islamic-insitute.netlify.app";
export const SITE_NAME = "Alif Laam Meem Academy";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/closeup-of-muslim-children-in-elegant-attire-reciting-the-quran-showcasing-their-devotion-and-cultural-heritage-generated-image-photo.jpg`;
export const CONTACT_PHONE = "+92 300 6873200";
export const CONTACT_EMAIL = "info@aliflaameem.com";

export interface PageSeo {
  /** Full <title>. Keep ≤ 60 chars where possible. */
  title: string;
  /** Meta description. Aim for 120–160 chars. */
  description: string;
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

// ─────────────────────────────────────────────────────────────────────────────
// Site-wide structured data (Organization + WebSite). Rendered on every page.
// ─────────────────────────────────────────────────────────────────────────────
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Alif Laam Meem Islamic Institute",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/images.png`,
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
  url: SITE_URL,
  name: SITE_NAME,
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
      "Learn Quran online with certified male and female tutors. 1-on-1 Noorani Qaida, Tajweed, Hifz, Arabic and Islamic Studies classes for kids and adults. Book a free trial today.",
  },
  "/courses": {
    title: "Online Quran Courses | Qaida, Tajweed, Hifz, Arabic & More",
    description:
      "Explore our online Quran courses: Noorani Qaida, Quran with Tajweed, Hifz memorization, Arabic for communication, Islamic Studies for kids and Tafsir. All taught live, 1-on-1.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Online Quran Courses",
        itemListElement: COURSES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/course/${c.slug}`,
          name: c.title,
        })),
      },
    ],
  },
  "/pricing": {
    title: "Pricing & Plans | Affordable Online Quran Classes",
    description:
      "Simple, transparent pricing for online Quran classes. Choose the number of classes per week that fits your family, with family discounts and a 30-day money-back guarantee.",
  },
  "/book-free-trial": {
    title: "Book a Free Trial Quran Class | No Credit Card Required",
    description:
      "Book your free 30-minute 1-on-1 online Quran trial class. Choose your course, preferred days and a male or female tutor. We match you with a certified teacher within 24 hours.",
  },
  "/register": {
    title: "Book a Free Trial Quran Class | No Credit Card Required",
    description:
      "Book your free 30-minute 1-on-1 online Quran trial class. Choose your course, preferred days and a male or female tutor. We match you with a certified teacher within 24 hours.",
    canonicalPath: "/book-free-trial",
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
      "From free trial to first lesson in 4 simple steps. See how our live 1-on-1 online Quran classes work, what you need to get started and how we match you with a tutor.",
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
  return {
    title: `${course.title} Online Course | ${SITE_NAME}`,
    description: truncate(`${course.description} ${course.longDescription}`, 158),
    canonicalPath: path,
    image: absolute(course.image),
    type: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.description,
        url: `${SITE_URL}${path}`,
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

function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Resolve SEO config for a pathname. */
export function resolveSeo(pathname: string): PageSeo {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  const courseMatch = path.match(/^\/course\/([^/]+)$/);
  if (courseMatch) {
    const course = COURSES.find((c) => c.slug === courseMatch[1]);
    return course ? courseSeo(course) : NOT_FOUND_SEO;
  }

  return STATIC_PAGES[path] ?? NOT_FOUND_SEO;
}
