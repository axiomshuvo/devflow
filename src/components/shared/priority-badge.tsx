import { cn } from "@/lib/utils";
import type { IssuePriority } from "@/types";

const priorityConfig: Record<
  IssuePriority,
  { label: string; className: string }
> = {
  LOW: {
    label: "Low",
    className: "bg-gray-100 text-gray-600",
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-amber-50 text-amber-600",
  },
  HIGH: {
    label: "High",
    className: "bg-orange-50 text-orange-600",
  },
  CRITICAL: {
    label: "Critical",
    className: "bg-red-50 text-red-700",
  },
};

interface PriorityBadgeProps {
  priority: IssuePriority;
  size?: "sm" | "md";
}

export function PriorityBadge({ priority, size = "sm" }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap",
        config.className,
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      )}
    >
      {config.label}
    </span>
  );
}
