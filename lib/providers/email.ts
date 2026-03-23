import type { AssetItem, DraftItem } from "@/lib/types";

export interface EmailSendResult {
  provider: string;
  note: string;
}

export async function sendEmailDraft(
  draft: DraftItem,
  _assets: AssetItem[]
): Promise<EmailSendResult> {
  const mode = process.env.EMAIL_PROVIDER || "mock";

  if (mode === "mock" || !process.env.EMAIL_API_KEY) {
    return {
      provider: "mock",
      note: `No live email provider configured. "${draft.subject}" was recorded as sent in local review mode.`
    };
  }

  return {
    provider: mode,
    note:
      "Email provider credentials exist, but the live sending adapter remains intentionally gated until Jeremy wires and validates the provider."
  };
}
