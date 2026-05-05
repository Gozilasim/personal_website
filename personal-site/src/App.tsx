import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ComponentType,
  type ReactNode,
} from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Download,
  Github,
  Handshake,
  Mail,
  Menu,
  Monitor,
  Moon,
  PlayCircle,
  Sun,
  Volume2,
  VolumeX,
  X,
  type LucideProps,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import brandLogoAnimated from "./assets/brand-gozilasim.gif";
import brandLogoStatic from "./assets/brand-gozilasim-static.png";
import {
  contactLinks,
  expenseTrackerDetail,
  experience,
  featuredSkills,
  navItems,
  profile,
  projects,
  ransomwareDetectionDetail,
  skillGroups,
  type PageId,
} from "./content/profile";

const pageIds: PageId[] = ["home", "about", "projects", "skills", "contact"];
const expenseTrackerSlug = "project-expense-tracker";
const ransomwareDetectionSlug = "ransomware-detection";
const expenseTrackerCanonicalHash = "#projects/project-expense-tracker";
const expenseTrackerLegacyHash = "#project-expense-tracker";
const themeStorageKey = "personal-site-theme";
const bgmEnabledStorageKey = "personal-site-bgm-enabled-v3";
const bgmVolumeStorageKey = "personal-site-bgm-volume-v3";
const bgmSrc = "/audio/bgm.m4a";
const defaultBgmVolume = 0.2;
type ProjectItem = (typeof projects)[number];
const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

type ThemePreference = (typeof themeOptions)[number]["value"];

const avatarVisualizerBars = Array.from({ length: 56 }, (_, index) => {
  const colors = ["#2e9cff", "#6f6bff", "#b15cff", "#ff4fa3", "#ff744f"];
  const wave = Math.sin(index * 1.37) + Math.cos(index * 0.71);
  const height = Math.round(12 + Math.abs(wave) * 8 + (index % 4) * 2);

  return {
    angle: (360 / 56) * index,
    color: colors[index % colors.length],
    delay: -((index % 14) * 0.09 + Math.floor(index / 14) * 0.04),
    height,
    pulseScale: (1.18 + (index % 5) * 0.08).toFixed(2),
  };
});
type ResolvedTheme = "light" | "dark";
type ProjectZoomRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};
type ProjectZoomState = {
  project: ProjectItem;
  sourceRect: ProjectZoomRect;
  targetRect: ProjectZoomRect;
  targetHref: string;
};
const projectRevealContainerVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.985, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};
const projectRevealItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};
function getCanonicalProjectHref(href: string) {
  return href === expenseTrackerLegacyHash ? expenseTrackerCanonicalHash : href;
}

function isProjectDetailHref(href: string) {
  return href.startsWith("#projects/") || href.startsWith("#project-");
}

function getProjectReturnHrefFromHash(hash: string) {
  const projectSlug = getProjectSlugFromHash(hash);

  return projectSlug ? `#projects/${projectSlug}` : null;
}

function getProjectIndexByHref(items: ProjectItem[], href?: string | null) {
  if (!href) {
    return -1;
  }

  const canonicalHref = getCanonicalProjectHref(href);
  return items.findIndex((project) => getCanonicalProjectHref(project.href) === canonicalHref);
}

function getProjectBySlug(slug?: string | null) {
  if (!slug) {
    return undefined;
  }

  return projects.find((project) => project.slug === slug);
}

function getProjectSlugFromHash(hash: string) {
  const canonicalHash = getCanonicalProjectHref(hash);
  const match = /^#projects\/([^/?#]+)/.exec(canonicalHash);
  const slug = match?.[1];

  return slug && getProjectBySlug(slug) ? slug : null;
}

function parseProjectDate(value?: string) {
  if (!value) {
    return null;
  }

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function getCompleteMonthDifference(fromDate: Date, toDate: Date) {
  let months =
    (toDate.getFullYear() - fromDate.getFullYear()) * 12 + toDate.getMonth() - fromDate.getMonth();

  if (toDate.getDate() < fromDate.getDate()) {
    months -= 1;
  }

  return Math.max(0, months);
}

function formatRelativeUnit(value: number, unit: "month" | "day" | "hour" | "minute") {
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

function formatProjectCreatedAgo(createdAt: string | undefined, now: Date) {
  const createdDate = parseProjectDate(createdAt);

  if (!createdDate) {
    return null;
  }

  const elapsedMs = now.getTime() - createdDate.getTime();

  if (elapsedMs < 60 * 1000) {
    return "Created just now";
  }

  const months = getCompleteMonthDifference(createdDate, now);

  if (months >= 1) {
    return `Created ${formatRelativeUnit(months, "month")} ago`;
  }

  const minutes = Math.floor(elapsedMs / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return `Created ${formatRelativeUnit(days, "day")} ago`;
  }

  if (hours >= 1) {
    return `Created ${formatRelativeUnit(hours, "hour")} ago`;
  }

  return `Created ${formatRelativeUnit(minutes, "minute")} ago`;
}

function getInitialPage(): PageId {
  const hash = window.location.hash.replace("#", "");

  if (getProjectSlugFromHash(window.location.hash)) {
    return "project-detail";
  }

  if (hash.startsWith("projects/")) {
    return "projects";
  }

  return pageIds.includes(hash as PageId) ? (hash as PageId) : "home";
}

function getInitialThemePreference(): ThemePreference {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  return themeOptions.some((option) => option.value === savedTheme)
    ? (savedTheme as ThemePreference)
    : "system";
}

function getInitialBgmEnabled(): boolean {
  const savedValue = window.localStorage.getItem(bgmEnabledStorageKey);
  return savedValue === null ? true : savedValue === "true";
}

function getInitialBgmVolume(): number {
  const savedValue = Number(window.localStorage.getItem(bgmVolumeStorageKey));
  return Number.isFinite(savedValue) && savedValue >= 0 && savedValue <= 1
    ? savedValue
    : defaultBgmVolume;
}

function resolveTheme(themePreference: ThemePreference): ResolvedTheme {
  if (themePreference !== "system") {
    return themePreference;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [page, setPage] = useState<PageId>(getInitialPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>(getInitialThemePreference);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(getInitialThemePreference()),
  );
  const [bgmEnabled, setBgmEnabled] = useState(getInitialBgmEnabled);
  const [bgmVolume, setBgmVolume] = useState(getInitialBgmVolume);
  const [bgmBlocked, setBgmBlocked] = useState(false);
  const [bgmUnavailable, setBgmUnavailable] = useState(false);
  const [projectZoom, setProjectZoom] = useState<ProjectZoomState | null>(null);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(() =>
    getProjectSlugFromHash(window.location.hash),
  );
  const [returnFocusProjectHref, setReturnFocusProjectHref] = useState<string | null>(() =>
    getProjectReturnHrefFromHash(window.location.hash),
  );
  const [now, setNow] = useState(() => new Date());
  const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();
  const activeProjectDetail = getProjectBySlug(activeProjectSlug);
  const activeNavPage = page === "project-detail" ? "projects" : page;
  const isProjectZooming = projectZoom !== null;
  const pageKey = page === "project-detail" ? `${page}-${activeProjectSlug ?? "missing"}` : page;
  const pageInitial = reducedMotion
    ? false
    : isProjectZooming
      ? { opacity: 0, scale: 0.985, filter: "blur(2px)" }
      : { opacity: 0, y: 18, filter: "blur(8px)" };
  const pageAnimate = reducedMotion
    ? undefined
    : isProjectZooming
      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
      : { opacity: 1, y: 0, filter: "blur(0px)" };
  const pageExit = reducedMotion
    ? undefined
    : isProjectZooming
      ? { opacity: 0, scale: 1.015, filter: "blur(4px)" }
      : { opacity: 0, y: -14, filter: "blur(8px)" };

  const startProjectZoom = (project: ProjectItem, sourceElement: HTMLElement, targetHref: string) => {
    const canonicalTargetHref = getCanonicalProjectHref(targetHref);
    const sourceBox = sourceElement.getBoundingClientRect();
    const headerBox = document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect();
    const targetTop = Math.max(0, Math.round(headerBox?.bottom ?? 64));

    setReturnFocusProjectHref(canonicalTargetHref);
    setProjectZoom({
      project,
      sourceRect: {
        top: sourceBox.top,
        left: sourceBox.left,
        width: sourceBox.width,
        height: sourceBox.height,
      },
      targetRect: {
        top: targetTop,
        left: 0,
        width: window.innerWidth,
        height: Math.max(window.innerHeight - targetTop, sourceBox.height),
      },
      targetHref: canonicalTargetHref,
    });
    window.location.hash = canonicalTargetHref;
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === expenseTrackerLegacyHash) {
        window.history.replaceState(null, "", expenseTrackerCanonicalHash);
      }

      const nextProjectSlug = getProjectSlugFromHash(window.location.hash);

      if (window.location.hash.startsWith("#projects/") && !nextProjectSlug) {
        window.history.replaceState(null, "", "#projects");
      }

      const nextPage = getInitialPage();
      const nextProjectReturnHref = getProjectReturnHrefFromHash(window.location.hash);

      if (nextProjectReturnHref) {
        setReturnFocusProjectHref(nextProjectReturnHref);
      } else if (nextPage !== "projects") {
        setReturnFocusProjectHref(null);
      }

      setActiveProjectSlug(nextProjectSlug);
      setPage(nextPage);
      setMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#home");
    }

    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [page]);

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const nextResolvedTheme = resolveTheme(themePreference);
      setResolvedTheme((currentTheme) =>
        currentTheme === nextResolvedTheme ? currentTheme : nextResolvedTheme,
      );
      document.documentElement.dataset.theme = nextResolvedTheme;
      document.documentElement.style.colorScheme = nextResolvedTheme;
    };

    window.localStorage.setItem(themeStorageKey, themePreference);
    applyTheme();

    if (themePreference !== "system") {
      return undefined;
    }

    systemTheme.addEventListener("change", applyTheme);
    return () => systemTheme.removeEventListener("change", applyTheme);
  }, [themePreference]);

  useEffect(() => {
    const audio = audioRef.current;

    window.localStorage.setItem(bgmVolumeStorageKey, String(bgmVolume));

    if (!audio) {
      return;
    }

    audio.volume = bgmVolume;
    audio.muted = bgmVolume <= 0;
  }, [bgmVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    let cancelled = false;

    window.localStorage.setItem(bgmEnabledStorageKey, String(bgmEnabled));

    if (!audio) {
      return undefined;
    }

    if (!bgmEnabled || bgmUnavailable) {
      audio.pause();
      setBgmBlocked(false);
      return undefined;
    }

    const playAudio = async () => {
      try {
        await audio.play();

        if (!cancelled) {
          setBgmBlocked(false);
        }
      } catch {
        if (!cancelled) {
          setBgmBlocked(true);
        }
      }
    };

    void playAudio();

    return () => {
      cancelled = true;
    };
  }, [bgmEnabled, bgmUnavailable]);

  useEffect(() => {
    if (!bgmEnabled || bgmUnavailable) {
      return undefined;
    }

    const retryPlayback = async () => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      try {
        await audio.play();
        setBgmBlocked(false);
      } catch {
        setBgmBlocked(true);
      }
    };

    window.addEventListener("pointerdown", retryPlayback, true);
    window.addEventListener("keydown", retryPlayback, true);

    return () => {
      window.removeEventListener("pointerdown", retryPlayback, true);
      window.removeEventListener("keydown", retryPlayback, true);
    };
  }, [bgmEnabled, bgmUnavailable]);

  return (
    <div className="page-canvas">
      <div className="site-shell">
        <CelestialBackdrop theme={resolvedTheme} />
        <audio
          ref={audioRef}
          src={bgmSrc}
          autoPlay={bgmEnabled}
          loop
          preload="auto"
          onCanPlay={() => setBgmUnavailable(false)}
          onError={() => {
            setBgmUnavailable(true);
            setBgmBlocked(false);
          }}
        />
        <Header
          activePage={activeNavPage}
          bgmEnabled={bgmEnabled}
          bgmUnavailable={bgmUnavailable}
          bgmVolume={bgmVolume}
          menuOpen={menuOpen}
          themePreference={themePreference}
          onBgmToggle={() => {
            const nextEnabled = !bgmEnabled;
            const audio = audioRef.current;

            setBgmEnabled(nextEnabled);

            if (!audio) {
              return;
            }

            if (!nextEnabled) {
              audio.pause();
              setBgmBlocked(false);
              return;
            }

            void audio
              .play()
              .then(() => setBgmBlocked(false))
              .catch(() => setBgmBlocked(true));
          }}
          onBgmVolumeChange={setBgmVolume}
          onMenuToggle={() => setMenuOpen((value) => !value)}
          onThemeChange={setThemePreference}
        />

        <main className="site-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageKey}
              className={`page-view page-${page}`}
              initial={pageInitial}
              animate={pageAnimate}
              exit={pageExit}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {page === "home" && <HomePage />}
              {page === "about" && <AboutPage />}
              {page === "projects" && (
                <ProjectsPage
                  now={now}
                  initialProjectHref={returnFocusProjectHref}
                  onInitialProjectFocused={() => setReturnFocusProjectHref(null)}
                  onProjectZoom={startProjectZoom}
                />
              )}
              {page === "project-detail" && activeProjectDetail && (
                <ProjectDetailPage project={activeProjectDetail} now={now} />
              )}
              {page === "skills" && <SkillsPage />}
              {page === "contact" && <ContactPage />}
            </motion.div>
          </AnimatePresence>
          {page !== "project-detail" && <PageFooter />}
        </main>
        <AnimatePresence>
          {projectZoom && !reducedMotion && (
            <ProjectZoomOverlay zoom={projectZoom} onComplete={() => setProjectZoom(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CelestialBackdrop({ theme }: { theme: ResolvedTheme }) {
  const prefersReducedMotion = useReducedMotion();
  const bodyClassName = theme === "dark" ? "is-moon" : "is-sun";
  const visibleOpacity = theme === "dark" ? 0.76 : 0.82;

  return (
    <div className="celestial-backdrop" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={theme}
          className={`celestial-body ${bodyClassName}`}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 160, scale: 0.92 }}
          animate={
            prefersReducedMotion
              ? { opacity: visibleOpacity }
              : { opacity: visibleOpacity, y: 0, scale: 1 }
          }
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -180, scale: 0.96 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.18, ease: "easeOut" }
              : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }
          }
        />
      </AnimatePresence>
    </div>
  );
}

function Header({
  activePage,
  bgmEnabled,
  bgmUnavailable,
  bgmVolume,
  menuOpen,
  themePreference,
  onBgmToggle,
  onBgmVolumeChange,
  onMenuToggle,
  onThemeChange,
}: {
  activePage: PageId;
  bgmEnabled: boolean;
  bgmUnavailable: boolean;
  bgmVolume: number;
  menuOpen: boolean;
  themePreference: ThemePreference;
  onBgmToggle: () => void;
  onBgmVolumeChange: (volume: number) => void;
  onMenuToggle: () => void;
  onThemeChange: (themePreference: ThemePreference) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label={`${profile.name} home`}>
        <img
          src={prefersReducedMotion ? brandLogoStatic : brandLogoAnimated}
          alt=""
          width="150"
          height="46"
        />
      </a>

      <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activePage === item.id ? "is-active" : ""}
            aria-current={activePage === item.id ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
        <a className="resume-link" href={profile.resumePath} download>
          Resume
          <ArrowDownToLine size={14} aria-hidden="true" />
        </a>
      </nav>

      <div className="header-meta">
        <AudioControl
          enabled={bgmEnabled}
          unavailable={bgmUnavailable}
          volume={bgmVolume}
          onToggle={onBgmToggle}
          onVolumeChange={onBgmVolumeChange}
        />
        <ThemeToggle themePreference={themePreference} onThemeChange={onThemeChange} />
        <button className="menu-button" type="button" onClick={onMenuToggle} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function AudioControl({
  enabled,
  unavailable,
  volume,
  onToggle,
  onVolumeChange,
}: {
  enabled: boolean;
  unavailable: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}) {
  const [panelOpen, setPanelOpen] = useState(false);
  const volumePercent = Math.round(volume * 100);
  const isAudible = enabled && volumePercent > 0 && !unavailable;
  const AudioIcon = isAudible ? Volume2 : VolumeX;
  const buttonLabel = unavailable
    ? "Audio unavailable"
    : enabled
      ? `BGM is on at ${volumePercent} percent`
      : "BGM is off";

  return (
    <div
      className={`audio-control ${panelOpen ? "is-open" : ""} ${unavailable ? "is-unavailable" : ""}`}
      onMouseEnter={() => setPanelOpen(true)}
      onMouseLeave={() => setPanelOpen(false)}
      onFocus={() => setPanelOpen(true)}
      onBlur={(event) => {
        const nextFocus = event.relatedTarget;

        if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
          setPanelOpen(false);
        }
      }}
    >
      <button
        className="audio-toggle"
        type="button"
        aria-label={buttonLabel}
        aria-haspopup="true"
        aria-expanded={panelOpen}
        disabled={unavailable}
        onClick={() => {
          onToggle();
          setPanelOpen(true);
        }}
      >
        <AudioIcon size={16} aria-hidden="true" />
      </button>

      <div className="audio-popover" role="group" aria-label="BGM volume">
        <div className="audio-volume-row">
          <input
            className="audio-volume"
            type="range"
            min="0"
            max="100"
            step="1"
            value={volumePercent}
            disabled={unavailable}
            aria-label="BGM volume"
            onChange={(event) => onVolumeChange(Number(event.currentTarget.value) / 100)}
          />
          <span className="audio-volume-value">
            {unavailable ? "No audio" : `${volumePercent}%`}
          </span>
        </div>
        <span className="audio-status" aria-live="polite">
          {unavailable ? "Audio unavailable" : enabled ? "Sound on" : "Sound off"}
        </span>
      </div>
    </div>
  );
}

function ThemeToggle({
  themePreference,
  onThemeChange,
}: {
  themePreference: ThemePreference;
  onThemeChange: (themePreference: ThemePreference) => void;
}) {
  const activeTheme = themeOptions.find((option) => option.value === themePreference) ?? themeOptions[2];
  const ActiveIcon = activeTheme.icon;
  const nextTheme =
    themePreference === "light" ? "dark" : themePreference === "dark" ? "system" : "light";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Current theme: ${activeTheme.label}. Switch to ${nextTheme} theme`}
      onClick={() => onThemeChange(nextTheme)}
    >
      <ActiveIcon size={16} aria-hidden="true" />
    </button>
  );
}

function HomePage() {
  return (
    <section className="home-layout" aria-labelledby="home-title">
      <div className="hero-avatar-wrap">
        <div className="avatar-visualizer" aria-hidden="true">
          {avatarVisualizerBars.map((bar, index) => (
            <span
              key={index}
              className="avatar-visualizer-bar"
              style={
                {
                  "--angle": `${bar.angle}deg`,
                  "--bar-color": bar.color,
                  "--bar-delay": `${bar.delay}s`,
                  "--bar-height": `${bar.height}px`,
                  "--pulse-scale": bar.pulseScale,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <img className="hero-avatar" src={profile.avatarUrl} alt={`${profile.name} portrait`} />
      </div>

      <p className="hero-kicker">{profile.role}</p>
      <h1 id="home-title">
        I <span>design</span> interfaces, build <span>Python</span> backends, and connect them with <span>AI</span> systems.
      </h1>
      <p className="hero-copy">{profile.bio}</p>

      <div className="hero-actions" aria-label="Primary actions">
        <a className="button button-primary" href="#contact">
          Get in touch
          <Mail size={16} aria-hidden="true" />
        </a>
        <a className="button button-secondary" href="#projects">
          Explore work
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>

      <section className="skill-preview" aria-labelledby="core-stack">
        <h2 id="core-stack">Core stack</h2>
        <div className="stack-marquee" aria-label="Core stack logos" tabIndex={0}>
          <div className="stack-track">
            <div className="stack-group">
              {featuredSkills.map((skill) => (
                <StackToken
                  key={skill.name}
                  name={skill.name}
                  iconUrl={skill.iconUrl}
                  videoUrl={skill.videoUrl}
                  posterUrl={skill.posterUrl}
                  fallbackText={skill.fallbackText}
                  isMonochrome={skill.isMonochrome}
                  needsContrast={skill.needsContrast}
                />
              ))}
            </div>
            <div className="stack-group" aria-hidden="true">
              {featuredSkills.map((skill) => (
                <StackToken
                  key={`copy-${skill.name}`}
                  name={skill.name}
                  iconUrl={skill.iconUrl}
                  videoUrl={skill.videoUrl}
                  posterUrl={skill.posterUrl}
                  fallbackText={skill.fallbackText}
                  isMonochrome={skill.isMonochrome}
                  needsContrast={skill.needsContrast}
                  duplicate
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function StackToken({
  name,
  iconUrl,
  videoUrl,
  posterUrl,
  fallbackText,
  isMonochrome = false,
  needsContrast = false,
  duplicate = false,
}: {
  name: string;
  iconUrl: string;
  videoUrl?: string;
  posterUrl?: string;
  fallbackText?: string;
  isMonochrome?: boolean;
  needsContrast?: boolean;
  duplicate?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      className={`skill-token ${isMonochrome ? "is-monochrome" : ""} ${needsContrast ? "needs-contrast" : ""}`}
      title={name}
      aria-label={duplicate ? undefined : name}
      role={duplicate ? undefined : "img"}
      tabIndex={duplicate ? -1 : 0}
    >
      {videoUrl && !prefersReducedMotion ? (
        <video
          className="skill-logo-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl ?? iconUrl}
          aria-hidden="true"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={posterUrl ?? iconUrl}
          alt=""
          onError={(event) => {
            event.currentTarget.parentElement?.classList.add("is-fallback");
          }}
        />
      )}
      <span className="stack-fallback" aria-hidden="true">
        {fallbackText ?? name}
      </span>
    </span>
  );
}

function AboutPage() {
  return (
    <section className="content-page about-grid" aria-labelledby="about-title">
      <div>
        <p className="section-label">About</p>
        <h1 id="about-title">A personal site for building in public, quietly.</h1>
      </div>
      <div className="about-copy">
        <p>{profile.about}</p>
        <p>
          This first version keeps the structure simple: a strong landing page, a few selected projects,
          a clear skill snapshot, and direct contact links. The goal is to feel personal before it feels like
          a resume.
        </p>
        <div className="about-facts" aria-label="Profile facts">
          <span>Design-aware frontend</span>
          <span>Static first</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage({
  now,
  initialProjectHref,
  onInitialProjectFocused,
  onProjectZoom,
}: {
  now: Date;
  initialProjectHref?: string | null;
  onInitialProjectFocused: () => void;
  onProjectZoom: (project: ProjectItem, sourceElement: HTMLElement, targetHref: string) => void;
}) {
  return (
    <section className="content-page" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="section-label accent-coral">Projects</p>
        <h1 id="projects-title">Selected work, no card graveyard.</h1>
        <p>
          Experiments, shipped pieces, and real builds—without turning this page into a graveyard.
        </p>
      </div>

      <ProjectCoverflow
        items={projects}
        now={now}
        initialProjectHref={initialProjectHref}
        onInitialProjectFocused={onInitialProjectFocused}
        onProjectZoom={onProjectZoom}
      />
    </section>
  );
}

function ProjectCoverflow({
  items,
  now,
  initialProjectHref,
  onInitialProjectFocused,
  onProjectZoom,
}: {
  items: ProjectItem[];
  now: Date;
  initialProjectHref?: string | null;
  onInitialProjectFocused?: () => void;
  onProjectZoom: (project: ProjectItem, sourceElement: HTMLElement, targetHref: string) => void;
}) {
  const initialProjectIndex = getProjectIndexByHref(items, initialProjectHref);
  const [activeIndex, setActiveIndex] = useState(initialProjectIndex >= 0 ? initialProjectIndex : 0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const didDragRef = useRef(false);
  const clickStartActiveIndexRef = useRef(activeIndex);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });
  const reducedMotion = useReducedMotion();
  const activeProject = items[activeIndex] ?? items[0];

  const syncActiveIndex = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-project-slide]"));
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - trackCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const handleScroll = () => {
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      syncActiveIndex();
    });
  };

  const scrollToProject = (index: number, behavior?: ScrollBehavior) => {
    const track = trackRef.current;
    const targetIndex = Math.max(0, Math.min(index, items.length - 1));
    const target = track?.querySelector<HTMLElement>(`[data-project-index="${targetIndex}"]`);

    if (!track || !target) {
      return;
    }

    target.scrollIntoView({
      behavior: behavior ?? (reducedMotion ? "auto" : "smooth"),
      block: "nearest",
      inline: "center",
    });
    clickStartActiveIndexRef.current = targetIndex;
    setActiveIndex(targetIndex);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const track = trackRef.current;

    if (!track) {
      return;
    }

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    clickStartActiveIndexRef.current = activeIndex;
    didDragRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track || !dragState.current.active) {
      return;
    }

    const deltaX = event.clientX - dragState.current.startX;
    const isDragIntent = Math.abs(deltaX) > 6;

    if (isDragIntent && !event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    didDragRef.current = didDragRef.current || isDragIntent;
    track.scrollLeft = dragState.current.scrollLeft - deltaX;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragState.current.active = false;
    setIsDragging(false);
    syncActiveIndex();
  };

  const handleTrackClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!didDragRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
  };

  const handleProjectClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
      didDragRef.current = false;
      return;
    }

    const project = items[index];
    const isProjectDetailLink = isProjectDetailHref(project.href);

    if (index === clickStartActiveIndexRef.current) {
      if (isProjectDetailLink && !reducedMotion) {
        event.preventDefault();
        event.stopPropagation();
        onProjectZoom(project, event.currentTarget, getCanonicalProjectHref(project.href));
      }

      return;
    }

    event.preventDefault();
    scrollToProject(index);
  };

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToProject(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToProject(activeIndex + 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      scrollToProject(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      scrollToProject(items.length - 1);
    }
  };

  useEffect(() => {
    const targetIndex = getProjectIndexByHref(items, initialProjectHref);

    if (initialProjectHref && targetIndex === -1) {
      syncActiveIndex();
      onInitialProjectFocused?.();
    } else if (targetIndex >= 0) {
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        scrollToProject(targetIndex, "auto");
        onInitialProjectFocused?.();
      });
    } else {
      syncActiveIndex();
    }

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [items.length]);

  if (!activeProject) {
    return null;
  }

  const activeProjectTitle = activeProject.detailTitle ?? activeProject.title;

  return (
    <div className="project-coverflow" aria-label="Project coverflow">
      <div className="project-coverflow-stage">
        <button
          className="coverflow-arrow"
          type="button"
          onClick={() => scrollToProject(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous project"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>

        <div
          ref={trackRef}
          className={`project-coverflow-track ${isDragging ? "is-dragging" : ""}`}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onKeyDown={handleTrackKeyDown}
          onClickCapture={handleTrackClickCapture}
          tabIndex={0}
          role="listbox"
          aria-label="Browse projects horizontally"
          aria-activedescendant={`project-slide-${activeIndex}`}
        >
          {items.map((project, index) => {
            const offset = index - activeIndex;
            const clampedOffset = Math.max(-2, Math.min(2, offset));
            const absOffset = Math.min(Math.abs(offset), 3);
            const slideStyle = {
              "--project-depth": reducedMotion ? "0px" : `${absOffset * -64}px`,
              "--project-opacity": reducedMotion ? "1" : String(Math.max(0.38, 1 - absOffset * 0.26)),
              "--project-rotate": reducedMotion ? "0deg" : `${clampedOffset * -6}deg`,
              "--project-scale": reducedMotion ? "1" : String(Math.max(0.78, 1 - absOffset * 0.11)),
            } as CSSProperties;

            return (
              <article
                id={`project-slide-${index}`}
                className={`project-slide ${index === activeIndex ? "is-active" : ""}`}
                key={project.title}
                data-project-slide
                data-project-index={index}
                role="option"
                aria-selected={index === activeIndex}
                style={slideStyle}
              >
                <a
                  href={project.href}
                  onClick={(event) => handleProjectClick(event, index)}
                  aria-label={`${index === activeIndex ? "Open" : "Select"} ${project.title}`}
                >
                  <img src={project.image} alt="" draggable="false" />
                  <div className="project-card-body">
                    <p>{project.eyebrow}</p>
                    <h2>{project.title}</h2>
                    <ProjectTimeMeta createdAt={project.createdAt} now={now} variant="card" />
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </div>
                </a>
              </article>
            );
          })}
        </div>

        <button
          className="coverflow-arrow"
          type="button"
          onClick={() => scrollToProject(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          aria-label="Next project"
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="project-active-panel" aria-live="polite">
        <div>
          <p>{activeProject.eyebrow}</p>
          <h2>{activeProjectTitle}</h2>
          <ProjectTimeMeta createdAt={activeProject.createdAt} now={now} variant="panel" />
          <span className="project-active-count">
            {activeIndex + 1} / {items.length}
          </span>
        </div>
        <p>{activeProject.description}</p>
        <div className="stack-list" aria-label={`${activeProjectTitle} stack`}>
          {activeProject.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="project-progress" aria-label="Project position">
        {items.map((project, index) => (
          <button
            key={project.title}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => scrollToProject(index)}
            aria-label={`Show ${project.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectTimeMeta({
  createdAt,
  now,
  variant,
}: {
  createdAt?: string;
  now: Date;
  variant: "card" | "panel" | "detail";
}) {
  const label = formatProjectCreatedAgo(createdAt, now);

  if (!label) {
    return null;
  }

  return (
    <span className={`project-time-meta project-time-meta-${variant}`}>
      <Clock3 size={14} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function ProjectRoleMeta({ label }: { label: string }) {
  return (
    <span className="project-role-meta">
      <Handshake size={14} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function ProjectZoomOverlay({
  zoom,
  onComplete,
}: {
  zoom: ProjectZoomState;
  onComplete: () => void;
}) {
  return (
    <motion.div
      className="project-zoom-overlay"
      aria-hidden="true"
      initial={{
        top: zoom.sourceRect.top,
        left: zoom.sourceRect.left,
        width: zoom.sourceRect.width,
        height: zoom.sourceRect.height,
        borderRadius: 16,
        opacity: 1,
      }}
      animate={{
        top: zoom.targetRect.top,
        left: zoom.targetRect.left,
        width: zoom.targetRect.width,
        height: zoom.targetRect.height,
        borderRadius: 0,
        opacity: [1, 1, 0],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1] as const,
        opacity: { duration: 0.72, times: [0, 0.82, 1] },
      }}
      onAnimationComplete={onComplete}
    >
      <img src={zoom.project.image} alt="" draggable="false" />
      <div className="project-card-body">
        <p>{zoom.project.eyebrow}</p>
        <h2>{zoom.project.title}</h2>
        <ArrowUpRight size={18} aria-hidden="true" />
      </div>
    </motion.div>
  );
}

function ProjectLinkAction({
  href,
  label,
  icon: Icon,
  download,
}: {
  href?: string;
  label: string;
  icon: ComponentType<LucideProps>;
  download?: boolean;
}) {
  const content = (
    <>
      <span>
        <strong>{label}</strong>
        {!href && <small>Coming soon</small>}
      </span>
      <Icon size={16} aria-hidden="true" />
    </>
  );

  if (!href) {
    return (
      <span className="project-link-action is-disabled" aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a
      className="project-link-action"
      href={href}
      target="_blank"
      rel="noreferrer"
      download={download ? true : undefined}
    >
      {content}
    </a>
  );
}

function ProjectReveal({
  children,
  className,
  ariaLabel,
  ariaLabelledby,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <section className={className} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      variants={projectRevealContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -90px 0px" }}
    >
      {children}
    </motion.section>
  );
}

function ProjectDetailPage({ project, now }: { project: ProjectItem; now: Date }) {
  const isExpenseTracker = project.slug === expenseTrackerSlug;
  const isRansomwareDetection = project.slug === ransomwareDetectionSlug;
  const displayTitle = project.detailTitle ?? project.title;
  const projectIntro = isExpenseTracker
    ? expenseTrackerDetail.intro
    : isRansomwareDetection
      ? ransomwareDetectionDetail.intro
      : project.description;
  const projectTitleId = `project-${project.slug}-title`;
  const hasProjectLinks = Boolean(project.githubUrl || project.apkUrl);
  const reducedMotion = useReducedMotion();
  const [backControlScrolled, setBackControlScrolled] = useState(() => window.scrollY > 80);
  const backLinkClassName = `project-back-link ${backControlScrolled ? "is-scrolled" : ""}`;

  useEffect(() => {
    const updateBackControlState = () => setBackControlScrolled(window.scrollY > 80);

    updateBackControlState();
    window.addEventListener("scroll", updateBackControlState, { passive: true });

    return () => window.removeEventListener("scroll", updateBackControlState);
  }, [project.slug]);

  const backLinkContent = (
    <>
      <span className="project-back-icon">
        <ArrowLeft size={15} aria-hidden="true" />
      </span>
      <span className="project-back-text">Back to Projects</span>
    </>
  );

  return (
    <section className="content-page project-detail-page" aria-labelledby={projectTitleId}>
      {reducedMotion ? (
        <a className={backLinkClassName} href="#projects" aria-label="Back to Projects">
          {backLinkContent}
        </a>
      ) : (
        <motion.a
          className={backLinkClassName}
          href="#projects"
          aria-label="Back to Projects"
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ x: -2, scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {backLinkContent}
        </motion.a>
      )}

      <ProjectReveal className="project-detail-hero" ariaLabel={`${project.title} overview`}>
        <div className="project-detail-copy">
          <p className="section-label accent-coral">{project.eyebrow}</p>
          <h1 id={projectTitleId}>{displayTitle}</h1>
          <p className="project-detail-intro">{projectIntro}</p>
          {isRansomwareDetection && <ProjectRoleMeta label={ransomwareDetectionDetail.roleLabel} />}
          <ProjectTimeMeta createdAt={project.createdAt} now={now} variant="detail" />

          <div className="stack-list project-detail-stack" aria-label={`${displayTitle} stack`}>
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {hasProjectLinks && (
            <div className="project-detail-actions" aria-label="Project links">
              {project.githubUrl && <ProjectLinkAction href={project.githubUrl} label="GitHub repo" icon={Github} />}
              {project.apkUrl && (
                <ProjectLinkAction href={project.apkUrl} label="Download APK" icon={Download} download />
              )}
            </div>
          )}
        </div>

        <figure className="project-detail-visual">
          <img src={project.image} alt={`${project.title} preview`} />
        </figure>
      </ProjectReveal>

      {isExpenseTracker && (
        <>
          <ProjectReveal className="project-demo-section" ariaLabelledby="expense-demo-title">
            <div className="project-section-heading">
              <p className="section-label accent-blue">Demo</p>
              <h2 id="expense-demo-title">Video walkthrough</h2>
              <p>A phone-recorded walkthrough of the My Expense mobile flow.</p>
            </div>

            <div className="project-demo-frame">
              {project.demoVideo ? (
                <div className="demo-device-shell">
                  <video controls preload="metadata" poster={project.image}>
                    <source src={project.demoVideo} />
                  </video>
                </div>
              ) : (
                <div className="project-demo-placeholder">
                  <PlayCircle size={34} aria-hidden="true" />
                  <strong>Demo video coming soon</strong>
                  <span>Recording will show receipt scanning, monthly review, and expense entry flow.</span>
                </div>
              )}
            </div>
          </ProjectReveal>

          <ProjectReveal className="project-story-grid" ariaLabel="Expense tracker explanation">
            {expenseTrackerDetail.sections.map((section, index) => (
              <motion.article key={section.title} className="project-story-panel" variants={projectRevealItemVariants}>
                <span className="project-story-index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </ProjectReveal>

          <ProjectReveal className="project-flow-section" ariaLabelledby="expense-flow-title">
            <div className="project-section-heading">
              <p className="section-label accent-coral">App flow</p>
              <h2 id="expense-flow-title">From receipt to monthly insight</h2>
              <p>The main path is built around quick capture, review, and local spending analysis.</p>
            </div>

            <div className="project-flow-timeline">
              {expenseTrackerDetail.flowSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  className="project-flow-step"
                  variants={projectRevealItemVariants}
                >
                  <span className="project-flow-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </motion.article>
              ))}
            </div>
          </ProjectReveal>

          <ProjectReveal className="project-decisions-section" ariaLabelledby="expense-decisions-title">
            <div className="project-section-heading">
              <p className="section-label accent-blue">Technical decisions</p>
              <h2 id="expense-decisions-title">Why the app is built this way</h2>
              <p>These choices keep the app predictable, private by default, and practical for daily use.</p>
            </div>

            <div className="project-decision-grid">
              {expenseTrackerDetail.technicalDecisions.map((decision) => (
                <motion.article
                  key={decision.title}
                  className="project-decision-card"
                  variants={projectRevealItemVariants}
                  whileHover={reducedMotion ? undefined : { y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <h3>{decision.title}</h3>
                  <p>{decision.body}</p>
                </motion.article>
              ))}
            </div>
          </ProjectReveal>

          <ProjectReveal className="project-roadmap-section" ariaLabelledby="expense-roadmap-title">
            <div className="project-section-heading">
              <p className="section-label">Next improvements</p>
              <h2 id="expense-roadmap-title">Where it can grow next</h2>
            </div>

            <div className="project-roadmap-strip">
              {expenseTrackerDetail.nextImprovements.map((item, index) => (
                <motion.div key={item} className="project-roadmap-item" variants={projectRevealItemVariants}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>
          </ProjectReveal>

          <ProjectReveal className="project-final-links" ariaLabelledby="expense-links-title">
            <div>
              <p className="section-label accent-coral">Links</p>
              <h2 id="expense-links-title">Repo and install</h2>
              <p>Open the source repository or download the Android release build.</p>
            </div>

            <div className="project-detail-actions">
              {project.githubUrl && <ProjectLinkAction href={project.githubUrl} label="GitHub repo" icon={Github} />}
              {project.apkUrl && (
                <ProjectLinkAction href={project.apkUrl} label="Download APK" icon={Download} download />
              )}
            </div>
          </ProjectReveal>
        </>
      )}

      {isRansomwareDetection && (
        <RansomwareDetectionSections project={project} reducedMotion={reducedMotion} />
      )}
    </section>
  );
}

function RansomwareDetectionSections({
  project,
  reducedMotion,
}: {
  project: ProjectItem;
  reducedMotion: boolean | null;
}) {
  return (
    <>
      <ProjectReveal className="project-scope-section" ariaLabelledby="ransomware-scope-title">
        <div className="project-section-heading">
          <p className="section-label accent-blue">Problem & Project Scope</p>
          <h2 id="ransomware-scope-title">A controlled detection MVP, not production antivirus</h2>
          <p>
            The project explores ransomware signals through static PE analysis and behavior-window monitoring
            while keeping its limits clear.
          </p>
        </div>

        <div className="project-story-grid">
          {ransomwareDetectionDetail.scopeItems.map((item, index) => (
            <motion.article key={item.title} className="project-story-panel" variants={projectRevealItemVariants}>
              <span className="project-story-index">{String(index + 1).padStart(2, "0")}</span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </div>
      </ProjectReveal>

      <ProjectReveal className="project-flow-section" ariaLabelledby="ransomware-pipeline-title">
        <div className="project-section-heading">
          <p className="section-label accent-coral">Detection Pipeline</p>
          <h2 id="ransomware-pipeline-title">From controlled folder to review action</h2>
          <p>
            The system separates static file scanning from behavior-window monitoring, then brings the results
            back into one dashboard review flow.
          </p>
        </div>

        <div className="project-flow-timeline project-security-pipeline">
          {ransomwareDetectionDetail.pipelineSteps.map((step, index) => (
            <motion.article key={step.title} className="project-flow-step" variants={projectRevealItemVariants}>
              <span className="project-flow-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </motion.article>
          ))}
        </div>
      </ProjectReveal>

      <ProjectReveal className="project-security-dual" ariaLabel="Static and behavior detection paths">
        {[ransomwareDetectionDetail.staticScan, ransomwareDetectionDetail.behaviorMonitoring].map((section) => (
          <motion.article key={section.title} className="project-security-panel" variants={projectRevealItemVariants}>
            <p className="section-label accent-blue">{section.title}</p>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            <ul>
              {section.items.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="project-feature-chips" aria-label={`${section.title} features`}>
              {section.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </ProjectReveal>

      <ProjectReveal className="project-decisions-section" ariaLabelledby="ransomware-architecture-title">
        <div className="project-section-heading">
          <p className="section-label accent-coral">System Architecture</p>
          <h2 id="ransomware-architecture-title">A dashboard, API, database, and model layer working together</h2>
          <p>Each layer keeps one responsibility so the MVP remains understandable and demo-friendly.</p>
        </div>

        <div className="project-decision-grid">
          {ransomwareDetectionDetail.architectureItems.map((item) => (
            <motion.article
              key={item.title}
              className="project-decision-card"
              variants={projectRevealItemVariants}
              whileHover={reducedMotion ? undefined : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </div>
      </ProjectReveal>

      <ProjectReveal className="project-dashboard-proof-section" ariaLabelledby="ransomware-dashboard-title">
        <div className="project-section-heading">
          <p className="section-label accent-blue">Dashboard Proof</p>
          <h2 id="ransomware-dashboard-title">The UI proves the backend flow is reviewable</h2>
          <p>Instead of only returning predictions, the dashboard keeps scans, monitoring, and quarantine state inspectable.</p>
        </div>

        <div className="project-dashboard-grid">
          {ransomwareDetectionDetail.dashboardPages.map((page) => (
            <motion.article key={page.title} className="project-dashboard-panel" variants={projectRevealItemVariants}>
              <h3>{page.title}</h3>
              <ul>
                {page.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </ProjectReveal>

      <ProjectReveal className="project-security-callout" ariaLabelledby="ransomware-quarantine-title">
        <div>
          <p className="section-label accent-coral">Quarantine Workflow</p>
          <h2 id="ransomware-quarantine-title">Manual review before file action</h2>
          <p>
            Suspicious scan results and monitoring candidates are reviewed by the user before quarantine. The action
            is best-effort and can be restored from quarantine history.
          </p>
        </div>
        <div className="project-feature-chips" aria-label="Quarantine properties">
          <span>Manual quarantine</span>
          <span>Restore action</span>
          <span>Scan or monitoring source</span>
          <span>SQLite audit trail</span>
        </div>
      </ProjectReveal>

      <ProjectReveal className="project-decisions-section" ariaLabelledby="ransomware-decisions-title">
        <div className="project-section-heading">
          <p className="section-label">Technical Decisions</p>
          <h2 id="ransomware-decisions-title">Why the MVP is built this way</h2>
        </div>

        <div className="project-decision-grid">
          {ransomwareDetectionDetail.technicalDecisions.map((decision) => (
            <motion.article
              key={decision.title}
              className="project-decision-card"
              variants={projectRevealItemVariants}
              whileHover={reducedMotion ? undefined : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </motion.article>
          ))}
        </div>
      </ProjectReveal>

      <ProjectReveal className="project-security-limits" ariaLabel="Ransomware detection limitations">
        <motion.article className="project-security-panel" variants={projectRevealItemVariants}>
          <p className="section-label accent-blue">Limitations</p>
          <h2>What this project does not claim</h2>
          <ul>
            {ransomwareDetectionDetail.limitations.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </ProjectReveal>

      {project.githubUrl && (
        <ProjectReveal className="project-final-links" ariaLabelledby="ransomware-links-title">
          <div>
            <p className="section-label accent-coral">Source</p>
            <h2 id="ransomware-links-title">Open the implementation</h2>
            <p>The repository contains the FastAPI backend, React dashboard, notebooks, model bundles, and Docker setup.</p>
          </div>

          <div className="project-detail-actions">
            <ProjectLinkAction href={project.githubUrl} label="GitHub repo" icon={Github} />
          </div>
        </ProjectReveal>
      )}
    </>
  );
}

function SkillsPage() {
  return (
    <section className="content-page" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="section-label accent-blue">Skills</p>
        <h1 id="skills-title">Tools and habits behind the build.</h1>
        <p>
          A compact view of the things this site should signal: visual thinking, front-end implementation,
          and careful finishing work.
        </p>
      </div>

      <div className="skill-grid">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article className="skill-panel" key={group.title}>
              <Icon size={24} aria-hidden="true" />
              <h2>{group.title}</h2>
              <p>{group.body}</p>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="experience-list" aria-label="Experience notes">
        {experience.map((item) => {
          const Icon = item.icon;
          return (
            <article key={`${item.role}-${item.period}`}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h2>
                  {item.role}
                  <span>{item.company}</span>
                </h2>
                <p>{item.body}</p>
              </div>
              <time>{item.period}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="content-page contact-layout" aria-labelledby="contact-title">
      <div>
        <p className="section-label">Contact</p>
        <h1 id="contact-title">Let&apos;s connect and build something together.</h1>
        <p>
          Have an idea, a project, or a note about the site? Send a message and I will get back to you.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            Email me
            <Mail size={16} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href={profile.resumePath} download>
            Download resume
            <ArrowDownToLine size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="contact-card" aria-label="Contact links">
        {contactLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
              <Icon size={20} aria-hidden="true" />
              <span>
                <strong>{link.label}</strong>
                {link.value}
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </section>
  );
}

function PageFooter() {
  return (
    <footer className="page-footer" aria-labelledby="footer-contact-title">
      <div className="page-footer-inner">
        <h2 id="footer-contact-title">Contact</h2>
        <p>
          Full-stack AI developer building useful web experiences with clear interfaces, Python
          backends, and practical AI systems.
        </p>
        <a className="footer-email" href={`mailto:${profile.email}`}>
          <Mail size={15} aria-hidden="true" />
          {profile.email}
        </a>
        <div className="footer-socials" aria-label="Social links">
          {contactLinks.slice(1).map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={link.label}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default App;
