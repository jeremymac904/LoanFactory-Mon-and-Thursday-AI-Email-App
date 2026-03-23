export function getSchedulerMode(): string {
  return process.env.SCHEDULER_PROVIDER || "local";
}

export function getSchedulerNote(): string {
  const mode = getSchedulerMode();

  if (mode === "local") {
    return "Local queue mode is active. Approved drafts can be assigned to dates without any external cron dependency.";
  }

  return "External scheduler mode is reserved for later wiring after provider secrets and deployment hooks are in place.";
}
