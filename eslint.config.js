import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import playwrightPlugin from 'eslint-plugin-playwright';

export default [
  {
    // Define the parser
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    // Plugins are now objects, not arrays
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'prettier': prettierPlugin,
      'playwright': playwrightPlugin,
    },
    rules: {
      // Your custom rules here
      indent: ['off', 2, { ignoredNodes: ['ConditionalExpression'] }],
      'linebreak-style': 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      
      // Prettier integration for consistent formatting
      'prettier/prettier': 'error',

      // Playwright-specific rules
      'playwright/missing-playwright-await': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-networkidle': 'warn',
      'playwright/expect-expect': 'off',
      'playwright/no-standalone-expect': 'off',

      // Additional custom rules
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
  {
    // Ignore files like node_modules or build outputs
    ignores: ['node_modules/**', 'dist/**'],
  },
];