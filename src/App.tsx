import { Suspense, useEffect } from 'react';
import { profile } from '@/content/profile';
import { useActiveVersion } from '@/hooks/useActiveVersion';
import { useStylesheets } from '@/hooks/useStylesheets';
import { VersionSwitcher } from '@/shared/VersionSwitcher/VersionSwitcher';
import { DEFAULT_VERSION_ID, VERSIONS } from '@/versions/registry';

export function App() {
  const { active, select } = useActiveVersion(VERSIONS, DEFAULT_VERSION_ID);
  useStylesheets(active.stylesheets);

  useEffect(() => {
    document.documentElement.dataset.version = active.id;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', active.themeColor);
  }, [active]);

  const { Site } = active;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Suspense fallback={<div className="page-loading" aria-busy="true" style={{ background: active.themeColor }} />}>
        <Site profile={profile} />
      </Suspense>
      <VersionSwitcher versions={VERSIONS} activeId={active.id} onSelect={select} />
    </>
  );
}
