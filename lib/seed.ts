import { getCurrentMonthKey, getNextSendDate } from "@/lib/date-utils";
import type { SendDay, StudioState } from "@/lib/types";

function nowIso(): string {
  return new Date().toISOString();
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getPreviousSendDate(day: SendDay, from = new Date()): string {
  const target = day === "Monday" ? 1 : 4;
  const copy = new Date(from);
  copy.setHours(12, 0, 0, 0);
  const diff = (copy.getDay() - target + 7) % 7 || 7;
  copy.setDate(copy.getDate() - diff);
  return toIsoDate(copy);
}

export function createSeedState(): StudioState {
  const now = nowIso();
  const nextMonday = getNextSendDate("Monday");
  const nextThursday = getNextSendDate("Thursday");
  const lastThursday = getPreviousSendDate("Thursday");

  return {
    preferences: {
      tonePreference:
        "Short, tactical, useful, and operator-level. This should read like a sharp mortgage field brief, not a newsletter.",
      lengthPreference: "Keep each issue readable in under three minutes and tight enough to scan on a phone.",
      subjectLinePreference: "Lead with the tactical outcome or quick win, then the angle.",
      favoriteStructures: [
        "The One Thing",
        "Script Lab or Workflow Drop",
        "Review note",
        "The 24 Hour Task"
      ],
      phrasesToUse: [
        "quick win",
        "operator move",
        "keep it clean",
        "one next step",
        "what to do in the next 24 hours"
      ],
      phrasesToAvoid: ["game changer", "revolutionary", "just checking in", "circle back"],
      compliancePreference:
        "Keep review notes explicit. Any rates, approvals, fees, product guidance, borrower specifics, or policy claims stay in human review.",
      defaultAudience: "Team",
      defaultSendDay: "Monday"
    },
    memorySignals: [
      {
        id: "mem-manual-1",
        createdAt: now,
        type: "manual_preference",
        label: "STU baseline",
        content: "Jeremy wants every issue to be short, tactical, useful, and grounded in one lesson only.",
        active: true
      },
      {
        id: "mem-manual-2",
        createdAt: now,
        type: "manual_preference",
        label: "Structure baseline",
        content: "Default structure: The One Thing, one middle section, Review note, and The 24 Hour Task.",
        active: true
      },
      {
        id: "mem-manual-3",
        createdAt: now,
        type: "manual_preference",
        label: "Human approval gate",
        content: "Nothing schedules or sends without Jeremy approval. Raw source packets are source inputs, not approved company policy.",
        active: true
      },
      {
        id: "mem-approval-1",
        createdAt: now,
        type: "approval_pattern",
        label: "Approved pattern",
        content: "Approved drafts usually keep one useful lesson, three tactical moves at most, and one clear review note.",
        active: true
      }
    ],
    assets: [
      {
        id: "asset-hero-1",
        name: "AI Inbox Demo Still",
        kind: "image",
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        source: "link",
        createdAt: now,
        sizeLabel: "remote image"
      },
      {
        id: "asset-video-1",
        name: "NotebookLM Workflow Clip",
        kind: "video",
        url: "https://example.com/internal-demo/notebooklm-recap",
        source: "link",
        createdAt: now,
        sizeLabel: "linked video"
      },
      {
        id: "asset-video-2",
        name: "Mobile vCard Capture Demo",
        kind: "video",
        url: "https://example.com/internal-demo/mobile-vcard-capture",
        source: "link",
        createdAt: now,
        sizeLabel: "linked video"
      },
      {
        id: "asset-link-1",
        name: "Processor Handoff Checklist",
        kind: "link",
        url: "https://example.com/internal/checklists/processor-handoff",
        source: "link",
        createdAt: now,
        sizeLabel: "linked checklist"
      }
    ],
    drafts: [
      {
        id: "draft-monday-1",
        title: "Monday quick win: morning inbox triage with Gemini",
        subject: "Monday AI Quick Win: Clear the inbox before 9:00 a.m.",
        previewText: "Use Gemini to separate borrower, realtor, and ops follow-up before the day gets noisy.",
        body: [
          "The One Thing:",
          "Run one 12-minute triage pass before the day drifts and use AI for structure, not final judgment.",
          "",
          "Script Lab:",
          "1. Pull the top active borrower, realtor, and ops threads first.",
          "2. Ask Gemini for the first reply draft or recap only, not the final send.",
          "3. Move confirmed next steps into the CRM and keep sensitive language in human review.",
          "",
          "Knowledge anchor: Inbox Triage Workflow | Gemini Workspace Quickstart",
          "Preview-only attachments: AI Inbox Demo Still",
          "",
          "Review note:",
          "Anything that references approvals, rates, fees, disclosures, or borrower-specific timelines still needs compliance and factual review.",
          "",
          "The 24 Hour Task:",
          "Run the triage on your first Monday inbox block and save the prompt that produced the cleanest first-pass draft."
        ].join("\n"),
        sendDay: "Monday",
        audience: "Team",
        sourceLane: "Google AI",
        topic: "Morning inbox triage with Gemini",
        notes:
          "Focus on the first 12 minutes of the day. Separate borrower, realtor, and ops work before drafting anything sensitive.",
        assetIds: ["asset-hero-1"],
        status: "approved",
        createdAt: now,
        updatedAt: now,
        scheduledFor: nextMonday,
        aiMode: "mock",
        revisionCount: 2,
        lastInstruction: "make this more direct and keep the review note explicit",
        complianceMode: "safe"
      },
      {
        id: "draft-thursday-1",
        title: "Thursday field move: clean processor handoff before 4:00 p.m.",
        subject: "Thursday Field Move: Hand off a cleaner file",
        previewText: "A cleaner handoff cuts avoidable back-and-forth and protects the processor's next move.",
        body: [
          "The One Thing:",
          "The handoff should tell the next owner what is missing, what is risky, and what happens next without a second search.",
          "",
          "Field Move:",
          "1. Confirm the missing items before the file leaves your desk.",
          "2. Summarize the active risk in one sentence.",
          "3. Flag the next borrower touch so nothing stalls silently.",
          "",
          "Knowledge anchor: Clean processor handoff is a priority Thursday training theme in the imported operations packet.",
          "Preview-only attachments: Processor Handoff Checklist",
          "",
          "Review note:",
          "Any SLA or timing language still needs factual validation against current operations expectations.",
          "",
          "The 24 Hour Task:",
          "Use the same three-line handoff format on the next live file before Thursday ends."
        ].join("\n"),
        sendDay: "Thursday",
        audience: "Company",
        sourceLane: "Operations",
        topic: "Clean processor handoff",
        notes: "Short operational tip. Broad enough for company distribution and tied to Thursday workflow friction.",
        assetIds: ["asset-link-1"],
        status: "approved",
        createdAt: now,
        updatedAt: now,
        scheduledFor: null,
        aiMode: "mock",
        revisionCount: 1,
        lastInstruction: null,
        complianceMode: "safe"
      },
      {
        id: "draft-monday-2",
        title: "Monday quick win: the 5-minute lead reply",
        subject: "Monday AI Quick Win: Fix the first lead reply before it feels generic",
        previewText: "A better first lead reply earns the response because it sounds relevant, not automated.",
        body: [
          "The One Thing:",
          "The first lead reply should prove you understood the situation, not sound like a generic automation fired.",
          "",
          "Script Lab:",
          "1. Name the current situation in plain language.",
          "2. Offer one next step only.",
          "3. Ask one light question that earns the reply without adding pressure.",
          "",
          "Review note:",
          "Any borrower-facing copy still needs compliance review before live use.",
          "",
          "The 24 Hour Task:",
          "Rewrite one stale lead reply today and remove every line that sounds like 'just checking in.'"
        ].join("\n"),
        sendDay: "Monday",
        audience: "Team",
        sourceLane: "Sales and Marketing",
        topic: "Reply-earning first lead reply",
        notes: "Use the 5-minute response mindset, make the next step obvious, and keep the tone like a sharp mortgage operator.",
        assetIds: [],
        status: "draft",
        createdAt: now,
        updatedAt: now,
        scheduledFor: null,
        aiMode: "mock",
        revisionCount: 0,
        lastInstruction: null,
        complianceMode: "safe"
      },
      {
        id: "draft-thursday-2",
        title: "Thursday field move: transcript to training",
        subject: "Thursday Field Move: Turn one transcript into one usable lesson",
        previewText: "Do not recap the whole recording. Extract one field-ready lesson and move it into the queue.",
        body: [
          "The One Thing:",
          "One transcript should become one useful lesson, not a giant summary wall.",
          "",
          "Repurposing Move:",
          "1. Pick one lesson only.",
          "2. Keep the issue to three actions or fewer.",
          "3. Push every extra idea into the markdown archive, not the email.",
          "",
          "Preview-only attachments: NotebookLM Workflow Clip",
          "",
          "Review note:",
          "If the transcript includes borrower or product specifics, trim or review them before reuse.",
          "",
          "The 24 Hour Task:",
          "Pull one usable lesson from the next training transcript and archive the rest for later reuse."
        ].join("\n"),
        sendDay: "Thursday",
        audience: "Team",
        sourceLane: "Weekly Training",
        topic: "Transcript extraction discipline",
        notes: "Useful for the Thursday internal production rhythm.",
        assetIds: ["asset-video-1"],
        status: "sent",
        createdAt: now,
        updatedAt: now,
        scheduledFor: lastThursday,
        aiMode: "mock",
        revisionCount: 2,
        lastInstruction: "shorten this",
        complianceMode: "safe"
      },
      {
        id: "draft-monday-3",
        title: "Monday quick win: digital vCard lead capture",
        subject: "Monday AI Quick Win: Capture the lead before it cools off",
        previewText: "Use a digital vCard flow to catch the lead in the moment and move it into follow-up cleanly.",
        body: [
          "The One Thing:",
          "If a lead hits while you are mobile, the fastest win is capturing contact cleanly before the opportunity cools off.",
          "",
          "Workflow Drop:",
          "1. Keep the capture link or vCard ready on mobile.",
          "2. Move the contact into the right follow-up bucket immediately.",
          "3. Use AI to draft the first personalized touch, not the entire sequence.",
          "",
          "Preview-only attachments: Mobile vCard Capture Demo",
          "",
          "Review note:",
          "Any claims about company lead flow or approved capture process still need factual validation.",
          "",
          "The 24 Hour Task:",
          "Test the capture flow once on mobile and confirm the contact lands in the right follow-up path."
        ].join("\n"),
        sendDay: "Monday",
        audience: "Team",
        sourceLane: "Operations",
        topic: "Digital vCard lead capture",
        notes: "One of the approved first-use operations topics from the normalized operator notes.",
        assetIds: ["asset-video-2"],
        status: "approved",
        createdAt: now,
        updatedAt: now,
        scheduledFor: null,
        aiMode: "mock",
        revisionCount: 0,
        lastInstruction: null,
        complianceMode: "safe"
      },
      {
        id: "draft-thursday-3",
        title: "Thursday field move: borrower consent before rate lock",
        subject: "Thursday Field Move: Confirm borrower consent before the lock step",
        previewText: "Do not let a rate lock become a silent assumption. Make the borrower consent checkpoint explicit and reviewable.",
        body: [
          "The One Thing:",
          "The lock step needs a clear borrower consent checkpoint before anyone treats it like a done deal.",
          "",
          "Field Move:",
          "1. Confirm who owns the consent checkpoint before the day gets rushed.",
          "2. Record the borrower confirmation in the file notes.",
          "3. Escalate exceptions before the deadline gets tight.",
          "",
          "Review note:",
          "Actual rate lock and extension policy details still need factual validation and compliance review before operational use.",
          "",
          "The 24 Hour Task:",
          "Audit one live file this week and verify the consent checkpoint is explicit, recorded, and easy to review."
        ].join("\n"),
        sendDay: "Thursday",
        audience: "Company",
        sourceLane: "Operations",
        topic: "Borrower consent before rate lock",
        notes: "Approved first-use topic from the normalized operator notes.",
        assetIds: [],
        status: "draft",
        createdAt: now,
        updatedAt: now,
        scheduledFor: null,
        aiMode: "mock",
        revisionCount: 0,
        lastInstruction: null,
        complianceMode: "safe"
      }
    ],
    schedule: [
      {
        id: "schedule-1",
        draftId: "draft-monday-1",
        title: "Monday quick win: morning inbox triage with Gemini",
        sendDay: "Monday",
        scheduledFor: nextMonday,
        status: "scheduled",
        manualOverride: false,
        createdAt: now
      },
      {
        id: "schedule-2",
        draftId: "draft-thursday-2",
        title: "Thursday field move: transcript to training",
        sendDay: "Thursday",
        scheduledFor: lastThursday,
        status: "sent",
        manualOverride: true,
        createdAt: now
      }
    ],
    approvals: [
      {
        id: "approval-1",
        draftId: "draft-monday-1",
        action: "approved",
        note: "Approved for the next Monday slot after the review note and 24 hour task were tightened.",
        createdAt: now
      },
      {
        id: "approval-2",
        draftId: "draft-monday-1",
        action: "scheduled",
        note: `Moved into the ${getCurrentMonthKey()} Monday queue.`,
        createdAt: now
      },
      {
        id: "approval-3",
        draftId: "draft-thursday-1",
        action: "approved",
        note: "Approved after the handoff note was made company-safe.",
        createdAt: now
      },
      {
        id: "approval-4",
        draftId: "draft-thursday-2",
        action: "sent",
        note: "Marked sent in local mock mode after manual review.",
        createdAt: now
      }
    ],
    topics: [
      {
        id: "topic-1",
        sendDay: "Monday",
        title: "Morning inbox triage with Gemini",
        sourceLane: "Google AI",
        angle:
          "Use one 12-minute AI pass to sort borrower, realtor, and ops work before anything sensitive gets drafted.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/01_google_ai_for_loan_officers/knowledge_docs/INBOX_TRIAGE_WORKFLOW.md",
          "knowledge_system/01_google_ai_for_loan_officers/knowledge_docs/GEMINI_WORKSPACE_QUICKSTART.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/MONDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: true
      },
      {
        id: "topic-2",
        sendDay: "Monday",
        title: "The 5-minute lead reply that earns the response",
        sourceLane: "Sales and Marketing",
        angle: "Replace generic follow-up with one relevant next step and one light question that sounds human.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/03_sales_marketing_communication_and_conversion/communication_frameworks/LEAD_CONVERSION_FRAMEWORKS.md",
          "knowledge_system/03_sales_marketing_communication_and_conversion/templates/REUSABLE_EMAIL_SMS_TEMPLATES.md"
        ],
        used: false
      },
      {
        id: "topic-3",
        sendDay: "Monday",
        title: "Digital vCard lead capture from mobile moments",
        sourceLane: "Operations",
        angle:
          "Catch the lead in the moment, move it into the right follow-up bucket, and draft the first touch with AI.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/MOSO_QUICK_START_CHEAT_SHEET.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/MONDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: true
      },
      {
        id: "topic-4",
        sendDay: "Monday",
        title: "Build your first Lead Reply Gem",
        sourceLane: "Google AI",
        angle: "Turn your best lead reply structure into a reusable Gemini Gem without pretending the output is final.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/01_google_ai_for_loan_officers/knowledge_docs/GEMINI_GEMS_BUILD_GUIDE.md",
          "knowledge_system/01_google_ai_for_loan_officers/prompt_library/LO_CORE_PROMPT_LIBRARY.md"
        ],
        used: false
      },
      {
        id: "topic-5",
        sendDay: "Monday",
        title: "Automated rate alerts that trigger a follow-up",
        sourceLane: "Operations",
        angle: "Show how a short alert can prompt a real next step without overstating policy or rate assumptions.",
        suggestedAudience: "Company",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/AUTOMATED_RATE_ALERT_TEMPLATES.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/MONDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: false
      },
      {
        id: "topic-6",
        sendDay: "Monday",
        title: "Turn one transcript into one usable lesson",
        sourceLane: "Weekly Training",
        angle: "Do less recap and more extraction. One lesson only.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/04_weekly_training_production_lab/workflows/TRANSCRIPT_TO_EMAIL_WORKFLOW.md",
          "knowledge_system/04_weekly_training_production_lab/templates/WEEKLY_EMAIL_TEMPLATE.md"
        ],
        used: true
      },
      {
        id: "topic-7",
        sendDay: "Thursday",
        title: "NotebookLM digital brain for guideline lookup",
        sourceLane: "Google AI",
        angle: "Use NotebookLM to ground yourself in uploaded guidance, then extract one action instead of a summary wall.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/01_google_ai_for_loan_officers/knowledge_docs/NOTEBOOKLM_BASICS_FOR_LOS.md",
          "knowledge_system/01_google_ai_for_loan_officers/knowledge_docs/VIDEO_DEMO_SCRIPTS_AND_ASSETS.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/THURSDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: false
      },
      {
        id: "topic-8",
        sendDay: "Thursday",
        title: "Transparency updates when the file slows down",
        sourceLane: "Sales and Marketing",
        angle: "Say what is known, what is pending, and what happens next without slipping into vague filler.",
        suggestedAudience: "Company",
        linkedKnowledgePaths: [
          "knowledge_system/03_sales_marketing_communication_and_conversion/playbooks/THE_TRANSPARENCY_PLAYBOOK.md",
          "knowledge_system/03_sales_marketing_communication_and_conversion/templates/REUSABLE_EMAIL_SMS_TEMPLATES.md"
        ],
        used: false
      },
      {
        id: "topic-9",
        sendDay: "Thursday",
        title: "Borrower consent before rate lock",
        sourceLane: "Operations",
        angle:
          "Keep the consent checkpoint explicit, reviewable, and human-owned before anyone treats the lock like it is done.",
        suggestedAudience: "Company",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/RATE_LOCK_AND_EXTENSION_POLICY.md"
        ],
        used: false
      },
      {
        id: "topic-10",
        sendDay: "Thursday",
        title: "Missing signatures before processor submit",
        sourceLane: "Operations",
        angle: "Catch signature misses before the file hits the processor and causes avoidable churn.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/7_DAY_PROCESSING_SLA_GUIDE.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/THURSDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: false
      },
      {
        id: "topic-11",
        sendDay: "Thursday",
        title: "Two property issues that kill appraisal early",
        sourceLane: "Operations",
        angle: "Use one Thursday issue to prevent the appraisal surprises that burn time later in the file.",
        suggestedAudience: "Company",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/APPRAISAL_BOTTLENECK_TROUBLESHOOTER.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/THURSDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: false
      },
      {
        id: "topic-12",
        sendDay: "Thursday",
        title: "Perfect 7 day escalation ticket",
        sourceLane: "Operations",
        angle: "Show the exact escalation shape that protects time instead of creating more noise.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/workflows/UNDERWRITING_ESCALATION_TICKET_FORMAT.md",
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/7_DAY_PROCESSING_SLA_GUIDE.md"
        ],
        used: false
      },
      {
        id: "topic-13",
        sendDay: "Thursday",
        title: "Portal card extraction from the weekly email",
        sourceLane: "Weekly Training",
        angle: "Compress one issue into one action card for reuse after the email is approved.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/04_weekly_training_production_lab/workflows/EMAIL_TO_PORTAL_CARD_WORKFLOW.md"
        ],
        used: false
      }
    ]
  };
}
