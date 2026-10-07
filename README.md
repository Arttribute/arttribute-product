# arttribute.io

The Arttribute website: who we are, what we build, and the blog.

Arttribute builds technology for private, transparent and responsible AI:

- **Private AI** with [Agent Commons](https://www.agentcommons.io): local models on your own computer, with cloud continuity when you choose.
- **AI literacy** with [CommonLab](https://commonlab.agentcommons.io): practical, responsible AI skills for leaders, teams, educators and students.
- **Provenance** with [ProvenanceKit](https://www.provenancekit.com): open-source records of how human and AI work was made.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, MongoDB. Deployed on Vercel from `main`.

The look follows the Agent Commons design system: warm stone neutrals, Space Grotesk, one highlighted phrase per heading, and the shared `components/ui` kit from CommonLab. Arttribute's pink and indigo come from the cube mark.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

The public pages work without a database. With no `MONGODB_URI` the blog sections are hidden.

| Variable | What it is |
|---|---|
| `MONGODB_URI` | MongoDB connection string. Posts and images live here. |
| `MONGODB_DB` | Database name. Defaults to `arttribute`. |
| `SITE_URL` | Public origin, for example `https://www.arttribute.io`. Used for links, feeds and the sign-in callback. |
| `SESSION_SECRET` | At least 32 random characters. Seals the admin session cookie. |
| `COMMONS_IDENTITY_ISSUER` | Commons Identity issuer. Defaults to `https://auth.agentcommons.io/api/auth`. |
| `COMMONS_IDENTITY_CLIENT_ID` / `_SECRET` | The Arttribute OAuth client in Commons Identity. |
| `ADMIN_EMAILS` | Comma-separated emails that may use the admin console. `ADMIN_SUBJECTS` takes Commons account ids instead. |

## The blog

Posts are stored in the `posts` collection and images in `media`. The first connection creates indexes and writes the three opening posts once. After that they are ordinary posts.

- `/blog` lists featured posts first, then every post with topic filters.
- `/blog/<slug>` renders the post's Markdown. Raw HTML in Markdown is not rendered.
- `/blog/rss.xml`, `/sitemap.xml` and per-post share images are generated.
- Pages are static and revalidate every five minutes. Every admin change revalidates them at once.

## The admin console

`/admin` is the console. People sign in with their Commons account through Commons Identity, the same account they use for Agent Commons and CommonLab. Only accounts listed in `ADMIN_EMAILS` or `ADMIN_SUBJECTS` get in. The site stores who signed in, in an encrypted cookie, and never keeps Commons tokens.

In the console you can:

- Write posts in Markdown with a toolbar and live preview. Paste or drop images to upload them.
- Set the URL, topic, author, cover image and publish date. A future date schedules the post.
- Publish, unpublish, feature and delete posts.
- Order featured posts under **Featured**. The first three lead the home page and the blog.

### Registering the sign-in client

The site needs an OAuth client in Commons Identity with this redirect URI:

```
https://www.arttribute.io/api/auth/callback
```

`apps/commons-identity/scripts/bootstrap-arttribute-client.ts` in the agent-commons repo creates it. Run it with the identity database URL, then put the client id and secret in the Vercel environment.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
