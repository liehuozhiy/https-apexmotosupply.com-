import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const deployDir = path.join(root, "deploy");

const copies = [
  ["frontend/pages", "deploy"],
  ["frontend/assets", "deploy/assets"],
  ["frontend/public", "deploy"],
  ["admin/assets", "deploy/admin/assets"]
];

await rm(deployDir, { recursive: true, force: true });
await mkdir(deployDir, { recursive: true });

for (const [from, to] of copies) {
  await cp(path.join(root, from), path.join(root, to), { recursive: true });
}

await cp(path.join(root, "admin/pages/admin.html"), path.join(root, "deploy/admin/index.html"));

console.log("Prepared Cloudflare assets in deploy/");
