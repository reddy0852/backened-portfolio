import type { CSSProperties } from 'react';
import type { Profile } from '@/content/types';
import { contactLinks, currentRole, externalLinkProps } from '@/lib/profile';
import base from '../base.module.css';
import { copy } from '../copy';
import styles from './Hero.module.css';

/**
 * The signature moment: the skill layers are frosted panes stacked over the name,
 * so the name refracts through the glass. Layers run cloud (top) to code (bottom).
 */
export function Hero({ profile }: { readonly profile: Profile }) {
  const role = currentRole(profile.roles);
  const layers = [...profile.skills].reverse();
  const nameLines = profile.name.split(' ');

  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={`${base.disc} ${base.discCobalt} ${styles.discCobalt}`} aria-hidden="true" />
      <div className={`${base.disc} ${base.discSignal} ${styles.discSignal}`} aria-hidden="true" />

      <div className={styles.copy}>
        <p className={base.lead}>
          {role && `${role.title} at ${role.company}. `}
          {profile.shortBio}
        </p>
        <ul className={styles.links}>
          {contactLinks(profile.contact).map((link) => (
            <li key={link.id}>
              <a className={base.link} href={link.href} {...(link.external ? externalLinkProps : {})}>
                {link.id === 'email' ? link.handle : link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <h1 id="hero-name" className={styles.name}>
        {nameLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>

      <div id="stack" className={styles.stackWrap}>
        <h2 className={styles.caption}>{copy.stackCaption}</h2>
        <ol className={styles.stack}>
          {layers.map((layer, index) => (
            <li key={layer.id} className={styles.pane} style={{ '--i': index } as CSSProperties}>
              <h3 className={styles.paneTitle}>{layer.name}</h3>
              <p className={styles.paneItems}>{layer.items.join(', ')}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
