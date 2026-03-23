# CRM_NOTES_AUTOMATION_WORKFLOW

## Purpose

Provide a first pass workflow for turning calls, emails, or recaps into cleaner CRM note entries.

## Source Basis

1. `01_google_ai_for_loan_officers/01_NOTEBOOK_BRIEF.md`
2. `01_google_ai_for_loan_officers/04_DOMAIN_MAP.md`

## Current Status

Scaffold for future validated CRM note support.

## Needs Factual Validation

1. Which CRM or note system is actually in use
2. What fields, tags, and automation hooks are available

## Needs Compliance Review

1. Any AI-generated CRM note that introduces unsupported borrower or product claims

## Workflow Shape

1. Capture the raw conversation summary
2. Extract confirmed facts, next action, owner, and due date
3. Keep assumptions in a separate review section
4. Save the final note only after human review
