import type { ContactDetails } from '@/content/types';
import { contactLinks, externalLinkProps } from '@/lib/profile';
import { ContactForm } from '@/shared/ContactForm';
import base from '../base.module.css';
import { copy } from '../copy';
import styles from './Contact.module.css';

export function Contact({ contact }: { readonly contact: ContactDetails }) {
  return (
    <section id="contact" className={`${base.section} ${styles.section}`} aria-labelledby="contact-title">
      <div className={`${base.disc} ${base.discCobalt} ${styles.disc}`} aria-hidden="true" />

      <div className={styles.intro}>
        <h2 id="contact-title" className={base.sectionTitle}>
          {copy.contactTitle}
        </h2>
        <p className={`${base.lead} ${base.muted}`}>{copy.contactLead}</p>
        <dl className={styles.channels}>
          {contactLinks(contact).map((link) => (
            <div key={link.id} className={styles.channel}>
              <dt>{link.label}</dt>
              <dd>
                <a className={base.link} href={link.href} {...(link.external ? externalLinkProps : {})}>
                  {link.handle}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ContactForm
        recipient={contact.email}
        heading={<h3 className={styles.formTitle}>{copy.formTitle}</h3>}
        fields={copy.formFields}
        classes={{
          form: styles.form,
          field: styles.field,
          label: styles.label,
          input: styles.input,
          textarea: styles.input,
          error: styles.error,
          submit: base.buttonPrimary,
          note: styles.note,
        }}
      />
    </section>
  );
}
