"use client";

import { analyticsDoraMetrics, analyticsDoraTrend } from "@/lib/mock-data";
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

const statusStyles: Record<string, string> = {
  Good: "bg-emerald-50 text-emerald-600",
  Warn: "bg-amber-50 text-amber-600",
  Critical: "bg-red-50 text-red-600",
};

export function DoraTab() {
  return (
    <div className="flex-1 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsDoraMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 font-medium">
                {metric.label}
              </p>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  statusStyles[metric.status]
                }`}
              >
                {metric.status}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {metric.value}
            </p>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-gray-400">Target: {metric.target}</span>
              <span
                className={`font-semibold ${
                  metric.change >= 0 ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {metric.change >= 0 ? "+" : ""}
                {metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">
            DORA Trend Overview
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
            Last 5 months
          </span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={analyticsDoraTrend}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
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
              dataKey="deploys"
              name="Deployments"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="leadTime"
              name="Lead Time (days)"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3, fill: "#22c55e" }}
            />
            <Line
              type="monotone"
              dataKey="failureRate"
              name="Failure Rate (%)"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3, fill: "#f59e0b" }}
            />
            <Line
              type="monotone"
              dataKey="mttr"
              name="MTTR (hrs)"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Target Comparison
        </h2>
        <div className="space-y-3">
          {analyticsDoraMetrics.map((metric) => (
            <div key={metric.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {metric.label}
                </p>
                <p className="text-xs text-gray-400">Target: {metric.target}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {metric.value}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    statusStyles[metric.status]
                  }`}
                >
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
