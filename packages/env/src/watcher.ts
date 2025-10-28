import fs from "fs";
import path from "path";

export function watchEnvFiles(onChange: () => void) {
  const repoRoot = process.cwd();
  const nodeEnv = process.env.NODE_ENV || `development`;
  const envFiles = [
    `.env`,
    `.env.${nodeEnv}`,
    `.env.${nodeEnv}.local`,
    `.env.local`
  ];

  for (const f of envFiles) {
    const file = path.join(repoRoot, f);
    if (!fs.existsSync(file)) continue;

    fs.watch(file, { persistent: true }, (event) => {
      if (event === `change`) onChange();
    });
  }
}
