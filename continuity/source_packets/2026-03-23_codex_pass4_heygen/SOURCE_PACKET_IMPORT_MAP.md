# PASS 4 HeyGen Source Packet Import Map

## Imported Raw Sources

1. `continuity/source_packets/2026-03-23_codex_pass4_heygen/heygen_integration_map.md`
   Purpose: Governing source for the V1 human-in-the-loop render flow, structured avatar requirement, polling-first stance, and V1 out-of-scope rules.
2. `continuity/source_packets/2026-03-23_codex_pass4_heygen/heygen_implementation_asset_plan.md`
   Purpose: Governing source for the exact document list, approval gates, prompt needs, error handling expectations, and mock-first asset plan.

## Knowledge Lane Mapping

1. Raw sources map to `knowledge_system/05_heygen_tutorial_video_workflow/`
2. Implementation docs live under `knowledge_system/05_heygen_tutorial_video_workflow/implementation/`
3. Prompt docs live under `knowledge_system/05_heygen_tutorial_video_workflow/prompts/`
4. UI specs live under `knowledge_system/05_heygen_tutorial_video_workflow/ui/`

## App Mapping

1. Approved draft to script approval gate
2. Render request and polling loop
3. Final video review and attach or restart gate
4. Mock-first provider posture and env placeholders

## Notes

1. These raw sources are governing input for PASS 4, not approved company policy.
2. Exact HeyGen API endpoints, avatar_id values, voice_id values, rate limits, and avatar rights still need factual validation.
