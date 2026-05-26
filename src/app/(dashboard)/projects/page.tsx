"use client";

import { mockProjects, mockUsers } from "@/lib/mock-data";
import { formatDateShort } from "@/lib/utils";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import {
  MdAdd,
  MdArrowForward,
  MdCalendarToday,
  MdFolder,
  MdMoreVert,
  MdOutlineGridView,
  MdSearch,
} from "react-icons/md";

// ─── Status badge ─────────────────────────────────────────────────────────────

function ProjectStatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    ACTIVE: { cls: "bg-green-100 text-green-700", label: "Active" },
    ON_HOLD: { cls: "bg-amber-100 text-amber-700", label: "On Hold" },
    COMPLETED: { cls: "bg-blue-100 text-blue-700", label: "Completed" },
    ARCHIVED: { cls: "bg-gray-100 text-gray-500", label: "Archived" },
  };
  const { cls, label } = map[status] ?? {
    cls: "bg-gray-100 text-gray-500",
    label: status,
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}

// ─── Project icon config ───────────────────────────────────────────────────────

const projectIconMap: Record<string, { bg: string; emoji: string }> = {
  p1: { bg: "bg-purple-500", emoji: "🛍️" },
  p2: { bg: "bg-blue-500", emoji: "⚙️" },
  p3: { bg: "bg-green-500", emoji: "📱" },
};

// ─── Status filters ────────────────────────────────────────────────────────────

const STATUS_FILTERS = ["All", "Active", "On Hold", "Completed", "Archived"];
const STATUS_KEY_MAP: Record<string, string> = {
  All: "",
  Active: "ACTIVE",
  "On Hold": "ON_HOLD",
  Completed: "COMPLETED",
  Archived: "ARCHIVED",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockProjects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      !STATUS_KEY_MAP[statusFilter] ||
      p.status === STATUS_KEY_MAP[statusFilter];
    return matchSearch && matchStatus;
  });

  const stats = {
    total: mockProjects.length,
    active: mockProjects.filter((p) => p.status === "ACTIVE").length,
    onHold: mockProjects.filter((p) => p.status === "ON_HOLD").length,
    completed: mockProjects.filter((p) => p.status === "COMPLETED").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and track all your team&apos;s projects
          </p>
        </div>
        <Link href="/projects/create">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium shrink-0">
            <MdAdd className="text-base" />
            New Project
          </Button>
        </Link>
      </div>

      {/* ── Quick stats ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Projects",
            value: stats.total,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Active",
            value: stats.active,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "On Hold",
            value: stats.onHold,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Completed",
            value: stats.completed,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}
            >
              <MdOutlineGridView className={`text-xl ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search + filter bar ────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-50 max-w-sm">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === s
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Project cards ──────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <MdFolder className="text-5xl text-gray-300 mb-3" />
          <p className="text-gray-600 font-medium">No projects found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project) => {
            const icon = projectIconMap[project.id] ?? {
              bg: "bg-gray-500",
              emoji: "📁",
            };
            const progress =
              (project.issueCount ?? 0) > 0
                ? Math.round(
                    ((project.completedCount ?? 0) /
                      (project.issueCount ?? 1)) *
                      100,
                  )
                : 0;
            const members = project.members ?? mockUsers.slice(0, 3);

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col hover:shadow-md transition-shadow"
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-xl ${icon.bg} flex items-center justify-center text-xl shrink-0`}
                    >
                      {icon.emoji}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
                        {project.name}
                      </h3>
                      <span className="text-xs text-gray-400 font-mono">
                        {project.key}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <ProjectStatusBadge status={project.status} />
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                      <MdMoreVert className="text-base" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold text-gray-700">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MdCalendarToday className="text-sm" />
                    {project.targetDate
                      ? formatDateShort(project.targetDate)
                      : "No deadline"}
                  </span>
                  <span>
                    <span className="font-semibold text-gray-600">
                      {project.completedCount}
                    </span>
                    /{project.issueCount} issues done
                  </span>
                </div>

                {/* Members + view link */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div className="flex -space-x-2">
                    {members.slice(0, 5).map((m) => (
                      <Avatar
                        key={m.id}
                        size="sm"
                        className="w-7 h-7 ring-2 ring-white"
                      >
                        <Avatar.Image src={m.imageUrl} alt={m.name} />
                        <Avatar.Fallback>{m.name.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                    ))}
                    {members.length > 5 && (
                      <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-[10px] font-semibold ring-2 ring-white flex items-center justify-center">
                        +{members.length - 5}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-500 font-medium transition-colors"
                  >
                    View Project <MdArrowForward className="text-sm" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
