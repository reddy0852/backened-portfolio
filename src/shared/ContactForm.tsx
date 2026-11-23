import { useId, type ReactNode } from 'react';
import { useContactForm, type ContactField } from '@/hooks/useContactForm';

/** Fields this form shows (the optional subject is left to the default subject line). */
type FormField = Exclude<ContactField, 'subject'>;

/** Class hooks so each site version can style the same accessible form its own way. */
export interface ContactFormClasses {
  readonly form?: string;
  readonly field?: string;
  readonly label?: string;
  readonly input?: string;
  readonly textarea?: string;
  readonly error?: string;
  readonly submit?: string;
  readonly note?: string;
}

interface FieldCopy {
  readonly label: string;
  readonly placeholder: string;
}

const DEFAULT_FIELDS: Record<FormField, FieldCopy> = {
  name: { label: 'Name', placeholder: 'Jane Doe' },
  email: { label: 'Email', placeholder: 'jane@company.com' },
  message: { label: 'Message', placeholder: 'Tell me about your project…' },
};

const ORDER: readonly FormField[] = ['name', 'email', 'message'];

interface ContactFormProps {
  readonly recipient: string;
  readonly classes: ContactFormClasses;
  readonly heading?: ReactNode;
  readonly fields?: Partial<Record<FormField, FieldCopy>>;
  readonly submitLabel?: string;
}

export function ContactForm({ recipient, classes, heading, fields, submitLabel = 'Open email to send' }: ContactFormProps) {
  const { values, errors, status, onChange, onSubmit } = useContactForm(recipient);
  const id = useId();
  const copy = { ...DEFAULT_FIELDS, ...fields };

  return (
    <form className={classes.form} onSubmit={onSubmit} noValidate>
      {heading}
      {ORDER.map((field) => {
        const inputId = `${id}-${field}`;
        const errorId = `${inputId}-error`;
        const error = errors[field];
        const shared = {
          id: inputId,
          name: field,
          value: values[field],
          onChange,
          placeholder: copy[field].placeholder,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          required: true,
        } as const;
        return (
          <div className={classes.field} key={field}>
            <label className={classes.label} htmlFor={inputId}>
              {copy[field].label}
            </label>
            {field === 'message' ? (
              <textarea className={classes.textarea} rows={5} {...shared} />
            ) : (
              <input
                className={classes.input}
                type={field === 'email' ? 'email' : 'text'}
                autoComplete={field === 'email' ? 'email' : 'name'}
                {...shared}
              />
            )}
            {error && (
              <p className={classes.error} id={errorId}>
                {error}
              </p>
            )}
          </div>
        );
      })}
      <button className={classes.submit} type="submit">
        {submitLabel}
      </button>
      <p className={classes.note} role="status">
        {status === 'opened'
          ? `Your email app should now be open with the message ready to send. If nothing opened, write to ${recipient} directly.`
          : 'This opens your email app with the message filled in.'}
      </p>
    </form>
  );
}
