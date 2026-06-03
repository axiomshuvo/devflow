// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = "ADMIN" | "MANAGER" | "DEVELOPER" | "VIEWER";

export type ProjectStatus = "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED";

export type IssueType = "TASK" | "BUG" | "FEATURE" | "IMPROVEMENT";

export type IssueStatus =
  | "BACKLOG"
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "BLOCKED";

export type IssuePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// ─── Models ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description?: string;
  status: ProjectStatus;
  startDate?: string;
  targetDate?: string;
  createdAt: string;
  issueCount?: number;
  completedCount?: number;
  members?: User[];
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Issue {
  id: string;
  projectId: string;
  projectKey: string;
  issueKey: string;
  title: string;
  description?: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  dueDate?: string;
  assignee?: User;
  reporter: User;
  labels?: Label[];
  commentCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  issueId: string;
  user: User;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  user: User;
  action: string;
  details?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "assignment" | "mention" | "status_change" | "invite" | "due_date";
  readAt?: string;
  createdAt: string;
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export interface StatsCard {
  label: string;
  value: number | string;
  change?: number;
  icon?: string;
}

// ─── Analytics Types ────────────────────────────────────────────────────────

export type AnalyticsIconKey =
  | "totalIssues"
  | "completedIssues"
  | "inProgress"
  | "bugIssues"
  | "activeMembers"
  | "projects"
  | "velocity"
  | "onTrack"
  | "atRisk"
  | "overdue"
  | "cycleTime"
  | "focus"
  | "throughput";

export interface AnalyticsStat {
  id: string;
  label: string;
  value: number | string;
  change: number;
  changeLabel: string;
  iconKey: AnalyticsIconKey;
  iconBg: string;
  iconColor: string;
}

export interface AnalyticsTrendPoint {
  label: string;
  created: number;
  closed: number;
  resolved: number;
}

export interface AnalyticsBreakdownItem {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsProjectSummary {
  id: string;
  name: string;
  key: string;
  icon: string;
  openIssues: number;
  completed: number;
  progress: number;
  velocity: number;
  health: "On Track" | "At Risk" | "Blocked";
  risk: "Low" | "Medium" | "High";
  barColor: string;
}

export interface AnalyticsTeamWorkload {
  id: string;
  name: string;
  initials: string;
  color: string;
  inProgress: number;
  completed: number;
}

export interface AnalyticsSprintProgress {
  sprint: string;
  dateRange: string;
  progress: number;
  completed: string;
  daysLeft: string;
  status: string;
}

export interface AnalyticsProjectVelocityPoint {
  sprint: string;
  completed: number;
  scope: number;
}

export interface AnalyticsRiskSummary {
  label: string;
  value: number;
  color: string;
}

export interface AnalyticsIssueAgingPoint {
  bucket: string;
  count: number;
}

export interface AnalyticsTriagePoint {
  week: string;
  triaged: number;
  created: number;
}

export interface AnalyticsSlaBreach {
  id: string;
  issueKey: string;
  title: string;
  priority: IssuePriority;
  daysOver: number;
}

export interface AnalyticsTeamLeaderboard {
  id: string;
  name: string;
  role: string;
  completed: number;
  quality: number;
  trend: number;
}

export interface AnalyticsFocusPoint {
  week: string;
  focusHours: number;
  meetingHours: number;
}

export interface AnalyticsReport {
  id: string;
  title: string;
  description: string;
  category: string;
  lastRun: string;
  owner: string;
  format: string;
}

export interface AnalyticsExportRecord {
  id: string;
  name: string;
  format: string;
  size: string;
  createdAt: string;
  status: "Complete" | "Failed" | "Processing";
}

export interface AnalyticsSchedule {
  id: string;
  name: string;
  frequency: string;
  nextRun: string;
  recipients: number;
}

export interface AnalyticsDoraMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  target: string;
  status: "Good" | "Warn" | "Critical";
}

export interface AnalyticsDoraTrendPoint {
  month: string;
  deploys: number;
  leadTime: number;
  failureRate: number;
  mttr: number;
}

// ─── Team UI Types ──────────────────────────────────────────────────────────

export type TeamMemberStatus = "Active" | "Away" | "Inactive" | "Pending";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  team: string;
  status: TeamMemberStatus;
  joinedAt: string;
  isCurrentUser?: boolean;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: string;
  invitedAt: string;
}

export interface TeamRole {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  badgeClass: string;
  chartColor: string;
}

export interface TeamPermission {
  id: string;
  action: string;
  description: string;
  access: Record<string, boolean>;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  lead: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  memberCount: number;
  projectCount: number;
  timezone: string;
  members: { name: string; avatarUrl: string }[];
}

export interface TeamTrendPoint {
  date: string;
  members: number;
}

export interface TeamPolicy {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface TeamInviteDefaults {
  defaultRole: string;
  expiryDays: number;
  requireTwoFactor: boolean;
  allowGuestAccess: boolean;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface CustomField {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select";
  required: boolean;
  applicableTo: "issue" | "project";
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  connectedAt?: string;
  description: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastSeen: string;
  isCurrent: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: "paid" | "pending";
}
