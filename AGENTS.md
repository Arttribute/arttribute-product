<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## This project

The arttribute.io website. Read `README.md` first.

- Copy and links that repeat across pages live in `lib/site.ts`. Change them there.
- Public pages are in `app/(site)/`, the admin console in `app/admin/`. Admin mutations are server actions in `app/admin/actions.ts`; each one calls `requireAdmin()` and revalidates the site.
- Data access is `lib/posts.ts` and `lib/media.ts` on MongoDB (`lib/db.ts`). Public reads never throw; they log and return empty.
- UI follows the Agent Commons UI guidelines: the `components/ui` kit, stone neutrals, Space Grotesk, one `Hl` highlight per heading. Pink and indigo are the only accents.
- Write in plain, short sentences. Avoid em dashes.
