# Knowledge Authoring Standard

## Purpose

Define the minimum shape and truth handling rules for markdown files in `knowledge_system/`.

## Required Metadata Sections

Every durable knowledge file should include these sections in plain markdown:

1. Purpose
2. Intended audience or user
3. Source basis
4. Current status
5. `Needs factual validation` items, if any
6. `Needs compliance review` items, if any

## Allowed Truth States

1. Confirmed by current repo sources
2. Structural recommendation based on current repo sources
3. `Needs factual validation`
4. `Needs compliance review`

Do not present items in states three or four as settled fact.

## Naming Conventions

1. Use uppercase snake case for durable knowledge docs when that matches upstream queues
2. Keep folder names stable and lane aligned
3. Use one document per clear purpose
4. Prefer additive docs over broad mixed documents

## Source Basis Rules

1. Cite the upstream lane documents used to shape the file
2. If the file is a first pass structure doc, say so directly
3. If live examples, company policies, or current product capabilities were not reviewed, mark that gap directly

## Review Rules

1. Borrower, realtor, or lead facing messaging requires `Needs compliance review`
2. Any mention of rates, fees, approvals, timing promises, legal rights, or program specifics requires `Needs compliance review`
3. Any company fact not supported in repo sources requires `Needs factual validation`
4. Tool capability claims that may change over time require `Needs factual validation`

## Portal And Automation Compatibility

Aim for predictable headings so future systems can parse:

1. `## Purpose`
2. `## Source Basis`
3. `## Current Status`
4. `## Needs Factual Validation`
5. `## Needs Compliance Review`

Then add the content sections that fit the file type.

## Recommended File Types

1. Template
2. Workflow
3. Style guide
4. Framework
5. Playbook
6. Manifest
7. Prompt library
