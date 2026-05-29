"use client";

import {
  SectionHeader,
  SaveFooter,
  SettingRow,
  SelectControl,
} from "@/components/settings/setting-primitives";
import { useState } from "react";
import {
  MdLanguage,
  MdAttachMoney,
  MdFormatListNumbered,
  MdCalendarToday,
} from "react-icons/md";

const CURRENCIES = ["USD ($)", "EUR (€)", "GBP (£)", "BDT (৳)", "INR (₹)", "SGD (S$)"];
const NUMBER_FORMATS = ["1,234.56 (English)", "1.234,56 (European)"];
const FISCAL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function LocalizationSection() {
  const [currency, setCurrency] = useState("USD ($)");
  const [numberFormat, setNumberFormat] = useState("1,234.56 (English)");
  const [fiscalStart, setFiscalStart] = useState("January");

  return (
    <div className="flex-1 min-w-0">
      <SectionHeader
        title="Localization"
        description="Configure regional formats for your workspace."
      />
      <div className="divide-y divide-gray-100">
        <SettingRow
          icon={MdLanguage}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Language"
          desc="Workspace display language."
        >
          <SelectControl value="English (US)" onChange={() => {}} options={["English (US)"]} />
        </SettingRow>
        <SettingRow
          icon={MdAttachMoney}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Currency"
          desc="Default currency for billing and reports."
        >
          <SelectControl value={currency} onChange={setCurrency} options={CURRENCIES} />
        </SettingRow>
        <SettingRow
          icon={MdFormatListNumbered}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Number Format"
          desc="How numbers and decimals are formatted."
        >
          <SelectControl value={numberFormat} onChange={setNumberFormat} options={NUMBER_FORMATS} />
        </SettingRow>
        <SettingRow
          icon={MdCalendarToday}
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
          label="Fiscal Year Start"
          desc="First month of your fiscal year."
        >
          <SelectControl value={fiscalStart} onChange={setFiscalStart} options={FISCAL_MONTHS} />
        </SettingRow>
      </div>
      <SaveFooter onSave={() => {}} />
    </div>
  );
}
