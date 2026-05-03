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
  videoUrl?: string;
  posterUrl?: string;
  fallbackText?: string;
  isMonochrome?: boolean;
  needsContrast?: boolean;
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
    name: "React",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "FastAPI",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "Django",
    iconUrl: "https://cdn.simpleicons.org/django/44B78B",
    fallbackText: "Django",
  },
  {
    name: "Docker",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "PostgreSQL",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Git",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    iconUrl: "https://cdn.simpleicons.org/github",
    fallbackText: "GitHub",
    isMonochrome: true,
  },
  {
    name: "Vite",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "OpenAI",
    iconUrl: "https://cdn.simpleicons.org/openai",
    fallbackText: "OpenAI",
    isMonochrome: true,
  },
  {
    name: "ChatGPT",
    iconUrl: "/logos/chatgpt-mark.svg",
    fallbackText: "ChatGPT",
    isMonochrome: true,
  },
  {
    name: "Cursor",
    iconUrl: "https://cdn.simpleicons.org/cursor",
    fallbackText: "Cursor",
    isMonochrome: true,
  },
  {
    name: "Codex",
    iconUrl: "https://persistent.oaistatic.com/codex/icon.png",
    videoUrl: "https://persistent.oaistatic.com/codex/icon-gif.mp4",
    posterUrl: "https://persistent.oaistatic.com/codex/icon.png",
    fallbackText: "Codex",
  },
  {
    name: "Antigravity",
    iconUrl: "/logos/antigravity-mark.svg",
    fallbackText: "Antigravity",
  },
  {
    name: "NVIDIA FLARE",
    iconUrl: "https://cdn.simpleicons.org/nvidia/76B900",
    fallbackText: "NVFLARE",
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
  {
    title: "AI Notes Companion",
    eyebrow: "AI Tool",
    description:
      "A note workflow that turns rough ideas into structured summaries, tasks, and follow-up prompts.",
    stack: ["Python", "React", "OpenAI"],
    href: "#contact",
    image: "/project-notes.svg",
  },
  {
    title: "Backend Scan Runner",
    eyebrow: "Automation",
    description:
      "A small backend surface for launching scans, tracking results, and keeping noisy output readable.",
    stack: ["FastAPI", "SQLite", "TypeScript"],
    href: "#contact",
    image: "/project-motion.svg",
  },
  {
    title: "Resume Parser Dashboard",
    eyebrow: "Data UI",
    description:
      "A focused dashboard for uploading resumes, extracting signals, and reviewing candidate summaries.",
    stack: ["Python", "PDF", "React"],
    href: "#contact",
    image: "/project-landing.svg",
  },
  {
    title: "Telegram Contact Flow",
    eyebrow: "Messaging",
    description:
      "A direct contact path that opens Telegram with a prefilled first message and minimal friction.",
    stack: ["Deep links", "UX", "Vite"],
    href: "#contact",
    image: "/project-notes.svg",
  },
  {
    title: "Theme System Refresh",
    eyebrow: "Design System",
    description:
      "A light and dark theme pass built around stable tokens, accessible contrast, and controlled motion.",
    stack: ["CSS", "Tokens", "React"],
    href: "#contact",
    image: "/project-motion.svg",
  },
  {
    title: "Stack Logo Marquee",
    eyebrow: "Brand Detail",
    description:
      "A restrained moving rail for core stack logos, tuned for readability and reduced-motion support.",
    stack: ["CSS", "Motion", "Accessibility"],
    href: "#contact",
    image: "/project-landing.svg",
  },
  {
    title: "Portfolio Motion Pass",
    eyebrow: "Frontend Polish",
    description:
      "A motion layer for page transitions, hover states, and subtle depth without making the site feel busy.",
    stack: ["Framer Motion", "React", "CSS"],
    href: "#contact",
    image: "/project-motion.svg",
  },
  {
    title: "Upload Review Workspace",
    eyebrow: "Product UI",
    description:
      "A compact workspace for uploaded files, review status, extracted notes, and next-step actions.",
    stack: ["React", "State", "FastAPI"],
    href: "#contact",
    image: "/project-notes.svg",
  },
  {
    title: "Data Visualization Shelf",
    eyebrow: "Interface",
    description:
      "A set of exploratory visual modules for comparing project signals, activity, and useful metrics.",
    stack: ["Charts", "TypeScript", "CSS"],
    href: "#contact",
    image: "/project-landing.svg",
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
