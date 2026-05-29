"use client";

import { Toggle, SelectControl } from "@/components/settings/setting-primitives";
import { mockActiveSessions } from "@/lib/mock-data";
import type { ActiveSession } from "@/types";
import { useState } from "react";
import {
  MdComputer,
  MdPhoneAndroid,
  MdQrCode2,
  MdShield,
  MdLogout,
} from "react-icons/md";
import { toast } from "react-toastify";

export function SecurityTab() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState<ActiveSession[]>(mockActiveSessions);
  const [minLength, setMinLength] = useState("8");
  const [requireSpecial, setRequireSpecial] = useState(true);

  function revokeSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session revoked.");
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* 2FA */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Two-Factor Authentication</h2>
          <p className="text-sm text-gray-500 mt-0.5">Add an extra layer of security to your account.</p>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                <MdShield className="text-green-600 text-lg" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Enable 2FA</p>
                <p className="text-xs text-gray-500">Authenticate using an authenticator app.</p>
              </div>
            </div>
            <Toggle checked={twoFactor} onChange={setTwoFactor} />
          </div>
          {twoFactor && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl flex items-center gap-4">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                <MdQrCode2 className="text-gray-400 text-5xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Scan with your authenticator app</p>
                <p className="text-xs text-gray-500 mt-1">QR code setup available in Phase 4.</p>
                <button
                  type="button"
                  onClick={() => toast.info("2FA setup coming in Phase 4.")}
                  className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Setup Authenticator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Policy */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Password Policy</h2>
          <p className="text-sm text-gray-500 mt-0.5">Set requirements for workspace passwords.</p>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Minimum Password Length</p>
              <p className="text-xs text-gray-500 mt-0.5">Minimum characters required.</p>
            </div>
            <div className="w-28">
              <SelectControl
                value={minLength}
                onChange={setMinLength}
                options={["6", "8", "10", "12", "16"]}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Require Special Characters</p>
              <p className="text-xs text-gray-500 mt-0.5">Password must include !, @, #, etc.</p>
            </div>
            <Toggle checked={requireSpecial} onChange={setRequireSpecial} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={() => toast.success("Password policy saved (mock).")}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Policy
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Active Sessions</h2>
          <p className="text-sm text-gray-500 mt-0.5">Devices currently signed in to your account.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                {s.device.toLowerCase().includes("iphone") ? (
                  <MdPhoneAndroid className="text-gray-600 text-lg" />
                ) : (
                  <MdComputer className="text-gray-600 text-lg" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800">{s.device}</p>
                  {s.isCurrent && (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {s.browser} · {s.location} · {s.lastSeen}
                </p>
              </div>
              {!s.isCurrent && (
                <button
                  type="button"
                  onClick={() => revokeSession(s.id)}
                  className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors shrink-0"
                >
                  <MdLogout className="text-sm" /> Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
