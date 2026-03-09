export type TimelineItem = {
  title: string;
  org: string;
  start: number;
  end: number;
  details: string;
  type: "work" | "education";
};

export const experienceTimeline: TimelineItem[] = [
  {
    title: "Full-Stack Web Developer",
    org: "Freelancing and NGO Web Development",
    start: 2021,
    end: 2026,
    details:
      "Built web platforms, dashboards, and advocacy websites with measurable UX and performance improvements for client and nonprofit initiatives.",
    type: "work",
  },
  {
    title: "Technical Support",
    org: "ACLC College of Tacloban",
    start: 2023,
    end: 2025,
    details:
      "Delivered hardware, software, and network support; improved reliability and issue response time across campus systems.",
    type: "work",
  },
  {
    title: "Social Media Analyst",
    org: "Freelancing",
    start: 2020,
    end: 2025,
    details:
      "Produced analytics-driven content strategy and campaign reporting to improve audience engagement and conversion outcomes.",
    type: "work",
  },
  {
    title: "Video Editor",
    org: "Freelancing",
    start: 2020,
    end: 2025,
    details:
      "Created social and campaign videos from concept to post-production with strong narrative and brand consistency.",
    type: "work",
  },
  {
    title: "Visual Graphic Designer",
    org: "Freelancing",
    start: 2020,
    end: 2025,
    details:
      "Designed visual systems, social assets, and campaign materials aligned with user goals and client branding.",
    type: "work",
  },
  {
    title: "BS in Information Technology (Summa Cum Laude)",
    org: "ACLC College of Tacloban",
    start: 2023,
    end: 2024,
    details: "SY 2023-2024 graduate with academic distinction and strong software engineering foundation.",
    type: "education",
  },
  {
    title: "Diploma in Web Applications Development",
    org: "ACLC College of Tacloban",
    start: 2022,
    end: 2023,
    details: "SY 2022-2023 focused on practical web application architecture and delivery.",
    type: "education",
  },
];

