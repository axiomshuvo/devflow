"use client";

import { StatsCard } from "@/components/shared/stats-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  currentUser,
  dashboardStats,
  mockActivity,
  mockIssues,
  mockProjects,
  weeklyTrend,
} from "@/lib/mock-data";
import { formatDateShort, formatRelativeDate } from "@/lib/utils";
import type { IssueStatus } from "@/types";
import { Avatar, ProgressBar } from "@heroui/react";
import Link from "next/link";
import {
  MdArrowForward,
  MdCheckCircleOutline,
  MdOutlineDonutLarge,
  MdOutlineList,
  MdOutlineTaskAlt,
  MdOutlineTimer,
  MdOutlineWarningAmber,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Donut chart data ────────────────────────────────────────────────────────
const donutData = [
  { name: "Backlog", value: 15, color: "#3b82f6" },
  { name: "To Do", value: 30, color: "#f59e0b" },
  { name: "In Progress", value: 28, color: "#8b5cf6" },
  { name: "In Review", value: 15, color: "#10b981" },
  { name: "Done", value: 32, color: "#06b6d4" },
];

// ─── Project icon colors ─────────────────────────────────────────────────────
const projectIconColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
];

const projectIcons = ["🛍️", "</>", "📱", "🌐"];

export default function DashboardPage() {
  const recentIssues = [...mockIssues]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Welcome back, {currentUser.name.split(" ")[0]}! 👋
        </p>
      </div>

      {/* ── Stats Row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        <StatsCard
          label="Total Issues"
          value={dashboardStats.totalIssues}
          icon={<MdOutlineList className="text-blue-600 text-xl" />}
          iconBg="bg-blue-50"
          change={12}
        />
        <StatsCard
          label="Open Issues"
          value={dashboardStats.openIssues}
          icon={<MdOutlineDonutLarge className="text-orange-500 text-xl" />}
          iconBg="bg-orange-50"
          change={8}
        />
        <StatsCard
          label="In Progress"
          value={28}
          icon={<MdOutlineTimer className="text-amber-500 text-xl" />}
          iconBg="bg-amber-50"
          change={5}
        />
        <StatsCard
          label="Completed"
          value={dashboardStats.completedIssues}
          icon={<MdOutlineTaskAlt className="text-emerald-500 text-xl" />}
          iconBg="bg-emerald-50"
          change={18}
        />
        <StatsCard
          label="Overdue"
          value={dashboardStats.overdueIssues}
          icon={<MdOutlineWarningAmber className="text-red-500 text-xl" />}
          iconBg="bg-red-50"
          change={-20}
        />
      </div>

      {/* ── Charts Row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Issues Overview
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <PieChart width={160} height={160}>
                <Pie
                  data={donutData}
                  cx={75}
                  cy={75}
                  innerRadius={52}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-gray-900">120</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {donutData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {item.value} ({Math.round((item.value / 120) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Issues Trend
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
              This Week ▾
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart
              data={weeklyTrend}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                }}
              />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Three column row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Issues */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Recent Issues
            </h3>
            <Link
              href="/issues"
              className="text-blue-500 text-xs hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/issues/${issue.id}`}
                    className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-1"
                  >
                    {issue.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {issue.projectKey}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={issue.status as IssueStatus} />
                  <Avatar size="sm" className="w-6 h-6">
                    <Avatar.Image
                      src={issue.assignee?.imageUrl}
                      alt={issue.assignee?.name}
                    />
                    <Avatar.Fallback>
                      {issue.assignee?.name?.charAt(0) ?? "?"}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {formatDateShort(issue.createdAt)}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/issues"
            className="mt-4 flex items-center gap-1 text-blue-500 text-xs hover:underline"
          >
            View all issues <MdArrowForward className="text-sm" />
          </Link>
        </div>

        {/* My Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">My Tasks</h3>
            <Link
              href="/my-tasks"
              className="text-blue-500 text-xs hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {mockIssues.slice(0, 5).map((issue) => (
              <div key={issue.id} className="flex items-center gap-3">
                <div className="shrink-0">
                  {issue.status === "DONE" ? (
                    <MdCheckCircleOutline className="text-emerald-500 text-lg" />
                  ) : (
                    <MdRadioButtonUnchecked className="text-gray-300 text-lg" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium line-clamp-1 ${
                      issue.status === "DONE"
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {issue.title}
                  </p>
                  <p className="text-xs text-gray-400">{issue.projectKey}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={issue.status as IssueStatus} />
                  <span className="text-xs text-gray-400">
                    {issue.dueDate ? formatDateShort(issue.dueDate) : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/my-tasks"
            className="mt-4 flex items-center gap-1 text-blue-500 text-xs hover:underline"
          >
            View all tasks <MdArrowForward className="text-sm" />
          </Link>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Activity Feed
            </h3>
            <Link
              href="/activity"
              className="text-blue-500 text-xs hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar size="sm" className="w-7 h-7 shrink-0 mt-0.5">
                  <Avatar.Image
                    src={activity.user.imageUrl}
                    alt={activity.user.name}
                  />
                  <Avatar.Fallback>
                    {activity.user.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    {activity.action}
                  </p>
                  {activity.details && (
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {activity.details}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatRelativeDate(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top Projects ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">
            Top Projects
          </h3>
          <Link
            href="/projects"
            className="text-blue-500 text-xs hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {mockProjects
            .concat([
              {
                id: "p4",
                name: "Marketing Website",
                key: "MKT",
                status: "ACTIVE",
                createdAt: "2025-01-01T00:00:00Z",
                issueCount: 20,
                completedCount: 16,
              },
            ])
            .map((project, idx) => {
              const pct =
                project.issueCount && project.completedCount
                  ? Math.round(
                      (project.completedCount / project.issueCount) * 100,
                    )
                  : 0;
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg ${projectIconColors[idx % projectIconColors.length]}`}
                  >
                    {projectIcons[idx % projectIcons.length]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 truncate">
                      {project.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <ProgressBar size="sm" value={pct} className="flex-1">
                        <ProgressBar.Track className="bg-gray-100">
                          <ProgressBar.Fill className="bg-blue-500" />
                        </ProgressBar.Track>
                      </ProgressBar>
                      <span className="text-xs text-gray-400 shrink-0">
                        {pct}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
