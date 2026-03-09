export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alden consistently delivered clean code, polished UI, and clear communication. The final product exceeded what we initially scoped.",
    name: "Project Lead",
    role: "NGO Advocacy Team",
  },
  {
    quote:
      "Fast, reliable, and detail-oriented. He improved our dashboard usability and made reporting significantly easier.",
    name: "Operations Manager",
    role: "Education Support Unit",
  },
  {
    quote:
      "From design to deployment, the process felt structured and premium. The site now performs better and converts better.",
    name: "Small Business Owner",
    role: "Service Brand Client",
  },
];

export const animatedStats = [
  { label: "Projects Built", value: 48, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Tech Stacks Used", value: 24, suffix: "+" },
];

