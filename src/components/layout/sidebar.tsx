"use client";

import { cn } from "@/lib/utils";
import { Button, ProgressBar } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdAdd,
  MdBarChart,
  MdBugReport,
  MdCalendarToday,
  MdCheckBox,
  MdChevronLeft,
  MdChevronRight,
  MdDashboard,
  MdFolder,
  MdGroup,
  MdHistory,
  MdSettings,
} from "react-icons/md";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: MdDashboard },
  { label: "Projects", href: "/projects", icon: MdFolder },
  { label: "Issues", href: "/issues", icon: MdBugReport },
  { label: "My Tasks", href: "/my-tasks", icon: MdCheckBox },
  { label: "Calendar", href: "/calendar", icon: MdCalendarToday },
  { label: "Team", href: "/team", icon: MdGroup },
  { label: "Analytics", href: "/analytics", icon: MdBarChart },
  { label: "Activity Log", href: "/activity", icon: MdHistory },
  { label: "Settings", href: "/settings", icon: MdSettings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[#0f172a] border-r border-white/10 transition-all duration-300 shrink-0",
        collapsed ? "w-17" : "w-60",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
          <MdBugReport className="text-white text-lg" />
        </div>
        {!collapsed && (
          <span className="text-white font-bold text-lg tracking-tight">
            DevFlow
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className="text-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Quick Create */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
              <MdAdd className="text-blue-400 text-sm" />
            </div>
            <span className="text-white text-sm font-semibold">
              Quick Create
            </span>
          </div>
          <p className="text-slate-400 text-xs mb-3">
            Create a new issue in just a few clicks.
          </p>
          <Link href="/issues/create">
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium"
            >
              <MdAdd className="text-base" />
              New Issue
            </Button>
          </Link>
        </div>
      )}

      {/* Workspace Progress */}
      {!collapsed && (
        <div className="mx-3 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-300 text-xs font-semibold">
              Workspace Progress
            </span>
            <span className="text-white text-xs font-bold">65%</span>
          </div>
          <p className="text-slate-500 text-xs mb-2">Overall progress</p>
          <ProgressBar size="sm" value={65}>
            <ProgressBar.Track className="bg-white/10">
              <ProgressBar.Fill className="bg-blue-500" />
            </ProgressBar.Track>
          </ProgressBar>
          <Link
            href="/analytics"
            className="text-blue-400 text-xs mt-2 inline-block hover:text-blue-300 transition-colors"
          >
            View Analytics →
          </Link>
        </div>
      )}

      {/* Collapse toggle */}
      <div className="border-t border-white/10 p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
        >
          {collapsed ? (
            <MdChevronRight className="text-xl shrink-0" />
          ) : (
            <>
              <MdChevronLeft className="text-xl shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
