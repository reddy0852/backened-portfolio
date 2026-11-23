import type { Project } from '@/content/types';
import { externalLinkProps } from '@/lib/profile';
import base from '../base.module.css';
import { copy } from '../copy';
import styles from './Projects.module.css';

interface ProjectsProps {
  readonly projects: readonly Project[];
  readonly githubUrl: string;
}

export function Projects({ projects, githubUrl }: ProjectsProps) {
  return (
    <section id="projects" className={`${base.section} ${styles.section}`} aria-labelledby="projects-title">
      <h2 id="projects-title" className={base.sectionTitle}>
        Projects
      </h2>

      {projects.length === 0 ? (
        <div className={styles.empty}>
          <p className={base.lead}>{copy.projectsEmpty}</p>
          <a className={base.buttonGlass} href={githubUrl} {...externalLinkProps}>
            {copy.projectsEmptyAction}
          </a>
        </div>
      ) : (
        <ul className={styles.grid}>
          {projects.map((project) => (
            <li key={project.id} className={styles.card}>
              {project.image && <img className={styles.image} src={project.image.src} alt={project.image.alt} loading="lazy" />}
              <h3 className={styles.name}>{project.name}</h3>
              <p className={styles.summary}>{project.summary}</p>
              {project.tech.length > 0 && <p className={styles.tech}>{project.tech.join(' / ')}</p>}
              {project.links.length > 0 && (
                <p className={styles.links}>
                  {project.links.map((link) => (
                    <a key={link.href} className={base.link} href={link.href} {...externalLinkProps}>
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
