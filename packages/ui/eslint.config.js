// packages/ui/eslint.config.js
import { config as reactInternalConfig } from "@remoola/eslint-config/react-internal";

export default [
  ...reactInternalConfig,
  {
    settings: {
      react: { version: `detect` },
    },
  },
];
