import { useCallback, useState } from 'react';

const QUERY_PARAM = 'v';
const STORAGE_KEY = 'portfolio:version';

const readStored = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStored = (id: string): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage unavailable (private mode etc.) — the URL still carries the choice */
  }
};

/**
 * Resolves which site version to show: `?v=` in the URL wins, then the visitor's
 * last choice, then the default.
 *
 * Selecting a version reloads the page at `?v=<id>`. Versions are fully isolated
 * that way (one may ship global CSS such as Tailwind's base layer) and the URL is shareable.
 */
export function useActiveVersion<T extends { readonly id: string }>(versions: readonly T[], defaultId: string) {
  const [activeId] = useState<string>(() => {
    const has = (id: string | null): id is string => !!id && versions.some((v) => v.id === id);
    const fromUrl = new URLSearchParams(window.location.search).get(QUERY_PARAM);
    if (has(fromUrl)) return fromUrl;
    const stored = readStored();
    if (has(stored)) return stored;
    return defaultId;
  });

  const select = useCallback(
    (id: string) => {
      if (id === activeId || !versions.some((v) => v.id === id)) return;
      writeStored(id);
      const url = new URL(window.location.href);
      url.searchParams.set(QUERY_PARAM, id);
      url.hash = '';
      window.location.assign(url);
    },
    [activeId, versions],
  );

  const active = versions.find((v) => v.id === activeId) ?? versions[0];
  if (!active) throw new Error('useActiveVersion: no versions registered');
  return { active, select } as const;
}
