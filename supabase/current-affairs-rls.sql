-- ================================================================
--  Current Affairs — public read policy
--  Run in Supabase SQL Editor (Database > SQL Editor)
-- ================================================================
--
--  The `current_affairs_editions` table had RLS ENABLED but NO policies,
--  so the anonymous key (used by the public website via createPublicClient)
--  could read nothing — published editions never appeared on the site, which
--  only ever rendered the static fallback in app/current-affairs/_data/editions.ts.
--
--  This policy lets the public read published editions (drafts stay private;
--  admin/cron use the service-role key which bypasses RLS).

CREATE POLICY "Public can read published editions"
  ON public.current_affairs_editions
  FOR SELECT
  USING (status = 'published');
