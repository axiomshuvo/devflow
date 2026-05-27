"use client";

import { mockProjects, mockUsers } from "@/lib/mock-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import {
  MdCalendarToday,
  MdChevronRight,
  MdDateRange,
  MdFlag,
  MdFolder,
  MdGpsFixed,
  MdGridOn,
  MdInfoOutline,
  MdLock,
  MdSubject,
  MdUpload,
} from "react-icons/md";

const TABS = [
  "General",
  "Access",
  "Issue Types",
  "Workflows",
  "Labels",
  "Custom Fields",
  "Automation",
  "Webhooks",
];

const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Backend Services",
  "Data Science",
  "DevOps",
  "Design",
];

export default function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const project = mockProjects.find((p) => p.id === projectId);
  if (!project) notFound();

  const [activeTab, setActiveTab] = useState("General");

  // Form state
  const [name, setName] = useState(project.name);
  const [key, setKey] = useState(project.key);
  const [description, setDescription] = useState(project.description);
  const [category, setCategory] = useState("Web Development");
  const [lead, setLead] = useState(mockUsers[1].id); // Karim Hossain
  const [startDate, setStartDate] = useState("Apr 10, 2024");
  const [endDate, setEndDate] = useState("Dec 31, 2024");
  const [goal, setGoal] = useState(
    "Deliver a secure, scalable and user-friendly e-commerce platform.",
  );

  const leadUser = mockUsers.find((u) => u.id === lead) ?? mockUsers[1];

  const PROJECT_AVATAR_ICONS: Record<string, string> = {
    p1: "🛍️",
    p2: "💻",
    p3: "📱",
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-auto">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Project Settings
            </h1>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <Link
                href="/projects"
                className="hover:text-blue-600 transition-colors"
              >
                Projects
              </Link>
              <MdChevronRight className="text-base text-gray-400" />
              <Link
                href={`/projects/${projectId}`}
                className="hover:text-blue-600 transition-colors"
              >
                {project.name}
              </Link>
              <MdChevronRight className="text-base text-gray-400" />
              <span className="text-gray-700">Settings</span>
            </div>
          </div>
          <Link
            href={`/projects/${projectId}`}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <MdChevronRight className="rotate-180 text-base" />
            Back to Project
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
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
          {/* ── Left: form ── */}
          <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                General Settings
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your project details and preferences.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Project Name */}
              <SettingRow
                icon={MdGridOn}
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
                label="Project Name"
                desc="The name of your project."
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </SettingRow>

              {/* Project Key */}
              <SettingRow
                icon={MdInfoOutline}
                iconBg="bg-green-100"
                iconColor="text-green-600"
                label="Project Key"
                desc="A short key used to identify this project."
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value.toUpperCase())}
                    maxLength={10}
                    className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-xs text-gray-400">
                    Used in issue keys: {key}-101
                  </span>
                </div>
              </SettingRow>

              {/* Project Description */}
              <SettingRow
                icon={MdSubject}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
                label="Project Description"
                desc="A brief description of your project."
              >
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </SettingRow>

              {/* Project Category */}
              <SettingRow
                icon={MdFolder}
                iconBg="bg-amber-100"
                iconColor="text-amber-600"
                label="Project Category"
                desc="Choose a category for your project."
              >
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    ▾
                  </span>
                </div>
              </SettingRow>

              {/* Project Lead */}
              <SettingRow
                icon={MdFlag}
                iconBg="bg-indigo-100"
                iconColor="text-indigo-600"
                label="Project Lead"
                desc="The lead person for this project."
              >
                <div className="relative">
                  <div className="flex items-center">
                    <div
                      className={`absolute left-3 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-[9px] font-bold pointer-events-none z-10`}
                    >
                      {leadUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <select
                      value={lead}
                      onChange={(e) => setLead(e.target.value)}
                      className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {mockUsers.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      ▾
                    </span>
                  </div>
                </div>
              </SettingRow>

              {/* Project Start Date */}
              <SettingRow
                icon={MdCalendarToday}
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
                label="Project Start Date"
                desc="When the project started."
              >
                <div className="relative flex items-center">
                  <MdCalendarToday className="absolute left-3 text-gray-400 text-base pointer-events-none" />
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </SettingRow>

              {/* Project End Date */}
              <SettingRow
                icon={MdDateRange}
                iconBg="bg-green-100"
                iconColor="text-green-600"
                label="Project End Date"
                desc="Estimated completion date."
              >
                <div className="relative flex items-center">
                  <MdCalendarToday className="absolute left-3 text-gray-400 text-base pointer-events-none" />
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setEndDate("")}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </SettingRow>

              {/* Project Goal */}
              <SettingRow
                icon={MdGpsFixed}
                iconBg="bg-orange-100"
                iconColor="text-orange-500"
                label="Project Goal"
                desc="What do you want to achieve with this project?"
              >
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </SettingRow>
            </div>

            {/* Form footer */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
              <button
                type="button"
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Archive Project
              </button>
              <button
                type="button"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="w-72 shrink-0 flex flex-col gap-4">
            {/* Project Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Project Overview
              </h3>
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl shrink-0">
                  {PROJECT_AVATAR_ICONS[projectId] ?? "📁"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {project.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                </div>
              </div>

              {/* Meta rows */}
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Created On", value: "Apr 10, 2024" },
                  { label: "Created By", value: "Munna Islam", avatar: true },
                  { label: "Project Type", value: "Software" },
                  {
                    label: "Visibility",
                    value: "Private",
                    icon: <MdLock className="text-gray-400 text-sm" />,
                  },
                  {
                    label: "Key Format",
                    value: `${project.key}-001, ${project.key}-002, ...`,
                  },
                ].map(({ label, value, avatar, icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-xs text-gray-500">{label}</span>
                    <div className="flex items-center gap-1.5">
                      {avatar && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                          MI
                        </div>
                      )}
                      {icon}
                      <span className="text-xs font-medium text-gray-800 text-right max-w-32 truncate">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Avatar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Project Avatar
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-purple-100 border-2 border-dashed border-purple-200 flex items-center justify-center text-3xl">
                  {PROJECT_AVATAR_ICONS[projectId] ?? "📁"}
                </div>
                <div>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <MdUpload className="text-base text-gray-500" />
                    Change Avatar
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    PNG or JPG. Max size 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 p-4">
              <h3 className="text-sm font-semibold text-red-600 mb-3">
                Danger Zone
              </h3>
              <div className="flex flex-col gap-4">
                {/* Archive */}
                <div>
                  <p className="text-xs font-semibold text-red-700 mb-0.5">
                    Archive Project
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Archive this project and make it read-only for all members.
                  </p>
                  <button
                    type="button"
                    className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
                  >
                    Archive
                  </button>
                </div>
                <div className="border-t border-red-100" />
                {/* Delete */}
                <div>
                  <p className="text-xs font-semibold text-red-700 mb-0.5">
                    Delete Project
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Permanently delete this project and all associated data.
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

// ─── Setting Row ──────────────────────────────────────────────────────────────

function SettingRow({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  desc,
  children,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5 px-6 py-5">
      {/* Icon + label */}
      <div className="flex items-start gap-3 w-64 shrink-0">
        <div
          className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0 mt-0.5`}
        >
          <Icon className={`text-lg ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
      </div>
      {/* Control */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

// Needs React for JSX in helper
import React from "react";
