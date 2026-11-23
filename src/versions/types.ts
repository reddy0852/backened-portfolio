import type { ComponentType, LazyExoticComponent } from 'react';
import type { Profile } from '@/content/types';

/** Every site version is a component that renders the full page from the shared profile. */
export interface SiteProps {
  readonly profile: Profile;
}

export interface SiteVersion {
  /** Short id shown in the switcher and used in the `?v=` URL parameter. */
  readonly id: string;
  readonly label: string;
  readonly description: string;
  /** External stylesheets (fonts, icon fonts) the version needs. */
  readonly stylesheets: readonly string[];
  /** Page background and browser UI colour while this version loads. */
  readonly themeColor: string;
  readonly Site: LazyExoticComponent<ComponentType<SiteProps>>;
}
