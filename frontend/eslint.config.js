import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react },
    rules: { "react/jsx-uses-vars": "error" },
  },
  {
    files: ["vite.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
