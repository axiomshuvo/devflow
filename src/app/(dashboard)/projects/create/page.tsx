"use client";

import { currentUser, mockUsers } from "@/lib/mock-data";
import { Avatar, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MdArrowBack,
  MdCalendarToday,
  MdCheckCircleOutline,
  MdChevronRight,
  MdCode,
  MdFolder,
  MdGridView,
  MdImage,
  MdLock,
  MdPhoneIphone,
  MdPublic,
  MdSave,
  MdSmartphone,
} from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

const projectFormSchema = z.object({
  projectName: z.string().min(3, "Project name is required."),
  projectKey: z
    .string()
    .min(2, "Project key must be at least 2 characters.")
    .max(10, "Project key must be 10 characters or less.")
    .regex(/^[A-Z0-9-]+$/, "Use uppercase letters, numbers, or hyphens."),
  description: z.string().min(20, "Add a short project description."),
  category: z.string().min(1, "Choose a category."),
  startDate: z.string().min(1, "Choose a start date."),
  deadline: z.string().optional(),
  projectLead: z.string().min(1, "Choose a project lead."),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

type ProjectType = "software" | "website" | "mobile" | "design";
type ProjectPrivacy = "private" | "public";

const PROJECT_TYPES: {
  value: ProjectType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "software",
    label: "Software",
    description: "Build software applications",
    icon: <MdCode className="text-blue-600 text-2xl" />,
  },
  {
    value: "website",
    label: "Website",
    description: "Create a website or web app",
    icon: <MdFolder className="text-violet-600 text-2xl" />,
  },
  {
    value: "mobile",
    label: "Mobile App",
    description: "Ship Android or iOS experiences",
    icon: <MdSmartphone className="text-emerald-600 text-2xl" />,
  },
  {
    value: "design",
    label: "Design",
    description: "Organize UX and product design work",
    icon: <MdGridView className="text-orange-500 text-2xl" />,
  },
];

const PRIVACY_OPTIONS: {
  value: ProjectPrivacy;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "private",
    label: "Private",
    description: "Only invited members can access this project",
    icon: <MdLock className="text-blue-600 text-xl" />,
  },
  {
    value: "public",
    label: "Public",
    description: "Anyone in the workspace can view this project",
    icon: <MdPublic className="text-slate-500 text-xl" />,
  },
];

const CATEGORY_OPTIONS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Operations",
];

const DEFAULT_SETTINGS = [
  {
    key: "issueTypes",
    title: "Issue Types",
    description: "All issue types",
  },
  {
    key: "workflow",
    title: "Workflows",
    description: "Default workflow",
  },
  {
    key: "taskList",
    title: "Task List",
    description: "To Do, In Progress, Done",
  },
  {
    key: "timeTracking",
    title: "Time Tracking",
    description: "Enabled",
  },
  {
    key: "attachments",
    title: "Attachments",
    description: "Enabled",
  },
  {
    key: "comments",
    title: "Comments",
    description: "Enabled",
  },
] as const;

const STEPS = [
  { id: 1, label: "Project Details" },
  { id: 2, label: "Configure" },
  { id: 3, label: "Team" },
  { id: 4, label: "Review" },
];

const ICONS = [
  {
    key: "folder",
    label: "Folder",
    icon: <MdFolder className="text-xl text-blue-600" />,
    border: "border-blue-200 bg-blue-50",
  },
  {
    key: "code",
    label: "Code",
    icon: <MdCode className="text-xl text-violet-600" />,
    border: "border-violet-200 bg-violet-50",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: <MdPhoneIphone className="text-xl text-emerald-600" />,
    border: "border-emerald-200 bg-emerald-50",
  },
  {
    key: "grid",
    label: "Grid",
    icon: <MdGridView className="text-xl text-orange-500" />,
    border: "border-orange-200 bg-orange-50",
  },
] as const;

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {children}
      {required ? <span className="ml-1 text-rose-500">*</span> : null}
    </label>
  );
}

function ChoiceCard({
  active,
  onClick,
  icon,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition-all ${active ? "border-blue-500 bg-blue-50/70 shadow-sm" : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-white" : "bg-slate-50"}`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-slate-900">{title}</p>
            {active ? (
              <MdCheckCircleOutline className="text-blue-600 text-lg" />
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </button>
  );
}

export default function ProjectCreatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType>("software");
  const [privacy, setPrivacy] = useState<ProjectPrivacy>("private");
  const [selectedIcon, setSelectedIcon] =
    useState<(typeof ICONS)[number]["key"]>("folder");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([
    mockUsers[1].id,
    mockUsers[2].id,
    mockUsers[3].id,
  ]);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);
  const [defaultSettings, setDefaultSettings] = useState({
    issueTypes: true,
    workflow: true,
    taskList: true,
    timeTracking: true,
    attachments: true,
    comments: true,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: "",
      projectKey: "",
      description: "",
      category: "Engineering",
      startDate: "",
      deadline: "",
      projectLead: currentUser.id,
    },
    mode: "onTouched",
  });

  const values = watch();
  const leadUser =
    mockUsers.find((user) => user.id === values.projectLead) ?? currentUser;
  const previewIcon =
    ICONS.find((item) => item.key === selectedIcon) ?? ICONS[0];
  const selectedTeam = mockUsers.filter((user) =>
    selectedMembers.includes(user.id),
  );
  const completion = Math.round((activeStep / STEPS.length) * 100);

  function toggleMember(memberId: string) {
    setSelectedMembers((current) =>
      current.includes(memberId)
        ? current.filter((id) => id !== memberId)
        : [...current, memberId],
    );
  }

  function toggleSetting(key: keyof typeof defaultSettings) {
    setDefaultSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleAvatarPick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setAvatarFileName(file?.name ?? null);
  }

  function onSubmit(valuesToSave: ProjectFormValues) {
    if (activeStep < STEPS.length) {
      setActiveStep((current) => Math.min(current + 1, STEPS.length));
      toast.info(`Saved step ${activeStep} locally.`);
      return;
    }

    toast.success(`Created ${valuesToSave.projectName} in the mock workspace.`);
    router.push("/projects");
  }

  return (
    <div className="min-h-full bg-linear-to-br from-slate-50 via-white to-blue-50/50 px-6 py-6">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 px-6 py-5 shadow-sm backdrop-blur sm:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/projects" className="hover:text-blue-600">
              Projects
            </Link>
            <MdChevronRight className="text-slate-300" />
            <span className="text-slate-800">Create New Project</span>
          </nav>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Create New Project
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Set up your project details and get started in minutes.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <MdFolder className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Mock workspace</p>
                <p className="text-xs text-slate-500">Frontend-only phase</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {STEPS.map((step) => {
              const active = step.id === activeStep;
              const complete = step.id < activeStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className="flex items-center gap-3"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${active ? "bg-blue-600 text-white" : complete ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}
                  >
                    {step.id}
                  </span>
                  <span
                    className={`text-sm font-medium ${active ? "text-blue-700" : complete ? "text-slate-900" : "text-slate-400"}`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-600 to-cyan-500 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"
        >
          <div className="space-y-6">
            <SectionCard
              title="Basic Information"
              description="Give the project a clear identity and scope."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-1">
                  <FieldLabel required>Project Name</FieldLabel>
                  <input
                    {...register("projectName")}
                    placeholder="Enter project name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  {errors.projectName ? (
                    <p className="mt-2 text-xs text-rose-500">
                      {errors.projectName.message}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-1">
                  <FieldLabel required>Project Key</FieldLabel>
                  <input
                    {...register("projectKey", {
                      setValueAs: (value: string) =>
                        value
                          .toUpperCase()
                          .replace(/[^A-Z0-9-]/g, "")
                          .slice(0, 10),
                    })}
                    placeholder="Enter project key"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  {errors.projectKey ? (
                    <p className="mt-2 text-xs text-rose-500">
                      {errors.projectKey.message}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <FieldLabel required>Description</FieldLabel>
                  <textarea
                    {...register("description")}
                    rows={5}
                    placeholder="Describe the project goals, scope, and objectives..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  {errors.description ? (
                    <p className="mt-2 text-xs text-rose-500">
                      {errors.description.message}
                    </p>
                  ) : null}
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Project Type"
              description="Choose the template that best matches your work."
            >
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {PROJECT_TYPES.map((type) => (
                  <ChoiceCard
                    key={type.value}
                    active={projectType === type.value}
                    onClick={() => {
                      setProjectType(type.value);
                      setValue("category", type.label, {
                        shouldValidate: true,
                      });
                    }}
                    icon={type.icon}
                    title={type.label}
                    description={type.description}
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Privacy & Scheduling"
              description="Control access and set key dates before launch."
            >
              <div className="space-y-6">
                <div className="grid gap-3 md:grid-cols-2">
                  {PRIVACY_OPTIONS.map((option) => (
                    <ChoiceCard
                      key={option.value}
                      active={privacy === option.value}
                      onClick={() => setPrivacy(option.value)}
                      icon={option.icon}
                      title={option.label}
                      description={option.description}
                    />
                  ))}
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <FieldLabel required>Category</FieldLabel>
                    <select
                      {...register("category")}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    >
                      {CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.category ? (
                      <p className="mt-2 text-xs text-rose-500">
                        {errors.category.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <FieldLabel required>Start Date</FieldLabel>
                    <input
                      {...register("startDate")}
                      type="date"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                    {errors.startDate ? (
                      <p className="mt-2 text-xs text-rose-500">
                        {errors.startDate.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <FieldLabel>Deadline</FieldLabel>
                    <input
                      {...register("deadline")}
                      type="date"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Project Avatar"
              description="Upload an image or pick a simple icon for the project."
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 px-6 text-center transition hover:border-blue-400 hover:bg-blue-50"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                    <MdImage className="text-3xl" />
                  </div>
                  <p className="font-semibold text-slate-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    PNG, JPG or SVG (max 2MB)
                  </p>
                  {avatarFileName ? (
                    <p className="mt-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
                      {avatarFileName}
                    </p>
                  ) : null}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    className="hidden"
                    onChange={handleAvatarPick}
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    Or choose an icon
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {ICONS.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setSelectedIcon(item.key)}
                        className={`flex flex-col items-center justify-center rounded-2xl border px-4 py-5 transition ${selectedIcon === item.key ? `${item.border} ring-2 ring-blue-200` : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"}`}
                      >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Team Members"
              description="Add people who will collaborate on this project."
            >
              <div className="flex flex-wrap gap-3">
                {mockUsers.map((member) => {
                  const active = selectedMembers.includes(member.id);
                  const initials = member.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("");

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => toggleMember(member.id)}
                      className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition ${active ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"}`}
                    >
                      <Avatar size="sm" className="h-9 w-9">
                        <Avatar.Image src={member.imageUrl} alt={member.name} />
                        <Avatar.Fallback>{initials}</Avatar.Fallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-medium text-slate-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {member.role.toLowerCase()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <div className="text-sm text-slate-600">
                Step {activeStep} of {STEPS.length} is active. The next click
                saves this slice locally.
              </div>
              <div className="flex items-center gap-3">
                <Link href="/projects">
                  <Button
                    variant="outline"
                    className="border-slate-200 text-slate-700"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-blue-600 px-5 font-medium text-white hover:bg-blue-500"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Saving..."
                  ) : activeStep < STEPS.length ? (
                    <>
                      Save &amp; Continue
                      <MdArrowBack className="rotate-180 text-base" />
                    </>
                  ) : (
                    <>
                      Create Project
                      <MdSave className="text-base" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <SectionCard
              title="Project Summary"
              description="A live preview of what your team will see."
            >
              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                    {previewIcon.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-slate-900">
                      {values.projectName || "Project name will appear here"}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-500">
                      {values.category || "Category"}
                    </p>
                    <div className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      {projectType.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <SummaryRow label="Key" value={values.projectKey || "-"} />
                  <SummaryRow
                    label="Privacy"
                    value={privacy === "private" ? "Private" : "Public"}
                  />
                  <SummaryRow
                    label="Lead"
                    value={leadUser.name}
                    avatar={leadUser.imageUrl}
                  />
                  <SummaryRow
                    label="Start Date"
                    value={values.startDate || "-"}
                    icon={<MdCalendarToday className="text-slate-400" />}
                  />
                  <SummaryRow
                    label="Deadline"
                    value={values.deadline || "Not set"}
                    icon={<MdCalendarToday className="text-slate-400" />}
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Team members ({selectedTeam.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.map((member) => (
                      <span
                        key={member.id}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        {member.name.split(" ")[0]}
                      </span>
                    ))}
                    {selectedTeam.length === 0 ? (
                      <span className="text-xs text-slate-500">
                        No members selected yet.
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Default Settings"
              description="Fine-tune project behavior before launch."
            >
              <div className="space-y-4">
                {DEFAULT_SETTINGS.map((setting) => {
                  const enabled = defaultSettings[setting.key];

                  return (
                    <button
                      key={setting.key}
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      onClick={() => toggleSetting(setting.key)}
                      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-blue-200 hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {setting.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {setting.description}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${enabled ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                      >
                        {enabled ? "Enabled" : "Disabled"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard
              title="Need Help?"
              description="You can adjust these settings later from project settings."
            >
              <div className="rounded-2xl bg-blue-50/70 px-4 py-4 text-sm text-slate-600">
                Everything on this page is wired with local state so you can
                test the flow before backend work lands.
              </div>
            </SectionCard>
          </aside>
        </form>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  avatar,
  icon,
}: {
  label: string;
  value: string;
  avatar?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
        {icon ? <span>{icon}</span> : null}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 text-right text-sm font-medium text-slate-900">
        {avatar ? (
          <Avatar size="sm" className="h-6 w-6">
            <Avatar.Image src={avatar} alt={value} />
            <Avatar.Fallback>{value.charAt(0)}</Avatar.Fallback>
          </Avatar>
        ) : null}
        <span className="max-w-36 truncate">{value}</span>
      </div>
    </div>
  );
}
