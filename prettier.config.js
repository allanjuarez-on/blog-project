/**
 * @type {import("prettier").Config}
 */

const config = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'avoid',
  printWidth: 100,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx',
      },
    },
  ],
}

export default config
