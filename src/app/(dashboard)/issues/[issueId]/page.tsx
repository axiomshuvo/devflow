"use client";

import { PriorityBadge } from "@/components/shared/priority-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  currentUser,
  mockActivity,
  mockComments,
  mockIssues,
} from "@/lib/mock-data";
import { formatDateShort, formatRelativeDate } from "@/lib/utils";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import {
  MdArrowBack,
  MdCalendarToday,
  MdEdit,
  MdFlag,
  MdLabel,
  MdLink,
  MdMoreVert,
  MdOutlineComment,
  MdOutlineTimer,
  MdPerson,
  MdSend,
} from "react-icons/md";

// ─── Type icon map ────────────────────────────────────────────────────────────

const typeConfig: Record<string, { label: string; cls: string }> = {
  BUG: { label: "Bug", cls: "bg-red-100 text-red-700" },
  FEATURE: { label: "Feature", cls: "bg-blue-100 text-blue-700" },
  IMPROVEMENT: { label: "Improvement", cls: "bg-amber-100 text-amber-700" },
  TASK: { label: "Task", cls: "bg-gray-100 text-gray-700" },
};

// ─── Label chip ───────────────────────────────────────────────────────────────

function LabelChip({ name, color }: { name: string; color?: string }) {
  const map: Record<string, string> = {
    red: "bg-red-50 text-red-600 border-red-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    default: "bg-gray-50 text-gray-600 border-gray-200",
  };
  const cls = map[color ?? "default"] ?? map.default;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${cls}`}
    >
      {name}
    </span>
  );
}

// ─── Sidebar field ────────────────────────────────────────────────────────────

function SideField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-gray-400 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const { issueId } = use(params);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState<"comments" | "activity">(
    "comments",
  );

  const issue = mockIssues.find((i) => i.id === issueId);
  if (!issue) notFound();

  const issueComments = mockComments.filter((c) => c.issueId === issue.id);
  const typeCfg = typeConfig[issue.type] ?? typeConfig.TASK;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* ── Breadcrumb + back ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <Link
          href="/issues"
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <MdArrowBack className="text-base" />
        </Link>
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/projects/p1" className="hover:text-blue-500">
            E-commerce Website
          </Link>
          <span>›</span>
          <Link href="/issues" className="hover:text-blue-500">
            Issues
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{issue.issueKey}</span>
        </nav>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div className="flex gap-5 items-start">
        {/* ── LEFT: main content ──────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Issue header card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Meta row */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-semibold">
                {issue.issueKey}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeCfg.cls}`}
              >
                {typeCfg.label}
              </span>
              <StatusBadge status={issue.status} size="sm" />
              <PriorityBadge priority={issue.priority} size="sm" />
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-900 leading-snug mb-2">
              {issue.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <MdCalendarToday className="text-sm" />
                Created {formatRelativeDate(issue.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <MdOutlineTimer className="text-sm" />
                Updated {formatRelativeDate(issue.updatedAt)}
              </span>
              {issue.dueDate && (
                <span
                  className={`flex items-center gap-1.5 ${
                    new Date(issue.dueDate) < new Date() &&
                    issue.status !== "DONE"
                      ? "text-red-500 font-medium"
                      : ""
                  }`}
                >
                  <MdFlag className="text-sm" />
                  Due {formatDateShort(issue.dueDate)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MdOutlineComment className="text-sm" />
                {issue.commentCount ?? 0} comments
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-4">
              <Link href={`/issues/${issueId}/edit`}>
                <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  <MdEdit className="text-sm" /> Edit
                </button>
              </Link>
              <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                <MdLink className="text-sm" /> Copy Link
              </button>
              <button className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <MdMoreVert className="text-base" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Description
            </h2>
            {issue.description ? (
              <p className="text-sm text-gray-700 leading-relaxed">
                {issue.description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No description provided.
              </p>
            )}
          </div>

          {/* Comments / Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-gray-100 mb-4 -mx-6 px-6">
              {(["comments", "activity"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {tab === "comments" && issueComments.length > 0 && (
                    <span className="ml-1.5 text-xs bg-gray-100 text-gray-500 rounded-full px-1.5 py-0.5">
                      {issueComments.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {activeTab === "comments" ? (
              <div className="space-y-4">
                {issueComments.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">
                    No comments yet.
                  </p>
                ) : (
                  issueComments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <Avatar size="sm" className="w-8 h-8 shrink-0 mt-0.5">
                        <Avatar.Image src={c.user.imageUrl} alt={c.user.name} />
                        <Avatar.Fallback>
                          {c.user.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-800">
                            {c.user.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatRelativeDate(c.createdAt)}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed border border-gray-100">
                          {c.body}
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Comment input */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                  <Avatar size="sm" className="w-8 h-8 shrink-0">
                    <Avatar.Image
                      src={currentUser.imageUrl}
                      alt={currentUser.name}
                    />
                    <Avatar.Fallback>
                      {currentUser.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex-1 relative">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                    <button
                      disabled={!comment.trim()}
                      className="absolute right-2.5 bottom-2.5 w-7 h-7 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors"
                    >
                      <MdSend className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {mockActivity.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <Avatar size="sm" className="w-7 h-7 shrink-0">
                      <Avatar.Image src={a.user.imageUrl} alt={a.user.name} />
                      <Avatar.Fallback>{a.user.name.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-gray-700 leading-snug">
                        <span className="font-semibold">{a.user.name}</span>{" "}
                        {a.action}
                        {a.details && (
                          <>
                            {" "}
                            — <span className="text-gray-500">{a.details}</span>
                          </>
                        )}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {formatRelativeDate(a.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: sidebar ───────────────────────────────────────────── */}
        <div className="w-72 shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Details
            </h3>

            <SideField icon={<MdFlag className="text-sm" />} label="Status">
              <StatusBadge status={issue.status} size="sm" />
            </SideField>

            <SideField icon={<MdFlag className="text-sm" />} label="Priority">
              <PriorityBadge priority={issue.priority} size="sm" />
            </SideField>

            <SideField icon={<MdPerson className="text-sm" />} label="Assignee">
              {issue.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar size="sm" className="w-6 h-6">
                    <Avatar.Image
                      src={issue.assignee.imageUrl}
                      alt={issue.assignee.name}
                    />
                    <Avatar.Fallback>
                      {issue.assignee.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="text-sm text-gray-700">
                    {issue.assignee.name}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">Unassigned</span>
              )}
            </SideField>

            <SideField icon={<MdPerson className="text-sm" />} label="Reporter">
              <div className="flex items-center gap-2">
                <Avatar size="sm" className="w-6 h-6">
                  <Avatar.Image
                    src={issue.reporter.imageUrl}
                    alt={issue.reporter.name}
                  />
                  <Avatar.Fallback>
                    {issue.reporter.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-sm text-gray-700">
                  {issue.reporter.name}
                </span>
              </div>
            </SideField>

            <SideField icon={<MdLabel className="text-sm" />} label="Labels">
              {issue.labels && issue.labels.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {issue.labels.map((l) => (
                    <LabelChip key={l.id} name={l.name} color={l.color} />
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-400">None</span>
              )}
            </SideField>

            {issue.dueDate && (
              <SideField
                icon={<MdCalendarToday className="text-sm" />}
                label="Due Date"
              >
                <span
                  className={`text-sm font-medium ${
                    new Date(issue.dueDate) < new Date() &&
                    issue.status !== "DONE"
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {formatDateShort(issue.dueDate)}
                </span>
              </SideField>
            )}

            <SideField
              icon={<MdCalendarToday className="text-sm" />}
              label="Created"
            >
              <span className="text-sm text-gray-700">
                {formatDateShort(issue.createdAt)}
              </span>
            </SideField>

            <SideField
              icon={<MdCalendarToday className="text-sm" />}
              label="Updated"
            >
              <span className="text-sm text-gray-700">
                {formatDateShort(issue.updatedAt)}
              </span>
            </SideField>
          </div>

          {/* Related issues */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Related Issues
            </h3>
            <div className="space-y-2">
              {mockIssues
                .filter(
                  (i) => i.id !== issue.id && i.projectId === issue.projectId,
                )
                .slice(0, 3)
                .map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/issues/${rel.id}`}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-[11px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                      {rel.issueKey}
                    </span>
                    <p className="text-xs text-gray-700 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
