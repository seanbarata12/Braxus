# Braxus Plumbing website

Source for braxusplumbing.com, served by the Cloudflare Worker `brax`.

- `public/` — the site's files (`index.html`).
- `wrangler.jsonc` — Cloudflare settings. The `name` must stay `brax` to match the Worker.

Cloudflare Workers Builds deploys automatically on every push to `main`.
