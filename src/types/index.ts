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
