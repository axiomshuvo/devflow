"use client";

import {
  SaveFooter,
  SectionHeader,
  SelectControl,
  SettingRow,
  Toggle,
} from "@/components/settings/setting-primitives";
import { useState } from "react";
import { MdArchive, MdDeleteForever, MdStorage, MdTimer } from "react-icons/md";
import { toast } from "react-toastify";

const RETENTION_OPTIONS = [
  "30 days",
  "60 days",
  "90 days",
  "180 days",
  "1 year",
  "Forever",
];

export function DataManagementSection() {
  const [retention, setRetention] = useState("90 days");
  const [autoArchive, setAutoArchive] = useState(true);
  const [autoDelete, setAutoDelete] = useState(false);

  return (
    <div className="flex-1 min-w-0">
      <SectionHeader
        title="Data Management"
        description="Control data retention, archiving, and storage policies."
      />
      <div className="divide-y divide-gray-100">
        <SettingRow
          icon={MdTimer}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Data Retention Period"
          desc="How long closed issue data is kept."
        >
          <SelectControl
            value={retention}
            onChange={setRetention}
            options={RETENTION_OPTIONS}
          />
        </SettingRow>
        <SettingRow
          icon={MdArchive}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Auto-archive Completed Issues"
          desc="Automatically archive issues marked as Done after 30 days."
        >
          <Toggle checked={autoArchive} onChange={setAutoArchive} />
        </SettingRow>
        <SettingRow
          icon={MdStorage}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Auto-delete Archived Issues"
          desc="Permanently delete archived issues after retention period."
        >
          <Toggle checked={autoDelete} onChange={setAutoDelete} />
        </SettingRow>
      </div>

      <SaveFooter onSave={() => {}} />

      {/* Danger zone */}
      <div className="mx-6 mb-6 mt-2 p-4 border border-red-200 rounded-xl bg-red-50">
        <p className="text-sm font-semibold text-red-700 mb-1">Danger Zone</p>
        <p className="text-xs text-red-500 mb-3">
          Deleting the workspace is irreversible. All projects, issues and data
          will be permanently removed.
        </p>
        <button
          type="button"
          title="Only Admins can delete the workspace"
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
  );
}
