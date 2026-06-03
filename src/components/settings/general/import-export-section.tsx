"use client";

import { SectionHeader } from "@/components/settings/setting-primitives";
import {
  MdCloudDownload,
  MdCloudUpload,
  MdCode,
  MdFilePresent,
} from "react-icons/md";
import { SiGithub, SiJira } from "react-icons/si";
import { toast } from "react-toastify";

interface ActionRowProps {
  icon: React.ElementType;
  label: string;
  description: string;
  buttonLabel: string;
  buttonStyle?: string;
  onClick: () => void;
}

function ActionRow({
  icon: Icon,
  label,
  description,
  buttonLabel,
  buttonStyle,
  onClick,
}: ActionRowProps) {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border border-gray-200 rounded-xl">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        <Icon className="text-gray-600 text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${buttonStyle ?? "border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export function ImportExportSection() {
  return (
    <div className="flex-1 min-w-0">
      <SectionHeader
        title="Import / Export"
        description="Import data from external tools or export your workspace data."
      />

      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MdCloudUpload className="text-blue-600 text-lg" />
            <h3 className="text-sm font-semibold text-gray-900">Import</h3>
          </div>
          <div className="flex flex-col gap-2">
            <ActionRow
              icon={MdFilePresent}
              label="Import from CSV"
              description="Upload a CSV file to import issues."
              buttonLabel="Upload CSV"
              buttonStyle="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => toast.info("CSV import coming in Phase 4.")}
            />
            <ActionRow
              icon={SiGithub}
              label="Import from GitHub"
              description="Import issues from a GitHub repository."
              buttonLabel="Connect GitHub"
              onClick={() => toast.info("GitHub import coming in Phase 4.")}
            />
            <ActionRow
              icon={SiJira}
              label="Import from Jira"
              description="Migrate issues and projects from Jira."
              buttonLabel="Connect Jira"
              onClick={() => toast.info("Jira import coming in Phase 4.")}
            />
          </div>
        </div>

        {/* Export */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MdCloudDownload className="text-green-600 text-lg" />
            <h3 className="text-sm font-semibold text-gray-900">Export</h3>
          </div>
          <div className="flex flex-col gap-2">
            <ActionRow
              icon={MdFilePresent}
              label="Export as CSV"
              description="Download all issues as a CSV spreadsheet."
              buttonLabel="Download CSV"
              buttonStyle="bg-green-600 text-white hover:bg-green-700"
              onClick={() => toast.success("CSV export started (mock).")}
            />
            <ActionRow
              icon={MdCode}
              label="Export as JSON"
              description="Download full workspace data as JSON."
              buttonLabel="Download JSON"
              onClick={() => toast.success("JSON export started (mock).")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
