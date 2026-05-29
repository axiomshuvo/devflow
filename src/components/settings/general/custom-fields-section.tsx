"use client";

import { SectionHeader } from "@/components/settings/setting-primitives";
import { mockCustomFields } from "@/lib/mock-data";
import type { CustomField } from "@/types";
import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const FIELD_TYPES: CustomField["type"][] = ["text", "number", "date", "select"];
const APPLICABLE_TO: CustomField["applicableTo"][] = ["issue", "project"];

export function CustomFieldsSection() {
  const [fields, setFields] = useState<CustomField[]>(mockCustomFields);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<CustomField["type"]>("text");
  const [newApplicable, setNewApplicable] = useState<CustomField["applicableTo"]>("issue");

  function addField() {
    if (!newName.trim()) return;
    setFields((prev) => [
      ...prev,
      {
        id: `cf${Date.now()}`,
        name: newName.trim(),
        type: newType,
        required: false,
        applicableTo: newApplicable,
      },
    ]);
    setNewName("");
    toast.success(`Custom field "${newName.trim()}" added.`);
  }

  function removeField(id: string) {
    setFields((prev) => prev.filter((f) => f.id !== id));
    toast.info("Custom field removed.");
  }

  return (
    <div className="flex-1 min-w-0">
      <SectionHeader
        title="Custom Fields"
        description="Add custom metadata fields to issues and projects."
      />

      <div className="px-6 py-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
              <th className="pb-2 pr-4 font-medium">Name</th>
              <th className="pb-2 pr-4 font-medium">Type</th>
              <th className="pb-2 pr-4 font-medium">Applies To</th>
              <th className="pb-2 pr-4 font-medium">Required</th>
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {fields.map((f) => (
              <tr key={f.id}>
                <td className="py-2.5 pr-4 font-medium text-gray-800">{f.name}</td>
                <td className="py-2.5 pr-4">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs capitalize">
                    {f.type}
                  </span>
                </td>
                <td className="py-2.5 pr-4">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs capitalize">
                    {f.applicableTo}
                  </span>
                </td>
                <td className="py-2.5 pr-4">
                  {f.required ? (
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs">Yes</span>
                  ) : (
                    <span className="text-xs text-gray-400">No</span>
                  )}
                </td>
                <td className="py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => removeField(f.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <MdDelete className="text-base" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add row */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <input
            type="text"
            placeholder="Field name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as CustomField["type"])}
              className="appearance-none px-3 py-2 pr-7 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {FIELD_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>
          <div className="relative">
            <select
              value={newApplicable}
              onChange={(e) => setNewApplicable(e.target.value as CustomField["applicableTo"])}
              className="appearance-none px-3 py-2 pr-7 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {APPLICABLE_TO.map((a) => (
                <option key={a} value={a} className="capitalize">{a}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>
          <button
            type="button"
            onClick={addField}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
          >
            <MdAdd className="text-base" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
