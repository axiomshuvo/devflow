"use client";

import { mockTeamPermissions, mockTeamRoles } from "@/lib/mock-data";
import { Button } from "@heroui/react";
import { MdCheck, MdClose, MdDownload, MdEdit } from "react-icons/md";

export function RolesPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Roles & Permissions
          </h2>
          <p className="text-sm text-gray-500">
            Manage access levels for every team role.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            <MdDownload className="text-base" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Role
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockTeamRoles.map((role) => (
          <div
            key={role.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${role.badgeClass}`}
                >
                  {role.name}
                </span>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  {role.memberCount} members
                </p>
              </div>
              <Button
                size="sm"
                className="border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              >
                <MdEdit className="text-base" />
                Edit
              </Button>
            </div>
            <p className="mt-3 text-sm text-gray-500">{role.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Permission Matrix
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3">Permission</th>
                {mockTeamRoles.map((role) => (
                  <th key={role.id} className="px-4 py-3">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTeamPermissions.map((permission) => (
                <tr
                  key={permission.id}
                  className="border-b border-gray-50 last:border-b-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">
                      {permission.action}
                    </p>
                    <p className="text-xs text-gray-400">
                      {permission.description}
                    </p>
                  </td>
                  {mockTeamRoles.map((role) => {
                    const allowed = permission.access[role.id];
                    return (
                      <td key={role.id} className="px-4 py-3">
                        {allowed ? (
                          <MdCheck className="text-emerald-500" />
                        ) : (
                          <MdClose className="text-gray-300" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
