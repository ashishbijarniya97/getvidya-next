"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Inbox, FileText, BookOpen,
  Star, LogOut, ChevronLeft, ChevronRight, Settings,
  Globe,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import clsx from "clsx";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Site Content", href: "/admin/content", icon: FileText },
  { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 h-screen bg-primary-500 border-r border-white/10 flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
        {!collapsed && (
          <Image
            src="/images/logo-gv-full.png"
            alt="GetVidya"
            width={120}
            height={30}
            className="h-7 w-auto brightness-0 invert"
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "admin-nav-link",
                active && "active",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <a
          href="https://getvidya.in"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx("admin-nav-link", collapsed && "justify-center px-0")}
        >
          <Globe size={18} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">View Site</span>}
        </a>
        <button
          onClick={handleLogout}
          className={clsx(
            "admin-nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
