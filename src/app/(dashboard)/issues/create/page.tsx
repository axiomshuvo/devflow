"use client";

import { currentUser, mockProjects, mockUsers } from "@/lib/mock-data";
import type { IssuePriority, IssueType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import {
  MdArrowBack,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward,
  MdBugReport,
  MdCalendarToday,
  MdCheckCircle,
  MdChevronRight,
  MdCode,
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
  MdKeyboardDoubleArrowDown,
  MdLightbulbOutline,
  MdLink,
  MdMoreHoriz,
  MdOutlineCloudUpload,
  MdRocketLaunch,
  MdSend,
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
];

const LABELS = [
  { id: "l1", name: "frontend", color: "#3b82f6" },
  { id: "l2", name: "backend", color: "#8b5cf6" },
  { id: "l3", name: "bug", color: "#ef4444" },
  { id: "l4", name: "ui/ux", color: "#f59e0b" },
  { id: "l5", name: "performance", color: "#10b981" },
  { id: "l6", name: "docs", color: "#6b7280" },
];

const MILESTONES = [
  "v1.0 Launch",
  "v1.1 Hotfix",
  "v2.0 Major Release",
  "Q2 Sprint",
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

const TIPS = [
  "Use a short and descriptive title",
  "Provide enough detail in the description",
  "Add relevant labels for better tracking",
  "Attach screenshots if applicable",
  "Set an appropriate priority",
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function SelectDropdown({
  label,
  value,
  placeholder,
  options,
  onChange,
  renderOption,
  renderSelected,
}: {
  label?: string;
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
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
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

export default function CreateIssuePage() {
  const router = useRouter();

  // Form state
  const [projectId, setProjectId] = useState(mockProjects[0].id);
  const [issueType, setIssueType] = useState<IssueType>("BUG");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<IssuePriority>("MEDIUM");
  const [assigneeId, setAssigneeId] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [milestone, setMilestone] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("TODO");
  const [environment, setEnvironment] = useState("");
  const [version, setVersion] = useState("");
  const [component, setComponent] = useState("");
  const [createAnother, setCreateAnother] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedProject = mockProjects.find((p) => p.id === projectId)!;

  function toggleLabel(id: string) {
    setSelectedLabels((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    );
  }

  function handleFileChange(files: FileList | null) {
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    setAttachments((prev) => [...prev, ...names]);
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
      toast.success("Issue created successfully!");
      if (createAnother) {
        setTitle("");
        setDescription("");
        setAssigneeId("");
        setSelectedLabels([]);
        setMilestone("");
        setDueDate("");
        setAttachments([]);
      } else {
        router.push("/issues");
      }
    }, 800);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ── Topbar breadcrumb ── */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link
            href="/dashboard"
            className="hover:text-gray-700 transition-colors"
          >
            Dashboard
          </Link>
          <MdChevronRight className="text-gray-400" />
          <Link
            href="/issues"
            className="hover:text-gray-700 transition-colors"
          >
            Issues
          </Link>
          <MdChevronRight className="text-gray-400" />
          <span className="text-gray-800 font-medium">Create Issue</span>
        </div>
        <div className="flex items-center gap-3 mt-3 mb-6">
          <Link href="/issues">
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <MdArrowBack className="text-lg" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Issue</h1>
        </div>
      </div>

      {/* ── Body ── */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 pb-24">
        <div className="flex gap-6 items-start">
          {/* ═══════════════ LEFT COLUMN ═══════════════ */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Issue Details card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-5">
                Issue Details
              </h2>

              {/* Project + Issue Type */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {/* Project */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
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
                </div>

                {/* Issue Type */}
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
                      <option>Heading 3</option>
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
                    {[MdLink, MdImage, MdFormatQuote, MdMoreHoriz].map(
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
                  {/* Textarea */}
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
                {/* Priority */}
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

                {/* Assignee */}
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
                          <Image
                            src={u.imageUrl ?? ""}
                            alt={u.name}
                            width={20}
                            height={20}
                            className="rounded-full object-cover shrink-0"
                          />
                          <span className="truncate">{u.name}</span>
                        </>
                      );
                    }}
                    renderSelected={(id) => {
                      const u = mockUsers.find((x) => x.id === id)!;
                      return (
                        <span className="flex items-center gap-2">
                          <Image
                            src={u.imageUrl ?? ""}
                            alt={u.name}
                            width={20}
                            height={20}
                            className="rounded-full object-cover shrink-0"
                          />
                          <span className="truncate">{u.name}</span>
                        </span>
                      );
                    }}
                  />
                </div>

                {/* Reporter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporter
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-not-allowed">
                    <Image
                      src={currentUser.imageUrl ?? ""}
                      alt={currentUser.name}
                      width={20}
                      height={20}
                      className="rounded-full object-cover shrink-0"
                    />
                    <span className="truncate">{currentUser.name} (You)</span>
                  </div>
                </div>
              </div>

              {/* Labels + Milestone + Due Date */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                {/* Labels */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Labels
                  </label>
                  <LabelDropdown
                    selected={selectedLabels}
                    onToggle={toggleLabel}
                  />
                </div>

                {/* Milestone */}
                <SelectDropdown
                  label="Milestone"
                  value={milestone}
                  placeholder="Select milestone"
                  options={MILESTONES}
                  onChange={setMilestone}
                />

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <div className="relative">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                    dragOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-gray-50"
                  }`}
                >
                  <MdOutlineCloudUpload
                    className={`text-4xl ${dragOver ? "text-blue-500" : "text-blue-400"}`}
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
                {attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {attachments.map((name, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() =>
                            setAttachments((prev) =>
                              prev.filter((_, j) => j !== i),
                            )
                          }
                          className="ml-0.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ═══════════════ RIGHT SIDEBAR ═══════════════ */}
          <div className="w-80 shrink-0 flex flex-col gap-5">
            {/* Status card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Status
              </h3>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Status
              </label>
              <SelectDropdown
                value={status}
                placeholder="Select status"
                options={STATUSES.map((s) => s.value)}
                onChange={setStatus}
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

            {/* Additional Fields card */}
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

            {/* Tips card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <MdLightbulbOutline className="text-amber-500 text-xl" />
                <h3 className="text-sm font-semibold text-gray-900">Tips</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {TIPS.map((tip, i) => (
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
          </div>
        </div>
      </form>

      {/* ── Fixed Bottom Bar ── */}
      <div className="fixed bottom-0 left-60 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between z-40">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={createAnother}
            onChange={(e) => setCreateAnother(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 accent-blue-600"
          />
          <span className="text-sm text-gray-600">Create another issue</span>
        </label>
        <div className="flex items-center gap-3">
          <Link href="/issues">
            <button
              type="button"
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            form=""
            disabled={submitting}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <MdSend className="text-base" />
            {submitting ? "Creating…" : "Create Issue"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Label dropdown sub-component ────────────────────────────────────────────

function LabelDropdown({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedLabelsData = LABELS.filter((l) => selected.includes(l.id));

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
      >
        {selectedLabelsData.length === 0 ? (
          <span className="text-gray-400">Select or add labels</span>
        ) : (
          <div className="flex items-center gap-1 flex-wrap">
            {selectedLabelsData.map((l) => (
              <span
                key={l.id}
                className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium text-white"
                style={{ backgroundColor: l.color }}
              >
                {l.name}
              </span>
            ))}
          </div>
        )}
        <MdExpandMore className="text-gray-400 shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {LABELS.map((label) => (
            <button
              key={label.id}
              type="button"
              onClick={() => onToggle(label.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: label.color }}
              />
              <span className="flex-1 text-gray-700">{label.name}</span>
              {selected.includes(label.id) && (
                <MdCheckCircle className="text-blue-500 text-base" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
