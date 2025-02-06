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
  rules: {
  },
})
