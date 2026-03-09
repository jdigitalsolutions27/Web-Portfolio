export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  category: "Advocacy" | "Dashboard" | "Web App" | "Portfolio" | "Platform";
  screenshot: string;
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    slug: "ph-haiyan-nasecore-advocacy-platform",
    title: "PH Haiyan x NASECORE Advocacy Platform",
    shortDescription:
      "A high-impact advocacy website for disaster resilience storytelling, volunteer onboarding, and donation workflows.",
    problem:
      "The advocacy team needed a modern, mobile-first site to present campaign stories, collect volunteer signups, and centralize outreach updates.",
    solution:
      "Built a performance-focused Next.js platform with CMS-friendly sections, SEO structure, and donor conversion-optimized CTAs.",
    highlights: [
      "Structured long-form narratives with clear impact metrics",
      "Optimized pages for low-bandwidth users",
      "Integrated inquiry and volunteer forms with validation",
    ],
    metrics: [
      { label: "Performance Score", value: "95" },
      { label: "Volunteer Signups", value: "+42%" },
      { label: "Bounce Rate", value: "-28%" },
    ],
    tags: ["Next.js", "TypeScript", "SEO", "Supabase", "Advocacy"],
    category: "Advocacy",
    screenshot: "/images/projects/project-01.svg",
    featured: true,
    liveUrl: "https://example.com/live/haiyan-nasecore",
    githubUrl: "https://github.com/example/haiyan-nasecore",
  },
  {
    slug: "barangay-services-portal",
    title: "Barangay Services Portal",
    shortDescription:
      "A digital request and tracking portal for document requests, announcements, and resident services.",
    problem:
      "Manual paperwork and walk-in requests created long queues and poor status visibility.",
    solution:
      "Developed a full-stack portal with role-based access, request lifecycle tracking, and SMS-ready notification hooks.",
    highlights: [
      "Admin dashboard with filterable queues",
      "Resident account and status timeline",
      "Exportable monthly service reports",
    ],
    metrics: [
      { label: "Request Time", value: "-55%" },
      { label: "Manual Errors", value: "-36%" },
      { label: "Digital Adoption", value: "78%" },
    ],
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    category: "Web App",
    screenshot: "/images/projects/project-02.svg",
    featured: true,
    liveUrl: "https://example.com/live/barangay",
    githubUrl: "https://github.com/example/barangay-portal",
  },
  {
    slug: "education-support-dashboard",
    title: "Education IT Support Dashboard",
    shortDescription:
      "Ticketing and asset monitoring dashboard for hardware, software, and network support workflows.",
    problem:
      "Support issues were scattered across chat and spreadsheets, making SLAs hard to track.",
    solution:
      "Shipped a React dashboard with prioritized queues, analytics, and status automations for campus support teams.",
    highlights: [
      "Issue triage with urgency labels",
      "Live progress tracking and ownership",
      "Insights view for recurring incidents",
    ],
    metrics: [
      { label: "Resolution Speed", value: "+37%" },
      { label: "Missed SLAs", value: "-48%" },
      { label: "Ops Visibility", value: "100%" },
    ],
    tags: ["React", "Node API", "PostgreSQL", "Charts"],
    category: "Dashboard",
    screenshot: "/images/projects/project-03.svg",
    featured: true,
    liveUrl: "https://example.com/live/it-dashboard",
    githubUrl: "https://github.com/example/it-support-dashboard",
  },
  {
    slug: "creative-agency-portfolio-suite",
    title: "Creative Agency Portfolio Suite",
    shortDescription:
      "A premium portfolio web suite for showcasing branding, video, and web case studies.",
    problem:
      "The agency needed a single platform to present multidisciplinary work while maintaining consistent brand identity.",
    solution:
      "Designed and developed a modular Next.js portfolio with animated showcases and SEO-rich case pages.",
    highlights: [
      "Visual storytelling blocks for mixed media",
      "Fast loading with optimized image strategy",
      "Reusable section system for rapid updates",
    ],
    metrics: [
      { label: "Session Duration", value: "+31%" },
      { label: "Lead Inquiries", value: "+24%" },
      { label: "CLS", value: "0.02" },
    ],
    tags: ["Next.js", "Framer Motion", "MDX", "Figma"],
    category: "Portfolio",
    screenshot: "/images/projects/project-04.svg",
    featured: true,
    liveUrl: "https://example.com/live/agency-suite",
    githubUrl: "https://github.com/example/agency-portfolio",
  },
  {
    slug: "clinic-booking-and-inquiry-system",
    title: "Clinic Booking & Inquiry System",
    shortDescription:
      "A responsive booking app with calendar slots, patient inquiry forms, and admin overview.",
    problem:
      "Appointments were managed manually which caused overbooking and missed follow-ups.",
    solution:
      "Implemented booking workflows, reminder-ready APIs, and optimized forms with clear UX for mobile users.",
    highlights: [
      "Real-time slot availability",
      "Intuitive patient onboarding",
      "Admin queue and cancellation controls",
    ],
    metrics: [
      { label: "No-Shows", value: "-22%" },
      { label: "Booking Time", value: "< 2 min" },
      { label: "Mobile Conversion", value: "+34%" },
    ],
    tags: ["Vue", "PHP", "MySQL", "REST API"],
    category: "Web App",
    screenshot: "/images/projects/project-05.svg",
    featured: true,
    liveUrl: "https://example.com/live/clinic-booking",
    githubUrl: "https://github.com/example/clinic-booking",
  },
  {
    slug: "freelance-invoice-admin-panel",
    title: "Freelance Invoice Admin Panel",
    shortDescription:
      "A full-feature admin panel for invoices, project milestones, and client communication.",
    problem:
      "Freelancers used fragmented tools for billing and milestone tracking.",
    solution:
      "Created a unified dashboard with invoice generation, payment status tracking, and analytics widgets.",
    highlights: [
      "Role-aware permissions",
      "PDF-ready invoice templates",
      "Revenue snapshots and cashflow trends",
    ],
    metrics: [
      { label: "Billing Time", value: "-40%" },
      { label: "Late Payments", value: "-19%" },
      { label: "Task Completion", value: "+27%" },
    ],
    tags: ["Angular", "Laravel", "SQL Server", "Admin UI"],
    category: "Dashboard",
    screenshot: "/images/projects/project-06.svg",
    featured: true,
    liveUrl: "https://example.com/live/invoice-panel",
    githubUrl: "https://github.com/example/invoice-panel",
  },
  {
    slug: "ngo-volunteer-management-system",
    title: "NGO Volunteer Management System",
    shortDescription:
      "Volunteer onboarding, assignments, and attendance tracking for nonprofit campaigns.",
    problem:
      "Volunteer records were hard to audit and campaign coordinators lacked centralized visibility.",
    solution:
      "Built a robust full-stack system with profile workflows, event assignment, and report exports.",
    highlights: [
      "Structured onboarding pipeline",
      "Smart filtering by location and role",
      "Impact reporting dashboard",
    ],
    metrics: [
      { label: "Volunteer Retention", value: "+18%" },
      { label: "Admin Time", value: "-32%" },
      { label: "Data Accuracy", value: "+45%" },
    ],
    tags: ["React", "Supabase", "Tailwind", "NGO"],
    category: "Platform",
    screenshot: "/images/projects/project-07.svg",
    featured: false,
    liveUrl: "https://example.com/live/volunteer",
    githubUrl: "https://github.com/example/ngo-volunteer",
  },
  {
    slug: "seo-optimized-business-landing-kit",
    title: "SEO-Optimized Business Landing Kit",
    shortDescription:
      "A reusable, high-conversion landing kit for local and international service businesses.",
    problem:
      "Small businesses needed better visibility and conversion but lacked technical SEO execution.",
    solution:
      "Engineered a template system with schema markup, performant UI blocks, and conversion-focused funnels.",
    highlights: [
      "Technical SEO baseline baked in",
      "Core Web Vitals-focused build",
      "A/B-friendly CTA modules",
    ],
    metrics: [
      { label: "Organic Traffic", value: "+63%" },
      { label: "PageSpeed", value: "96" },
      { label: "Lead Conversion", value: "+21%" },
    ],
    tags: ["Next.js", "JSON-LD", "Tailwind", "SEO"],
    category: "Web App",
    screenshot: "/images/projects/project-08.svg",
    featured: false,
    liveUrl: "https://example.com/live/seo-kit",
    githubUrl: "https://github.com/example/seo-kit",
  },
  {
    slug: "multimedia-content-hub",
    title: "Multimedia Content Hub",
    shortDescription:
      "A media-rich platform for publishing design, video, and social campaign assets.",
    problem:
      "Teams needed one organized system to manage campaign assets and publishing timelines.",
    solution:
      "Developed an internal platform with categorized asset libraries and collaboration-friendly metadata.",
    highlights: [
      "Advanced search and tag system",
      "Asset preview for video and image formats",
      "Workflow statuses from draft to publish",
    ],
    metrics: [
      { label: "Asset Retrieval", value: "-58% time" },
      { label: "Reuse Rate", value: "+33%" },
      { label: "Team Throughput", value: "+26%" },
    ],
    tags: ["Next.js", "PostgreSQL", "Storage API", "Workflow"],
    category: "Platform",
    screenshot: "/images/projects/project-09.svg",
    featured: false,
    liveUrl: "https://example.com/live/content-hub",
    githubUrl: "https://github.com/example/content-hub",
  },
  {
    slug: "realtime-community-feedback-app",
    title: "Realtime Community Feedback App",
    shortDescription:
      "A civic feedback platform with sentiment tagging and issue escalation workflows.",
    problem:
      "Communities lacked a structured and transparent channel for reporting local concerns.",
    solution:
      "Built a responsive app with categorized submissions, admin triage, and public status updates.",
    highlights: [
      "Realtime updates with optimistic UI",
      "Issue grouping by urgency and location",
      "Clear public response loop",
    ],
    metrics: [
      { label: "Response Time", value: "-41%" },
      { label: "Engagement", value: "+39%" },
      { label: "Resolved Issues", value: "+29%" },
    ],
    tags: ["React", "Supabase", "Realtime", "Civic Tech"],
    category: "Platform",
    screenshot: "/images/projects/project-10.svg",
    featured: false,
    liveUrl: "https://example.com/live/community-feedback",
    githubUrl: "https://github.com/example/community-feedback",
  },
  {
    slug: "career-services-job-board",
    title: "Career Services Job Board",
    shortDescription:
      "A job board with employer portal, applicant tracking, and profile matching.",
    problem:
      "Graduates and employers needed a simple matching platform with structured screening workflow.",
    solution:
      "Developed a scalable web app with smart filtering, profile completeness scoring, and analytics.",
    highlights: [
      "Employer dashboard and listing control",
      "Applicant pipeline views",
      "Search ranking with profile signals",
    ],
    metrics: [
      { label: "Applications", value: "+47%" },
      { label: "Time-to-Shortlist", value: "-35%" },
      { label: "Employer Return", value: "+30%" },
    ],
    tags: ["Laravel", "MySQL", "Blade", "Analytics"],
    category: "Web App",
    screenshot: "/images/projects/project-11.svg",
    featured: false,
    liveUrl: "https://example.com/live/job-board",
    githubUrl: "https://github.com/example/job-board",
  },
  {
    slug: "smart-inventory-monitor",
    title: "Smart Inventory Monitor",
    shortDescription:
      "An inventory system with low-stock alerts, supplier logs, and performance snapshots.",
    problem:
      "Manual inventory tracking caused stockouts and weak visibility across branches.",
    solution:
      "Implemented a dashboard-first inventory app with role-based access and exportable reports.",
    highlights: [
      "Threshold alerts and reorder planning",
      "Supplier interaction records",
      "Branch-level utilization insights",
    ],
    metrics: [
      { label: "Stockouts", value: "-44%" },
      { label: "Wastage", value: "-17%" },
      { label: "Reporting Time", value: "-62%" },
    ],
    tags: ["Angular", "TypeScript", "SQL Server", "Dashboard"],
    category: "Dashboard",
    screenshot: "/images/projects/project-12.svg",
    featured: false,
    liveUrl: "https://example.com/live/inventory-monitor",
    githubUrl: "https://github.com/example/inventory-monitor",
  },
];

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 6);

export const projectCategories = ["All", "Advocacy", "Dashboard", "Web App", "Portfolio", "Platform"] as const;

