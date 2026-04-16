# Countersure

**Know who you trade with.**

UK supplier verification platform. Wedge product is a free + paid VAT number checker; future layers add monitoring, risk scoring, and regulatory alerts. Built for UK procurement teams, accountants, and compliance officers.

## Stack

- Next.js 16 (App Router) + Tailwind 4
- TypeScript strict mode
- Netlify (raspeeruk) — `@netlify/plugin-nextjs`
- HMRC Check UK VAT Number API v2
- Resend (contact form + auth magic links from `noreply@siftforms.com`)
- Neon (via Netlify) — `NETLIFY_DATABASE_URL` / `NETLIFY_DATABASE_URL_UNPOOLED`
- NextAuth v5 + Stripe

## Local dev

```bash
cp .env.example .env.local
# fill in HMRC_* + RESEND_API_KEY at minimum
npm install
npm run dev
```

## Design

See `DESIGN.md` for the locked aesthetic. **Customs Hall / Verification Bureau** — green dominant, stamp-red accent, The Stamp as unique hook.

## Roadmap

| Layer | What | Status |
|-------|------|--------|
| 1 — Verify | VAT + EORI + Companies House lookup | In build |
| 2 — Monitor | Watchlists + change alerts | Month 2 |
| 3 — Score | Supplier risk scoring | Month 4 |
| 4 — Forecast | Regulatory impact alerts | Month 6 |
