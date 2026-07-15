import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

function allowlist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  const e = email?.toLowerCase();
  if (!e) return false;
  const allow = allowlist();
  return allow.length > 0 && allow.includes(e);
}

/**
 * Returns the authenticated user ONLY if their email is in the ADMIN_EMAILS
 * allowlist. Fails closed: no session, or a session whose email is not
 * allow-listed (including when ADMIN_EMAILS is unset), returns null.
 *
 * A valid Supabase session alone is NOT sufficient — public signup exists on
 * this project, so "logged in" must never mean "admin".
 */
export async function getAdminUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdminEmail(user?.email) ? user : null;
}
