#!/usr/bin/env node
/**
 * IndexNow: tell Bing (and Yandex, Seznam, Naver…) which pages changed, so new
 * or edited pages are crawled within hours instead of weeks.
 *
 * Usage (run BEFORE uploading the new build):
 *   node scripts/indexnow.mjs detect   -> compares dist/ with the live site,
 *                                         writes changed URLs to .indexnow-urls
 *   node scripts/indexnow.mjs submit   -> run AFTER the upload; submits them
 *
 * Only pages whose HTML actually differs from what is live are submitted:
 * IndexNow asks sites not to resubmit unchanged URLs.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const SITE = "https://aliflaammeeminstitute.online";
const HOST = "aliflaammeeminstitute.online";
const DIST = path.resolve("dist");
const LIST = path.resolve(".indexnow-urls");

function findKey() {
  const file = readdirSync(DIST).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (!file) throw new Error("IndexNow key file (32 hex chars .txt) not found in dist/");
  return file.replace(/\.txt$/, "");
}

function sitemapUrls() {
  const xml = readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function distFileFor(url) {
  const p = new URL(url).pathname.replace(/\/$/, "");
  return path.join(DIST, p, "index.html");
}

async function detect() {
  const changed = [];
  for (const url of sitemapUrls()) {
    const file = distFileFor(url);
    if (!existsSync(file)) continue;
    const next = readFileSync(file, "utf8");
    let live = "";
    try {
      const res = await fetch(url, { headers: { "cache-control": "no-cache" } });
      live = res.ok ? await res.text() : "";
    } catch {
      live = "";
    }
    if (live.trim() !== next.trim()) changed.push(url);
  }
  writeFileSync(LIST, changed.join("\n"));
  console.log(`[indexnow] ${changed.length} changed page(s):`);
  changed.forEach((u) => console.log("  " + u));
}

async function submit() {
  const urls = existsSync(LIST) ? readFileSync(LIST, "utf8").split("\n").filter(Boolean) : [];
  if (urls.length === 0) {
    console.log("[indexnow] nothing changed — no submission.");
    return;
  }
  const key = findKey();
  const body = { host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList: urls.slice(0, 10000) };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = accepted, 202 = accepted (key validation pending). Anything else is
  // logged but never fails the deploy.
  console.log(`[indexnow] submitted ${urls.length} URL(s) → HTTP ${res.status}`);
  if (res.status >= 400) console.log(await res.text().catch(() => ""));
}

const cmd = process.argv[2];
if (cmd === "detect") await detect();
else if (cmd === "submit") await submit();
else {
  console.error("usage: node scripts/indexnow.mjs detect|submit");
  process.exit(1);
}
