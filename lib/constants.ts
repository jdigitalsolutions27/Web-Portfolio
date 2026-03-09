export const SITE_URL = "https://ajcentino.dev";

export const PROFILE = {
  brand: "AJ Centino",
  name: "Alden Jay A. Centino",
  role: "Full-Stack Web Developer",
  photoPath: "/images/profile-photo.jpg",
  location: "Brgy. Hinapolon, Alangalang, Leyte",
  phone: "+63 975 016 5677",
  email: "ajcentz28@gmail.com",
  summary:
    "Summa Cum Laude BSIT graduate and multidisciplinary full-stack developer with a strong foundation in modern UI engineering, graphic design, and video storytelling. I build responsive, user-centered digital products that balance visual polish, accessibility, and measurable performance.",
  avatar: "/images/profile/alden-centino.jpg",
  resumePath: "/cv/alden-jay-centino-cv.pdf",
  links: {
    portfolioOne: "https://e-portfolio.kesug.com",
    portfolioTwo: "https://jaycentz.netlify.app",
    github: "https://github.com/jdigitalsolutions27",
    facebook: "https://www.facebook.com/aldenjaycentz",
    whatsapp: "https://wa.me/639750165677",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Showcase", href: "/showcase" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const HOME_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "signature-stage", label: "Signature Stage" },
  { id: "launch-reel", label: "Launch Reel" },
  { id: "featured-projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "build-process", label: "Process" },
  { id: "cta-home", label: "CTA" },
] as const;

export const ROLE_ROTATOR = [
  "Full-Stack Dev",
  "UI Engineer",
  "Laravel/PHP",
  "React/Next.js",
  "API Builder",
] as const;

export const PROOF_POINTS = [
  "Summa Cum Laude",
  "Full-Stack",
  "SEO & Performance",
  "Modern UI",
] as const;

