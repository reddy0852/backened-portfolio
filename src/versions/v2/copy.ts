/** Version-specific wording. Personal facts live in `src/content/profile.ts`. */
export const copy = {
  stackCaption: 'The stack I work in, from cloud down to code.',
  experienceScaleNote: 'Bars are drawn to scale.',
  projectsEmpty: 'Write-ups of the systems I’ve built are in progress. Until they’re published, the code is on GitHub.',
  projectsEmptyAction: 'Open GitHub profile',
  testimonialsTitle: 'In their words.',
  contactTitle: 'Have a system that needs to scale?',
  contactLead: 'Tell me what you’re building.',
  formTitle: 'Write to me',
  formFields: {
    name: { label: 'Your name', placeholder: 'Jane Doe' },
    email: { label: 'Your email', placeholder: 'jane@company.com' },
    message: { label: 'What are you building?', placeholder: 'A payments service that needs to handle…' },
  },
  navCta: 'Email me',
  footerNote: 'Built with React and TypeScript',
} as const;
