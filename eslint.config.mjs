import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/build/**', '**/coverage/**', 'docs/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      '*.{js,mjs,cjs}',
      'backend/**/*.{js,mjs,cjs,ts}',
      'scripts/**/*.{js,mjs,cjs}',
    ],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
  },
);
