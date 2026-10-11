import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * A value to inject into a template.
 * - `string`         → HTML-escaped before insertion (safe for user input)
 * - `{ html: string }` → inserted as-is (caller guarantees it is already safe)
 */
export type TemplateValue = string | { html: string };
export type TemplateValues = Record<string, TemplateValue | undefined>;

function resolveTemplatesDir(): string {
  const fromModule = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../email-templates",
  );
  const candidates = [fromModule, path.join(process.cwd(), "email-templates")];
  for (const dir of candidates) {
    if (existsSync(path.join(dir, "admin-trial-notification.html"))) return dir;
  }
  return fromModule;
}

const TEMPLATES_DIR = resolveTemplatesDir();

const templateCache = new Map<string, string>();

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape user text and turn line breaks into <br /> so multi-line notes keep their shape. */
export function multilineHtml(value: string): { html: string } {
  return { html: escapeHtml(value).replace(/\r?\n/g, "<br />") };
}

function isPresent(value: TemplateValue | undefined): boolean {
  if (value === undefined) return false;
  const text = typeof value === "string" ? value : value.html;
  return text.trim().length > 0;
}

function toHtml(value: TemplateValue | undefined): string {
  if (value === undefined) return "";
  return typeof value === "string" ? escapeHtml(value) : value.html;
}

/**
 * Minimal mustache-style renderer:
 *   {{#if key}} ... {{/if}}  → block kept only when `key` has a non-empty value
 *   {{key}}                  → value inserted (escaped unless provided as { html })
 * Unknown placeholders are replaced with an empty string so raw `{{...}}` never leaks into an email.
 */
export function renderTemplate(template: string, values: TemplateValues): string {
  const withConditionals = template.replace(
    /\{\{#if\s+([\w.-]+)\s*\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_match, key: string, inner: string) => (isPresent(values[key]) ? inner : ""),
  );

  return withConditionals.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_match, key: string) =>
    toHtml(values[key]),
  );
}

export async function loadTemplate(fileName: string): Promise<string> {
  const cached = templateCache.get(fileName);
  if (cached) return cached;

  const html = await readFile(path.join(TEMPLATES_DIR, fileName), "utf8");
  // Cache in production only so template edits show up immediately during development.
  if (process.env.NODE_ENV === "production") templateCache.set(fileName, html);
  return html;
}

export async function renderTemplateFile(fileName: string, values: TemplateValues): Promise<string> {
  return renderTemplate(await loadTemplate(fileName), values);
}
