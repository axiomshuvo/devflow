"use client";

import { mockTeamMembers, mockTeams } from "@/lib/mock-data";
import type { Team } from "@/types";
import { Avatar, Button } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import {
  MdAdd,
  MdClose,
  MdGroup,
  MdLocationOn,
  MdOutlineEdit,
  MdPeople,
} from "react-icons/md";

// ─── New Team Modal ──────────────────────────────────────────────────────────

function NewTeamModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (team: Team) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [leadId, setLeadId] = useState(mockTeamMembers[0]?.id ?? "");
  const [timezone, setTimezone] = useState("UTC");
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Team name is required.");
      return;
    }
    const lead = mockTeamMembers.find((m) => m.id === leadId);
    if (!lead) return;
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      lead: { name: lead.name, role: lead.role, avatarUrl: lead.avatarUrl },
      memberCount: 1,
      projectCount: 0,
      timezone,
      members: [{ name: lead.name, avatarUrl: lead.avatarUrl }],
    };
    onAdd(newTeam);
    onClose();
  }

  const TIMEZONES = [
    "UTC",
    "UTC−8",
    "UTC−5",
    "UTC+1",
    "UTC+2",
    "UTC+3",
    "UTC+5:30",
    "UTC+8",
    "UTC+9",
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Team
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Frontend Squad"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this team do?"
              rows={2}
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Team Lead
            </label>
            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {mockTeamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              size="sm"
              className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Team
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Team Detail Panel ───────────────────────────────────────────────────────

function TeamDetailPanel({
  team,
  onClose,
}: {
  team: Team;
  onClose: () => void;
}) {
  const teamMembers = mockTeamMembers.filter((m) => m.team === team.name);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {team.name}
            </h2>
            <p className="text-xs text-gray-400">{team.timezone}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {team.description && (
            <p className="mb-4 text-sm text-gray-500">{team.description}</p>
          )}

          {/* Lead */}
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <Avatar size="sm" className="h-10 w-10">
              <Avatar.Image src={team.lead.avatarUrl} alt={team.lead.name} />
              <Avatar.Fallback>{team.lead.name.charAt(0)}</Avatar.Fallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {team.lead.name}
              </p>
              <p className="text-xs text-gray-400">Team Lead</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-100 bg-white p-3 text-center">
              <p className="text-xl font-semibold text-gray-900">
                {team.memberCount}
              </p>
              <p className="text-xs text-gray-400">Members</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-3 text-center">
              <p className="text-xl font-semibold text-gray-900">
                {team.projectCount}
              </p>
              <p className="text-xs text-gray-400">Projects</p>
            </div>
          </div>

          {/* Members list */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Members
            </h3>
            {teamMembers.length === 0 ? (
              <p className="text-sm text-gray-400">No members assigned yet.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" className="h-8 w-8">
                        <Avatar.Image
                          src={member.avatarUrl}
                          alt={member.name}
                        />
                        <Avatar.Fallback>
                          {member.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        member.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : member.status === "Away"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {member.status}
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

// ─── Main Panel ──────────────────────────────────────────────────────────────

export function TeamsPanel() {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [manageMode, setManageMode] = useState(false);

  function handleAddTeam(team: Team) {
    setTeams((prev) => [...prev, team]);
  }

  function handleRemoveTeam(teamId: string) {
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Teams</h2>
          <p className="text-sm text-gray-500">
            Explore how squads are organized across the workspace.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setManageMode((prev) => !prev)}
            className={
              manageMode
                ? "border border-blue-200 bg-blue-50 text-blue-700"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }
          >
            {manageMode ? (
              <>
                <MdClose className="text-base" />
                Done
              </>
            ) : (
              <>
                <MdGroup className="text-base" />
                Manage Teams
              </>
            )}
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowNewTeamModal(true)}
          >
            <MdAdd className="text-base" />
            New Team
          </Button>
        </div>
      </div>

      {manageMode && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <MdOutlineEdit className="mr-1 inline-block align-middle text-base" />
          Manage mode — click <strong>Remove</strong> on any team card to delete
          it, or press <strong>Done</strong> when finished.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <div
            key={team.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {team.name}
                </h3>
                <p className="text-sm text-gray-500">{team.description}</p>
              </div>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                {team.timezone}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Avatar size="sm" className="h-9 w-9">
                <Avatar.Image src={team.lead.avatarUrl} alt={team.lead.name} />
                <Avatar.Fallback>{team.lead.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {team.lead.name}
                </p>
                <p className="text-xs text-gray-400">Team Lead</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MdPeople className="text-gray-400" />
                {team.memberCount} members
              </span>
              <span>{team.projectCount} projects</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {team.members.slice(0, 5).map((member) => (
                  <Avatar key={member.name} size="sm" className="h-7 w-7">
                    <Avatar.Image src={member.avatarUrl} alt={member.name} />
                    <Avatar.Fallback>{member.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                ))}
              </div>
              {manageMode ? (
                <Button
                  size="sm"
                  className="border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => handleRemoveTeam(team.id)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  onClick={() => setSelectedTeam(team)}
                >
                  <MdLocationOn className="text-base" />
                  View Team
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <MdGroup className="mb-3 text-4xl text-gray-300" />
          <p className="text-sm font-medium text-gray-500">No teams yet</p>
          <p className="mt-1 text-xs text-gray-400">
            Create your first team to start organizing members.
          </p>
          <Button
            size="sm"
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowNewTeamModal(true)}
          >
            <MdAdd className="text-base" />
            New Team
          </Button>
        </div>
      )}

      {showNewTeamModal && (
        <NewTeamModal
          onClose={() => setShowNewTeamModal(false)}
          onAdd={handleAddTeam}
        />
      )}

      {selectedTeam && (
        <TeamDetailPanel
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
}
