-- ============================================================
-- GetVidya Blog CMS — Supabase Schema
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. blogs table ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.blogs (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title             TEXT        NOT NULL,
  slug              TEXT        NOT NULL UNIQUE,
  content           JSONB,                        -- Tiptap JSON (source of truth)
  content_html      TEXT,                         -- Rendered HTML for display
  excerpt           TEXT,
  featured_image_url TEXT,
  author_id         UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name       TEXT,
  status            TEXT        NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  seo_title         TEXT,
  seo_description   TEXT,
  og_image_url      TEXT,
  tags              TEXT[]      DEFAULT '{}',
  published_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Indexes ──────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_blogs_slug         ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status       ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_blogs_tags         ON public.blogs USING gin(tags);

-- ── 3. Auto-update updated_at ───────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blogs_updated_at ON public.blogs;
CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 4. Row Level Security ────────────────────────────────────

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts (public blog)
CREATE POLICY "Public read published blogs"
  ON public.blogs FOR SELECT
  USING (status = 'published');

-- Authenticated admins can read all (including drafts)
CREATE POLICY "Admins read all blogs"
  ON public.blogs FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can insert
CREATE POLICY "Admins insert blogs"
  ON public.blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated admins can update
CREATE POLICY "Admins update blogs"
  ON public.blogs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated admins can delete
CREATE POLICY "Admins delete blogs"
  ON public.blogs FOR DELETE
  TO authenticated
  USING (true);

-- ── 5. Storage bucket: blog-assets ──────────────────────────
-- Run these separately in the Supabase Dashboard → Storage

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('blog-assets', 'blog-assets', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage RLS — authenticated users can upload
-- CREATE POLICY "Admins upload blog assets"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'blog-assets');

-- Public can read
-- CREATE POLICY "Public read blog assets"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'blog-assets');

-- ── 6. Verify ───────────────────────────────────────────────
SELECT 'blogs table ready' AS status, count(*) AS rows FROM public.blogs;
