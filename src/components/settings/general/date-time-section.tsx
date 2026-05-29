"use client";

import {
  SectionHeader,
  SaveFooter,
  SettingRow,
  SelectControl,
  Toggle,
} from "@/components/settings/setting-primitives";
import { useState } from "react";
import {
  MdAccessTime,
  MdCalendarToday,
  MdSchedule,
  MdUpdate,
} from "react-icons/md";

const DATE_FORMATS = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];
const TIME_FORMATS = ["12-hour (AM/PM)", "24-hour"];

export function DateTimeSection() {
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("12-hour (AM/PM)");
  const [relativeDates, setRelativeDates] = useState(true);
  const [autoDetect, setAutoDetect] = useState(false);

  return (
    <div className="flex-1 min-w-0">
      <SectionHeader
        title="Date & Time"
        description="Configure how dates and times are displayed across the workspace."
      />
      <div className="divide-y divide-gray-100">
        <SettingRow
          icon={MdCalendarToday}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Date Format"
          desc="Choose how dates are displayed."
        >
          <SelectControl value={dateFormat} onChange={setDateFormat} options={DATE_FORMATS} />
        </SettingRow>
        <SettingRow
          icon={MdAccessTime}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Time Format"
          desc="Choose between 12-hour or 24-hour format."
        >
          <SelectControl value={timeFormat} onChange={setTimeFormat} options={TIME_FORMATS} />
        </SettingRow>
        <SettingRow
          icon={MdSchedule}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Relative Dates"
          desc='Show "2 hours ago" instead of exact timestamps.'
        >
          <Toggle checked={relativeDates} onChange={setRelativeDates} />
        </SettingRow>
        <SettingRow
          icon={MdUpdate}
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
          label="Auto-detect Timezone"
          desc="Automatically detect timezone from browser."
        >
          <Toggle checked={autoDetect} onChange={setAutoDetect} />
        </SettingRow>
      </div>
      <SaveFooter onSave={() => {}} />
    </div>
  );
}
