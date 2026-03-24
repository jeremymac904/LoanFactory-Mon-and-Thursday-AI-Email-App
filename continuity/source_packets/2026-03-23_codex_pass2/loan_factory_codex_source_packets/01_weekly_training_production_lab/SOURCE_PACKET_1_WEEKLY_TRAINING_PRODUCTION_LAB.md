# Source Packet 1
# Weekly Training Production Lab

## Packet Purpose

This packet defines the production system for the twice weekly internal AI training emails for Loan Factory loan officers.

It is the source grounded lane for:

1. weekly email structure
2. team versus company style
3. transcript or guide to email workflow
4. approval and review logic
5. repurposing into short video and archive assets
6. what should stay manual versus what can be automated later

## Production Framework

### Purpose of the notebook
Act as a source grounded production engine that turns internal training videos, transcripts, guides, notes, and knowledge docs into a repeatable weekly training system for Loan Factory loan officers.

### Exact inputs
1. Training videos
2. Raw transcripts from meetings or training sessions
3. Training guides and notes
4. Existing markdown source docs
5. Style guides
6. Team feedback and blocker logs

### Best weekly issue format
Use the STU model, short, tactical, useful.

Core pattern:
1. Power subject line
2. The One Thing
3. Script Lab
4. Optional feature or workflow drop
5. Optional market or context note
6. The 24 Hour Task

### Workflow
Capture  
Distill  
Task  
Editorial Review  
Compliance Review  
Deploy

### Team versus company
Company version is the cleaner source of truth.  
Team version is more execution focused, more localized, and more tactical.

### What should stay manual
1. Topic selection
2. Final script refinement
3. Empathy and tone checks
4. Compliance review
5. Final approval

### What can be automated later
1. Transcript extraction
2. Summary extraction
3. Draft generation
4. Prompt card extraction
5. Portal card generation
6. Archive tagging
7. Scheduling support
8. Performance tagging

## Revised Foundational Docs

## WEEKLY_EMAIL_TEMPLATE.md

# Weekly Email Template

**Purpose:** Define the standard structure, tone, and rules for a short internal weekly training email.

**Who it serves:** Loan Factory loan officers, managers, and the content production team.

**Why it matters:** Prevents information overload and keeps training fast enough to use in real production.

### Tone and Output Rules
1. Readable in under three minutes
2. Practical and direct
3. Benefit plus topic subject lines
4. Focus on one useful idea

### When Not to Use This Format
Do not use it for giant policy changes, deep technical manuals, or broad corporate memos.

### Required Sections
1. Subject
2. The One Thing
3. The 24 Hour Task

### Optional Sections
1. Script Lab
2. Tech or workflow drop
3. Market intelligence
4. Quick checklist
5. Video demo callout

### Fill In Template
**Subject:** [Benefit] plus [Topic]

**The One Thing:**  
Explain the one friction point and the one play to fix it.

**Optional Section:**  
Insert one tactical script, checklist, workflow tip, or quick demo.

**The 24 Hour Task:**  
Insert one immediate action.

## TEAM_VERSION_STYLE_GUIDE.md

# Team Version Style Guide

**Purpose:** Define the team specific version of internal training.

**Who it serves:** Sales managers, branch managers, and local teams.

**Why it matters:** The team version should feel specific to real production, not generic.

### Tone, Purpose, and Use Cases
1. More informal
2. More localized
3. More execution driven
4. Built for immediate action

### What Makes the Team Version Worth Reading
It highlights real bottlenecks, local wins, peer examples, and what matters this week for the team.

### Required Rules
1. Must connect to a real current bottleneck or opportunity
2. Must include a concrete action step
3. Must stay concise

### Optional Team Elements
1. Leaderboard style recognition
2. Peer call review
3. Local market play
4. Team huddle recap

### Future Automation Notes
Potential future triggers can surface team level workflow issues and suggest next topic candidates.

## COMPANY_VERSION_STYLE_GUIDE.md

# Company Version Style Guide

**Purpose:** Define the company wide version of internal training.

**Who it serves:** All Loan Factory loan officers and the central editorial team.

**Why it matters:** It is the broader source of truth while still staying readable and practical.

### Tone, Purpose, and Use Cases
1. Authoritative but readable
2. Standardized but useful
3. Strategic, not bloated
4. Practical enough to apply quickly

### What the Company Version Must Never Become
1. A fluffy corporate newsletter
2. A wall of text
3. Generic theory
4. Hyper local branch chatter

### Required Rules
1. Tie back to broader training value
2. Keep one primary takeaway
3. Stay useful for mixed skill levels

### Potential Content Categories
1. Platform use
2. Compliance update, only with review
3. Process improvement
4. Communication training
5. AI workflow quick wins

## TRANSCRIPT_TO_EMAIL_WORKFLOW.md

# Transcript to Email Workflow

**Purpose:** Define the universal workflow for turning raw training media into STU aligned internal emails.

**Who it serves:** Email editor, content team, managers, and reviewers.

**Why it matters:** Lets AI do the extraction work while humans keep judgment, tone, and safety.

### Input Standards
1. Video, transcript, guide, or note packet
2. Structured transcript preferred
3. Clear topic metadata when possible

### AI Assisted Steps
1. Capture
2. Distill
3. Route to task queue

### Human Owned Steps
1. Select The One Thing
2. Refine scripts and tone
3. Review for compliance
4. Approve for packaging

### Packaging
Use the weekly email template and route to company or team version.

### Failure Modes to Avoid
1. Publishing raw AI output
2. Skipping compliance checks
3. Turning one session into ten tips
4. Losing the one useful action
