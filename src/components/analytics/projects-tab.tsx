"use client";

import { StatsCard } from "@/components/shared/stats-card";
import {
  analyticsProjectRiskSummary,
  analyticsProjectStats,
  analyticsProjectVelocity,
  analyticsProjects,
} from "@/lib/mock-data";
import type { AnalyticsIconKey } from "@/types";
import type { ElementType } from "react";
import {
  MdCheckCircle,
  MdFolder,
  MdTrendingUp,
  MdWarning,
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
  totalIssues: MdFolder,
  completedIssues: MdCheckCircle,
  inProgress: MdTrendingUp,
  bugIssues: MdWarning,
  activeMembers: MdFolder,
  projects: MdFolder,
  velocity: MdTrendingUp,
  onTrack: MdCheckCircle,
  atRisk: MdWarning,
  overdue: MdWarning,
  cycleTime: MdTrendingUp,
  focus: MdTrendingUp,
  throughput: MdTrendingUp,
};

export function ProjectsTab() {
  return (
    <div className="flex-1 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsProjectStats.map((stat) => {
          const Icon = iconMap[stat.iconKey] ?? MdFolder;
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
              Project Velocity
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
              Last 5 sprints
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={analyticsProjectVelocity}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="sprint"
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
                dataKey="completed"
                name="Completed"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="scope"
                name="Scope"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4, fill: "#22c55e" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Health Snapshot
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              5 projects
            </span>
          </div>
          <div className="space-y-4">
            {analyticsProjectRiskSummary.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">
                      {item.label}
                    </span>
                    <span className={`font-semibold ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full ${
                        item.label === "On Track"
                          ? "bg-emerald-500"
                          : item.label === "At Risk"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${(item.value / 5) * 100}%` }}
                    />
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
            Project Progress
          </h2>
          <button
            type="button"
            className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View all projects
          </button>
        </div>
        <div className="grid grid-cols-6 gap-3 px-2 pb-2 text-xs text-gray-400 font-semibold">
          <span className="col-span-2">Project</span>
          <span className="text-right">Open</span>
          <span className="text-right">Completed</span>
          <span className="text-right">Velocity</span>
          <span className="text-right">Progress</span>
        </div>
        <div className="space-y-3">
          {analyticsProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-6 gap-3 px-2 py-2 rounded-lg hover:bg-gray-50"
            >
              <div className="col-span-2 flex items-center gap-2 min-w-0">
                <span className="text-base shrink-0">{project.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {project.name}
                  </p>
                  <p className="text-xs text-gray-400">{project.key}</p>
                </div>
              </div>
              <span className="text-sm text-gray-600 text-right">
                {project.openIssues}
              </span>
              <span className="text-sm text-gray-600 text-right">
                {project.completed}
              </span>
              <span className="text-sm text-gray-600 text-right">
                {project.velocity} pts
              </span>
              <div className="flex items-center justify-end gap-2">
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${project.barColor} rounded-full`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">
                  {project.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
