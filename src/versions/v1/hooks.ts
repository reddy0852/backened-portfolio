import { useCallback, useEffect, useState, type RefObject } from 'react';

const THEME_KEY = 'portfolio-theme';

/** Dark/light toggle from the original site: dark by default, choice remembered. */
export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      return window.localStorage.getItem(THEME_KEY) !== 'light';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', dark);
    return () => html.classList.remove('dark');
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
      } catch {
        /* preference just won't persist */
      }
      return next;
    });
  }, []);

  return { dark, toggle } as const;
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolled(offset = 50): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}

/** Id of the section currently in the reading zone, for highlighting the nav link. */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(',');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );
    for (const id of key.split(',')) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [key]);
  return active;
}

/** Fades `.section-reveal` elements in as they enter the viewport. */
export function useReveal(container: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    root.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [container]);
}
