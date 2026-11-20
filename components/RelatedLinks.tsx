import React from "react";
import { Link } from "react-router-dom";

/**
 * Contextual internal links shown at the end of pages that otherwise link
 * to very few other pages. Helps visitors find the next step and helps
 * search engines discover and understand how the pages relate.
 */
type L = { to: string; label: string };

const COURSE_LINKS: L[] = [
  { to: "/course/noorani-qaida/", label: "Noorani Qaida for beginners" },
  { to: "/course/quran-tajweed/", label: "Quran with Tajweed" },
  { to: "/course/hifz-memorization/", label: "Hifz (Quran memorisation)" },
  { to: "/course/tafsir-meaning/", label: "Tafseer & meaning" },
  { to: "/course/arabic-communication/", label: "Arabic language" },
  { to: "/course/islamic-studies-kids/", label: "Islamic studies for kids" },
];

const SETS: Record<string, { title: string; links: L[] }> = {
  "/tutors/": {
    title: "Learn with our tutors",
    links: [
      ...COURSE_LINKS.slice(0, 4),
      { to: "/reviews/", label: "What students say about our tutors" },
      { to: "/how-it-works/", label: "How online classes work" },
      { to: "/book-free-trial/", label: "Book a free trial class" },
    ],
  },
  "/reviews/": {
    title: "Ready to start?",
    links: [
      { to: "/tutors/", label: "Meet our Quran tutors" },
      { to: "/courses/", label: "Browse all online Quran courses" },
      { to: "/pricing/", label: "Fees & monthly plans" },
      { to: "/book-free-trial/", label: "Book a free trial class" },
    ],
  },
  "/how-it-works/": {
    title: "Choose your course",
    links: [
      ...COURSE_LINKS,
      { to: "/pricing/", label: "Fees & monthly plans" },
      { to: "/faq/", label: "Frequently asked questions" },
    ],
  },
  "/faq/": {
    title: "Still deciding?",
    links: [
      { to: "/how-it-works/", label: "How online classes work" },
      { to: "/pricing/", label: "Fees & monthly plans" },
      { to: "/tutors/", label: "Meet our Quran tutors" },
      { to: "/blog/how-to-teach-quran-to-kids-at-home/", label: "How to teach Quran to kids at home" },
      { to: "/blog/how-long-does-it-take-to-memorize-the-quran/", label: "How long does Hifz take?" },
      { to: "/contact/", label: "Contact us" },
    ],
  },
  "/pricing/": {
    title: "Compare courses",
    links: [
      ...COURSE_LINKS,
      { to: "/reviews/", label: "Student reviews" },
      { to: "/faq/", label: "Frequently asked questions" },
    ],
  },
  "/contact/": {
    title: "Helpful pages",
    links: [
      { to: "/faq/", label: "Frequently asked questions" },
      { to: "/how-it-works/", label: "How online classes work" },
      { to: "/pricing/", label: "Fees & monthly plans" },
      { to: "/courses/", label: "All online Quran courses" },
    ],
  },
  "/terms-of-service/": {
    title: "Related pages",
    links: [
      { to: "/privacy-policy/", label: "Privacy policy" },
      { to: "/pricing/", label: "Fees & monthly plans" },
      { to: "/faq/", label: "Frequently asked questions" },
      { to: "/contact/", label: "Contact us" },
    ],
  },
  "/privacy-policy/": {
    title: "Related pages",
    links: [
      { to: "/terms-of-service/", label: "Terms of service" },
      { to: "/faq/", label: "Frequently asked questions" },
      { to: "/contact/", label: "Contact us" },
    ],
  },
};

export function RelatedLinks({ pathname }: { pathname: string }) {
  const key = pathname.endsWith("/") ? pathname : pathname + "/";
  const set = SETS[key];
  if (!set) return null;
  return (
    <nav
      aria-label={set.title}
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 24px 56px",
        borderTop: "1px solid var(--page-card-border)",
      }}
    >
      <h2
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(22px,3vw,30px)",
          fontWeight: 700,
          color: "var(--on-surface)",
          margin: "0 0 16px",
        }}
      >
        {set.title}
      </h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 12px",
        }}
      >
        {set.links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              style={{
                display: "inline-block",
                padding: "9px 16px",
                borderRadius: 999,
                border: "1px solid var(--page-card-border)",
                background: "var(--page-card-bg)",
                color: "var(--on-surface)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
