"use client";

import { DoraTab } from "@/components/analytics/dora-tab";
import { IssuesTab } from "@/components/analytics/issues-tab";
import { OverviewTab } from "@/components/analytics/overview-tab";
import { ProjectsTab } from "@/components/analytics/projects-tab";
import { ReportsTab } from "@/components/analytics/reports-tab";
import { TeamTab } from "@/components/analytics/team-tab";
import { useState } from "react";
import {
  MdCalendarToday,
  MdDownload,
  MdExpandMore,
  MdFilterList,
} from "react-icons/md";

const TABS = [
  "Overview",
  "Projects",
  "Issues",
  "Team",
  "Reports",
  "DORA Metrics",
];

type TabKey = (typeof TABS)[number];

export function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-auto">
      <div className="px-6 pt-6 pb-0 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Track your team&apos;s progress and performance
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MdCalendarToday className="text-gray-400 text-base" />
              May 14 - May 20, 2024
              <MdExpandMore className="text-gray-400 text-base" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MdFilterList className="text-gray-500 text-base" />
              Filters
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MdDownload className="text-gray-500 text-base" />
              Export
            </button>
          </div>
        </div>

        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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

      {activeTab === "Overview" ? (
        <OverviewTab />
      ) : activeTab === "Projects" ? (
        <ProjectsTab />
      ) : activeTab === "Issues" ? (
        <IssuesTab />
      ) : activeTab === "Team" ? (
        <TeamTab />
      ) : activeTab === "Reports" ? (
        <ReportsTab />
      ) : (
        <DoraTab />
      )}
    </div>
  );
}
