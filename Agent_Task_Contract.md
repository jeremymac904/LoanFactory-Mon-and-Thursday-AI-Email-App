# Agent Task Contract

## Objective

Build the first working version of a Loan Factory internal AI training email studio, plus the focused knowledge layer that feeds it, using the existing NotebookLM starter kits as upstream inputs.

## Current Phase

Phase 2: working product shell, local data flow, and focused knowledge layer expansion.

## Affected Products

1. NotebookLM starter kit bundle in this repo
2. Markdown knowledge source layer in `knowledge_system/`
3. Internal training email studio web app
4. Weekly internal training production workflow
5. Future internal portal or AI Twin knowledge source layer
6. Future Gemini, NotebookLM, and ChatGPT normalization workflows
7. GitHub and Netlify deployment readiness layer

## Scope

1. Inspect the real repo state and existing notebook starter kits
2. Tighten the governing contract for this mission
3. Build a simple Next.js plus TypeScript product shell in the current repo
4. Build the main internal app surfaces:
   Dashboard
   Draft Studio
   Schedule Queue
   Approvals
   Assets Library
   Knowledge Sources
   Topic Banks
   Settings and Memory
   Provider and Environment Setup
   Preview or Sent Archive
5. Build local file backed dev data flow for drafts, approvals, scheduling, assets, and memory
6. Build provider adapters for AI, email, storage, auth, and scheduling with safe fallback behavior when secrets are missing
7. Seed the app with sample Monday and Thursday content for immediate visual review
8. Expand the focused knowledge layer to support this product boundary
9. Prepare the repo for GitHub import and Netlify deployment
10. Update continuity artifacts to reflect the new state
11. Initialize or connect git cleanly, attach the approved GitHub remote, and push the completed first pass

## Out Of Scope

1. Full CRM or portal implementation
2. Live Gmail, CRM, or portal automation beyond provider adapters
3. Real auth hardening or production identity integration
4. Broad repo refactors beyond the product shell and focused knowledge layer
5. Unsupported legal or lending compliance interpretations
6. Unsupported company facts, fees, lender counts, or vendor capability claims
7. Autonomous sending without explicit human approval

## Constraints

1. Preserve the current starter kit folders as upstream inputs
2. Prefer minimal, reversible changes
3. Do not invent unsupported company behavior
4. Mark uncertain items as `Needs factual validation`
5. Mark communication or training items that may need lending review as `Needs compliance review`
6. Keep a hard human approval gate before scheduling or sending
7. Keep the repo usable for future portal and automation ingestion
8. Reuse existing lane naming and notebook boundaries
9. Use safe placeholders and adapters for secrets and providers
10. Validate created work before calling it complete

## Deliverables

1. This contract file
2. Product app shell and route structure
3. Local dev data store and sample seed content
4. Provider adapter layer for AI, email, storage, auth, and scheduler
5. Root `knowledge_system/` structure and manifest
6. Shared standards, workflow, and prompt library docs
7. Weekly training v1 documents
8. Sales and communication v1 documents
9. Focused Google AI and operations support docs or scaffolds required for this product
10. `.env.example`, `netlify.toml`, and updated project README
11. Updated system state and continuity memory artifacts
12. Git repository initialization or remote attachment, commit, and push to the approved GitHub remote

## Acceptance Criteria

1. The repo contains a runnable internal app shell, not only markdown docs
2. The app supports local draft generation, AI revision, approval, schedule management, asset attachment, knowledge browsing, and editable memory in dev mode
3. The app still works in draft and preview mode when provider secrets are missing
4. The repo contains a clearly named markdown knowledge layer separate from the notebook input packs
5. Weekly training lane includes at least:
   `WEEKLY_EMAIL_TEMPLATE.md`
   `TEAM_VERSION_STYLE_GUIDE.md`
   `COMPANY_VERSION_STYLE_GUIDE.md`
   `TRANSCRIPT_TO_EMAIL_WORKFLOW.md`
6. Sales and communication lane includes at least:
   `BORROWER_COMMUNICATION_FRAMEWORKS.md`
   `LEAD_CONVERSION_FRAMEWORKS.md`
   `THE_TRANSPARENCY_PLAYBOOK.md`
   `THE_REALTOR_90_DAY_ENGAGEMENT_ROADMAP.md`
   `REUSABLE_EMAIL_SMS_TEMPLATES.md`
7. Google AI and operations lanes contain the additional focused docs or scaffolds needed for this product boundary
8. Shared docs explain how NotebookLM, Gemini, ChatGPT, and Codex outputs connect to the markdown source system
9. Deployment setup files exist for local run and Netlify handoff
10. Factual and compliance uncertainty is called out explicitly
11. The repo is initialized cleanly on a usable branch, connected to the approved GitHub remote, and the first-pass build is committed and pushed

## Validation Rules

1. Validate that all planned folders and files were created
2. Validate JSON syntax for any continuity state file
3. Validate app typecheck and production build if dependencies install successfully
4. Validate that new markdown files include uncertainty and review markers where required
5. Validate the UI at least once in a browser if the local app runs
6. Validate local git status, remote wiring, commit creation, and push outcome
7. Report what was checked and what remains unverified

## Continuity Update Rules

1. Update `SYSTEM_STATE.json` when the repo state materially changes
2. Add a dated continuity memory file for substantive build sessions
3. Record what was built, what remains pending, and the next best bounded move
4. Keep continuity artifacts factual and repo scoped
