import type { Testimonial } from '@/content/types';
import base from '../base.module.css';
import { copy } from '../copy';
import styles from './Testimonials.module.css';

export function Testimonials({ testimonials }: { readonly testimonials: readonly Testimonial[] }) {
  return (
    <section id="testimonials" className={base.section} aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className={base.sectionTitle}>
        {copy.testimonialsTitle}
      </h2>
      <ul className={styles.list}>
        {testimonials.map((t) => (
          <li key={t.id}>
            <figure className={styles.card}>
              <blockquote className={styles.quote}>“{t.quote}”</blockquote>
              <figcaption className={styles.author}>
                {t.author}, {t.role}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
