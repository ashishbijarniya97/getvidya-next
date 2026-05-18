"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import slugify from "slugify";
import { Eye, EyeOff, Clock } from "lucide-react";
import EditorToolbar from "./EditorToolbar";
import SEOSidebar from "./SEOSidebar";
import type { BlogPost } from "@/lib/blog";

interface Props {
  initialPost?: BlogPost;
}

const AUTO_SAVE_DELAY = 3000; // 3 seconds

function generateSlug(title: string) {
  return slugify(title, { lower: true, strict: true, trim: true });
}

function extractExcerpt(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200);
}

export default function BlogEditor({ initialPost }: Props) {
  const router = useRouter();
  const isNew = !initialPost;
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [postId, setPostId] = useState(initialPost?.id ?? "");

  const [seo, setSeo] = useState({
    seoTitle: initialPost?.seo_title ?? "",
    seoDescription: initialPost?.seo_description ?? "",
    ogImageUrl: initialPost?.og_image_url ?? "",
    tags: (initialPost?.tags ?? []).join(", "),
    status: (initialPost?.status ?? "draft") as "draft" | "published",
    publishedAt: initialPost?.published_at
      ? new Date(initialPost.published_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    excerpt: initialPost?.excerpt ?? "",
    featuredImageUrl: initialPost?.featured_image_url ?? "",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: "Start writing your post…" }),
      CharacterCount,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialPost?.content ?? "",
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none min-h-[500px] p-6 focus:outline-none",
      },
    },
  });

  // Auto-update slug from title (only when not manually edited)
  useEffect(() => {
    if (!slugEdited && title) setSlug(generateSlug(title));
  }, [title, slugEdited]);

  // Build save payload
  const buildPayload = useCallback(() => {
    const content_html = editor?.getHTML() ?? "";
    return {
      title,
      slug,
      content: editor?.getJSON() ?? null,
      content_html,
      excerpt: seo.excerpt || extractExcerpt(content_html),
      featured_image_url: seo.featuredImageUrl || null,
      status: seo.status,
      seo_title: seo.seoTitle || null,
      seo_description: seo.seoDescription || null,
      og_image_url: seo.ogImageUrl || null,
      tags: seo.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published_at: seo.status === "published" ? seo.publishedAt : null,
    };
  }, [editor, title, slug, seo]);

  // Manual save
  const handleSave = async () => {
    if (!title || !slug) { alert("Title and slug are required"); return; }
    setSaving(true);
    try {
      const payload = buildPayload();
      const url = isNew || !postId ? "/api/admin/blog" : `/api/admin/blog/${postId}`;
      const method = isNew || !postId ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
      const data = await res.json();
      if (isNew && data.id) {
        setPostId(data.id);
        router.replace(`/admin/blog/${data.id}/edit`);
      }
      setLastSaved(new Date());
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // Auto-save (draft only — never auto-publish)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!editor || !title || isNew) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      if (!postId) return;
      try {
        const payload = { ...buildPayload(), status: "draft" };
        await fetch(`/api/admin/blog/${postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setLastSaved(new Date());
      } catch { /* silent */ }
    }, AUTO_SAVE_DELAY);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [title, slug, seo, editor?.state.doc]); // eslint-disable-line

  // Image upload handler (triggered from toolbar)
  const handleImageUpload = () => fileRef.current?.click();
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blog/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert(`Image upload failed: ${data.error ?? res.statusText}`);
      }
    } catch (err) {
      alert(`Image upload error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const wordCount = editor?.storage.characterCount.words() ?? 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex gap-6 items-start">
      {/* Hidden file input for images */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

      {/* Main editor area */}
      <div className="flex-1 min-w-0">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {lastSaved && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <span>{wordCount} words · {readTime} min read</span>
          </div>
          <button
            onClick={() => setPreview((p) => !p)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-500 transition-colors"
          >
            {preview ? <><EyeOff size={15} /> Edit</> : <><Eye size={15} /> Preview</>}
          </button>
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title…"
          className="w-full text-3xl font-bold text-primary-500 placeholder:text-slate-200 border-none outline-none bg-transparent mb-2"
        />

        {/* Slug */}
        <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
          <span className="select-none">/blog/</span>
          <input
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
            className="flex-1 border-b border-dashed border-slate-200 outline-none text-slate-600 focus:border-primary-400 bg-transparent"
            placeholder="auto-generated-from-title"
          />
          {slugEdited && (
            <button className="text-xs text-teal hover:underline"
              onClick={() => { setSlug(generateSlug(title)); setSlugEdited(false); }}>
              Reset
            </button>
          )}
        </div>

        {/* Editor / Preview */}
        <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
          {!preview && editor && (
            <EditorToolbar editor={editor} onImageUpload={handleImageUpload} uploading={uploading} />
          )}
          {preview ? (
            <div
              className="prose prose-slate max-w-none p-6"
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() ?? "" }}
            />
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <SEOSidebar
        data={seo}
        onChange={(d) => setSeo((prev) => ({ ...prev, ...d }))}
        slug={slug}
        onSave={handleSave}
        saving={saving}
        isNew={isNew}
      />
    </div>
  );
}
