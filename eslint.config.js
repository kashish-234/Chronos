import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist'], // Ignore the "dist" folder during linting
  },
  {
    files: ['**/*.{js,jsx}'], // Target JavaScript and JSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Include browser globals (e.g., window, document)
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Use ES modules
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // JavaScript recommended rules
      ...js.configs.recommended.rules,

      // React recommended rules
      ...react.configs.recommended.rules,

      // Rules for React's new JSX transform
      ...react.configs['jsx-runtime'].rules,

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Custom rule configurations
      'react/jsx-no-target-blank': 'off', // Disable target-blank warnings
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Warn about incorrect exports in fast refresh
      ],
    },
  },
];
