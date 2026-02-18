module.exports = [
  {
    files: ["assets/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      eqeqeq: "warn",
      "no-var": "warn",
      "prefer-const": "warn",
      curly: "warn",
      "no-implicit-globals": "warn",
    },
  },
];
