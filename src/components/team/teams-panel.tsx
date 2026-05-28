"use client";

import { mockTeams } from "@/lib/mock-data";
import { Avatar, Button } from "@heroui/react";
import { MdAdd, MdGroup, MdLocationOn } from "react-icons/md";

export function TeamsPanel() {
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
            className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            <MdGroup className="text-base" />
            Manage Teams
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <MdAdd className="text-base" />
            New Team
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockTeams.map((team) => (
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
              <span>{team.memberCount} members</span>
              <span>{team.projectCount} projects</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {team.members.map((member) => (
                  <Avatar key={member.name} size="sm" className="h-7 w-7">
                    <Avatar.Image src={member.avatarUrl} alt={member.name} />
                    <Avatar.Fallback>{member.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                ))}
              </div>
              <Button
                size="sm"
                className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                <MdLocationOn className="text-base" />
                View Team
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
