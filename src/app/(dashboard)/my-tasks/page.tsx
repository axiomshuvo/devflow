"use client";

import { currentUser, mockProjects } from "@/lib/mock-data";
import Image from "next/image";
import { useState } from "react";
import {
  MdAdd,
  MdCalendarToday,
  MdExpandMore,
  MdFilterList,
  MdFolder,
  MdList,
  MdMoreHoriz,
  MdSettings,
  MdViewKanban,
} from "react-icons/md";
import { toast } from "react-toastify";

// ─── Mock board data ──────────────────────────────────────────────────────────

type Priority = "Low" | "Medium" | "High" | "Critical";

interface Task {
  id: string;
  title: string;
  project: string;
  priority: Priority;
  dueDate: string; // "YYYY-MM-DD"
  avatarUrl: string;
}

interface Column {
  id: string;
  label: string;
  dot: string;
  tasks: Task[];
}

const avatar = currentUser.imageUrl ?? "https://i.pravatar.cc/32?u=alex";

const INITIAL_COLUMNS: Column[] = [
  {
    id: "todo",
    label: "To Do",
    dot: "bg-slate-400",
    tasks: [
      {
        id: "t1",
        title: "Fix login redirect bug",
        project: "E-Commerce Website",
        priority: "Medium",
        dueDate: "2024-05-25",
        avatarUrl: avatar,
      },
      {
        id: "t2",
        title: "Add product search functionality",
        project: "E-Commerce Website",
        priority: "High",
        dueDate: "2024-05-28",
        avatarUrl: avatar,
      },
      {
        id: "t3",
        title: "Update documentation",
        project: "E-Commerce Website",
        priority: "Low",
        dueDate: "2024-05-30",
        avatarUrl: avatar,
      },
      {
        id: "t4",
        title: "Fix cart quantity issue",
        project: "E-Commerce Website",
        priority: "High",
        dueDate: "2024-05-17",
        avatarUrl: avatar,
      },
      {
        id: "t5",
        title: "Implement wishlist feature",
        project: "E-Commerce Website",
        priority: "Medium",
        dueDate: "2024-05-28",
        avatarUrl: avatar,
      },
    ],
  },
  {
    id: "in_progress",
    label: "In Progress",
    dot: "bg-amber-400",
    tasks: [
      {
        id: "t6",
        title: "Improve dashboard charts",
        project: "E-Commerce Website",
        priority: "Medium",
        dueDate: "2024-05-25",
        avatarUrl: avatar,
      },
      {
        id: "t7",
        title: "Setup CI/CD pipeline",
        project: "E-Commerce Website",
        priority: "High",
        dueDate: "2024-05-22",
        avatarUrl: avatar,
      },
      {
        id: "t8",
        title: "Optimize images",
        project: "E-Commerce Website",
        priority: "Low",
        dueDate: "2024-05-24",
        avatarUrl: avatar,
      },
    ],
  },
  {
    id: "in_review",
    label: "In Review",
    dot: "bg-violet-500",
    tasks: [
      {
        id: "t9",
        title: "Add login with Google",
        project: "E-Commerce Website",
        priority: "Medium",
        dueDate: "2024-05-26",
        avatarUrl: avatar,
      },
      {
        id: "t10",
        title: "Refactor code structure",
        project: "E-Commerce Website",
        priority: "Low",
        dueDate: "2024-05-23",
        avatarUrl: avatar,
      },
    ],
  },
  {
    id: "done",
    label: "Done",
    dot: "bg-green-500",
    tasks: [
      {
        id: "t11",
        title: "Design login page UI",
        project: "E-Commerce Website",
        priority: "Low",
        dueDate: "2024-05-10",
        avatarUrl: avatar,
      },
      {
        id: "t12",
        title: "Setup project repository",
        project: "E-Commerce Website",
        priority: "Low",
        dueDate: "2024-05-08",
        avatarUrl: avatar,
      },
    ],
  },
];

// ─── Priority badge ───────────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<Priority, string> = {
  Low: "bg-gray-100 text-gray-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-600",
  Critical: "bg-red-200 text-red-700 font-semibold",
};

function PriorityPill({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${PRIORITY_STYLES[priority]}`}
    >
      {priority}
    </span>
  );
}

// ─── Due date cell ────────────────────────────────────────────────────────────

function DueDate({ date }: { date: string }) {
  const d = new Date(date);
  const overdue = d < new Date();
  const label = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs ${overdue ? "text-red-500 font-medium" : "text-gray-400"}`}
    >
      <MdCalendarToday className="text-[11px]" />
      {label}
    </span>
  );
}

// ─── Task card ────────────────────────────────────────────────────────────────

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
      <p className="text-sm font-semibold text-gray-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
        {task.title}
      </p>
      <div className="flex items-center gap-1 text-xs text-blue-500 mb-3">
        <MdFolder className="text-[13px] text-gray-400 shrink-0" />
        <span className="text-gray-500 truncate">{task.project}</span>
      </div>
      <div className="flex items-center gap-2">
        <PriorityPill priority={task.priority} />
        <DueDate date={task.dueDate} />
        <Image
          src={task.avatarUrl}
          alt="assignee"
          width={24}
          height={24}
          className="rounded-full object-cover ml-auto shrink-0"
        />
      </div>
    </div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────

function BoardColumn({
  col,
  onAddTask,
}: {
  col: Column;
  onAddTask: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 w-72 shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 px-1">
        <span className={`w-2.5 h-2.5 rounded-full ${col.dot} shrink-0`} />
        <span className="text-sm font-semibold text-gray-800">{col.label}</span>
        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
          {col.tasks.length}
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => onAddTask()}
            className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <MdAdd className="text-base" />
          </button>
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <MdMoreHoriz className="text-base" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {col.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add task */}
      <button
        type="button"
        onClick={() => onAddTask()}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 px-1 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MdAdd className="text-base" />
        Add Task
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = "board" | "list" | "calendar";

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState<Tab>("board");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [projectOpen, setProjectOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [columns] = useState(INITIAL_COLUMNS);

  function handleAddTask() {
    toast.info("New task creation coming soon!");
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Page header ── */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tasks assigned to you</p>
      </div>

      {/* ── Tab bar + filters ── */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 gap-4 flex-wrap">
        {/* Tabs */}
        <div className="flex items-center gap-0">
          {(["board", "list", "calendar"] as Tab[]).map((tab) => {
            const Icon =
              tab === "board"
                ? MdViewKanban
                : tab === "list"
                  ? MdList
                  : MdCalendarToday;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="text-base" />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          {/* All Projects */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProjectOpen(!projectOpen);
                setPriorityOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors"
            >
              {projectFilter} <MdExpandMore className="text-gray-400" />
            </button>
            {projectOpen && (
              <div className="absolute right-0 top-9 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {["All Projects", ...mockProjects.map((p) => p.name)].map(
                  (name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setProjectFilter(name);
                        setProjectOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${projectFilter === name ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}
                    >
                      {name}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          {/* Priority filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setPriorityOpen(!priorityOpen);
                setProjectOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors"
            >
              Priority: {priorityFilter}{" "}
              <MdExpandMore className="text-gray-400" />
            </button>
            {priorityOpen && (
              <div className="absolute right-0 top-9 z-50 w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {["All", "Low", "Medium", "High", "Critical"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPriorityFilter(p);
                      setPriorityOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${priorityFilter === p ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors"
          >
            <MdFilterList className="text-gray-500" />
            Filters
          </button>

          {/* New Task */}
          <div className="flex items-stretch">
            <button
              type="button"
              onClick={() => toast.info("New task creation coming soon!")}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-l-lg transition-colors"
            >
              <MdAdd className="text-base" />
              New Task
            </button>
            <button
              type="button"
              className="px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg border-l border-blue-500 transition-colors"
            >
              <MdExpandMore className="text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Board / Other views ── */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {activeTab === "board" && (
          <div className="flex gap-5 items-start pb-4">
            {columns.map((col) => (
              <BoardColumn key={col.id} col={col} onAddTask={handleAddTask} />
            ))}
          </div>
        )}

        {activeTab !== "board" && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-5xl mb-3">
                {activeTab === "list" ? "📋" : "📅"}
              </div>
              <p className="text-gray-500 font-medium">
                {activeTab === "list" ? "List View" : "Calendar View"} coming
                soon
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Switch to Board view for now
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Board Settings ── */}
      {activeTab === "board" && (
        <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-white">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <MdSettings className="text-base" />
            Board Settings
          </button>
        </div>
      )}
    </div>
  );
}
