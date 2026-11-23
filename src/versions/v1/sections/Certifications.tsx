import { useEffect, useState } from 'react';
import type { Certification } from '@/content/types';
import { Symbol } from '../Symbol';
import { CERT_ACCENTS } from '../theme';

const CREDLY_EMBED_SCRIPT = 'https://cdn.credly.com/assets/utilities/embed.js';

/** Credly's embed script scans the page for badge placeholders each time it runs. */
function renderCredlyBadges(): void {
  const script = document.createElement('script');
  script.src = CREDLY_EMBED_SCRIPT;
  script.async = true;
  document.body.appendChild(script);
}

const credlyBadgeId = (url: string): string | null => url.match(/\/badges\/([0-9a-f-]{36})/i)?.[1] ?? null;

type LogLevel = 'INFO' | 'SUCCESS';
interface LogLine {
  readonly id: number;
  readonly level: LogLevel;
  readonly time: string;
  readonly message: string;
}

const LEVEL_CLASS: Record<LogLevel, string> = { INFO: 'text-blue-500', SUCCESS: 'text-neon' };
const clock = (offsetSec = 0) => new Date(Date.now() + offsetSec * 1000).toLocaleTimeString('en-GB', { hour12: false });

export function Certifications({ certifications }: { readonly certifications: readonly Certification[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [log, setLog] = useState<LogLine[]>([]);

  useEffect(() => {
    if (expanded) renderCredlyBadges();
  }, [expanded]);

  const toggle = (cert: Certification) => {
    const opening = expanded !== cert.id;
    setExpanded(opening ? cert.id : null);
    const stamp = Date.now();
    setLog(
      opening
        ? [
            { id: stamp, level: 'INFO', time: clock(), message: 'Loaded credential data from secure storage.' },
            { id: stamp + 1, level: 'SUCCESS', time: clock(1), message: `Rendered expanded view for ${cert.name}.` },
          ]
        : [{ id: stamp, level: 'INFO', time: clock(), message: `Collapsed view for ${cert.name}.` }],
    );
  };

  return (
    <section id="certifications" aria-label="Certifications" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden section-reveal">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-neon font-mono text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
              System Architecture
            </span>
            <span className="h-px bg-border-dark flex-grow" />
            <span className="text-gray-500 font-mono text-xs">v2.0.4</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 terminal-cursor">
            Certifications &amp; credentials
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-xl mt-2">
            <span className="text-primary">root@portfolio:~/certifications#</span> ls -la --verified
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6">
          {certifications.map((cert, i) => {
            const accent = CERT_ACCENTS[i % CERT_ACCENTS.length]!;
            const isOpen = expanded === cert.id;
            const panelId = `cert-${cert.id}`;
            const badgeId = credlyBadgeId(cert.verifyUrl);
            return (
              <li
                key={cert.id}
                className={`bg-card-light dark:bg-card-dark border border-gray-200 dark:border-border-dark hover:border-gray-300 rounded-2xl overflow-hidden shadow-clay-light dark:shadow-2xl hover:shadow-clay-light transition-all duration-300 group ${accent.card}`}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-[#010409] border border-gray-200 dark:border-border-dark flex items-center justify-center shrink-0 transition-colors ${accent.iconBox}`}>
                        <Symbol name={accent.icon} className={`text-gray-500 transition-colors text-2xl ${accent.iconText}`} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold text-gray-900 dark:text-white transition-colors flex items-center gap-3 flex-wrap ${accent.title}`}>
                          {cert.name}
                          {cert.tag && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary/10 text-secondary border border-secondary/20 uppercase tracking-wide">
                              {cert.tag}
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-500 text-sm font-mono mt-0.5">{cert.issuer} &bull; Verified via Credly</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(cert)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mt-2 md:mt-0"
                    >
                      <span>{isOpen ? 'Hide credential' : 'View credential'}</span>
                      <Symbol name={isOpen ? 'expand_less' : 'expand_more'} className="text-lg" />
                    </button>
                  </div>

                  <div id={panelId} className={`credential-content mt-6 pl-0 md:pl-16 ${isOpen ? 'expanded' : ''}`} aria-hidden={!isOpen}>
                    {isOpen && badgeId && (
                      <div className="credly-embed-wrapper mb-4">
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id={badgeId} data-share-badge-host="https://www.credly.com" />
                      </div>
                    )}
                    <div className="flex items-center gap-6 text-[13px] font-mono text-gray-500 border-l-2 border-gray-300 dark:border-border-dark pl-4 ml-2">
                      <div className="flex items-center gap-2">
                        <Symbol name="fingerprint" className="text-base" />
                        <span>
                          Credly <span className="text-gray-600 dark:text-gray-300">Verified</span>
                        </span>
                      </div>
                      <a
                        className={`flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors group/link ${accent.link}`}
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isOpen ? undefined : -1}
                      >
                        Verify Authenticity
                        <Symbol name="north_east" className="text-sm group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 border-t border-gray-200 dark:border-border-dark pt-6">
          <div className="font-mono text-xs text-gray-600 space-y-1" aria-live="polite">
            {log.map((line) => (
              <div key={line.id} className="flex gap-2 animate-[fadeIn_0.3s_ease-out]">
                <span className="text-gray-700">{line.time}</span>
                <span className={LEVEL_CLASS[line.level]}>{line.level}</span>
                <span>{line.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
