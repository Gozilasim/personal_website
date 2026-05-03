import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Code2,
  Figma,
  Github,
  Linkedin,
  Mail,
  MonitorSmartphone,
  Palette,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";

export type PageId = "home" | "about" | "projects" | "skills" | "contact";

export type NavItem = {
  id: PageId;
  label: string;
};

export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
};

export type Skill = {
  name: string;
  iconUrl: string;
};

export type SkillGroup = {
  title: string;
  body: string;
  icon: ComponentType<LucideProps>;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  body: string;
  icon: ComponentType<LucideProps>;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<LucideProps>;
};

export const profile = {
  name: "Gozilasim",
  logo: "Gozilasim",
  role: "Full-Stack AI Developer",
  headline: "I design interfaces, build Python backends, and connect them with AI systems.",
  avatarUrl:
    "https://res.cloudinary.com/dqictlikj/image/upload/v1777789098/WhatsApp_Image_2026-05-03_at_14.17.53_aex14c.jpg",
  bio:
    "A personal space for the tools, experiments, and products I build while learning how to make AI useful.",
  about:
    "I like building web experiences where visual craft and front-end engineering meet. My work starts with the user path, then moves through layout, interaction, performance, and the small details that make an interface feel finished.",
  email: "wengjin4896@gmail.com",
  telegramUsername: "Gozilasim",
  telegramPrefill: "Hello, Gozilasim",
  location: "Remote-friendly",
  resumePath: "/resume.pdf",
  socials: {
    github: "https://github.com/Gozilasim",
    linkedin: "https://www.linkedin.com/in/gozilasim",
  },
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const featuredSkills: Skill[] = [
  {
    name: "TypeScript",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "JavaScript",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "FastAPI",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
];

export const projects: Project[] = [
  {
    title: "Interactive Landing System",
    eyebrow: "Product UI",
    description:
      "A polished landing experience with animated sections, focused copy, and responsive visual rhythm.",
    stack: ["React", "TypeScript", "Framer Motion"],
    href: "#contact",
    image: "/project-landing.svg",
  },
  {
    title: "Personal Knowledge Space",
    eyebrow: "Creative Tool",
    description:
      "A small writing and collection interface for notes, links, and ideas that need room to grow.",
    stack: ["Vite", "CSS", "Local state"],
    href: "#contact",
    image: "/project-notes.svg",
  },
  {
    title: "Motion Detail Lab",
    eyebrow: "Interaction",
    description:
      "Micro-interactions and layout transitions designed to make product surfaces feel sharper.",
    stack: ["React", "Motion", "Design systems"],
    href: "#contact",
    image: "/project-motion.svg",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Interface Design",
    body: "Layout, typography, interaction states, and visual systems that stay usable.",
    icon: Palette,
    items: ["Figma", "Responsive systems", "Design handoff", "Accessibility"],
  },
  {
    title: "Frontend Build",
    body: "Production React and TypeScript with clean component boundaries and fast feedback loops.",
    icon: Code2,
    items: ["React", "TypeScript", "Vite", "Framer Motion"],
  },
  {
    title: "Product Polish",
    body: "The finishing layer: motion, performance, mobile behavior, and small affordances.",
    icon: Sparkles,
    items: ["Performance", "Animation", "QA", "Microcopy"],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Design-minded frontend builder",
    company: "Personal projects",
    period: "Now",
    body:
      "Building small interactive web experiences that balance personality, clarity, and maintainable code.",
    icon: MonitorSmartphone,
  },
  {
    role: "TypeScript-focused developer",
    company: "Learning and shipping",
    period: "Recent",
    body:
      "Practicing component architecture, animation, responsive design, and project organization through focused builds.",
    icon: Zap,
  },
  {
    role: "Creative web explorer",
    company: "Ongoing",
    period: "Always",
    body:
      "Collecting references, testing layouts, and turning visual ideas into browser-native interactions.",
    icon: Figma,
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Gozilasim",
    href: profile.socials.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "www.linkedin.com/in/gozilasim",
    href: profile.socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "Say hello",
    value: "Start a conversation",
    href: `https://t.me/${profile.telegramUsername}?text=${encodeURIComponent(profile.telegramPrefill)}`,
    icon: Send,
  },
];
