# TRANSCRIPT TO EMAIL WORKFLOW

## Purpose

Turn one training transcript or transcript summary into a short weekly training issue.

## Source Basis

1. `04_weekly_training_production_lab/01_NOTEBOOK_BRIEF.md`
2. `04_weekly_training_production_lab/03_SOURCE_INTAKE_PLAN.md`
3. `04_weekly_training_production_lab/07_NOTEBOOKLM_STARTER_PROMPT.md`
4. `04_weekly_training_production_lab/08_NOTEBOOKLM_REFINEMENT_PROMPTS.md`
5. `04_weekly_training_production_lab/09_MARKDOWN_BUILD_QUEUE.md`

## Current Status

First pass workflow based on the lane brief and refinement prompts.

## Needs Factual Validation

1. Final transcript storage location
2. Whether the source of truth is raw transcript, summary, or both
3. Exact reviewer sequence before send

## Needs Compliance Review

1. Any extracted lesson that includes live borrower or product specifics

## Workflow

1. Confirm the transcript belongs in the weekly training lane
2. Pull out the single highest value lesson, not every lesson in the transcript
3. Identify the intended audience: team or company
4. Extract the strongest practical actions and one example
5. Remove filler, side stories, and repeated points
6. Draft the issue using `templates/WEEKLY_EMAIL_TEMPLATE.md`
7. Apply the correct style guide
8. Run factual and compliance review checks
9. Finalize the issue and hand off repurposing

## Extraction Rules

1. Prefer one lesson with clear action over a broad recap
2. Preserve the speaker intent but remove unnecessary speech patterns
3. Translate jargon into plain English when possible
4. Keep examples short and safe to share

## Manual Versus Automation Boundary

Keep manual:

1. Selecting the main lesson
2. Approving the tone
3. Deciding whether a scenario is safe to use

Good automation candidates later:

1. Transcript sectioning
2. Action extraction
3. First draft generation
4. Markdown archive creation

## Output Bundle

Each transcript run should ideally produce:

1. One weekly email draft
2. One portal card candidate
3. One markdown archive entry
4. One short list of gaps or review blockers
