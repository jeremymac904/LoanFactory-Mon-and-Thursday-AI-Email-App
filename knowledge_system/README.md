# Knowledge System Layer

## Purpose

This folder is the downstream markdown source system for the notebook starter kits in this repo.

The starter kit folders define notebook scope, intake, and prompt direction.
This folder holds the durable documentation, templates, playbooks, and workflow files that future humans, portals, Gems, or automations can consume.

## Current Status

First pass foundation build.

Built in this pass:

1. Shared standards, workflow, and prompt docs
2. Weekly training lane v1 documents
3. Sales and communication lane v1 documents
4. Scaffold landing zones for Google AI and operations lanes

## Operating Rules

1. Preserve the lane boundaries set by the upstream starter kits
2. Keep documents source grounded whenever source material exists
3. Mark unsupported operational or company claims as `Needs factual validation`
4. Mark borrower, lead, realtor, and mortgage communication examples as `Needs compliance review` where appropriate
5. Prefer modular markdown files that can later feed a portal, prompt library, or automation workflow

## Folder Map

1. `shared/`
   Standards, shared workflows, and prompt libraries
2. `01_google_ai_for_loan_officers/`
   Scaffold for future Google AI knowledge documents
3. `02_loan_factory_and_terraplus_operations/`
   Scaffold for future operations knowledge documents
4. `03_sales_marketing_communication_and_conversion/`
   Built v1 communication frameworks, playbooks, and reusable templates
5. `04_weekly_training_production_lab/`
   Built v1 weekly training templates, style guides, and workflows

## Upstream To Downstream Flow

1. Starter kit docs define the notebook mission
2. NotebookLM produces source grounded findings
3. Gemini can expand or reshape those findings while staying source bounded
4. ChatGPT normalizes structure and doc direction
5. Codex creates or updates the durable markdown files in this folder
6. Reviewers validate factual and compliance sensitive material before broader distribution
