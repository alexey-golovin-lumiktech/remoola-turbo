import { nestjsConfig } from '@remoola/eslint-config/nest-js';

export default [
  ...nestjsConfig,
  {
    settings: {
      'import/resolver': {
        typescript: { project: `./tsconfig.json` },
      },
    },
    languageOptions: {
      parserOptions: {
        project: [`./tsconfig.json`, `./tsconfig.eslint.json`, `./tsconfig.build.json`],
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: `latest`,
        sourceType: `module`,
      },
    },
  },
];
