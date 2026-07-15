-- ================================================================
--  SECURITY FIX — remove no-op "admin" RLS policies
--  Run in Supabase SQL Editor (Database > SQL Editor)
-- ================================================================
--
--  Problem: every policy named "admin" was actually
--      USING (auth.role() = 'authenticated')
--  which is TRUE for ANY logged-in user of the project, not admins.
--  Combined with open public signup, any self-registered account could
--  read the leads PII table and write CMS tables directly via PostgREST,
--  bypassing the Next.js app entirely.
--
--  Fix: DROP these policies. All legitimate admin writes go through the
--  server-side service-role client (createServiceClient), which bypasses
--  RLS — so removing them does NOT break the admin panel. Public read /
--  public lead-insert policies are left intact.
--
--  Idempotent: safe to run more than once.

-- leads: keep "Allow public insert"; drop the authenticated-reads-everything policy
DROP POLICY IF EXISTS "Allow admin full access" ON public.leads;

-- site_content / testimonials / exams / blog_posts (legacy): keep public read, drop admin-manage
DROP POLICY IF EXISTS "Admin can manage content"      ON public.site_content;
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin can manage exams"        ON public.exams;
DROP POLICY IF EXISTS "Admin can manage posts"        ON public.blog_posts;

-- blogs (active CMS): keep "Public read published blogs", drop the authenticated CRUD set
DROP POLICY IF EXISTS "Admins read all blogs"   ON public.blogs;
DROP POLICY IF EXISTS "Admins insert blogs"     ON public.blogs;
DROP POLICY IF EXISTS "Admins update blogs"     ON public.blogs;
DROP POLICY IF EXISTS "Admins delete blogs"     ON public.blogs;

-- app_installs: written only by /api/app/* via service role
DROP POLICY IF EXISTS "Allow admin full access" ON public.app_installs;

-- Verify what remains (should show only public-read / public-insert policies):
--   SELECT tablename, policyname, roles, cmd, qual
--   FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename;
