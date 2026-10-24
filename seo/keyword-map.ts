/**
 * Keyword themes per page (search intent mapping).
 * Volume/difficulty: not measured here — treat as unknown unless you use an external tool.
 *
 * Future article ideas (create only with genuine, useful content):
 * - How to Start Learning the Quran Online
 * - Noorani Qaida for Beginners: What Parents Should Know
 * - Quran Recitation vs Tajweed: What's the Difference?
 * - How to Choose Online Quran Classes for Children
 */
export type KeywordTheme = {
  primary: string;
  secondary: string[];
};

export const PAGE_KEYWORD_THEMES: Record<string, KeywordTheme> = {
  "/": {
    primary: "online Quran classes / online Quran academy",
    secondary: [
      "learn Quran online",
      "online Quran lessons for kids",
      "online Quran classes for adults",
      "one-to-one Quran classes",
      "free Quran trial class",
    ],
  },
  "/courses": {
    primary: "online Quran courses",
    secondary: ["Quran academy programs", "Islamic education online"],
  },
  "/pricing": {
    primary: "affordable online Quran classes",
    secondary: ["Quran class pricing", "online Islamic school fees"],
  },
  "/book-free-trial": {
    primary: "free Quran trial class online",
    secondary: ["book online Quran lesson", "try Quran tutor free"],
  },
  "/tutors": {
    primary: "online Quran tutor",
    secondary: ["male and female Quran teachers", "certified Quran tutor online"],
  },
  "/how-it-works": {
    primary: "how online Quran classes work",
    secondary: ["start learning Quran online", "enrollment process"],
  },
  "/faq": {
    primary: "online Quran classes FAQ",
    secondary: ["Quran lessons questions", "online Islamic school help"],
  },
  "/reviews": {
    primary: "online Quran academy reviews",
    secondary: ["student testimonials Quran online"],
  },
  "/contact": {
    primary: "contact Quran academy",
    secondary: ["WhatsApp Quran classes inquiry"],
  },
  "/course/noorani-qaida": {
    primary: "Noorani Qaida online",
    secondary: ["Quran reading for beginners", "Qaida classes for kids"],
  },
  "/course/quran-tajweed": {
    primary: "Quran Tajweed classes online",
    secondary: ["learn Tajweed online", "Quran recitation rules"],
  },
  "/course/hifz-memorization": {
    primary: "Quran memorization online / Hifz classes",
    secondary: ["online Hifz program", "memorize Quran with tutor"],
  },
  "/course/arabic-communication": {
    primary: "online Arabic classes",
    secondary: ["learn Arabic for Quran", "Arabic communication course"],
  },
  "/course/islamic-studies-kids": {
    primary: "online Islamic studies for kids",
    secondary: ["Islamic education children online", "Seerah for kids"],
  },
  "/course/tafsir-meaning": {
    primary: "Quran Tafsir classes online",
    secondary: ["understand Quran meaning", "Tafsir course online"],
  },
  "/privacy-policy": {
    primary: "Alif Laam Meem Academy privacy policy",
    secondary: ["online Quran academy privacy", "student data protection"],
  },
  "/terms-of-service": {
    primary: "Alif Laam Meem Academy terms of service",
    secondary: ["online Quran classes terms", "Quran academy enrolment terms"],
  },
};
