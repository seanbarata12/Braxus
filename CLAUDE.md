# Braxus Plumbing — business & website notes

Saved 27 Sep 2026 so future chats have the full picture. Keep this file up to date when details change.

## Company

- **Business name:** Braxus Plumbing
- **Legal entity:** 18233993 CANADA LTD. (Braxus Plumbing is its trade name)
- **Owner:** Sean Barata
- **Based in:** Markham, ON
- **Phone / text:** (647) 468-9696 (links: `tel:+16474689696`, `sms:+16474689696`)
- **Email:** seanbarata@hotmail.com
- **Instagram:** @braxusplumbing (https://instagram.com/braxusplumbing)
- **Website:** https://braxusplumbing.com
- **Credentials:** over 10 years in the plumbing trade, fully licensed, fully insured
- **Focus:** residential and commercial

### Services
1. Residential Emergency Plumbing: burst/leaking pipes, no hot water / water heater failure, sewer and drain backups, leaking or seized shut-off valves, frozen pipe thawing
   - Emergency Drain Backups (own dropdown on the site, residential & commercial): basement floor drain backups, main sewer line blockages, toilets/tubs/showers backing up, kitchen/laundry/sink drain clogs, backwater valve checks after a backup
2. Residential Renovations & Installations: bathroom & kitchen rough-in and reno plumbing, fixture/faucet/toilet installation, water heaters (tank & tankless), sump pump and backwater valve installation, repiping and shut-off valve upgrades
3. Commercial Emergency Plumbing: burst supply lines and flooding response, drain and sewer backups, washroom and fixture failures, emergency water shut-off and isolation
   - Commercial Renovations & Installations (own dropdown, added 28 Sep 2026): tenant fit-out and renovation rough-in, commercial washroom and fixture installation, commercial water heaters, grease interceptor and backflow preventer installation, kitchen and equipment hookups for food service
4. Commercial Maintenance: routine fixture and line inspections, preventive maintenance scheduling, backflow and valve checks, tenant fixture repairs and upkeep
5. PRV (Pressure Reducing Valve) Maintenance: pressure testing and diagnosis, adjustment and calibration, replacement, high-pressure damage prevention checks
6. Mixing Valve Maintenance: mixing/tempering valve calibration, temperature testing, repair and replacement, scald-protection compliance checks

### Service area
Toronto GTA, Markham, Unionville, Richmond Hill, Thornhill, Stouffville, Vaughan, Scarborough, North York, Durham, Oshawa, Pickering, Whitby, Newmarket, Mississauga, Brampton

## Brand

Full brand kit (colours, fonts, logo, voice, usage rules): the "Braxus Plumbing" design system, https://claude.ai/artifact/5S5pCTvLkqz7Nv1c5beKj8. Use it for any new Braxus design, post or document.

### Logo
- `brand/braxus-logo-white.png` (887×204, transparent background): "BRAXUS" in white block capitals with a blue water drop in the A, "PLUMBING" in blue letter-spaced capitals between two blue rules.
- `brand/braxus-logo-on-black.png` (703×364): the same logo on the black business card, cropped from the card file.
- `brand/braxus-business-card-front.pdf`: the business card front, supplied by Sean as the official logo.
- White lettering, so it only works on dark backgrounds (black or navy). There is no dark-on-light version yet.
- Logo blue sampled from the file: about `#3F8DF2`.

### Website look (braxusplumbing.com)
| Role | Colour |
|---|---|
| Accent / buttons | `#1489FA` (hover `#0F6FD1`, light `#4FA6FF`) |
| Commercial accent | `#0B3E78` (steel blue) |
| Specialty accent | `#5C6B73` (slate) |
| Header, hero, footer | `#000000` → `#060A10` |
| Page background | `#EEF0F0` |
| Cards / white bands | `#FFFFFF` |
| Text | `#0A0A0A` (headings), `#33404A` (body), `#5C6B73` (muted) |
| Text on dark | `#F5F4F1` (headings), `#C7CCD1` (body) |
| Lines | `#D5D8DA` |

- **Headings font:** Unbounded (600/700/800), Google Fonts, chosen to match the wide, heavy logo lettering. Section headings (h2) are uppercase.
- **Body font:** IBM Plex Sans (400/500/600), Google Fonts
- Square-ish corners (3px radius), thin lines, small blue dot before section labels.

### Social / ad graphics look
- Navy `#0C1729`, bright blue `#2D9CF0`, darker blue `#1A6FC2`, heading navy `#0F1F3A`, light greys `#F3F5F8` / `#E3E7EC`, grey text `#475569`
- Fonts: Roboto Condensed Bold (uppercase headlines), Roboto (body)
- Instagram portrait size 1080×1350, logo bottom-left on navy.

## Website setup

- Code lives in this repo: `github.com/seanbarata12/Braxus`, branch `main`.
- `public/index.html` is the whole site (one page, plain HTML/CSS, no build step).
- `wrangler.jsonc` deploys `public/` as static assets. The `name` **must stay `brax`**, the Worker's name in Cloudflare.
- Cloudflare Workers Builds is connected to this repo: every push to `main` goes live on braxusplumbing.com within a minute or two.
- **Quote form (added 29 Sep 2026, branch `quote-form`):** "Request a quote" section before the footer. It posts to `/api/quote`, handled by `src/worker.js`, which emails the request to seanbarata@hotmail.com from quotes@braxusplumbing.com using the `QUOTE_EMAIL` send_email binding (recipient locked in `wrangler.jsonc`). Requires Email Routing enabled on braxusplumbing.com with seanbarata@hotmail.com verified as a destination address. Spam protection: hidden honeypot field plus a minimum fill time. Test locally with `npx wrangler dev` (emails are written to `.wrangler/tmp/email/`).
- Original design canvas (editable): https://claude.ai/artifact/Gaqfsf9aUdv4NPwPj24km4. The repo is now the source of truth for the live site.

## Other work made for Braxus (Claude artifacts)
- Website design: https://claude.ai/artifact/Gaqfsf9aUdv4NPwPj24km4
- Ad graphics (10 Instagram posts): https://claude.ai/artifact/Nea16ZsrixHofr2pECpdQH
- Toronto flood rebates post: https://claude.ai/artifact/QLPCf6MbZ45xrRWZXGKtFM
- Quote, Markham basement rough-in: https://claude.ai/artifact/PSsF7fMjRvroSFaBVKRbUm
- Markham plumbing 30-day Instagram calendar: https://claude.ai/artifact/A6JMyXmPuLRNqFA2aeogTS

## Other Cloudflare site
- `apexplumbingcontracting` Worker, Apex Plumbing Contracting (separate site, not in this repo). Design: https://claude.ai/artifact/7cCasuX2D4Q7CfrdkqKQxF, business card: https://claude.ai/artifact/1rSXYgGUhGa1aHYY4trfNH
