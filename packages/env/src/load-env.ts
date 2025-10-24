import fs from "fs";
import path from "path";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export const lastLoadedKeys = new Set<string>();

const nodeEnv = process.env.NODE_ENV || `development`;

const orderedFiles = (baseDir: string) => [
  `.env.local`,
  `.env.${nodeEnv}.local`,
  `.env.${nodeEnv}`,
].reverse().map((f) => path.join(baseDir, f));

function findRepoRoot(): string {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, `turbo.json`)) ||
      fs.existsSync(path.join(dir, `pnpm-workspace.yaml`)) ||
      fs.existsSync(path.join(dir, `yarn.lock`))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

function findAppRoot(repoRoot: string): string {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    const rel = path.relative(repoRoot, dir);
    if (rel.startsWith(`apps/`)) return dir;
    dir = path.dirname(dir);
  }
  return repoRoot;
}

export function loadEnvFiles(mode: `initial` | `reload` = `initial`) {
  const repoRoot = findRepoRoot();
  const appRoot = findAppRoot(repoRoot);
  const files = [...orderedFiles(repoRoot), ...orderedFiles(appRoot)];
  const override = mode === `reload`;

  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const result = dotenv.config({ path: file, override });
    dotenvExpand.expand(result);
    if (result.parsed) {
      for (const k of Object.keys(result.parsed)) {
        lastLoadedKeys.add(k);
      }
    }
  }
}
