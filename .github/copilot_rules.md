Copilot rules for the TODO project

- Keep functions pure where possible and prefer small, testable modules.
- Use TypeScript types for all public API surfaces (lib/\*) and pages.
- Do not add new dependencies without justification; prefer built-in browser APIs.
- Follow project's import aliases (`~/*`) and existing folder conventions.
- For UI, keep styles simple (Tailwind classes) and avoid global side effects.
- When changing routing or defaults (branch names, config), update README and notify the team.
- For translations, add keys in `app/lib/i18n` and in page-level `translations.ts` files.
