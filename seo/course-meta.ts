import type { Course } from "../types";

const BRAND = "Alif Laam Meem Academy";

/** Unique title + description per course (avoids duplicate SEO copy across course pages). */
export const COURSE_PAGE_META: Record<
  string,
  { title: string; description: string }
> = {
  "noorani-qaida": {
    title: `Noorani Qaida Online for Beginners | ${BRAND}`,
    description:
      "Live 1-on-1 Noorani Qaida classes for kids and adults. Learn Arabic letters, pronunciation, and Quran reading foundations with a private online tutor. Book a free trial.",
  },
  "quran-tajweed": {
    title: `Quran Tajweed Classes Online | ${BRAND}`,
    description:
      "Improve Quran recitation with online Tajweed lessons. Private tutor guides you through rules, melody, and correction in live 1-on-1 sessions. Suitable for teens and adults.",
  },
  "hifz-memorization": {
    title: `Online Hifz & Quran Memorization Program | ${BRAND}`,
    description:
      "Structured Hifz (Quran memorization) with a dedicated online tutor. Personalized pace, revision plans, and spiritual support for serious memorization students.",
  },
  "arabic-communication": {
    title: `Online Arabic Classes for Quran & Conversation | ${BRAND}`,
    description:
      "Learn Modern Standard Arabic online with 1-on-1 lessons focused on vocabulary, grammar, and understanding the Quran. Ideal for students who want to move beyond translation.",
  },
  "islamic-studies-kids": {
    title: `Islamic Studies for Kids Online | ${BRAND}`,
    description:
      "Engaging online Islamic Studies for children: Seerah, duas, pillars of Islam, and good character — taught live by caring tutors in one-to-one classes.",
  },
  "tafsir-meaning": {
    title: `Quran Tafsir & Meaning Online | ${BRAND}`,
    description:
      "Study Quranic meaning and context with qualified tutors. Advanced 1-on-1 Tafsir lessons for students who already read Arabic and want deeper understanding.",
  },
};

export function coursePageMeta(course: Course) {
  return (
    COURSE_PAGE_META[course.slug] ?? {
      title: `${course.title} Online | ${BRAND}`,
      description: `${course.description} Live online classes with a private tutor. Book a free trial at ${BRAND}.`,
    }
  );
}
