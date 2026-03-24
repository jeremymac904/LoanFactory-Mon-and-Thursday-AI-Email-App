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
  return items.filter(Boolean).slice(0, 4);
}

function activeSignals(signals: MemorySignal[]): string {
  const active = signals
    .filter((signal) => signal.active)
    .slice(0, 5)
    .map((signal) => `- ${signal.label}: ${signal.content}`);

  return active.length > 0 ? active.join("\n") : "- No active memory signals yet.";
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

function laneAngle(
  sourceLane: GenerateDraftInput["sourceLane"],
  sendDay: GenerateDraftInput["sendDay"]
): string {
  switch (sourceLane) {
    case "Google AI":
      return sendDay === "Monday"
        ? "Show one safe AI quick win that saves time before the day gets noisy."
        : "Show one grounded AI workflow that sharpens field execution before the week closes.";
    case "Sales and Marketing":
      return "Make the message sound like a confident mortgage operator, not generic sales copy.";
    case "Operations":
      return sendDay === "Monday"
        ? "Reduce friction early, protect the file, and make the next move obvious."
        : "Tighten the workflow, prevent avoidable misses, and keep the handoff clean.";
    case "Weekly Training":
      return "Extract one useful lesson, keep only the usable move, and send the rest to archive.";
    default:
      return "Keep the issue practical and short.";
  }
}

function defaultLaneActions(sourceLane: GenerateDraftInput["sourceLane"]): string[] {
  switch (sourceLane) {
    case "Google AI":
      return [
        "Sort the top active threads or tasks before asking AI for a first-pass draft",
        "Use AI for structure, recap, and prioritization instead of final judgment",
        "Move only confirmed next steps into the CRM or follow-up queue"
      ];
    case "Sales and Marketing":
      return [
        "Name the current context so the message does not sound automated",
        "Offer one useful next step instead of three competing options",
        "Ask one light question that earns a reply without pressure"
      ];
    case "Operations":
      return [
        "Check the blocker before the handoff leaves your desk",
        "Write the active risk in one sentence so the next owner does not guess",
        "Confirm the next borrower or processor touch before the file stalls"
      ];
    case "Weekly Training":
      return [
        "Pull one usable lesson only, not a full recap of the session",
        "Keep the issue to one move and three actions",
        "Route every extra idea into archive, portal, or follow-up content instead of the email"
      ];
    default:
      return [
        "Pull one usable lesson from the source material",
        "Keep the issue short, tactical, and specific",
        "Flag anything sensitive for human review before reuse"
      ];
  }
}

function buildMockActions(
  topic: string,
  notes: string,
  sourceLane: GenerateDraftInput["sourceLane"]
): string[] {
  const lines = notes
    .split(/\n|\. /)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (lines.length >= 3) {
    return lines.map((line) => line.replace(/[.]+$/, ""));
  }

  return [`Pull one clear use case from ${topic.toLowerCase()}.`, ...defaultLaneActions(sourceLane)].slice(0, 3);
}

function buildOneThing(input: GenerateDraftInput): string {
  const noteLead = input.notes
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);

  return (noteLead || laneAngle(input.sourceLane, input.sendDay)).replace(/[.]+$/, "");
}

function buildSectionLabel(input: GenerateDraftInput): string {
  if (input.sendDay === "Monday") {
    return input.sourceLane === "Weekly Training" ? "Repurposing Move:" : "Script Lab:";
  }

  return input.sourceLane === "Google AI" ? "Workflow Drop:" : "Field Move:";
}

function buildReviewLine(
  sourceLane: GenerateDraftInput["sourceLane"],
  complianceMode: GenerateDraftInput["complianceMode"]
): string {
  const base =
    complianceMode === "safe"
      ? "Keep any rates, approvals, fees, timelines, borrower specifics, or policy claims in human review."
      : "Separate confirmed facts from assumptions before approval or send.";

  switch (sourceLane) {
    case "Google AI":
      return `${base} Do not treat AI output as the final answer on regulated communication or customer-specific guidance.`;
    case "Sales and Marketing":
      return `${base} Borrower, lead, and realtor-facing language still needs compliance review before live use.`;
    case "Operations":
      return `${base} Operational policy details still need factual validation against current practice.`;
    case "Weekly Training":
      return `${base} Do not publish raw transcript language that includes sensitive file detail.`;
    default:
      return base;
  }
}

function buildTaskLine(input: GenerateDraftInput, actions: string[]): string {
  const firstAction = actions[0]?.replace(/^[0-9]+\.\s*/, "").replace(/[.]+$/, "");

  if (input.sendDay === "Monday") {
    return `${firstAction || "Use the lesson once today"}. Save the winning version in the training archive before the day ends.`;
  }

  return `${firstAction || "Use the lesson once today"}. Close the loop on one live file or one training draft before Thursday ends.`;
}

function buildMockDraft(input: GenerateDraftInput): DraftContent {
  const lead = input.sendDay === "Monday" ? "Monday quick win" : "Thursday field move";
  const subjectLead = input.sendDay === "Monday" ? "Monday AI Quick Win" : "Thursday Field Move";
  const actions = buildMockActions(input.topic, input.notes, input.sourceLane);
  const laneNote = laneAngle(input.sourceLane, input.sendDay);
  const reviewLine = buildReviewLine(input.sourceLane, input.complianceMode);
  const knowledgeLine =
    shortList(input.knowledgeHighlights).length > 0
      ? `Knowledge anchor: ${shortList(input.knowledgeHighlights).join(" | ")}`
      : "";
  const attachmentLine =
    input.attachments.length > 0
      ? `Preview-only attachments: ${input.attachments.map((asset) => asset.name).join(", ")}`
      : "";

  return {
    title: `${lead}: ${input.topic}`.replace(/\s+/g, " ").trim(),
    subject: `${subjectLead}: ${input.topic}`.replace(/\s+/g, " ").trim(),
    previewText: `${laneNote} ${actions[0]}`.slice(0, 160),
    mode: "mock",
    body: [
      "The One Thing:",
      buildOneThing(input),
      "",
      buildSectionLabel(input),
      ...actions.map((action, index) => `${index + 1}. ${action}`),
      "",
      knowledgeLine,
      attachmentLine,
      "Review note:",
      reviewLine,
      "",
      "The 24 Hour Task:",
      buildTaskLine(input, actions),
      "",
      input.audience === "Team"
        ? "Team version note: Keep the examples close to live workflow friction and peer execution."
        : "Company version note: Keep the lesson broad enough to travel across teams without local shorthand."
    ]
      .filter(Boolean)
      .join("\n")
  };
}

function normalizeBodySpacing(body: string): string {
  return body
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensureReviewSection(body: string, reviewText: string): string {
  if (body.includes("Review note:")) {
    return body;
  }

  if (body.includes("The 24 Hour Task:")) {
    return normalizeBodySpacing(
      body.replace("The 24 Hour Task:", `Review note:\n${reviewText}\n\nThe 24 Hour Task:`)
    );
  }

  return normalizeBodySpacing(`${body}\n\nReview note:\n${reviewText}`);
}

function setSubjectPrefix(subject: string, prefix: string): string {
  if (subject.includes(":")) {
    return subject.replace(/^[^:]+:/, `${prefix}:`);
  }

  return `${prefix}: ${subject}`;
}

function setTitlePrefix(title: string, prefix: string): string {
  if (title.includes(":")) {
    return title.replace(/^[^:]+:/, `${prefix}:`);
  }

  return `${prefix}: ${title}`;
}

function applyInstructionHeuristics(content: DraftContent, instruction: string): DraftContent {
  const lower = instruction.toLowerCase();
  let title = content.title;
  let subject = content.subject;
  let previewText = content.previewText;
  let body = content.body;

  if (lower.includes("shorten")) {
    const nextLines: string[] = [];
    let actionCount = 0;

    for (const line of body.split("\n")) {
      const trimmed = line.trim();

      if (/^\d+\./.test(trimmed)) {
        if (actionCount >= 2) {
          continue;
        }

        actionCount += 1;
      }

      nextLines.push(line);
    }

    body = normalizeBodySpacing(nextLines.join("\n"));
    previewText = previewText.slice(0, 110);
  }

  if (lower.includes("direct")) {
    title = setTitlePrefix(title, "Operator move");
    subject = setSubjectPrefix(subject, "Operator Move");
    previewText = previewText.replace(/^Show /, "Use ").replace(/^Make /, "Keep ");
  }

  if (lower.includes("sharp mortgage operator")) {
    title = title.replace(/^Monday quick win/i, "Operator move");
    previewText = `Operator angle: ${previewText}`.slice(0, 160);
    body = body.replace("Team version note:", "Operator note:");
  }

  if (lower.includes("safer") || lower.includes("compliance")) {
    body = ensureReviewSection(
      body,
      "Keep anything product-specific, rate-related, approval-related, or borrower-specific in human review before send."
    );
    body = body.replaceAll(/\bwill\b/g, "can").replaceAll(/\balways\b/g, "often");
  }

  if (lower.includes("monday quick win")) {
    title = setTitlePrefix(title, "Monday quick win");
    subject = setSubjectPrefix(subject, "Monday AI Quick Win");
  }

  if (lower.includes("thursday")) {
    title = setTitlePrefix(title, "Thursday field move");
    subject = setSubjectPrefix(subject, "Thursday Field Move");
  }

  if (lower.includes("script lab") && !body.includes("Script Lab:")) {
    body = normalizeBodySpacing(
      body.replace(
        "Review note:",
        "Script Lab:\n1. Draft the opener in plain English.\n2. Keep one next step only.\n\nReview note:"
      )
    );
  }

  if (lower.includes("workflow drop") && !body.includes("Workflow Drop:")) {
    body = normalizeBodySpacing(
      body.replace(
        "Review note:",
        "Workflow Drop:\n1. Capture the blocker.\n2. Push only the next action.\n\nReview note:"
      )
    );
  }

  return {
    ...content,
    title,
    subject,
    previewText,
    body: normalizeBodySpacing(body)
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
    "Use the STU model: short, tactical, useful.",
    "Do not invent unsupported company facts, legal rules, or compliance claims.",
    "Do not treat imported source packets as approved company policy.",
    "Keep one lesson only.",
    "The body should use these plain-text section headings: The One Thing, one middle section, Review note, The 24 Hour Task.",
    "Keep the body under roughly 220 words.",
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
    "Keep the draft practical, short, mortgage relevant, and under roughly 220 words.",
    "Preserve the hard human review gate.",
    "Keep or strengthen these section headings: The One Thing, one middle section, Review note, The 24 Hour Task.",
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
