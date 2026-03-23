import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { createSeedState } from "@/lib/seed";
import type { StudioState } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const statePath = path.join(dataDir, "studio.json");

async function ensureStore(): Promise<void> {
  try {
    await readFile(statePath, "utf8");
  } catch {
    await mkdir(dataDir, { recursive: true });
    await writeFile(statePath, JSON.stringify(createSeedState(), null, 2), "utf8");
  }
}

export async function readStudioState(): Promise<StudioState> {
  await ensureStore();
  const raw = await readFile(statePath, "utf8");
  return JSON.parse(raw) as StudioState;
}

export async function writeStudioState(nextState: StudioState): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  const tempPath = `${statePath}.tmp`;
  await writeFile(tempPath, JSON.stringify(nextState, null, 2), "utf8");
  await rename(tempPath, statePath);
}

export async function updateStudioState(
  mutator: (state: StudioState) => StudioState
): Promise<StudioState> {
  const current = await readStudioState();
  const nextState = mutator(current);
  await writeStudioState(nextState);
  return nextState;
}
