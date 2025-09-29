import { FlatCompat } from "@eslint/eslintrc";
import checkFile from "eslint-plugin-check-file";
import nodePlugin from "eslint-plugin-n";
import { dirname } from "path";
import { fileURLToPath } from "url";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    "plugins": {
      "check-file": checkFile,
      "n": nodePlugin,
    },
    "rules": {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "function",
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
      "n/no-process-env": ["error"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "quotes": ["error", "double", { avoidEscape: true }],
      "semi": ["error"],
      "max-len": [
        "warn",
        140,
        2,
        {
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.ts": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "*/**": "NEXT_JS_APP_ROUTER_CASE",
        },
      ],
    },
  },
  {
    "files": ["config/client.env.ts", "config/server.env.ts"],
    "rules": {
      "n/no-process-env": "off",
    },
  },
];

export default eslintConfig;
