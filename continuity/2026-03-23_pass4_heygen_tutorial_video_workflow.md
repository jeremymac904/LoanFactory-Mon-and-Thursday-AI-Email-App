# PASS 4 Continuity Memory

## Session Objective

Add a first-pass HeyGen tutorial video workflow to the existing Loan Factory Monday and Thursday AI training email studio without rebuilding the app shell or widening scope.

## Governing Inputs

1. `HeyGen Integration Map.md`
2. `HeyGen Implementation Asset Plan.md`

Imported raw copies live in:

1. `continuity/source_packets/2026-03-23_codex_pass4_heygen/heygen_integration_map.md`
2. `continuity/source_packets/2026-03-23_codex_pass4_heygen/heygen_implementation_asset_plan.md`
3. `continuity/source_packets/2026-03-23_codex_pass4_heygen/SOURCE_PACKET_IMPORT_MAP.md`

## What Changed

1. Added a focused `05_heygen_tutorial_video_workflow/` knowledge lane with implementation, UI, prompt, compliance, and sanitization docs.
2. Added a mock-first HeyGen provider boundary that supports:
   script generation
   script approval
   render request
   polling
   completed video review
   approve and attach
   reject and restart
3. Tied the tutorial-video flow to approved drafts only.
4. Locked tutorial scripts once render begins.
5. Added provider status and env-placeholder support for HeyGen.
6. Tightened preview and approvals UI so the new video review gate is explicit.
7. Seeded the app with a tutorial-video example for first-use review.

## Validation Run

1. `npm run typecheck`
2. `npm run build`
3. Browser validation on a production-style server:
   approved a draft
   generated a tutorial script
   approved the script
   requested render
   polled render status to completion
   reviewed the final mock video
   approved and attached the video
4. Provider page validation confirmed HeyGen mock-mode posture and env-key visibility.

## Open Flags

### Needs Factual Validation

1. Exact live HeyGen API endpoint and payload contract
2. Actual `avatar_id` and `voice_id` values Jeremy wants in production
3. Final background, aspect ratio, and credit-usage rules for live mode

### Needs Compliance Review

1. Avatar rights and consent posture for any real training-video presenter
2. Final disclosure, footer, or NMLS-sensitive tutorial-video language before live use
3. Any tutorial script that touches regulated loan guidance beyond internal training context

## Next Best Move

Confirm the live HeyGen inputs Jeremy actually wants, then run one real tutorial-video render after he approves the mock review flow.
