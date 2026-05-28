"use client";

import {
  mockTeamInvites,
  mockTeamMembers,
  mockTeamRoles,
  mockTeamTrends,
  mockTeams,
} from "@/lib/mock-data";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import { Avatar, Button } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import {
  MdCheckCircle,
  MdFilterList,
  MdGroup,
  MdLayers,
  MdMailOutline,
  MdMoreVert,
  MdSearch,
} from "react-icons/md";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  Active: { dot: "bg-emerald-500", text: "text-emerald-600" },
  Away: { dot: "bg-amber-500", text: "text-amber-600" },
  Inactive: { dot: "bg-gray-400", text: "text-gray-500" },
  Pending: { dot: "bg-blue-500", text: "text-blue-600" },
};

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0]?.charAt(0) ?? "";
  return `${parts[0]?.charAt(0) ?? ""}${parts[1]?.charAt(0) ?? ""}`;
}

export function MembersPanel({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const pageSize = 10;

  const roleOptions = useMemo(
    () => ["All Roles", ...mockTeamRoles.map((role) => role.name)],
    [],
  );
  const teamOptions = useMemo(
    () => ["All Teams", ...mockTeams.map((team) => team.name)],
    [],
  );
  const statusOptions = useMemo(() => {
    const values = Array.from(
      new Set(mockTeamMembers.map((member) => member.status)),
    );
    return ["All Status", ...values];
  }, []);

  const roleStyles = useMemo(() => {
    return Object.fromEntries(
      mockTeamRoles.map((role) => [role.name, role.badgeClass]),
    );
  }, []);

  const filteredMembers = useMemo(() => {
    const lowered = search.toLowerCase();
    return mockTeamMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(lowered) ||
        member.email.toLowerCase().includes(lowered) ||
        member.role.toLowerCase().includes(lowered);
      const matchesTeam =
        teamFilter === "All Teams" || member.team === teamFilter;
      const matchesRole =
        roleFilter === "All Roles" || member.role === roleFilter;
      const matchesStatus =
        statusFilter === "All Status" || member.status === statusFilter;
      return matchesSearch && matchesTeam && matchesRole && matchesStatus;
    });
  }, [roleFilter, search, statusFilter, teamFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, teamFilter, roleFilter, statusFilter]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const pageMembers = filteredMembers.slice(pageStart, pageStart + pageSize);

  const totalMembers = mockTeamMembers.length;
  const activeMembers = mockTeamMembers.filter(
    (member) => member.status === "Active",
  ).length;
  const inactiveMembers = mockTeamMembers.filter(
    (member) => member.status === "Inactive",
  ).length;
  const totalTeams = mockTeams.length;
  const pendingInvites = mockTeamInvites.length;

  const roleTotal = mockTeamRoles.reduce(
    (sum, role) => sum + role.memberCount,
    0,
  );

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MdGroup className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Total Members
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {totalMembers}
                  </p>
                </div>
              </div>
              <span className="text-xs text-emerald-600">+2 this month</span>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MdCheckCircle className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Active Members
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {activeMembers}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {Math.round((activeMembers / totalMembers) * 100)}% of total
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <MdMailOutline className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Pending Invites
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {pendingInvites}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                View invites
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <MdLayers className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Teams</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {totalTeams}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Manage teams
              </button>
            </div>
          </div>
        </div>

        {/* Members table */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-4 py-3">
            <div className="relative flex-1 min-w-55">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search members..."
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="relative">
              <select
                value={teamFilter}
                onChange={(event) => setTeamFilter(event.target.value)}
                className="min-w-35 appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {teamOptions.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                v
              </span>
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className="min-w-35 appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                v
              </span>
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="min-w-32.5 appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                v
              </span>
            </div>
            <Button
              size="sm"
              className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            >
              <MdFilterList className="text-base" />
              Filters
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined On</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageMembers.map((member) => {
                  const statusStyle = STATUS_STYLES[member.status];
                  return (
                    <tr
                      key={member.id}
                      className="border-b border-gray-50 text-gray-700 last:border-b-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" className="h-8 w-8">
                            <Avatar.Image
                              src={member.avatarUrl}
                              alt={member.name}
                            />
                            <Avatar.Fallback>
                              {getInitials(member.name)}
                            </Avatar.Fallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {member.name}
                              </span>
                              {member.isCurrentUser ? (
                                <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                                  You
                                </span>
                              ) : null}
                            </div>
                            <p className="text-xs text-gray-400">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${roleStyles[member.role] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{member.team}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${statusStyle?.dot ?? "bg-gray-300"}`}
                          />
                          <span
                            className={`text-sm ${statusStyle?.text ?? "text-gray-500"}`}
                          >
                            {member.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {formatDate(member.joinedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
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
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            <span>
              Showing {pageStart + 1} to {pageStart + pageMembers.length} of{" "}
              {filteredMembers.length} members
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
              >
                Next
              </button>
              <div className="ml-2 rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600">
                {pageSize} / page
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Team Overview
            </h3>
            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              View full report
            </button>
          </div>
          <div className="h-36">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={140}>
                <LineChart data={mockTeamTrends}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                  <Tooltip
                    cursor={{ stroke: "#e5e7eb", strokeDasharray: "4 4" }}
                    contentStyle={{
                      borderRadius: 8,
                      borderColor: "#e5e7eb",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="members"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full rounded-lg bg-gray-50" />
            )}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {totalMembers}
              </p>
              <p className="text-xs text-gray-400">Total Members</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {activeMembers}
              </p>
              <p className="text-xs text-gray-400">Active</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {inactiveMembers}
              </p>
              <p className="text-xs text-gray-400">Inactive</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Role Breakdown
            </h3>
            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-28 w-28">
              {mounted ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minHeight={112}
                  minWidth={112}
                >
                  <PieChart>
                    <Pie
                      data={mockTeamRoles}
                      dataKey="memberCount"
                      nameKey="name"
                      innerRadius={36}
                      outerRadius={50}
                      paddingAngle={2}
                    >
                      {mockTeamRoles.map((role) => (
                        <Cell key={role.id} fill={role.chartColor} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full rounded-full bg-gray-50" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold text-gray-900">
                  {roleTotal}
                </span>
                <span className="text-xs text-gray-400">Total</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {mockTeamRoles.map((role) => {
                const pct =
                  Math.round((role.memberCount / roleTotal) * 1000) / 10;
                return (
                  <div
                    key={role.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: role.chartColor }}
                      />
                      <span className="text-gray-600">{role.name}</span>
                    </div>
                    <span className="text-gray-500">
                      {role.memberCount} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Pending Invites
            </h3>
            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {mockTeamInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between gap-2"
              >
                <div>
                  <p className="text-sm text-gray-700">{invite.email}</p>
                  <p className="text-xs text-gray-400">
                    Invited {formatRelativeDate(invite.invitedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                    {invite.role}
                  </span>
                  <Button
                    size="sm"
                    className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    Resend
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            See all pending invites
          </button>
        </div>
      </div>
    </div>
  );
}
