import type { Tutor } from "../types";

export type TutorCardModel = Tutor & {
  title: string;
  availability: string;
  verified: boolean;
  students: number;
  reviewCount: number;
  bio: string;
};

function formatAvailability(availabilityText: string): string {
  if (/flex|24\/7/i.test(availabilityText)) return "Flexible schedule";
  const trimmed = availabilityText.replace(/^Available:\s*/i, "").trim();
  return trimmed || "Flexible schedule";
}

export function mapTutorForUI(tutor: Tutor): TutorCardModel {
  const primary = tutor.specialties[0] ?? "Quran";
  return {
    ...tutor,
    title: tutor.title ?? `${primary} Specialist`,
    availability: formatAvailability(tutor.availabilityText),
    verified: tutor.badges.includes("Verified"),
    students: tutor.studentsCount,
    reviewCount: tutor.reviewsCount,
    bio:
      tutor.bio ??
      `Certified ${tutor.gender === "Female" ? "female" : "male"} tutor at Alif Laam Meem Academy, specializing in ${tutor.specialties.slice(0, 2).join(" and ")}.`,
  };
}
