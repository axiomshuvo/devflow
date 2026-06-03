"use client";

import { StatsCard } from "@/components/shared/stats-card";
import {
  analyticsDailyIssues,
  analyticsOverviewStats,
  analyticsPriorityBreakdown,
  analyticsProjects,
  analyticsSprintProgress,
  analyticsStatusBreakdown,
  analyticsTeamWorkload,
} from "@/lib/mock-data";
import type { AnalyticsIconKey } from "@/types";
import type { ElementType } from "react";
import {
  MdBugReport,
  MdFlashOn,
  MdGroup,
  MdInsertDriveFile,
  MdPendingActions,
  MdTaskAlt,
  MdTrendingUp,
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

const iconMap: Record<AnalyticsIconKey, ElementType> = {
  totalIssues: MdInsertDriveFile,
  completedIssues: MdTaskAlt,
  inProgress: MdPendingActions,
  bugIssues: MdBugReport,
  activeMembers: MdGroup,
  projects: MdInsertDriveFile,
  velocity: MdTrendingUp,
  onTrack: MdTaskAlt,
  atRisk: MdFlashOn,
  overdue: MdPendingActions,
  cycleTime: MdTrendingUp,
  focus: MdTrendingUp,
  throughput: MdTrendingUp,
};

const totalStatus = analyticsStatusBreakdown.reduce(
  (sum, item) => sum + item.value,
  0,
);
const totalPriority = analyticsPriorityBreakdown.reduce(
  (sum, item) => sum + item.value,
  0,
);

function DonutCenter() {
  return (
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
      <tspan x="50%" dy="-8" fontSize="26" fontWeight="700" fill="#111827">
        {totalStatus}
      </tspan>
      <tspan x="50%" dy="22" fontSize="12" fill="#6b7280">
        Total
      </tspan>
    </text>
  );
}

export function OverviewTab() {
  const maxInProgress = Math.max(
    ...analyticsTeamWorkload.map((member) => member.inProgress),
  );
  const maxCompleted = Math.max(
    ...analyticsTeamWorkload.map((member) => member.completed),
  );

  return (
    <div className="flex-1 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {analyticsOverviewStats.map((stat) => {
          const Icon = iconMap[stat.iconKey] ?? MdInsertDriveFile;
          return (
            <StatsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              changeLabel={stat.changeLabel}
              icon={<Icon className={`text-xl ${stat.iconColor}`} />}
              iconBg={stat.iconBg}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Issues Overview
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
              Daily
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={analyticsDailyIssues}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="label"
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
                dataKey="created"
                name="Created"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="closed"
                name="Closed"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4, fill: "#22c55e" }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                name="Resolved"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#8b5cf6" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">
              Issues by Status
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              Total: {totalStatus}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={analyticsStatusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {analyticsStatusBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <DonutCenter />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {analyticsStatusBreakdown.map((item) => {
                const pct = ((item.value / totalStatus) * 100).toFixed(1);
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-2"
                  >
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Top Active Projects
            </h2>
            <button
              type="button"
              className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2 px-1">
            <span className="text-xs text-gray-400 font-medium col-span-1">
              Project
            </span>
            <span className="text-xs text-gray-400 font-medium text-right">
              Open
            </span>
            <span className="text-xs text-gray-400 font-medium text-right">
              Progress
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {analyticsProjects.slice(0, 5).map((proj) => (
              <div key={proj.id} className="flex items-center gap-3">
                <span className="text-base w-5 shrink-0">{proj.icon}</span>
                <span className="text-sm text-gray-700 flex-1 truncate min-w-0">
                  {proj.name}
                </span>
                <span className="text-sm text-gray-600 font-medium w-8 text-right shrink-0">
                  {proj.openIssues}
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
          <div className="flex items-center mb-2 px-1">
            <span className="text-xs text-gray-400 font-medium flex-1">
              Member
            </span>
            <span className="text-xs text-gray-400 font-medium w-24 text-center">
              In Progress
            </span>
            <span className="text-xs text-gray-400 font-medium w-20 text-center">
              Completed
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {analyticsTeamWorkload.map((member) => (
              <div key={member.id} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-white text-[10px] font-semibold shrink-0`}
                >
                  {member.initials}
                </div>
                <span className="text-xs text-gray-700 flex-1 truncate">
                  {member.name}
                </span>
                <div className="flex items-center gap-1 w-24">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{
                        width: `${(member.inProgress / maxInProgress) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-4 text-right shrink-0">
                    {member.inProgress}
                  </span>
                </div>
                <div className="flex items-center gap-1 w-20">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{
                        width: `${(member.completed / maxCompleted) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-4 text-right shrink-0">
                    {member.completed}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Issue Breakdown by Priority
            </h2>
            <span className="text-xs text-gray-400 font-medium shrink-0">
              Total: {totalPriority}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={analyticsPriorityBreakdown}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f3f4f6"
                vertical={false}
              />
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
                {analyticsPriorityBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Sprint Progress
        </h2>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="shrink-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-900">
                {analyticsSprintProgress.sprint}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
                {analyticsSprintProgress.status}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {analyticsSprintProgress.dateRange}
            </p>
          </div>

          <div className="flex-1 min-w-52">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-sm font-semibold text-gray-700 shrink-0">
                Progress
              </span>
              <span className="text-xl font-bold text-gray-900 shrink-0">
                {analyticsSprintProgress.progress}%
              </span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${analyticsSprintProgress.progress}%` }}
              />
            </div>
          </div>

          <div className="shrink-0 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Completed</p>
            <p className="text-sm font-semibold text-gray-800">
              {analyticsSprintProgress.completed}
            </p>
          </div>

          <div className="shrink-0 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Days Left</p>
            <p className="text-lg font-bold text-blue-600">
              {analyticsSprintProgress.daysLeft}
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Sprint
          </button>
        </div>
      </div>
    </div>
  );
}
