import { getCurrentMonthKey, getNextSendDate } from "@/lib/date-utils";
import type { StudioState } from "@/lib/types";

function nowIso(): string {
  return new Date().toISOString();
}

export function createSeedState(): StudioState {
  const now = nowIso();
  const nextMonday = getNextSendDate("Monday");
  const nextThursday = getNextSendDate("Thursday");

  return {
    preferences: {
      tonePreference: "Direct, sharp, operator-level, and useful in under two minutes.",
      lengthPreference: "Keep each issue short enough to scan on a phone in one pass.",
      subjectLinePreference: "Lead with the tactical outcome, then the angle.",
      favoriteStructures: [
        "Why this matters now",
        "3 tactical moves",
        "one review note",
        "one next step"
      ],
      phrasesToUse: ["quick win", "operator move", "what to do now"],
      phrasesToAvoid: ["game changer", "revolutionary", "just checking in"],
      compliancePreference: "Call out review notes instead of overstating certainty.",
      defaultAudience: "Team",
      defaultSendDay: "Monday"
    },
    memorySignals: [
      {
        id: "mem-manual-1",
        createdAt: now,
        type: "manual_preference",
        label: "Tone baseline",
        content: "Jeremy prefers concise training notes that feel like an operator brief, not a newsletter.",
        active: true
      },
      {
        id: "mem-approval-1",
        createdAt: now,
        type: "approval_pattern",
        label: "Approved pattern",
        content: "Approved drafts usually keep one lesson, three action bullets, and a single review note.",
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
        name: "NotebookLM Recap Demo",
        kind: "video",
        url: "https://example.com/internal-demo/notebooklm-recap",
        source: "link",
        createdAt: now,
        sizeLabel: "linked video"
      }
    ],
    drafts: [
      {
        id: "draft-monday-1",
        title: "Monday quick win: inbox triage with Gemini",
        subject: "Monday AI Quick Win: Triage your inbox in 12 minutes",
        previewText: "Use one clean Gemini pass to sort urgent borrower, realtor, and ops follow-up before the day drifts.",
        body: [
          "Why this matters now:",
          "If your inbox sets the pace for the day, AI has to help you sort, not just summarize.",
          "",
          "This week's move:",
          "1. Pull the top ten active threads first.",
          "2. Group them into borrower, realtor, and internal ops work.",
          "3. Draft only the first reply and review anything sensitive before send.",
          "",
          "Review note:",
          "Anything that references approvals, rates, fees, or timelines still needs compliance and factual review.",
          "",
          "Next step:",
          "Run this on your first inbox block Monday morning and keep the prompt outcome in your CRM notes."
        ].join("\n"),
        sendDay: "Monday",
        audience: "Team",
        sourceLane: "Google AI",
        topic: "Inbox triage with Gemini",
        notes: "Focus on the first 12 minutes of the day. Keep it tactical.",
        assetIds: ["asset-hero-1"],
        status: "approved",
        createdAt: now,
        updatedAt: now,
        scheduledFor: null,
        aiMode: "mock",
        revisionCount: 1,
        lastInstruction: "make this more direct",
        complianceMode: "safe"
      },
      {
        id: "draft-thursday-1",
        title: "Thursday field move: cleaner processor handoffs",
        subject: "Thursday Field Move: Cut friction before the handoff",
        previewText: "Sharper handoffs reduce avoidable back-and-forth and give processors cleaner files to move.",
        body: [
          "What to tighten this week:",
          "1. Confirm the missing items before you hand the file off.",
          "2. Summarize the active risk in one sentence.",
          "3. Flag the next borrower touch so nothing stalls silently.",
          "",
          "Why it helps:",
          "A clean handoff protects turn time and prevents avoidable confusion downstream.",
          "",
          "Review note:",
          "Any SLA or timing language still needs factual validation against current ops expectations."
        ].join("\n"),
        sendDay: "Thursday",
        audience: "Company",
        sourceLane: "Operations",
        topic: "Processor handoff hygiene",
        notes: "Short operational tip. Broad enough for company distribution.",
        assetIds: [],
        status: "scheduled",
        createdAt: now,
        updatedAt: now,
        scheduledFor: nextThursday,
        aiMode: "mock",
        revisionCount: 0,
        lastInstruction: null,
        complianceMode: "safe"
      },
      {
        id: "draft-monday-2",
        title: "Monday quick win: follow-up that earns the reply",
        subject: "Monday AI Quick Win: Fix the follow-up that sounds generic",
        previewText: "A better first follow-up earns the reply by sounding relevant, not automated.",
        body: [
          "Use this framework:",
          "1. Name the current context.",
          "2. Offer one next step.",
          "3. Ask one light question only.",
          "",
          "Keep out:",
          "Just checking in, wanted to touch base, and any promise you cannot support."
        ].join("\n"),
        sendDay: "Monday",
        audience: "Team",
        sourceLane: "Sales and Marketing",
        topic: "Reply-earning lead follow-up",
        notes: "Make this sound like a sharp mortgage operator.",
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
          "Production move:",
          "1. Pick one lesson only.",
          "2. Keep the issue to three actions.",
          "3. Push the rest into the markdown archive, not the email.",
          "",
          "Review note:",
          "If the transcript includes borrower or product specifics, trim or review them before reuse."
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
        scheduledFor: nextMonday,
        aiMode: "mock",
        revisionCount: 2,
        lastInstruction: "shorten this",
        complianceMode: "safe"
      }
    ],
    schedule: [
      {
        id: "schedule-1",
        draftId: "draft-thursday-1",
        title: "Thursday field move: cleaner processor handoffs",
        sendDay: "Thursday",
        scheduledFor: nextThursday,
        status: "scheduled",
        manualOverride: false,
        createdAt: now
      },
      {
        id: "schedule-2",
        draftId: "draft-thursday-2",
        title: "Thursday field move: transcript to training",
        sendDay: "Thursday",
        scheduledFor: nextMonday,
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
        note: "Approved for the next Monday slot after subject tightened.",
        createdAt: now
      },
      {
        id: "approval-2",
        draftId: "draft-thursday-1",
        action: "scheduled",
        note: `Moved into the ${getCurrentMonthKey()} Thursday queue.`,
        createdAt: now
      },
      {
        id: "approval-3",
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
        title: "Gemini inbox triage for borrower and realtor follow-up",
        sourceLane: "Google AI",
        angle: "Use one short triage pass before the day gets noisy.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/01_google_ai_for_loan_officers/knowledge_docs/INBOX_TRIAGE_WORKFLOW.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/MONDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: false
      },
      {
        id: "topic-2",
        sendDay: "Monday",
        title: "Lead follow-up that earns the reply",
        sourceLane: "Sales and Marketing",
        angle: "Replace generic follow-up with one relevant next step.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/03_sales_marketing_communication_and_conversion/communication_frameworks/LEAD_CONVERSION_FRAMEWORKS.md"
        ],
        used: false
      },
      {
        id: "topic-3",
        sendDay: "Monday",
        title: "MOSO quick wins before the day slips",
        sourceLane: "Operations",
        angle: "Stack three operational wins before noon.",
        suggestedAudience: "Company",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/MOSO_QUICK_START_CHEAT_SHEET.md"
        ],
        used: false
      },
      {
        id: "topic-4",
        sendDay: "Monday",
        title: "Turn one transcript into one usable training lesson",
        sourceLane: "Weekly Training",
        angle: "Do less recap and more extraction.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/04_weekly_training_production_lab/workflows/TRANSCRIPT_TO_EMAIL_WORKFLOW.md"
        ],
        used: true
      },
      {
        id: "topic-5",
        sendDay: "Thursday",
        title: "NotebookLM recap workflow for Thursday field notes",
        sourceLane: "Google AI",
        angle: "Use a grounded recap to pull one training action, not a summary wall.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/01_google_ai_for_loan_officers/knowledge_docs/NOTEBOOKLM_BASICS_FOR_LOS.md",
          "knowledge_system/04_weekly_training_production_lab/topic_banks/THURSDAY_TRAINING_EMAIL_BANK.md"
        ],
        used: false
      },
      {
        id: "topic-6",
        sendDay: "Thursday",
        title: "Transparency updates when the file slows down",
        sourceLane: "Sales and Marketing",
        angle: "Say what is known, what is pending, and what happens next.",
        suggestedAudience: "Company",
        linkedKnowledgePaths: [
          "knowledge_system/03_sales_marketing_communication_and_conversion/playbooks/THE_TRANSPARENCY_PLAYBOOK.md"
        ],
        used: false
      },
      {
        id: "topic-7",
        sendDay: "Thursday",
        title: "Rate lock consent before action",
        sourceLane: "Operations",
        angle: "Keep the consent checkpoint explicit and reviewable.",
        suggestedAudience: "Company",
        linkedKnowledgePaths: [
          "knowledge_system/02_loan_factory_and_terraplus_operations/knowledge_docs/RATE_LOCK_AND_EXTENSION_POLICY.md"
        ],
        used: false
      },
      {
        id: "topic-8",
        sendDay: "Thursday",
        title: "Portal card extraction from the weekly email",
        sourceLane: "Weekly Training",
        angle: "Compress one issue into one action card for reuse.",
        suggestedAudience: "Team",
        linkedKnowledgePaths: [
          "knowledge_system/04_weekly_training_production_lab/workflows/EMAIL_TO_PORTAL_CARD_WORKFLOW.md"
        ],
        used: false
      }
    ]
  };
}
