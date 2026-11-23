import type { CSSProperties } from 'react';
import type { Education, Role, YearMonth } from '@/content/types';
import { currentYearMonth, describeDuration, formatRange, monthIndex } from '@/lib/dates';
import { careerMonths, educationMonths, externalLinkProps, rolesNewestFirst, uniqueCompanies } from '@/lib/profile';
import base from '../base.module.css';
import { copy } from '../copy';
import styles from './Experience.module.css';

interface ExperienceProps {
  readonly roles: readonly Role[];
  readonly education: readonly Education[];
}

export function Experience({ roles, education }: ExperienceProps) {
  const now = currentYearMonth();
  const production = describeDuration(careerMonths(roles, now));
  const groundworkMonths = educationMonths(education);
  const title = groundworkMonths
    ? `${production} in production, ${describeDuration(groundworkMonths).toLowerCase()} of groundwork.`
    : `${production} in production.`;

  const companies = uniqueCompanies(roles);
  const companyNote =
    companies.length === 1 ? `Every role so far has been at ${companies[0]}.` : `Roles at ${joinNames(companies)}.`;

  return (
    <section id="experience" className={base.section} aria-labelledby="experience-title">
      <header className={styles.header}>
        <h2 id="experience-title" className={base.sectionTitle}>
          {title}
        </h2>
        <p className={`${styles.note} ${base.muted}`}>
          {companyNote} {copy.experienceScaleNote}
        </p>
      </header>

      <Timeline roles={roles} education={education} now={now} />

      <ol className={styles.list}>
        {rolesNewestFirst(roles).map((role) => (
          <li key={role.id} className={styles.role} data-current={!role.end}>
            <p className={styles.when}>{formatRange(role.start, role.end)}</p>
            <h3 className={styles.title}>{role.title}</h3>
            <p className={styles.company}>
              {role.companyUrl ? (
                <a className={base.link} href={role.companyUrl} {...externalLinkProps}>
                  {role.company}
                </a>
              ) : (
                role.company
              )}
            </p>
            {role.highlights.length > 0 && (
              <ul className={styles.highlights}>
                {role.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {role.tech.length > 0 && (
              <p className={styles.tech}>
                <span className="visually-hidden">Technologies: </span>
                {role.tech.join(' / ')}
              </p>
            )}
          </li>
        ))}
        {education.map((item) => (
          <li key={item.id} className={styles.education}>
            <p className={styles.when}>{formatRange(item.start, item.end)}</p>
            <h3 className={styles.title}>{item.qualification}</h3>
            {item.institution && <p className={styles.company}>{item.institution}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function joinNames(names: readonly string[]): string {
  if (names.length <= 2) return names.join(' and ');
  return `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;
}

const NARROW_BAR_PERCENT = 6;
const MIN_BAR_PERCENT = 0.8;

interface Bar {
  readonly id: string;
  readonly label: string;
  readonly start: YearMonth;
  readonly end: YearMonth;
  readonly kind: 'education' | 'past' | 'current';
}

/**
 * A to-scale rail from the first education year to next January.
 * Purely visual — the list below carries the same information for assistive tech.
 */
function Timeline({ roles, education, now }: ExperienceProps & { readonly now: YearMonth }) {
  const bars: Bar[] = [
    ...education.map((e) => ({ id: e.id, label: e.shortLabel ?? e.qualification, start: e.start, end: e.end, kind: 'education' as const })),
    ...roles.map((r) => ({
      id: r.id,
      label: r.shortLabel ?? r.title,
      start: r.start,
      end: r.end ?? now,
      kind: r.end ? ('past' as const) : ('current' as const),
    })),
  ].sort((a, b) => monthIndex(a.start) - monthIndex(b.start));

  const first = bars[0];
  if (!first) return null;

  const startYear = first.start.year;
  const endYear = now.year + 1;
  const span = (endYear - startYear) * 12;
  const position = (d: YearMonth) => ((monthIndex(d) - startYear * 12) / span) * 100;
  const years = Array.from({ length: endYear - startYear }, (_, i) => startYear + i);

  return (
    <div className={styles.timeline} aria-hidden="true">
      {bars.map((bar, index) => {
        const width = position(bar.end) - position(bar.start);
        return (
          <div
            key={bar.id}
            className={styles.bar}
            data-kind={bar.kind}
            // Too short for an inside label (e.g. a role that just started): label sits beside it.
            data-narrow={width < NARROW_BAR_PERCENT}
            title={bar.label}
            style={
              {
                left: `${position(bar.start)}%`,
                width: `${Math.max(width, MIN_BAR_PERCENT)}%`,
                '--lane': index % 2,
              } as CSSProperties
            }
          >
            <span>{bar.label}</span>
          </div>
        );
      })}
      <div className={styles.axis}>
        {years.map((year) => (
          <span key={year} className={styles.tick} style={{ left: `${position({ year })}%` }}>
            {year}
          </span>
        ))}
      </div>
      <span className={styles.today} style={{ left: `${position(now)}%` }}>
        Today
      </span>
    </div>
  );
}
