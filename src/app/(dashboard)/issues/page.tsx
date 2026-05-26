"use client";

import { PriorityBadge } from "@/components/shared/priority-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockIssues, mockUsers } from "@/lib/mock-data";
import { formatDateShort } from "@/lib/utils";
import type { IssuePriority, IssueStatus } from "@/types";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MdAdd,
  MdAssignment,
  MdCheckCircleOutline,
  MdChevronLeft,
  MdChevronRight,
  MdErrorOutline,
  MdHourglassBottom,
  MdKeyboardArrowDown,
  MdMoreVert,
  MdPendingActions,
  MdSearch,
  MdSettings,
  MdTune,
  MdWarningAmber,
} from "react-icons/md";

// ─── Label chip ───────────────────────────────────────────────────────────────

function LabelChip({ name, color }: { name: string; color?: string }) {
  const colorMap: Record<string, string> = {
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-700",
    default: "bg-gray-100 text-gray-600",
  };
  const cls = colorMap[color ?? "default"] ?? colorMap.default;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${cls}`}
    >
      {name}
    </span>
  );
}

// ─── Filter options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS: { label: string; value: IssueStatus | "" }[] = [
  { label: "Status: All", value: "" },
  { label: "Backlog", value: "BACKLOG" },
  { label: "To Do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "In Review", value: "IN_REVIEW" },
  { label: "Done", value: "DONE" },
  { label: "Blocked", value: "BLOCKED" },
];

const PRIORITY_OPTIONS: { label: string; value: IssuePriority | "" }[] = [
  { label: "Priority: All", value: "" },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Critical", value: "CRITICAL" },
];

const ROWS_OPTIONS = [5, 10, 20];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IssuesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | "">("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ── Computed stats (from all issues, unfiltered) ───────────────────────────
  const stats = useMemo(
    () => ({
      total: mockIssues.length,
      open: mockIssues.filter(
        (i) => i.status === "TODO" || i.status === "BACKLOG",
      ).length,
      inProgress: mockIssues.filter((i) => i.status === "IN_PROGRESS").length,
      inReview: mockIssues.filter((i) => i.status === "IN_REVIEW").length,
      done: mockIssues.filter((i) => i.status === "DONE").length,
      overdue: mockIssues.filter(
        (i) =>
          !!i.dueDate &&
          new Date(i.dueDate) < new Date() &&
          i.status !== "DONE",
      ).length,
    }),
    [],
  );

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return mockIssues.filter((issue) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        issue.title.toLowerCase().includes(q) ||
        issue.issueKey.toLowerCase().includes(q) ||
        issue.assignee?.name.toLowerCase().includes(q);
      const matchStatus = !statusFilter || issue.status === statusFilter;
      const matchPriority =
        !priorityFilter || issue.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const to = Math.min(currentPage * rowsPerPage, filtered.length);

  const isOverdue = (dueDate?: string, status?: string) =>
    !!dueDate && new Date(dueDate) < new Date() && status !== "DONE";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setPage(1);
  };

  // ── Page number list to render ─────────────────────────────────────────────
  const pageNumbers = (() => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, null, totalPages];
    if (currentPage >= totalPages - 2)
      return [1, null, totalPages - 2, totalPages - 1, totalPages];
    return [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      totalPages,
    ];
  })();

  return (
    <div className="p-6 space-y-5">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
            <Link
              href="/dashboard"
              className="hover:text-blue-500 transition-colors"
            >
              Dashboard
            </Link>
            <span>›</span>
            <Link
              href="/projects/p1"
              className="hover:text-blue-500 transition-colors"
            >
              E-commerce Website
            </Link>
            <span>›</span>
            <span className="text-gray-600">Issues</span>
          </nav>
        </div>

        {/* Split create button */}
        <div className="flex items-center shrink-0">
          <Link href="/issues/create">
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-l-lg transition-colors">
              <MdAdd className="text-base" />
              Create Issue
            </button>
          </Link>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 rounded-r-lg border-l border-blue-500 transition-colors">
            <MdKeyboardArrowDown className="text-base" />
          </button>
        </div>
      </div>

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: "Total Issues",
            value: stats.total,
            icon: <MdAssignment className="text-blue-500 text-xl" />,
            iconBg: "bg-blue-50",
          },
          {
            label: "Open",
            value: stats.open,
            icon: <MdErrorOutline className="text-orange-500 text-xl" />,
            iconBg: "bg-orange-50",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            icon: <MdHourglassBottom className="text-violet-500 text-xl" />,
            iconBg: "bg-violet-50",
          },
          {
            label: "In Review",
            value: stats.inReview,
            icon: <MdPendingActions className="text-cyan-500 text-xl" />,
            iconBg: "bg-cyan-50",
          },
          {
            label: "Done",
            value: stats.done,
            icon: <MdCheckCircleOutline className="text-emerald-500 text-xl" />,
            iconBg: "bg-emerald-50",
          },
          {
            label: "Overdue",
            value: stats.overdue,
            icon: <MdWarningAmber className="text-red-500 text-xl" />,
            iconBg: "bg-red-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0`}
            >
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500 leading-none mb-1 truncate">
                {s.label}
              </p>
              <p className="text-xl font-bold text-gray-900 leading-none">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Filter issues..."
              className="pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 w-44 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as IssueStatus | "");
                setPage(1);
              }}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <MdKeyboardArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>

          {/* Priority */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value as IssuePriority | "");
                setPage(1);
              }}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {PRIORITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <MdKeyboardArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>

          {/* Assignee */}
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none cursor-pointer">
              <option>Assignee: All</option>
              {mockUsers.map((u) => (
                <option key={u.id}>{u.name}</option>
              ))}
            </select>
            <MdKeyboardArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>

          {/* Label */}
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none cursor-pointer">
              <option>Label: All</option>
              {[
                "frontend",
                "backend",
                "bug",
                "feature",
                "testing",
                "security",
              ].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <MdKeyboardArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>

          <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-blue-300 hover:text-blue-600 transition-colors">
            <MdTune className="text-base" /> More Filters
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3.5 py-1.5 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button className="text-sm bg-blue-600 text-white rounded-lg px-4 py-1.5 hover:bg-blue-500 font-medium transition-colors">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 cursor-pointer"
                  />
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[260px]">
                  Title
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Labels
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Due Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-3 py-3 text-left">
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                    <button className="hover:text-gray-700 transition-colors">
                      <MdSettings className="text-base" />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-16 text-center text-gray-400 text-sm"
                  >
                    No issues match your filters
                  </td>
                </tr>
              ) : (
                paginated.map((issue) => (
                  <tr
                    key={issue.id}
                    className="hover:bg-gray-50/70 transition-colors group"
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 cursor-pointer"
                      />
                    </td>

                    {/* ID */}
                    <td className="px-3 py-3">
                      <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                        #{issue.issueKey}
                      </span>
                    </td>

                    {/* Title */}
                    <td className="px-3 py-3">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="block hover:text-blue-600 transition-colors"
                      >
                        <p className="font-medium text-gray-900 leading-snug text-sm">
                          {issue.title}
                        </p>
                        {issue.description && (
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-[280px]">
                            {issue.description}
                          </p>
                        )}
                      </Link>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <StatusBadge status={issue.status} />
                    </td>

                    {/* Priority */}
                    <td className="px-3 py-3">
                      <PriorityBadge priority={issue.priority} />
                    </td>

                    {/* Assignee */}
                    <td className="px-3 py-3">
                      {issue.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar size="sm" className="w-6 h-6 shrink-0">
                            <Avatar.Image
                              src={issue.assignee.imageUrl}
                              alt={issue.assignee.name}
                            />
                            <Avatar.Fallback>
                              {issue.assignee.name.charAt(0)}
                            </Avatar.Fallback>
                          </Avatar>
                          <span className="text-xs text-gray-700 whitespace-nowrap">
                            {issue.assignee.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Labels */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        {issue.labels?.slice(0, 2).map((l) => (
                          <LabelChip key={l.id} name={l.name} color={l.color} />
                        ))}
                        {(issue.labels?.length ?? 0) > 2 && (
                          <span className="text-[11px] text-gray-400">
                            +{(issue.labels?.length ?? 0) - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      {issue.dueDate ? (
                        <span
                          className={`text-xs font-medium ${
                            isOverdue(issue.dueDate, issue.status)
                              ? "text-red-500"
                              : "text-gray-600"
                          }`}
                        >
                          {formatDateShort(issue.dueDate)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>

                    {/* Created */}
                    <td className="px-3 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {formatDateShort(issue.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
                        <MdMoreVert className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500">
            Showing {from} to {to} of {filtered.length} issues
          </p>
          <div className="flex items-center gap-1.5">
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <MdChevronLeft className="text-base" />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((p, i) =>
              p === null ? (
                <span
                  key={`ellipsis-${i}`}
                  className="text-gray-400 text-xs px-1"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    currentPage === p
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <MdChevronRight className="text-base" />
            </button>

            {/* Rows per page */}
            <div className="relative ml-2">
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="appearance-none pl-3 pr-7 py-1 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none cursor-pointer"
              >
                {ROWS_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    Rows per page: {n}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
