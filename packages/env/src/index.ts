import { EventEmitter } from "events";

import { loadEnvFiles } from "./load-env";
import { envSchema } from "./schema";
import { watchEnvFiles } from "./watcher";

export const envWatcher = new EventEmitter();

let currentEnv = loadAndValidate(`initial`);
let previousEnv = { ...currentEnv };

function loadAndValidate(mode: `initial` | `reload`) {
  loadEnvFiles(mode);
  const parsed = envSchema.parse(process.env);
  if (parsed.ENABLE_DEBUG && parsed.NODE_ENV === `development`) {
    console.debug(`✅ Loaded environment:`, parsed);
  }
  return parsed;
}

export function forceReloadEnv() {
  previousEnv = { ...currentEnv };
  currentEnv = loadAndValidate(`reload`);
  envWatcher.emit(`updated`, currentEnv, previousEnv);
  return currentEnv;
}

if (process.env.NODE_ENV === `development`) {
  let timer: NodeJS.Timeout | null = null;
  watchEnvFiles(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      previousEnv = { ...currentEnv };
      currentEnv = loadAndValidate(`reload`);
      envWatcher.emit(`updated`, currentEnv, previousEnv);
    }, 200);
  });
}

export const parsedEnvs = new Proxy(currentEnv, {
  get(_t, p: string) {
    return currentEnv[p as keyof typeof currentEnv];
  }
});
