"use client";

import {
  SectionHeader,
  SaveFooter,
  SettingRow,
  SelectControl,
} from "@/components/settings/setting-primitives";
import { useState } from "react";
import {
  MdViewKanban,
  MdFolder,
  MdSort,
  MdFilterList,
} from "react-icons/md";

const ISSUE_VIEWS = ["Board", "List", "Table"];
const PROJECT_VIEWS = ["Cards", "List", "Table"];
const SORT_OPTIONS = ["Created Date (newest)", "Created Date (oldest)", "Priority (high→low)", "Due Date (soonest)", "Alphabetical"];
const FILTER_DEFAULTS = ["All Issues", "My Issues", "Open Only", "Unassigned"];

export function DefaultViewsSection() {
  const [issueView, setIssueView] = useState("Board");
  const [projectView, setProjectView] = useState("Cards");
  const [sortOrder, setSortOrder] = useState("Created Date (newest)");
  const [filterDefault, setFilterDefault] = useState("All Issues");

  return (
    <div className="flex-1 min-w-0">
      <SectionHeader
        title="Default Views"
        description="Set the default view layouts for issues and projects."
      />
      <div className="divide-y divide-gray-100">
        <SettingRow
          icon={MdViewKanban}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Default Issue View"
          desc="How the issues list is displayed by default."
        >
          <SelectControl value={issueView} onChange={setIssueView} options={ISSUE_VIEWS} />
        </SettingRow>
        <SettingRow
          icon={MdFolder}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Default Project View"
          desc="How projects are displayed by default."
        >
          <SelectControl value={projectView} onChange={setProjectView} options={PROJECT_VIEWS} />
        </SettingRow>
        <SettingRow
          icon={MdSort}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Default Sort Order"
          desc="How issues are sorted when no sort is applied."
        >
          <SelectControl value={sortOrder} onChange={setSortOrder} options={SORT_OPTIONS} />
        </SettingRow>
        <SettingRow
          icon={MdFilterList}
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
          label="Default Filter"
          desc="Which issues are shown by default."
        >
          <SelectControl value={filterDefault} onChange={setFilterDefault} options={FILTER_DEFAULTS} />
        </SettingRow>
      </div>
      <SaveFooter onSave={() => {}} />
    </div>
  );
}
