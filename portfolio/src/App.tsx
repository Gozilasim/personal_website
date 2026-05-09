/*
Created at: 2026-05-10 02:54
Updated at: 2026-05-10 03:35
Description: Interactive portfolio book experience and project detail routes.
*/
import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  CloudCog,
  Code2,
  Download,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MonitorSmartphone,
  Send,
  ServerCog,
  UserRound,
  type LucideProps,
} from "lucide-react";
import portraitImage from "./assets/Sim.jpg";
import brandLogoAnimated from "./assets/brand-gozilasim.gif";
import expenseImage from "./assets/my_expense.png";
import ransomwareImage from "./assets/Ransomware_detection.png";
import groupChatImage from "./assets/group-chat.png";

// ###############################################
// Types
// ###############################################

type ChapterId = "home" | "about" | "projects" | "skills" | "contact";
type BookPageKind = "cover" | "about" | "experience" | "education" | "projects" | "skills" | "contact" | "back";
type TurnDirection = "next" | "prev";

type BookPage = {
  id: string;
  chapter: ChapterId;
  kind: BookPageKind;
  label: string;
};

type TurningState = {
  direction: TurnDirection;
  fromStart: number;
  toStart: number;
};

type Project = {
  title: string;
  eyebrow: string;
  description: string;
  slug: string;
  image: string;
  stack: string[];
  githubUrl?: string;
  apkUrl?: string;
  role?: string;
  details: string[];
};

type TimelineItem = {
  title: string;
  meta: string;
  body: string;
  points: string[];
};

type SkillGroup = {
  title: string;
  body: string;
  icon: ComponentType<LucideProps>;
  items: string[];
};

// ###############################################
// Content
// ###############################################

const profile = {
  name: "Gozilasim",
  fullName: "SIM WENG JIN",
  role: "Full-Stack AI Developer",
  focus: "AI Engineer",
  headline: "I build practical AI agents, Python backends, and clear product interfaces.",
  bio:
    "A portfolio book for the AI systems, dashboards, and product experiments I build while making automation useful.",
  aboutIntro:
    "I build AI agent chatbot systems for SaaS customer support, backend automation, realtime live chat, and human handoff flows.",
  snapshot:
    "Passionate about building AI agents and automation that solve real problems and create meaningful impact.",
  email: "wengjin4896@gmail.com",
  location: "Malaysia",
  resumePath: "/Resume_sim.pdf",
  telegramUsername: "Gozilasim",
  telegramPrefill: "Hello, Gozilasim",
  socials: {
    github: "https://github.com/Gozilasim",
    linkedin: "https://www.linkedin.com/in/gozilasim",
  },
};

const chapterIds: ChapterId[] = ["home", "about", "projects", "skills", "contact"];

const bookPages: BookPage[] = [
  { id: "cover", chapter: "home", kind: "cover", label: "Cover" },
  { id: "about", chapter: "about", kind: "about", label: "About" },
  { id: "experience", chapter: "about", kind: "experience", label: "Experience" },
  { id: "education", chapter: "about", kind: "education", label: "Education" },
  { id: "projects", chapter: "projects", kind: "projects", label: "Projects" },
  { id: "skills", chapter: "skills", kind: "skills", label: "Skills" },
  { id: "contact", chapter: "contact", kind: "contact", label: "Contact" },
  { id: "back", chapter: "contact", kind: "back", label: "Back cover" },
];

const chapterPageIndex: Record<ChapterId, number> = {
  home: 0,
  about: 1,
  projects: 4,
  skills: 5,
  contact: 6,
};

const identityFacts = [
  { label: "AI Engineer", icon: BrainCircuit },
  { label: "Full-stack AI", icon: Code2 },
  { label: "Malaysia", icon: MapPin },
  { label: "Mandarin / English / Malay", icon: UserRound },
];

const experienceItems: TimelineItem[] = [
  {
    title: "AI Engineer",
    meta: "Des Digital Marketing Sdn. Bhd - Apr 2025 to Present",
    body: "Develop and maintain AI agent chatbot systems for SaaS live chat and customer support.",
    points: [
      "Build tool calling, workflow automation, and backend integrations.",
      "Support realtime messages and AI-to-human handoff flows.",
      "Maintain business-specific responses for customer conversations.",
    ],
  },
  {
    title: "AI Intern",
    meta: "Infineon Technologies (M) Sdn. Bhd - Oct 2024 to Mar 2025",
    body: "Supported federated learning, computer vision, edge AI setup, and LLM prompt workflows.",
    points: [
      "Developed NVFlare federated learning experiments.",
      "Configured cameras and Jetson AGX Orin devices for testing.",
      "Supported FMEA prompts, annotation, and troubleshooting.",
    ],
  },
];

const educationItems: TimelineItem[] = [
  {
    title: "Bachelor of Computer Science",
    meta: "Universiti Teknikal Malaysia Melaka - Oct 2021 to Mar 2025",
    body: "Major in Artificial Intelligence with thesis work on interactive feedback and gesture recognition.",
    points: ["CGPA: 3.71", "Thesis: Interactive Feedback System with Gesture Recognition"],
  },
  {
    title: "Perlis Matriculation College",
    meta: "2020 to 2021",
    body: "Foundation studies before the computer science degree.",
    points: ["CGPA: 4.0"],
  },
  {
    title: "Sekolah Menengah Kebangsaan Simpang",
    meta: "2015 to 2019",
    body: "Secondary education with science and technology foundation.",
    points: ["SPM: 3A+, 4A, 3B+"],
  },
];

const projects: Project[] = [
  {
    title: "Group Chat AI Agent",
    eyebrow: "AI Agent System",
    description: "A group chat AI assistant for shared conversations and future multi-platform actions.",
    slug: "group-chat-ai-agent",
    image: groupChatImage,
    stack: ["FastAPI", "React", "TypeScript"],
    githubUrl: "https://github.com/Gozilasim/whatsapp-ai-chating",
    details: [
      "Designed for group conversations where AI can respond inside a shared chat context.",
      "Built around backend APIs, frontend review surfaces, and future action workflows.",
      "Planned for mentions, task actions, and multi-platform chat expansion.",
    ],
  },
  {
    title: "My Expense",
    eyebrow: "Mobile App",
    description: "A Flutter expense tracker for receipts, categories, monthly totals, and local records.",
    slug: "project-expense-tracker",
    image: expenseImage,
    stack: ["Flutter", "Dart", "SQLite", "Riverpod"],
    githubUrl: "https://github.com/Gozilasim/expense_tracker",
    apkUrl:
      "https://github.com/Gozilasim/expense_tracker/releases/download/v1.0.0/my-expense-v1.0.0-release.apk",
    details: [
      "Keeps daily spending entries organized by category and month.",
      "Uses OCR as a reviewable draft before saving expense records.",
      "Stores core records locally with SQLite for a local-first tracking flow.",
    ],
  },
  {
    title: "Ransomware Detection System",
    eyebrow: "System Security",
    description: "A demo-ready detection platform for static PE scanning and behavior monitoring.",
    slug: "ransomware-detection",
    image: ransomwareImage,
    stack: ["FastAPI", "React", "SQLite", "Machine Learning"],
    githubUrl: "https://github.com/AI-Computer-Vision/ransomware_detection.git",
    role: "Project helper contribution",
    details: [
      "Combines static PE-file classification with folder-level behavior-window monitoring.",
      "Stores scan summaries, raw events, predictions, and quarantine records in SQLite.",
      "Presents scan, monitoring, dashboard, and quarantine review screens in a React UI.",
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "AI Agent Development",
    body: "Customer support agents, tool calling, workflow automation, RAG, and human handoff.",
    icon: Bot,
    items: ["LangChain", "LangGraph", "LlamaIndex", "Prompt Engineering", "Tool Calling", "RAG"],
  },
  {
    title: "Backend & Realtime Systems",
    body: "APIs, realtime messages, platform integrations, and reliable support workflows.",
    icon: ServerCog,
    items: ["FastAPI", "Django", "REST API", "WebSocket", "SQLAlchemy", "Redis"],
  },
  {
    title: "Frontend Development",
    body: "React interfaces for dashboards, chat flows, project pages, and operational tools.",
    icon: Code2,
    items: ["React", "Vite", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "AI / ML Systems",
    body: "Computer vision, federated learning, model experiments, and edge AI testing.",
    icon: BrainCircuit,
    items: ["Federated Learning", "NVFlare", "Computer Vision", "XGBoost", "scikit-learn"],
  },
  {
    title: "DevOps & Deployment",
    body: "Deployment and observability tools for running and monitoring applications.",
    icon: CloudCog,
    items: ["Docker", "Docker Compose", "Nginx", "Vercel", "Prometheus", "Grafana"],
  },
];

const contactLinks = [
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
    value: "linkedin.com/in/gozilasim",
    href: profile.socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "Telegram",
    value: "@Gozilasim",
    href: `https://t.me/${profile.telegramUsername}?text=${encodeURIComponent(profile.telegramPrefill)}`,
    icon: Send,
  },
];

// ###############################################
// Routing Helpers
// ###############################################

function clampIndex(value: number) {
  return Math.max(0, Math.min(value, bookPages.length - 1));
}

function getChapterFromHash(hash: string): ChapterId {
  const cleanHash = hash.replace("#", "").split("/")[0];

  return chapterIds.includes(cleanHash as ChapterId) ? (cleanHash as ChapterId) : "home";
}

function getProjectFromHash(hash: string) {
  const match = /^#projects\/([^/?#]+)/.exec(hash);
  const slug = match?.[1];

  return slug ? projects.find((project) => project.slug === slug) : undefined;
}

function getPageIndexFromHash(hash: string) {
  const chapter = getChapterFromHash(hash);

  return chapterPageIndex[chapter];
}

function getSpreadStart(pageIndex: number) {
  return Math.floor(pageIndex / 2) * 2;
}

function getSafeHash() {
  if (typeof window === "undefined") {
    return "#home";
  }

  return window.location.hash || "#home";
}

// ###############################################
// App
// ###############################################

function App() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 760px)");
  const [hash, setHash] = useState(getSafeHash);
  const [pageIndex, setPageIndex] = useState(() => getPageIndexFromHash(getSafeHash()));
  const [activeChapter, setActiveChapter] = useState<ChapterId>(() => getChapterFromHash(getSafeHash()));
  const [turning, setTurning] = useState<TurningState | null>(null);

  const activeProject = getProjectFromHash(hash);
  const displayedStart = getSpreadStart(pageIndex);
  const displayStart = turning ? turning.toStart : displayedStart;
  const canGoPrev = isMobile ? pageIndex > 0 : displayedStart > 0;
  const canGoNext = isMobile ? pageIndex < bookPages.length - 1 : displayedStart < bookPages.length - 2;

  const syncFromLocation = () => {
    const nextHash = getSafeHash();
    const nextProject = getProjectFromHash(nextHash);

    setHash(nextHash);

    if (!nextProject) {
      const nextChapter = getChapterFromHash(nextHash);
      setActiveChapter(nextChapter);
      setPageIndex(getPageIndexFromHash(nextHash));
      setTurning(null);
    }
  };

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#home");
      setHash("#home");
    }

    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);

    return () => {
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, []);

  const writeHash = (chapter: ChapterId) => {
    const nextHash = `#${chapter}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }

    setHash(nextHash);
  };

  const goToPage = (targetIndex: number, chapterOverride?: ChapterId) => {
    const targetPageIndex = clampIndex(targetIndex);
    const targetChapter = chapterOverride ?? bookPages[targetPageIndex].chapter;
    const targetStart = getSpreadStart(targetPageIndex);
    const currentStart = getSpreadStart(pageIndex);

    if (turning) {
      return;
    }

    setActiveChapter(targetChapter);
    writeHash(targetChapter);

    if (isMobile || reducedMotion || targetStart === currentStart) {
      setPageIndex(targetPageIndex);
      setTurning(null);
      return;
    }

    setTurning({
      direction: targetStart > currentStart ? "next" : "prev",
      fromStart: currentStart,
      toStart: targetStart,
    });
  };

  const finishTurn = () => {
    if (!turning) {
      return;
    }

    setPageIndex(turning.toStart);
    setTurning(null);
  };

  const goRelative = (direction: TurnDirection) => {
    const delta = direction === "next" ? 1 : -1;
    const step = isMobile ? 1 : 2;
    const baseIndex = isMobile ? pageIndex : displayedStart;

    goToPage(baseIndex + delta * step);
  };

  return (
    <div className="portfolio-app">
      <Header onNavigate={(chapter) => goToPage(chapterPageIndex[chapter], chapter)} />

      <main>
        <AnimatePresence mode="wait">
          {activeProject ? (
            <ProjectDetailView key={activeProject.slug} project={activeProject} />
          ) : (
            <motion.section
              key="book"
              className="book-workspace"
              aria-label="Portfolio book"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <BookFrame
                activeChapter={activeChapter}
                canGoNext={canGoNext}
                canGoPrev={canGoPrev}
                displayStart={displayStart}
                isMobile={isMobile}
                pageIndex={pageIndex}
                reducedMotion={Boolean(reducedMotion)}
                turning={turning}
                onFinishTurn={finishTurn}
                onGoNext={() => goRelative("next")}
                onGoPrev={() => goRelative("prev")}
                onNavigate={(chapter) => goToPage(chapterPageIndex[chapter], chapter)}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ###############################################
// Header
// ###############################################

function Header({ onNavigate }: { onNavigate: (chapter: ChapterId) => void }) {
  return (
    <header className="app-header">
      <a
        className="brand-link"
        href="#home"
        onClick={(event) => handleNavClick(event, "home", onNavigate)}
        aria-label="Go to home"
        title="Home"
      >
        <img src={brandLogoAnimated} alt="" aria-hidden="true" />
      </a>

      <a className="resume-link" href={profile.resumePath} download>
        <Download size={16} aria-hidden="true" />
        <span>Resume</span>
      </a>
    </header>
  );
}

function handleNavClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  chapter: ChapterId,
  onNavigate: (chapter: ChapterId) => void,
) {
  event.preventDefault();
  onNavigate(chapter);
}

// ###############################################
// Book
// ###############################################

function BookFrame({
  activeChapter,
  canGoNext,
  canGoPrev,
  displayStart,
  isMobile,
  pageIndex,
  reducedMotion,
  turning,
  onFinishTurn,
  onGoNext,
  onGoPrev,
  onNavigate,
}: {
  activeChapter: ChapterId;
  canGoNext: boolean;
  canGoPrev: boolean;
  displayStart: number;
  isMobile: boolean;
  pageIndex: number;
  reducedMotion: boolean;
  turning: TurningState | null;
  onFinishTurn: () => void;
  onGoNext: () => void;
  onGoPrev: () => void;
  onNavigate: (chapter: ChapterId) => void;
}) {
  const mobilePage = bookPages[pageIndex];
  const leftPage = bookPages[displayStart];
  const rightPage = bookPages[displayStart + 1];
  const progressLabel = isMobile
    ? `${pageIndex + 1} / ${bookPages.length}`
    : `${displayStart / 2 + 1} / ${bookPages.length / 2}`;

  return (
    <div className="book-area">
      <div className="book-status" aria-live="polite">
        <span>{bookPages[isMobile ? pageIndex : displayStart].label}</span>
        <span>{progressLabel}</span>
      </div>

      <div className="book-stage">
        <button
          className="book-control book-control-left"
          type="button"
          onClick={onGoPrev}
          disabled={!canGoPrev}
          aria-label="Previous page"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>

        <div className={`book ${isMobile ? "is-mobile" : ""}`} aria-live="polite">
          {isMobile ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={mobilePage.id}
                className="mobile-page-shell"
                initial={reducedMotion ? false : { opacity: 0, x: 28 }}
                animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -28 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <BookPageView
                  activeChapter={activeChapter}
                  page={mobilePage}
                  pageIndex={pageIndex}
                  side="single"
                  onNavigate={onNavigate}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <div className="book-spread">
                <BookPageView
                  activeChapter={activeChapter}
                  page={leftPage}
                  pageIndex={displayStart}
                  side="left"
                  onNavigate={onNavigate}
                />
                <span className="book-spine" aria-hidden="true" />
                <BookPageView
                  activeChapter={activeChapter}
                  page={rightPage}
                  pageIndex={displayStart + 1}
                  side="right"
                  onNavigate={onNavigate}
                />
              </div>

              <AnimatePresence>
                {turning && !reducedMotion && (
                  <motion.div
                    key={`${turning.direction}-${turning.fromStart}-${turning.toStart}`}
                    className={`turning-page is-${turning.direction}`}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: turning.direction === "next" ? -176 : 176 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.68, ease: [0.2, 0.72, 0.22, 1] }}
                    onAnimationComplete={onFinishTurn}
                  >
                    <BookPageView
                      activeChapter={activeChapter}
                      page={bookPages[turning.direction === "next" ? turning.fromStart + 1 : turning.fromStart]}
                      pageIndex={turning.direction === "next" ? turning.fromStart + 1 : turning.fromStart}
                      side={turning.direction === "next" ? "right" : "left"}
                      onNavigate={onNavigate}
                      isTurning
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        <button
          className="book-control book-control-right"
          type="button"
          onClick={onGoNext}
          disabled={!canGoNext}
          aria-label="Next page"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function BookPageView({
  activeChapter,
  isTurning = false,
  onNavigate,
  page,
  pageIndex,
  side,
}: {
  activeChapter: ChapterId;
  isTurning?: boolean;
  onNavigate: (chapter: ChapterId) => void;
  page: BookPage;
  pageIndex: number;
  side: "left" | "right" | "single";
}) {
  const pageClass = `book-page is-${side} is-${page.kind} ${page.chapter === activeChapter ? "is-current-chapter" : ""} ${
    isTurning ? "is-turning" : ""
  }`;

  return (
    <article className={pageClass}>
      <div className="page-inner">
        {renderPageContent(page.kind, onNavigate)}
        <footer className="book-page-footer">
          <span>{page.label}</span>
          <span>{String(pageIndex + 1).padStart(2, "0")}</span>
        </footer>
      </div>
    </article>
  );
}

function renderPageContent(kind: BookPageKind, onNavigate: (chapter: ChapterId) => void) {
  switch (kind) {
    case "cover":
      return <CoverPage onNavigate={onNavigate} />;
    case "about":
      return <AboutBookPage />;
    case "experience":
      return <TimelineBookPage title="Professional Experience" icon={BriefcaseBusiness} items={experienceItems} />;
    case "education":
      return <TimelineBookPage title="Education Journey" icon={GraduationCap} items={educationItems} compact />;
    case "projects":
      return <ProjectsBookPage />;
    case "skills":
      return <SkillsBookPage />;
    case "contact":
      return <ContactBookPage />;
    case "back":
      return <BackCoverPage />;
    default:
      return null;
  }
}

// ###############################################
// Book Pages
// ###############################################

function CoverPage({ onNavigate }: { onNavigate: (chapter: ChapterId) => void }) {
  return (
    <div className="cover-page">
      <div className="portrait-frame">
        <img src={portraitImage} alt={`${profile.fullName} portrait`} />
      </div>
      <div>
        <p className="book-label">{profile.role}</p>
        <h1>{profile.name}</h1>
        <p className="cover-headline">{profile.headline}</p>
      </div>
      <p>{profile.bio}</p>
      <div className="page-actions">
        <a className="button button-primary" href="#projects" onClick={(event) => navAction(event, "projects", onNavigate)}>
          View projects
          <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a className="button button-secondary" href="#contact" onClick={(event) => navAction(event, "contact", onNavigate)}>
          Contact
          <Mail size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function AboutBookPage() {
  return (
    <div className="page-section about-book-page">
      <div>
        <p className="book-label">About</p>
        <h2>{profile.focus} building agentic support systems and practical AI products.</h2>
        <p>{profile.aboutIntro}</p>
      </div>

      <div className="fact-grid" aria-label="Profile facts">
        {identityFacts.map((fact) => {
          const Icon = fact.icon;

          return (
            <span key={fact.label}>
              <Icon size={16} aria-hidden="true" />
              {fact.label}
            </span>
          );
        })}
      </div>

      <div className="ink-note">
        <CheckCircle2 size={18} aria-hidden="true" />
        <p>{profile.snapshot}</p>
      </div>
    </div>
  );
}

function TimelineBookPage({
  compact = false,
  icon: Icon,
  items,
  title,
}: {
  compact?: boolean;
  icon: ComponentType<LucideProps>;
  items: TimelineItem[];
  title: string;
}) {
  return (
    <div className={`page-section timeline-page ${compact ? "is-compact" : ""}`}>
      <div className="page-heading">
        <span className="heading-icon">
          <Icon size={19} aria-hidden="true" />
        </span>
        <h2>{title}</h2>
      </div>

      <div className="timeline-list">
        {items.map((item) => (
          <article key={`${item.title}-${item.meta}`} className="timeline-item">
            <time>{item.meta}</time>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsBookPage() {
  return (
    <div className="page-section projects-book-page">
      <div className="page-heading">
        <span className="heading-icon">
          <MonitorSmartphone size={19} aria-hidden="true" />
        </span>
        <h2>Selected Projects</h2>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <a key={project.slug} className="project-entry" href={`#projects/${project.slug}`}>
            <img src={project.image} alt="" />
            <span>
              <small>{project.eyebrow}</small>
              <strong>{project.title}</strong>
              <em>{project.description}</em>
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

function SkillsBookPage() {
  return (
    <div className="page-section skills-book-page">
      <div className="page-heading">
        <span className="heading-icon">
          <BrainCircuit size={19} aria-hidden="true" />
        </span>
        <h2>Skills</h2>
      </div>

      <div className="skill-list">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <article key={group.title} className="skill-row">
              <Icon size={18} aria-hidden="true" />
              <div>
                <h3>{group.title}</h3>
                <p>{group.body}</p>
                <div className="chip-list" aria-label={`${group.title} tools`}>
                  {group.items.slice(0, 5).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ContactBookPage() {
  return (
    <div className="page-section contact-book-page">
      <div>
        <p className="book-label">Contact</p>
        <h2>Let us connect and build something useful.</h2>
        <p>Send a message about a project, AI workflow, or collaboration.</p>
      </div>

      <div className="contact-list">
        {contactLinks.map((link) => {
          const Icon = link.icon;
          const isExternal = link.href.startsWith("http");

          return (
            <a key={link.label} href={link.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
              <Icon size={18} aria-hidden="true" />
              <span>
                <strong>{link.label}</strong>
                <small>{link.value}</small>
              </span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function BackCoverPage() {
  return (
    <div className="back-cover-page">
      <BookOpen size={40} aria-hidden="true" />
      <h2>{profile.fullName}</h2>
      <p>{profile.role}</p>
      <a className="back-email" href={`mailto:${profile.email}`}>
        <Mail size={16} aria-hidden="true" />
        {profile.email}
      </a>
    </div>
  );
}

function navAction(
  event: React.MouseEvent<HTMLAnchorElement>,
  chapter: ChapterId,
  onNavigate: (chapter: ChapterId) => void,
) {
  event.preventDefault();
  onNavigate(chapter);
}

// ###############################################
// Project Details
// ###############################################

function ProjectDetailView({ project }: { project: Project }) {
  return (
    <motion.section
      className="project-detail"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="project-detail-title"
    >
      <a className="back-link" href="#projects">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to book
      </a>

      <div className="project-detail-hero">
        <div className="project-detail-copy">
          <p className="book-label">{project.eyebrow}</p>
          <h1 id="project-detail-title">{project.title}</h1>
          {project.role && <p className="project-role">{project.role}</p>}
          <p>{project.description}</p>
          <div className="project-detail-actions">
            {project.githubUrl && (
              <a className="button button-primary" href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub
                <Github size={16} aria-hidden="true" />
              </a>
            )}
            {project.apkUrl && (
              <a className="button button-secondary" href={project.apkUrl}>
                Download APK
                <Download size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="project-detail-image">
          <img src={project.image} alt={`${project.title} preview`} />
        </div>
      </div>

      <div className="project-detail-grid">
        <section aria-labelledby="project-stack-title">
          <h2 id="project-stack-title">Stack</h2>
          <div className="chip-list">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section aria-labelledby="project-notes-title">
          <h2 id="project-notes-title">Notes</h2>
          <ul className="detail-list">
            {project.details.map((detail) => (
              <li key={detail}>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.section>
  );
}

// ###############################################
// Hooks
// ###############################################

function useMediaQuery(query: string) {
  const getMatches = () => (typeof window === "undefined" ? false : window.matchMedia(query).matches);
  const [matches, setMatches] = useState(getMatches);
  const stableQuery = useMemo(() => query, [query]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(stableQuery);
    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [stableQuery]);

  return matches;
}

export default App;
