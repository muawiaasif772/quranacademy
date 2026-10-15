/** Public paths (from site root). SEO-friendly filenames, lowercase, hyphens. */
export const BRAND_LOGO_PATH =
  "/assets/images/alif-laam-meem-islamic-institute-logo-header.png";
export const BRAND_LOGO_SOURCE_PATH =
  "/assets/images/alif-laam-meem-islamic-institute-logo.png";
export const BRAND_FAVICON_PATH = "/assets/images/alif-laam-meem-favicon.png";
/** Google recommends ≥48×48; used in <link rel="icon" sizes="48x48"> */
export const BRAND_FAVICON_48_PATH =
  "/assets/images/alif-laam-meem-favicon-48x48.png";
export const BRAND_FAVICON_192_PATH =
  "/assets/images/alif-laam-meem-favicon-192x192.png";
/** Matches index.html theme-color and nav background */
export const BRAND_THEME_COLOR = "#062b1b";
export const BRAND_LOGO_ALT = "Alif Laam Meem Islamic Institute";

const siteOrigin = (siteUrl: string) => siteUrl.replace(/\/$/, "");

export const brandLogoAbsolute = (siteUrl: string) =>
  `${siteOrigin(siteUrl)}${BRAND_LOGO_SOURCE_PATH}`;

export const brandFaviconAbsolute = (siteUrl: string, path = BRAND_FAVICON_PATH) =>
  `${siteOrigin(siteUrl)}${path}`;
