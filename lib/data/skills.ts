export type SkillCategory =
  | "Front-end"
  | "Back-end"
  | "Database"
  | "Tools"
  | "Design"
  | "Video"
  | "Languages";

export type SkillItem = {
  name: string;
  level: "Advanced" | "Proficient" | "Intermediate";
};

export const skillsByCategory: Record<SkillCategory, SkillItem[]> = {
  "Front-end": [
    { name: "HTML5", level: "Advanced" },
    { name: "CSS3", level: "Advanced" },
    { name: "Tailwind", level: "Advanced" },
    { name: "Bootstrap", level: "Advanced" },
    { name: "JavaScript ES6+", level: "Advanced" },
    { name: "React", level: "Advanced" },
    { name: "Next.js", level: "Advanced" },
    { name: "Vue", level: "Proficient" },
    { name: "Angular", level: "Proficient" },
  ],
  "Back-end": [
    { name: "PHP", level: "Advanced" },
    { name: "Laravel", level: "Advanced" },
    { name: "Python", level: "Proficient" },
    { name: "REST API Development", level: "Advanced" },
  ],
  Database: [
    { name: "MySQL", level: "Advanced" },
    { name: "PostgreSQL", level: "Proficient" },
    { name: "SQL Server", level: "Proficient" },
    { name: "Supabase", level: "Advanced" },
    { name: "AWS DynamoDB", level: "Intermediate" },
  ],
  Tools: [
    { name: "Git", level: "Advanced" },
    { name: "GitHub", level: "Advanced" },
    { name: "Responsive Web Design", level: "Advanced" },
    { name: "SEO Optimization", level: "Advanced" },
    { name: "API Integration", level: "Advanced" },
  ],
  Design: [
    { name: "Photoshop", level: "Advanced" },
    { name: "Illustrator", level: "Advanced" },
    { name: "Figma", level: "Advanced" },
    { name: "Canva", level: "Advanced" },
    { name: "Lightroom", level: "Proficient" },
  ],
  Video: [
    { name: "Premiere Pro", level: "Advanced" },
    { name: "DaVinci Resolve", level: "Proficient" },
    { name: "CapCut", level: "Advanced" },
    { name: "Filmora", level: "Advanced" },
  ],
  Languages: [
    { name: "English", level: "Advanced" },
    { name: "Filipino", level: "Advanced" },
    { name: "Waray-waray", level: "Advanced" },
  ],
};

export const skillCloud = [
  "Next.js",
  "TypeScript",
  "React",
  "Laravel",
  "PHP",
  "Python",
  "REST APIs",
  "MySQL",
  "PostgreSQL",
  "Supabase",
  "Tailwind",
  "Figma",
  "SEO",
  "Performance",
  "GSAP",
  "Framer Motion",
] as const;

