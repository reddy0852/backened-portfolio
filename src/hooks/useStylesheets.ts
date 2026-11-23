import { useEffect } from 'react';

/**
 * Adds each stylesheet <link> once, ahead of the app's own CSS so the app can
 * override third-party defaults (e.g. the icon font's built-in sizing).
 */
export function useStylesheets(hrefs: readonly string[]): void {
  const key = hrefs.join('|');
  useEffect(() => {
    const firstStyle = document.head.querySelector('link[rel="stylesheet"], style');
    for (const href of key.split('|').filter(Boolean)) {
      if (document.head.querySelector(`link[data-stylesheet="${CSS.escape(href)}"]`)) continue;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.stylesheet = href;
      document.head.insertBefore(link, firstStyle);
    }
  }, [key]);
}
