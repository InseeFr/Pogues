import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  {
    ignores: [
      'dist',
      'src/js/utils/draft-js/get-entity-at-cursor.js',
      'src/forms/controls/rich-textarea/lib/markdown-vtl-parser.js',
      'src/forms/controls/control-with-suggestions/components/vtl-suggestions.js',
      'e2e',
      'jison',
      'vite.config.js',
      'docs',
    ],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          plugins: ['@babel/plugin-syntax-jsx'], // Add plugin for JSX support
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': ['off'],
    },
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['src/**/*.{ts,tsx}'], // We use TS config only for TS files
  })),
  {
    files: ['src/**/*.{ts,tsx}'],

    // This is required, see the docs
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },

    // This is needed in order to specify the desired behavior for its rules
    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    // After defining the plugin, you can use the rules like this
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
