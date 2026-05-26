"use client";

import {
  mockActivity,
  mockProjects,
  mockUsers,
} from "@/lib/mock-data";
import { formatDateShort, formatRelativeDate } from "@/lib/utils";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import {
  MdAdd,
  MdArrowForward,
  MdAssignment,
  MdCalendarToday,
  MdCheckCircleOutline,
  MdEdit,
  MdErrorOutline,
  MdFolder,
  MdGroup,
  MdHourglassBottom,
  MdMoreVert,
  MdWarningAmber,
} from "react-icons/md";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Static chart data (represents fuller project data) ──────────────────────

const donutData = [
  { name: "Backlog", value: 15, color: "#3b82f6" },
  { name: "To Do", value: 30, color: "#f59e0b" },
  { name: "In Progress", value: 28, color: "#8b5cf6" },
  { name: "In Review", value: 15, color: "#06b6d4" },
  { name: "Done", value: 32, color: "#10b981" },
];

const progressOverTime = [
  { date: "Apr 20", value: 20 },
  { date: "Apr 27", value: 32 },
  { date: "May 4", value: 45 },
  { date: "May 11", value: 55 },
  { date: "May 18", value: 63 },
  { date: "May 25", value: 72 },
  { date: "May 31", value: 88 },
];

const TOTAL = 120;

// ─── Stat card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  subColor,
  icon,
  iconBg,
  link,
}: {
  label: string;
  value: number | string;
  sub?: string;
  subColor?: string;
  icon: React.ReactNode;
  iconBg: string;
  link?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4 min-w-0">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {value}
        </p>
        {link ? (
          <Link
            href={link}
            className="text-xs text-blue-500 hover:underline flex items-center gap-0.5 mt-0.5"
          >
            View all issues <MdArrowForward className="text-sm" />
          </Link>
        ) : sub ? (
          <p className={`text-xs mt-0.5 font-medium ${subColor}`}>{sub}</p>
        ) : null}
      </div>
    </div>
  );
}

// ─── Project status badge ─────────────────────────────────────────────────────

function ProjectStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    ON_HOLD: "bg-amber-100 text-amber-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    ARCHIVED: "bg-gray-100 text-gray-600",
  };
  const labels: Record<string, string> = {
    ACTIVE: "In Progress",
    ON_HOLD: "On Hold",
    COMPLETED: "Completed",
    ARCHIVED: "Archived",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {labels[status] ?? status}
    </span>
  );
}

// ─── Tab bar ─────────────────────────────────────────────────────────────────

const TABS = ["Overview", "Issues", "Milestones", "Team", "Files", "Activity"];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const [activeTab, setActiveTab] = useState("Overview");

  const project =
    mockProjects.find((p) => p.id === projectId) ?? mockProjects[0];
  if (!project) notFound();

  const members = project.members ?? mockUsers.slice(0, 4);

  return (
    <div className="p-6 space-y-5">
      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/projects"
          className="hover:text-blue-600 transition-colors"
        >
          Projects
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-800 font-medium">{project.name}</span>
      </nav>

      {/* ── Project header ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left: icon + info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-purple-500 flex items-center justify-center shrink-0 text-white text-3xl">
              🛍️
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  {project.name}
                </h1>
                <ProjectStatusBadge status={project.status} />
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {project.description}
              </p>
              <div className="flex items-center gap-5 mt-2 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <MdFolder className="text-sm" />
                  Key: {project.key}
                </span>
                {project.createdAt && (
                  <span className="flex items-center gap-1.5">
                    <MdCalendarToday className="text-sm" />
                    Created: {formatDateShort(project.createdAt)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <MdGroup className="text-sm" />
                  Members: {members.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Link href={`/issues/create?projectId=${project.id}`}>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  <MdAdd className="text-base" />
                  Create Issue
                </Button>
              </Link>
              <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <MdMoreVert className="text-lg" />
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-blue-300 transition-colors mt-1">
              <MdEdit className="text-sm" />
              Edit Project
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-5 border-b border-gray-200 -mx-6 px-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard
          label="Total Issues"
          value={TOTAL}
          icon={<MdAssignment className="text-blue-600 text-xl" />}
          iconBg="bg-blue-50"
          link={`/issues?projectId=${project.id}`}
        />
        <StatCard
          label="Open Issues"
          value={45}
          sub="37.5% of total"
          subColor="text-orange-500"
          icon={<MdErrorOutline className="text-orange-500 text-xl" />}
          iconBg="bg-orange-50"
        />
        <StatCard
          label="In Progress"
          value={28}
          sub="23.3% of total"
          subColor="text-amber-500"
          icon={<MdHourglassBottom className="text-amber-500 text-xl" />}
          iconBg="bg-amber-50"
        />
        <StatCard
          label="Completed"
          value={47}
          sub="39.2% of total"
          subColor="text-emerald-500"
          icon={<MdCheckCircleOutline className="text-emerald-500 text-xl" />}
          iconBg="bg-emerald-50"
        />
        <StatCard
          label="Overdue"
          value={5}
          sub="4.2% of total"
          subColor="text-red-500"
          icon={<MdWarningAmber className="text-red-500 text-xl" />}
          iconBg="bg-red-50"
        />
      </div>

      {/* ── Charts row ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Donut */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Issue Status Distribution
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
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
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-gray-900">{TOTAL}</p>
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
                    {item.value} ({Math.round((item.value / TOTAL) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Area chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Progress Over Time
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg cursor-default">
              This Month ▾
            </span>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart
              data={progressOverTime}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                }}
                formatter={(v) => [`${v}%`, "Progress"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#areaGrad)"
                dot={{ fill: "#3b82f6", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom 3-col ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Project Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Project Details
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Description
              </p>
              <p className="text-gray-700 leading-relaxed text-xs">
                {project.description}
              </p>
            </div>
            {project.startDate && (
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Start Date</p>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <MdCalendarToday className="text-sm text-gray-400" />
                  <span>{formatDateShort(project.startDate)}</span>
                </div>
              </div>
            )}
            {project.targetDate && (
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Target Date</p>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <MdCalendarToday className="text-sm text-gray-400" />
                  <span>{formatDateShort(project.targetDate)}</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Priority</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600">
                High
              </span>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Labels</p>
              <div className="flex flex-wrap gap-1.5">
                {["frontend", "backend", "ecommerce"].map((label) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {label}
                  </span>
                ))}
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  +2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Team Members ({members.length})
            </h3>
            <Link
              href={`/team`}
              className="text-blue-500 text-xs hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {members.map((member, idx) => {
              const roleLabel = idx === 0 ? "Owner" : "Member";
              const roleCls =
                idx === 0
                  ? "bg-purple-50 text-purple-600"
                  : "bg-green-50 text-green-600";
              const roleFn =
                idx === 0
                  ? "Project Owner"
                  : member.role.charAt(0) + member.role.slice(1).toLowerCase();
              return (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar size="sm" className="w-9 h-9 shrink-0">
                    <Avatar.Image src={member.imageUrl} alt={member.name} />
                    <Avatar.Fallback>{member.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{roleFn}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${roleCls}`}
                  >
                    {roleLabel}
                  </span>
                </div>
              );
            })}
          </div>
          {members.length > 4 && (
            <p className="mt-3 text-xs text-gray-400">
              +{members.length - 4} more members
            </p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Recent Activity
            </h3>
            <Link
              href="/activity"
              className="text-blue-500 text-xs hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {mockActivity.slice(0, 5).map((activity, idx) => {
              const dotColors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-amber-500",
                "bg-purple-500",
                "bg-indigo-500",
              ];
              return (
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
                    <p className="text-xs text-gray-700 leading-snug">
                      <span className="font-semibold">
                        {activity.user.name}
                      </span>{" "}
                      {activity.action}
                      {activity.details && (
                        <>
                          {" "}
                          &ldquo;
                          <span className="font-medium text-gray-800">
                            {activity.details.split(":").pop()?.trim() ??
                              activity.details}
                          </span>
                          &rdquo;
                        </>
                      )}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {formatRelativeDate(activity.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${dotColors[idx % dotColors.length]}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
