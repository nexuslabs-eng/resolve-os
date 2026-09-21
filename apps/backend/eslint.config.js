import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        // vitest.config.ts lives outside src/ (tsconfig.json's rootDir),
        // so it isn't covered by any tsconfig project — lint it standalone
        // instead of erroring.
        projectService: {
          allowDefaultProject: ["vitest.config.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Route handlers are wrapped in tryCatchWrapper, which requires an
      // async signature uniformly, even for handlers that never await.
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: ["**/__tests__/**/*.ts"],
    rules: {
      // expect(mock.method).not.toHaveBeenCalled() passes a mock function
      // around detached from its object — the exact "this" concern this
      // rule exists to catch elsewhere, but mock functions don't use `this`.
      "@typescript-eslint/unbound-method": "off",
      // expect.objectContaining(...) is deliberately typed as `any` so it
      // can match a partial shape against anything — not an actual unsafe
      // value flowing through the test.
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
]);
