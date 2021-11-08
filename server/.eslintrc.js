/**
 * ESLint configuration.
 *
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import("eslint").Linter.Config}
 */
 module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],

  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: 2020,
  },

  overrides: [
    {
      files: ["*.test.js"],
      env: {
        jest: true,
      },
    },
    {
      files: ["./src/generated/**/*.ts"],
      rules: {
        'no-use-before-define': 'off',
        'max-len': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-multiple-empty-lines': 'off',
      }
    }
  ],

  ignorePatterns: [
    ".eslintrc.js",
    "/.build",
    "/.cache",
    "/.git",
    "/.husky",
    "/.yarn",
    "/**/__snapshots__",
    "/**/node_modules",
    "/coverage",
    "dist/**/*"
  ],

  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "eol-last": ["error"],
    "indent": ["error", 2, {
        "SwitchCase": 1,
    }],
    "import/no-absolute-path": ["error"],
    "id-match": ["error", "^[_a-zA-Z0-9]*$"],
    "quotes": [2, "single"],
    "no-console": ["warn"],
    "no-unreachable": ["error"],
    "eqeqeq": ["error"],
    "default-case": ["error"],
    "curly": ["error", "all"],
    "no-caller": ["error"],
    "no-case-declarations": ["off"],
    "no-constructor-return": ["error"],
    "no-constant-condition": ["off"],
    "no-extra-boolean-cast": ["off"],
    "no-empty-function": ["error"],
    "no-eval": ["error"],
    "no-implied-eval": ["error"],
    "no-extra-bind": ["error"],
    "no-labels": ["error"],
    "@typescript-eslint/no-magic-numbers": ["warn", { "ignore": [0, 1, -1, 10], "ignoreArrayIndexes": true, "ignoreEnums": true}],
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/no-this-alias": ["error", {allowedNames: ['self']}],
    "no-multi-spaces": ["error"],
    "no-new-func": ["error"],
    "no-octal-escape": ["error"],
    "no-param-reassign": ["warn"],
    "no-proto": ["error"],
    "no-return-assign": ["error"],
    "no-return-await": ["error"],
    "no-throw-literal": ["error"],
    "no-unused-expressions": ["error"],
    "prefer-promise-reject-errors": ["error"],
    "prefer-regex-literals": ["warn"],
    "radix": ["error", "as-needed"],
    "require-await": ["error"],
    "strict": ["error"],
    "init-declarations": ["warn"],
    "no-label-var": ["error"],
    "no-shadow": ["error"],
    "no-use-before-define": ["error"],
    "callback-return": ["error"],
    "global-require": ["error"],
    "array-bracket-spacing": ["error"],
    "block-spacing": ["error"],
    "comma-spacing": ["error"],
    "comma-style": ["error", "last"],
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0, "maxBOF": 1 },],
    "func-call-spacing": ["error", "never"],
    "func-style": ["error", "expression"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "max-depth": ["warn", 5],
    "max-len": ["error", { "code": 140, "ignoreComments": true, "ignoreStrings": true }],
    "max-lines": ["error", 500],
    "max-params": ["warn", 5],
    "max-statements-per-line": ["error", { "max": 1 }],
    "multiline-comment-style": ["error", "separate-lines"],
    "no-mixed-operators": ["warn"],
    "no-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unneeded-ternary": ["error"],
    "no-whitespace-before-property": ["error"],
    "semi-spacing": ["error"],
    "semi": ["error", "always"],
    "space-before-blocks": ["error"],
    "switch-colon-spacing": ["error"],
    "arrow-spacing": ["error"],
    "no-duplicate-imports": ["error"],
    "prefer-spread": ["error"],
    "space-infix-ops": ["error"],
    "object-shorthand": ["warn"],
    "object-curly-spacing": ["warn", "always"],
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-misused-promises": "off",
    'sort-imports': [
      // sort imports import { IconGlobalMessage, IconActionLogout } ...  -> import { IconActionLogout, IconGlobalMessage } ...
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
  }
};
