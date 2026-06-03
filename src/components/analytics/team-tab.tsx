"use client";

import { StatsCard } from "@/components/shared/stats-card";
import {
  analyticsTeamFocusTrend,
  analyticsTeamLeaderboard,
  analyticsTeamStats,
  analyticsTeamWorkload,
} from "@/lib/mock-data";
import type { AnalyticsIconKey } from "@/types";
import type { ElementType } from "react";
import {
  MdGroup,
  MdOutlineTimer,
  MdTrendingUp,
  MdWorkspaces,
} from "react-icons/md";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const iconMap: Record<AnalyticsIconKey, ElementType> = {
  totalIssues: MdGroup,
  completedIssues: MdGroup,
  inProgress: MdGroup,
  bugIssues: MdGroup,
  activeMembers: MdGroup,
  projects: MdWorkspaces,
  velocity: MdTrendingUp,
  onTrack: MdTrendingUp,
  atRisk: MdTrendingUp,
  overdue: MdGroup,
  cycleTime: MdOutlineTimer,
  focus: MdOutlineTimer,
  throughput: MdTrendingUp,
};

export function TeamTab() {
  const maxInProgress = Math.max(
    ...analyticsTeamWorkload.map((member) => member.inProgress),
  );
  const maxCompleted = Math.max(
    ...analyticsTeamWorkload.map((member) => member.completed),
  );
  const maxCompletedIssues = Math.max(
    ...analyticsTeamLeaderboard.map((member) => member.completed),
  );

  return (
    <div className="flex-1 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsTeamStats.map((stat) => {
          const Icon = iconMap[stat.iconKey] ?? MdGroup;
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Workload Distribution
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
              Active sprint
            </span>
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
              Velocity Leaderboard
            </h2>
            <button
              type="button"
              className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {analyticsTeamLeaderboard.map((member, index) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="w-6 text-xs font-semibold text-gray-400">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-400">{member.role}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        member.trend >= 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {member.trend >= 0 ? "+" : ""}
                      {member.trend}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${(member.completed / maxCompletedIssues) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {member.completed} issues
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Focus Time Trend
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
            Weekly
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={analyticsTeamFocusTrend}
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
              dataKey="focusHours"
              name="Focus Hours"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="meetingHours"
              name="Meeting Hours"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4, fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
