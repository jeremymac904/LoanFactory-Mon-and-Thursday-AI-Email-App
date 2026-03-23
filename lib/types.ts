export type SendDay = "Monday" | "Thursday";
export type Audience = "Team" | "Company";
export type SourceLane =
  | "Google AI"
  | "Sales and Marketing"
  | "Operations"
  | "Weekly Training";
export type DraftStatus = "draft" | "approved" | "scheduled" | "sent" | "archived";
export type AssetKind = "image" | "video" | "link";
export type ApprovalAction = "approved" | "rejected" | "scheduled" | "sent" | "archived";
export type MemorySignalType =
  | "manual_preference"
  | "edit_instruction"
  | "approval_pattern";

export interface AssetItem {
  id: string;
  name: string;
  kind: AssetKind;
  url: string;
  source: "upload" | "link";
  createdAt: string;
  sizeLabel?: string;
}

export interface DraftItem {
  id: string;
  title: string;
  subject: string;
  previewText: string;
  body: string;
  sendDay: SendDay;
  audience: Audience;
  sourceLane: SourceLane;
  topic: string;
  notes: string;
  assetIds: string[];
  status: DraftStatus;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string | null;
  aiMode: "mock" | "gemini";
  revisionCount: number;
  lastInstruction?: string | null;
  complianceMode: "standard" | "safe";
}

export interface ScheduleItem {
  id: string;
  draftId: string;
  title: string;
  sendDay: SendDay;
  scheduledFor: string;
  status: "scheduled" | "sent" | "archived";
  manualOverride: boolean;
  createdAt: string;
}

export interface ApprovalEvent {
  id: string;
  draftId: string;
  action: ApprovalAction;
  note: string;
  createdAt: string;
}

export interface MemoryProfile {
  tonePreference: string;
  lengthPreference: string;
  subjectLinePreference: string;
  favoriteStructures: string[];
  phrasesToUse: string[];
  phrasesToAvoid: string[];
  compliancePreference: string;
  defaultAudience: Audience;
  defaultSendDay: SendDay;
}

export interface MemorySignal {
  id: string;
  createdAt: string;
  type: MemorySignalType;
  label: string;
  content: string;
  active: boolean;
}

export interface TopicBankEntry {
  id: string;
  sendDay: SendDay;
  title: string;
  sourceLane: SourceLane;
  angle: string;
  suggestedAudience: Audience;
  linkedKnowledgePaths: string[];
  used: boolean;
}

export interface StudioState {
  drafts: DraftItem[];
  schedule: ScheduleItem[];
  approvals: ApprovalEvent[];
  assets: AssetItem[];
  preferences: MemoryProfile;
  memorySignals: MemorySignal[];
  topics: TopicBankEntry[];
}

export interface GenerateDraftInput {
  sendDay: SendDay;
  audience: Audience;
  sourceLane: SourceLane;
  topic: string;
  notes: string;
  complianceMode: "standard" | "safe";
  attachments: AssetItem[];
  preferenceProfile: MemoryProfile;
  memorySignals: MemorySignal[];
  knowledgeHighlights: string[];
}

export interface ReviseDraftInput {
  draft: DraftItem;
  instruction: string;
  attachments: AssetItem[];
  preferenceProfile: MemoryProfile;
  memorySignals: MemorySignal[];
  knowledgeHighlights: string[];
}

export interface DraftContent {
  title: string;
  subject: string;
  previewText: string;
  body: string;
  mode: "mock" | "gemini";
}

export interface ProviderStatus {
  name: string;
  configured: boolean;
  mode: string;
  envKeys: string[];
  note: string;
}

export interface KnowledgeDocSummary {
  id: string;
  lane: string;
  title: string;
  path: string;
  relativePath: string;
  preview: string;
  hasFactualFlag: boolean;
  hasComplianceFlag: boolean;
}
