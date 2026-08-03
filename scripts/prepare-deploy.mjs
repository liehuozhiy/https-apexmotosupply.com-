import { cp, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const deployDir = path.join(root, "deploy");

const copies = [
  ["frontend/pages", "deploy"],
  ["frontend/public", "deploy"],
  ["admin/assets", "deploy/admin/assets"],
  ["frontend/assets/css", "deploy/assets/css"],
  ["frontend/assets/js", "deploy/assets/js"],
  ["frontend/assets/templates", "deploy/assets/templates"],
  ["frontend/assets/vendor", "deploy/assets/vendor"],
  ["frontend/assets/video", "deploy/assets/video"],
  // Product-grid cards are resolved at runtime from each product slug.
  ["frontend/assets/img/products/3.4", "deploy/assets/img/products/3.4"]
];

const imageReferencePattern = /(?:\.\.\/assets\/img|\/assets\/img|assets\/img|\.\.\/img|\.\/img|img)\/[^\s"'`()<>]+?\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?[^\s"'`()<>]*)?/gi;
const textExtensions = new Set([".css", ".html", ".js", ".json", ".svg", ".txt", ".xml"]);

async function walkFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(fullPath));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

async function copyReferencedImages() {
  const copied = new Set();
  let discovered = true;

  while (discovered) {
    discovered = false;
    const deployFiles = await walkFiles(deployDir);
    for (const filePath of deployFiles) {
      if (!textExtensions.has(path.extname(filePath).toLowerCase())) continue;
      const contents = await readFile(filePath, "utf8");
      for (const match of contents.matchAll(imageReferencePattern)) {
        const rawReference = match[0].split(/[?#]/, 1)[0];
        if (rawReference.includes("${")) continue;
        const assetMarker = "assets/img/";
        const assetIndex = rawReference.indexOf(assetMarker);
        let relativeAsset;
        if (assetIndex >= 0) {
          // Runtime JS strings are resolved against the document, not the JS file.
          relativeAsset = rawReference.slice(assetIndex);
        } else {
          const basePath = path.relative(deployDir, filePath).split(path.sep).join("/");
          const pathname = new URL(rawReference, `https://deploy.local/${basePath}`).pathname;
          relativeAsset = decodeURIComponent(pathname).replace(/^\/+/, "");
        }
        if (!relativeAsset.startsWith("assets/img/") || copied.has(relativeAsset)) continue;

        const source = path.join(root, "frontend", relativeAsset);
        const sourceStats = await stat(source).catch(() => null);
        if (!sourceStats?.isFile()) throw new Error(`Missing referenced image: ${relativeAsset}`);

        const destination = path.join(deployDir, relativeAsset);
        await mkdir(path.dirname(destination), { recursive: true });
        await cp(source, destination);
        copied.add(relativeAsset);
        discovered = true;
      }
    }
  }

  return copied;
}

await rm(deployDir, { recursive: true, force: true });
await mkdir(deployDir, { recursive: true });

for (const [from, to] of copies) {
  await cp(path.join(root, from), path.join(root, to), { recursive: true });
}

await cp(path.join(root, "admin/pages/admin.html"), path.join(root, "deploy/admin/index.html"));
const referencedImages = await copyReferencedImages();

console.log(`Prepared Cloudflare assets in deploy/ (${referencedImages.size} referenced images)`);
