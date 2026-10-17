/**
 * Replace hardcoded dark-theme colors with semantic CSS variables across page TSX files.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const roots = [
  path.join(__dirname, "..", "pages"),
  path.join(__dirname, "..", "components"),
];

const replacements = [
  // Page / section surfaces
  [/background:\s*"var\(--deep\)"/g, 'background: "var(--surface-base)"'],
  [
    /background:\s*\n\s*"linear-gradient\(180deg,var\(--forest\) 0%,var\(--deep\) 10%\)"/g,
    'background:\n              "linear-gradient(180deg,var(--surface-section-from) 0%,var(--surface-section-to) 10%)"',
  ],
  [
    /background:\s*\n\s*"linear-gradient\(180deg,var\(--forest\) 0%,var\(--deep\) 100%\)"/g,
    'background:\n              "linear-gradient(180deg,var(--surface-section-from) 0%,var(--surface-section-to) 100%)"',
  ],
  [
    /background:\s*\n\s*"linear-gradient\(180deg,var\(--deep\) 0%,var\(--forest\) 100%\)"/g,
    'background:\n              "linear-gradient(180deg,var(--surface-section-to) 0%,var(--surface-section-from) 100%)"',
  ],
  [
    /background:\s*\n\s*"radial-gradient\(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%\),radial-gradient\(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%\),#020b06"/g,
    'background: "var(--hero-panel-bg)"',
  ],
  // Text
  [/color:\s*"#fff"/g, 'color: "var(--on-surface)"'],
  [/color:\s*"rgba\(255,255,255,\.55\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.5\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.45\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.4\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.35\)"/g, 'color: "var(--on-surface-faint)"'],
  [/color:\s*"rgba\(255,255,255,\.3\)"/g, 'color: "var(--on-surface-subtle)"'],
  [/color:\s*"rgba\(255,255,255,\.38\)"/g, 'color: "var(--on-surface-faint)"'],
  [/color:\s*"rgba\(255,255,255,\.32\)"/g, 'color: "var(--on-surface-faint)"'],
  [/color:\s*"rgba\(255,255,255,\.42\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.48\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.88\)"/g, 'color: "var(--on-surface)"'],
  [/color:\s*"rgba\(255,255,255,\.8\)"/g, 'color: "var(--on-surface)"'],
  [/color:\s*"rgba\(255,255,255,\.5\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*open \? "#020b06" : "rgba\(255,255,255,\.5\)"/g, 'color: open ? "var(--on-surface)" : "var(--on-surface-muted)"'],
  [/color:\s*isOpen \? "#fff" : "rgba\(255,255,255,\.8\)"/g, 'color: isOpen ? "var(--on-surface)" : "var(--on-surface)"'],
  [/color:\s*isOpen \? "#020b06" : "rgba\(255,255,255,\.45\)"/g, 'color: isOpen ? "var(--on-surface)" : "var(--on-surface-muted)"'],
  [/color:\s*open \? "#020b06" : "rgba\(255,255,255,\.5\)"/g, 'color: open ? "var(--on-surface)" : "var(--on-surface-muted)"'],
  // Chips / mini cards
  [
    /background:\s*"rgba\(255,255,255,\.03\)"/g,
    'background: "var(--surface-chip-bg)"',
  ],
  [
    /border:\s*"1px solid rgba\(255,255,255,\.06\)"/g,
    'border: "1px solid var(--surface-chip-border)"',
  ],
  [
    /background:\s*"rgba\(255,255,255,\.025\)"/g,
    'background: "var(--surface-chip-bg)"',
  ],
  [
    /border:\s*"1px solid rgba\(255,255,255,\.07\)"/g,
    'border: "1px solid var(--surface-chip-border)"',
  ],
  // Sticky nav
  [
    /background:\s*"rgba\(2,11,6,\.97\)"/g,
    'background: "var(--sticky-bar-bg)"',
  ],
  [
    /borderTop:\s*"1px solid rgba\(255,255,255,\.05\)"/g,
    'borderTop: "1px solid var(--sticky-bar-border)"',
  ],
  [
    /borderBottom:\s*"1px solid rgba\(255,255,255,\.05\)"/g,
    'borderBottom: "1px solid var(--sticky-bar-border)"',
  ],
  [
    /"radial-gradient\(ellipse 120% 80% at 50% 50%,#0d4a2a 0%,#020b06 70%\)"/g,
    '"var(--marketing-cta-bg)"',
  ],
  [
    /background:\s*"linear-gradient\(180deg,#020b06 0%,var\(--forest\) 100%\)"/g,
    'background: "linear-gradient(180deg,var(--surface-section-to) 0%,var(--surface-section-from) 100%)"',
  ],
  [/color:\s*"rgba\(255,255,255,\.75\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.7\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.6\)"/g, 'color: "var(--on-surface-muted)"'],
  [/color:\s*"rgba\(255,255,255,\.25\)"/g, 'color: "var(--on-surface-subtle)"'],
  [/color:\s*"rgba\(255,255,255,\.2\)"/g, 'color: "var(--on-surface-subtle)"'],
  [/color:\s*"#020b06"/g, 'color: "var(--on-gold)"'],
];

const rootBlockRe =
  /:root\s*\{\s*--deep:\s*#[0-9a-fA-F]+;\s*--forest:[^}]+\}\s*\n?/g;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const [re, rep] of replacements) {
    const next = content.replace(re, rep);
    if (next !== content) {
      changed = true;
      content = next;
    }
  }

  const stripped = content.replace(rootBlockRe, "");
  if (stripped !== content) {
    changed = true;
    content = stripped;
  }

  if (!content.includes('className="alm-page"')) {
    const shellRe =
      /(<div)\s*\n(\s*style=\{\{\s*\n\s*fontFamily:[^}]+\n\s*background:\s*"var\(--surface-base\)",\s*\n\s*minHeight:\s*"100vh",[^}]+\}\}\s*>)/;
    const next = content.replace(shellRe, '$1\n        className="alm-page"\n$2');
    if (next !== content) {
      changed = true;
      content = next;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("updated", path.basename(filePath));
  }
}

for (const dir of roots) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith(".tsx")) {
      processFile(path.join(dir, name));
    }
  }
}
