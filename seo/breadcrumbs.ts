import { COURSES } from "../data";
import { SITE_URL } from "./seo.config";

const LABELS: Record<string, string> = {
  courses: "Courses",
  pricing: "Pricing",
  "book-free-trial": "Book free trial",
  tutors: "Tutors",
  "how-it-works": "How it works",
  faq: "FAQ",
  contact: "Contact",
  reviews: "Reviews",
  "privacy-policy": "Privacy policy",
  "terms-of-service": "Terms of service",
  course: "Courses",
};

export function buildBreadcrumbJsonLd(pathname: string): Record<string, unknown> | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/") return null;

  const items: { name: string; item: string }[] = [{ name: "Home", item: `${SITE_URL}/` }];
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "course" && segments[1]) {
    const course = COURSES.find((c) => c.slug === segments[1]);
    items.push({ name: "Courses", item: `${SITE_URL}/courses` });
    items.push({
      name: course?.title ?? "Course",
      item: `${SITE_URL}/course/${segments[1]}`,
    });
  } else {
    let acc = "";
    for (const seg of segments) {
      acc += `/${seg}`;
      const name = LABELS[seg] ?? seg.replace(/-/g, " ");
      items.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        item: `${SITE_URL}${acc}`,
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}
