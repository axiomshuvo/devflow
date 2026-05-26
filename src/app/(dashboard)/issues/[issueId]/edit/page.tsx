"use client";

import { mockIssues, mockProjects, mockUsers } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { IssuePriority, IssueType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useRef, useState } from "react";
import {
  MdAdd,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward,
  MdBugReport,
  MdCalendarToday,
  MdCheckCircle,
  MdChevronRight,
  MdClose,
  MdCode,
  MdDelete,
  MdExpandMore,
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdImage,
  MdImage as MdImageIcon,
  MdInsertDriveFile,
  MdKeyboardDoubleArrowDown,
  MdLightbulbOutline,
  MdLink,
  MdMoreHoriz,
  MdMoreVert,
  MdOutlineCloudUpload,
  MdRocketLaunch,
  MdStrikethroughS,
  MdTaskAlt,
  MdTrendingUp,
} from "react-icons/md";
import { toast } from "react-toastify";

// ─── Constants ────────────────────────────────────────────────────────────────

const ISSUE_TYPES: {
  value: IssueType;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  { value: "BUG", label: "Bug", icon: <MdBugReport />, color: "text-red-500" },
  { value: "TASK", label: "Task", icon: <MdTaskAlt />, color: "text-blue-500" },
  {
    value: "FEATURE",
    label: "Feature",
    icon: <MdRocketLaunch />,
    color: "text-purple-500",
  },
  {
    value: "IMPROVEMENT",
    label: "Improvement",
    icon: <MdTrendingUp />,
    color: "text-green-500",
  },
];

const PRIORITIES: {
  value: IssuePriority;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "LOW",
    label: "Low",
    icon: <MdArrowDownward />,
    color: "text-gray-400",
  },
  {
    value: "MEDIUM",
    label: "Medium",
    icon: <MdArrowForward />,
    color: "text-amber-500",
  },
  {
    value: "HIGH",
    label: "High",
    icon: <MdArrowUpward />,
    color: "text-orange-500",
  },
  {
    value: "CRITICAL",
    label: "Critical",
    icon: <MdKeyboardDoubleArrowDown className="rotate-180" />,
    color: "text-red-600",
  },
];

const STATUSES = [
  { value: "TODO", label: "To Do", dot: "bg-slate-400" },
  { value: "IN_PROGRESS", label: "In Progress", dot: "bg-violet-500" },
  { value: "IN_REVIEW", label: "In Review", dot: "bg-cyan-500" },
  { value: "BACKLOG", label: "Backlog", dot: "bg-gray-400" },
  { value: "DONE", label: "Done", dot: "bg-green-500" },
  { value: "BLOCKED", label: "Blocked", dot: "bg-red-500" },
];

const ALL_LABELS = [
  { id: "l1", name: "frontend", color: "#3b82f6" },
  { id: "l2", name: "backend", color: "#8b5cf6" },
  { id: "l3", name: "bug", color: "#ef4444" },
  { id: "l4", name: "ui/ux", color: "#f59e0b" },
  { id: "l5", name: "performance", color: "#10b981" },
  { id: "l6", name: "docs", color: "#6b7280" },
  { id: "l7", name: "auth", color: "#6366f1" },
  { id: "l8", name: "security", color: "#f97316" },
];

const MILESTONES = [
  "v1.0 Launch",
  "v1.1 Hotfix",
  "v2.0 Major Release",
  "Q2 Sprint",
  "Sprint 2",
];
const ENVIRONMENTS = ["Production", "Staging", "Development", "QA"];
const VERSIONS = ["v1.0.0", "v1.1.0", "v1.2.0", "v2.0.0-beta"];
const COMPONENTS = [
  "Authentication",
  "Dashboard",
  "API Gateway",
  "Database",
  "Frontend",
  "Mobile",
];

const EDIT_TIPS = [
  "Keep the title short and meaningful",
  "Add clear steps to reproduce the issue",
  "Attach relevant screenshots or logs",
  "Select correct labels for better tracking",
  "Set a due date if applicable",
];

// Mock pre-uploaded attachments per issue (simulates existing files)
const MOCK_ATTACHMENTS: Record<
  string,
  { name: string; size: string; date: string; type: "image" | "file" }[]
> = {
  i1: [
    {
      name: "screenshot-login-bug.png",
      size: "221 KB",
      date: "May 18, 2024",
      type: "image",
    },
    {
      name: "console-error-log.txt",
      size: "12 KB",
      date: "May 18, 2024",
      type: "file",
    },
  ],
};

// ─── SelectDropdown helper ────────────────────────────────────────────────────

function SelectDropdown({
  label,
  required,
  value,
  placeholder,
  options,
  onChange,
  renderOption,
  renderSelected,
}: {
  label?: string;
  required?: boolean;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
  renderOption?: (v: string) => React.ReactNode;
  renderSelected?: (v: string) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value
            ? renderSelected
              ? renderSelected(value)
              : value
            : placeholder}
        </span>
        <MdExpandMore className="text-gray-400 shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${value === opt ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
            >
              {renderOption ? renderOption(opt) : opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditIssuePage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const { issueId } = use(params);
  const router = useRouter();

  const issue = mockIssues.find((i) => i.id === issueId);

  // ── Form state (initialised from issue) ──
  const [projectId, setProjectId] = useState(
    issue?.projectId ?? mockProjects[0].id,
  );
  const [issueType, setIssueType] = useState<IssueType>(issue?.type ?? "BUG");
  const [title, setTitle] = useState(issue?.title ?? "");
  const [description, setDescription] = useState(issue?.description ?? "");
  const [priority, setPriority] = useState<IssuePriority>(
    issue?.priority ?? "MEDIUM",
  );
  const [assigneeId, setAssigneeId] = useState(issue?.assignee?.id ?? "");
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    issue?.labels?.map(
      (l) => ALL_LABELS.find((x) => x.name === l.name)?.id ?? l.id,
    ) ?? [],
  );
  const [milestone, setMilestone] = useState("");
  const [dueDate, setDueDate] = useState(
    issue?.dueDate ? new Date(issue.dueDate).toISOString().split("T")[0] : "",
  );
  const [status, setStatus] = useState<
    "BACKLOG" | "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "BLOCKED"
  >(issue?.status ?? "TODO");
  const [environment, setEnvironment] = useState("");
  const [version, setVersion] = useState("");
  const [component, setComponent] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [newFiles, setNewFiles] = useState<string[]>([]);
  const [existingFiles, setExistingFiles] = useState(
    MOCK_ATTACHMENTS[issueId] ?? [],
  );
  const [submitting, setSubmitting] = useState(false);
  const [labelDropOpen, setLabelDropOpen] = useState(false);
  const labelDropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        labelDropRef.current &&
        !labelDropRef.current.contains(e.target as Node)
      ) {
        setLabelDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (!issue) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Issue not found.</p>
      </div>
    );
  }

  const selectedProject = mockProjects.find((p) => p.id === projectId)!;
  const selectedType = ISSUE_TYPES.find((t) => t.value === issueType)!;
  const selectedPriority = PRIORITIES.find((p) => p.value === priority)!;
  const selectedStatus = STATUSES.find((s) => s.value === status)!;
  const selectedAssignee = mockUsers.find((u) => u.id === assigneeId);

  function toggleLabel(id: string) {
    setSelectedLabels((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    );
  }

  function handleFileChange(files: FileList | null) {
    if (!files) return;
    setNewFiles((prev) => [...prev, ...Array.from(files).map((f) => f.name)]);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Issue updated successfully!");
      router.push(`/issues/${issueId}`);
    }, 800);
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-0">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
          <Link
            href="/issues"
            className="hover:text-gray-700 transition-colors"
          >
            Issues
          </Link>
          <MdChevronRight className="text-gray-400" />
          <span className="hover:text-gray-700 cursor-default">
            {selectedProject.name}
          </span>
          <MdChevronRight className="text-gray-400" />
          <Link
            href={`/issues/${issueId}`}
            className="hover:text-gray-700 transition-colors font-mono text-xs"
          >
            {issue.issueKey}
          </Link>
          <MdChevronRight className="text-gray-400" />
          <span className="text-gray-800 font-medium">Edit</span>
        </div>

        {/* Title row + action buttons */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Issue</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Update the details of the issue
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href={`/issues/${issueId}`}>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MdCheckCircle className="text-base" />
              {submitting ? "Saving…" : "Update Issue"}
            </button>
            <button
              type="button"
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              <MdMoreVert className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 pb-10">
        <div className="flex gap-6 items-start">
          {/* ═══════════════ LEFT COLUMN ═══════════════ */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-5">
                Issue Details
              </h2>

              {/* Project + Issue Type */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                    onClick={() => {
                      const idx = mockProjects.findIndex(
                        (p) => p.id === projectId,
                      );
                      setProjectId(
                        mockProjects[(idx + 1) % mockProjects.length].id,
                      );
                    }}
                  >
                    <span className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {selectedProject.key[0]}
                    </span>
                    <span className="flex-1 text-left text-gray-800 truncate">
                      {selectedProject.name}
                    </span>
                    <MdExpandMore className="text-gray-400 shrink-0" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Type <span className="text-red-500">*</span>
                  </label>
                  <SelectDropdown
                    value={issueType}
                    placeholder="Select type"
                    options={ISSUE_TYPES.map((t) => t.value)}
                    onChange={(v) => setIssueType(v as IssueType)}
                    renderOption={(v) => {
                      const t = ISSUE_TYPES.find((x) => x.value === v)!;
                      return (
                        <>
                          <span className={t.color}>{t.icon}</span>
                          <span>{t.label}</span>
                        </>
                      );
                    }}
                    renderSelected={(v) => {
                      const t = ISSUE_TYPES.find((x) => x.value === v)!;
                      return (
                        <span className="flex items-center gap-2">
                          <span className={t.color}>{t.icon}</span>
                          {t.label}
                        </span>
                      );
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear and concise title for the issue"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-colors">
                  {/* Toolbar */}
                  <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50 flex-wrap">
                    <select className="text-xs text-gray-600 border-0 bg-transparent focus:outline-none pr-1 mr-1">
                      <option>Normal</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                    </select>
                    <span className="w-px h-4 bg-gray-200 mx-1" />
                    {[
                      MdFormatBold,
                      MdFormatItalic,
                      MdFormatUnderlined,
                      MdStrikethroughS,
                      MdCode,
                    ].map((Icon, i) => (
                      <button
                        key={i}
                        type="button"
                        className="p-1 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                      >
                        <Icon className="text-base" />
                      </button>
                    ))}
                    <span className="w-px h-4 bg-gray-200 mx-1" />
                    {[
                      MdFormatListBulleted,
                      MdFormatListNumbered,
                      MdFormatAlignLeft,
                      MdFormatAlignCenter,
                    ].map((Icon, i) => (
                      <button
                        key={i}
                        type="button"
                        className="p-1 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                      >
                        <Icon className="text-base" />
                      </button>
                    ))}
                    <span className="w-px h-4 bg-gray-200 mx-1" />
                    {[MdLink, MdImageIcon, MdFormatQuote, MdMoreHoriz].map(
                      (Icon, i) => (
                        <button
                          key={i}
                          type="button"
                          className="p-1 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                        >
                          <Icon className="text-base" />
                        </button>
                      ),
                    )}
                  </div>
                  <div className="relative">
                    <textarea
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value.slice(0, 5000))
                      }
                      placeholder="Describe the issue in detail..."
                      rows={5}
                      className="w-full px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white resize-none focus:outline-none"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {description.length} / 5000
                    </span>
                  </div>
                </div>
              </div>

              {/* Priority + Assignee + Reporter */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <SelectDropdown
                    value={priority}
                    placeholder="Select priority"
                    options={PRIORITIES.map((p) => p.value)}
                    onChange={(v) => setPriority(v as IssuePriority)}
                    renderOption={(v) => {
                      const p = PRIORITIES.find((x) => x.value === v)!;
                      return (
                        <>
                          <span className={p.color}>{p.icon}</span>
                          <span>{p.label}</span>
                        </>
                      );
                    }}
                    renderSelected={(v) => {
                      const p = PRIORITIES.find((x) => x.value === v)!;
                      return (
                        <span className="flex items-center gap-2">
                          <span className={p.color}>{p.icon}</span>
                          {p.label}
                        </span>
                      );
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assignee
                  </label>
                  <SelectDropdown
                    value={assigneeId}
                    placeholder="Select assignee"
                    options={mockUsers.map((u) => u.id)}
                    onChange={setAssigneeId}
                    renderOption={(id) => {
                      const u = mockUsers.find((x) => x.id === id)!;
                      return (
                        <>
                          <img
                            src={u.imageUrl}
                            alt={u.name}
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                          />
                          <span className="truncate">{u.name}</span>
                        </>
                      );
                    }}
                    renderSelected={(id) => {
                      const u = mockUsers.find((x) => x.id === id)!;
                      return (
                        <span className="flex items-center gap-2">
                          <img
                            src={u.imageUrl}
                            alt={u.name}
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                          />
                          <span className="truncate">{u.name}</span>
                        </span>
                      );
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporter
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-not-allowed">
                    <img
                      src={issue.reporter.imageUrl}
                      alt={issue.reporter.name}
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                    />
                    <span className="truncate">{issue.reporter.name}</span>
                  </div>
                </div>
              </div>

              {/* Labels + Milestone + Due Date */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                {/* Labels — chip style with inline add */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Labels
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 min-h-[38px] px-2 py-1.5 border border-gray-200 rounded-lg bg-white">
                    {selectedLabels.map((id) => {
                      const l = ALL_LABELS.find((x) => x.id === id);
                      if (!l) return null;
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: l.color }}
                        >
                          {l.name}
                          <button
                            type="button"
                            onClick={() => toggleLabel(id)}
                            className="hover:opacity-75 transition-opacity"
                          >
                            <MdClose className="text-[11px]" />
                          </button>
                        </span>
                      );
                    })}
                    {/* + button to open label picker */}
                    <div ref={labelDropRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setLabelDropOpen(!labelDropOpen)}
                        className="w-5 h-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MdAdd className="text-sm" />
                      </button>
                      {labelDropOpen && (
                        <div className="absolute z-50 left-0 top-7 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                          {ALL_LABELS.filter(
                            (l) => !selectedLabels.includes(l.id),
                          ).map((label) => (
                            <button
                              key={label.id}
                              type="button"
                              onClick={() => {
                                toggleLabel(label.id);
                                setLabelDropOpen(false);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: label.color }}
                              />
                              {label.name}
                            </button>
                          ))}
                          {ALL_LABELS.filter(
                            (l) => !selectedLabels.includes(l.id),
                          ).length === 0 && (
                            <p className="px-3 py-2 text-xs text-gray-400">
                              All labels added
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Milestone */}
                <SelectDropdown
                  label="Milestone"
                  value={milestone}
                  placeholder="Select milestone"
                  options={MILESTONES}
                  onChange={setMilestone}
                />

                {/* Due Date with clear button */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <div className="relative flex items-center">
                    <MdCalendarToday className="absolute left-3 text-gray-400 text-sm pointer-events-none" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                    />
                    {dueDate && (
                      <button
                        type="button"
                        onClick={() => setDueDate("")}
                        className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MdClose className="text-base" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>

                {/* Existing files */}
                {existingFiles.length > 0 && (
                  <div className="flex flex-col gap-2 mb-3">
                    {existingFiles.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {file.type === "image" ? (
                            <MdImage className="text-blue-400 text-xl" />
                          ) : (
                            <MdInsertDriveFile className="text-gray-400 text-xl" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {file.size} &bull; Uploaded on {file.date}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExistingFiles((prev) =>
                              prev.filter((_, j) => j !== i),
                            )
                          }
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <MdDelete className="text-base" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New uploads */}
                {newFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newFiles.map((name, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() =>
                            setNewFiles((prev) =>
                              prev.filter((_, j) => j !== i),
                            )
                          }
                          className="ml-0.5 text-blue-400 hover:text-blue-700 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Drop zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                    dragOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-gray-50"
                  }`}
                >
                  <MdOutlineCloudUpload
                    className={`text-3xl ${dragOver ? "text-blue-500" : "text-blue-400"}`}
                  />
                  <p className="text-sm text-gray-600">
                    Drag &amp; drop files here or{" "}
                    <span className="text-blue-600 font-medium hover:underline">
                      click to browse
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports PNG, JPG, GIF, PDF, DOC, ZIP (Max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".png,.jpg,.gif,.pdf,.doc,.docx,.zip"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════ RIGHT SIDEBAR ═══════════════ */}
          <div className="w-80 shrink-0 flex flex-col gap-5">
            {/* Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Status
              </h3>
              <SelectDropdown
                label="Status"
                required
                value={status}
                placeholder="Select status"
                options={STATUSES.map((s) => s.value)}
                onChange={(v) =>
                  setStatus(
                    v as
                      | "BACKLOG"
                      | "TODO"
                      | "IN_PROGRESS"
                      | "IN_REVIEW"
                      | "DONE"
                      | "BLOCKED",
                  )
                }
                renderOption={(v) => {
                  const s = STATUSES.find((x) => x.value === v)!;
                  return (
                    <>
                      <span
                        className={`w-2 h-2 rounded-full ${s.dot} shrink-0`}
                      />
                      <span>{s.label}</span>
                    </>
                  );
                }}
                renderSelected={(v) => {
                  const s = STATUSES.find((x) => x.value === v)!;
                  return (
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${s.dot} shrink-0`}
                      />
                      {s.label}
                    </span>
                  );
                }}
              />
              <p className="mt-2 text-xs text-gray-500">
                Issues are created in &ldquo;To Do&rdquo; status by default.
              </p>
            </div>

            {/* Additional Fields */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Additional Fields
              </h3>
              <div className="flex flex-col gap-4">
                <SelectDropdown
                  label="Environment"
                  value={environment}
                  placeholder="Select environment"
                  options={ENVIRONMENTS}
                  onChange={setEnvironment}
                />
                <SelectDropdown
                  label="Version"
                  value={version}
                  placeholder="Select version"
                  options={VERSIONS}
                  onChange={setVersion}
                />
                <SelectDropdown
                  label="Component"
                  value={component}
                  placeholder="Select component"
                  options={COMPONENTS}
                  onChange={setComponent}
                />
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <MdLightbulbOutline className="text-amber-500 text-xl" />
                <h3 className="text-sm font-semibold text-gray-900">Tips</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {EDIT_TIPS.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <MdCheckCircle className="text-green-500 text-base mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  Created
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  {formatDate(issue.createdAt)}
                </p>
              </div>
              <div className="border-t border-gray-100" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  Last Updated
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  {formatDate(issue.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
