# arttribute.io

The Arttribute website: who we are, what we build, and the blog.

Arttribute builds technology for private, transparent and responsible AI:

- **Private AI** with [Agent Commons](https://www.agentcommons.io): local models on your own computer, with cloud continuity when you choose.
- **AI literacy** with [CommonLab](https://commonlab.agentcommons.io): practical, responsible AI skills for leaders, teams, educators and students.
- **Provenance** with [ProvenanceKit](https://www.provenancekit.com): open-source records of how human and AI work was made.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, MongoDB. Deployed on Vercel from `main`.

Arttribute has an independent visual identity: a paper canvas, ink-blue type, restrained rose and indigo, Inter for interface text and Newsreader for editorial accents. Both fonts are self-hosted under the SIL Open Font License. Original vector studies build on the three faces of the Arttribute cube. There are no simulated product screens on the marketing pages.

The public site uses the responsive `brand-*` styles in `app/globals.css`. The homepage introduces Arttribute, connects its three areas of work, explains its approach, and features articles managed by the publishing console. Product names, destinations and repeated copy remain in `lib/site.ts`.

## Design research

The October 2026 refresh reviewed the live sites of [Anthropic](https://www.anthropic.com/), [Base](https://www.base.org/), [Proton](https://proton.me/), [Mistral](https://mistral.ai/), [Mozilla](https://www.mozilla.org/en-US/) and [Linear](https://linear.app/). These are observations of their current presentation, rather than claims that their visual styles should be copied:

| Reference | What informs Arttribute                                                         | Application                                                             |
| --------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Anthropic | A company mission can organise multiple products and research initiatives.      | Arttribute leads with its own promise; the products follow.             |
| Base      | One organising proposition connects a broad ecosystem, with clear destinations. | Simple product navigation and a focused three-part overview.            |
| Proton    | Privacy becomes useful when connected to concrete everyday tasks.               | Explain local files, offline work and the choice to use cloud services. |
| Mistral   | Sovereignty can be explained through control over deployment and tools.         | Name the choices people have, without unsupported superiority claims.   |
| Mozilla   | A parent brand can connect products, education and wider public-purpose work.   | A shared approach ties together technology, literacy and provenance.    |
| Linear    | Purposeful hierarchy and concrete workflows help a broad product stay legible.  | Fewer sections, shorter copy and a direct next action.                  |

Arttribute retains its original cube and pink/indigo heritage. It does not reuse competitor copy, artwork, trust marks, testimonials or usage statistics. The brief takes precedence over the former Agent Commons UI guideline.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

The public pages work without a database. With no `MONGODB_URI` the blog sections are hidden.

| Variable                                 | What it is                                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `MONGODB_URI`                            | MongoDB connection string. Posts and images live here.                                                     |
| `MONGODB_DB`                             | Database name. Defaults to `arttribute`.                                                                   |
| `SITE_URL`                               | Public origin, for example `https://www.arttribute.io`. Used for links, feeds and the sign-in callback.    |
| `SESSION_SECRET`                         | At least 32 random characters. Seals the admin session cookie.                                             |
| `COMMONS_IDENTITY_ISSUER`                | Commons Identity issuer. Defaults to `https://auth.agentcommons.io/api/auth`.                              |
| `COMMONS_IDENTITY_CLIENT_ID` / `_SECRET` | The Arttribute OAuth client in Commons Identity.                                                           |
| `ADMIN_EMAILS`                           | Comma-separated emails that may use the admin console. `ADMIN_SUBJECTS` takes Commons account ids instead. |

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
