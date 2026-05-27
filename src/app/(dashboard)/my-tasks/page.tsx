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
        project: "DevFlow API",
        priority: "Medium",
        dueDate: "2026-05-28",
        avatarUrl: avatar,
      },
      {
        id: "t2",
        title: "Add product search functionality",
        project: "E-Commerce Website",
        priority: "High",
        dueDate: "2026-05-30",
        avatarUrl: avatar,
      },
      {
        id: "t3",
        title: "Update documentation",
        project: "Mobile App",
        priority: "Low",
        dueDate: "2026-06-02",
        avatarUrl: avatar,
      },
      {
        id: "t4",
        title: "Fix cart quantity issue",
        project: "E-Commerce Website",
        priority: "High",
        dueDate: "2026-05-26",
        avatarUrl: avatar,
      },
      {
        id: "t5",
        title: "Implement wishlist feature",
        project: "DevFlow API",
        priority: "Medium",
        dueDate: "2026-06-05",
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
        project: "Mobile App",
        priority: "Medium",
        dueDate: "2026-05-29",
        avatarUrl: avatar,
      },
      {
        id: "t7",
        title: "Setup CI/CD pipeline",
        project: "DevFlow API",
        priority: "High",
        dueDate: "2026-06-01",
        avatarUrl: avatar,
      },
      {
        id: "t8",
        title: "Optimize images",
        project: "E-Commerce Website",
        priority: "Low",
        dueDate: "2026-05-27",
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
        project: "Mobile App",
        priority: "Medium",
        dueDate: "2026-06-03",
        avatarUrl: avatar,
      },
      {
        id: "t10",
        title: "Refactor code structure",
        project: "DevFlow API",
        priority: "Low",
        dueDate: "2026-06-08",
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
        dueDate: "2026-05-20",
        avatarUrl: avatar,
      },
      {
        id: "t12",
        title: "Setup project repository",
        project: "DevFlow API",
        priority: "Low",
        dueDate: "2026-05-22",
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

type TaskRecord = Task & {
  statusId: Column["id"];
  statusLabel: Column["label"];
  statusDot: Column["dot"];
};

const PRIORITY_ORDER: Record<Priority, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getDueBucket(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);

  const dayDiff = Math.round(
    (dueDate.getTime() - today.getTime()) / 1000 / 60 / 60 / 24,
  );

  if (dayDiff < 0) {
    return "Overdue";
  }

  if (dayDiff === 0) {
    return "Today";
  }

  if (dayDiff <= 7) {
    return "This week";
  }

  return "Later";
}

function TaskListRow({
  task,
  onOpen,
}: {
  task: TaskRecord;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="grid w-full grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_auto_auto_auto] items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left transition hover:border-gray-300 hover:shadow-sm"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-800">
          {task.title}
        </p>
        <p className="mt-1 truncate text-xs text-gray-500">{task.project}</p>
      </div>

      <div className="hidden min-w-0 md:block">
        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {task.statusLabel}
        </span>
      </div>

      <PriorityPill priority={task.priority} />
      <DueDate date={task.dueDate} />

      <Image
        src={task.avatarUrl}
        alt="assignee"
        width={28}
        height={28}
        className="rounded-full object-cover"
      />
    </button>
  );
}

function CalendarBucket({
  title,
  description,
  tasks,
  onOpen,
}: {
  title: string;
  description: string;
  tasks: TaskRecord[];
  onOpen: (task: TaskRecord) => void;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => onOpen(task)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-gray-300 hover:bg-white"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {task.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{task.project}</p>
                </div>
                <PriorityPill priority={task.priority} />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-gray-500">
                <span>{task.statusLabel}</span>
                <DueDate date={task.dueDate} />
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
            No tasks in this bucket.
          </div>
        )}
      </div>
    </section>
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

function StatTile({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string | number;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState<Tab>("board");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [projectOpen, setProjectOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [columns] = useState(INITIAL_COLUMNS);

  const allTasks: TaskRecord[] = columns.flatMap((col) =>
    col.tasks.map((task) => ({
      ...task,
      statusId: col.id,
      statusLabel: col.label,
      statusDot: col.dot,
    })),
  );

  const visibleTasks = allTasks.filter((task) => {
    const matchesProject =
      projectFilter === "All Projects" || task.project === projectFilter;
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesProject && matchesPriority;
  });

  const visibleColumns = columns.map((column) => ({
    ...column,
    tasks: visibleTasks.filter((task) => task.statusId === column.id),
  }));

  const sortedTasks = [...visibleTasks].sort((left, right) => {
    const timeDiff =
      new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime();

    if (timeDiff !== 0) {
      return timeDiff;
    }

    return PRIORITY_ORDER[left.priority] - PRIORITY_ORDER[right.priority];
  });

  const calendarBuckets = ["Overdue", "Today", "This week", "Later"].map(
    (bucket) => ({
      title: bucket,
      description:
        bucket === "Overdue"
          ? "Due before today"
          : bucket === "Today"
            ? "Due right now"
            : bucket === "This week"
              ? "Due in the next seven days"
              : "Due after this week",
      tasks: sortedTasks.filter(
        (task) => getDueBucket(task.dueDate) === bucket,
      ),
    }),
  );

  const overdueCount = visibleTasks.filter(
    (task) => getDueBucket(task.dueDate) === "Overdue",
  ).length;
  const dueSoonCount = visibleTasks.filter(
    (task) => getDueBucket(task.dueDate) === "This week",
  ).length;
  const completedCount = visibleTasks.filter(
    (task) => task.statusId === "done",
  ).length;
  const projectCount = new Set(visibleTasks.map((task) => task.project)).size;

  function handleAddTask() {
    toast.info("New task creation coming soon!");
  }

  function handleOpenTask(task: TaskRecord) {
    toast.info(`${task.title} in ${task.project}`);
  }

  function resetFilters() {
    setProjectFilter("All Projects");
    setPriorityFilter("All");
    setProjectOpen(false);
    setPriorityOpen(false);
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 pt-6 pb-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-500">
            My Work
          </p>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-500">Tasks assigned to you</p>
        </div>
      </div>

      <div className="grid gap-4 border-b border-gray-100 bg-white px-6 py-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Visible tasks"
          value={visibleTasks.length}
          subtitle="Matching your filters"
        />
        <StatTile
          label="Overdue"
          value={overdueCount}
          subtitle="Needs attention now"
        />
        <StatTile
          label="Due this week"
          value={dueSoonCount}
          subtitle="Short-term focus items"
        />
        <StatTile
          label="Projects"
          value={projectCount}
          subtitle="Across the workspace"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-white px-6 py-3">
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
                onClick={() => {
                  setActiveTab(tab);
                  setProjectOpen(false);
                  setPriorityOpen(false);
                }}
                className={`flex items-center gap-1.5 border-b-2 px-4 py-2 text-sm font-medium capitalize transition-colors ${
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

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProjectOpen(!projectOpen);
                setPriorityOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300"
            >
              {projectFilter} <MdExpandMore className="text-gray-400" />
            </button>
            {projectOpen ? (
              <div className="absolute right-0 top-9 z-50 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                {[
                  "All Projects",
                  ...mockProjects.map((project) => project.name),
                ].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setProjectFilter(name);
                      setProjectOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${projectFilter === name ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setPriorityOpen(!priorityOpen);
                setProjectOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300"
            >
              Priority: {priorityFilter}{" "}
              <MdExpandMore className="text-gray-400" />
            </button>
            {priorityOpen ? (
              <div className="absolute right-0 top-9 z-50 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                {(["All", "Low", "Medium", "High", "Critical"] as const).map(
                  (priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => {
                        setPriorityFilter(priority);
                        setPriorityOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${priorityFilter === priority ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                    >
                      {priority}
                    </button>
                  ),
                )}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300"
          >
            <MdFilterList className="text-gray-500" />
            Reset
          </button>

          <div className="flex items-stretch">
            <button
              type="button"
              onClick={handleAddTask}
              className="flex items-center gap-1.5 rounded-l-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <MdAdd className="text-base" />
              New Task
            </button>
            <button
              type="button"
              onClick={handleAddTask}
              className="rounded-r-lg border-l border-blue-500 bg-blue-600 px-2 text-white transition-colors hover:bg-blue-700"
            >
              <MdExpandMore className="text-base" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === "board" ? (
          visibleTasks.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-4">
              {visibleColumns.map((column) => (
                <BoardColumn
                  key={column.id}
                  col={column}
                  onAddTask={handleAddTask}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  No board items match your filters.
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Clear the project or priority filter to see more tasks.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Reset filters
                </button>
              </div>
            </div>
          )
        ) : null}

        {activeTab === "list" ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
              <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_auto_auto_auto] gap-4 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                <span>Task</span>
                <span className="hidden md:block">Status</span>
                <span>Priority</span>
                <span>Due</span>
                <span>Owner</span>
              </div>
            </div>

            <div className="space-y-3">
              {sortedTasks.length > 0 ? (
                sortedTasks.map((task) => (
                  <TaskListRow
                    key={task.id}
                    task={task}
                    onOpen={() => handleOpenTask(task)}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    No list items match your filters.
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Reset filters to bring tasks back into view.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {activeTab === "calendar" ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {calendarBuckets.map((bucket) => (
              <CalendarBucket
                key={bucket.title}
                title={bucket.title}
                description={bucket.description}
                tasks={bucket.tasks}
                onOpen={handleOpenTask}
              />
            ))}
          </div>
        ) : null}
      </div>

      {activeTab === "board" ? (
        <div className="flex justify-end border-t border-gray-200 bg-white px-6 py-3">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            <MdSettings className="text-base" />
            Board Settings
          </button>
        </div>
      ) : null}
    </div>
  );
}
