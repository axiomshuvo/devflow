"use client";

import { mockProjects, mockUsers } from "@/lib/mock-data";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  MdBugReport,
  MdCheckCircle,
  MdCloudDone,
  MdCloudUpload,
  MdCode,
  MdFolder,
  MdRocketLaunch,
  MdTrendingUp,
} from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

const IMPORT_SCHEMA = z.object({
  repository: z.string().min(1, "Select a repository."),
  projectId: z.string().min(1, "Select a project."),
  issueTypes: z.array(z.string()).min(1, "Pick at least one issue type."),
  includeClosed: z.boolean(),
  mapAssignees: z.boolean(),
  defaultAssignee: z.string().optional(),
});

type ImportFormValues = z.infer<typeof IMPORT_SCHEMA>;

const REPOSITORIES = [
  {
    id: "octo/devflow-web",
    name: "devflow-web",
    owner: "octo",
    issues: 24,
    updatedAt: "2 days ago",
  },
  {
    id: "octo/checkout-service",
    name: "checkout-service",
    owner: "octo",
    issues: 18,
    updatedAt: "5 days ago",
  },
  {
    id: "octo/mobile-client",
    name: "mobile-client",
    owner: "octo",
    issues: 9,
    updatedAt: "1 week ago",
  },
];

const ISSUE_TYPE_OPTIONS = [
  { id: "bug", label: "Bug", icon: MdBugReport, color: "text-red-500" },
  {
    id: "feature",
    label: "Feature",
    icon: MdRocketLaunch,
    color: "text-blue-500",
  },
  { id: "task", label: "Task", icon: MdFolder, color: "text-slate-500" },
  {
    id: "improvement",
    label: "Improvement",
    icon: MdTrendingUp,
    color: "text-emerald-500",
  },
  { id: "tech", label: "Tech Debt", icon: MdCode, color: "text-amber-500" },
];

const PREVIEW_ROWS = [
  {
    id: "GH-112",
    title: "Fix checkout crash on iOS Safari",
    type: "Bug",
    assignee: "Jordan Lee",
    status: "Open",
  },
  {
    id: "GH-118",
    title: "Add Stripe checkout fallback",
    type: "Feature",
    assignee: "Priya Nair",
    status: "Open",
  },
  {
    id: "GH-120",
    title: "Update product list skeletons",
    type: "Task",
    assignee: "Sam Okafor",
    status: "Closed",
  },
];

export default function GitHubImportPage() {
  const router = useRouter();
  const [connected, setConnected] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ImportFormValues>({
    resolver: zodResolver(IMPORT_SCHEMA),
    defaultValues: {
      repository: "",
      projectId: mockProjects[0]?.id ?? "",
      issueTypes: ["bug", "feature"],
      includeClosed: true,
      mapAssignees: true,
      defaultAssignee: "",
    },
  });

  const issueTypes = useWatch({ control, name: "issueTypes" }) ?? [];
  const mapAssignees = useWatch({ control, name: "mapAssignees" });
  const repository = useWatch({ control, name: "repository" });
  const projectId = useWatch({ control, name: "projectId" });
  const includeClosed = useWatch({ control, name: "includeClosed" });

  const toggleIssueType = (type: string) => {
    const next = issueTypes.includes(type)
      ? issueTypes.filter((t) => t !== type)
      : [...issueTypes, type];
    setValue("issueTypes", next, { shouldValidate: true });
  };

  const onSubmit = handleSubmit((values) => {
    toast.success(
      `Imported issues from ${values.repository} into your workspace!`,
    );
    router.push("/issues");
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GitHub Import</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Bring GitHub issues into DevFlow with a guided import flow.
          </p>
        </div>
        <Link href="/issues">
          <Button
            size="sm"
            variant="outline"
            className="border-gray-200 text-gray-700"
          >
            View issues
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form id="github-import-form" onSubmit={onSubmit} className="space-y-6">
          {/* Connection */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Connect GitHub
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Authorize DevFlow to read repositories and issues.
                </p>
              </div>
              <Button
                size="sm"
                className={`${
                  connected
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-blue-600 hover:bg-blue-500"
                } text-white`}
                onPress={() => {
                  setConnected(true);
                  toast.success("GitHub connected (mock).");
                }}
              >
                {connected ? (
                  <>
                    <MdCloudDone className="text-base" />
                    Connected
                  </>
                ) : (
                  <>
                    <MdCloudUpload className="text-base" />
                    Connect GitHub
                  </>
                )}
              </Button>
            </div>
          </section>

          {/* Repository selection */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900">
              Select Repository
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose a repository to pull issues from.
            </p>
            <div className="mt-4">
              <select
                {...register("repository")}
                disabled={!connected}
                className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors ${
                  connected
                    ? "border-gray-200 text-gray-800"
                    : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                }`}
              >
                <option value="">Select a repository</option>
                {REPOSITORIES.map((repo) => (
                  <option key={repo.id} value={repo.id}>
                    {repo.owner}/{repo.name} · {repo.issues} issues
                  </option>
                ))}
              </select>
              {errors.repository && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.repository.message}
                </p>
              )}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {REPOSITORIES.map((repo) => (
                <div
                  key={repo.id}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {repo.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {repo.owner} · {repo.issues} issues
                  </p>
                  <p className="text-[11px] text-gray-400 mt-2">
                    Updated {repo.updatedAt}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Import settings */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900">
              Import Settings
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Map GitHub issues to your DevFlow project.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DevFlow Project
                </label>
                <select
                  {...register("projectId")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                >
                  {mockProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                {errors.projectId && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.projectId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Assignee
                </label>
                <select
                  {...register("defaultAssignee")}
                  disabled={mapAssignees}
                  className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 ${
                    mapAssignees
                      ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                      : "border-gray-200 text-gray-800"
                  }`}
                >
                  <option value="">Unassigned</option>
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  {...register("includeClosed")}
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                />
                Import closed issues as Done
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  {...register("mapAssignees")}
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                />
                Map GitHub assignees to DevFlow users
              </label>
            </div>
          </section>

          {/* Issue types */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900">
              Issue Type Mapping
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select which GitHub labels should import as DevFlow issue types.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {ISSUE_TYPE_OPTIONS.map((option) => {
                const active = issueTypes.includes(option.id);
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleIssueType(option.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                      active
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <Icon className={`text-lg ${option.color}`} />
                    <span className="text-sm font-medium text-gray-800">
                      {option.label}
                    </span>
                    {active && (
                      <MdCheckCircle className="text-blue-600 text-base ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
            {errors.issueTypes && (
              <p className="text-xs text-red-500 mt-2">
                {errors.issueTypes.message}
              </p>
            )}
          </section>

          {/* Preview */}
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900">
              Import Preview
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              A quick preview of the first few issues to import.
            </p>
            <div className="mt-4 overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">Issue</th>
                    <th className="text-left px-4 py-2 font-medium">Type</th>
                    <th className="text-left px-4 py-2 font-medium">
                      Assignee
                    </th>
                    <th className="text-left px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PREVIEW_ROWS.map((row) => (
                    <tr key={row.id} className="border-t border-gray-200">
                      <td className="px-4 py-2 text-gray-800">
                        <span className="text-xs text-gray-400 mr-2">
                          {row.id}
                        </span>
                        {row.title}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{row.type}</td>
                      <td className="px-4 py-2 text-gray-600">
                        {row.assignee}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </form>

        <aside className="bg-white rounded-xl border border-gray-200 p-5 h-fit">
          <h2 className="text-base font-semibold text-gray-900">Summary</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review the configuration before importing.
          </p>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Repository</span>
              <span className="text-gray-900 font-medium">
                {repository || "Not selected"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Project</span>
              <span className="text-gray-900 font-medium">
                {mockProjects.find((p) => p.id === projectId)?.name ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Issue Types</span>
              <span className="text-gray-900 font-medium">
                {issueTypes.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Include Closed</span>
              <span className="text-gray-900 font-medium">
                {includeClosed ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <Button
            size="md"
            type="submit"
            form="github-import-form"
            isDisabled={isSubmitting}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium"
          >
            {isSubmitting ? "Importing..." : "Import issues"}
          </Button>
          <p className="text-xs text-gray-400 mt-3">
            This is a mock import flow. No data is sent to GitHub.
          </p>
        </aside>
      </div>
    </div>
  );
}
