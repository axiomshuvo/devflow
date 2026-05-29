"use client";

import {
  SaveFooter,
  SectionHeader,
  SelectControl,
  SettingRow,
  Toggle,
} from "@/components/settings/setting-primitives";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  MdAccessTime,
  MdCalendarToday,
  MdChevronRight,
  MdContentCopy,
  MdDarkMode,
  MdFlashOn,
  MdFormatListBulleted,
  MdGridView,
  MdImportExport,
  MdLanguage,
  MdLink,
  MdOpenInNew,
  MdSettings,
  MdStorage,
  MdTune,
  MdUnfoldLess,
  MdViewList,
} from "react-icons/md";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOP_TABS = [
  "General",
  "Profile",
  "Workspace",
  "Notifications",
  "Integrations",
  "Security",
  "Billing",
];

const SUB_NAV: { label: string; icon: React.ElementType }[] = [
  { label: "General Settings", icon: MdSettings },
  { label: "Date & Time", icon: MdAccessTime },
  { label: "Localization", icon: MdLanguage },
  { label: "Default Views", icon: MdViewList },
  { label: "Custom Fields", icon: MdTune },
  { label: "Automation", icon: MdFlashOn },
  { label: "Data Management", icon: MdStorage },
  { label: "Import / Export", icon: MdImportExport },
];

const LANGUAGES = [
  "English (US)",
  "English (UK)",
  "Spanish",
  "French",
  "German",
  "Bengali",
];

const TIMEZONES = [
  "(GMT+6:00) Dhaka, Bangladesh",
  "(GMT+0:00) UTC",
  "(GMT-5:00) New York, USA",
  "(GMT+5:30) Mumbai, India",
  "(GMT+8:00) Singapore",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [activeSubNav, setActiveSubNav] = useState("General Settings");

  const [workspaceName, setWorkspaceName] = useState("DevFlow");
  const [language, setLanguage] = useState("English (US)");
  const [timezone, setTimezone] = useState("(GMT+6:00) Dhaka, Bangladesh");
  const [weekStart, setWeekStart] = useState("Monday");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && TOP_TABS.includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-auto">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 pt-5 pb-0 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="flex items-center gap-1 mt-0.5 mb-3 text-sm text-gray-500">
          <Link
            href="/dashboard"
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <MdChevronRight className="text-gray-400 text-base" />
          <span className="text-gray-700">Settings</span>
        </div>

        {/* Top tabs */}
        <div className="flex gap-0">
          {TOP_TABS.map((tab) => (
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
      {activeTab !== "General" ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">{activeTab} — coming soon</p>
        </div>
      ) : (
        <div className="flex gap-5 p-6 items-start">
          {/* Left white card: sub-nav + content */}
          <div className="flex flex-1 min-w-0 bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Sub-nav */}
            <nav className="w-52 shrink-0 border-r border-gray-100 py-2">
              {SUB_NAV.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveSubNav(label)}
                  className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium transition-colors text-left ${
                    activeSubNav === label
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="text-base shrink-0" />
                  {label}
                </button>
              ))}
            </nav>

            {/* Center content */}
            {activeSubNav !== "General Settings" ? (
              <div className="flex-1 flex items-center justify-center p-12">
                <p className="text-gray-400 text-sm">
                  {activeSubNav} — coming soon
                </p>
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <SectionHeader
                  title="General Settings"
                  description="Manage your workspace general preferences."
                />

                <div className="divide-y divide-gray-100">
                  {/* Workspace Name */}
                  <SettingRow
                    icon={MdGridView}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                    label="Workspace Name"
                    desc="This name will be visible to all workspace members."
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                      >
                        Save
                      </button>
                    </div>
                  </SettingRow>

                  {/* Workspace URL */}
                  <SettingRow
                    icon={MdLink}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                    label="Workspace URL"
                    desc="This is your unique workspace URL."
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value="https://devflow.app"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 focus:outline-none"
                      />
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
                      >
                        <MdContentCopy className="text-base" />
                        Copy
                      </button>
                    </div>
                  </SettingRow>

                  {/* Default Language */}
                  <SettingRow
                    icon={MdLanguage}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                    label="Default Language"
                    desc="Choose the default language for your workspace."
                  >
                    <SelectControl
                      value={language}
                      onChange={setLanguage}
                      options={LANGUAGES}
                    />
                  </SettingRow>

                  {/* Default Timezone */}
                  <SettingRow
                    icon={MdAccessTime}
                    iconBg="bg-amber-100"
                    iconColor="text-amber-600"
                    label="Default Timezone"
                    desc="Choose the timezone for date and time."
                  >
                    <SelectControl
                      value={timezone}
                      onChange={setTimezone}
                      options={TIMEZONES}
                    />
                  </SettingRow>

                  {/* Week Starts On */}
                  <SettingRow
                    icon={MdCalendarToday}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                    label="Week Starts On"
                    desc="Choose the first day of the week."
                  >
                    <SelectControl
                      value={weekStart}
                      onChange={setWeekStart}
                      options={["Monday", "Sunday", "Saturday"]}
                    />
                  </SettingRow>

                  {/* Items Per Page */}
                  <SettingRow
                    icon={MdFormatListBulleted}
                    iconBg="bg-violet-100"
                    iconColor="text-violet-600"
                    label="Items Per Page"
                    desc="Choose how many items to display per page."
                  >
                    <SelectControl
                      value={itemsPerPage}
                      onChange={setItemsPerPage}
                      options={["10", "25", "50", "100"]}
                    />
                  </SettingRow>

                  {/* Enable Dark Mode */}
                  <SettingRow
                    icon={MdDarkMode}
                    iconBg="bg-slate-100"
                    iconColor="text-slate-600"
                    label="Enable Dark Mode"
                    desc="Switch between light and dark theme."
                  >
                    <Toggle checked={darkMode} onChange={setDarkMode} />
                  </SettingRow>

                  {/* Compact Mode */}
                  <SettingRow
                    icon={MdUnfoldLess}
                    iconBg="bg-amber-100"
                    iconColor="text-amber-600"
                    label="Compact Mode"
                    desc="Show more content in less space."
                  >
                    <Toggle checked={compactMode} onChange={setCompactMode} />
                  </SettingRow>

                  {/* Enable Live Updates */}
                  <SettingRow
                    icon={MdFlashOn}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                    label="Enable Live Updates"
                    desc="Get real-time updates for issues and tasks."
                  >
                    <Toggle checked={liveUpdates} onChange={setLiveUpdates} />
                  </SettingRow>
                </div>

                <SaveFooter onSave={() => {}} />
              </div>
            )}
          </div>

          {/* ── Right panel ── */}
          <div className="w-72 shrink-0 flex flex-col gap-4">
            {/* Your Account */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Your Account
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-base font-bold shrink-0">
                  MI
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    Munna Islam
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    munna.islam@devflow.com
                  </p>
                  <span className="inline-flex mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full">
                    Admin
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center justify-between w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Manage Account
                <MdOpenInNew className="text-sm text-gray-400" />
              </button>
            </div>

            {/* Workspace Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Workspace Summary
              </h3>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Plan</span>
                  <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-[10px] font-bold rounded-full">
                    Pro
                  </span>
                </div>
                {[
                  { label: "Members", value: "24" },
                  { label: "Projects", value: "12" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs font-semibold text-gray-800">
                      {value}
                    </span>
                  </div>
                ))}
                {/* Storage bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Storage Used</span>
                    <span className="text-xs font-semibold text-gray-800">
                      2.4 GB / 10 GB
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5 text-right">
                    24%
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Billing Cycle</span>
                  <span className="text-xs font-semibold text-gray-800">
                    May 25, 2024
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center justify-between w-full mt-3 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Manage Billing
                <MdOpenInNew className="text-sm text-gray-400" />
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 p-4">
              <h3 className="text-sm font-semibold text-red-600 mb-3">
                Danger Zone
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold text-red-700 mb-0.5">
                    Transfer Workspace
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Transfer workspace ownership to another member.
                  </p>
                  <button
                    type="button"
                    className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
                  >
                    Transfer
                  </button>
                </div>
                <div className="border-t border-red-100" />
                <div>
                  <p className="text-xs font-semibold text-red-700 mb-0.5">
                    Delete Workspace
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Permanently delete this workspace and all its data. This
                    action cannot be undone.
                  </p>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
