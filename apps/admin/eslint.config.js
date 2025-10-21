import { nextJsConfig } from "@remoola/eslint-config/next-js";

export default [
  ...nextJsConfig,
  {
    settings: {
      react: { version: `detect` }
    },
  },
];
