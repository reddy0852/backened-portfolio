import type { YearMonth } from '@/content/types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'] as const;

/** Months since year 0 — lets dates be compared and subtracted. Year-only dates count as January. */
export const monthIndex = (d: YearMonth): number => d.year * 12 + ((d.month ?? 1) - 1);

export const monthsBetween = (from: YearMonth, to: YearMonth): number => Math.max(0, monthIndex(to) - monthIndex(from));

export const currentYearMonth = (date: Date = new Date()): YearMonth => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

export const formatYearMonth = (d: YearMonth): string => (d.month ? `${MONTHS[d.month - 1]} ${d.year}` : String(d.year));

export const formatRange = (start: YearMonth, end?: YearMonth): string =>
  `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`;

const numberWord = (n: number): string => NUMBER_WORDS[n] ?? String(n);
const capitalise = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Human phrasing for a span of months that stays accurate as time passes,
 * e.g. 34 → "Nearly three years", 27 → "Over two years", 48 → "Four years".
 */
export function describeDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (years === 0) return months <= 1 ? 'One month' : `${capitalise(numberWord(months))} months`;
  if (remainder >= 9) return `Nearly ${numberWord(years + 1)} years`;
  if (remainder >= 3) return `Over ${numberWord(years)} year${years === 1 ? '' : 's'}`;
  return `${capitalise(numberWord(years))} year${years === 1 ? '' : 's'}`;
}
