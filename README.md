# you-ai.io

Corporate website for a Saudi-based AI consulting / business transformation
brand. Built with Lovable, deployed as a Cloudflare Worker.

## Tech stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (SSR) on Vite 7
- **Runtime**: Cloudflare Workers (`@cloudflare/vite-plugin`), **not** a static
  site and **not** Node.js-hosted — the server entry (`src/server.ts`) uses
  Workers-native `fetch(request, env, ctx)`.
- **UI**: React 19, Tailwind CSS v4, shadcn/ui conventions on Radix primitives,
  Framer Motion, Recharts, Embla Carousel
- **Package manager**: [Bun](https://bun.sh) for install/build; **Wrangler CLI
  must be run via Node/`npx`** (see Known Issues below), not `bunx`.
- **MCP surface**: this project also exposes an MCP (Model Context Protocol)
  endpoint via `@lovable.dev/mcp-js` (`src/routes/[.mcp]/`, `src/routes/mcp.ts`)
  — this is Lovable's own tooling hook, unrelated to the site's business
  content.

## Design system

Theme name: **"Saudi Enterprise"**. Defined as CSS custom properties in
`src/styles.css` (`:root` block), using the OKLCH color space.

| CSS variable        | Meaning              | Value                   |
|---|---|---|
| `--brand-ink`        | Deep Navy (base surface) | `oklch(0.16 0.02 245)` |
| `--brand-mist`        | Cool Slate (neutral text) | `oklch(0.78 0.02 240)` |
| `--brand-magenta`     | Emerald (primary brand)   | `oklch(0.62 0.13 158)` |
| `--brand-violet`      | Royal Navy (authority)    | `oklch(0.38 0.11 255)` |
| `--brand-electric`    | Gold (premium accent)     | `oklch(0.78 0.14 82)`  |
| `--brand-ember`       | Desert Sand-Amber (warmth)| `oklch(0.74 0.09 68)`  |

> Note: the CSS variable *names* (magenta/violet/electric/ember) are legacy
> and no longer describe the actual colors — read the comment block at the
> top of `src/styles.css` before editing, and keep variable names stable
> unless doing a deliberate refactor, since components reference them by name.

Fonts: `Manrope` (display/headings), `Inter` (body).

## Project structure

```
src/
├── routes/              # TanStack Start file-based routes
│   ├── index.tsx         # Homepage
│   ├── about.tsx
│   ├── contact.tsx / connect.tsx
│   ├── ai-products.tsx / ai-assessment.tsx
│   ├── business-engines.tsx / industries.tsx
│   ├── insights.tsx / roi-calculator.tsx
│   ├── transformation-journey.tsx / transformation-stories.tsx
│   └── __root.tsx        # Root layout/shell
├── components/          # UI components
├── lib/                  # Utilities
├── styles.css            # Design tokens (see above)
└── server.ts             # Cloudflare Workers entry point (SSR)
```

No database/auth backend (no Supabase) as of this snapshot — the site is
content + client-side interactive tools (assessment flow, ROI calculator).

## Local development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Deploy

Deployed as a Cloudflare Worker named `you-ai`, with custom domains
`you-ai.io` and `www.you-ai.io` (configured in `wrangler.jsonc`).

```bash
export CLOUDFLARE_API_TOKEN="..."   # needs Workers Scripts Edit + Workers Routes Edit + DNS Edit on the you-ai.io zone
npx wrangler deploy
```

**Important — use `npx`, not `bunx`, for wrangler.** On at least one hosting
environment, `bunx wrangler <command>` sends the request to the Cloudflare
API and then hangs indefinitely waiting on the response (confirmed via a raw
`curl` to the same endpoint succeeding instantly with the same token). Node
+ `npx wrangler` does not have this issue.

If `wrangler deploy` fails with:

```
Hostname 'you-ai.io' already has externally managed DNS records ... [code: 100117]
```

it means Cloudflare DNS still has a plain A/CNAME record for that hostname.
Delete the conflicting DNS record in the Cloudflare dashboard (Workers
custom domains and plain DNS records for the same hostname can't coexist),
then redeploy.

## Deployment model — read this before assuming anything is "live"

The live site is whatever code was last deployed via `wrangler deploy` from
wherever that command was run. It is **not** tied to any specific GitHub
repo or Lovable workspace — pushing changes to GitHub or editing in Lovable
does nothing to the live site on its own. To ship a change:

```bash
git pull
bun install
bun run build
npx wrangler deploy
```
