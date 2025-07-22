import {
  House,
  User,
  ChartArea,
  Users,
  GraduationCap,
  Presentation,
  BookOpen,
  FileText,
  ListChecks,
  Tags,
  Flag,
  MessageSquareText,
  ScrollText,
  Activity,
  Settings,
  BellRing,
  Inbox,
  MessageCircle,
  MessageSquare,
  CheckCircle2,
  FolderKanban,
  FilePlus,
} from "lucide-react";

export const AdminLinks = [
  {
    label: "Main Main",
    links: [
      {
        title: "Overview",
        url: "/dashboard/admin",
        icon: House,
      },
      {
        title: "Platform Analytics",
        url: "/dashboard/admin/analytics",
        icon: ChartArea,
      },
      {
        title: "Notifications",
        url: "/dashboard/admin/notifications",
        icon: BellRing,
      },
    ],
  },
  {
    label: "User Management",
    links: [
      {
        title: "Manage users",
        url: "/dashboard/admin/users",
        icon: Users,
      },
      {
        title: "Tutors",
        url: "/dashboard/admin/users/tutors",
        icon: Presentation,
      },
      {
        title: "Students",
        url: "/dashboard/admin/users/students",
        icon: GraduationCap,
      },
      {
        title: "Roles and permissions",
        url: "/dashboard/admin/users-roles",
        icon: GraduationCap,
      },
    ],
  },
  {
    label: "Course Management",
    links: [
      {
        title: "Course",
        url: "/dashboard/admin/courses",
        icon: BookOpen,
      },
      {
        title: "Assignments",
        url: "/dashboard/admin/assignments",
        icon: FileText,
      },
      {
        title: "Quizzes",
        url: "/dashboard/admin/users/quizzes",
        icon: ListChecks,
      },
      {
        title: "Category & tags",
        url: "/dashboard/admin/categories",
        icon: Tags,
      },
    ],
  },
  {
    label: "Support",
    links: [
      {
        title: "Feedback & reviews",
        url: "/dashboard/admin/feedback",
        icon: MessageSquareText,
      },
      {
        title: "Report & Flags",
        url: "/dashboard/admin/reports",
        icon: Flag,
      },
    ],
  },
  {
    label: "System",
    links: [
      {
        title: "Settings",
        url: "/dashboard/admin/settings",
        icon: Settings,
      },
      {
        title: "Audit Logs",
        url: "/dashboard/admin/audit-logs",
        icon: ScrollText,
      },
      {
        title: "System status",
        url: "/dashboard/admin/system-status",
        icon: Activity,
      },
    ],
  },
];

export const TutorLinks = [
  {
    label: "Main Menu",
    links: [
      {
        title: "Dashboard",
        url: "/dashboard/tutor",
        icon: House,
      },
      {
        title: "My Analytics",
        url: "/dashboard/tutor/analytics",
        icon: ChartArea,
      },
      {
        title: "Notifications",
        url: "/dashboard/tutor/notifications",
        icon: BellRing,
      },
    ],
  },
  {
    label: "Student Management",
    links: [
      {
        title: "Submissions",
        url: "/dashboard/tutor/users",
        icon: Inbox,
      },
      {
        title: "Grades",
        url: "/dashboard/tutor/grades",
        icon: CheckCircle2,
      },
      {
        title: "Messages",
        url: "/dashboard/tutor/messages",
        icon: MessageSquare,
      },
      {
        title: "Discussions",
        url: "/dashboard/tutor/discussions",
        icon: MessageCircle,
      },
    ],
  },
  {
    label: "Courses",
    links: [
      {
        title: "My Courses",
        url: "/dashboard/tutor/courses",
        icon: BookOpen,
      },
      {
        title: "Create course",
        url: "/dashboard/tutor/course/create",
        icon: FilePlus,
      },
      {
        title: "Assignments",
        url: "/dashboard/tutor/assignments",
        icon: FileText,
      },
      {
        title: "Quizzes",
        url: "/dashboard/tutor/quizzes",
        icon: ListChecks,
      },
      {
        title: "Upload resource",
        url: "/dashboard/tutor/resources",
        icon: FolderKanban,
      },
    ],
  },
  {
    label: "Account",
    links: [
      {
        title: "Profile",
        url: "/dashboard/tutor/profile",
        icon: User,
      },
      {
        title: "Setting",
        url: "/dashboard/tutor/settings",
        icon: Settings,
      },
    ],
  },
];

export const StudentLinks = [
  {
    label: "Main Menu",
    links: [
      {
        title: "Dashboard",
        url: "/dashboard/student",
        icon: House,
      },
      {
        title: "My Analytics",
        url: "/dashboard/student/analytics",
        icon: ChartArea,
      },
      {
        title: "Notifications",
        url: "/dashboard/student/notifications",
        icon: BellRing,
      },
    ],
  },
  {
    label: "Learning management",
    links: [
      {
        title: "My Courses",
        url: "/dashboard/student/users",
        icon: BookOpen,
      },
      {
        title: "Assignments",
        url: "/dashboard/student/assigments",
        icon: FileText,
      },
      {
        title: "Quizzes",
        url: "/dashboard/student/quizzes",
        icon: ListChecks,
      },
    ],
  },
  {
    label: "Engagement",
    links: [
      {
        title: "My Grades",
        url: "/dashboard/student/courses",
        icon: BookOpen,
      },
      {
        title: "Discussions",
        url: "/dashboard/student/discussions",
        icon: MessageCircle,
      },
      {
        title: "Messages",
        url: "/dashboard/student/assignments",
        icon: MessageSquare,
      },
      {
        title: "Notifications",
        url: "/dashboard/student/notifications",
        icon: BellRing,
      },
    ],
  },
  {
    label: "Account",
    links: [
      {
        title: "Profile",
        url: "/dashboard/student/profile",
        icon: User,
      },
      {
        title: "Setting",
        url: "/dashboard/student/settings",
        icon: Settings,
      },
    ],
  },
];
