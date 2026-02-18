
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Tutor {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  photoUrl: string;
  badges: string[];
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  specialties: string[];
  languages: string[];
  experienceYears: number;
  availabilityText: string;
  recitationSampleTitle: string;
  recitationSampleUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Lead {
  id: string;
  type: 'trial' | 'contact';
  name: string;
  email: string;
  phone: string;
  country: string;
  ageGroup?: string;
  courseInterest?: string;
  preferredDays?: string[];
  preferredTime?: string;
  teacherPreference?: 'Male' | 'Female' | 'Any';
  message?: string;
  createdAt: string;
}
