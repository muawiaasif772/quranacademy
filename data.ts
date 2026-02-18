
import { Course, Tutor, Testimonial, FAQ } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Noorani Qaida for Beginners',
    slug: 'noorani-qaida',
    description: 'The foundation of Quran reading. Perfect for children and adults starting from scratch.',
    longDescription: 'Our Noorani Qaida course is designed to build a strong foundation for reading the Quran. We focus on letter recognition, correct pronunciation (Makharij), and basic joining of letters using the proven Noorani Qaida methodology. Students learn to recognize the Arabic alphabet in its various forms and master the basic rules of phonetic articulation.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
    features: ['Letter recognition', 'Makharij (Pronunciation)', 'Vowels & Symbols', 'Joining rules', 'Basic Tajweed foundations'],
    duration: '3-6 Months',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Quran with Tajweed',
    slug: 'quran-tajweed',
    description: 'Learn to recite the Quran with beautiful melody and perfect grammatical accuracy.',
    longDescription: 'Master the art of Tajweed. This course covers advanced rules including Ikhfa, Idgham, Iqlab, and Madd. Our tutors will guide you through every verse to ensure your recitation mimics the authentic Prophetic tradition. We focus on the linguistic precision required to protect the meaning of the Divine text.',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
    features: ['Advanced Tajweed rules', 'Melodious recitation', 'Rhythmical breathing', 'Verse analysis', 'Correcting common mistakes'],
    duration: '12 Months',
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Hifz (Quran Memorization)',
    slug: 'hifz-memorization',
    description: 'Structured program to help you memorize the Holy Quran with proper revision techniques.',
    longDescription: 'Our Hifz program is tailored to the individual pace of each student. We use a three-pronged approach: New Lesson (Sabaq), Recent Revision (Sabqi), and Old Revision (Manzil) to ensure the Quran stays in your heart forever. Our teachers provide spiritual motivation and proven memory retention strategies.',
    image: '/assets/images/Gemini_Generated_Image_z0y8vez0y8vez0y8.png',
    features: ['Personalized pace', 'Revision strategies', 'Dua for memory', 'Ijazah preparation', 'Spiritual mentorship'],
    duration: 'Variable',
    level: 'Advanced'
  },
  {
    id: '4',
    title: 'Arabic for Communication',
    slug: 'arabic-communication',
    description: 'Master Modern Standard Arabic (MSA) for daily conversation and understanding Quranic text.',
    longDescription: 'Bridge the gap between reading and understanding. This course focuses on vocabulary, grammar (Nahw & Sarf), and conversation. Ideal for those who want to understand the meaning of the Quran directly without relying on translations. We use interactive methods to build confidence in speaking.',
    image: '/assets/images/Gemini_Generated_Image_z0y8vez0y8vez0y8.png',
    features: ['Daily conversation', 'Grammar essentials', 'Vocabulary building', 'Reading & Writing', 'Sentence construction'],
    duration: '6-9 Months',
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Islamic Studies for Kids',
    slug: 'islamic-studies-kids',
    description: 'Comprehensive curriculum covering Seerah, Akhlaq, Fiqh, and Islamic History for children.',
    longDescription: 'Nurture the next generation with authentic Islamic knowledge. Our interactive curriculum covers the lives of the Prophets, daily Duas, 5 Pillars of Islam, and character building (Akhlaq). We make learning engaging through stories, quizzes, and moral lessons applied to modern life.',
    image: 'https://images.unsplash.com/photo-1623039405147-547794f92e9e?auto=format&fit=crop&q=80&w=800',
    features: ['Prophetic Stories', 'Daily Duas', '5 Pillars of Islam', 'Manners & Ethics', 'Interactive Quizzes'],
    duration: 'Continuous',
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Tafsir & Quranic Meaning',
    slug: 'tafsir-meaning',
    description: 'Deep dive into the context, history, and spiritual depth of the Quranic verses.',
    longDescription: 'Go beyond the words. This advanced course explores the "Asbab al-Nuzul" (Reasons for Revelation) and the linguistic nuances that define the Quranic miracle. Taught by scholars well-versed in classical exegesis, this course aims to transform your spiritual relationship with Allah\'s message.',
    image: '/assets/images/Gemini_Generated_Image_z0y8vez0y8vez0y8.png',
    features: ['Historical context', 'Linguistic miracles', 'Practical application', 'Comparative Tafsir', 'Spiritual insights'],
    duration: '12-18 Months',
    level: 'Advanced'
  }
];

export const TUTORS: Tutor[] = [
  {
    id: 't1',
    name: 'Sheikh Ahmed Al-Mansouri',
    gender: 'Male',
    photoUrl: '/assets/images/WhatsApp Image 2026-02-18 at 3.50.41 AM (1).jpeg',
    badges: ['Verified', 'Al-Azhar Trained', 'Hifz Expert'],
    rating: 4.9,
    reviewsCount: 124,
    studentsCount: 850,
    specialties: ['Tajweed', 'Hifz', 'Qira\'at'],
    languages: ['Arabic', 'English'],
    experienceYears: 15,
    availabilityText: 'Available: Mon - Fri',
    recitationSampleTitle: 'Surah Al-Fatiha',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 't2',
    name: 'Ustadhah Mariam Yusuf',
    gender: 'Female',
    photoUrl: '/assets/images/WhatsApp Image 2026-02-18 at 3.50.41 AM.jpeg',
    badges: ['Verified', 'Kids Specialist', 'Female Only'],
    rating: 5.0,
    reviewsCount: 210,
    studentsCount: 1200,
    specialties: ['Arabic', 'Noorani Qaida', 'Islamic Studies'],
    languages: ['English', 'Urdu', 'Arabic'],
    experienceYears: 8,
    availabilityText: 'Available: Weekends',
    recitationSampleTitle: 'Surah An-Nas',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 't3',
    name: 'Sheikh Dr. Ibrahim Khalil',
    gender: 'Male',
    photoUrl: '/assets/images/chacho.PNG',
    badges: ['Verified', 'Ijazah Holder', 'Arabic Specialist'],
    rating: 4.8,
    reviewsCount: 95,
    studentsCount: 430,
    specialties: ['Arabic Grammar', 'Nahw', 'Sarf'],
    languages: ['Arabic', 'English', 'French'],
    experienceYears: 20,
    availabilityText: 'Available: Daily',
    recitationSampleTitle: 'Surah Ar-Rahman',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 't4',
    name: 'Ustadhah Fatima Zahra',
    gender: 'Female',
    photoUrl: '/assets/images/chacho.PNG',
    badges: ['Verified', 'Kids Specialist', 'Tajweed Pro'],
    rating: 4.9,
    reviewsCount: 156,
    studentsCount: 620,
    specialties: ['Tajweed', 'Noorani Qaida', 'Dua & Adhkar'],
    languages: ['English', 'Arabic'],
    experienceYears: 6,
    availabilityText: 'Available: Evenings',
    recitationSampleTitle: 'Surah Al-Falaq',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: 't5',
    name: 'Sheikh Mahmoud Hassan',
    gender: 'Male',
    photoUrl: '/assets/images/WhatsApp Image 2026-02-18 at 3.50.41 AM.jpeg',
    badges: ['Verified', 'Ten Qira\'at', 'Al-Azhar Trained'],
    rating: 4.9,
    reviewsCount: 188,
    studentsCount: 940,
    specialties: ['Qira\'at', 'Tajweed', 'Hifz'],
    languages: ['Arabic', 'English', 'Turkish'],
    experienceYears: 12,
    availabilityText: 'Available: Morning/Evening',
    recitationSampleTitle: 'Surah Al-Mulk',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: 't6',
    name: 'Ustadh Zaid Abdullah',
    gender: 'Male',
    photoUrl: '/assets/images/WhatsApp Image 2026-02-18 at 3.50.41 AM.jpeg',
    badges: ['Verified', 'Kids Specialist', 'Beginner Friendly'],
    rating: 4.7,
    reviewsCount: 74,
    studentsCount: 310,
    specialties: ['Noorani Qaida', 'Basic Arabic', 'Salah Lessons'],
    languages: ['English', 'Malay'],
    experienceYears: 5,
    availabilityText: 'Available: Weekdays',
    recitationSampleTitle: 'Surah Al-Ikhlas',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  },
  {
    id: 't7',
    name: 'Ustadhah Aisha Siddiqua',
    gender: 'Female',
    photoUrl: '/assets/images/WhatsApp Image 2026-02-18 at 3.50.41 AM (1).jpeg',
    badges: ['Verified', 'Ijazah Holder', 'Hifz Teacher'],
    rating: 5.0,
    reviewsCount: 312,
    studentsCount: 1500,
    specialties: ['Hifz', 'Tajweed', 'Revision'],
    languages: ['English', 'Urdu', 'Hindi'],
    experienceYears: 14,
    availabilityText: 'Available: 24/7 (Flex)',
    recitationSampleTitle: 'Surah Ya-Sin',
    recitationSampleUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
  },
  {
    id: 't8',
    name: 'Sheikh Kareem Ali',
    gender: 'Male',
    photoUrl: '/assets/images/chacho.PNG',
    badges: ['Verified', 'Al-Azhar Trained', 'Arabic Professor'],
    rating: 4.8,
    reviewsCount: 110,
    studentsCount: 480,
    specialties: ['Arabic Literature', 'Quranic Meaning', 'Tafsir'],
    languages: ['Arabic', 'English'],
    experienceYears: 18,
    availabilityText: 'Available: Tue - Sat',
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
    answer: 'Yes! We encourage families to learn together. We offer a 10% discount for the second family member and a 15% discount for the third and subsequent members enrolled.'
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
