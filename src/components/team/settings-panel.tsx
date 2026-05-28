"use client";

import {
  mockTeamInviteDefaults,
  mockTeamPolicies,
  mockTeamRoles,
} from "@/lib/mock-data";
import { Button } from "@heroui/react";
import { useState } from "react";
import { MdCheckCircle, MdSecurity, MdTune } from "react-icons/md";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function SettingsPanel() {
  const [policies, setPolicies] = useState(mockTeamPolicies);
  const [defaults, setDefaults] = useState(mockTeamInviteDefaults);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <MdSecurity className="text-lg" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Access Policies
            </h3>
            <p className="text-xs text-gray-400">
              Control how members join and access the workspace.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {policy.label}
                </p>
                <p className="text-xs text-gray-500">{policy.description}</p>
              </div>
              <Toggle
                checked={policy.enabled}
                onChange={(value) =>
                  setPolicies((prev) =>
                    prev.map((item) =>
                      item.id === policy.id
                        ? { ...item, enabled: value }
                        : item,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <MdTune className="text-lg" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Invite Defaults
            </h3>
            <p className="text-xs text-gray-400">
              Default settings for new team invitations.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm text-gray-600">
            Default role
            <select
              value={defaults.defaultRole}
              onChange={(event) =>
                setDefaults((prev) => ({
                  ...prev,
                  defaultRole: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {mockTeamRoles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-gray-600">
            Invite expiry
            <select
              value={defaults.expiryDays}
              onChange={(event) =>
                setDefaults((prev) => ({
                  ...prev,
                  expiryDays: Number(event.target.value),
                }))
              }
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {[3, 5, 7, 14].map((days) => (
                <option key={days} value={days}>
                  {days} days
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Require two-factor auth
              </p>
              <p className="text-xs text-gray-500">
                Enforce 2FA for new team members.
              </p>
            </div>
            <Toggle
              checked={defaults.requireTwoFactor}
              onChange={(value) =>
                setDefaults((prev) => ({
                  ...prev,
                  requireTwoFactor: value,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Allow guest access
              </p>
              <p className="text-xs text-gray-500">
                Invite external guests with limited permissions.
              </p>
            </div>
            <Toggle
              checked={defaults.allowGuestAccess}
              onChange={(value) =>
                setDefaults((prev) => ({
                  ...prev,
                  allowGuestAccess: value,
                }))
              }
            />
          </div>

          <Button className="mt-1 bg-blue-600 text-white hover:bg-blue-700">
            <MdCheckCircle className="text-base" />
            Save defaults
          </Button>
        </div>
      </div>
    </div>
  );
}
