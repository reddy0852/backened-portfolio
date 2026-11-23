import { lazy } from 'react';
import type { SiteVersion } from './types';

/**
 * Site versions available in the switcher, listed newest first.
 * To add one: create `src/versions/<id>/Site.tsx` (default export), then add an entry here.
 * Each version is code-split and loaded on its own page load, so versions never
 * share CSS — a version may use CSS Modules, Tailwind or anything else.
 */
export const VERSIONS = [
  {
    id: 'v2',
    label: 'Through the stack',
    description: 'Light, layered glass with the stack up front',
    stylesheets: [
      'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Hanken+Grotesk:wght@400;500;600&display=swap',
    ],
    themeColor: '#E4E9F4',
    Site: lazy(() => import('./v2/Site')),
  },
  {
    id: 'v1',
    label: 'Terminal',
    description: 'The original dark terminal design',
    stylesheets: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
    ],
    themeColor: '#02040a',
    Site: lazy(() => import('./v1/Site')),
  },
] as const satisfies readonly SiteVersion[];

export const DEFAULT_VERSION_ID: (typeof VERSIONS)[number]['id'] = 'v2';
