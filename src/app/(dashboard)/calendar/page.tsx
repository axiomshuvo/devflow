"use client";

import { useState } from "react";
import {
  MdBugReport,
  MdCalendarToday,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdDelete,
  MdEdit,
  MdExpandMore,
  MdFilterList,
  MdFolder,
  MdOpenInNew,
} from "react-icons/md";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventStatus = "todo" | "inprogress" | "inreview" | "done";

interface CalEvent {
  id: string;
  title: string;
  time: string;
  status: EventStatus;
  dayLabel: string;
  project: string;
  type: string;
  priority: string;
  priorityUp: boolean;
  assignee: string;
  assigneeInitials: string;
  assigneeColor: string;
  reporter: string;
  reporterInitials: string;
  reporterColor: string;
  dueDate: string;
  labels: string[];
  description: string;
}

interface DayCell {
  day: number;
  current: boolean;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CARD_STYLE: Record<EventStatus, string> = {
  todo: "bg-red-50 text-red-700",
  inprogress: "bg-amber-50 text-amber-700",
  inreview: "bg-violet-50 text-violet-700",
  done: "bg-emerald-50 text-emerald-700",
};

const TYPE_STYLE: Record<string, { bg: string; text: string }> = {
  Bug: { bg: "bg-purple-100", text: "text-purple-700" },
  Feature: { bg: "bg-green-100", text: "text-green-700" },
  Task: { bg: "bg-blue-100", text: "text-blue-700" },
  Improvement: { bg: "bg-amber-100", text: "text-amber-700" },
  Design: { bg: "bg-pink-100", text: "text-pink-700" },
};

const STATUS_BADGE: Record<string, string> = {
  "To Do": "bg-blue-50 text-blue-700",
  "In Progress": "bg-amber-50 text-amber-700",
  "In Review": "bg-violet-50 text-violet-700",
  Done: "bg-green-50 text-green-700",
};

const PRIORITY_BADGE: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-gray-100 text-gray-600",
};

const LABEL_STYLE = [
  "bg-purple-50 text-purple-700",
  "bg-red-50 text-red-700",
  "bg-blue-50 text-blue-700",
  "bg-green-50 text-green-700",
  "bg-amber-50 text-amber-700",
];

// ─── Calendar Grid — May 2024 ─────────────────────────────────────────────────
// May 1 = Wednesday (index 3)

const WEEKS: DayCell[][] = [
  [
    { day: 28, current: false },
    { day: 29, current: false },
    { day: 30, current: false },
    { day: 1, current: true },
    { day: 2, current: true },
    { day: 3, current: true },
    { day: 4, current: true },
  ],
  [
    { day: 5, current: true },
    { day: 6, current: true },
    { day: 7, current: true },
    { day: 8, current: true },
    { day: 9, current: true },
    { day: 10, current: true },
    { day: 11, current: true },
  ],
  [
    { day: 12, current: true },
    { day: 13, current: true },
    { day: 14, current: true },
    { day: 15, current: true },
    { day: 16, current: true },
    { day: 17, current: true },
    { day: 18, current: true },
  ],
  [
    { day: 19, current: true },
    { day: 20, current: true },
    { day: 21, current: true },
    { day: 22, current: true },
    { day: 23, current: true },
    { day: 24, current: true },
    { day: 25, current: true },
  ],
  [
    { day: 26, current: true },
    { day: 27, current: true },
    { day: 28, current: true },
    { day: 29, current: true },
    { day: 30, current: true },
    { day: 31, current: true },
    { day: 1, current: false },
  ],
];

const TODAY = 20; // "today" in the mock

// ─── Events ───────────────────────────────────────────────────────────────────

const EVENTS: Record<number, CalEvent[]> = {
  1: [
    {
      id: "e1",
      title: "Update documentation",
      time: "10:00 AM",
      status: "done",
      dayLabel: "Wednesday, May 1, 2024",
      project: "DevFlow Platform",
      type: "Task",
      priority: "Low",
      priorityUp: false,
      assignee: "Rahim Ahmed",
      assigneeInitials: "RA",
      assigneeColor: "bg-emerald-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 1, 2024",
      labels: ["docs"],
      description:
        "Update the project documentation with the latest API changes and deployment guides.",
    },
  ],
  3: [
    {
      id: "e2",
      title: "Add login with Google",
      time: "11:00 AM",
      status: "inreview",
      dayLabel: "Friday, May 3, 2024",
      project: "E-commerce Website",
      type: "Feature",
      priority: "High",
      priorityUp: true,
      assignee: "Karim Hossain",
      assigneeInitials: "KH",
      assigneeColor: "bg-sky-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 3, 2024",
      labels: ["auth"],
      description:
        "Implement OAuth 2.0 login flow using Google as the identity provider.",
    },
  ],
  6: [
    {
      id: "e3",
      title: "Improve dashboard charts",
      time: "10:00 AM",
      status: "inprogress",
      dayLabel: "Monday, May 6, 2024",
      project: "DevFlow Platform",
      type: "Improvement",
      priority: "Medium",
      priorityUp: true,
      assignee: "Jannat Rahman",
      assigneeInitials: "JR",
      assigneeColor: "bg-pink-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 8, 2024",
      labels: ["ui", "charts"],
      description:
        "Add more chart types and improve the visual design of the analytics dashboard.",
    },
  ],
  8: [
    {
      id: "e4",
      title: "Setup CI/CD pipeline",
      time: "11:00 AM",
      status: "done",
      dayLabel: "Wednesday, May 8, 2024",
      project: "DevFlow Platform",
      type: "Task",
      priority: "High",
      priorityUp: true,
      assignee: "Tanvir Ahmed",
      assigneeInitials: "TA",
      assigneeColor: "bg-orange-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 8, 2024",
      labels: ["devops"],
      description:
        "Configure GitHub Actions for automated testing and deployment.",
    },
  ],
  10: [
    {
      id: "e5",
      title: "Design login page UI",
      time: "02:00 PM",
      status: "done",
      dayLabel: "Friday, May 10, 2024",
      project: "E-commerce Website",
      type: "Design",
      priority: "Medium",
      priorityUp: true,
      assignee: "Nusrat Jahan",
      assigneeInitials: "NJ",
      assigneeColor: "bg-amber-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 10, 2024",
      labels: ["ui", "auth"],
      description:
        "Create responsive login page design with social login options.",
    },
  ],
  14: [
    {
      id: "e6",
      title: "Refactor code structure",
      time: "10:30 AM",
      status: "todo",
      dayLabel: "Tuesday, May 14, 2024",
      project: "DevFlow Platform",
      type: "Task",
      priority: "Medium",
      priorityUp: true,
      assignee: "Karim Hossain",
      assigneeInitials: "KH",
      assigneeColor: "bg-sky-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 16, 2024",
      labels: ["refactor"],
      description:
        "Reorganize the project codebase for better maintainability and scalability.",
    },
  ],
  17: [
    {
      id: "e7",
      title: "Fix cart quantity issue",
      time: "11:00 AM",
      status: "todo",
      dayLabel: "Friday, May 17, 2024",
      project: "E-commerce Website",
      type: "Bug",
      priority: "High",
      priorityUp: true,
      assignee: "Sakib Al Hasan",
      assigneeInitials: "SH",
      assigneeColor: "bg-teal-500",
      reporter: "Karim Hossain",
      reporterInitials: "KH",
      reporterColor: "bg-sky-500",
      dueDate: "May 18, 2024",
      labels: ["bug", "cart"],
      description:
        "Cart item quantities reset to 1 when navigating between pages.",
    },
  ],
  20: [
    {
      id: "e8",
      title: "Fix login redirect bug",
      time: "10:00 AM",
      status: "todo",
      dayLabel: "Monday, May 20, 2024",
      project: "E-commerce Website",
      type: "Bug",
      priority: "Medium",
      priorityUp: true,
      assignee: "Karim Hossain",
      assigneeInitials: "KH",
      assigneeColor: "bg-sky-500",
      reporter: "Rahim Ahmed",
      reporterInitials: "RA",
      reporterColor: "bg-emerald-500",
      dueDate: "May 25, 2024",
      labels: ["auth", "bug"],
      description:
        "Users are not redirected to the dashboard after successful login. Instead, they remain on the login page.",
    },
  ],
  22: [
    {
      id: "e9",
      title: "Setup project repository",
      time: "10:30 AM",
      status: "inprogress",
      dayLabel: "Wednesday, May 22, 2024",
      project: "Mobile App",
      type: "Task",
      priority: "Medium",
      priorityUp: true,
      assignee: "Tanvir Ahmed",
      assigneeInitials: "TA",
      assigneeColor: "bg-orange-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 22, 2024",
      labels: ["setup"],
      description:
        "Initialize the mobile app project repository with proper structure.",
    },
  ],
  24: [
    {
      id: "e10",
      title: "Optimize images",
      time: "09:30 AM",
      status: "inreview",
      dayLabel: "Friday, May 24, 2024",
      project: "E-commerce Website",
      type: "Task",
      priority: "Low",
      priorityUp: false,
      assignee: "Nusrat Jahan",
      assigneeInitials: "NJ",
      assigneeColor: "bg-amber-500",
      reporter: "Karim Hossain",
      reporterInitials: "KH",
      reporterColor: "bg-sky-500",
      dueDate: "May 24, 2024",
      labels: ["performance"],
      description:
        "Compress and optimize all product images to improve page load times.",
    },
  ],
  27: [
    {
      id: "e11",
      title: "Implement wishlist feature",
      time: "02:00 PM",
      status: "inprogress",
      dayLabel: "Monday, May 27, 2024",
      project: "E-commerce Website",
      type: "Feature",
      priority: "Medium",
      priorityUp: true,
      assignee: "Sakib Al Hasan",
      assigneeInitials: "SH",
      assigneeColor: "bg-teal-500",
      reporter: "Munna Islam",
      reporterInitials: "MI",
      reporterColor: "bg-blue-500",
      dueDate: "May 31, 2024",
      labels: ["feature"],
      description:
        "Add ability for users to save products to a wishlist for later purchase.",
    },
  ],
};

const STATUS_LABEL: Record<EventStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  inreview: "In Review",
  done: "Done",
};

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({
  event,
  onClose,
}: {
  event: CalEvent;
  onClose: () => void;
}) {
  const typeStyle = TYPE_STYLE[event.type] ?? TYPE_STYLE["Task"];
  const statusLabel = STATUS_LABEL[event.status];

  return (
    <aside className="w-72 shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
      {/* Date header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-800">
          {event.dayLabel}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <MdClose className="text-base" />
        </button>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Time */}
        <p className="text-xs font-semibold text-blue-600">
          {event.time} – {/* estimated end +1h */}
          {event.time.replace(/(\d+)/, (m) => String((parseInt(m) + 1) % 24))}
        </p>

        {/* Title + project */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1.5">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MdFolder className="text-base shrink-0" />
            {event.project}
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Fields */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          {/* Type */}
          <span className="text-xs text-gray-500 font-medium self-center">
            Type
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}
          >
            <MdBugReport className="text-sm shrink-0" />
            {event.type}
          </span>

          {/* Status */}
          <span className="text-xs text-gray-500 font-medium self-center">
            Status
          </span>
          <span
            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[statusLabel]}`}
          >
            {statusLabel}
          </span>

          {/* Priority */}
          <span className="text-xs text-gray-500 font-medium self-center">
            Priority
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_BADGE[event.priority]}`}
          >
            {event.priorityUp ? "↑" : "↓"} {event.priority}
          </span>

          {/* Assignee */}
          <span className="text-xs text-gray-500 font-medium self-center">
            Assignee
          </span>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-5 h-5 rounded-full ${event.assigneeColor} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}
            >
              {event.assigneeInitials}
            </div>
            <span className="text-xs text-gray-700">{event.assignee}</span>
          </div>

          {/* Reporter */}
          <span className="text-xs text-gray-500 font-medium self-center">
            Reporter
          </span>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-5 h-5 rounded-full ${event.reporterColor} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}
            >
              {event.reporterInitials}
            </div>
            <span className="text-xs text-gray-700">{event.reporter}</span>
          </div>

          {/* Due Date */}
          <span className="text-xs text-gray-500 font-medium self-center">
            Due Date
          </span>
          <div className="flex items-center gap-1.5">
            <MdCalendarToday className="text-gray-400 text-sm shrink-0" />
            <span className="text-xs text-gray-700">{event.dueDate}</span>
          </div>

          {/* Labels */}
          <span className="text-xs text-gray-500 font-medium self-start pt-1">
            Labels
          </span>
          <div className="flex flex-wrap gap-1">
            {event.labels.map((label, i) => (
              <span
                key={label}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${LABEL_STYLE[i % LABEL_STYLE.length]}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Description */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Description
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="border-t border-gray-100" />

        {/* Links */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">Links</p>
          <div className="flex flex-col gap-2">
            {[{ label: "View Issue" }, { label: "View in Project" }].map(
              ({ label }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 text-xs text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  {label}
                  <MdOpenInNew className="text-sm shrink-0" />
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-200 flex items-center gap-2">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <MdEdit className="text-base" />
          Edit Event
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-100 transition-colors"
        >
          <MdDelete className="text-base" />
          Delete Event
        </button>
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const LEGEND: { label: string; dot: string }[] = [
  { label: "To Do", dot: "bg-blue-500" },
  { label: "In Progress", dot: "bg-amber-400" },
  { label: "In Review", dot: "bg-violet-500" },
  { label: "Done", dot: "bg-green-500" },
  { label: "Event", dot: "bg-blue-600" },
];

export default function CalendarPage() {
  const [selected, setSelected] = useState<CalEvent>(EVENTS[20][0]);
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="flex h-full overflow-hidden bg-white">
      {/* ── Left: calendar ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              <MdFilterList className="text-gray-500 text-base" />
              Filter
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              + New Event
              <MdExpandMore className="text-base" />
            </button>
          </div>
        </div>

        {/* Nav bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 shrink-0">
          <button
            type="button"
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <MdChevronLeft className="text-base" />
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <MdChevronRight className="text-base" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            May 2024
            <MdExpandMore className="text-lg" />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto">
          <table className="w-full h-full border-collapse table-fixed">
            {/* Day headers */}
            <thead>
              <tr>
                {DAY_HEADERS.map((d) => (
                  <th
                    key={d}
                    className="py-2 text-xs font-semibold text-gray-500 text-center border-b border-gray-200 w-[14.28%]"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEEKS.map((week, wi) => (
                <tr key={wi} className="h-28">
                  {week.map((cell, ci) => {
                    const isToday = cell.current && cell.day === TODAY;
                    const events = cell.current ? (EVENTS[cell.day] ?? []) : [];
                    return (
                      <td
                        key={ci}
                        className="align-top border border-gray-100 p-1.5"
                      >
                        {/* Day number */}
                        <div className="flex justify-center mb-1">
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium ${
                              isToday
                                ? "bg-blue-600 text-white"
                                : cell.current
                                  ? "text-gray-900"
                                  : "text-gray-300"
                            }`}
                          >
                            {cell.day}
                          </span>
                        </div>
                        {/* Events */}
                        <div className="flex flex-col gap-0.5">
                          {events.map((ev) => (
                            <button
                              key={ev.id}
                              type="button"
                              onClick={() => {
                                setSelected(ev);
                                setShowPanel(true);
                              }}
                              className={`w-full text-left px-1.5 py-1 rounded-md text-[10px] leading-tight font-medium transition-opacity hover:opacity-80 ${CARD_STYLE[ev.status]}`}
                            >
                              <span className="block truncate">{ev.title}</span>
                              <span className="block opacity-70">
                                {ev.time}
                              </span>
                            </button>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Legend */}
          <div className="flex items-center gap-5 px-6 py-3 border-t border-gray-200">
            {LEGEND.map(({ label, dot }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: detail panel ── */}
      {showPanel && (
        <DetailPanel event={selected} onClose={() => setShowPanel(false)} />
      )}
    </div>
  );
}
