import type {
  DraftContent,
  GenerateDraftInput,
  MemoryProfile,
  MemorySignal,
  ReviseDraftInput
} from "@/lib/types";

function cleanFence(input: string): string {
  return input.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
}

function shortList(items: string[]): string[] {
  return items.filter(Boolean).slice(0, 3);
}

function activeSignals(signals: MemorySignal[]): string {
  return signals
    .filter((signal) => signal.active)
    .slice(0, 5)
    .map((signal) => `- ${signal.label}: ${signal.content}`)
    .join("\n");
}

function profileBlock(profile: MemoryProfile): string {
  return [
    `Tone: ${profile.tonePreference}`,
    `Length: ${profile.lengthPreference}`,
    `Subject line: ${profile.subjectLinePreference}`,
    `Favorite structures: ${profile.favoriteStructures.join(", ")}`,
    `Use phrases: ${profile.phrasesToUse.join(", ")}`,
    `Avoid phrases: ${profile.phrasesToAvoid.join(", ")}`,
    `Compliance preference: ${profile.compliancePreference}`
  ].join("\n");
}

function laneAngle(sourceLane: GenerateDraftInput["sourceLane"]): string {
  switch (sourceLane) {
    case "Google AI":
      return "Show one practical AI move that can save time right away.";
    case "Sales and Marketing":
      return "Make the message sound like a confident mortgage operator, not generic sales copy.";
    case "Operations":
      return "Reduce friction, protect handoffs, and make the next step obvious.";
    case "Weekly Training":
      return "Extract one useful lesson and keep the issue tight.";
    default:
      return "Keep the issue practical and short.";
  }
}

function buildMockActions(topic: string, notes: string): string[] {
  const lines = notes
    .split(/\n|\. /)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (lines.length >= 3) {
    return lines.map((line) => line.replace(/[.]+$/, ""));
  }

  return [
    `Pull one clear use case from ${topic.toLowerCase()}.`,
    "Keep the issue to one lesson and three practical actions.",
    "Flag anything sensitive for factual or compliance review before reuse."
  ];
}

function buildMockDraft(input: GenerateDraftInput): DraftContent {
  const lead =
    input.sendDay === "Monday"
      ? `${input.preferenceProfile.phrasesToUse[0] || "Quick win"}`
      : "Field move";
  const subjectLead =
    input.sendDay === "Monday" ? "Monday AI Quick Win" : "Thursday Field Move";
  const actions = buildMockActions(input.topic, input.notes);
  const laneNote = laneAngle(input.sourceLane);
  const reviewLine =
    input.complianceMode === "safe"
      ? "Review note: keep any rates, approvals, borrower specifics, or timing language in human review."
      : "Review note: separate confirmed facts from assumptions before send.";
  const knowledgeLine = input.knowledgeHighlights[0]
    ? `Knowledge anchor: ${input.knowledgeHighlights[0]}`
    : "";
  const attachmentLine =
    input.attachments.length > 0
      ? `Attached support: ${input.attachments.map((asset) => asset.name).join(", ")}`
      : "";

  return {
    title: `${lead}: ${input.topic}`.replace(/\s+/g, " ").trim(),
    subject: `${subjectLead}: ${input.topic}`.replace(/\s+/g, " ").trim(),
    previewText: `${laneNote} ${actions[0]}`.slice(0, 160),
    mode: "mock",
    body: [
      "Why this matters now:",
      laneNote,
      "",
      input.sendDay === "Monday" ? "This week's move:" : "What to tighten this week:",
      ...actions.map((action, index) => `${index + 1}. ${action}`),
      "",
      knowledgeLine,
      attachmentLine,
      reviewLine,
      "",
      "Next step:",
      input.audience === "Team"
        ? "Use this in the next active file or follow-up block today."
        : "Use this as a broad team standard and keep local exceptions out of the main issue."
    ]
      .filter(Boolean)
      .join("\n")
  };
}

function applyInstructionHeuristics(content: DraftContent, instruction: string): DraftContent {
  const lower = instruction.toLowerCase();
  let subject = content.subject;
  let previewText = content.previewText;
  let body = content.body;

  if (lower.includes("shorten")) {
    const lines = body.split("\n").filter(Boolean);
    body = lines.slice(0, Math.min(lines.length, 9)).join("\n");
    previewText = previewText.slice(0, 110);
  }

  if (lower.includes("direct")) {
    subject = subject.replace("AI Quick Win", "Operator Move");
    body = body.replace("Why this matters now:", "Why this matters:");
  }

  if (lower.includes("sharp mortgage operator")) {
    previewText = `Operator angle: ${previewText}`;
  }

  if (lower.includes("safer") || lower.includes("compliance")) {
    if (!body.includes("Review note:")) {
      body = `${body}\n\nReview note: keep anything product-specific in human review before send.`;
    }

    body = body.replaceAll("will", "can");
  }

  if (lower.includes("monday quick win")) {
    subject = subject.replace(/^.*?:/, "Monday AI Quick Win:");
  }

  if (lower.includes("thursday")) {
    subject = subject.replace(/^.*?:/, "Thursday Field Move:");
  }

  return {
    ...content,
    subject,
    previewText,
    body
  };
}

async function callGemini(prompt: string): Promise<DraftContent | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return null;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  const text =
    payload?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("") || "";

  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(cleanFence(text)) as DraftContent;
    return {
      ...parsed,
      mode: "gemini"
    };
  } catch {
    return null;
  }
}

export async function generateDraft(input: GenerateDraftInput): Promise<DraftContent> {
  const prompt = [
    "Create a short internal training email draft as JSON with keys: title, subject, previewText, body.",
    "Do not invent unsupported company facts, legal rules, or compliance claims.",
    "Keep one lesson, three actions, one review note, and one next step.",
    `Send day: ${input.sendDay}`,
    `Audience: ${input.audience}`,
    `Source lane: ${input.sourceLane}`,
    `Topic: ${input.topic}`,
    `Notes: ${input.notes}`,
    `Compliance mode: ${input.complianceMode}`,
    `Knowledge highlights:\n${shortList(input.knowledgeHighlights).join("\n")}`,
    `Preference profile:\n${profileBlock(input.preferenceProfile)}`,
    `Active memory:\n${activeSignals(input.memorySignals)}`
  ].join("\n\n");

  const geminiResult = await callGemini(prompt);

  if (geminiResult) {
    return geminiResult;
  }

  return buildMockDraft(input);
}

export async function reviseDraft(input: ReviseDraftInput): Promise<DraftContent> {
  const baseContent: DraftContent = {
    title: input.draft.title,
    subject: input.draft.subject,
    previewText: input.draft.previewText,
    body: input.draft.body,
    mode: input.draft.aiMode
  };

  const prompt = [
    "Revise this internal training email draft as JSON with keys: title, subject, previewText, body.",
    "Keep the draft practical, short, and mortgage relevant.",
    "Do not add unsupported company facts or compliance claims.",
    `Instruction: ${input.instruction}`,
    `Preference profile:\n${profileBlock(input.preferenceProfile)}`,
    `Active memory:\n${activeSignals(input.memorySignals)}`,
    `Knowledge highlights:\n${shortList(input.knowledgeHighlights).join("\n")}`,
    `Current draft:\n${JSON.stringify(baseContent, null, 2)}`
  ].join("\n\n");

  const geminiResult = await callGemini(prompt);

  if (geminiResult) {
    return geminiResult;
  }

  return applyInstructionHeuristics(baseContent, input.instruction);
}
