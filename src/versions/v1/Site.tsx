import { Fragment, useRef, type ReactNode } from 'react';
import type { SiteProps } from '../types';
import { useReveal, useTheme } from './hooks';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Navbar, type NavLink } from './sections/Navbar';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import './styles.css';

interface SectionEntry extends NavLink {
  /** Shown in the top navigation (the original nav listed home, experience, skills and contact). */
  readonly inNav: boolean;
  readonly node: ReactNode;
}

/** v1 — the original terminal-themed portfolio, rebuilt as data-driven React. */
export default function SiteV1({ profile }: SiteProps) {
  const { toggle } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  const sections: SectionEntry[] = [
    { id: 'experience', label: 'experience', inNav: true, node: <Experience roles={profile.roles} education={profile.education} /> },
    { id: 'skills', label: 'skills', inNav: true, node: <Skills skills={profile.skills} /> },
    ...(profile.certifications.length > 0
      ? [{ id: 'certifications', label: 'certifications', inNav: false, node: <Certifications certifications={profile.certifications} /> }]
      : []),
    ...(profile.projects.length > 0 ? [{ id: 'projects', label: 'projects', inNav: true, node: <Projects projects={profile.projects} /> }] : []),
    { id: 'contact', label: 'contact', inNav: true, node: <Contact contact={profile.contact} /> },
  ];

  const navLinks: NavLink[] = [{ id: 'home', label: 'home' }, ...sections.filter((s) => s.inNav)];

  return (
    <div
      ref={rootRef}
      className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 font-display transition-colors duration-300 antialiased min-h-screen"
    >
      <Navbar initials={profile.initials} links={navLinks} resumeUrl={profile.resumeUrl} onToggleTheme={toggle} />
      <div className="site-wrapper bg-background-light dark:bg-background-dark min-h-screen">
        <main id="main">
          <Hero profile={profile} />
          {sections.map((section) => (
            <Fragment key={section.id}>
              <div className="section-divider" />
              {section.node}
            </Fragment>
          ))}
        </main>
        <Footer name={profile.name} />
      </div>
    </div>
  );
}
