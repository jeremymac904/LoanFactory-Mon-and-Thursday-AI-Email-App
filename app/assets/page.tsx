import Image from "next/image";

import { uploadAssetAction } from "@/app/actions";
import { SectionFrame } from "@/components/section-frame";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function AssetsPage() {
  const { state } = await getStudioSnapshot();

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Assets library"
        title="Attach images and videos to training issues"
        description="Local mode stores uploads in the repo for review. Linked assets also work and are usually the safer option for larger video files."
      >
        <form action={uploadAssetAction} className="grid gap-4 lg:grid-cols-2" encType="multipart/form-data">
          <label className="block">
            <span className="label">Asset name</span>
            <input name="name" className="text-input mt-2" placeholder="Example: Thursday rate alert chart" />
            <p className="field-help">Use the name Jeremy should recognize in the draft preview.</p>
          </label>
          <label className="block">
            <span className="label">Asset kind</span>
            <select name="kind" className="select-input mt-2" defaultValue="image">
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="link">Link</option>
            </select>
          </label>
          <label className="block">
            <span className="label">Upload file</span>
            <input type="file" name="file" className="text-input mt-2 py-2.5" />
          </label>
          <label className="block">
            <span className="label">Or external URL</span>
            <input name="url" className="text-input mt-2" placeholder="https://..." />
          </label>
          <div className="lg:col-span-2">
            <p className="field-help">Uploaded and linked assets stay in preview mode until the draft is approved and scheduled.</p>
            <button type="submit" className="primary-btn">
              Add asset
            </button>
          </div>
        </form>
      </SectionFrame>

      <SectionFrame
        eyebrow="Current library"
        title="Saved image and video references"
        description="These assets are immediately available in the Draft Studio generator and show up as preview-only support items in draft review."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {state.assets.length === 0 ? (
            <div className="notice-card md:col-span-2 xl:col-span-3">
              <p className="text-sm font-semibold text-ink">No assets are saved yet.</p>
              <p className="mt-2 text-sm leading-6 text-mute">
                Add an image, video, or link above to make it available in the Draft Studio.
              </p>
            </div>
          ) : (
            state.assets.map((asset) => (
              <div key={asset.id} className="overflow-hidden rounded-[28px] border border-line bg-white">
                <div className="relative h-48 bg-canvas">
                  {asset.kind === "image" ? (
                    <Image src={asset.url} alt={asset.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-mute">
                      {asset.kind === "video" ? "Video asset" : "Linked asset"}
                    </div>
                  )}
                </div>
                <div className="px-5 py-4">
                  <p className="label">
                    {asset.kind} / {asset.source}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{asset.name}</h3>
                  <p className="mt-2 break-all text-sm leading-6 text-mute">{asset.url}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionFrame>
    </div>
  );
}
