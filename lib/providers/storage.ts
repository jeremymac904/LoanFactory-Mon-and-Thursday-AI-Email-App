import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AssetItem, AssetKind } from "@/lib/types";

function inferKind(fileType: string): AssetKind {
  if (fileType.startsWith("image/")) {
    return "image";
  }

  if (fileType.startsWith("video/")) {
    return "video";
  }

  return "link";
}

export async function storeUploadedFile(file: File): Promise<AssetItem> {
  const id = crypto.randomUUID();
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const extension = path.extname(file.name) || ".bin";
  const fileName = `${id}${extension}`;
  const targetPath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(targetPath, buffer);

  return {
    id,
    name: file.name,
    kind: inferKind(file.type),
    url: `/uploads/${fileName}`,
    source: "upload",
    createdAt: new Date().toISOString(),
    sizeLabel: `${Math.max(1, Math.round(buffer.byteLength / 1024))} KB`
  };
}

export function createLinkedAsset(input: {
  name: string;
  url: string;
  kind: AssetKind;
}): AssetItem {
  return {
    id: crypto.randomUUID(),
    name: input.name,
    kind: input.kind,
    url: input.url,
    source: "link",
    createdAt: new Date().toISOString(),
    sizeLabel: "linked asset"
  };
}
