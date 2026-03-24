# Agent Task Contract

## Objective

Add a first-pass HeyGen tutorial video workflow to the existing Loan Factory internal AI training email studio in a safe, mock-first way so Jeremy can review the UI and human approval flow before any live HeyGen API wiring.

## Current Phase

Phase 5: PASS 4 HeyGen tutorial workflow, source import, and mock-mode validation on top of the existing working shell.

## Affected Products

1. The existing internal training email studio web app
2. The focused markdown knowledge source layer in `knowledge_system/`
3. Focused knowledge and continuity artifacts that support the current review flow
4. Weekly Monday and Thursday internal training production flow
5. HeyGen tutorial video workflow and provider boundary
6. Netlify deployment handoff layer

## Scope

1. Inspect the real repo state and existing product shell before modifying it
2. Import the uploaded HeyGen source docs into a traceable raw repo area
3. Create only the focused HeyGen knowledge and implementation docs needed by the training email system
4. Add a first-pass HeyGen workflow to approved drafts:
   script generation
   script approval
   render request
   polling
   final video review
   approve and attach or reject and restart
5. Keep the hard human approval gate intact for both drafts and tutorial video review
6. Make mock mode and provider readiness obvious without pretending live wiring is complete
7. Validate the mock tutorial-video flow in browser against the existing product
8. Validate env placeholders, typecheck, and build
9. Commit the completed PASS 4 and push to `origin/main`

## Out Of Scope

1. Rebuilding the app shell
2. Broad portal or CRM expansion
3. New major modules or feature families outside the tutorial-video flow
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
7. Use structured avatar generation logic only for V1
8. Keep Video Agent, multi-scene, translation, LiveAvatar, and webhooks out of scope
9. Validate concrete flows before calling PASS 4 complete

## Deliverables

1. Updated governing contract
2. Raw HeyGen source import area with traceable markdown packet files
3. Focused HeyGen knowledge and implementation docs
4. Mock-first HeyGen provider boundary and env placeholders
5. Approved-draft tutorial script, render, poll, review, and attach or restart flow in the existing app
6. Validated mock-mode browser evidence for the HeyGen flow
7. Updated continuity artifacts and system state
8. Commit and push to `origin/main`

## Acceptance Criteria

1. The app shell is not rebuilt; it is tightened in place
2. The uploaded HeyGen source docs exist in the repo as traceable raw material
3. The focused HeyGen knowledge docs exist in the knowledge system
4. The existing app shell is tightened in place instead of rebuilt
5. Approved drafts can move through tutorial script, render, poll, review, and attach or restart steps
6. The script locks once render begins
7. Mock mode remains usable with no HeyGen secrets
8. Typecheck, build, env placeholder validation, and browser validation were run
9. PASS 4 is committed and pushed to the approved remote

## Validation Rules

1. Validate `npm run typecheck`
2. Validate `npm run build`
3. Validate the key HeyGen flow in browser: approve draft, generate script, approve script, render, poll, review, and attach
4. Validate provider setup surface for HeyGen mock posture
5. Validate no-secrets mock posture from actual environment and UI state
6. Validate env placeholders against the current app
7. Validate git status before and after commit or push

## Continuity Update Rules

1. Update `SYSTEM_STATE.json` when PASS 4 materially changes the repo state
2. Add a dated continuity file for the PASS 4 HeyGen workflow session
3. Record what was imported, what was added, what was validated, and the next best bounded move
4. Keep continuity artifacts factual and repo scoped
