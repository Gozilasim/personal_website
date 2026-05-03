import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Menu,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import brandLogoAnimated from "./assets/brand-gozilasim.gif";
import brandLogoStatic from "./assets/brand-gozilasim-static.png";
import {
  contactLinks,
  experience,
  featuredSkills,
  navItems,
  profile,
  projects,
  skillGroups,
  type PageId,
} from "./content/profile";

const pageIds: PageId[] = ["home", "about", "projects", "skills", "contact"];
const themeStorageKey = "personal-site-theme";
const bgmEnabledStorageKey = "personal-site-bgm-enabled-v2";
const bgmVolumeStorageKey = "personal-site-bgm-volume-v2";
const bgmSrc = "https://rr1---sn-npoe7ndy.googlevideo.com/videoplayback?expire=1777839470&ei=Dln3adfjJMLFg8UP2e3M0A0&ip=2406%3Ab400%3Ab5%3Aede5%3A740e%3A608f%3A6441%3A4d7c&id=o-AM6_HGySuA-M8O_BAXIcuknkAYLGvy5vv_lb6S-ZOY5N&itag=139&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=336&bui=AbKmrwoAxdFO4g3Yt4Qw5kTojzlkZp6Zqh9Ot5GHhNFGM8jI-JF7udtfdU2kRDg5-N7oB7YShKUTYsgi&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=66534380&dur=10911.056&lmt=1777133143656295&keepalive=yes&fexp=51565115,51565681&c=ANDROID_VR&txp=5532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AHEqNM4wRQIhAJLgK2zDQwUK6gLeUNfZVdsZqK3AEQ80lkponxF6TL1nAiB42Np3-WWYv7v2bI6tvF7f8F2wFmo3BcM0_NEY2tkoig%3D%3D&rm=sn-5jucgv5qc5oq-itqe7s,sn-h55sr7e&rrc=79,104,191&req_id=46fa64b2bb97a3ee&rms=nxu,au&ipbypass=yes&redirect_counter=3&cm2rm=sn-30ass7l&cms_redirect=yes&cmsv=e&met=1777817938,&mh=59&mip=2001:e68:545a:4a11:146b:75d2:c67e:65f5&mm=34&mn=sn-npoe7ndy&ms=ltu&mt=1777817554&mv=m&mvi=1&pl=50&lsparams=cps,ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRgIhAJzfG3Q9gtJpXdNv1_Zefvw2_XBLaJWfn2V65zSxZmfoAiEA4m1f3qzmZ0unitH_Do8wf9fJyfIfYljUyCxGdw03TbM%3D";
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
function getInitialPage(): PageId {
  const hash = window.location.hash.replace("#", "");
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getInitialPage());
      setMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#home");
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [page]);

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
          activePage={page}
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
              key={page}
              className={`page-view page-${page}`}
              initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -14, filter: "blur(8px)" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {page === "home" && <HomePage />}
              {page === "about" && <AboutPage />}
              {page === "projects" && <ProjectsPage />}
              {page === "skills" && <SkillsPage />}
              {page === "contact" && <ContactPage />}
            </motion.div>
          </AnimatePresence>
          <PageFooter />
        </main>
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
          {unavailable ? "Audio unavailable" : enabled ? "BGM on" : "BGM off"}
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

function ProjectsPage() {
  return (
    <section className="content-page" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="section-label accent-coral">Projects</p>
        <h1 id="projects-title">Selected work, kept focused.</h1>
        <p>
          A wider project shelf for experiments, shipped pieces, and focused builds without turning the
          page into a wall of cards.
        </p>
      </div>

      <ProjectCoverflow items={projects} />
    </section>
  );
}

function ProjectCoverflow({ items }: { items: ProjectItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const didDragRef = useRef(false);
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

  const scrollToProject = (index: number) => {
    const track = trackRef.current;
    const targetIndex = Math.max(0, Math.min(index, items.length - 1));
    const target = track?.querySelector<HTMLElement>(`[data-project-index="${targetIndex}"]`);

    if (!track || !target) {
      return;
    }

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
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

    if (index === activeIndex) {
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
    syncActiveIndex();

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [items.length]);

  if (!activeProject) {
    return null;
  }

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
          <h2>{activeProject.title}</h2>
          <span>
            {activeIndex + 1} / {items.length}
          </span>
        </div>
        <p>{activeProject.description}</p>
        <div className="stack-list" aria-label={`${activeProject.title} stack`}>
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
