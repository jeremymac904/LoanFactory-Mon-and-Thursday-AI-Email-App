# CRM_NOTES_AUTOMATION_WORKFLOW

## Purpose

Support Thursday or Monday issues that show how voice notes, call recaps, or meeting notes can become cleaner CRM notes.

## Source Basis

1. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/04_google_ai_for_loan_officers/SOURCE_PACKET_4_GOOGLE_AI_FOR_LOAN_OFFICERS.md`
2. `continuity/source_packets/2026-03-23_codex_pass2/loan_factory_codex_source_packets/05_operator_notes/NORMALIZED_OPERATOR_NOTES_FOR_CODEX.md`

## Current Status

PASS 2 working workflow for prompt design and topic-bank support.

## Workflow

1. Capture the call recap, voice memo, or notes
2. Ask AI to extract only confirmed facts, next steps, and owners
3. Review the summary manually
4. Move the cleaned note into the CRM
5. Keep anything unconfirmed out of the final note

## Useful Prompt Angle

`Turn these notes into clean CRM language with sections for confirmed facts, next steps, open questions, and owner. Do not invent missing details.`

## Needs Factual Validation

1. The real CRM fields, owner rules, and automation hooks

## Needs Compliance Review

1. This workflow before live use if call recording, transcription, or consent rules apply
2. Any automated note flow that could retain sensitive customer data in the wrong place
