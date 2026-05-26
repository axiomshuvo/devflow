import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  iconBg: string;
  change?: number;
  changeLabel?: string;
}

export function StatsCard({
  label,
  value,
  icon,
  iconBg,
  change,
  changeLabel = "from last week",
}: StatsCardProps) {
  const positive = change !== undefined && change >= 0;
  const negative = change !== undefined && change < 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
          iconBg,
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 font-medium mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {value}
        </p>
        {change !== undefined && (
          <p
            className={cn(
              "text-xs mt-1 font-medium",
              positive && "text-emerald-500",
              negative && "text-red-500",
            )}
          >
            {positive ? `+${change}%` : `${change}%`} {changeLabel}
          </p>
        )}
      </div>
    </div>
  );
}
