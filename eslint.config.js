import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import json from '@eslint/json'
import css from '@eslint/css'
import markdown from '@eslint/markdown'
import pluginReact from 'eslint-plugin-react'
import pluginJsxA11Y from 'eslint-plugin-jsx-a11y'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import * as mdx from 'eslint-plugin-mdx'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  // Ignores
  globalIgnores(
    [
      '.git/',
      'node_modules/',
      'dist/',
      '.astro/',
      '.vscode/',
      'package.json',
      'package-lock.json',
      '.gitignore',
      '.env',
      '.env.production',
      '.env.local',
      'eslint.config.js',
      'prettier.config.js',
      'astro.config.mjs',
      'tsconfig.json',
    ],
    'Unwached global files and folders',
  ),

  // Globals (Browser, Node)
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  // Javascript
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },

  // Typescript
  tseslint.config({
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      tseslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
    },
  }),

  // React
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    ...pluginReact.configs.flat.recommended,
  },

  // React Hooks
  {
    files: ['**/*.{js,jsx,tsx}'],
    plugins: { 'react-hooks': pluginReactHooks },
  },

  // React A11y
  // pluginJsxA11Y.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,tsx}'],
    plugins: { 'jsx-a11y': pluginJsxA11Y },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // JSON
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },

  // MD
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },

  // MDX
  {
    files: ['**/*.mdx'],
    ...mdx.flat,
  },
  {
    files: ['**/*.mdx'],
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
    },
  },

  // CSS
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },

  // PRETTIER
  pluginPrettierRecommended,
])
