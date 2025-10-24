import fs from "fs";
import path from "path";

// const knownAppDirs = [`apps/api`, `apps/admin`, `apps/consumer`, `apps/worker`];

/**
 * Walks up from process.cwd() until it finds a known app root
 * (apps/api, apps/admin, etc.). Returns that path or the repo root.
 */
// --- Robust repo/app root detection ---
export function findRepoRoot(start = process.cwd()): string {
  let dir = start;
  while (true) {
    const hasTurbo = fs.existsSync(path.join(dir, `turbo.json`));
    const hasPnpm = fs.existsSync(path.join(dir, `pnpm-workspace.yaml`));
    const hasYarn = fs.existsSync(path.join(dir, `package.json`)) &&
      (() => {
        try {
          const pkg = JSON.parse(fs.readFileSync(path.join(dir, `package.json`), `utf8`));
          return !!pkg.workspaces;
        } catch { return false; }
      })();
    if (hasTurbo || hasPnpm || hasYarn) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return start;
    dir = parent;
  }
}

export function findAppRoot(repoRoot: string, start = process.cwd()): string {
  // Walk up until `apps/<name>` or first package.json inside apps/
  let dir = start;
  while (dir !== path.dirname(dir)) {
    const rel = path.relative(repoRoot, dir);
    if (rel.startsWith(`apps/`)) return dir;
    if (fs.existsSync(path.join(dir, `package.json`))) return dir;
    dir = path.dirname(dir);
  }
  return repoRoot;
}
