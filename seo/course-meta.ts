import type { Course } from "../types";

const BRAND = "Alif Laam Meem Academy";

/** Unique title + description per course (avoids duplicate SEO copy across course pages). */
export const COURSE_PAGE_META: Record<
  string,
  { title: string; description: string }
> = {
  "noorani-qaida": {
    title: `Noorani Qaida Online Classes for Kids & Beginners`,
    description:
      "Learn Noorani Qaida online with a private tutor. Live 1-on-1 classes teach Arabic letters, pronunciation and Quran reading for kids and adults. Free trial.",
  },
  "quran-tajweed": {
    title: `Online Quran Tajweed Classes | Alif Laam Meem Academy`,
    description:
      "Learn Quran with Tajweed online. Live 1-on-1 lessons on Ikhfa, Idgham, Madd and fluent recitation with instant correction. Book your free trial class.",
  },
  "hifz-memorization": {
    title: `Online Hifz Classes | Quran Memorization Course`,
    description:
      "Memorize the Quran online with a dedicated Hafiz tutor. Personal Hifz plan, daily revision (Sabaq, Sabqi, Manzil) and 1-on-1 live classes. Try it free.",
  },
  "arabic-communication": {
    title: `Online Arabic Classes for Quran & Speaking | Alif Laam Meem`,
    description:
      "Learn Arabic online in live 1-on-1 lessons: vocabulary, grammar and speaking skills to understand the Quran directly. Kids and adults. Free trial class.",
  },
  "islamic-studies-kids": {
    title: `Online Islamic Studies for Kids | Live Classes`,
    description:
      "Fun online Islamic Studies for kids: Seerah, duas, pillars of Islam and good manners, taught live 1-on-1 by caring tutors. Book a free trial class.",
  },
  "tafsir-meaning": {
    title: `Online Quran Tafsir Classes | Learn Quran Meaning`,
    description:
      "Understand the Quran with live 1-on-1 Tafsir classes. Qualified scholars explain meaning, context and lessons of each Surah. Book your free trial.",
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
