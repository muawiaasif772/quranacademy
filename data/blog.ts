/**
 * Blog articles. Each post targets one search question parents and students
 * actually type into Google, answers it fully, and links to the matching
 * course + the free trial. Add new posts at the TOP of the array.
 *
 * Block types keep the content framework-free so the same data drives the
 * React page, the prerendered HTML, the sitemap and the JSON-LD.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "tip"; text: string }
  | { type: "cta"; text: string; href: string; label: string };

export interface BlogPost {
  slug: string;
  /** Visible H1 on the article. */
  title: string;
  /** <title> tag, ≤ 60 chars. */
  metaTitle: string;
  /** Meta description, 120–160 chars. */
  description: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated: string;
  author: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  /** Short summary for the blog list card. */
  excerpt: string;
  /** Main search phrase this article targets (for internal planning). */
  keyword: string;
  /** Course slug the article promotes. */
  relatedCourse?: string;
  body: BlogBlock[];
  faqs?: { q: string; a: string }[];
}

const AUTHOR = "Alif Laam Meem Academy";

export const BLOG_POSTS: BlogPost[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "how-many-letters-in-arabic-alphabet",
    title: "How Many Letters Are in the Arabic Alphabet? Full List in Order",
    metaTitle: "How Many Letters Are in the Arabic Alphabet? (28 Letters)",
    description:
      "The Arabic alphabet has 28 letters. See all of them in order with names, sounds and tips for kids and beginners learning to read the Quran.",
    published: "2026-11-20",
    updated: "2026-11-20",
    author: AUTHOR,
    readMinutes: 6,
    image: "/assets/images/learn-arabic-online-for-quran-alif-laam-meem.jpg",
    imageAlt: "Arabic alphabet letters for beginners learning to read the Quran",
    excerpt:
      "The Arabic alphabet has 28 letters, written right to left. Here is the complete list in order, with each letter's name and sound.",
    keyword: "how many letters are in the arabic alphabet",
    relatedCourse: "noorani-qaida",
    body: [
      {
        type: "p",
        text: "The Arabic alphabet has 28 letters. It is written and read from right to left, and every letter is a consonant: short vowels are shown with small marks (harakat) above or below the letters. Once a child or adult knows these 28 letters and their sounds, they have the foundation for reading the Quran.",
      },
      {
        type: "tip",
        text: "Quick answer: 28 letters, from Alif (ا) to Ya (ي). Some teachers count Hamza (ء) as a 29th letter, because it has its own sound but usually sits on Alif, Waw or Ya.",
      },
      { type: "h2", text: "All 28 Arabic letters in order", id: "list" },
      {
        type: "table",
        caption: "The Arabic alphabet in its standard order",
        head: ["#", "Letter", "Name", "Sound (approximate)"],
        rows: [
          ["1", "ا", "Alif", "a (long vowel carrier)"],
          ["2", "ب", "Ba", "b"],
          ["3", "ت", "Ta", "t"],
          ["4", "ث", "Tha", "th as in “think”"],
          ["5", "ج", "Jeem", "j"],
          ["6", "ح", "Ha", "breathy h from the throat"],
          ["7", "خ", "Kha", "kh, like Scottish “loch”"],
          ["8", "د", "Dal", "d"],
          ["9", "ذ", "Dhal", "th as in “this”"],
          ["10", "ر", "Ra", "rolled r"],
          ["11", "ز", "Zay", "z"],
          ["12", "س", "Seen", "s"],
          ["13", "ش", "Sheen", "sh"],
          ["14", "ص", "Saad", "heavy s"],
          ["15", "ض", "Daad", "heavy d"],
          ["16", "ط", "Taa", "heavy t"],
          ["17", "ظ", "Dhaa", "heavy th (as in “this”)"],
          ["18", "ع", "Ain", "deep sound from the middle of the throat"],
          ["19", "غ", "Ghain", "gh, like a French r"],
          ["20", "ف", "Fa", "f"],
          ["21", "ق", "Qaf", "deep q from the back of the throat"],
          ["22", "ك", "Kaf", "k"],
          ["23", "ل", "Lam", "l"],
          ["24", "م", "Meem", "m"],
          ["25", "ن", "Noon", "n"],
          ["26", "ه", "Ha", "soft h"],
          ["27", "و", "Waw", "w (or long oo)"],
          ["28", "ي", "Ya", "y (or long ee)"],
        ],
      },
      { type: "h2", text: "Why do some people say 29 letters?", id: "29-letters" },
      {
        type: "p",
        text: "Hamza (ء) is the glottal stop: the small catch in your throat in the middle of “uh-oh”. It has its own sound, so some books list it separately and arrive at 29. Most Quran teachers and the Noorani Qaida treat it together with Alif, which is why 28 is the common answer.",
      },
      { type: "h2", text: "Letters change shape inside a word", id: "shapes" },
      {
        type: "p",
        text: "Arabic is joined-up writing. Most letters have up to four forms: on their own, at the start of a word, in the middle and at the end. For example, Ba looks like ب on its own but becomes a small tooth with a dot when it is joined: بـ ـبـ ـب. Six letters (ا د ذ ر ز و) never join to the letter after them, which is why you see small gaps inside some words.",
      },
      { type: "h2", text: "The letters beginners find hardest", id: "hard-letters" },
      {
        type: "p",
        text: "Most English and Urdu speakers learn the easy letters (ب ت م ن ل) in the first lesson. The ones that need a teacher's ear are the throat and heavy letters, because a wrong sound can change the meaning of a word in the Quran:",
      },
      {
        type: "ul",
        items: [
          "ح vs ه: both are “h”, but ح is a breathy sound from the middle of the throat and ه is soft and light.",
          "ع: has no English equivalent; it is produced by tightening the middle of the throat.",
          "ق vs ك: ق comes from the very back of the tongue, ك from further forward.",
          "The heavy letters ص ض ط ظ: the back of the tongue rises, giving a deeper, fuller sound than س د ت ذ.",
        ],
      },
      { type: "h2", text: "How to learn the Arabic alphabet quickly", id: "learn" },
      {
        type: "ol",
        items: [
          "Learn 3–4 letters a day, not all 28 at once. Most children know the whole alphabet in 2–3 weeks this way.",
          "Say each letter out loud while tracing it. Sound and shape together stick much faster than looking alone.",
          "Group look-alike letters: ب ت ث differ only by their dots, and so do ج ح خ.",
          "Move to joined letters and short vowels (Fatha, Kasra, Damma) as soon as single letters feel easy. This is exactly the order of the Noorani Qaida.",
          "Get a teacher to check your pronunciation early. Fixing a wrong habit later takes much longer than learning it right.",
        ],
      },
      {
        type: "cta",
        text: "Want your child to learn the Arabic letters with correct pronunciation from day one? Our Noorani Qaida course is taught live, one-to-one, by a certified tutor.",
        href: "/course/noorani-qaida/",
        label: "See the Noorani Qaida course",
      },
    ],
    faqs: [
      {
        q: "How many letters are in the Arabic alphabet?",
        a: "There are 28 letters in the Arabic alphabet, from Alif (ا) to Ya (ي). Some books count Hamza (ء) separately, which gives 29.",
      },
      {
        q: "Is Arabic written left to right or right to left?",
        a: "Arabic is written and read from right to left. Numbers inside Arabic text are still written left to right.",
      },
      {
        q: "How long does it take to learn the Arabic alphabet?",
        a: "Most children and adults learn to recognise all 28 letters in 2–3 weeks with short daily practice. Pronouncing the throat and heavy letters correctly usually takes a few more weeks with a teacher.",
      },
      {
        q: "Are there vowels in the Arabic alphabet?",
        a: "The 28 letters are consonants, although Alif, Waw and Ya also carry long vowel sounds. Short vowels are written as small marks called Fatha, Kasra and Damma above or below the letters.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "how-long-does-it-take-to-memorize-the-quran",
    title: "How Long Does It Take to Memorize the Quran (Hifz)?",
    metaTitle: "How Long Does It Take to Memorize the Quran? Hifz Guide",
    description:
      "Most students complete Hifz in 2–5 years. See realistic timelines by daily pages, a sample schedule, and tips that help kids and adults memorize faster.",
    published: "2026-11-20",
    updated: "2026-11-20",
    author: AUTHOR,
    readMinutes: 7,
    image: "/assets/images/online-quran-hifz-memorization-course.jpg",
    imageAlt: "Student memorizing the Quran during an online Hifz class",
    excerpt:
      "Full-time students often finish in 1–3 years, part-time students in 3–5. Here is how to estimate your own Hifz timeline.",
    keyword: "how long does it take to memorize the quran",
    relatedCourse: "hifz-memorization",
    body: [
      {
        type: "p",
        text: "There is no single answer, because Hifz depends on how many lines you memorize each day and how well you revise. As a realistic guide, full-time students in a dedicated Hifz programme usually finish in 1 to 3 years, and part-time students who study after school or work usually finish in 3 to 5 years.",
      },
      {
        type: "tip",
        text: "The standard Madani Mushaf has 604 pages and 30 Juz. If you memorize one new page every day and keep up your revision, the new memorization alone takes about 20 months.",
      },
      { type: "h2", text: "Hifz timeline by daily amount", id: "timeline" },
      {
        type: "table",
        caption: "Approximate time to memorize 604 pages, studying 5 days a week, before final revision",
        head: ["New memorization per day", "Pages per week", "Approximate time"],
        rows: [
          ["5 lines (1/3 page)", "about 1.7", "about 7 years"],
          ["Half a page", "2.5", "about 4.5 years"],
          ["1 page", "5", "about 2.3 years"],
          ["2 pages", "10", "about 14 months"],
        ],
      },
      {
        type: "p",
        text: "These numbers only cover new lessons. Most students also spend 3 to 6 months at the end strengthening the whole Quran before they can recite it confidently from memory.",
      },
      { type: "h2", text: "What decides how fast you finish", id: "factors" },
      {
        type: "ul",
        items: [
          "Fluent reading first: a student who reads with correct Tajweed memorizes much faster than one who is still sounding out words. This is why Noorani Qaida and Tajweed come before Hifz.",
          "Age: children of 7–12 often memorize quickly, but adults usually understand more and are more disciplined. Both finish Hifz every year.",
          "Daily consistency: 45 focused minutes every day beats three hours once a week.",
          "Revision system: students who skip revision forget earlier Juz and lose months relearning them.",
          "A teacher who listens daily: hearing mistakes corrected immediately stops them from being memorized permanently.",
        ],
      },
      { type: "h2", text: "The Sabaq, Sabqi and Manzil method", id: "method" },
      {
        type: "p",
        text: "Most Hifz teachers use three daily parts. The names vary between countries, but the idea is the same:",
      },
      {
        type: "ol",
        items: [
          "Sabaq: the new lesson of the day, recited to the teacher without looking.",
          "Sabqi: the last few days or the current Juz, revised so the new lessons settle.",
          "Manzil: older Juz, revised in rotation so nothing already memorized is forgotten.",
        ],
      },
      { type: "h2", text: "A sample daily schedule (part-time)", id: "schedule" },
      {
        type: "ul",
        items: [
          "Before Fajr or after Fajr: read tomorrow's new page 10–15 times while looking.",
          "Class time (30–45 minutes): recite the Sabaq and Sabqi to your teacher.",
          "Evening: recite one quarter to half a Juz of Manzil, ideally in Salah.",
        ],
      },
      { type: "h2", text: "Can you do Hifz online?", id: "online" },
      {
        type: "p",
        text: "Yes. In one-to-one online Hifz classes, the teacher hears every word just as in a madrasa, and parents can listen in. Many families choose online Hifz because the child can study at home, at fixed times, without long travel, and the plan can be adjusted to the child's school timetable.",
      },
      {
        type: "cta",
        text: "Our Hifz tutors build a personal plan for each student, with daily Sabaq, Sabqi and Manzil in live one-to-one classes.",
        href: "/course/hifz-memorization/",
        label: "See the online Hifz course",
      },
    ],
    faqs: [
      {
        q: "How long does it take to memorize the whole Quran?",
        a: "Full-time students usually take 1–3 years and part-time students 3–5 years. Memorizing one page a day, five days a week, takes about 2.3 years plus a few months of final revision.",
      },
      {
        q: "What is the best age to start Hifz?",
        a: "Many children start between 6 and 10 once they can read the Quran fluently with Tajweed. Adults can also complete Hifz; consistency matters more than age.",
      },
      {
        q: "How many pages should I memorize a day?",
        a: "Beginners often start with 5 lines a day and build up to half a page or one page. It is better to memorize less and revise well than to memorize more and forget it.",
      },
      {
        q: "Can I memorize the Quran online?",
        a: "Yes. A qualified Hafiz teacher can hear and correct your recitation in live one-to-one online classes, exactly as in a madrasa.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "how-to-teach-quran-to-kids-at-home",
    title: "How to Teach Quran to Kids at Home: A Step-by-Step Guide for Parents",
    metaTitle: "How to Teach Quran to Kids at Home: Parents' Guide",
    description:
      "A practical guide for parents: when to start, what to teach first, a 15-minute daily routine, and how to keep children motivated while learning Quran at home.",
    published: "2026-11-20",
    updated: "2026-11-20",
    author: AUTHOR,
    readMinutes: 8,
    image: "/assets/images/muslim-children-learning-quran-online-alif-laam-meem-academy.jpg",
    imageAlt: "Muslim children learning Quran at home with their parent",
    excerpt:
      "When to start, what to teach first, and a simple daily routine that keeps children learning Quran happily at home.",
    keyword: "how to teach quran to kids at home",
    relatedCourse: "noorani-qaida",
    body: [
      {
        type: "p",
        text: "Teaching your child the Quran at home is one of the most rewarding things a parent can do, and you do not need to be a scholar to start. What children need most is a short routine every day, the right order of lessons, and a lot of encouragement. This guide walks you through each step.",
      },
      { type: "h2", text: "When should children start learning Quran?", id: "age" },
      {
        type: "p",
        text: "Most children are ready to start reading at around 4 to 5 years old, when they can sit and focus for 10–15 minutes. Before that, you can play recitation in the house and teach short Surahs like Al-Fatiha and Al-Ikhlas by listening and repeating.",
      },
      { type: "h2", text: "Step 1: Start with short Surahs by listening", id: "step-1" },
      {
        type: "p",
        text: "Children memorize by ear long before they can read. Recite one short Surah together every day, one line at a time, and let your child repeat after you. Al-Fatiha, Al-Ikhlas, Al-Falaq and An-Nas are the usual starting point because they are short and used in Salah.",
      },
      { type: "h2", text: "Step 2: Teach the Arabic letters with Noorani Qaida", id: "step-2" },
      {
        type: "p",
        text: "The Noorani Qaida is a small book that teaches reading in a fixed order: single letters, joined letters, short vowels, long vowels, Sukoon, Shaddah and then words. Following it page by page means your child never skips a skill. Aim for 3–4 new letters a day at first.",
      },
      {
        type: "cta",
        text: "Not sure your child's letter sounds are correct? A teacher can check the throat letters (ح ع خ غ) in one free trial lesson.",
        href: "/book-free-trial/",
        label: "Book a free trial class",
      },
      { type: "h2", text: "Step 3: Move from Qaida to reading the Quran", id: "step-3" },
      {
        type: "p",
        text: "When your child can read the last pages of the Qaida smoothly, start reading from the Quran itself, usually from Juz Amma (the 30th Juz) because the Surahs are short. Many children reach this stage in 4 to 8 months of daily practice.",
      },
      { type: "h2", text: "Step 4: Add basic Tajweed", id: "step-4" },
      {
        type: "p",
        text: "Tajweed is the set of rules for reciting correctly: where each letter comes from, and rules such as Ghunnah, Ikhfa and Madd. Introduce one rule at a time while reading, rather than as a separate theory lesson. Children copy what they hear, so listening to a good Qari helps a lot.",
      },
      { type: "h2", text: "A simple 15-minute daily routine", id: "routine" },
      {
        type: "table",
        caption: "Daily Quran routine for children aged 5–10",
        head: ["Minutes", "Activity"],
        rows: [
          ["0–3", "Revise yesterday's lesson"],
          ["3–10", "New Qaida page or new lines from the Quran"],
          ["10–13", "Recite a short Surah you are memorizing together"],
          ["13–15", "Praise, a sticker or a short story about the Prophet ﷺ"],
        ],
      },
      { type: "h2", text: "How to keep your child motivated", id: "motivation" },
      {
        type: "ul",
        items: [
          "Same time every day: after Fajr or after school works for most families.",
          "Short lessons: stop while your child is still enjoying it, not when they are tired.",
          "Celebrate milestones, such as finishing the Qaida, the first Juz, or a new Surah used in Salah.",
          "Let them hear you read Quran too. Children copy what they see at home.",
          "Never use Quran time as a punishment. It should feel like the best part of the day.",
        ],
      },
      { type: "h2", text: "When to get help from a Quran teacher", id: "teacher" },
      {
        type: "p",
        text: "Parents can do a great deal at home, but a qualified teacher makes a difference when your own Tajweed is not confident, when your child keeps repeating the same mistakes, or when you simply cannot find time every day. One-to-one online Quran classes let a certified tutor teach your child at home while you stay in the room.",
      },
      {
        type: "cta",
        text: "Our tutors teach Noorani Qaida, Quran reading and Tajweed to children live, one-to-one, with male and female teachers available.",
        href: "/course/noorani-qaida/",
        label: "See courses for kids",
      },
    ],
    faqs: [
      {
        q: "At what age should a child start learning Quran?",
        a: "Most children can start reading with Noorani Qaida at 4–5 years old. Younger children can begin by listening to and repeating short Surahs.",
      },
      {
        q: "How long does it take a child to read the Quran?",
        a: "With 15–30 minutes of daily practice, many children finish the Noorani Qaida in 4–8 months and then start reading from the Quran.",
      },
      {
        q: "Can I teach my child Quran if my own Tajweed is weak?",
        a: "Yes, you can teach the routine, revision and short Surahs. For correct pronunciation and Tajweed, it helps to have a qualified teacher check your child's recitation regularly.",
      },
      {
        q: "How long should a Quran lesson for kids be?",
        a: "For children aged 5–10, 15 to 30 minutes a day works better than one long weekly lesson.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
