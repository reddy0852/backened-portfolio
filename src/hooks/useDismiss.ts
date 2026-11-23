import { useEffect, useRef, type RefObject } from 'react';

export type DismissReason = 'escape' | 'outside';

/** Calls `onDismiss` on Escape or on a pointer press outside `ref`, while `active`. */
export function useDismiss(
  ref: RefObject<HTMLElement>,
  active: boolean,
  onDismiss: (reason: DismissReason) => void,
): void {
  const callback = useRef(onDismiss);
  useEffect(() => {
    callback.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') callback.current('escape');
    };
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) callback.current('outside');
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [active, ref]);
}
