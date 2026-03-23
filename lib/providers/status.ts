import type { ProviderStatus } from "@/lib/types";

function isConfigured(keys: string[]): boolean {
  return keys.every((key) => Boolean(process.env[key]));
}

export function getProviderStatuses(): ProviderStatus[] {
  const aiMode = process.env.AI_PROVIDER || (process.env.GEMINI_API_KEY ? "gemini" : "mock");
  const emailMode = process.env.EMAIL_PROVIDER || "mock";
  const storageMode = process.env.STORAGE_PROVIDER || "local";
  const authMode = process.env.AUTH_PROVIDER || "local-admin";
  const schedulerMode = process.env.SCHEDULER_PROVIDER || "local";

  return [
    {
      name: "AI",
      configured: aiMode === "mock" || isConfigured(["GEMINI_API_KEY"]),
      mode: aiMode,
      envKeys: ["AI_PROVIDER", "GEMINI_API_KEY", "GEMINI_MODEL"],
      note:
        aiMode === "mock"
          ? "Mock mode is active. Draft and revise flows still work for local review."
          : "Gemini mode is available when the API key is present."
    },
    {
      name: "Email",
      configured: emailMode === "mock" || isConfigured(["EMAIL_API_KEY", "EMAIL_FROM"]),
      mode: emailMode,
      envKeys: ["EMAIL_PROVIDER", "EMAIL_API_KEY", "EMAIL_FROM"],
      note:
        emailMode === "mock"
          ? "Emails remain in preview and sent-log mode until a provider is wired."
          : "Provider adapter shell is ready for later secret wiring."
    },
    {
      name: "Storage",
      configured: storageMode === "local" || isConfigured(["STORAGE_BUCKET"]),
      mode: storageMode,
      envKeys: ["STORAGE_PROVIDER", "STORAGE_BUCKET"],
      note:
        storageMode === "local"
          ? "Attachments save to the local repo in dev mode."
          : "Remote storage is placeholder-ready for later configuration."
    },
    {
      name: "Auth",
      configured: authMode === "local-admin" || isConfigured(["AUTH_SECRET"]),
      mode: authMode,
      envKeys: ["AUTH_PROVIDER", "AUTH_SECRET"],
      note:
        authMode === "local-admin"
          ? "Jeremy local admin stub is active."
          : "External auth is not yet wired beyond the adapter boundary."
    },
    {
      name: "Scheduler",
      configured: schedulerMode === "local" || isConfigured(["CRON_SECRET"]),
      mode: schedulerMode,
      envKeys: ["SCHEDULER_PROVIDER", "CRON_SECRET"],
      note:
        schedulerMode === "local"
          ? "Scheduling runs inside the local queue for now."
          : "Cron or external scheduler can be wired later without changing the UI."
    }
  ];
}
