-- ================================================================
--  GetVidya — Supabase Schema
--  Run this in your Supabase SQL Editor (Database > SQL Editor)
-- ================================================================

-- ── Enable UUID ─────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── LEADS (contact form submissions) ────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL,
  message     TEXT,
  source      TEXT DEFAULT 'contact-page',
  status      TEXT DEFAULT 'new'
                CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public can INSERT (contact form), only authenticated admin can SELECT/UPDATE/DELETE
CREATE POLICY "Allow public insert" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin full access" ON public.leads
  FOR ALL USING (auth.role() = 'authenticated');

-- ── SITE CONTENT (CMS key-value store) ──────────────────────────
CREATE TABLE IF NOT EXISTS public.site_content (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key         TEXT UNIQUE NOT NULL,
  value       TEXT NOT NULL,
  type        TEXT DEFAULT 'text'
                CHECK (type IN ('text', 'html', 'number', 'boolean', 'json')),
  label       TEXT NOT NULL,
  section     TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can read site content (needed for server-side rendering)
CREATE POLICY "Public can read content" ON public.site_content
  FOR SELECT USING (true);

-- Only admins can write
CREATE POLICY "Admin can manage content" ON public.site_content
  FOR ALL USING (auth.role() = 'authenticated');

-- ── TESTIMONIALS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  exam        TEXT NOT NULL,
  avatar_url  TEXT,
  rating      INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review      TEXT NOT NULL,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admin can manage testimonials" ON public.testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- ── EXAMS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.exams (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  icon_url        TEXT,
  description     TEXT,
  full_form       TEXT,
  tests_count     INTEGER DEFAULT 0,
  questions_count INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active exams" ON public.exams
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admin can manage exams" ON public.exams
  FOR ALL USING (auth.role() = 'authenticated');

-- ── BLOG POSTS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  excerpt       TEXT,
  content       TEXT,
  cover_image   TEXT,
  author        TEXT DEFAULT 'GetVidya Team',
  tags          TEXT[] DEFAULT '{}',
  is_published  BOOLEAN DEFAULT FALSE,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts" ON public.blog_posts
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Admin can manage posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- ── SEED: Default site content blocks ───────────────────────────
INSERT INTO public.site_content (key, value, type, label, section) VALUES
  ('hero_headline',       'Crack Government Exams with Expert MCQs & Mock Tests', 'text', 'Hero Headline', 'Hero'),
  ('hero_subheadline',    'Over 140,000 practice questions across UPSC, SSC, Banking & more.', 'text', 'Hero Sub-headline', 'Hero'),
  ('hero_cta_text',       'Start Free Mock Test', 'text', 'Hero CTA Button Text', 'Hero'),
  ('hero_price_note',     'Mock tests starting at just ₹149/month', 'text', 'Hero Price Note', 'Hero'),
  ('stat_students',       '50,000+', 'text', 'Active Students Count', 'Stats'),
  ('stat_tests',          '1,200+', 'text', 'Mock Tests Count', 'Stats'),
  ('stat_questions',      '140,000+', 'text', 'Questions Count', 'Stats'),
  ('stat_exams',          '6', 'text', 'Exams Covered Count', 'Stats'),
  ('about_tagline',       'Simplifying competitive exam preparation, so you can focus on learning.', 'text', 'About Tagline', 'About'),
  ('contact_email',       'support@getvidya.in', 'text', 'Support Email', 'Contact'),
  ('contact_whatsapp',    '+91 81144 22752', 'text', 'WhatsApp Number', 'Contact'),
  ('footer_copyright',    '© 2025 Prepdot Solutions Pvt. Ltd. All Rights Reserved.', 'text', 'Footer Copyright', 'Footer'),
  ('seo_home_title',      'GetVidya — India''s Smartest Govt. Exam Prep', 'text', 'Home Page SEO Title', 'SEO'),
  ('seo_home_description','GetVidya offers 1,200+ mock tests and 140,000+ MCQs for UPSC, SSC, Banking & Railway exams starting at ₹149/month.', 'text', 'Home Page Meta Description', 'SEO')
ON CONFLICT (key) DO NOTHING;

-- ── SEED: Exams ──────────────────────────────────────────────────
INSERT INTO public.exams (name, slug, full_form, tests_count, questions_count, sort_order) VALUES
  ('SSC CGL',     'ssc-cgl',   'Combined Graduate Level',      240, 28000, 1),
  ('UPSC CSE',    'upsc',      'Civil Services Examination',   180, 22000, 2),
  ('SBI PO',      'banking',   'Probationary Officer',         200, 24000, 3),
  ('Railway NTPC','railway',   'Non-Technical Popular Category',150, 18000, 4),
  ('State PSC',   'state-psc', 'State Public Service Commission',120, 15000, 5),
  ('NDA / CDS',   'defence',   'Defence Services Examination',  90, 12000, 6)
ON CONFLICT (slug) DO NOTHING;

-- ── Auto-update updated_at ────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_blog_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
