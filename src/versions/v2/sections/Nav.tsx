import { useCallback, useId, useRef, useState } from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useDismiss } from '@/hooks/useDismiss';
import base from '../base.module.css';
import { copy } from '../copy';
import styles from './Nav.module.css';

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

interface NavProps {
  readonly name: string;
  readonly items: readonly NavItem[];
  readonly email: string;
}

/** Floating glass bar. On small screens the bar itself expands into the menu sheet. */
export function Nav({ name, items, email }: NavProps) {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const close = useCallback(() => setOpen(false), []);

  useDismiss(barRef, open, close);
  useBodyScrollLock(open);

  return (
    <header className={styles.wrap}>
      <nav ref={barRef} className={styles.bar} data-open={open} aria-label="Main">
        <div className={styles.top}>
          <a className={styles.brand} href="#main" onClick={close}>
            {name}
          </a>
          <button
            type="button"
            className={`${base.buttonGlass} ${styles.menuButton}`}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <div id={menuId} className={styles.menu}>
          <ul className={styles.links}>
            {items.map((item) => (
              <li key={item.href}>
                <a className={styles.link} href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className={`${base.buttonPrimary} ${styles.cta}`} href={`mailto:${email}`}>
            {copy.navCta}
          </a>
        </div>
      </nav>
    </header>
  );
}
