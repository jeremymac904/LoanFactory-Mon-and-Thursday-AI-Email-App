import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { KnowledgeDocSummary, SourceLane } from "@/lib/types";

const knowledgeRoot = path.join(process.cwd(), "knowledge_system");

const laneMap: Record<SourceLane, string> = {
  "Google AI": "01_google_ai_for_loan_officers",
  "Operations": "02_loan_factory_and_terraplus_operations",
  "Sales and Marketing": "03_sales_marketing_communication_and_conversion",
  "Weekly Training": "04_weekly_training_production_lab"
};

async function walkMarkdown(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return walkMarkdown(fullPath);
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        return [fullPath];
      }

      return [];
    })
  );

  return results.flat();
}

function extractTitle(markdown: string, fallback: string): string {
  const titleLine = markdown
    .split("\n")
    .find((line) => line.startsWith("# ") || line.startsWith("## "));

  return titleLine ? titleLine.replace(/^#+\s*/, "").trim() : fallback;
}

function extractPreview(markdown: string): string {
  const lines = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  return lines[0] ?? "Starter knowledge document.";
}

export async function listKnowledgeDocs(): Promise<KnowledgeDocSummary[]> {
  const files = await walkMarkdown(knowledgeRoot);
  const docs = await Promise.all(
    files.map(async (filePath) => {
      const markdown = await readFile(filePath, "utf8");
      const relativePath = path.relative(process.cwd(), filePath);
      const lane = relativePath.split(path.sep)[1] ?? "shared";

      return {
        id: relativePath.replaceAll(path.sep, "__"),
        lane,
        title: extractTitle(markdown, path.basename(filePath, ".md")),
        path: filePath,
        relativePath,
        preview: extractPreview(markdown),
        hasFactualFlag: markdown.includes("## Needs Factual Validation"),
        hasComplianceFlag: markdown.includes("## Needs Compliance Review")
      } satisfies KnowledgeDocSummary;
    })
  );

  return docs.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
}

export async function getKnowledgeHighlightsForLane(
  sourceLane: SourceLane,
  limit = 4
): Promise<string[]> {
  const targetSegment = laneMap[sourceLane];
  const docs = await listKnowledgeDocs();

  return docs
    .filter((doc) => doc.relativePath.includes(targetSegment))
    .slice(0, limit)
    .map((doc) => `${doc.title}: ${doc.preview}`);
}

export async function getKnowledgeHighlightsForPaths(
  relativePaths: string[],
  limit = 4
): Promise<string[]> {
  const highlights = await Promise.all(
    relativePaths.slice(0, limit).map(async (relativePath) => {
      const filePath = path.join(process.cwd(), relativePath);

      try {
        const markdown = await readFile(filePath, "utf8");
        return `${extractTitle(markdown, path.basename(filePath, ".md"))}: ${extractPreview(markdown)}`;
      } catch {
        return null;
      }
    })
  );

  return highlights.filter(Boolean) as string[];
}
