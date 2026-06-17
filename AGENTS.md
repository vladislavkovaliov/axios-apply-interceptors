# AGENTS.md — axios-apply-interceptors

## Commands

| Command | What it does |
|---------|-------------|
| `npm run build` | `rm -rf dist && tsup` — builds CJS + ESM + types to `dist/` |
| `npm test` | `tsx --test 'src/**/*.test.ts'` — Node built-in test runner via tsx |
| `npm run commit` | `cz` — commit via commitizen (conventional changelog) |
| `npx semantic-release` | Manual release trigger (CI auto-runs on push to `main`) |

No lint, typecheck, or formatter commands exist.

## Structure

- **Single-package** library (not a monorepo).
- **Entrypoint**: `src/index.ts` — exports only `applyInterceptors<T>(manager, fulfilled, rejected)`.
- **Build**: `tsup` → dual CJS/ESM output in `dist/`, declarations in `types/`.
- **Dependency**: `axios` — used only for types (`AxiosInterceptorManager`).

## Tests

- **Runner**: Node.js built-in (`node:test`), via `tsx` (TypeScript execution).
- **Framework**: `describe`, `it`, `mock` from `node:test`; `assert` from `node:assert`.
- **Location**: `.test.ts` files co-located with source (3 files: `src/index.test.ts`, `src/utils/flowRight.test.ts`, `src/utils/composeInterceptors.test.ts`).
- **No external test deps** beyond `tsx` — no Jest, Vitest, etc.

## Key facts

- `npm install` triggers `prepare` → `npm run build`, so the repo builds on install.
- Husky pre-commit runs `git add .` — stages everything.
- CI (GitHub Actions on `main`) runs Node 20.x and publishes via `semantic-release`.
- Release branches: only `main`. Packages published to npm via `@semantic-release/npm` + `@semantic-release/github`.
- Commit conventions: conventional-changelog (commitizen).
- Node engines: `"node": "24"` in package.json, but CI uses Node 20.
- tsconfig excludes `**/*.test.ts` from compilation — tests run via `tsx`, not `tsc`.
