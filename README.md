# Pokémon Fusion Generator

A production-ready, fan-made Pokémon Fusion Generator built with Next.js 14, Tailwind CSS, and Cloudflare Pages.

## Core Features
- Directional Fusion Logic (Head / Body typing and stats)
- Fully Responsive UI (Tailwind + shadcn/ui)
- Robust local state with Zustand
- Dynamic type matchups and stats calculator 
- SEO Optimized with App Router

## Local Setup

1. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

2. Run the development server:
\`\`\`bash
pnpm dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudflare Deployment

We use `@cloudflare/next-on-pages` for seamless deployments.

1. Install Wrangler CLI:
\`\`\`bash
npm i -g wrangler
\`\`\`

2. Authenticate:
\`\`\`bash
wrangler login
\`\`\`

3. Build and Deploy:
\`\`\`bash
pnpm run pages:build
wrangler pages deploy .vercel/output/static --project-name pokemon-fusion-live
\`\`\`

### GitHub Actions
To enable auto-deployment on push:
1. Go to your GitHub Repository Settings > Secrets and Variables > Actions.
2. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
3. Pushes to the `main` branch will automatically deploy.

## Custom Sprites Manifest
In the future, you can point the app to load from Cloudflare R2:
- Inside `app/api/fusion/route.ts`, swap out the mock `isCustomSprite` check to query your Cloudflare KV / D1 table which tracks `headId` and `bodyId` combinations.

## Legal Disclaimer
This is a fan-made project. We are not officially affiliated with Nintendo, Game Freak, or The Pokémon Company.
