"use client";

import { mockIntegrations } from "@/lib/mock-data";
import type { Integration } from "@/types";
import { useState } from "react";
import {
  MdCheckCircle,
  MdLinkOff,
  MdLink,
} from "react-icons/md";
import {
  SiGithub,
  SiSlack,
  SiJira,
  SiFigma,
  SiNotion,
  SiGoogle,
} from "react-icons/si";
import { toast } from "react-toastify";

const ICON_MAP: Record<string, React.ElementType> = {
  github: SiGithub,
  slack: SiSlack,
  jira: SiJira,
  figma: SiFigma,
  notion: SiNotion,
  google: SiGoogle,
};

const COLOR_MAP: Record<string, string> = {
  github: "text-gray-900",
  slack: "text-[#4A154B]",
  jira: "text-[#0052CC]",
  figma: "text-[#F24E1E]",
  notion: "text-gray-800",
  google: "text-[#EA4335]",
};

export function IntegrationsTab() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);

  function toggle(id: string) {
    setIntegrations((prev) =>
      prev.map((int) => {
        if (int.id !== id) return int;
        if (int.connected) {
          toast.info(`${int.name} disconnected (mock).`);
          return { ...int, connected: false, connectedAt: undefined };
        } else {
          toast.success(`${int.name} connected (mock).`);
          return { ...int, connected: true, connectedAt: new Date().toISOString().split("T")[0] };
        }
      })
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Integrations</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Connect DevFlow with your favorite tools.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          {integrations.map((int) => {
            const Icon = ICON_MAP[int.icon] ?? MdLink;
            const iconColor = COLOR_MAP[int.icon] ?? "text-gray-600";
            return (
              <div
                key={int.id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Icon className={`text-xl ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800">{int.name}</p>
                    {int.connected && (
                      <MdCheckCircle className="text-green-500 text-sm" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{int.description}</p>
                  {int.connected && int.connectedAt && (
                    <p className="text-[10px] text-gray-400 mt-1">
                      Connected {int.connectedAt}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => toggle(int.id)}
                    className={`mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      int.connected
                        ? "border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {int.connected ? (
                      <><MdLinkOff className="text-sm" /> Disconnect</>
                    ) : (
                      <><MdLink className="text-sm" /> Connect</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
