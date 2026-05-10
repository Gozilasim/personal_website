/*
Created at: 2026-05-10 02:54
Updated at: 2026-05-10 18:15
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
type BookPhase =
  | "frontClosed"
  | "frontOpening"
  | "open"
  | "pageTurning"
  | "frontClosing"
  | "backClosing"
  | "backClosed"
  | "backOpening";
type TurnDirection = "next" | "prev";

type BookPage = {
  id: string;
  chapter: ChapterId;
  kind: BookPageKind;
  label: string;
};

type BookTurnState = {
  direction: TurnDirection;
  fromIndex: number;
  toIndex: number;
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

const bookMotion = {
  turnDuration: 0.85,
  mobileTurnDuration: 0.68,
  coverDuration: 0.9,
  coverCloseDuration: 0.75,
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

function isClosedHomeHash(hash: string) {
  const cleanHash = hash.replace("#", "").split("/")[0];

  return cleanHash === "" || cleanHash === "home";
}

function getInitialBookPhase(hash: string): BookPhase {
  return getProjectFromHash(hash) || !isClosedHomeHash(hash) ? "open" : "frontClosed";
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
  const [bookPhase, setBookPhase] = useState<BookPhase>(() => getInitialBookPhase(getSafeHash()));
  const [turning, setTurning] = useState<BookTurnState | null>(null);

  const activeProject = getProjectFromHash(hash);
  const displayedStart = getSpreadStart(pageIndex);
  const displayStart = displayedStart;
  const isBookBusy =
    bookPhase === "frontOpening" ||
    bookPhase === "frontClosing" ||
    bookPhase === "pageTurning" ||
    bookPhase === "backClosing" ||
    bookPhase === "backOpening";
  const isAtFrontEdge = isMobile ? pageIndex <= 0 : displayedStart <= 0;
  const isAtBackEdge = isMobile ? pageIndex >= bookPages.length - 1 : displayedStart >= bookPages.length - 2;
  const canGoPrev = !isBookBusy && (bookPhase === "backClosed" || bookPhase === "open");
  const canGoNext = bookPhase === "open" && !isBookBusy;

  const syncFromLocation = () => {
    const nextHash = getSafeHash();
    const nextProject = getProjectFromHash(nextHash);

    setHash(nextHash);

    if (!nextProject) {
      const nextChapter = getChapterFromHash(nextHash);
      setActiveChapter(nextChapter);
      setPageIndex(getPageIndexFromHash(nextHash));
      setTurning(null);
      setBookPhase(isClosedHomeHash(nextHash) ? "frontClosed" : "open");
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

  const openBook = () => {
    if (bookPhase !== "frontClosed") {
      return;
    }

    if (reducedMotion) {
      setBookPhase("open");
      return;
    }

    setBookPhase("frontOpening");
  };

  const finishOpening = () => {
    setBookPhase("open");
  };

  const finishFrontClosing = () => {
    setBookPhase("frontClosed");
  };

  const finishBackClosing = () => {
    setBookPhase("backClosed");
  };

  const finishBackOpening = () => {
    setBookPhase("open");
  };

  const returnToClosedHome = () => {
    if (isBookBusy) {
      return;
    }

    setActiveChapter("home");
    setPageIndex(0);
    setTurning(null);
    setBookPhase("frontClosed");
    writeHash("home");
  };

  const closeFrontCover = () => {
    if (isBookBusy) {
      return;
    }

    setActiveChapter("home");
    setPageIndex(0);
    setTurning(null);
    writeHash("home");
    setBookPhase(reducedMotion ? "frontClosed" : "frontClosing");
  };

  const closeBackCover = () => {
    if (isBookBusy) {
      return;
    }

    setActiveChapter("contact");
    setPageIndex(bookPages.length - 1);
    setTurning(null);
    writeHash("contact");
    setBookPhase(reducedMotion ? "backClosed" : "backClosing");
  };

  const openBackCover = () => {
    if (isBookBusy || bookPhase !== "backClosed") {
      return;
    }

    setActiveChapter("contact");
    setPageIndex(bookPages.length - 1);
    setTurning(null);
    writeHash("contact");
    setBookPhase(reducedMotion ? "open" : "backOpening");
  };

  const goToPage = (targetIndex: number, chapterOverride?: ChapterId) => {
    const targetPageIndex = clampIndex(targetIndex);
    const targetChapter = chapterOverride ?? bookPages[targetPageIndex].chapter;
    const targetStart = getSpreadStart(targetPageIndex);
    const currentStart = getSpreadStart(pageIndex);
    const currentPageIndex = pageIndex;
    const shouldTurn = isMobile ? targetPageIndex !== currentPageIndex : targetStart !== currentStart;
    const direction = isMobile
      ? targetPageIndex > currentPageIndex
        ? "next"
        : "prev"
      : targetStart > currentStart
        ? "next"
        : "prev";

    if (isBookBusy || bookPhase === "frontClosed" || bookPhase === "backClosed") {
      return;
    }

    setActiveChapter(targetChapter);
    writeHash(targetChapter);

    if (!shouldTurn) {
      setPageIndex(targetPageIndex);
      setTurning(null);
      setBookPhase("open");
      return;
    }

    setTurning({
      direction,
      fromIndex: currentPageIndex,
      toIndex: targetPageIndex,
      fromStart: currentStart,
      toStart: targetStart,
    });
    setBookPhase("pageTurning");
  };

  const finishTurn = () => {
    if (!turning) {
      return;
    }

    setPageIndex(turning.toIndex);
    setTurning(null);
    setBookPhase("open");
  };

  const goRelative = (direction: TurnDirection) => {
    if (isBookBusy) {
      return;
    }

    if (bookPhase === "backClosed") {
      if (direction === "prev") {
        openBackCover();
      }

      return;
    }

    if (bookPhase !== "open") {
      return;
    }

    if (direction === "prev" && isAtFrontEdge) {
      closeFrontCover();
      return;
    }

    if (direction === "next" && isAtBackEdge) {
      closeBackCover();
      return;
    }

    const delta = direction === "next" ? 1 : -1;
    const step = isMobile ? 1 : 2;
    const baseIndex = isMobile ? pageIndex : displayedStart;

    goToPage(baseIndex + delta * step);
  };

  return (
    <div className="portfolio-app">
      <Header onHome={returnToClosedHome} />

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
                bookPhase={bookPhase}
                canGoNext={canGoNext}
                canGoPrev={canGoPrev}
                displayStart={displayStart}
                isMobile={isMobile}
                pageIndex={pageIndex}
                reducedMotion={Boolean(reducedMotion)}
                turning={turning}
                onFinishBackClosing={finishBackClosing}
                onFinishBackOpening={finishBackOpening}
                onFinishFrontClosing={finishFrontClosing}
                onFinishOpening={finishOpening}
                onFinishTurn={finishTurn}
                onGoNext={() => goRelative("next")}
                onGoPrev={() => goRelative("prev")}
                onNavigate={(chapter) => goToPage(chapterPageIndex[chapter], chapter)}
                onOpenBackCover={openBackCover}
                onOpenBook={openBook}
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

function Header({ onHome }: { onHome: () => void }) {
  return (
    <header className="app-header">
      <a
        className="brand-link"
        href="#home"
        onClick={(event) => handleHomeClick(event, onHome)}
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

function handleHomeClick(event: React.MouseEvent<HTMLAnchorElement>, onHome: () => void) {
  event.preventDefault();
  onHome();
}

// ###############################################
// Book
// ###############################################

function BookFrame({
  activeChapter,
  bookPhase,
  canGoNext,
  canGoPrev,
  displayStart,
  isMobile,
  pageIndex,
  reducedMotion,
  turning,
  onFinishBackClosing,
  onFinishBackOpening,
  onFinishFrontClosing,
  onFinishOpening,
  onFinishTurn,
  onGoNext,
  onGoPrev,
  onNavigate,
  onOpenBackCover,
  onOpenBook,
}: {
  activeChapter: ChapterId;
  bookPhase: BookPhase;
  canGoNext: boolean;
  canGoPrev: boolean;
  displayStart: number;
  isMobile: boolean;
  pageIndex: number;
  reducedMotion: boolean;
  turning: BookTurnState | null;
  onFinishBackClosing: () => void;
  onFinishBackOpening: () => void;
  onFinishFrontClosing: () => void;
  onFinishOpening: () => void;
  onFinishTurn: () => void;
  onGoNext: () => void;
  onGoPrev: () => void;
  onNavigate: (chapter: ChapterId) => void;
  onOpenBackCover: () => void;
  onOpenBook: () => void;
}) {
  const isFrontClosedSurface = bookPhase === "frontClosed";
  const isFrontOpening = bookPhase === "frontOpening";
  const isBackClosedSurface = bookPhase === "backClosed";
  const isClosedSurface = isFrontClosedSurface || isBackClosedSurface;
  const isPageTurning = bookPhase === "pageTurning" && Boolean(turning);
  const isCoverAnimating =
    bookPhase === "frontOpening" ||
    bookPhase === "frontClosing" ||
    bookPhase === "backClosing" ||
    bookPhase === "backOpening";
  const mobilePageIndex = pageIndex;
  const mobilePage = bookPages[mobilePageIndex];
  const progressLabel = isMobile
    ? `${pageIndex + 1} / ${bookPages.length}`
    : `${displayStart / 2 + 1} / ${bookPages.length / 2}`;
  const activeLabel = isFrontClosedSurface || isFrontOpening
    ? "Portfolio Book"
    : isBackClosedSurface
      ? "Back Cover"
      : bookPages[isMobile ? pageIndex : displayStart].label;
  const coverProgressLabel = bookPhase === "frontOpening" || bookPhase === "backOpening" ? "Opening" : "Closing";
  const activeProgress = isClosedSurface ? "Closed" : isCoverAnimating ? coverProgressLabel : progressLabel;
  const shouldShowPrevControl =
    bookPhase === "backClosed" ||
    (!isFrontClosedSurface &&
      !isFrontOpening &&
      bookPhase !== "frontClosing" &&
      bookPhase !== "backClosing" &&
      bookPhase !== "backOpening");
  const shouldShowNextControl =
    !isClosedSurface &&
    !isFrontOpening &&
    bookPhase !== "frontClosing" &&
    bookPhase !== "backClosing" &&
    bookPhase !== "backOpening";

  return (
    <div className={`book-area is-${bookPhase}`}>
      <div className="book-status" aria-live="polite">
        <span>{activeLabel}</span>
        <span>{activeProgress}</span>
      </div>

      <div className={`book-stage is-${bookPhase}`}>
        {shouldShowPrevControl && (
          <button
            className="book-control book-control-left"
            type="button"
            onClick={onGoPrev}
            disabled={!canGoPrev}
            aria-label="Previous page"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
        )}

        {isFrontClosedSurface ? (
          <ClosedBook
            coverSide="front"
            onOpenBook={onOpenBook}
          />
        ) : isBackClosedSurface ? (
          <ClosedBook
            coverSide="back"
            onOpenBook={onOpenBackCover}
          />
        ) : (
          <div
            className={`book is-${bookPhase} ${isMobile ? "is-mobile" : ""} ${
              turning ? `is-turning-${turning.direction}` : ""
            }`}
            aria-live="polite"
          >
            <span className="book-board book-board-left" aria-hidden="true" />
            <span className="book-board book-board-right" aria-hidden="true" />
            <span className="book-page-stack book-page-stack-left" aria-hidden="true" />
            <span className="book-page-stack book-page-stack-right" aria-hidden="true" />
            <span className="book-top-pages" aria-hidden="true" />

            {isMobile ? (
              <>
                {isPageTurning && turning && !reducedMotion && (
                  <StationaryTargetPage
                    activeChapter={activeChapter}
                    isMobile={isMobile}
                    onNavigate={onNavigate}
                    turning={turning}
                  />
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobilePage.id}
                    className="mobile-page-shell"
                    initial={reducedMotion ? false : { opacity: 0, x: 18 }}
                    animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, x: -18 }}
                    transition={{ duration: reducedMotion ? 0.22 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <BookPageView
                      activeChapter={activeChapter}
                      page={mobilePage}
                      pageIndex={mobilePageIndex}
                      side="single"
                      onNavigate={onNavigate}
                    />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                  {isPageTurning && turning && !reducedMotion && (
                    <TurningPage
                      activeChapter={activeChapter}
                      isMobile={isMobile}
                      turning={turning}
                      onFinishTurn={onFinishTurn}
                      onNavigate={onNavigate}
                    />
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <BookSpreadView
                  activeChapter={activeChapter}
                  className="book-spread-current"
                  onNavigate={onNavigate}
                  startIndex={displayStart}
                />

                {isPageTurning && turning && !reducedMotion && (
                  <StationaryTargetPage
                    activeChapter={activeChapter}
                    isMobile={isMobile}
                    onNavigate={onNavigate}
                    turning={turning}
                  />
                )}

                <AnimatePresence>
                  {isPageTurning && turning && !reducedMotion && (
                    <TurningPage
                      activeChapter={activeChapter}
                      isMobile={isMobile}
                      turning={turning}
                      onFinishTurn={onFinishTurn}
                      onNavigate={onNavigate}
                    />
                  )}
                </AnimatePresence>
              </>
            )}

            <AnimatePresence>
              {isPageTurning && reducedMotion && (
                <motion.div
                  className="reduced-turn-layer"
                  initial={{ opacity: 0, x: turning?.direction === "next" ? 18 : -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onAnimationComplete={onFinishTurn}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!reducedMotion && bookPhase === "frontOpening" && (
                <CoverLeaf direction="frontOpen" isMobile={isMobile} onComplete={onFinishOpening} />
              )}
              {!reducedMotion && bookPhase === "frontClosing" && (
                <CoverLeaf direction="frontClose" isMobile={isMobile} onComplete={onFinishFrontClosing} />
              )}
              {!reducedMotion && bookPhase === "backClosing" && (
                <CoverLeaf direction="backClose" isMobile={isMobile} onComplete={onFinishBackClosing} />
              )}
              {!reducedMotion && bookPhase === "backOpening" && (
                <CoverLeaf direction="backOpen" isMobile={isMobile} onComplete={onFinishBackOpening} />
              )}
            </AnimatePresence>
          </div>
        )}

        {shouldShowNextControl && (
          <button
            className="book-control book-control-right"
            type="button"
            onClick={onGoNext}
            disabled={!canGoNext}
            aria-label="Next page"
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function BookSpreadView({
  activeChapter,
  className = "",
  onNavigate,
  startIndex,
}: {
  activeChapter: ChapterId;
  className?: string;
  onNavigate: (chapter: ChapterId) => void;
  startIndex: number;
}) {
  const leftPage = bookPages[startIndex];
  const rightPage = bookPages[startIndex + 1];

  return (
    <div className={`book-spread ${className}`}>
      <BookPageView activeChapter={activeChapter} page={leftPage} pageIndex={startIndex} side="left" onNavigate={onNavigate} />
      <span className="book-spine" aria-hidden="true" />
      <BookPageView
        activeChapter={activeChapter}
        page={rightPage}
        pageIndex={startIndex + 1}
        side="right"
        onNavigate={onNavigate}
      />
    </div>
  );
}

function StationaryTargetPage({
  activeChapter,
  isMobile,
  onNavigate,
  turning,
}: {
  activeChapter: ChapterId;
  isMobile: boolean;
  onNavigate: (chapter: ChapterId) => void;
  turning: BookTurnState;
}) {
  const pageIndex = isMobile
    ? turning.toIndex
    : turning.direction === "next"
      ? turning.toStart + 1
      : turning.toStart;
  const side = isMobile ? "single" : turning.direction === "next" ? "right" : "left";
  const page = bookPages[clampIndex(pageIndex)];

  return (
    <div className={`stationary-target-page is-${side}`} aria-hidden="true">
      <BookPageView activeChapter={activeChapter} page={page} pageIndex={pageIndex} side={side} onNavigate={onNavigate} isTurning />
    </div>
  );
}

function ClosedBook({
  coverSide,
  onOpenBook,
}: {
  coverSide: "front" | "back";
  onOpenBook: () => void;
}) {
  const isBackCover = coverSide === "back";
  const coverTitle = isBackCover ? "Thank You" : profile.name;
  const coverSubtitle = isBackCover ? profile.name : profile.role;
  const coverKicker = isBackCover ? "Back Cover" : "Portfolio Book";
  const actionLabel = isBackCover ? "Open Back" : "Open Book";

  return (
    <motion.button
      className={`closed-book is-${coverSide}-cover`}
      type="button"
      onClick={onOpenBook}
      aria-label={isBackCover ? "Open back cover" : "Open portfolio book"}
      initial={false}
      animate={{ y: 0, scale: 1, rotateX: 0 }}
      whileHover={{ y: -4, scale: 1.012, rotateX: 2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <span className="closed-book-pages" aria-hidden="true" />
      <span className="closed-book-back" aria-hidden="true" />
      <span className="closed-book-cover">
        <span className="closed-book-kicker">{coverKicker}</span>
        <strong>{coverTitle}</strong>
        <span>{coverSubtitle}</span>
        <span className="closed-book-open">
          {actionLabel}
          {isBackCover ? <ArrowLeft size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
        </span>
      </span>
    </motion.button>
  );
}

function CoverLeaf({
  direction,
  isMobile,
  onComplete,
}: {
  direction: "frontOpen" | "frontClose" | "backClose" | "backOpen";
  isMobile: boolean;
  onComplete: () => void;
}) {
  const isFront = direction === "frontOpen" || direction === "frontClose";
  const isOpening = direction === "frontOpen" || direction === "backOpen";
  const openAngle = isMobile ? 158 : 164;
  const openX = isMobile ? "26%" : "34%";
  const duration = isOpening
    ? (isMobile ? bookMotion.coverDuration * 0.82 : bookMotion.coverDuration)
    : (isMobile ? bookMotion.coverCloseDuration * 0.82 : bookMotion.coverCloseDuration);
  const ease: [number, number, number, number] = isOpening
    ? [0.34, 1.56, 0.64, 1]
    : [0.65, 0, 0.35, 1];

  const fromRotateY = isOpening
    ? 0
    : isFront ? -openAngle : openAngle;
  const toRotateY = isOpening
    ? (isFront ? -openAngle : openAngle)
    : 0;

  const fromX = isOpening
    ? "0%"
    : isFront ? `-${openX}` : openX;
  const toX = isOpening
    ? (isFront ? `-${openX}` : openX)
    : "0%";

  const fromZ = isOpening ? 36 : 80;
  const midZ = 80;
  const toZ = isOpening ? 80 : 36;

  return (
    <motion.div
      className={`cover-leaf ${isFront ? "is-front" : "is-back"} ${
        isOpening ? "is-opening-cover" : ""
      }`}
      aria-hidden="true"
      initial={{ rotateY: fromRotateY, x: fromX, z: fromZ, opacity: 1 }}
      animate={{
        rotateY: [fromRotateY, toRotateY],
        x: [fromX, toX],
        z: [fromZ, midZ, toZ],
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease, times: [0, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className="cover-leaf-content">
        <span>{isFront ? "Portfolio Book" : "Back Cover"}</span>
        <strong>{isFront ? profile.name : "Thank You"}</strong>
      </div>
    </motion.div>
  );
}

function TurningPage({
  activeChapter,
  isMobile,
  onFinishTurn,
  onNavigate,
  turning,
}: {
  activeChapter: ChapterId;
  isMobile: boolean;
  onFinishTurn: () => void;
  onNavigate: (chapter: ChapterId) => void;
  turning: BookTurnState;
}) {
  const outgoingPageIndex = isMobile
    ? turning.fromIndex
    : turning.direction === "next"
      ? turning.fromStart + 1
      : turning.fromStart;
  const incomingPageIndex = isMobile
    ? turning.toIndex
    : turning.direction === "next"
      ? turning.toStart
      : turning.toStart + 1;
  const outgoingPage = bookPages[clampIndex(outgoingPageIndex)];
  const incomingPage = bookPages[clampIndex(incomingPageIndex)];
  const duration = isMobile ? bookMotion.mobileTurnDuration : bookMotion.turnDuration;
  const isNext = turning.direction === "next";
  const outgoingRotate = isNext ? -172 : 172;
  const incomingRotate = isNext ? 172 : -172;
  const lift = isNext ? "-3.6%" : "3.6%";
  const incomingLift = isNext ? "3.6%" : "-3.6%";
  const outgoingSide = isMobile ? "single" : isNext ? "right" : "left";
  const incomingSide = isMobile ? "single" : isNext ? "left" : "right";
  const outgoingTiltX = isNext ? [0, -1.6, -0.4] : [0, 1.6, 0.4];
  const outgoingTiltZ = isNext ? [0, -1.4, -0.3] : [0, 1.4, 0.3];
  const incomingTiltX = isNext ? [1.6, 0.3, 0] : [-1.6, -0.3, 0];
  const incomingTiltZ = isNext ? [1.2, 0.2, 0] : [-1.2, -0.2, 0];

  return (
    <div
      key={`${turning.direction}-${turning.fromIndex}-${turning.toIndex}`}
      className={`turning-page-set is-${turning.direction} ${isMobile ? "is-mobile-turn" : ""}`}
    >
      <motion.div
        className={`turning-page turning-page-outgoing is-${turning.direction} is-${outgoingSide} ${
          isMobile ? "is-mobile-turn" : ""
        }`}
        initial={{ rotateY: 0, rotateX: 0, rotateZ: 0, x: "0%", scaleX: 1, z: 44, opacity: 1 }}
        animate={{
          rotateY: [0, outgoingRotate * 0.55, outgoingRotate],
          rotateX: outgoingTiltX,
          rotateZ: outgoingTiltZ,
          x: ["0%", lift, lift],
          scaleX: [1, 0.92, 1],
          z: [44, 110, 60],
          opacity: [1, 1, 0],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: duration,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.48, 1],
        }}
      >
        <BookPageView
          activeChapter={activeChapter}
          page={outgoingPage}
          pageIndex={outgoingPageIndex}
          side={outgoingSide}
          onNavigate={onNavigate}
          isTurning
        />
      </motion.div>

      <motion.div
        className={`turning-page turning-page-incoming is-${turning.direction} is-${incomingSide} ${
          isMobile ? "is-mobile-turn" : ""
        }`}
        initial={{
          rotateY: incomingRotate,
          rotateX: incomingTiltX[0],
          rotateZ: incomingTiltZ[0],
          x: incomingLift,
          scaleX: 1,
          z: 60,
          opacity: 0,
        }}
        animate={{
          rotateY: [incomingRotate, incomingRotate * 0.35, 0],
          rotateX: incomingTiltX,
          rotateZ: incomingTiltZ,
          x: [incomingLift, incomingLift, "0%"],
          scaleX: [1, 0.92, 1],
          z: [60, 110, 44],
          opacity: [0, 1, 1],
        }}
        exit={{ opacity: 0 }}
        transition={{
          delay: duration * 0.18,
          duration: duration * 0.82,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.42, 1],
        }}
        onAnimationComplete={onFinishTurn}
      >
        <BookPageView
          activeChapter={activeChapter}
          page={incomingPage}
          pageIndex={incomingPageIndex}
          side={incomingSide}
          onNavigate={onNavigate}
          isTurning
        />
      </motion.div>
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
  const getMatches = () => {
    if (typeof window === "undefined") {
      return false;
    }

    const mediaMatches = window.matchMedia(query).matches;
    const viewportWidth = Math.min(
      window.innerWidth || Number.POSITIVE_INFINITY,
      window.visualViewport?.width || Number.POSITIVE_INFINITY,
      document.documentElement.clientWidth || Number.POSITIVE_INFINITY,
    );
    const maxWidthMatch = query.includes("max-width: 760px") && viewportWidth <= 760;

    return mediaMatches || maxWidthMatch;
  };
  const [matches, setMatches] = useState(getMatches);
  const stableQuery = useMemo(() => query, [query]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(stableQuery);
    const handleChange = () => setMatches(getMatches());
    const handleResize = () => setMatches(getMatches());

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [stableQuery]);

  return matches;
}

export default App;
