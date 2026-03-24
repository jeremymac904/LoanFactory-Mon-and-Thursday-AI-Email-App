# PASS 2 Source Packet Grounding

## Session Goal

Use the uploaded source packet bundle to convert the scaffold knowledge layer into a source-grounded first-use version and tighten the existing product shell without rebuilding it.

## Imported Raw Inputs

1. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/README_UPLOAD_TO_CODEX.md`
2. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/SOURCE_PACKET_MANIFEST.md`
3. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/01_weekly_training_production_lab/SOURCE_PACKET_1_WEEKLY_TRAINING_PRODUCTION_LAB.md`
4. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/02_sales_marketing_communication_and_conversion/SOURCE_PACKET_2_SALES_MARKETING_COMMUNICATION_AND_CONVERSION.md`
5. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/03_loan_factory_and_terraplus_operations/SOURCE_PACKET_3_LOAN_FACTORY_AND_TERRAPLUS_OPERATIONS.md`
6. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/04_google_ai_for_loan_officers/SOURCE_PACKET_4_GOOGLE_AI_FOR_LOAN_OFFICERS.md`
7. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/05_operator_notes/NORMALIZED_OPERATOR_NOTES_FOR_CODEX.md`
8. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/05_operator_notes/CODEX_SOURCE_PACKET_IMPORT_PROMPT.md`

## Product Changes

1. Tightened `lib/providers/ai.ts` to generate and revise drafts around `The One Thing`, one middle section, `Review note`, and `The 24 Hour Task`
2. Tightened `lib/seed.ts` and the ignored `data/studio.json` runtime store with source-grounded Monday and Thursday sample content
3. Tightened `lib/studio-service.ts` to merge topic-linked knowledge highlights, mark used topics, and batch schedule without double-booking the same date
4. Added preview-only attachment clarity in the draft detail surface
5. Tightened the schedule page copy so the open-slot batch behavior is explicit

## Knowledge Changes

1. Replaced the weekly training scaffold docs with packet-grounded versions
2. Replaced the sales and communication scaffold docs with packet-grounded versions
3. Replaced the Google AI scaffold docs with packet-grounded versions
4. Replaced the operations scaffold docs with packet-grounded versions
5. Replaced the compliance disclaimer snippet bank with a packet-grounded internal caution set
6. Added `SOURCE_PACKET_IMPORT_MAP.md` to connect raw packets to their downstream lanes

## Validation Completed

1. `npm run typecheck`
2. `npm run build`
3. Browser-backed creation of a Monday draft from the topic bank
4. Browser-backed revision of the new Monday draft with AI instructions
5. Browser-backed approval of the revised Monday draft
6. Browser-backed creation of a Thursday draft from the topic bank
7. App-form batch scheduling for `2026-04`, which produced Monday and Thursday scheduled items without slot collisions
8. Raw packet file presence check

## Open Flags

### Needs Factual Validation

1. Google AI capability details in the real team environment
2. MOSO meaning and approved usage
3. Seven-day SLA definition and ownership
4. Actual rate-lock, extension, rate-alert, and consent policy details
5. HAPPA meaning and approved use in the Loan Factory context

### Needs Compliance Review

1. Any borrower-facing, lead-facing, or realtor-facing copy before live use
2. Any training content referencing rates, fees, approvals, timelines, or product fit
3. AI-assisted 1003 handling, rate alerts, rate locks, and operational policy documents before use as guidance
4. AI governance and NPI guidance before it is treated as policy

## Next Best Move

Run Jeremy review on one generated Monday issue and one generated Thursday issue, then tune the prompt library and memory defaults from his actual edits.
