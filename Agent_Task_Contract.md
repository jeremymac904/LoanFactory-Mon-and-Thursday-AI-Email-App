# Agent Task Contract

## Objective

Polish the existing Loan Factory internal AI training email studio so Jeremy can review it quickly, validate the core flow in mock mode, and deploy it cleanly to Netlify without widening product scope.

## Current Phase

Phase 4: PASS 3 review polish, deploy readiness, and mock-mode validation on top of the existing working shell.

## Affected Products

1. The existing internal training email studio web app
2. The focused markdown knowledge source layer in `knowledge_system/`
3. Focused knowledge and continuity artifacts that support the current review flow
4. Weekly Monday and Thursday internal training production flow
5. Netlify deployment handoff layer

## Scope

1. Inspect the real repo state and existing product shell before modifying it
2. Keep the current product shell intact and polish only the review, schedule, settings, provider, and README surfaces that directly affect Jeremy's review quality
3. Tighten copy, labels, helper text, empty states, and visual hierarchy for the existing flows
4. Make mock mode and provider readiness obvious without changing the underlying adapter architecture
5. Strengthen current seeded Monday and Thursday examples without adding new feature scope
6. Keep the hard human approval gate intact
7. Validate the core review and schedule flow in browser against the existing product
8. Validate Netlify-style build readiness in mock mode
9. Commit the completed PASS 3 and push to `origin/main`

## Out Of Scope

1. Rebuilding the app shell
2. Broad portal or CRM expansion
3. New major modules or feature families
4. Unsupported legal, lending, or compliance interpretations
5. Unsupported company facts, feature claims, lender counts, fee claims, or policy claims
6. Autonomous sending without explicit human approval

## Constraints

1. Preserve existing working behavior unless the task explicitly tightens it
2. Prefer minimal, reversible changes inside the current architecture
3. Do not invent unsupported company behavior
4. Mark uncertain items as `Needs factual validation`
5. Mark communication or workflow items that may need lending review as `Needs compliance review`
6. Keep the product scope locked to the twice-weekly internal training email system
7. Improve clarity and deploy posture, not feature breadth
8. Validate concrete flows before calling PASS 3 complete

## Deliverables

1. Updated governing contract
2. Polished dashboard, draft, approval, schedule, settings, provider, and related review surfaces
3. Stronger seeded sample content for Monday and Thursday review
4. README and setup guidance aligned to actual mock-mode and Netlify posture
5. Validated create, revise, approve, and schedule flow evidence in browser
6. Validated mock mode with no provider secrets
7. Updated continuity artifacts and system state
8. Commit and push to `origin/main`

## Acceptance Criteria

1. The app shell is not rebuilt; it is tightened in place
2. Review-state labels, helper text, and empty states are visibly clearer
3. The draft flow, approval gate, schedule flow, settings, and provider setup pages are easier to understand at a glance
4. Seed examples feel practical, tactical, and mortgage relevant
5. The hard human approval gate remains in place
6. Mock mode remains usable with no provider secrets
7. README and setup instructions match the actual current app
8. Typecheck, build, and browser validation were run
9. PASS 3 is committed and pushed to the approved remote

## Validation Rules

1. Validate `npm run typecheck`
2. Validate `npm run build`
3. Validate the key review flow in browser: open draft, revise, approve, and schedule
4. Validate the schedule queue and provider setup surfaces in browser
5. Validate no-secrets mock posture from actual environment and UI state
6. Validate README setup instructions against the current app
7. Validate git status before and after commit or push

## Continuity Update Rules

1. Update `SYSTEM_STATE.json` when PASS 3 materially changes the repo state
2. Add a dated continuity file for the PASS 3 review polish session
3. Record what was polished, what was validated, and the next best bounded move
4. Keep continuity artifacts factual and repo scoped
