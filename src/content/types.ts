/**
 * Content model for the portfolio. Every site version renders from these types,
 * so adding a role, skill or project never requires touching UI components.
 */

/** A calendar month. Omit `month` when only the year is known — it is then treated as January. */
export interface YearMonth {
  readonly year: number;
  /** 1–12 */
  readonly month?: number;
}

export interface Role {
  readonly id: string;
  readonly title: string;
  /** Used where space is tight, e.g. timeline bars. Falls back to `title`. */
  readonly shortLabel?: string;
  readonly company: string;
  readonly companyUrl?: string;
  /** One-line summary of the role, e.g. shown as a commit message in the terminal design. */
  readonly tagline?: string;
  readonly start: YearMonth;
  /** Omit for the current role. */
  readonly end?: YearMonth;
  readonly highlights: readonly string[];
  readonly tech: readonly string[];
}

export interface Education {
  readonly id: string;
  readonly qualification: string;
  readonly shortLabel?: string;
  readonly institution?: string;
  readonly start: YearMonth;
  readonly end: YearMonth;
}

export interface FocusArea {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

/** A layer of the tech stack. Order in `Profile.skills` runs from code (first) up to cloud (last). */
export interface SkillLayer {
  readonly id: string;
  readonly name: string;
  readonly items: readonly string[];
}

export interface Certification {
  readonly id: string;
  readonly name: string;
  /** Who issued the credential, as shown on the card, e.g. "Google Cloud". */
  readonly issuer: string;
  /** Parent organisation, used to group credentials, e.g. "Google". */
  readonly organisation: string;
  /** Optional short tag shown next to the name, e.g. "GCP". */
  readonly tag?: string;
  readonly description: string;
  readonly verifyUrl: string;
  readonly verifyLabel?: string;
}

export interface LinkItem {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly tech: readonly string[];
  readonly links: readonly LinkItem[];
  readonly image?: { readonly src: string; readonly alt: string };
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
}

export interface ContactDetails {
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
}

export interface Profile {
  readonly name: string;
  readonly initials: string;
  /** One-sentence value proposition. */
  readonly pitch: string;
  /** Short sentence that follows "<current role> at <company>." */
  readonly shortBio: string;
  readonly summary: string;
  readonly about: string;
  readonly contact: ContactDetails;
  /** Link to a downloadable résumé (e.g. a PDF in /public). Views hide résumé buttons when absent. */
  readonly resumeUrl?: string;
  /** A handful of skills to feature in compact spots such as the hero card. */
  readonly featuredSkills: readonly string[];
  readonly roles: readonly Role[];
  readonly education: readonly Education[];
  readonly focusAreas: readonly FocusArea[];
  readonly skills: readonly SkillLayer[];
  readonly certifications: readonly Certification[];
  readonly projects: readonly Project[];
  readonly testimonials: readonly Testimonial[];
}
