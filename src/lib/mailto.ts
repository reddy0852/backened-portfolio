export interface MessageDraft {
  readonly name: string;
  readonly email: string;
  /** Optional — forms without a subject field get a default subject line. */
  readonly subject: string;
  readonly message: string;
}

/** Builds a mailto: URL so the visitor's own email app sends the message — no backend needed. */
export function buildMailto(to: string, draft: MessageDraft): string {
  const subject = draft.subject || `Portfolio enquiry from ${draft.name}`;
  const body = `${draft.message}\n\n— ${draft.name} (${draft.email})`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
