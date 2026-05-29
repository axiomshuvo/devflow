"use client";

import { SectionHeader } from "@/components/settings/setting-primitives";
import { Toggle } from "@/components/settings/setting-primitives";
import { mockAutomationRules } from "@/lib/mock-data";
import type { AutomationRule } from "@/types";
import { useState } from "react";
import { MdAdd, MdDelete, MdFlashOn } from "react-icons/md";
import { toast } from "react-toastify";

export function AutomationSection() {
  const [rules, setRules] = useState<AutomationRule[]>(mockAutomationRules);

  function toggleRule(id: string) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  }

  function deleteRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
    toast.info("Automation rule removed.");
  }

  return (
    <div className="flex-1 min-w-0">
      <SectionHeader
        title="Automation"
        description="Automate repetitive actions based on triggers and conditions."
      />

      <div className="px-6 py-4 flex flex-col gap-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <MdFlashOn className="text-amber-600 text-base" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{rule.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                <span className="font-medium text-gray-600">When:</span> {rule.trigger}
                &nbsp;→&nbsp;
                <span className="font-medium text-gray-600">Then:</span> {rule.action}
              </p>
            </div>
            <Toggle checked={rule.enabled} onChange={() => toggleRule(rule.id)} />
            <button
              type="button"
              onClick={() => deleteRule(rule.id)}
              className="text-gray-400 hover:text-red-500 transition-colors ml-1"
            >
              <MdDelete className="text-base" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => toast.info("Rule builder coming in Phase 4.")}
          className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors w-full justify-center mt-1"
        >
          <MdAdd className="text-base" />
          Add Rule
        </button>
      </div>
    </div>
  );
}
