"use client";

import { useRef } from "react";
import Image from "next/image";
import { Upload, X, ExternalLink } from "lucide-react";

interface SEOData {
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
  tags: string;
  status: "draft" | "published";
  publishedAt: string;
  excerpt: string;
  featuredImageUrl: string;
}

interface Props {
  data: SEOData;
  onChange: (data: Partial<SEOData>) => void;
  slug: string;
  onSave: () => void;
  saving: boolean;
  isNew: boolean;
}

export default function SEOSidebar({ data, onChange, slug, onSave, saving, isNew }: Props) {
  const ogRef = useRef<HTMLInputElement>(null);
  const featRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File, field: "ogImageUrl" | "featuredImageUrl") => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/blog/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      onChange({ [field]: url });
    }
  };

  const liveUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://getvidya.in"}/blog/${slug}`;

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col gap-4">

      {/* Publish panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <h3 className="font-semibold text-sm text-slate-700 mb-3">Publish</h3>
        <div className="flex gap-2 mb-3">
          <select
            value={data.status}
            onChange={(e) => onChange({ status: e.target.value as "draft" | "published" })}
            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        {data.status === "published" && (
          <div className="mb-3">
            <label className="block text-xs text-slate-500 mb-1">Publish date</label>
            <input
              type="datetime-local"
              value={data.publishedAt}
              onChange={(e) => onChange({ publishedAt: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
          </div>
        )}
        <button
          onClick={onSave}
          disabled={saving}
          className="w-full py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 disabled:opacity-60 transition-colors"
        >
          {saving ? "Saving…" : isNew ? "Create Post" : data.status === "published" ? "Update & Publish" : "Save Draft"}
        </button>
        {!isNew && data.status === "published" && slug && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 mt-2 text-xs text-teal hover:underline">
            <ExternalLink size={12} /> View live post
          </a>
        )}
      </div>

      {/* Featured image */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <h3 className="font-semibold text-sm text-slate-700 mb-3">Featured Image</h3>
        {data.featuredImageUrl ? (
          <div className="relative">
            <Image src={data.featuredImageUrl} alt="" width={240} height={135}
              className="w-full aspect-video object-cover rounded-lg" />
            <button onClick={() => onChange({ featuredImageUrl: "" })}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
              <X size={12} />
            </button>
          </div>
        ) : (
          <button onClick={() => featRef.current?.click()}
            className="w-full aspect-video border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors">
            <Upload size={20} />
            <span className="text-xs">Upload featured image</span>
          </button>
        )}
        <input ref={featRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "featuredImageUrl")} />
      </div>

      {/* Excerpt */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <h3 className="font-semibold text-sm text-slate-700 mb-2">Excerpt</h3>
        <textarea
          value={data.excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          rows={3}
          placeholder="Short summary (auto-filled from content if empty)"
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <h3 className="font-semibold text-sm text-slate-700 mb-2">Tags</h3>
        <input
          value={data.tags}
          onChange={(e) => onChange({ tags: e.target.value })}
          placeholder="ssc-cgl, upsc, strategy"
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
        <p className="text-xs text-slate-400 mt-1">Comma-separated</p>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <h3 className="font-semibold text-sm text-slate-700 mb-3">SEO & Social</h3>

        <label className="block text-xs text-slate-500 mb-1">SEO Title</label>
        <input
          value={data.seoTitle}
          onChange={(e) => onChange({ seoTitle: e.target.value })}
          placeholder="Defaults to post title"
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
        <div className="h-1 bg-slate-100 rounded mb-1">
          <div className={`h-full rounded transition-all ${
            data.seoTitle.length > 60 ? "bg-red-400" :
            data.seoTitle.length > 40 ? "bg-green-400" : "bg-slate-300"
          }`} style={{ width: `${Math.min(100, (data.seoTitle.length / 60) * 100)}%` }} />
        </div>
        <p className="text-xs text-slate-400 mb-3">{data.seoTitle.length}/60</p>

        <label className="block text-xs text-slate-500 mb-1">Meta Description</label>
        <textarea
          value={data.seoDescription}
          onChange={(e) => onChange({ seoDescription: e.target.value })}
          rows={3}
          placeholder="160 chars max. Shows in Google results."
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none mb-1 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
        <div className="h-1 bg-slate-100 rounded mb-1">
          <div className={`h-full rounded transition-all ${
            data.seoDescription.length > 160 ? "bg-red-400" :
            data.seoDescription.length > 120 ? "bg-green-400" : "bg-slate-300"
          }`} style={{ width: `${Math.min(100, (data.seoDescription.length / 160) * 100)}%` }} />
        </div>
        <p className="text-xs text-slate-400 mb-3">{data.seoDescription.length}/160</p>

        <label className="block text-xs text-slate-500 mb-1">OG / Social Image</label>
        {data.ogImageUrl ? (
          <div className="relative mb-2">
            <Image src={data.ogImageUrl} alt="" width={240} height={126}
              className="w-full rounded-lg object-cover" />
            <button onClick={() => onChange({ ogImageUrl: "" })}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
              <X size={12} />
            </button>
          </div>
        ) : (
          <button onClick={() => ogRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-200 rounded-lg p-3 flex items-center justify-center gap-2 text-slate-400 text-xs hover:border-primary-400 hover:text-primary-500 transition-colors mb-2">
            <Upload size={14} /> Upload OG image (1200×630)
          </button>
        )}
        <input ref={ogRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "ogImageUrl")} />
        <p className="text-xs text-slate-400">Used for Twitter/WhatsApp previews</p>
      </div>

      {/* Schema.org preview */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs text-slate-400">
        <p className="font-medium text-slate-600 mb-1">Schema.org (auto-generated)</p>
        <p>Article type with author, datePublished, and headline — injected automatically on the blog post page.</p>
      </div>
    </aside>
  );
}
