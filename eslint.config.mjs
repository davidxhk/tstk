// @ts-check
import antfu from "@antfu/eslint-config"
import globals from "globals"

export default antfu({
  type: "lib",
  typescript: true,
  languageOptions: {
    globals: globals.browser,
  },
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  markdown: {
    overrides: {
      "ts/consistent-type-definitions": "off",
    },
  },
}, {
  files: ["examples/**/*.ts"],
  rules: {
    "no-console": "off",
    "unicorn/prefer-node-protocol": "off",
    "unused-imports/no-unused-vars": "off",
  },
})
