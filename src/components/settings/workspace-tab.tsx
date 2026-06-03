"use client";

import { Toggle } from "@/components/settings/setting-primitives";
import { currentUser, mockUsers } from "@/lib/mock-data";
import { useState } from "react";
import {
  MdContentCopy,
  MdDeleteForever,
  MdImage,
  MdLink,
} from "react-icons/md";
import { toast } from "react-toastify";

export function WorkspaceTab() {
  const [workspaceName, setWorkspaceName] = useState("DevFlow");
  const [inviteLink, setInviteLink] = useState(true);

  return (
    <div className="flex gap-5 p-6 items-start">
      <div className="flex flex-col gap-5 flex-1 min-w-0">
        {/* Identity */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              Workspace Identity
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your workspace name and branding.
            </p>
          </div>
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Icon */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                DF
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => toast.info("Logo upload coming in Phase 4.")}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MdImage className="text-base" /> Change Logo
                </button>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Workspace Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => toast.success("Workspace name saved (mock).")}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Workspace URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://devflow.app/workspace/devflow"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://devflow.app/workspace/devflow",
                    );
                    toast.success("URL copied!");
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
                >
                  <MdContentCopy className="text-base" /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Invite link */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              Invite Link
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Share this link to invite people to your workspace.
            </p>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdLink className="text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  Enable Invite Link
                </span>
              </div>
              <Toggle checked={inviteLink} onChange={setInviteLink} />
            </div>
            {inviteLink && (
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://devflow.app/invite/mock-token-abc123"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://devflow.app/invite/mock-token-abc123",
                    );
                    toast.success("Invite link copied!");
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
                >
                  <MdContentCopy className="text-base" /> Copy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Members summary */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Members</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Overview of workspace membership.
            </p>
          </div>
          <div className="px-6 py-5 grid grid-cols-3 gap-4">
            {[
              { label: "Total Members", value: mockUsers.length },
              {
                label: "Admins",
                value: mockUsers.filter((u) => u.role === "ADMIN").length,
              },
              {
                label: "Developers",
                value: mockUsers.filter((u) => u.role === "DEVELOPER").length,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="text-center p-3 bg-gray-50 rounded-xl"
              >
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="p-4 border border-red-200 rounded-xl bg-red-50">
          <p className="text-sm font-semibold text-red-700 mb-1">Danger Zone</p>
          <p className="text-xs text-red-500 mb-3">
            Deleting the workspace is permanent and cannot be undone.
          </p>
          <button
            type="button"
            onClick={() =>
              toast.error("Only workspace Admins can delete the workspace.")
            }
            className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg opacity-60 cursor-not-allowed"
          >
            <MdDeleteForever className="text-base" />
            Delete Workspace
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-64 shrink-0 bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Role</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {currentUser.name}
            </p>
            <span className="inline-flex mt-0.5 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full capitalize">
              {currentUser.role.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
