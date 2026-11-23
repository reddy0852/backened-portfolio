import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { useDismiss, type DismissReason } from '@/hooks/useDismiss';
import { Icon } from '../Icon';
import styles from './VersionSwitcher.module.css';

export interface VersionOption {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

interface VersionSwitcherProps {
  readonly versions: readonly VersionOption[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
}

/** Stagger so options rise from the button upwards, nearest first. */
const STEP_MS = 45;

/**
 * Floating button pinned to the bottom-right corner. Opening it raises a vertical
 * stack of options along the right edge asking which site version to show.
 */
export function VersionSwitcher({ versions, activeId, onSelect }: VersionSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const promptId = useId();

  const close = useCallback((reason: DismissReason | 'select' | 'toggle') => {
    setOpen(false);
    // Return focus for keyboard-driven closes; leave it alone when the visitor clicked elsewhere.
    if (reason !== 'outside') toggleRef.current?.focus();
  }, []);

  useDismiss(rootRef, open, close);

  useEffect(() => {
    if (open) activeOptionRef.current?.focus();
  }, [open]);

  const active = versions.find((v) => v.id === activeId);
  const count = versions.length;

  return (
    <div ref={rootRef} className={styles.root} data-open={open}>
      <div id={panelId} className={styles.panel} role="group" aria-labelledby={promptId}>
        <p id={promptId} className={styles.prompt} style={{ '--delay': `${count * STEP_MS}ms` } as CSSProperties}>
          Which version would you like to see?
        </p>
        <ul className={styles.options}>
          {versions.map((version, index) => {
            const isActive = version.id === activeId;
            return (
              <li key={version.id} style={{ '--delay': `${(count - 1 - index) * STEP_MS}ms` } as CSSProperties}>
                <button
                  ref={isActive ? activeOptionRef : undefined}
                  type="button"
                  className={styles.option}
                  aria-pressed={isActive}
                  onClick={() => {
                    if (!isActive) onSelect(version.id);
                    close('select');
                  }}
                >
                  <span className={styles.optionId} aria-hidden="true">
                    {version.id}
                  </span>
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{version.label}</span>
                    <span className={styles.optionDescription}>{version.description}</span>
                  </span>
                  <Icon name="check" size={18} className={styles.check} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        ref={toggleRef}
        type="button"
        className={styles.fab}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close version picker' : `Switch site version, currently ${active?.label ?? activeId}`}
        onClick={() => (open ? close('toggle') : setOpen(true))}
      >
        <Icon name={open ? 'close' : 'layers'} size={22} className={styles.fabIcon} />
        <span className={styles.badge} aria-hidden="true">
          {activeId}
        </span>
      </button>
    </div>
  );
}
