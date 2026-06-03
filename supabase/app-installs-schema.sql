-- ================================================================
--  GetVidya — App Install & Activity Tracking
--  Run this in your Supabase SQL Editor (Database > SQL Editor)
--  Depends on the uuid-ossp extension (already enabled in schema.sql)
-- ================================================================

-- ── APP INSTALLS (mobile app installs + active-user tracking) ───
-- One row per device. Created on first launch (POST /api/app/install),
-- last_seen refreshed on every session (POST /api/app/heartbeat).
CREATE TABLE IF NOT EXISTS public.app_installs (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  device_id        TEXT UNIQUE NOT NULL,
  platform         TEXT DEFAULT 'unknown'
                     CHECK (platform IN ('android', 'ios', 'web', 'unknown')),
  app_version      TEXT,
  -- "From where the app was installed": play_store, app_store, referral,
  -- a utm_source value, organic, etc. First-touch (never overwritten).
  install_source   TEXT DEFAULT 'organic',
  -- Raw attribution string (e.g. Play Install Referrer) for detail.
  install_referrer TEXT,
  country          TEXT,
  first_seen       TIMESTAMPTZ DEFAULT NOW(),
  last_seen        TIMESTAMPTZ DEFAULT NOW(),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS app_installs_last_seen_idx ON public.app_installs (last_seen DESC);
CREATE INDEX IF NOT EXISTS app_installs_source_idx    ON public.app_installs (install_source);

ALTER TABLE public.app_installs ENABLE ROW LEVEL SECURITY;

-- Writes happen exclusively through the service-role key in API routes
-- (service role bypasses RLS). Only authenticated admins can read/manage.
CREATE POLICY "Allow admin full access" ON public.app_installs
  FOR ALL USING (auth.role() = 'authenticated');
