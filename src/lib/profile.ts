import type { ContactDetails, Education, Role, YearMonth } from '@/content/types';
import { currentYearMonth, monthIndex, monthsBetween } from './dates';

/** Derived, read-only views over the content. Keep presentation out of here. */

export const byNewest = (a: { start: YearMonth }, b: { start: YearMonth }): number =>
  monthIndex(b.start) - monthIndex(a.start);

export const rolesNewestFirst = (roles: readonly Role[]): Role[] => [...roles].sort(byNewest);

export const currentRole = (roles: readonly Role[]): Role | undefined =>
  rolesNewestFirst(roles).find((role) => !role.end) ?? rolesNewestFirst(roles)[0];

/** Months from the first role's start until today. */
export function careerMonths(roles: readonly Role[], now: YearMonth = currentYearMonth()): number {
  const earliest = [...roles].sort(byNewest).at(-1);
  return earliest ? monthsBetween(earliest.start, now) : 0;
}

export const educationMonths = (education: readonly Education[]): number =>
  education.reduce((sum, e) => sum + monthsBetween(e.start, e.end), 0);

/** "2+" style label for whole years of experience. */
export const yearsLabel = (months: number): string => `${Math.floor(months / 12)}+`;

export const uniqueSkillCount = (layers: readonly { items: readonly string[] }[]): number =>
  new Set(layers.flatMap((layer) => layer.items.map((item) => item.toLowerCase()))).size;

export const uniqueCompanies = (roles: readonly Role[]): string[] => [...new Set(rolesNewestFirst(roles).map((r) => r.company))];

export interface ContactLink {
  readonly id: 'email' | 'linkedin' | 'github';
  readonly label: string;
  /** Short human-readable form, e.g. "github.com/reddy0852". */
  readonly handle: string;
  readonly href: string;
  readonly external: boolean;
}

const stripProtocol = (url: string): string => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export const contactLinks = (contact: ContactDetails): ContactLink[] => [
  { id: 'email', label: 'Email', handle: contact.email, href: `mailto:${contact.email}`, external: false },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: stripProtocol(contact.linkedin).replace('linkedin.com/', ''),
    href: contact.linkedin,
    external: true,
  },
  { id: 'github', label: 'GitHub', handle: stripProtocol(contact.github), href: contact.github, external: true },
];

/** Props for links that open in a new tab. */
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const;
