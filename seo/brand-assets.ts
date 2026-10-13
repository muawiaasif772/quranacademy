/** Public paths (from site root). SEO-friendly filenames, lowercase, hyphens. */
export const BRAND_LOGO_PATH =
  "/assets/images/alif-laam-meem-islamic-institute-logo-header.png";
export const BRAND_LOGO_SOURCE_PATH =
  "/assets/images/alif-laam-meem-islamic-institute-logo.png";
export const BRAND_FAVICON_PATH = "/assets/images/alif-laam-meem-favicon.png";
/** Matches index.html theme-color and nav background */
export const BRAND_THEME_COLOR = "#062b1b";
export const BRAND_LOGO_ALT = "Alif Laam Meem Islamic Institute";

export const brandLogoAbsolute = (siteUrl: string) =>
  `${siteUrl.replace(/\/$/, "")}${BRAND_LOGO_SOURCE_PATH}`;
