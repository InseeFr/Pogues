#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const copyDirectory = async (source, destination) => {
  const entries = await fs.promises.readdir(source, { withFileTypes: true });
  await fs.promises.mkdir(destination, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const link = await fs.promises.readlink(srcPath);
      await fs.promises.symlink(link, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
};

(async () => {
  try {
    const rootDir = path.resolve(__dirname, "..");
    const outDist = path.resolve(rootDir, "dist");
    const nextDist = path.resolve(rootDir, "next", "dist");
    const legacyDist = path.resolve(rootDir, "legacy", "dist");
    const legacyOutDist = path.resolve(outDist, "legacy");

    await fs.promises.rm(outDist, { recursive: true, force: true });
    await fs.promises.mkdir(outDist, { recursive: true });

    if (!fs.existsSync(nextDist)) {
      throw new Error(`Source directory not found: ${nextDist}`);
    }
    if (!fs.existsSync(legacyDist)) {
      throw new Error(`Source directory not found: ${legacyDist}`);
    }

    await copyDirectory(nextDist, outDist);
    await copyDirectory(legacyDist, legacyOutDist);

    console.log("postbuild: merged next/dist and legacy/dist into dist/");
  } catch (error) {
    console.error("postbuild failed:", error);
    process.exit(1);
  }
})();
