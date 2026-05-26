import { cn } from "@/lib/utils";
import type { IssueStatus } from "@/types";

const statusConfig: Record<IssueStatus, { label: string; className: string }> =
  {
    BACKLOG: {
      label: "Backlog",
      className: "bg-gray-100 text-gray-600",
    },
    TODO: {
      label: "To Do",
      className: "bg-blue-50 text-blue-600",
    },
    IN_PROGRESS: {
      label: "In Progress",
      className: "bg-amber-50 text-amber-600",
    },
    IN_REVIEW: {
      label: "In Review",
      className: "bg-purple-50 text-purple-600",
    },
    DONE: {
      label: "Done",
      className: "bg-emerald-50 text-emerald-600",
    },
    BLOCKED: {
      label: "Blocked",
      className: "bg-red-50 text-red-600",
    },
  };

interface StatusBadgeProps {
  status: IssueStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status];
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
