"use client";

import {
  analyticsReportExports,
  analyticsReportLibrary,
  analyticsReportSchedules,
} from "@/lib/mock-data";
import { MdCalendarToday, MdDownload, MdInsertDriveFile } from "react-icons/md";

export function ReportsTab() {
  return (
    <div className="flex-1 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Report Library
            </h2>
            <button
              type="button"
              className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Create report
            </button>
          </div>
          {analyticsReportLibrary.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center text-sm text-gray-500">
              No saved reports yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsReportLibrary.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {report.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {report.description}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                      {report.category}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span>Last run: {report.lastRun}</span>
                    <span>{report.format}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <MdInsertDriveFile className="text-sm" />
                    {report.owner}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Scheduled Reports
              </h2>
              <MdCalendarToday className="text-gray-400" />
            </div>
            {analyticsReportSchedules.length === 0 ? (
              <p className="text-sm text-gray-500">No schedules configured.</p>
            ) : (
              <div className="space-y-3">
                {analyticsReportSchedules.map((schedule) => (
                  <div key={schedule.id} className="space-y-1">
                    <p className="text-sm font-medium text-gray-800">
                      {schedule.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{schedule.frequency}</span>
                      <span>{schedule.recipients} recipients</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Next: {schedule.nextRun}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Recent Exports
              </h2>
              <MdDownload className="text-gray-400" />
            </div>
            {analyticsReportExports.length === 0 ? (
              <p className="text-sm text-gray-500">No exports generated yet.</p>
            ) : (
              <div className="space-y-3">
                {analyticsReportExports.map((exportItem) => (
                  <div
                    key={exportItem.id}
                    className="flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {exportItem.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {exportItem.format} | {exportItem.size}
                      </p>
                      <p className="text-xs text-gray-400">
                        {exportItem.createdAt}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                        exportItem.status === "Complete"
                          ? "bg-emerald-50 text-emerald-600"
                          : exportItem.status === "Failed"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {exportItem.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
