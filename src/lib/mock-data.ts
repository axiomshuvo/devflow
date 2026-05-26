import type {
  ActivityLog,
  Comment,
  Issue,
  Notification,
  Project,
  User,
} from "@/types";

// ─── Users ────────────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alex Carter",
    email: "alex@devflow.io",
    imageUrl: "https://i.pravatar.cc/40?u=alex",
    role: "ADMIN",
    createdAt: "2025-01-10T08:00:00Z",
  },
  {
    id: "u2",
    name: "Priya Nair",
    email: "priya@devflow.io",
    imageUrl: "https://i.pravatar.cc/40?u=priya",
    role: "MANAGER",
    createdAt: "2025-01-12T09:00:00Z",
  },
  {
    id: "u3",
    name: "Jordan Lee",
    email: "jordan@devflow.io",
    imageUrl: "https://i.pravatar.cc/40?u=jordan",
    role: "DEVELOPER",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "u4",
    name: "Sam Okafor",
    email: "sam@devflow.io",
    imageUrl: "https://i.pravatar.cc/40?u=sam",
    role: "DEVELOPER",
    createdAt: "2025-02-01T11:00:00Z",
  },
  {
    id: "u5",
    name: "Morgan Wu",
    email: "morgan@devflow.io",
    imageUrl: "https://i.pravatar.cc/40?u=morgan",
    role: "VIEWER",
    createdAt: "2025-02-10T12:00:00Z",
  },
];

export const currentUser = mockUsers[0];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "E-Commerce Website",
    key: "ECOM",
    description:
      "Redesign and rebuild the main storefront with new checkout flow.",
    status: "ACTIVE",
    startDate: "2025-02-01T00:00:00Z",
    targetDate: "2025-06-30T00:00:00Z",
    createdAt: "2025-01-28T00:00:00Z",
    issueCount: 24,
    completedCount: 9,
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
  },
  {
    id: "p2",
    name: "DevFlow API",
    key: "DAPI",
    description: "Internal REST API powering the DevFlow platform.",
    status: "ACTIVE",
    startDate: "2025-03-01T00:00:00Z",
    targetDate: "2025-08-31T00:00:00Z",
    createdAt: "2025-02-25T00:00:00Z",
    issueCount: 18,
    completedCount: 11,
    members: [mockUsers[0], mockUsers[2], mockUsers[3]],
  },
  {
    id: "p3",
    name: "Mobile App",
    key: "MOB",
    description: "React Native app for iOS and Android.",
    status: "ON_HOLD",
    startDate: "2025-04-01T00:00:00Z",
    targetDate: "2025-12-31T00:00:00Z",
    createdAt: "2025-03-20T00:00:00Z",
    issueCount: 10,
    completedCount: 2,
    members: [mockUsers[1], mockUsers[3]],
  },
];

// ─── Issues ───────────────────────────────────────────────────────────────────

export const mockIssues: Issue[] = [
  {
    id: "i1",
    projectId: "p1",
    projectKey: "ECOM",
    issueKey: "ECOM-1",
    title: "Fix checkout page crash on mobile Safari",
    description:
      "The checkout page throws a JavaScript error on iOS Safari 16 when the user taps 'Place Order'. Stack trace attached.",
    type: "BUG",
    status: "IN_PROGRESS",
    priority: "CRITICAL",
    dueDate: "2025-05-20T00:00:00Z",
    assignee: mockUsers[2],
    reporter: mockUsers[1],
    labels: [{ id: "l1", name: "bug", color: "red" }],
    commentCount: 4,
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-15T14:00:00Z",
  },
  {
    id: "i2",
    projectId: "p1",
    projectKey: "ECOM",
    issueKey: "ECOM-2",
    title: "Add product image zoom feature",
    description:
      "Implement pinch-to-zoom and click-to-zoom for product images on the detail page.",
    type: "FEATURE",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "2025-06-15T00:00:00Z",
    assignee: mockUsers[3],
    reporter: mockUsers[0],
    labels: [{ id: "l2", name: "frontend", color: "blue" }],
    commentCount: 1,
    createdAt: "2025-05-05T09:00:00Z",
    updatedAt: "2025-05-05T09:00:00Z",
  },
  {
    id: "i3",
    projectId: "p2",
    projectKey: "DAPI",
    issueKey: "DAPI-1",
    title: "Implement rate limiting on /issues endpoint",
    description:
      "Add per-IP rate limiting (100 req/min) using Redis. Return 429 with Retry-After header.",
    type: "IMPROVEMENT",
    status: "IN_REVIEW",
    priority: "HIGH",
    dueDate: "2025-05-25T00:00:00Z",
    assignee: mockUsers[2],
    reporter: mockUsers[0],
    labels: [
      { id: "l3", name: "backend", color: "green" },
      { id: "l4", name: "security", color: "orange" },
    ],
    commentCount: 6,
    createdAt: "2025-05-08T11:00:00Z",
    updatedAt: "2025-05-18T16:00:00Z",
  },
  {
    id: "i4",
    projectId: "p2",
    projectKey: "DAPI",
    issueKey: "DAPI-2",
    title: "Write integration tests for auth routes",
    description:
      "Cover login, register, refresh token and logout endpoints with Jest + Supertest.",
    type: "TASK",
    status: "BACKLOG",
    priority: "LOW",
    assignee: mockUsers[3],
    reporter: mockUsers[1],
    labels: [{ id: "l5", name: "testing", color: "purple" }],
    commentCount: 0,
    createdAt: "2025-05-10T08:00:00Z",
    updatedAt: "2025-05-10T08:00:00Z",
  },
  {
    id: "i5",
    projectId: "p1",
    projectKey: "ECOM",
    issueKey: "ECOM-3",
    title: "Update product listing page design",
    type: "IMPROVEMENT",
    status: "DONE",
    priority: "MEDIUM",
    assignee: mockUsers[2],
    reporter: mockUsers[1],
    commentCount: 3,
    createdAt: "2025-04-20T10:00:00Z",
    updatedAt: "2025-05-12T09:00:00Z",
  },
  {
    id: "i6",
    projectId: "p3",
    projectKey: "MOB",
    issueKey: "MOB-1",
    title: "Set up React Native project structure",
    type: "TASK",
    status: "DONE",
    priority: "HIGH",
    assignee: mockUsers[3],
    reporter: mockUsers[0],
    commentCount: 2,
    createdAt: "2025-04-01T09:00:00Z",
    updatedAt: "2025-04-10T15:00:00Z",
  },
  {
    id: "i7",
    projectId: "p1",
    projectKey: "ECOM",
    issueKey: "ECOM-4",
    title: "Integrate Stripe payment gateway",
    type: "FEATURE",
    status: "BLOCKED",
    priority: "HIGH",
    dueDate: "2025-06-01T00:00:00Z",
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    labels: [{ id: "l6", name: "payments", color: "yellow" }],
    commentCount: 8,
    createdAt: "2025-04-15T12:00:00Z",
    updatedAt: "2025-05-19T11:00:00Z",
  },
];

// ─── Comments ─────────────────────────────────────────────────────────────────

export const mockComments: Comment[] = [
  {
    id: "c1",
    issueId: "i1",
    user: mockUsers[1],
    body: "Reproduced locally. The issue is with the async payment handler timing out.",
    createdAt: "2025-05-02T10:00:00Z",
    updatedAt: "2025-05-02T10:00:00Z",
  },
  {
    id: "c2",
    issueId: "i1",
    user: mockUsers[2],
    body: "I found the culprit — the promise was not being awaited in `handlePlaceOrder`. Fix is in PR #42.",
    createdAt: "2025-05-14T15:00:00Z",
    updatedAt: "2025-05-14T15:00:00Z",
  },
  {
    id: "c3",
    issueId: "i3",
    user: mockUsers[0],
    body: "Please also add the rate limit headers to the response so clients can self-regulate.",
    createdAt: "2025-05-10T09:00:00Z",
    updatedAt: "2025-05-10T09:00:00Z",
  },
];

// ─── Activity ─────────────────────────────────────────────────────────────────

export const mockActivity: ActivityLog[] = [
  {
    id: "a1",
    user: mockUsers[2],
    action: "changed status",
    details: "Status changed from TODO to IN_PROGRESS on ECOM-1",
    createdAt: "2025-05-15T14:00:00Z",
  },
  {
    id: "a2",
    user: mockUsers[1],
    action: "created issue",
    details: "Created DAPI-1: Implement rate limiting on /issues endpoint",
    createdAt: "2025-05-08T11:00:00Z",
  },
  {
    id: "a3",
    user: mockUsers[0],
    action: "assigned issue",
    details: "Assigned ECOM-4 to Priya Nair",
    createdAt: "2025-05-07T16:00:00Z",
  },
  {
    id: "a4",
    user: mockUsers[3],
    action: "closed issue",
    details: "Marked ECOM-3 as DONE",
    createdAt: "2025-05-12T09:00:00Z",
  },
  {
    id: "a5",
    user: mockUsers[2],
    action: "commented",
    details: "Commented on ECOM-1",
    createdAt: "2025-05-14T15:00:00Z",
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Issue Assigned",
    message: "Alex Carter assigned ECOM-4 to you",
    type: "assignment",
    createdAt: "2025-05-07T16:00:00Z",
  },
  {
    id: "n2",
    title: "Mentioned in Comment",
    message: "Jordan Lee mentioned you in ECOM-1",
    type: "mention",
    readAt: "2025-05-15T10:00:00Z",
    createdAt: "2025-05-14T15:00:00Z",
  },
  {
    id: "n3",
    title: "Status Changed",
    message: "DAPI-1 moved to IN_REVIEW",
    type: "status_change",
    createdAt: "2025-05-18T16:00:00Z",
  },
  {
    id: "n4",
    title: "Due Date Approaching",
    message: "ECOM-1 is due in 2 days",
    type: "due_date",
    createdAt: "2025-05-18T08:00:00Z",
  },
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export const dashboardStats = {
  totalIssues: 52,
  openIssues: 34,
  completedIssues: 18,
  overdueIssues: 5,
  totalProjects: 3,
  activeProjects: 2,
  teamMembers: 5,
};

export const weeklyTrend = [
  { week: "Apr 28", created: 8, resolved: 5 },
  { week: "May 5", created: 12, resolved: 7 },
  { week: "May 12", created: 6, resolved: 9 },
  { week: "May 19", created: 10, resolved: 8 },
  { week: "May 26", created: 7, resolved: 6 },
];

export const issuesByStatus = [
  { status: "Backlog", count: 8 },
  { status: "To Do", count: 12 },
  { status: "In Progress", count: 9 },
  { status: "In Review", count: 5 },
  { status: "Done", count: 18 },
];

export const issuesByPriority = [
  { priority: "Critical", count: 4 },
  { priority: "High", count: 11 },
  { priority: "Medium", count: 22 },
  { priority: "Low", count: 15 },
];
