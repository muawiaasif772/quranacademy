import { Course, Tutor, Testimonial, FAQ } from './types';
import { courseImages, tutorImages } from './seo/image-assets';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Noorani Qaida for Beginners',
    slug: 'noorani-qaida',
    description: 'The foundation of Quran reading. Perfect for children and adults starting from scratch.',
    longDescription: 'Our Noorani Qaida course is designed to build a strong foundation for reading the Quran. We focus on letter recognition, correct pronunciation (Makharij), and basic joining of letters using the proven Noorani Qaida methodology. Students learn to recognize the Arabic alphabet in its various forms and master the basic rules of phonetic articulation. Lessons are live and one-to-one, and start with a free trial so your tutor can check your level first. Most beginners move from letters to reading short words within the first few weeks, then build up to full verses at their own pace.',
    image: courseImages.nooraniQaida,
    features: ['Letter recognition', 'Makharij (Pronunciation)', 'Vowels & Symbols', 'Joining rules', 'Basic Tajweed foundations'],
    duration: '3-6 Months',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Quran with Tajweed',
    slug: 'quran-tajweed',
    description: 'Learn to recite the Quran with beautiful melody and perfect grammatical accuracy.',
    longDescription: 'Master the art of Tajweed. This course covers advanced rules including Ikhfa, Idgham, Iqlab, and Madd. Our tutors will guide you through every verse to ensure your recitation mimics the authentic Prophetic tradition. We focus on the linguistic precision required to protect the meaning of the Divine text. You will recite live in every lesson and get correction on the spot, not just theory. The course suits teens and adults who can already read Arabic and want a cleaner, more beautiful recitation.',
    image: courseImages.quranTajweed,
    features: ['Advanced Tajweed rules', 'Melodious recitation', 'Rhythmical breathing', 'Verse analysis', 'Correcting common mistakes'],
    duration: '12 Months',
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Hifz (Quran Memorization)',
    slug: 'hifz-memorization',
    description: 'Structured program to help you memorize the Holy Quran with proper revision techniques.',
    longDescription: 'Our Hifz program is tailored to the individual pace of each student. We use a three-pronged approach: New Lesson (Sabaq), Recent Revision (Sabqi), and Old Revision (Manzil) to ensure the Quran stays in your heart forever. Our teachers provide spiritual motivation and proven memory retention strategies. Your tutor sets a realistic daily target, checks new and old revision in every lesson, and adjusts the pace if life gets busy. Parents get regular progress updates, and students can work towards Ijazah when they are ready.',
    image: courseImages.hifzMemorization,
    features: ['Personalized pace', 'Revision strategies', 'Dua for memory', 'Ijazah preparation', 'Spiritual mentorship'],
    duration: 'Variable',
    level: 'Advanced'
  },
  {
    id: '4',
    title: 'Arabic for Communication',
    slug: 'arabic-communication',
    description: 'Master Modern Standard Arabic (MSA) for daily conversation and understanding Quranic text.',
    longDescription: 'Bridge the gap between reading and understanding. This course focuses on vocabulary, grammar (Nahw & Sarf), and conversation. Ideal for those who want to understand the meaning of the Quran directly without relying on translations. We use interactive methods to build confidence in speaking. Classes mix speaking, listening, reading and writing, with examples taken from Quranic Arabic so you start recognising words in salah and recitation. No previous Arabic is needed, and lessons are scheduled around your timezone.',
    image: courseImages.arabicCommunication,
    features: ['Daily conversation', 'Grammar essentials', 'Vocabulary building', 'Reading & Writing', 'Sentence construction'],
    duration: '6-9 Months',
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Islamic Studies for Kids',
    slug: 'islamic-studies-kids',
    description: 'Comprehensive curriculum covering Seerah, Akhlaq, Fiqh, and Islamic History for children.',
    longDescription: 'Nurture the next generation with authentic Islamic knowledge. Our interactive curriculum covers the lives of the Prophets, daily Duas, 5 Pillars of Islam, and character building (Akhlaq). We make learning engaging through stories, quizzes, and moral lessons applied to modern life. Lessons are kept short, visual and interactive, with stories, duas and good manners children can use every day. Parents can sit in on the free trial and choose a male or female tutor for their child.',
    image: courseImages.islamicStudiesKids,
    features: ['Prophetic Stories', 'Daily Duas', '5 Pillars of Islam', 'Manners & Ethics', 'Interactive Quizzes'],
    duration: 'Continuous',
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Tafsir & Quranic Meaning',
    slug: 'tafsir-meaning',
    description: 'Deep dive into the context, history, and spiritual depth of the Quranic verses.',
    longDescription: 'Go beyond the words. This advanced course explores the "Asbab al-Nuzul" (Reasons for Revelation) and the linguistic nuances that define the Quranic miracle. Taught by scholars well-versed in classical exegesis, this course aims to transform your spiritual relationship with Allah\'s message. You need to be able to read Arabic to get the most from this course. Each lesson looks at context, language and practical lessons from the verses, so understanding grows alongside recitation.',
    image: courseImages.tafsirMeaning,
    features: ['Historical context', 'Linguistic miracles', 'Practical application', 'Comparative Tafsir', 'Spiritual insights'],
    duration: '12-18 Months',
    level: 'Advanced'
  }
];

export const TUTORS: Tutor[] = [
  {
    id: 't1',
    name: 'Ustadh Muawia Asif',
    gender: 'Male',
    title: 'Noorani Qaida Specialist',
    bio: 'Ustadh Muawia guides beginners and children through Noorani Qaida, Tajweed foundations, and confident Quran reading in live 1-on-1 classes.',
    photoUrl: tutorImages.maleTutor,
    badges: ['Verified', 'Kids Specialist', 'Beginner Friendly'],
    rating: 4.9,
    reviewsCount: 142,
    studentsCount: 520,
    specialties: ['Noorani Qaida', 'Tajweed', 'Salah Lessons'],
    languages: ['Urdu', 'English', 'Arabic'],
    experienceYears: 10,
    availabilityText: 'Available: Flexible schedule',
    recitationSampleTitle: 'Surah Al-Fatiha',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 't2',
    name: 'Mufti Muhammad Ahmad Bahawalpuri',
    gender: 'Male',
    title: 'Islamic Studies Specialist',
    bio: 'Mufti Muhammad Ahmad teaches Fiqh, Seerah, and authentic Islamic Studies with clarity for students in Urdu and English.',
    photoUrl: tutorImages.scholar,
    badges: ['Verified', 'Mufti', 'Islamic Studies'],
    rating: 5.0,
    reviewsCount: 198,
    studentsCount: 680,
    specialties: ['Islamic Studies', 'Fiqh', 'Seerah'],
    languages: ['Urdu', 'Arabic', 'English'],
    experienceYears: 18,
    availabilityText: 'Available: Flexible schedule',
    recitationSampleTitle: 'Surah An-Nas',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 't3',
    name: 'Hafiz Abdul Basit',
    gender: 'Male',
    title: 'Hifz Specialist',
    bio: 'Hafiz Abdul Basit supports memorization students with structured Sabaq, Sabqi, and Manzil revision plans tailored to each learner.',
    photoUrl: tutorImages.maleTutor,
    badges: ['Verified', 'Hafiz', 'Hifz Teacher'],
    rating: 4.9,
    reviewsCount: 167,
    studentsCount: 410,
    specialties: ['Hifz', 'Tajweed', 'Revision'],
    languages: ['Urdu', 'Arabic', 'English'],
    experienceYears: 12,
    availabilityText: 'Available: Flexible schedule',
    recitationSampleTitle: 'Surah Ar-Rahman',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 't4',
    name: 'Hafiza Maryam Tariq Khan',
    gender: 'Female',
    title: 'Hifz Specialist',
    bio: 'Hafiza Maryam helps sisters and children memorize the Quran with patience, Tajweed correction, and consistent revision support.',
    photoUrl: tutorImages.femaleTutor,
    badges: ['Verified', 'Hafiza', 'Female Only'],
    rating: 5.0,
    reviewsCount: 224,
    studentsCount: 890,
    specialties: ['Hifz', 'Tajweed', 'Noorani Qaida'],
    languages: ['Urdu', 'English', 'Arabic'],
    experienceYears: 9,
    availabilityText: 'Available: Flexible schedule',
    recitationSampleTitle: 'Surah Al-Falaq',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: 't5',
    name: 'Qariah Fatima Zahra',
    gender: 'Female',
    title: 'Tajweed Specialist',
    bio: 'Qariah Fatima Zahra trains students in melodious recitation, Makharij, and Tajweed rules for beautiful, accurate Quran reading.',
    photoUrl: tutorImages.femaleTutor,
    badges: ['Verified', 'Qariah', 'Tajweed Pro'],
    rating: 4.9,
    reviewsCount: 181,
    studentsCount: 640,
    specialties: ['Tajweed', "Qira'at", 'Noorani Qaida'],
    languages: ['Urdu', 'Arabic', 'English'],
    experienceYears: 7,
    availabilityText: 'Available: Flexible schedule',
    recitationSampleTitle: 'Surah Al-Mulk',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: 't6',
    name: 'Dr. Muhammad Ali',
    gender: 'Male',
    title: 'Tafsir Specialist',
    bio: 'Dr. Muhammad Ali guides advanced learners through Tafsir, Quranic meaning, and Arabic to deepen understanding of the Book of Allah.',
    photoUrl: tutorImages.scholar,
    badges: ['Verified', 'PhD', 'Arabic Specialist'],
    rating: 4.8,
    reviewsCount: 96,
    studentsCount: 350,
    specialties: ['Tafsir', 'Quranic Meaning', 'Arabic'],
    languages: ['Arabic', 'Urdu', 'English'],
    experienceYears: 16,
    availabilityText: 'Available: Flexible schedule',
    recitationSampleTitle: 'Surah Al-Kahf',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ts1',
    name: 'Sarah Johnson',
    location: 'United Kingdom',
    text: 'Al-Quran Academy has been a blessing for my two children. Their teacher is patient, professional, and makes learning fun. They look forward to their classes every day! I highly recommend them to all parents looking for quality Islamic education.',
    rating: 5,
    image: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 'ts2',
    name: 'Omar Farooq',
    location: 'Canada',
    text: 'I started from Noorani Qaida as an adult. The 1-on-1 focus helped me overcome my shyness and now I can recite Juz Amma with proper Tajweed. The flexibility of scheduling is perfect for busy professionals.',
    rating: 5,
    image: 'https://picsum.photos/seed/omar/100/100'
  },
  {
    id: 'ts3',
    name: 'Aisha Malik',
    location: 'United States',
    text: 'Finding a qualified female tutor for my daughters was my main priority. The academy provided us with an amazing teacher who is both a scholar and a great mentor. My kids are making rapid progress.',
    rating: 5,
    image: 'https://picsum.photos/seed/aisha/100/100'
  },
  {
    id: 'ts4',
    name: 'Zaid Rahim',
    location: 'Australia',
    text: 'The Hifz program here is outstanding. The revision techniques they taught me have helped me retain what I memorized years ago. The monthly reports keep me motivated and on track.',
    rating: 5,
    image: 'https://picsum.photos/seed/zaid/100/100'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'How do the online classes work?',
    answer: 'Our classes are conducted 1-on-1 via high-quality video conferencing platforms like Zoom or Skype. The teacher and student can share screens, see each other, and use an interactive digital Quran. It feels just like being in the same room!'
  },
  {
    id: 'f2',
    question: 'Can I choose a male or female teacher?',
    answer: 'Absolutely. We have a diverse team of qualified male and female tutors. We prioritize your comfort and can assign a teacher according to your preference for yourself or your children.'
  },
  {
    id: 'f3',
    question: 'What are the class timings?',
    answer: 'We offer 24/7 flexible scheduling. You can choose any time that suits your local timezone and personal schedule. You can also reschedule classes with 24-hour notice.'
  },
  {
    id: 'f4',
    question: 'Is there a discount for multiple family members?',
    answer: 'Yes! We encourage families to learn together. The Family plan covers two students at $75 per month for five classes per week each. Additional siblings get 20% off the standard list price. See the pricing page for the current Lite, Standard and Family plans.'
  },
  {
    id: 'f5',
    question: 'Do I need any special software or equipment?',
    answer: 'You just need a stable internet connection, a computer, tablet, or smartphone, and a headset with a microphone. We handle the rest by providing the digital learning materials.'
  },
  {
    id: 'f6',
    question: 'What if I am not satisfied with my teacher?',
    answer: 'Your satisfaction is our priority. If for any reason you feel the teaching style is not a fit, we will provide a replacement tutor immediately after a quick consultation to understand your needs better.'
  },
  {
    id: 'f7',
    question: 'Is there an age limit for students?',
    answer: 'Not at all! We teach children as young as 5 years old and have many adult students in their 60s and 70s. It is never too early or too late to start your journey with the Quran.'
  }
];
