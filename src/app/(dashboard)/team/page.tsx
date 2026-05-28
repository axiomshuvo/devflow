"use client";

import { MembersPanel } from "@/components/team/members-panel";
import { RolesPanel } from "@/components/team/roles-panel";
import { SettingsPanel } from "@/components/team/settings-panel";
import { TeamsPanel } from "@/components/team/teams-panel";
import { Button, Dropdown } from "@heroui/react";
import { useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdAdd, MdExpandMore, MdSearch } from "react-icons/md";

const TABS = [
  { key: "members", label: "Members" },
  { key: "teams", label: "Teams" },
  { key: "roles", label: "Roles & Permissions" },
  { key: "settings", label: "Settings" },
] as const;

type TeamTabKey = (typeof TABS)[number]["key"];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<TeamTabKey>("members");
  const [headerSearch, setHeaderSearch] = useState("");

  const activeLabel = useMemo(
    () => TABS.find((tab) => tab.key === activeTab)?.label ?? "Members",
    [activeTab],
  );

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 pt-6 pb-0">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              Team
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Team / {activeLabel}
            </h1>
            <p className="text-sm text-gray-500">
              Manage your team members and their access
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64">
              <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={headerSearch}
                onChange={(event) => setHeaderSearch(event.target.value)}
                placeholder="Search members by name, email or role..."
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <Button
              size="sm"
              className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            >
              <FaGithub className="text-base" />
              Import from GitHub
            </Button>
            <div className="flex items-center">
              <Button
                size="sm"
                className="rounded-r-none bg-blue-600 text-white hover:bg-blue-700"
              >
                <MdAdd className="text-base" />
                Invite Member
              </Button>
              <Dropdown>
                <Dropdown.Trigger>
                  <Button
                    size="sm"
                    className="rounded-l-none border-l border-blue-500 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <MdExpandMore className="text-base" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item>Invite individual</Dropdown.Item>
                    <Dropdown.Item>Bulk import</Dropdown.Item>
                    <Dropdown.Item>Import from CSV</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {activeTab === "members" ? (
          <MembersPanel
            search={headerSearch}
            onSearchChange={setHeaderSearch}
            onSwitchTab={setActiveTab}
          />
        ) : null}
        {activeTab === "teams" ? <TeamsPanel /> : null}
        {activeTab === "roles" ? <RolesPanel /> : null}
        {activeTab === "settings" ? <SettingsPanel /> : null}
      </div>
    </div>
  );
}
