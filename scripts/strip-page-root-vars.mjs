import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const files = [
  "pages/Home.tsx",
  "pages/Courses.tsx",
  "pages/Pricing.tsx",
  "pages/BookTrial.tsx",
  "pages/Tutors.tsx",
  "pages/HowItWorks.tsx",
  "pages/FAQ.tsx",
  "pages/Contact.tsx",
  "pages/Reviews.tsx",
  "pages/Privacypolicy.tsx",
  "pages/Termsofservice.tsx",
  "pages/Coursedetail.tsx",
];

for (const rel of files) {
  const f = path.join(ROOT, rel);
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/\n  :root \{[\s\S]*?\}\n/g, "\n");
  s = s.replace(
    /background: "var\(--deep\)",\n          minHeight/g,
    'background: "var(--page-bg)",\n          color: "var(--page-fg)",\n          minHeight',
  );
  s = s.replace(
    /background: 'var\(--deep\)',\n          minHeight/g,
    "background: 'var(--page-bg)',\n          color: 'var(--page-fg)',\n          minHeight",
  );
  fs.writeFileSync(f, s);
}
console.log("patched", files.length);
