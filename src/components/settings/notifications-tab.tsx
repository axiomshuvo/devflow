"use client";

import { Toggle } from "@/components/settings/setting-primitives";
import { useState } from "react";
import { toast } from "react-toastify";

interface NotifGroup {
  label: string;
  items: { key: string; label: string; desc: string }[];
}

const GROUPS: NotifGroup[] = [
  {
    label: "Issues & Tasks",
    items: [
      { key: "assigned", label: "Assignments", desc: "When an issue is assigned to you." },
      { key: "mentioned", label: "Mentions", desc: "When someone mentions you in a comment." },
      { key: "status", label: "Status Changes", desc: "When an issue you follow changes status." },
      { key: "due", label: "Due Date Reminders", desc: "Reminders before an issue is due." },
    ],
  },
  {
    label: "Workspace",
    items: [
      { key: "invite", label: "Member Invites", desc: "When a new member joins the workspace." },
      { key: "project", label: "Project Updates", desc: "When a project you belong to is updated." },
    ],
  },
];

type NotifState = Record<string, { email: boolean; inapp: boolean }>;

function buildDefault(): NotifState {
  const s: NotifState = {};
  for (const g of GROUPS) for (const i of g.items) s[i.key] = { email: true, inapp: true };
  return s;
}

export function NotificationsTab() {
  const [prefs, setPrefs] = useState<NotifState>(buildDefault);
  const [digest, setDigest] = useState(true);
  const [digestFreq, setDigestFreq] = useState("Weekly");

  function toggle(key: string, channel: "email" | "inapp") {
    setPrefs((prev) => ({ ...prev, [key]: { ...prev[key], [channel]: !prev[key][channel] } }));
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Notification Preferences</h2>
          <p className="text-sm text-gray-500 mt-0.5">Choose when and how you want to be notified.</p>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_100px_100px] gap-4 px-6 py-2.5 border-b border-gray-100 bg-gray-50">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Event</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Email</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">In-App</span>
        </div>

        {GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-6 py-2 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{group.label}</p>
            </div>
            {group.items.map((item) => (
              <div key={item.key} className="grid grid-cols-[1fr_100px_100px] gap-4 items-center px-6 py-3.5 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <div className="flex justify-center">
                  <Toggle checked={prefs[item.key].email} onChange={() => toggle(item.key, "email")} />
                </div>
                <div className="flex justify-center">
                  <Toggle checked={prefs[item.key].inapp} onChange={() => toggle(item.key, "inapp")} />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Digest */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Weekly Digest</p>
            <p className="text-xs text-gray-500 mt-0.5">Receive a summary of activity.</p>
          </div>
          <div className="flex items-center gap-3">
            {digest && (
              <div className="relative">
                <select
                  value={digestFreq}
                  onChange={(e) => setDigestFreq(e.target.value)}
                  className="appearance-none px-3 py-1.5 pr-7 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["Daily", "Weekly", "Never"].map((o) => <option key={o}>{o}</option>)}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
              </div>
            )}
            <Toggle checked={digest} onChange={setDigest} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => toast.success("Notification preferences saved (mock).")}
          className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
