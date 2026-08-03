#!/usr/bin/env node
import fs from "node:fs/promises";

const [baselinePath, generatedPath] = process.argv.slice(2);
if (!baselinePath || !generatedPath) {
  console.error("Usage: node scripts/compare-product-page.mjs <baseline.html> <generated.html>");
  process.exit(2);
}

const [baseline, generated] = await Promise.all([
  fs.readFile(baselinePath, "utf8"),
  fs.readFile(generatedPath, "utf8"),
]);

function collect(html) {
  const body = html
    .replace(/<style\b[\s\S]*?<\/style>/giu, "")
    .replace(/<script\b[\s\S]*?<\/script>/giu, "")
    .replace(/<!--[\s\S]*?-->/gu, "");
  const text = body
    .replace(/<[^>]+>/gu, "\n")
    .split(/\n/gu)
    .map((value) => value.replace(/\s+/gu, " ").trim())
    .filter(Boolean);
  const images = [...body.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*\balt="([^"]+)"[^>]*>/giu)].map(
    ([, src, alt]) => ({ src, alt }),
  );
  const links = [...body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/giu)].map(([, href]) => href);
  return { text, images, links };
}

function firstDifference(left, right) {
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    if (JSON.stringify(left[index]) !== JSON.stringify(right[index])) {
      return { index, baseline: left[index] ?? null, generated: right[index] ?? null };
    }
  }
  return null;
}

const baselineInventory = collect(baseline);
const generatedInventory = collect(generated);
const report = Object.fromEntries(
  Object.keys(baselineInventory).map((key) => [
    key,
    {
      baselineCount: baselineInventory[key].length,
      generatedCount: generatedInventory[key].length,
      identical: JSON.stringify(baselineInventory[key]) === JSON.stringify(generatedInventory[key]),
      firstDifference: firstDifference(baselineInventory[key], generatedInventory[key]),
    },
  ]),
);
console.log(JSON.stringify(report, null, 2));
if (Object.values(report).some((item) => !item.identical)) process.exitCode = 1;
