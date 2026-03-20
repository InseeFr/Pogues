#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const reset = "\x1b[0m";
const log = {
  green: (text) => console.log("\x1b[32m" + text + reset),
  blue: (text) => console.log("\x1b[34m" + text + reset),
  red: (text) => console.log("\x1b[31m" + text + reset),
};

const moveDirectory = async (source, destination) => {
  const entries = await fs.promises.readdir(source, { withFileTypes: true });
  await fs.promises.mkdir(destination, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await moveDirectory(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const link = await fs.promises.readlink(srcPath);
      await fs.promises.symlink(link, destPath);
    } else {
      await fs.promises.rename(srcPath, destPath);
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

    await moveDirectory(nextDist, outDist);
    await moveDirectory(legacyDist, legacyOutDist);
    log.green(
      `Postbuild: A single directory with legacy & next was created ! (dist folder)`,
    );
    log.green(`Now you can run \`pnpm preview\` to test all app !`);
  } catch (error) {
    log.red(`Post build failed: ${error}`);
    process.exit(1);
  }
})();
