# NotebookLM Gemini Prompt Library

## Purpose

Provide reusable prompts for moving source grounded notebook work into the markdown knowledge system.

## Source Basis

1. Weekly training NotebookLM starter and refinement prompts
2. Sales and communication NotebookLM starter and refinement prompts
3. Lane build queues and output standards

## Current Status

First pass shared prompt library.

## Needs Factual Validation

1. Verify current Gemini and NotebookLM product capabilities before assuming a specific feature or UI flow

## Needs Compliance Review

1. Review any generated borrower, lead, or realtor copy before use outside an internal draft workflow

## Prompt 1: NotebookLM Synthesis

Use when the notebook already has a clean source set and you want the best first structured synthesis.

```text
Analyze only the sources currently loaded in this notebook.

Return:
1. executive summary
2. the strongest repeated patterns
3. the highest confidence workflow or template candidates
4. the top markdown documents that should exist in the downstream knowledge system
5. the source gaps that block stronger guidance
6. any claims that still need factual validation
7. any outputs that would need compliance review before use

Keep the answer source grounded, tactical, and easy to convert into markdown files.
```

## Prompt 2: NotebookLM Build Queue Extractor

Use when a notebook answer is strong and you need a clean doc queue.

```text
Turn the strongest findings into a build queue for durable markdown files.

For each file return:
1. file name
2. purpose
3. audience
4. minimum required sections
5. whether it is a template, workflow, framework, playbook, or prompt library
6. what still needs factual validation
7. what still needs compliance review

Prioritize the top ten files only.
```

## Prompt 3: Gemini Structure Refiner

Use when NotebookLM produced strong substance but weak organization.

```text
Reorganize the source grounded findings below into a clean markdown-ready structure.

Rules:
1. do not add unsupported company facts
2. preserve uncertainty
3. label anything that needs factual validation
4. label anything that needs compliance review
5. prefer practical sections over long narrative

Return a document outline with section headings and short bullet content under each heading.
```

## Prompt 4: Gemini Template Builder

Use when turning a workflow or framework into a reusable template.

```text
Turn the validated findings below into a reusable template.

Return:
1. purpose
2. required inputs
3. template body with placeholders in brackets
4. quality checks
5. common mistakes
6. factual validation flags
7. compliance review flags

Do not invent rates, fees, time promises, or company claims.
```

## Prompt 5: ChatGPT Normalization Prompt

Use when you need a clean handoff from notebook outputs into repo-ready docs.

```text
Normalize the material below into a repo-ready markdown document set.

For each proposed file:
1. choose the best file name
2. define the best folder
3. list the required sections
4. separate confirmed guidance from assumptions
5. label Needs factual validation items
6. label Needs compliance review items
7. identify the single best next file after this set

Keep the output concise, structured, and implementation ready for Codex.
```

## Prompt 6: Codex Build Handoff

Use when handing the normalized plan into the coding layer.

```text
Create or update markdown files in the repo using this structure.

Rules:
1. preserve the existing notebook starter kits
2. write durable markdown docs only
3. keep folder names lane aligned
4. do not state unsupported facts as truth
5. add Needs factual validation and Needs compliance review sections where required
6. prefer minimal reversible changes

Deliver:
1. files created or updated
2. validation performed
3. open factual validation flags
4. open compliance review flags
5. next bounded move
```
