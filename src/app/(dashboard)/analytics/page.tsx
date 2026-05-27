"use client";

import React, { useState } from "react";
import {
  MdCalendarToday,
  MdExpandMore,
  MdFilterList,
  MdFlashOn,
  MdGroup,
  MdInsertDriveFile,
  MdPendingActions,
  MdTaskAlt,
} from "react-icons/md";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DAILY_ISSUES = [
  { day: "May 14", Created: 22, Closed: 16, Resolved: 12 },
  { day: "May 15", Created: 28, Closed: 20, Resolved: 14 },
  { day: "May 16", Created: 26, Closed: 18, Resolved: 16 },
  { day: "May 17", Created: 32, Closed: 26, Resolved: 18 },
  { day: "May 18", Created: 24, Closed: 24, Resolved: 14 },
  { day: "May 19", Created: 20, Closed: 18, Resolved: 10 },
  { day: "May 20", Created: 26, Closed: 20, Resolved: 14 },
];

const STATUS_DATA = [
  { name: "To Do", value: 32, color: "#8b5cf6" },
  { name: "In Progress", value: 27, color: "#f59e0b" },
  { name: "In Review", value: 15, color: "#3b82f6" },
  { name: "Done", value: 42, color: "#22c55e" },
  { name: "Blocked", value: 8, color: "#ef4444" },
  { name: "Cancelled", value: 10, color: "#9ca3af" },
];

const PRIORITY_DATA = [
  { name: "High", value: 38, color: "#ef4444" },
  { name: "Medium", value: 56, color: "#f59e0b" },
  { name: "Low", value: 28, color: "#22c55e" },
  { name: "Lowest", value: 12, color: "#9ca3af" },
];

const TOP_PROJECTS = [
  { name: "E-commerce Website", icon: "🛍️", issues: 62, progress: 78, barColor: "bg-green-500" },
  { name: "Mobile App", icon: "📱", issues: 28, progress: 65, barColor: "bg-green-500" },
  { name: "DevFlow Platform", icon: "</>", issues: 18, progress: 54, barColor: "bg-green-400" },
  { name: "Internal Tools", icon: "⚙️", issues: 12, progress: 40, barColor: "bg-amber-400" },
  { name: "Marketing Website", icon: "🌐", issues: 8, progress: 33, barColor: "bg-amber-400" },
];

const TEAM_WORKLOAD = [
  { name: "Karim Hossain", initials: "KH", color: "bg-sky-500", inProgress: 12, completed: 18 },
  { name: "Rahim Ahmed", initials: "RA", color: "bg-emerald-500", inProgress: 9, completed: 14 },
  { name: "Jannat Rahman", initials: "JR", color: "bg-pink-500", inProgress: 8, completed: 12 },
  { name: "Sakib Al Hasan", initials: "SH", color: "bg-amber-500", inProgress: 6, completed: 10 },
  { name: "Nusrat Jahan", initials: "NJ", color: "bg-orange-500", inProgress: 4, completed: 8 },
];

const STATS = [
  {
    label: "Issues Created",
    value: 48,
    pct: 16,
    up: true,
    icon: MdInsertDriveFile,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    label: "Issues Closed",
    value: 36,
    pct: 20,
    up: true,
    icon: MdTaskAlt,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    label: "In Progress",
    value: 27,
    pct: 8,
    up: false,
    icon: MdPendingActions,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-400",
  },
  {
    label: "Active Members",
    value: 24,
    pct: 14,
    up: true,
    icon: MdGroup,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    label: "Velocity",
    value: 42,
    pct: 12,
    up: true,
    icon: MdFlashOn,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
];

const TABS = ["Overview", "Projects", "Issues", "Team", "Reports", "DORA Metrics"];
const TOTAL_STATUS = STATUS_DATA.reduce((s, d) => s + d.value, 0);
const TOTAL_PRIORITY = PRIORITY_DATA.reduce((s, d) => s + d.value, 0);

// ─── Custom donut label ───────────────────────────────────────────────────────

function DonutCenter() {
  return (
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
      <tspan x="50%" dy="-8" fontSize="26" fontWeight="700" fill="#111827">
        {TOTAL_STATUS}
      </tspan>
      <tspan x="50%" dy="22" fontSize="12" fill="#6b7280">
        Total
      </tspan>
    </text>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-auto">
      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-0 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Track your team&apos;s progress and performance
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Date range */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MdCalendarToday className="text-gray-400 text-base" />
              May 14 – May 20, 2024
              <MdExpandMore className="text-gray-400 text-base" />
            </button>
            {/* Filters */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MdFilterList className="text-gray-500 text-base" />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      {activeTab !== "Overview" ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">{activeTab} — coming soon</p>
        </div>
      ) : (
        <div className="flex-1 p-6 flex flex-col gap-5">
          {/* ── Stats row ── */}
          <div className="grid grid-cols-5 gap-4">
            {STATS.map(({ label, value, pct, up, icon: Icon, iconBg, iconColor }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`text-xl ${iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium leading-tight">
                    {label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">
                    {value}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span
                      className={`text-xs font-semibold ${up ? "text-green-600" : "text-red-500"}`}
                    >
                      {up ? "↑" : "↓"}{pct}%
                    </span>
                    <span className="text-[10px] text-gray-400">
                      vs May 7 – May 13
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Charts row 1 ── */}
          <div className="grid grid-cols-5 gap-5">
            {/* Issues Overview line chart */}
            <div className="col-span-3 bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Issues Overview
                </h2>
                <button
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Daily
                  <MdExpandMore className="text-gray-400 text-sm" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={DAILY_ISSUES}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 50]}
                    ticks={[0, 10, 20, 30, 40, 50]}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Line
                    type="monotone"
                    dataKey="Created"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#3b82f6" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Closed"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#22c55e" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Resolved"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#8b5cf6" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Issues by Status donut */}
            <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  Issues by Status
                </h2>
                <span className="text-xs text-gray-400 font-medium">
                  Total: {TOTAL_STATUS}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {/* Donut */}
                <div className="shrink-0">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie
                        data={STATUS_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={72}
                        paddingAngle={2}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {STATUS_DATA.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <DonutCenter />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  {STATUS_DATA.map((item) => {
                    const pct = ((item.value / TOTAL_STATUS) * 100).toFixed(1);
                    return (
                      <div key={item.name} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-gray-600 truncate">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-semibold text-gray-900">
                            {item.value}
                          </span>
                          <span className="text-[10px] text-gray-400 w-11 text-right">
                            ({pct}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Charts row 2 ── */}
          <div className="grid grid-cols-3 gap-5">
            {/* Top Projects */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Top Projects
                </h2>
                <button
                  type="button"
                  className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  View all
                </button>
              </div>
              {/* Column headers */}
              <div className="grid grid-cols-3 gap-2 mb-2 px-1">
                <span className="text-xs text-gray-400 font-medium col-span-1">Project</span>
                <span className="text-xs text-gray-400 font-medium text-right">Issues</span>
                <span className="text-xs text-gray-400 font-medium text-right">Progress</span>
              </div>
              <div className="flex flex-col gap-3">
                {TOP_PROJECTS.map((proj) => (
                  <div key={proj.name} className="flex items-center gap-3">
                    <span className="text-base w-5 shrink-0">{proj.icon}</span>
                    <span className="text-sm text-gray-700 flex-1 truncate min-w-0">
                      {proj.name}
                    </span>
                    <span className="text-sm text-gray-600 font-medium w-6 text-right shrink-0">
                      {proj.issues}
                    </span>
                    <div className="w-20 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${proj.barColor} rounded-full`}
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right shrink-0">
                          {proj.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Workload */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Team Workload
                </h2>
                <button
                  type="button"
                  className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  View all
                </button>
              </div>
              {/* Column headers */}
              <div className="flex items-center mb-2 px-1">
                <span className="text-xs text-gray-400 font-medium flex-1">Member</span>
                <span className="text-xs text-gray-400 font-medium w-24 text-center">In Progress</span>
                <span className="text-xs text-gray-400 font-medium w-20 text-center">Completed</span>
              </div>
              <div className="flex flex-col gap-3">
                {TEAM_WORKLOAD.map((member) => {
                  const maxInProg = Math.max(...TEAM_WORKLOAD.map((m) => m.inProgress));
                  const maxDone = Math.max(...TEAM_WORKLOAD.map((m) => m.completed));
                  return (
                    <div key={member.name} className="flex items-center gap-2">
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-white text-[10px] font-semibold shrink-0`}
                      >
                        {member.initials}
                      </div>
                      {/* Name */}
                      <span className="text-xs text-gray-700 flex-1 truncate">
                        {member.name}
                      </span>
                      {/* In Progress bar */}
                      <div className="flex items-center gap-1 w-24">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${(member.inProgress / maxInProg) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-4 text-right shrink-0">
                          {member.inProgress}
                        </span>
                      </div>
                      {/* Completed bar */}
                      <div className="flex items-center gap-1 w-20">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-400 rounded-full"
                            style={{ width: `${(member.completed / maxDone) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-4 text-right shrink-0">
                          {member.completed}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Issue Breakdown by Priority bar chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Issue Breakdown by Priority
                </h2>
                <span className="text-xs text-gray-400 font-medium shrink-0">
                  Total: {TOTAL_PRIORITY}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={PRIORITY_DATA}
                  margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 80]}
                    ticks={[0, 20, 40, 60, 80]}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {PRIORITY_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Sprint Progress ── */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Sprint Progress
            </h2>
            <div className="flex items-center gap-6">
              {/* Sprint info */}
              <div className="shrink-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-gray-900">
                    Sprint 2
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-400">May 10 – May 24</p>
              </div>

              {/* Progress bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-sm font-semibold text-gray-700 shrink-0">
                    Progress
                  </span>
                  <span className="text-xl font-bold text-gray-900 shrink-0">
                    62%
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: "62%" }}
                  />
                </div>
              </div>

              {/* Completed */}
              <div className="shrink-0 text-center">
                <p className="text-xs text-gray-400 mb-0.5">Completed</p>
                <p className="text-sm font-semibold text-gray-800">
                  31 / 50 issues
                </p>
              </div>

              {/* Days Left */}
              <div className="shrink-0 text-center">
                <p className="text-xs text-gray-400 mb-0.5">Days Left</p>
                <p className="text-lg font-bold text-blue-600">4 days</p>
              </div>

              {/* View Sprint */}
              <button
                type="button"
                className="shrink-0 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Sprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
