"use client";

import { useState } from "react";
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdCode,
  MdDownload,
  MdEdit,
  MdExpandMore,
  MdFilterList,
  MdLockReset,
  MdMoreVert,
  MdPersonAdd,
  MdPersonOff,
  MdSearch,
  MdShoppingBag,
  MdSmartphone,
  MdTrendingUp,
} from "react-icons/md";

// ─── Mock team members ───────────────────────────────────────────────────────

const ROLE_BADGES: Record<string, { label: string; className: string }> = {
  ADMIN: { label: "Admin", className: "bg-blue-100 text-blue-700" },
  DEVELOPER: { label: "Developer", className: "bg-sky-100 text-sky-700" },
  QA_ENGINEER: {
    label: "QA Engineer",
    className: "bg-emerald-100 text-emerald-700",
  },
  DESIGNER: { label: "Designer", className: "bg-purple-100 text-purple-700" },
  PRODUCT_MANAGER: {
    label: "Product Manager",
    className: "bg-amber-100 text-amber-700",
  },
  DEVOPS_ENGINEER: {
    label: "DevOps Engineer",
    className: "bg-slate-100 text-slate-700",
  },
  SUPPORT_ENGINEER: {
    label: "Support Engineer",
    className: "bg-pink-100 text-pink-700",
  },
};

const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; text: string }
> = {
  Active: { label: "Active", dot: "bg-green-500", text: "text-green-600" },
  Away: { label: "Away", dot: "bg-amber-500", text: "text-amber-600" },
  Offline: { label: "Offline", dot: "bg-gray-400", text: "text-gray-500" },
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  projects: number;
  status: string;
  isCurrentUser?: boolean;
  avatar: string;
  memberSince: string;
  localTime: string;
  timezone: string;
  performance: {
    issuesClosed: number;
    issuesClosedPct: number;
    tasksCompleted: number;
    tasksCompletedPct: number;
    comments: number;
    commentsPct: number;
    reviews: number;
    reviewsPct: number;
  };
  projectList: { name: string; icon: string; projectRole: string }[];
}

const MOCK_MEMBERS: TeamMember[] = [
  {
    id: "m1",
    name: "Munna Islam",
    email: "munna.islam@devflow.com",
    role: "ADMIN",
    team: "Platform",
    projects: 12,
    status: "Active",
    isCurrentUser: true,
    avatar: "MI",
    memberSince: "Jan 15, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 24,
      issuesClosedPct: 20,
      tasksCompleted: 18,
      tasksCompletedPct: 12,
      comments: 32,
      commentsPct: 15,
      reviews: 14,
      reviewsPct: 8,
    },
    projectList: [
      { name: "E-commerce Website", icon: "shop", projectRole: "Admin" },
      { name: "Mobile App", icon: "mobile", projectRole: "Admin" },
      { name: "DevFlow Platform", icon: "code", projectRole: "Owner" },
    ],
  },
  {
    id: "m2",
    name: "Karim Hossain",
    email: "karim.hossain@devflow.com",
    role: "DEVELOPER",
    team: "Frontend",
    projects: 8,
    status: "Active",
    avatar: "KH",
    memberSince: "Mar 10, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 18,
      issuesClosedPct: 15,
      tasksCompleted: 14,
      tasksCompletedPct: 10,
      comments: 22,
      commentsPct: 8,
      reviews: 9,
      reviewsPct: 5,
    },
    projectList: [
      { name: "E-commerce Website", icon: "shop", projectRole: "Developer" },
      { name: "DevFlow Platform", icon: "code", projectRole: "Developer" },
    ],
  },
  {
    id: "m3",
    name: "Rahim Ahmed",
    email: "rahim.ahmed@devflow.com",
    role: "QA_ENGINEER",
    team: "Quality Assurance",
    projects: 6,
    status: "Active",
    avatar: "RA",
    memberSince: "Feb 20, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 30,
      issuesClosedPct: 25,
      tasksCompleted: 20,
      tasksCompletedPct: 18,
      comments: 15,
      commentsPct: 5,
      reviews: 28,
      reviewsPct: 22,
    },
    projectList: [
      { name: "E-commerce Website", icon: "shop", projectRole: "QA" },
      { name: "Mobile App", icon: "mobile", projectRole: "QA" },
    ],
  },
  {
    id: "m4",
    name: "Jannat Rahman",
    email: "jannat.rahman@devflow.com",
    role: "DESIGNER",
    team: "Design",
    projects: 4,
    status: "Active",
    avatar: "JR",
    memberSince: "Apr 5, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 8,
      issuesClosedPct: 5,
      tasksCompleted: 12,
      tasksCompletedPct: 9,
      comments: 18,
      commentsPct: 12,
      reviews: 6,
      reviewsPct: 3,
    },
    projectList: [
      { name: "Mobile App", icon: "mobile", projectRole: "Designer" },
      { name: "DevFlow Platform", icon: "code", projectRole: "Designer" },
    ],
  },
  {
    id: "m5",
    name: "Sakib Al Hasan",
    email: "sakib.hasan@devflow.com",
    role: "DEVELOPER",
    team: "Backend",
    projects: 7,
    status: "Active",
    avatar: "SH",
    memberSince: "Jan 28, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 21,
      issuesClosedPct: 17,
      tasksCompleted: 16,
      tasksCompletedPct: 11,
      comments: 27,
      commentsPct: 9,
      reviews: 11,
      reviewsPct: 7,
    },
    projectList: [
      { name: "E-commerce Website", icon: "shop", projectRole: "Developer" },
      { name: "DevFlow Platform", icon: "code", projectRole: "Developer" },
    ],
  },
  {
    id: "m6",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@devflow.com",
    role: "PRODUCT_MANAGER",
    team: "Product",
    projects: 5,
    status: "Active",
    avatar: "NJ",
    memberSince: "Mar 18, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 10,
      issuesClosedPct: 6,
      tasksCompleted: 22,
      tasksCompletedPct: 16,
      comments: 40,
      commentsPct: 20,
      reviews: 5,
      reviewsPct: 2,
    },
    projectList: [
      { name: "Mobile App", icon: "mobile", projectRole: "PM" },
      { name: "DevFlow Platform", icon: "code", projectRole: "PM" },
    ],
  },
  {
    id: "m7",
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@devflow.com",
    role: "DEVOPS_ENGINEER",
    team: "DevOps",
    projects: 6,
    status: "Away",
    avatar: "TA",
    memberSince: "Feb 12, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 12,
      issuesClosedPct: 8,
      tasksCompleted: 15,
      tasksCompletedPct: 10,
      comments: 19,
      commentsPct: 7,
      reviews: 8,
      reviewsPct: 4,
    },
    projectList: [
      { name: "DevFlow Platform", icon: "code", projectRole: "DevOps" },
      { name: "E-commerce Website", icon: "shop", projectRole: "DevOps" },
    ],
  },
  {
    id: "m8",
    name: "Fahmida Islam",
    email: "fahmida.islam@devflow.com",
    role: "SUPPORT_ENGINEER",
    team: "Support",
    projects: 3,
    status: "Offline",
    avatar: "FI",
    memberSince: "May 2, 2024",
    localTime: "10:32 AM",
    timezone: "GMT +6",
    performance: {
      issuesClosed: 35,
      issuesClosedPct: 30,
      tasksCompleted: 28,
      tasksCompletedPct: 22,
      comments: 50,
      commentsPct: 25,
      reviews: 2,
      reviewsPct: 1,
    },
    projectList: [
      { name: "E-commerce Website", icon: "shop", projectRole: "Support" },
    ],
  },
];

// ─── Avatar component ─────────────────────────────────────────────────────────

function MemberAvatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const colors: Record<string, string> = {
    MI: "bg-violet-500",
    KH: "bg-sky-500",
    RA: "bg-emerald-500",
    JR: "bg-pink-500",
    SH: "bg-amber-500",
    NJ: "bg-orange-500",
    TA: "bg-teal-500",
    FI: "bg-rose-500",
  };
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-16 h-16 text-xl",
  };
  return (
    <div
      className={`${sizeClasses[size]} ${colors[initials] ?? "bg-slate-500"} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}
    >
      {initials}
    </div>
  );
}

// ─── Project icon helper ──────────────────────────────────────────────────────

function ProjectIcon({ icon }: { icon: string }) {
  if (icon === "shop")
    return (
      <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center shrink-0">
        <MdShoppingBag className="text-amber-600 text-sm" />
      </div>
    );
  if (icon === "mobile")
    return (
      <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center shrink-0">
        <MdSmartphone className="text-blue-600 text-sm" />
      </div>
    );
  return (
    <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center shrink-0">
      <MdCode className="text-purple-600 text-sm" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("Members");
  const [selectedMember, setSelectedMember] = useState<TeamMember>(
    MOCK_MEMBERS[0],
  );
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleOpen, setRoleOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [addMemberDropOpen, setAddMemberDropOpen] = useState(false);

  const tabs = ["Members", "Roles & Permissions", "Teams", "Settings"];

  const allRoles = [
    "All Roles",
    ...Object.values(ROLE_BADGES).map((r) => r.label),
  ];
  const allTeams = [
    "All Teams",
    "Platform",
    "Frontend",
    "Backend",
    "Quality Assurance",
    "Design",
    "Product",
    "DevOps",
    "Support",
  ];

  const filtered = MOCK_MEMBERS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      ROLE_BADGES[m.role]?.label.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      roleFilter === "All Roles" || ROLE_BADGES[m.role]?.label === roleFilter;
    const matchTeam = teamFilter === "All Teams" || m.team === teamFilter;
    return matchSearch && matchRole && matchTeam;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* ── Page header ── */}
      <div className="px-6 pt-6 pb-0 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your team members and their roles
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MdDownload className="text-base" />
              Export
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MdPersonAdd className="text-base" />
              Invite Members
            </button>
            {/* Split button */}
            <div
              className="flex relative"
              ref={(el) => {
                if (!el) return;
                const handler = (e: MouseEvent) => {
                  if (!el.contains(e.target as Node))
                    setAddMemberDropOpen(false);
                };
                document.addEventListener("mousedown", handler);
              }}
            >
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-l-lg transition-colors"
              >
                <MdAdd className="text-base" />
                Add Member
              </button>
              <button
                type="button"
                onClick={() => setAddMemberDropOpen(!addMemberDropOpen)}
                className="px-2 py-2 text-white bg-blue-600 hover:bg-blue-700 border-l border-blue-500 rounded-r-lg transition-colors"
              >
                <MdExpandMore className="text-base" />
              </button>
              {addMemberDropOpen && (
                <div className="absolute z-50 right-0 top-10 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {["Add Single Member", "Bulk Import", "Import from CSV"].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAddMemberDropOpen(false)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {opt}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0">
          {tabs.map((tab) => (
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
      {activeTab !== "Members" ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">{activeTab} — coming soon</p>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left — table panel */}
          <div className="flex-1 flex flex-col overflow-hidden p-6 min-w-0">
            {/* Filter bar */}
            <div className="flex items-center gap-3 mb-4 shrink-0">
              {/* Search */}
              <div className="relative flex-1 max-w-72">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or role..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                />
              </div>

              {/* All Roles dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setRoleOpen(!roleOpen);
                    setTeamOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors min-w-32"
                >
                  <span className="flex-1 text-left">{roleFilter}</span>
                  <MdExpandMore className="text-gray-400 shrink-0" />
                </button>
                {roleOpen && (
                  <div className="absolute z-50 left-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {allRoles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setRoleFilter(r);
                          setRoleOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${roleFilter === r ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* All Teams dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setTeamOpen(!teamOpen);
                    setRoleOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors min-w-32"
                >
                  <span className="flex-1 text-left">{teamFilter}</span>
                  <MdExpandMore className="text-gray-400 shrink-0" />
                </button>
                {teamOpen && (
                  <div className="absolute z-50 left-0 top-10 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {allTeams.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setTeamFilter(t);
                          setTeamOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${teamFilter === t ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors"
              >
                <MdFilterList className="text-base text-gray-500" />
                Filters
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Member
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Role
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Team
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Projects
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((member) => {
                    const badge = ROLE_BADGES[member.role];
                    const status = STATUS_CONFIG[member.status];
                    const isSelected = selectedMember.id === member.id;
                    return (
                      <tr
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className={`border-b border-gray-50 cursor-pointer transition-colors ${
                          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        {/* Member */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <MemberAvatar initials={member.avatar} size="md" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">
                                  {member.name}
                                </span>
                                {member.isCurrentUser && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-600 border border-blue-200">
                                    You
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role badge */}
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${badge?.className ?? "bg-gray-100 text-gray-600"}`}
                          >
                            {badge?.label ?? member.role}
                          </span>
                        </td>

                        {/* Team */}
                        <td className="px-4 py-3 text-gray-600">
                          {member.team}
                        </td>

                        {/* Projects */}
                        <td className="px-4 py-3 text-gray-600">
                          {member.projects}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${status?.dot ?? "bg-gray-400"}`}
                            />
                            <span
                              className={`text-sm ${status?.text ?? "text-gray-500"}`}
                            >
                              {member.status}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                          >
                            <MdMoreVert className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 shrink-0">
              <p className="text-sm text-gray-500">
                Showing 1 to {filtered.length} of 24 members
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <MdChevronLeft className="text-lg" />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === p
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={currentPage === 3}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <MdChevronRight className="text-lg" />
                </button>

                {/* Per page */}
                <div className="flex items-center gap-1 ml-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white">
                  10 / page
                  <MdExpandMore className="text-gray-400 text-base" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — member detail panel */}
          <div className="w-72 shrink-0 bg-white border-l border-gray-200 overflow-y-auto p-5 flex flex-col gap-5">
            {/* Profile header */}
            <div className="flex flex-col items-center text-center gap-2">
              <MemberAvatar initials={selectedMember.avatar} size="lg" />
              <div>
                <div className="flex items-center justify-center gap-2 mb-0.5">
                  <h2 className="text-base font-bold text-gray-900">
                    {selectedMember.name}
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ROLE_BADGES[selectedMember.role]?.className ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {ROLE_BADGES[selectedMember.role]?.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{selectedMember.email}</p>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <span
                      className={`w-2 h-2 rounded-full ${STATUS_CONFIG[selectedMember.status]?.dot ?? "bg-gray-400"}`}
                    />
                    {selectedMember.status}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-400">
                    Last active 10 min ago
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                About
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  {
                    label: "Role",
                    value:
                      ROLE_BADGES[selectedMember.role]?.label === "Admin"
                        ? "Administrator"
                        : ROLE_BADGES[selectedMember.role]?.label,
                  },
                  { label: "Team", value: selectedMember.team },
                  { label: "Member Since", value: selectedMember.memberSince },
                  {
                    label: "Local Time",
                    value: `${selectedMember.localTime} (${selectedMember.timezone})`,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-gray-800 font-medium text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Projects ({selectedMember.projects})
                </h3>
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  View all
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {selectedMember.projectList.map((proj) => (
                  <div key={proj.name} className="flex items-center gap-2.5">
                    <ProjectIcon icon={proj.icon} />
                    <span className="flex-1 text-sm text-gray-700 truncate">
                      {proj.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {proj.projectRole}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Performance */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Performance
                </h3>
                <div className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-lg text-xs text-gray-600">
                  This Month
                  <MdExpandMore className="text-gray-400 text-base" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Issues Closed",
                    value: selectedMember.performance.issuesClosed,
                    pct: selectedMember.performance.issuesClosedPct,
                  },
                  {
                    label: "Tasks Completed",
                    value: selectedMember.performance.tasksCompleted,
                    pct: selectedMember.performance.tasksCompletedPct,
                  },
                  {
                    label: "Comments",
                    value: selectedMember.performance.comments,
                    pct: selectedMember.performance.commentsPct,
                  },
                  {
                    label: "Reviews",
                    value: selectedMember.performance.reviews,
                    pct: selectedMember.performance.reviewsPct,
                  },
                ].map(({ label, value, pct }) => (
                  <div
                    key={label}
                    className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1"
                  >
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <MdTrendingUp className="text-sm" />
                      <span className="text-xs font-medium">+{pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Actions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Actions
              </h3>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MdEdit className="text-base text-gray-500" />
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MdLockReset className="text-base text-gray-500" />
                    Reset Password
                  </button>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors w-full"
                >
                  <MdPersonOff className="text-base" />
                  Deactivate User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
