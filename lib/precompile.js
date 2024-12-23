import path from "node:path";
import fs from "node:fs/promises";
import { fingerprint } from "./fingerprint.js";

export async function precompile(assetPath, publicPath) {
  try {
    try {
      await fs.access(publicPath);
    } catch {
      await fs.mkdir(publicPath, { recursive: true });
    }

    await fs.rm(publicPath, { recursive: true, force: true });
    await fs.cp(assetPath, publicPath, { recursive: true });
    console.log("Assets successfully moved to public/assets.");

    const assets = await fs.readdir(publicPath, { recursive: true });

    for (const asset of assets) {
      const fullPath = path.join(publicPath, asset);

      const stats = await fs.stat(fullPath);
      if (stats.isFile()) {
        const fileHash = fingerprint(fullPath);

        const fileExt = path.extname(asset);
        const fileNameWithoutExt = path.basename(asset, fileExt);
        const newFileName = `${fileNameWithoutExt}-${fileHash}${fileExt}`;
        const newFilePath = path.join(path.dirname(fullPath), newFileName);

        await fs.rename(fullPath, newFilePath);
      }
    }
  } catch (err) {
    console.error("Error during precompiling assets:", err);
  }
}
