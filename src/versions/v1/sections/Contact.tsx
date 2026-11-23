import type { ContactDetails } from '@/content/types';
import { useContactForm, type ContactField } from '@/hooks/useContactForm';
import { contactLinks } from '@/lib/profile';
import { Symbol } from '../Symbol';

const FIELDS: readonly ContactField[] = ['name', 'email', 'subject', 'message'];

const INPUT =
  'block w-full pl-10 pr-3 py-3 rounded-lg bg-gray-50 dark:bg-[#010409] border border-gray-200 dark:border-border-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 shadow-sm dark:shadow-inner-dark focus:ring-2 focus:ring-neon focus:border-transparent transition-all font-mono text-sm aria-[invalid=true]:border-red-500/60';
const LABEL = 'block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono ml-1';

/** Per-channel presentation from the original page. */
const CHANNEL_STYLE = {
  github: { hover: 'hover:border-primary/60 hover:shadow-glow-primary', tile: 'group-hover/node:bg-primary', hint: 'git remote -v', hintClass: 'text-neon', arrow: 'group-hover/node:text-primary' },
  linkedin: { hover: 'hover:border-secondary/60 hover:shadow-glow', tile: 'group-hover/node:bg-secondary', hint: null, hintClass: 'text-secondary', arrow: 'group-hover/node:text-secondary' },
  email: { hover: 'hover:border-neon/60 hover:shadow-glow-neon', tile: 'group-hover/node:bg-neon', hint: 'send_packet(msg)', hintClass: 'text-neon', arrow: 'group-hover/node:text-neon' },
} as const;

const GITHUB_PATH =
  'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z';
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

function ChannelIcon({ id }: { readonly id: 'github' | 'linkedin' | 'email' }) {
  if (id === 'email') return <Symbol name="mail" className="text-lg" />;
  return (
    <svg aria-hidden="true" className={id === 'github' ? 'w-6 h-6' : 'w-5 h-5'} fill="currentColor" viewBox="0 0 24 24">
      <path d={id === 'github' ? GITHUB_PATH : LINKEDIN_PATH} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

export function Contact({ contact }: { readonly contact: ContactDetails }) {
  const { values, errors, status, onChange, onSubmit } = useContactForm(contact.email, FIELDS);
  const firstError = FIELDS.map((f) => errors[f]).find(Boolean);
  // The original listed GitHub first; keep that order.
  const channels = [...contactLinks(contact)].sort((a, b) => ['github', 'linkedin', 'email'].indexOf(a.id) - ['github', 'linkedin', 'email'].indexOf(b.id));

  const field = (name: 'name' | 'email' | 'subject', label: string, icon: string, placeholder: string, type = 'text') => (
    <div className="space-y-2">
      <label className={LABEL} htmlFor={`contact-${name}`}>
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Symbol name={icon} className="text-gray-500 group-focus-within:text-neon transition-colors text-lg" />
        </div>
        <input
          className={INPUT}
          id={`contact-${name}`}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={name === 'subject' ? 'off' : name}
          value={values[name]}
          onChange={onChange}
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={errors[name] ? 'contact-status' : undefined}
          required
        />
      </div>
    </div>
  );

  return (
    <section id="contact" aria-label="Contact" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden section-reveal">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/5 text-secondary text-xs font-mono mb-6 shadow-glow">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#22d3ee]" />
            CONNECTION PROTOCOL
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Let&apos;s Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-amber-200 terminal-glow-amber">Together</span>
          </h2>
          <p className="text-gray-400 max-w-lg font-mono text-sm">
            <span className="text-neon">&gt;</span> Initiate a handshake protocol. Whether it&apos;s a new microservice architecture or a scaling
            challenge, I&apos;m ready to deploy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="h-full bg-card-light dark:bg-card-dark border border-gray-200 dark:border-border-dark rounded-2xl p-5 sm:p-8 shadow-clay-light dark:shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-transparent opacity-80" />
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Symbol name="terminal" className="text-primary" />
                  Terminal Access
                </h3>
                <p className="text-sm text-neon mt-2 font-mono opacity-80">// Select a communication channel below</p>
              </div>
              <ul className="space-y-4">
                {channels.map((link) => {
                  const style = CHANNEL_STYLE[link.id];
                  return (
                    <li key={link.id}>
                      <a
                        className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#010409] transition-all duration-300 group/node ${style.hover}`}
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover/node:text-black transition-colors ${style.tile}`}>
                            <ChannelIcon id={link.id} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{link.label}</div>
                            <div className={`text-xs font-mono ${style.hintClass}`}>{style.hint ?? `/${link.handle}`}</div>
                          </div>
                        </div>
                        <Symbol name="arrow_outward" className={`text-gray-500 transition-colors ${style.arrow}`} />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-border-dark flex justify-between items-center text-xs font-mono text-gray-500" aria-hidden="true">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse" /> UPTIME: 99.9%
                </span>
                <span>PING: 24ms</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="h-full bg-card-light dark:bg-card-dark border border-gray-200 dark:border-border-dark rounded-2xl p-5 sm:p-8 shadow-clay-light dark:shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {field('name', 'Identifier / Name', 'person', 'John Doe')}
                  {field('email', 'Return Address', 'alternate_email', 'dev@example.com', 'email')}
                </div>
                {field('subject', 'Subject', 'subject', "What's this about?")}
                <div className="space-y-2">
                  <label className={LABEL} htmlFor="contact-message">
                    Payload / Message
                  </label>
                  <div className="relative group">
                    <textarea
                      className={`${INPUT} !p-3 resize-none`}
                      id="contact-message"
                      name="message"
                      placeholder="Describe the system requirements..."
                      rows={4}
                      value={values.message}
                      onChange={onChange}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? 'contact-status' : undefined}
                      required
                    />
                  </div>
                </div>
              </div>

              <div id="contact-status" role="status" aria-live="polite">
                {firstError && (
                  <div className="mt-4 p-3 rounded-lg font-mono text-sm border bg-red-500/10 border-red-500/30 text-red-400">
                    <span className="text-xs">[ERROR]</span> {firstError}
                  </div>
                )}
                {!firstError && status === 'opened' && (
                  <div className="mt-4 p-3 rounded-lg font-mono text-sm border bg-neon/10 border-neon/30 text-neon">
                    <span className="text-xs">[SUCCESS]</span> Your email app is open with the message ready to send. If it didn&apos;t open, write to{' '}
                    {contact.email}.
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-border-dark flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono hidden sm:inline-block">
                  <span className="text-neon">*</span> Fields required for compilation
                </span>
                <button
                  className="w-full sm:w-auto bg-primary hover:bg-amber-500 text-black font-bold py-3 px-8 rounded-lg shadow-glow-primary transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                  type="submit"
                >
                  <Symbol name="rocket_launch" className="text-lg" />
                  Initialize Connection
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
