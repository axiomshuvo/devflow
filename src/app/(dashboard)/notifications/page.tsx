"use client";

import { mockNotifications } from "@/lib/mock-data";
import { formatRelativeDate } from "@/lib/utils";
import { Button } from "@heroui/react";
import Link from "next/link";
import type { ElementType } from "react";
import { useMemo, useState } from "react";
import {
  MdAssignment,
  MdCheckCircle,
  MdComment,
  MdFlag,
  MdNotificationsNone,
  MdPersonAdd,
} from "react-icons/md";

const TYPE_META: Record<
  string,
  { label: string; icon: ElementType; bg: string; text: string }
> = {
  assignment: {
    label: "Assignment",
    icon: MdAssignment,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  mention: {
    label: "Mention",
    icon: MdComment,
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  status_change: {
    label: "Status",
    icon: MdCheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  invite: {
    label: "Invite",
    icon: MdPersonAdd,
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  due_date: {
    label: "Due Soon",
    icon: MdFlag,
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
};

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(
    mockNotifications.map((n) => ({ ...n })),
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.readAt).length,
    [notifications],
  );

  const filterCounts = useMemo(
    () => ({
      all: notifications.length,
      unread: unreadCount,
      mention: notifications.filter((n) => n.type === "mention").length,
      assignment: notifications.filter((n) => n.type === "assignment").length,
      status_change: notifications.filter((n) => n.type === "status_change")
        .length,
      due_date: notifications.filter((n) => n.type === "due_date").length,
    }),
    [notifications, unreadCount],
  );

  const filtered = useMemo(() => {
    if (activeFilter === "all") return notifications;
    if (activeFilter === "unread")
      return notifications.filter((n) => !n.readAt);
    return notifications.filter((n) => n.type === activeFilter);
  }, [activeFilter, notifications]);

  const markAllRead = () => {
    const now = new Date().toISOString();
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, readAt: n.readAt ?? now })),
    );
  };

  const markRead = (id: string) => {
    const now = new Date().toISOString();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, readAt: now } : n)),
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Stay on top of mentions, assignments, and updates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            className="border-gray-200 text-gray-700"
            onPress={markAllRead}
            isDisabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
          <Link href="/settings?tab=Notifications">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              Notification settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "mention", label: "Mentions" },
          { id: "assignment", label: "Assignments" },
          { id: "status_change", label: "Status" },
          { id: "due_date", label: "Due Dates" },
        ].map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              activeFilter === filter.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {filter.label}
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                activeFilter === filter.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {filterCounts[filter.id as keyof typeof filterCounts]}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <MdNotificationsNone className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No notifications found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notification) => {
            const meta = TYPE_META[notification.type] ?? TYPE_META.mention;
            const Icon = meta.icon;
            const unread = !notification.readAt;

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4 ${
                  unread ? "ring-1 ring-blue-100" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.bg}`}
                >
                  <Icon className={`text-xl ${meta.text}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">
                        {formatRelativeDate(notification.createdAt)}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1">
                        {meta.label}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {unread ? (
                      <button
                        type="button"
                        onClick={() => markRead(notification.id)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-500"
                      >
                        Mark as read
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">Read</span>
                    )}
                    {unread && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
