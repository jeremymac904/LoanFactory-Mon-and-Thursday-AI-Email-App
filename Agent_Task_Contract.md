# Agent Task Contract

## Objective

Use the uploaded PASS 2 source packet bundle to tighten the existing Loan Factory internal AI training email studio and convert the scaffold knowledge layer into a source-grounded first-use version.

## Current Phase

Phase 3: PASS 2 source-packet grounding, focused product tightening, and validation on top of the existing working shell.

## Affected Products

1. The existing internal training email studio web app
2. The focused markdown knowledge source layer in `knowledge_system/`
3. Raw source-packet continuity artifacts in `continuity/source_packets/`
4. Weekly Monday and Thursday internal training production flow
5. Future Gemini, NotebookLM, and ChatGPT normalization workflows

## Scope

1. Inspect the real repo state and existing product shell before modifying it
2. Import the uploaded PASS 2 source packets into a traceable raw repo area
3. Map the imported packets to the four focused knowledge lanes
4. Upgrade only the knowledge docs that directly support the Monday and Thursday training email system
5. Tighten the existing app using imported packet guidance:
   prompt logic
   topic banks
   seeded sample content
   memory defaults
   AI edit behavior
   approval and schedule clarity
   attachment preview clarity
6. Keep the hard human approval gate intact
7. Validate the core flow:
   create a Monday draft
   create a Thursday draft
   revise one draft
   approve a draft
   batch schedule a month in mock mode
8. Commit the completed PASS 2 and push to `origin/main`

## Out Of Scope

1. Rebuilding the app shell
2. Broad portal or CRM expansion
3. Giant manuals or wiki growth outside the focused training system
4. Unsupported legal, lending, or compliance interpretations
5. Unsupported company facts, feature claims, lender counts, fee claims, or policy claims
6. Autonomous sending without explicit human approval

## Constraints

1. Preserve existing working behavior unless the task explicitly tightens it
2. Prefer minimal, reversible changes inside the current architecture
3. Do not invent unsupported company behavior
4. Mark uncertain items as `Needs factual validation`
5. Mark communication or workflow items that may need lending review as `Needs compliance review`
6. Keep raw source packets separate from the live knowledge browser
7. Keep the product scope locked to the twice-weekly internal training email system
8. Validate concrete flows before calling PASS 2 complete

## Deliverables

1. Updated governing contract
2. Raw source packet import area with traceable markdown packet files
3. Packet-to-lane import map
4. Upgraded focused knowledge docs for weekly training, sales, Google AI, operations, and compliance snippets
5. Tightened prompt logic, topic banks, seeded sample content, memory defaults, and AI edit behavior
6. Validated create, revise, approve, and month-schedule flow evidence
7. Updated continuity artifacts and system state
8. Commit and push to `origin/main`

## Acceptance Criteria

1. Raw source packets exist in the repo as traceable markdown files
2. The focused knowledge docs cite the imported packets as source basis
3. The app shell is not rebuilt; it is tightened in place
4. Topic banks, sample content, and draft logic visibly reflect the imported packets
5. The hard human approval gate remains in place
6. The month scheduler does not double-book the same Monday or Thursday slot
7. Factual and compliance uncertainty is called out explicitly
8. Typecheck, build, and product-flow validation were run
9. PASS 2 is committed and pushed to the approved remote

## Validation Rules

1. Validate raw packet import file presence
2. Validate focused knowledge doc presence
3. Validate `npm run typecheck`
4. Validate `npm run build`
5. Validate the key Monday and Thursday browser-backed product flows
6. Validate that uncertainty markers still exist where needed
7. Validate git status before and after commit or push

## Continuity Update Rules

1. Update `SYSTEM_STATE.json` when PASS 2 materially changes the repo state
2. Add a dated continuity file for the PASS 2 source-packet grounding session
3. Record what was imported, what was upgraded, what was validated, and the next best bounded move
4. Keep continuity artifacts factual and repo scoped
