/** Public image paths — SEO-friendly filenames (lowercase, hyphens, keywords). */
const base = "/assets/images";

export const courseImages = {
  nooraniQaida: `${base}/noorani-qaida-online-quran-course-alif-laam-meem.jpg`,
  quranTajweed: `${base}/online-quran-tajweed-classes-alif-laam-meem.jpg`,
  hifzMemorization: `${base}/online-quran-hifz-memorization-course.jpg`,
  arabicCommunication: `${base}/learn-arabic-online-for-quran-alif-laam-meem.jpg`,
  islamicStudiesKids: `${base}/islamic-studies-for-kids-online-quran-classes.jpg`,
  tafsirMeaning: `${base}/online-quran-tafsir-meaning-course.jpg`,
} as const;

export const tutorImages = {
  maleTutor: `${base}/certified-male-quran-tutor-online-alif-laam-meem.jpeg`,
  femaleTutor: `${base}/certified-female-quran-tutor-online-alif-laam-meem.jpeg`,
  scholar: `${base}/online-quran-scholar-teacher-alif-laam-meem.png`,
} as const;

/** Default social / OG share image */
export const SITE_OG_IMAGE_PATH = `${base}/muslim-children-learning-quran-online-alif-laam-meem-academy.jpg`;

export const homeHeroImage = `${base}/online-quran-academy-hero-alif-laam-meem.png`;
