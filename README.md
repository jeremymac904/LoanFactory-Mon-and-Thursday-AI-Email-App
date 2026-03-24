# Loan Factory AI Training Email Studio

This repo contains the current working version of the internal Loan Factory Monday and Thursday AI training email studio.

It is built for review-first operation:

1. Jeremy can generate, revise, approve, and schedule issues in mock mode with no secrets.
2. The app keeps a hard human approval gate before anything can be scheduled or sent.
3. Provider adapters are already in place for later Gemini, email, storage, auth, and scheduler wiring.

## Product Scope

This app is not a CRM and not a broad portal.
It is an internal studio for creating and managing two short training issues per week:

1. Monday
2. Thursday

The studio supports:

1. Dashboard
2. Draft Studio
3. Approval queue
4. Schedule queue
5. Assets library
6. Knowledge sources
7. Topic banks
8. Settings and memory
9. Provider and environment setup
10. Sent archive

## Current Stack

1. Next.js
2. TypeScript
3. Tailwind CSS
4. Server actions
5. Local file-backed dev state
6. Provider adapters with mock-safe fallback

## Repo Structure

1. `app/`
   Internal app routes and server actions
2. `components/`
   Shared UI shell and surface components
3. `lib/`
   Data store, service layer, provider adapters, types, and knowledge readers
4. `knowledge_system/`
   Durable markdown knowledge sources for the product
5. `01_google_ai_for_loan_officers/` through `04_weekly_training_production_lab/`
   Upstream notebook starter kits
6. `continuity/`
   Session memory and continuity artifacts

## Local Run

1. `npm install`
2. `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

Useful checks:

1. `npm run typecheck`
2. `npm run build`

## Mock Review Mode

The app works cleanly without provider secrets.

Leave the defaults in `.env.example` or keep `.env.local` empty for:

1. Mock AI draft generation and revision
2. Preview and sent-log email behavior
3. Local asset storage
4. Jeremy local-admin auth stub
5. Local schedule queue behavior

If you want to reset the local review state back to the seeded examples, delete `data/studio.json` and restart the app.

## Environment

Copy `.env.example` to `.env.local` only when you are ready to wire live providers.

If secrets are missing:

1. AI stays in mock mode
2. Email stays in preview and sent-log mode
3. Storage uses local file mode
4. Auth uses a Jeremy local-admin stub
5. Scheduling stays in local queue mode

## Netlify Readiness

This repo includes:

1. `.env.example`
2. `netlify.toml`
3. A production build that completes locally

Netlify deploy posture today:

1. Connect the GitHub repo in Netlify
2. Use Node `22`
3. Build command: `npm run build`
4. No provider secrets are required for a mock-mode review deploy
5. Add real env values later only when Jeremy is ready to test live providers

## Notebook Starter Kits

The original notebook folders remain the upstream research and synthesis layer:

1. `01_google_ai_for_loan_officers`
2. `02_loan_factory_and_terraplus_operations`
3. `03_sales_marketing_communication_and_conversion`
4. `04_weekly_training_production_lab`

Use those folders to refine source-grounded material.
Use `knowledge_system/` to store the durable markdown docs that feed the app.
Use `continuity/source_packets/` to store raw imported packet material that should remain traceable.

## Guardrails

1. Unsupported company facts are not treated as settled truth
2. Sensitive workflow or product claims are marked `Needs factual validation`
3. Borrower, realtor, lead, and regulated communication examples are marked `Needs compliance review`
