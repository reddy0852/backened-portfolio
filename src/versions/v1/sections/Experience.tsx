import type { Education, Role, YearMonth } from '@/content/types';
import { formatYearMonth } from '@/lib/dates';
import { roleVersions, rolesNewestFirst } from '@/lib/profile';
import { Symbol } from '../Symbol';
import { CURRENT_ROLE, PAST_ROLE } from '../theme';

const range = (start: YearMonth, end?: YearMonth) => `${formatYearMonth(start)} - ${end ? formatYearMonth(end) : 'Present'}`;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

interface ExperienceProps {
  readonly roles: readonly Role[];
  readonly education: readonly Education[];
}

/**
 * "Deployment History": roles as versioned releases, alternating sides of a gradient timeline.
 * Version numbers follow semver by career meaning: major = new company, minor = promotion
 * within the same company (see `roleVersions`) — not just a countdown from the role count.
 */
export function Experience({ roles, education }: ExperienceProps) {
  const ordered = rolesNewestFirst(roles);
  const versions = roleVersions(roles);

  return (
    <section id="experience" aria-label="Professional Experience" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden section-reveal">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono font-semibold tracking-wider text-accent-teal uppercase bg-accent-teal/10 rounded-full border border-accent-teal/20">
            System Logs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white">
            Deployment <span className="text-gray-400 dark:text-gray-600">History</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            A changelog of my professional journey, versioned by role and responsibility.
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none dot-pattern" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2 rounded-full opacity-30 dark:opacity-50 h-full" aria-hidden="true" />
          <ol>

          {ordered.map((role, i) => (
            <RoleEntry
              key={role.id}
              role={role}
              version={versions.get(role.id) ?? 'v1.0.0'}
              metaOnLeft={i % 2 === 0}
              isFirstRole={i === ordered.length - 1}
            />
          ))}

          {education.map((item) => (
            <li key={item.id} className="relative group mb-10 last:mb-0">
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 -mt-1 z-10" aria-hidden="true">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-background-dark dark:bg-background-light border-2 border-gray-500 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between w-full">
                <div className="md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0 order-1">
                  <div className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Repository Initialized</div>
                  <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 mt-1">{item.qualification}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {item.start.year} - {item.end.year}
                  </span>
                </div>
                <div className="md:w-1/2 md:pl-12 pl-12 order-2 hidden md:block">
                  <div className="text-xs font-mono text-gray-400 dark:text-gray-600">origin/master</div>
                </div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

interface RoleEntryProps {
  readonly role: Role;
  readonly version: string;
  /** Alternates the date column between the left and right of the line on desktop. */
  readonly metaOnLeft: boolean;
  readonly isFirstRole: boolean;
}

function RoleEntry({ role, version, metaOnLeft, isFirstRole }: RoleEntryProps) {
  const accent = role.end ? PAST_ROLE : CURRENT_ROLE;

  const meta = (
    <div
      className={
        metaOnLeft
          ? 'md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0 mb-4 md:mb-0 order-1'
          : 'md:w-1/2 md:pl-12 pl-12 md:text-left mb-4 md:mb-0 order-1 md:order-2'
      }
    >
      <span className={`font-mono text-sm font-bold px-2 py-1 rounded inline-block mb-2 ${accent.badge}`}>{version}</span>
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">{range(role.start, role.end)}</p>
      <div className="hidden md:block mt-2 text-xs font-mono text-gray-400 dark:text-gray-500">
        {isFirstRole ? (
          <>
            Init: <span className="text-blue-400">First commit</span>
          </>
        ) : (
          <>
            Branch: <span className="text-primary">feature/{slug(role.title)}</span>
          </>
        )}
      </div>
    </div>
  );

  const card = (
    <div className={metaOnLeft ? 'md:w-1/2 md:pl-12 pl-12 order-2 w-full' : 'md:w-1/2 md:pr-12 pl-12 md:pl-0 order-2 md:order-1 w-full'}>
      <article className="bg-card-light dark:bg-card-dark p-4 sm:p-6 rounded-2xl shadow-clay-light dark:shadow-clay-dark border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{role.title}</h3>
            <p className="text-primary font-medium">
              {role.companyUrl ? (
                <a href={role.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {role.company}
                </a>
              ) : (
                role.company
              )}
            </p>
          </div>
          <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Symbol name={accent.cardIcon} className="text-gray-500 text-lg" />
          </div>
        </div>
        {role.tagline && (
          <div className="font-mono text-xs sm:text-sm bg-gray-50 dark:bg-[#0a0a0a] p-3 rounded-lg border border-gray-200 dark:border-gray-800 mb-4 text-gray-600 dark:text-gray-300 break-words">
            <span className={`mr-2 ${accent.prompt}`}>$</span> git commit -m "{role.tagline}"
          </div>
        )}
        {role.highlights.length > 0 && (
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            {role.highlights.map((point) => (
              <li key={point} className="flex items-start">
                <Symbol name={accent.bulletIcon} className={`text-base mr-2 mt-0.5 ${accent.bullet}`} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
        {role.tech.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
            {role.tech.map((t) => (
              <span key={t} className={`px-2 py-1 text-xs font-medium rounded ${accent.chip}`}>
                {t}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );

  return (
    <li className="relative mb-16 md:mb-24 group">
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 -mt-1 z-10" aria-hidden="true">
        <div className={`flex items-center justify-center rounded-full bg-background-light dark:bg-background-dark border-2 ${accent.node}`}>
          <Symbol name={accent.nodeIcon} className={`text-sm ${accent.nodeIconClass}`} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between w-full">
        {meta}
        {card}
      </div>
    </li>
  );
}
