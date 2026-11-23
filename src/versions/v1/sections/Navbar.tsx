import { useCallback, useEffect, useRef, useState } from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useScrolled, useScrollSpy } from '../hooks';
import { Symbol } from '../Symbol';

export interface NavLink {
  readonly id: string;
  readonly label: string;
}

interface NavbarProps {
  readonly initials: string;
  readonly links: readonly NavLink[];
  readonly resumeUrl?: string;
  readonly onToggleTheme: () => void;
}

function Logo({ initials }: { readonly initials: string }) {
  return (
    <span className="text-xl font-bold font-mono tracking-tighter">
      <span className="text-primary">&lt;</span>
      {initials}
      <span className="text-primary">/&gt;</span>
    </span>
  );
}

export function Navbar({ initials, links, resumeUrl, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useScrollSpy(links.map((l) => l.id));
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(menuOpen);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-shadow duration-300 ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center">
              <Logo initials={initials} />
            </a>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 font-mono text-sm">
                {links.map((link) => (
                  <a
                    key={link.id}
                    className={`nav-link hover:text-primary transition-colors ${active === link.id ? 'active' : ''}`}
                    href={`#${link.id}`}
                    aria-current={active === link.id ? 'location' : undefined}
                  >
                    ./{link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                <Symbol name="dark_mode" className="text-xl dark:hidden" />
                <Symbol name="light_mode" className="text-xl hidden dark:block text-yellow-300" />
              </button>

              {resumeUrl && (
                <a
                  className="hidden sm:inline-flex bg-primary hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md text-sm transition-colors items-center gap-2"
                  href={resumeUrl}
                  download
                >
                  <Symbol name="download" className="text-lg" />
                  git clone resume
                </a>
              )}

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Symbol name="menu" className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu fixed inset-0 z-[60] bg-background-dark/95 backdrop-blur-lg flex flex-col md:hidden ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <Logo initials={initials} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            className="p-2 rounded hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <Symbol name="close" className="text-2xl text-gray-700 dark:text-white" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow space-y-8 font-mono text-lg">
          {links.map((link) => (
            <a key={link.id} className="text-gray-300 hover:text-primary transition-colors" href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
              ./{link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
