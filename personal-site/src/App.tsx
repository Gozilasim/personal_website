import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

function getInitialPage(): PageId {
  const hash = window.location.hash.replace("#", "");
  return pageIds.includes(hash as PageId) ? (hash as PageId) : "home";
}

function App() {
  const [page, setPage] = useState<PageId>(getInitialPage);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const activeLabel = useMemo(
    () => navItems.find((item) => item.id === page)?.label ?? "Home",
    [page],
  );

  return (
    <div className="page-canvas">
      <div className="site-shell">
        <Header activePage={page} activeLabel={activeLabel} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((value) => !value)} />

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
        </main>
      </div>
    </div>
  );
}

function Header({
  activePage,
  activeLabel,
  menuOpen,
  onMenuToggle,
}: {
  activePage: PageId;
  activeLabel: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
}) {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label={`${profile.name} home`}>
        <span>{profile.logo}</span>
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
        <span>{activeLabel}</span>
        <button className="menu-button" type="button" onClick={onMenuToggle} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <section className="home-layout" aria-labelledby="home-title">
      <div className="hero-avatar-wrap">
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

      <section className="skill-preview" aria-labelledby="experience-with">
        <h2 id="experience-with">Experience with</h2>
        <div className="skill-orbit">
          {featuredSkills.map((skill) => (
            <span key={skill.name} className="skill-token" title={skill.name} aria-label={skill.name}>
              <img src={skill.iconUrl} alt="" />
            </span>
          ))}
        </div>
      </section>
    </section>
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
          A small set of project previews for now. Replace these placeholders with real project assets
          and links when the portfolio side is ready.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <a href={project.href} aria-label={`Open ${project.title}`}>
              <img src={project.image} alt="" />
              <div className="project-card-body">
                <p>{project.eyebrow}</p>
                <h2>{project.title}</h2>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </a>
            <p className="project-description">{project.description}</p>
            <div className="stack-list" aria-label={`${project.title} stack`}>
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
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

export default App;
