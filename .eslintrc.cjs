module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:perfectionist/recommended-natural",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "eslint-plugin-perfectionist"],
  root: true,
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "no-unused-vars": "off",
    "perfectionist/sort-imports": ["error", { "newlines-between": "never" }],
  },
};
