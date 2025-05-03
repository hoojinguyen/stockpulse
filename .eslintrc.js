// .eslintrc.js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    // Shared rules for both frontend and backend
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/order": [
      "error",
      { "newlines-between": "always", alphabetize: { order: "asc" } },
    ],
  },
  overrides: [
    {
      // Frontend specific rules
      files: ["frontend/**/*.{ts,tsx}"],
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      rules: {
        "react/react-in-jsx-scope": "off",
      },
    },
    {
      // Backend specific rules
      files: ["backend/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          { allowExpressions: true },
        ],
      },
    },
  ],
};
