"use client";

import React, { useState } from "react";
import {
  MdAddCircle,
  MdArrowBack,
  MdArrowForward,
  MdArrowUpward,
  MdCalendarToday,
  MdCheckCircle,
  MdClose,
  MdComment,
  MdComputer,
  MdDelete,
  MdDownload,
  MdEdit,
  MdExpandMore,
  MdFilterList,
  MdFolderOpen,
  MdGroupAdd,
  MdOpenInNew,
  MdPersonAdd,
  MdTaskAlt,
} from "react-icons/md";

// ─── Types ────────────────────────────────────────────────────────────────────

type Module = "Issues" | "Projects" | "Team";

interface Activity {
  id: string;
  datetime: string;
  dateLabel: string;
  timeLabel: string;
  relativeTime: string;
  user: string;
  userRole: string;
  userInitials: string;
  userColor: string;
  action: string;
  actionIcon: React.ElementType;
  actionIconBg: string;
  actionIconColor: string;
  details: string;
  detailsHighlight: string;
  module: Module;
  ip: string;
  browser: string;
  os: string;
  device: string;
  sessionId: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ACTIVITIES: Activity[] = [
  {
    id: "a1",
    datetime: "May 20, 2024 10:32 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "10:32 AM",
    relativeTime: "2 minutes ago",
    user: "Munna Islam",
    userRole: "Admin",
    userInitials: "MI",
    userColor: "bg-blue-500",
    action: "Created Issue",
    actionIcon: MdAddCircle,
    actionIconBg: "bg-purple-100",
    actionIconColor: "text-purple-600",
    details: "Created issue DF-102: Fix login redirect bug",
    detailsHighlight: "DF-102: Fix login redirect bug",
    module: "Issues",
    ip: "192.168.1.10",
    browser: "Chrome 124.0.0.0",
    os: "Windows 11",
    device: "Desktop",
    sessionId: "c8f3a2b7-9e6d-4f1a-8c2e-7f9b5d2e1a6c",
  },
  {
    id: "a2",
    datetime: "May 20, 2024 10:15 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "10:15 AM",
    relativeTime: "19 minutes ago",
    user: "Karim Hossain",
    userRole: "Developer",
    userInitials: "KH",
    userColor: "bg-sky-500",
    action: "Updated Issue",
    actionIcon: MdEdit,
    actionIconBg: "bg-blue-100",
    actionIconColor: "text-blue-600",
    details: "Updated issue DF-98: Add login with Google",
    detailsHighlight: "DF-98: Add login with Google",
    module: "Issues",
    ip: "192.168.1.12",
    browser: "Firefox 125.0",
    os: "Ubuntu 22.04",
    device: "Desktop",
    sessionId: "d9a4b3c8-7e1f-5b2a-9c3d-8g6h4e3f2b1a",
  },
  {
    id: "a3",
    datetime: "May 20, 2024 09:48 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "09:48 AM",
    relativeTime: "46 minutes ago",
    user: "Rahim Ahmed",
    userRole: "Developer",
    userInitials: "RA",
    userColor: "bg-emerald-500",
    action: "Changed Status",
    actionIcon: MdCheckCircle,
    actionIconBg: "bg-green-100",
    actionIconColor: "text-green-600",
    details: 'Changed status of DF-95 from "In Progress" to "Done"',
    detailsHighlight: "DF-95",
    module: "Issues",
    ip: "192.168.1.11",
    browser: "Chrome 124.0.0.0",
    os: "macOS 14",
    device: "Laptop",
    sessionId: "e1b5c4d9-8f2g-6c3b-0d4e-9h7i5f4g3c2b",
  },
  {
    id: "a4",
    datetime: "May 20, 2024 09:30 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "09:30 AM",
    relativeTime: "1 hour ago",
    user: "Jannat Rahman",
    userRole: "QA Engineer",
    userInitials: "JR",
    userColor: "bg-pink-500",
    action: "Added Comment",
    actionIcon: MdComment,
    actionIconBg: "bg-sky-100",
    actionIconColor: "text-sky-600",
    details: "Added a comment on DF-101: Refactor code structure",
    detailsHighlight: "DF-101: Refactor code structure",
    module: "Issues",
    ip: "192.168.1.15",
    browser: "Safari 17.4",
    os: "macOS 14",
    device: "Laptop",
    sessionId: "f2c6d5e0-9g3h-7d4c-1e5f-0i8j6g5h4d3c",
  },
  {
    id: "a5",
    datetime: "May 20, 2024 09:12 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "09:12 AM",
    relativeTime: "1 hour ago",
    user: "Tanvir Ahmed",
    userRole: "Developer",
    userInitials: "TA",
    userColor: "bg-orange-500",
    action: "Changed Priority",
    actionIcon: MdArrowUpward,
    actionIconBg: "bg-amber-100",
    actionIconColor: "text-amber-600",
    details: "Changed priority of DF-97 from Low to High",
    detailsHighlight: "DF-97",
    module: "Issues",
    ip: "192.168.1.14",
    browser: "Edge 124.0",
    os: "Windows 10",
    device: "Desktop",
    sessionId: "g3d7e6f1-0h4i-8e5d-2f6g-1j9k7h6i5e4d",
  },
  {
    id: "a6",
    datetime: "May 20, 2024 08:55 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "08:55 AM",
    relativeTime: "2 hours ago",
    user: "Nusrat Jahan",
    userRole: "Designer",
    userInitials: "NJ",
    userColor: "bg-amber-500",
    action: "Assigned Issue",
    actionIcon: MdPersonAdd,
    actionIconBg: "bg-teal-100",
    actionIconColor: "text-teal-600",
    details: "Assigned DF-100: Setup project repository to Sakib Al Hasan",
    detailsHighlight: "DF-100: Setup project repository",
    module: "Issues",
    ip: "192.168.1.16",
    browser: "Chrome 124.0.0.0",
    os: "Windows 11",
    device: "Desktop",
    sessionId: "h4e8f7g2-1i5j-9f6e-3g7h-2k0l8i7j6f5e",
  },
  {
    id: "a7",
    datetime: "May 20, 2024 08:40 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "08:40 AM",
    relativeTime: "2 hours ago",
    user: "Sakib Al Hasan",
    userRole: "Developer",
    userInitials: "SH",
    userColor: "bg-teal-500",
    action: "Resolved Issue",
    actionIcon: MdTaskAlt,
    actionIconBg: "bg-green-100",
    actionIconColor: "text-green-600",
    details: "Resolved issue DF-94: Update documentation",
    detailsHighlight: "DF-94: Update documentation",
    module: "Issues",
    ip: "192.168.1.13",
    browser: "Chrome 124.0.0.0",
    os: "Linux",
    device: "Desktop",
    sessionId: "i5f9g8h3-2j6k-0g7f-4h8i-3l1m9j8k7g6f",
  },
  {
    id: "a8",
    datetime: "May 20, 2024 08:20 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "08:20 AM",
    relativeTime: "2 hours ago",
    user: "Munna Islam",
    userRole: "Admin",
    userInitials: "MI",
    userColor: "bg-blue-500",
    action: "Created Project",
    actionIcon: MdFolderOpen,
    actionIconBg: "bg-indigo-100",
    actionIconColor: "text-indigo-600",
    details: "Created project: Mobile App",
    detailsHighlight: "Mobile App",
    module: "Projects",
    ip: "192.168.1.10",
    browser: "Chrome 124.0.0.0",
    os: "Windows 11",
    device: "Desktop",
    sessionId: "j6g0h9i4-3k7l-1h8g-5i9j-4m2n0k9l8h7g",
  },
  {
    id: "a9",
    datetime: "May 20, 2024 08:05 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "08:05 AM",
    relativeTime: "3 hours ago",
    user: "Karim Hossain",
    userRole: "Developer",
    userInitials: "KH",
    userColor: "bg-sky-500",
    action: "Added Member",
    actionIcon: MdGroupAdd,
    actionIconBg: "bg-blue-100",
    actionIconColor: "text-blue-600",
    details: "Added Rahim Ahmed to Frontend team",
    detailsHighlight: "Rahim Ahmed",
    module: "Team",
    ip: "192.168.1.12",
    browser: "Firefox 125.0",
    os: "Ubuntu 22.04",
    device: "Desktop",
    sessionId: "k7h1i0j5-4l8m-2i9h-6j0k-5n3o1l0m9i8h",
  },
  {
    id: "a10",
    datetime: "May 20, 2024 07:45 AM",
    dateLabel: "May 20, 2024",
    timeLabel: "07:45 AM",
    relativeTime: "3 hours ago",
    user: "Munna Islam",
    userRole: "Admin",
    userInitials: "MI",
    userColor: "bg-blue-500",
    action: "Deleted Issue",
    actionIcon: MdDelete,
    actionIconBg: "bg-red-100",
    actionIconColor: "text-red-600",
    details: "Deleted issue DF-93: Old login page",
    detailsHighlight: "DF-93: Old login page",
    module: "Issues",
    ip: "192.168.1.10",
    browser: "Chrome 124.0.0.0",
    os: "Windows 11",
    device: "Desktop",
    sessionId: "l8i2j1k6-5m9n-3j0i-7k1l-6o4p2m1n0j9i",
  },
];

const MODULE_STYLES: Record<Module, string> = {
  Issues: "bg-purple-100 text-purple-700",
  Projects: "bg-green-100 text-green-700",
  Team: "bg-blue-100 text-blue-700",
};

// ─── Activity Details Panel ───────────────────────────────────────────────────

function ActivityDetailsPanel({
  activity,
  onClose,
}: {
  activity: Activity;
  onClose: () => void;
}) {
  const Icon = activity.actionIcon;
  return (
    <aside className="w-72 shrink-0 bg-white border-l border-gray-200 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">
          Activity Details
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <MdClose className="text-base" />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Action title */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${activity.actionIconBg} flex items-center justify-center shrink-0`}
          >
            <Icon className={`text-xl ${activity.actionIconColor}`} />
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {activity.action}
          </span>
        </div>

        {/* Time */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Time
          </p>
          <div className="flex items-start gap-2">
            <MdCalendarToday className="text-gray-400 text-base mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-gray-800">{activity.datetime}</p>
              <p className="text-xs text-gray-400">({activity.relativeTime})</p>
            </div>
          </div>
        </div>

        {/* User */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            User
          </p>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full ${activity.userColor} flex items-center justify-center text-white text-xs font-semibold shrink-0`}
            >
              {activity.userInitials}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {activity.user}
              </p>
              <p className="text-xs text-gray-400">{activity.userRole}</p>
            </div>
          </div>
        </div>

        {/* Module */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Module
          </p>
          <span
            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${MODULE_STYLES[activity.module]}`}
          >
            {activity.module}
          </span>
        </div>

        {/* IP Address */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            IP Address
          </p>
          <div className="flex items-center gap-2">
            <MdComputer className="text-gray-400 text-base shrink-0" />
            <span className="text-sm text-gray-800">{activity.ip}</span>
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Details
          </p>
          <p className="text-sm text-blue-600">{activity.details}</p>
        </div>

        {/* Additional Information */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Additional Information
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Browser", value: activity.browser },
              { label: "OS", value: activity.os },
              { label: "Device", value: activity.device },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-medium text-gray-800">
                  {value}
                </span>
              </div>
            ))}
            <div className="pt-1 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-0.5">Session ID</p>
              <p className="text-[10px] font-mono text-gray-600 break-all">
                {activity.sessionId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-5 border-t border-gray-200">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View Full Details
          <MdOpenInNew className="text-base" />
        </button>
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ActivityLogPage() {
  const [selected, setSelected] = useState<Activity>(ACTIVITIES[0]);
  const [showPanel, setShowPanel] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 16;

  return (
    <div className="flex h-full bg-gray-50 overflow-hidden">
      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* ── Header ── */}
        <div className="bg-white border-b border-gray-200 px-6 pt-5 pb-0 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Track all activities across the system
              </p>
            </div>
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-2 py-4 flex-wrap">
            {/* Date range */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MdCalendarToday className="text-gray-400 text-base" />
              May 14 – May 20, 2024
              <MdExpandMore className="text-gray-400 text-sm" />
            </button>

            {/* All Users */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              All Users
              <MdExpandMore className="text-gray-400 text-sm" />
            </button>

            {/* All Actions */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              All Actions
              <MdExpandMore className="text-gray-400 text-sm" />
            </button>

            {/* All Modules */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              All Modules
              <MdExpandMore className="text-gray-400 text-sm" />
            </button>

            {/* Filters */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MdFilterList className="text-gray-500 text-base" />
              Filters
            </button>

            {/* Export — right side */}
            <div className="ml-auto">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <MdDownload className="text-gray-500 text-base" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-40">
                  Time
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  User
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Action
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Details
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">
                  Module
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {ACTIVITIES.map((act) => {
                const Icon = act.actionIcon;
                const isSelected = selected.id === act.id;
                return (
                  <tr
                    key={act.id}
                    onClick={() => {
                      setSelected(act);
                      setShowPanel(true);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Time */}
                    <td className="px-6 py-3.5 text-xs text-gray-500 w-40">
                      <span className="block">{act.dateLabel}</span>
                      <span className="block text-gray-400">
                        {act.timeLabel}
                      </span>
                    </td>

                    {/* User */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full ${act.userColor} flex items-center justify-center text-white text-[10px] font-semibold shrink-0`}
                        >
                          {act.userInitials}
                        </div>
                        <span className="text-sm text-gray-800 font-medium">
                          {act.user}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full ${act.actionIconBg} flex items-center justify-center shrink-0`}
                        >
                          <Icon className={`text-sm ${act.actionIconColor}`} />
                        </div>
                        <span className="text-sm text-gray-700">
                          {act.action}
                        </span>
                      </div>
                    </td>

                    {/* Details */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="text-sm text-gray-700 truncate">
                        {act.details.replace(act.detailsHighlight, "")}
                        <span className="text-blue-600 font-medium">
                          {act.detailsHighlight}
                        </span>
                      </p>
                    </td>

                    {/* Module */}
                    <td className="px-4 py-3.5 w-24">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${MODULE_STYLES[act.module]}`}
                      >
                        {act.module}
                      </span>
                    </td>

                    {/* IP */}
                    <td className="px-4 py-3.5 w-32">
                      <span className="text-xs text-gray-500 font-mono">
                        {act.ip}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
          <p className="text-sm text-gray-500">
            Showing 1 to 10 of 156 activities
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <MdArrowBack className="text-sm" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === p
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
              ...
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {totalPages}
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <MdArrowForward className="text-sm" />
            </button>

            {/* Per page */}
            <div className="ml-2 flex items-center gap-1">
              <select className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>10 / page</option>
                <option>25 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Details panel ── */}
      {showPanel && (
        <ActivityDetailsPanel
          activity={selected}
          onClose={() => setShowPanel(false)}
        />
      )}
    </div>
  );
}
