import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'quotes': ['error', 'backtick'],
      'max-len': ['error', { code: 120, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true, ignoreUrls: true }],
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          singleQuote: true,
          tabWidth: 2,
          endOfLine: 'auto',
          printWidth: 120 /** @REFERENCE https://prettier.io/docs/options#print-width  */,
          semi: true,
          arrowParens: 'always',
          proseWrap: 'preserve',
        },
      ],
    },
  },
);