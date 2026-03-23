# Loan Factory AI Training Email Studio

This repo now contains the first working version of a focused internal product for Jeremy:

1. A Next.js internal training email studio
2. A file-backed local data layer for drafts, approvals, scheduling, assets, and memory
3. A focused markdown knowledge system built from the notebook starter-kit lanes

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

## Environment

Copy `.env.example` to `.env.local` and wire secrets only when ready.

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

## Notebook Starter Kits

The original notebook folders remain the upstream research and synthesis layer:

1. `01_google_ai_for_loan_officers`
2. `02_loan_factory_and_terraplus_operations`
3. `03_sales_marketing_communication_and_conversion`
4. `04_weekly_training_production_lab`

Use those folders to refine source-grounded material.
Use `knowledge_system/` to store the durable markdown docs that feed the app.

## Guardrails

1. Unsupported company facts are not treated as settled truth
2. Sensitive workflow or product claims are marked `Needs factual validation`
3. Borrower, realtor, lead, and regulated communication examples are marked `Needs compliance review`
