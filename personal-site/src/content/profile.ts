import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  CloudCog,
  Code2,
  Figma,
  Github,
  Linkedin,
  Mail,
  MonitorSmartphone,
  Send,
  ServerCog,
  Zap,
} from "lucide-react";
import myExpenseImage from "../assets/my_expense.png";
import ransomwareDetectionImage from "../assets/Ransomware_detection.png";
import groupChatImage from "../assets/group-chat.png";

export type PageId = "home" | "about" | "projects" | "project-detail" | "skills" | "contact";

export type NavItem = {
  id: PageId;
  label: string;
};

export type Project = {
  title: string;
  detailTitle?: string;
  eyebrow: string;
  description: string;
  stack: string[];
  slug: string;
  href: string;
  image: string;
  createdAt?: string;
  githubUrl?: string;
  apkUrl?: string;
  demoVideo?: string;
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

export type AboutExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type AboutEducationItem = {
  title: string;
  institution?: string;
  period: string;
  result: string;
  details?: string[];
};

export type AboutProofItem = {
  title: string;
  body: string;
  href?: string;
};

export const profile = {
  name: "Gozilasim",
  fullName: "SIM WENG JIN",
  logo: "Gozilasim",
  role: "Full-Stack AI Developer",
  aboutRole: "AI Engineer",
  headline: "I design interfaces, build Python backends, and connect them with AI systems.",
  avatarUrl:
    "https://res.cloudinary.com/dqictlikj/image/upload/v1777789098/WhatsApp_Image_2026-05-03_at_14.17.53_aex14c.jpg",
  bio:
    "A personal space for the tools, experiments, and products I build while learning how to make AI useful.",
  about:
    "I like building web experiences where visual craft and front-end engineering meet. My work starts with the user path, then moves through layout, interaction, performance, and the small details that make an interface feel finished.",
  aboutHeadline: "AI Engineer building agentic support systems and practical AI products.",
  aboutIntro:
    "I build AI agent chatbot systems for SaaS customer support, backend automation, realtime live chat, and useful AI workflows. My work connects frontend interfaces, Python backends, LLM tooling, and human handoff flows.",
  aboutSnapshot:
    "Passionate about building AI agents and automation that solve real problems and create meaningful impact.",
  email: "wengjin4896@gmail.com",
  telegramUsername: "Gozilasim",
  telegramPrefill: "Hello, Gozilasim",
  location: "Remote-friendly",
  resumePath: "Resume_sim.pdf",
  socials: {
    github: "https://github.com/Gozilasim",
    linkedin: "https://www.linkedin.com/in/gozilasim",
  },
};

export const aboutIdentityFacts = [
  "AI Engineer",
  "Full-stack AI",
  "Malaysia",
  "Mandarin / English / Malay",
];

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
    title: "Group Chat AI Agent (Work in Progress)",
    eyebrow: "AI Agent System",
    description:
      "A group chat AI agent that can be used to chat with AI in a group chat.",
    stack: ["FastAPI", "React", "TypeScript"],
    slug: "group-chat-ai-agent",
    href: "#projects/group-chat-ai-agent",
    image: groupChatImage,
    createdAt: "2026-02-01",
    githubUrl: "https://github.com/Gozilasim/whatsapp-ai-chating",
  },
  {
    title: "My Expense",
    detailTitle: "expense tracker",
    eyebrow: "Mobile App",
    description: "A Flutter app for tracking expenses, scanning receipts, and analyzing spending.",
    stack: ["Dart", "Flutter", "Material 3 UI", "Riverpod state management", "SQLite"],
    slug: "project-expense-tracker",
    href: "#projects/project-expense-tracker",
    image: myExpenseImage,
    createdAt: "2026-03-04",
    githubUrl: "https://github.com/Gozilasim/expense_tracker",
    apkUrl:
      "https://github.com/Gozilasim/expense_tracker/releases/download/v1.0.0/my-expense-v1.0.0-release.apk",
    demoVideo:
      "https://res.cloudinary.com/dqictlikj/video/upload/v1777915614/video_2026-05-03_04-00-34_1_bdcta3.mp4",
  },
  {
    title: "Ransomware Detection System",
    eyebrow: "System Security",
    description:
      "A Ransomware Detection System built with machine learning, FastAPI, SQLite, and a React dashboard. It supports PE file scanning, real-time behavior monitoring, risk scoring, and suspicious file quarantine to help identify potential ransomware activity.",
    stack: ["Python", "TypeScript", "React", "FastAPI", "SQLite", "Docker", "Machine Learning", "scikit-learn", "XGBoost", "Ransomware Detection", "PE File Analysis", "Realtime Monitoring", "Quarantine System"],
    slug: "ransomware-detection",
    href: "#projects/ransomware-detection",
    image: ransomwareDetectionImage,
    createdAt: "2026-03-05",
    githubUrl: "https://github.com/AI-Computer-Vision/ransomware_detection.git",
    demoVideo: "https://res.cloudinary.com/dqictlikj/video/upload/v1778350595/2026-05-10_02-06-53_xhonf3.mkv",
  },
  {
    title: "LLM FMEA",
    eyebrow: "RAG-based Knowledge Assistant",
    description:
      "A RAG-based knowledge assistant that can answer questions about FMEA using LLAMA-INDEX and an LLM.",
    stack: ["LLama-index", "RAG", "WebScrapper"],
    slug: "LLM FMEA",
    href: "#projects/ai-notes-companion",
    image: "/project-notes.svg",
  },
  {
    title: "Backend Scan Runner",
    eyebrow: "Automation",
    description:
      "A small backend surface for launching scans, tracking results, and keeping noisy output readable.",
    stack: ["FastAPI", "SQLite", "TypeScript"],
    slug: "backend-scan-runner",
    href: "#projects/backend-scan-runner",
    image: "/project-motion.svg",
  },
  {
    title: "Resume Parser Dashboard",
    eyebrow: "Data UI",
    description:
      "A focused dashboard for uploading resumes, extracting signals, and reviewing candidate summaries.",
    stack: ["Python", "PDF", "React"],
    slug: "resume-parser-dashboard",
    href: "#projects/resume-parser-dashboard",
    image: "/project-landing.svg",
  },
  {
    title: "Telegram Contact Flow",
    eyebrow: "Messaging",
    description:
      "A direct contact path that opens Telegram with a prefilled first message and minimal friction.",
    stack: ["Deep links", "UX", "Vite"],
    slug: "telegram-contact-flow",
    href: "#projects/telegram-contact-flow",
    image: "/project-notes.svg",
  },
  {
    title: "Theme System Refresh",
    eyebrow: "Design System",
    description:
      "A light and dark theme pass built around stable tokens, accessible contrast, and controlled motion.",
    stack: ["CSS", "Tokens", "React"],
    slug: "theme-system-refresh",
    href: "#projects/theme-system-refresh",
    image: "/project-motion.svg",
  },
  {
    title: "Stack Logo Marquee",
    eyebrow: "Brand Detail",
    description:
      "A restrained moving rail for core stack logos, tuned for readability and reduced-motion support.",
    stack: ["CSS", "Motion", "Accessibility"],
    slug: "stack-logo-marquee",
    href: "#projects/stack-logo-marquee",
    image: "/project-landing.svg",
  },
  {
    title: "Portfolio Motion Pass",
    eyebrow: "Frontend Polish",
    description:
      "A motion layer for page transitions, hover states, and subtle depth without making the site feel busy.",
    stack: ["Framer Motion", "React", "CSS"],
    slug: "portfolio-motion-pass",
    href: "#projects/portfolio-motion-pass",
    image: "/project-motion.svg",
  },
  {
    title: "Upload Review Workspace",
    eyebrow: "Product UI",
    description:
      "A compact workspace for uploaded files, review status, extracted notes, and next-step actions.",
    stack: ["React", "State", "FastAPI"],
    slug: "upload-review-workspace",
    href: "#projects/upload-review-workspace",
    image: "/project-notes.svg",
  },
  {
    title: "Data Visualization Shelf",
    eyebrow: "Interface",
    description:
      "A set of exploratory visual modules for comparing project signals, activity, and useful metrics.",
    stack: ["Charts", "TypeScript", "CSS"],
    slug: "data-visualization-shelf",
    href: "#projects/data-visualization-shelf",
    image: "/project-landing.svg",
  },
];

export const aboutProfessionalExperience: AboutExperienceItem[] = [
  {
    role: "AI Engineer",
    company: "Des Digital Marketing Sdn. Bhd",
    period: "Apr 2025 - Present",
    highlights: [
      "Develop and maintain an AI agent chatbot system for a SaaS live chat and customer support platform.",
      "Build tool calling, workflow automation, business-specific responses, and backend integrations.",
      "Maintain customer conversations, operator support flow, realtime messages, and AI-to-human handoff.",
    ],
  },
  {
    role: "AI Intern",
    company: "Infineon Technologies (M) Sdn. Bhd",
    period: "Oct 2024 - Mar 2025",
    highlights: [
      "Developed a federated learning system using NVFlare for decentralized model training experiments.",
      "Configured industrial cameras and Jetson AGX Orin edge devices for image collection and testing.",
      "Developed LLM prompts for FMEA tasks and supported computer vision annotation and troubleshooting.",
    ],
  },
];

export const aboutEducationJourney: AboutEducationItem[] = [
  {
    title: "Sekolah Menengah Kebangsaan Simpang",
    period: "2015 - 2019",
    result: "SPM: 3A+, 4A, 3B+",
  },
  {
    title: "Perlis Matriculation College",
    period: "2020 - 2021",
    result: "CGPA: 4.0",
  },
  {
    title: "Bachelor of Computer Science",
    institution: "Universiti Teknikal Malaysia Melaka (UTeM)",
    period: "Oct 2021 - Mar 2025",
    result: "Major in Artificial Intelligence",
    details: [
      "CGPA: 3.71",
      "Thesis: Interactive Feedback System with Gesture Recognition",
    ],
  },
];

export const aboutSpecializations = [
  "AI Agent Development",
  "Tool Calling",
  "Workflow Automation",
  "RAG",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "FastAPI",
  "React",
  "WebSocket",
  "Docker",
  "NVFlare",
  "Computer Vision",
];

export const aboutProof: AboutProofItem[] = [
  {
    title: "Group Chat AI Agent",
    body:
      "In-development assistant for group conversations with mentions, task actions, and future multi-platform integration.",
  },
  {
    title: "Ransomware Detection System",
    body: "Machine learning detection system for suspicious file and system behavior patterns.",
    href: "#projects/ransomware-detection",
  },
  {
    title: "Expense Tracker with OCR",
    body: "Personal finance app that scans receipts, extracts transaction details, and reduces manual entry.",
    href: "#projects/project-expense-tracker",
  },
  {
    title: "LLM FMEA RAG",
    body: "RAG chatbot for Failure Modes and Effects Analysis with retrieved context and generated responses.",
  },
];

export const expenseTrackerDetail = {
  title: "expense tracker",
  intro:
    "A local-first Flutter expense tracker that helps record daily spending, scan receipt details with OCR, and review monthly totals by category.",
  sections: [
    {
      title: "What it solves",
      items: [
        "Keeps day-to-day spending entries organized by category and month.",
        "Reduces manual entry by letting users scan receipts and review extracted values.",
        "Keeps spending data on the device with SQLite, reducing exposure to external services.",
      ],
    },
    {
      title: "How I built it",
      items: [
        "Built the mobile interface with Flutter and Material 3 components.",
        "Used Riverpod to manage selected month, filters, categories, totals, and receipt review state.",
        "Persisted expense records and scanned receipt data locally with SQLite.",
      ],
    },
    {
      title: "Main features",
      items: [
        "Add and categorize expenses.",
        "Scan receipts with OCR and confirm extracted entries.",
        "Review monthly totals, category breakdowns, and recent transactions.",
      ],
    },
  ],
  flowSteps: [
    {
      title: "Add expense",
      body: "Create a spending entry with amount, category, date, and note.",
    },
    {
      title: "Scan receipt",
      body: "Use OCR to extract receipt values and turn them into reviewable fields.",
    },
    {
      title: "Review before saving",
      body: "Confirm extracted data before creating the final expense record.",
    },
    {
      title: "Analyze spending",
      body: "Review monthly totals, category breakdowns, and recent transactions.",
    },
  ],
  technicalDecisions: [
    {
      title: "Local-first storage",
      body:
        "SQLite keeps expense records on the device, so the core tracking flow does not require a backend account.",
    },
    {
      title: "Predictable state",
      body:
        "Riverpod keeps month selection, filters, totals, categories, and receipt review state separated.",
    },
    {
      title: "Review-first OCR",
      body: "OCR output is treated as a draft so users can confirm values before saving.",
    },
    {
      title: "Material 3 structure",
      body: "Material 3 keeps forms, lists, buttons, and navigation visually consistent.",
    },
  ],
  nextImprovements: [
    "Export expenses to CSV.",
    "Add budget limits and monthly alerts.",
    "Add recurring expense templates.",
    "Add local backup and restore.",
  ],
};

export const ransomwareDetectionDetail = {
  roleLabel: "Project helper contribution",
  intro:
    "A demo-ready ransomware detection platform combining static PE-file classification, folder-level behavior-window monitoring, FastAPI persistence, and a React security dashboard with manual quarantine review.",
  scopeItems: [
    {
      title: "Project helper role",
      body:
        "I helped build this complete demo/MVP system as a project helper, so the page presents the architecture, detection flow, dashboard, and quarantine workflow as assisted project work rather than a solo product.",
    },
    {
      title: "Two detection paths",
      body: "Combines static PE-file classification with folder-level behavior windows so scan results and monitoring signals can be reviewed together.",
    },
    {
      title: "Demo MVP scope",
      body: "Built as an academic prototype for controlled ransomware detection experiments, not as production antivirus software.",
    },
  ],
  pipelineSteps: [
    {
      title: "Select Folder",
      body: "Choose a folder under the mounted scan environment.",
    },
    {
      title: "Validate Scan Root",
      body: "Backend rejects paths outside the controlled scan root.",
    },
    {
      title: "Static PE Scan",
      body: "Executable files move through PE feature extraction and file-level prediction.",
    },
    {
      title: "Behavior Windows",
      body: "Filesystem events are grouped into fixed time windows before prediction.",
    },
    {
      title: "Model Prediction",
      body: "Exported model bundles return labels, probabilities, and risk levels.",
    },
    {
      title: "Dashboard Review",
      body: "Scan history, live events, windows, and predictions stay visible in the UI.",
    },
    {
      title: "Manual Quarantine",
      body: "High-risk files can be quarantined and restored from the quarantine page.",
    },
  ],
  staticScan: {
    title: "Static PE Scan",
    body:
      "The scan pipeline targets Windows executable files, extracts PE header and static indicators, and stores per-file results in SQLite.",
    items: [
      "Supports .exe and .dll files.",
      "Skips non-PE files such as .pdf, .txt, .jpg, and .zip.",
      "Outputs benign or malicious labels with probability, risk level, and result status.",
    ],
    features: [
      "Machine",
      "NumberOfSections",
      "MajorLinkerVersion",
      "ResourceSize",
      "DllCharacteristics",
      "IAT",
      "Export table",
      "Bitcoin address indicators",
    ],
  },
  behaviorMonitoring: {
    title: "Realtime Behavior Monitoring",
    body:
      "The monitoring flow watches a selected folder, aggregates filesystem events into time windows, and scores each window with a behavior model.",
    items: [
      "Captures created, modified, moved, and deleted events.",
      "Uses folder-level monitoring with watchdog PollingObserver.",
      "Outputs good or ransom labels with probabilities, threshold context, and risk level.",
    ],
    features: [
      "File_created",
      "File_Delete_archived",
      "file-related",
      "extension_similarity",
      "file_name_entropy",
      "path_length",
      "directory_depth",
    ],
  },
  architectureItems: [
    {
      title: "React dashboard",
      body: "Vite, TypeScript, and Tailwind power the scan, monitoring, dashboard, and quarantine screens.",
    },
    {
      title: "FastAPI backend",
      body: "REST endpoints coordinate scan requests, model inference, watch sessions, dashboard analytics, and quarantine actions.",
    },
    {
      title: "SQLite persistence",
      body: "Scan summaries, per-file results, raw events, windows, predictions, and quarantine records are stored locally.",
    },
    {
      title: "ML model layer",
      body: "scikit-learn, XGBoost, joblib, pandas, pefile, and watchdog support model loading, feature extraction, and monitoring.",
    },
  ],
  dashboardPages: [
    {
      title: "Dashboard",
      items: ["Monitoring analytics", "Verdict distribution", "Recent suspicious windows"],
    },
    {
      title: "Monitoring",
      items: ["Start and stop sessions", "Raw event and window tables", "Simulator and candidate review"],
    },
    {
      title: "Scan",
      items: ["Folder scan input", "Model selector and progress ring", "Per-file probability and risk table"],
    },
    {
      title: "Quarantine",
      items: ["Quarantine metrics", "Source and storage paths", "Restore action"],
    },
  ],
  technicalDecisions: [
    {
      title: "FastAPI API surface",
      body: "FastAPI keeps scanning, model inference, monitoring, dashboard, and quarantine workflows separated behind REST endpoints.",
    },
    {
      title: "Local demo persistence",
      body: "SQLite keeps the MVP easy to run while preserving enough history for dashboard analytics and review flows.",
    },
    {
      title: "Model comparison",
      body: "XGBoost, Random Forest, MLP, SVM, and Logistic Regression allow multiple model families to be tested through exported bundles.",
    },
    {
      title: "Repeatable backend setup",
      body: "Docker Compose gives the backend a predictable local runtime while the frontend can run locally during development.",
    },
  ],
  limitations: [
    "Not production-ready or enterprise security software.",
    "Not kernel-level or EDR-level monitoring.",
    "Detection quality depends on dataset coverage.",
    "Quarantine is manual and best-effort.",
    "Non-PE files are skipped in static scan.",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI Agent Development",
    body:
      "AI chatbot systems for customer enquiries, tool calling, workflow automation, RAG, and human agent handoff.",
    icon: Bot,
    items: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Prompt Engineering",
      "Tool Calling",
      "AI Agent Workflow",
      "RAG",
    ],
  },
  {
    title: "Backend & Realtime Systems",
    body:
      "Backend integrations for SaaS support workflows, live chat features, realtime messages, and external systems.",
    icon: ServerCog,
    items: ["FastAPI", "Django", "REST API", "WebSocket", "SQLAlchemy", "Pydantic", "Celery", "Redis"],
  },
  {
    title: "Frontend Development",
    body: "React and Vite interfaces for dashboards, live chat flows, customer conversations, and project UIs.",
    icon: Code2,
    items: ["React", "Vite", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "AI / ML Systems",
    body:
      "Machine learning, federated learning, computer vision, prompt workflows, and edge AI experimentation.",
    icon: BrainCircuit,
    items: ["Federated Learning", "NVFlare", "Computer Vision", "XGBoost", "scikit-learn", "Edge AI"],
  },
  {
    title: "DevOps & Deployment",
    body: "Deployment and observability tools used to run, monitor, and support application systems.",
    icon: CloudCog,
    items: ["Docker", "Docker Compose", "Nginx", "PgBouncer", "Vercel", "Prometheus", "Grafana"],
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
