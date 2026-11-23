import type { Certification } from '@/content/types';
import { externalLinkProps } from '@/lib/profile';
import base from '../base.module.css';
import styles from './Certifications.module.css';

export function Certifications({ certifications }: { readonly certifications: readonly Certification[] }) {
  const organisations = [...new Set(certifications.map((c) => c.organisation))];
  const title = organisations.length === 1 ? `Certified by ${organisations[0]}.` : 'Certified.';

  return (
    <section id="certifications" className={`${base.section} ${styles.section}`} aria-labelledby="certifications-title">
      <div className={`${base.disc} ${base.discSignal} ${styles.disc}`} aria-hidden="true" />
      <h2 id="certifications-title" className={`${base.sectionTitle} ${styles.title}`}>
        {title}
      </h2>
      <ul className={styles.list}>
        {certifications.map((cert) => (
          <li key={cert.id} className={styles.card}>
            <p className={styles.issuer}>{cert.issuer}</p>
            <h3 className={styles.name}>{cert.name}</h3>
            <p className={styles.description}>{cert.description}</p>
            <a className={base.link} href={cert.verifyUrl} {...externalLinkProps}>
              {cert.verifyLabel ?? 'Verify credential'}
              <span className="visually-hidden"> for {cert.name} (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
