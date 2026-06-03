"use client";

import { StatsCard } from "@/components/shared/stats-card";
import {
  analyticsIssueAging,
  analyticsIssueStats,
  analyticsIssueTriage,
  analyticsPriorityBreakdown,
  analyticsSlaBreaches,
  analyticsSlaSummary,
  analyticsStatusBreakdown,
} from "@/lib/mock-data";
import type { AnalyticsIconKey } from "@/types";
import type { ElementType } from "react";
import {
  MdBugReport,
  MdInsertDriveFile,
  MdOutlineTimer,
  MdWarning,
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
  completedIssues: MdInsertDriveFile,
  inProgress: MdInsertDriveFile,
  bugIssues: MdBugReport,
  activeMembers: MdInsertDriveFile,
  projects: MdInsertDriveFile,
  velocity: MdInsertDriveFile,
  onTrack: MdInsertDriveFile,
  atRisk: MdInsertDriveFile,
  overdue: MdWarning,
  cycleTime: MdOutlineTimer,
  focus: MdInsertDriveFile,
  throughput: MdInsertDriveFile,
};

const totalStatus = analyticsStatusBreakdown.reduce(
  (sum, item) => sum + item.value,
  0,
);

function DonutCenter() {
  return (
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
      <tspan x="50%" dy="-8" fontSize="24" fontWeight="700" fill="#111827">
        {totalStatus}
      </tspan>
      <tspan x="50%" dy="20" fontSize="11" fill="#6b7280">
        Total
      </tspan>
    </text>
  );
}

export function IssuesTab() {
  return (
    <div className="flex-1 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsIssueStats.map((stat) => {
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
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={analyticsStatusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={68}
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

        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Issues by Priority
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              Current mix
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
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
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
                {analyticsPriorityBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Issue Aging</h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
              Open issues
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={analyticsIssueAging}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f3f4f6"
                vertical={false}
              />
              <XAxis
                dataKey="bucket"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">SLA Summary</h2>
            <span className="text-xs text-gray-400">Last 30 days</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Within SLA</span>
              <span className="text-sm font-semibold text-emerald-600">
                {analyticsSlaSummary.withinSla}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">At Risk</span>
              <span className="text-sm font-semibold text-amber-600">
                {analyticsSlaSummary.atRisk}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Breached</span>
              <span className="text-sm font-semibold text-red-600">
                {analyticsSlaSummary.breached}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-3 space-y-2">
            {analyticsSlaBreaches.map((item) => (
              <div key={item.id} className="text-xs text-gray-600">
                <span className="font-semibold text-gray-800">
                  {item.issueKey}
                </span>{" "}
                {item.title} ({item.daysOver}d over)
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Triage Trend</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
            Weekly
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={analyticsIssueTriage}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
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
              dataKey="triaged"
              name="Triaged"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="created"
              name="Created"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4, fill: "#22c55e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
