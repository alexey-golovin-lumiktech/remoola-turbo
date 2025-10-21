import { nestjsConfig } from "@remoola/eslint-config/nest-js";

export default [
  ...nestjsConfig,
  {
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
  },
];
