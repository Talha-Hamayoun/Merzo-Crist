# Merzo Crist

Premium curtains and interior décor site. Next.js App Router, Payload CMS, PostgreSQL, and English / Arabic pages.

## Requirements

- Node.js 20.9+ (22 recommended)
- pnpm 9 or 10
- PostgreSQL 16+

## Setup

```bash
pnpm install
cp .env.example .env
```

Set `MAIN_DATABASE_URL`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SERVER_URL` in `.env`. Optional Cloudflare R2 variables are listed in `.env.example`.

Apply the database schema, then start the site:

```bash
pnpm migrate
pnpm dev
```

The public site is at `http://localhost:3000/en`. The Payload admin is at `http://localhost:3000/admin`.

## Scripts

- `pnpm dev` — development server
- `pnpm build` — production build
- `pnpm migrate` — apply Payload migrations
- `pnpm seed` — create the first admin user when `SEED_ADMIN_PASSWORD` is set
- `pnpm exec tsx src/seed/catalogue.ts` — load the sample catalogue when those collections are empty
