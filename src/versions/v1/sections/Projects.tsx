import type { Project } from '@/content/types';
import { Symbol } from '../Symbol';

/** Rendered only when the profile lists projects, styled like the tech stack cards. */
export function Projects({ projects }: { readonly projects: readonly Project[] }) {
  return (
    <section id="projects" aria-label="Projects" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden section-reveal">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
            Build Artifacts
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Shipped <span className="text-primary">Projects</span>
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <li key={project.id} className="tech-card group gap-4">
              {project.image && <img className="w-full aspect-video object-cover rounded-lg" src={project.image.src} alt={project.image.alt} loading="lazy" />}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.summary}</p>
              {project.tech.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li key={t} className="tech-tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-auto font-mono text-sm">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-secondary hover:text-primary">
                      {link.label}
                      <Symbol name="north_east" className="text-sm" />
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
