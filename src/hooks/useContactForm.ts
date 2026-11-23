import { useState, type ChangeEvent, type FormEvent } from 'react';
import { buildMailto, isValidEmail, type MessageDraft } from '@/lib/mailto';

export type ContactField = keyof MessageDraft;
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactStatus = 'idle' | 'opened';

const EMPTY: MessageDraft = { name: '', email: '', subject: '', message: '' };

const REQUIRED_MESSAGES: Record<ContactField, string> = {
  name: 'Add your name so I know who is writing.',
  email: 'Add an email address so I can reply.',
  subject: 'Add a subject so I know what this is about.',
  message: 'Write a short message before sending.',
};

/** Validates only the fields a given form actually shows. */
export function validateDraft(draft: MessageDraft, fields: readonly ContactField[]): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of fields) {
    const value = draft[field].trim();
    if (!value) errors[field] = REQUIRED_MESSAGES[field];
    else if (field === 'email' && !isValidEmail(value)) errors.email = 'Enter an email address like name@company.com.';
  }
  return errors;
}

/** Form state for a contact form that hands the message to the visitor's email app. */
export function useContactForm(recipient: string, fields: readonly ContactField[] = ['name', 'email', 'message']) {
  const [values, setValues] = useState<MessageDraft>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<ContactStatus>('idle');

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ContactField;
    setValues((v) => ({ ...v, [field]: event.target.value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateDraft(values, fields);
    setErrors(found);
    const firstInvalid = fields.find((f) => found[f]);
    if (firstInvalid) {
      const control = event.currentTarget.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    const trimmed: MessageDraft = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };
    window.location.href = buildMailto(recipient, trimmed);
    setStatus('opened');
  };

  return { values, errors, status, onChange, onSubmit } as const;
}
