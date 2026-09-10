//@ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

const userscriptGlobals = {
  console: 'readonly',
  document: 'readonly',
  fetch: 'readonly',
  localStorage: 'readonly',
  location: 'readonly',
  MutationObserver: 'readonly',
  navigator: 'readonly',
  Notification: 'readonly',
  setTimeout: 'readonly',
  window: 'readonly',
  XMLHttpRequest: 'readonly',
};

export default defineConfig(
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['dist/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: userscriptGlobals,
      sourceType: 'script',
    },
  },
  {
    files: ['*.config.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
);
