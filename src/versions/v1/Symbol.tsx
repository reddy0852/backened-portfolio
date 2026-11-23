/** Google Material Symbols glyph (ligature font loaded by the v1 registry entry). Decorative. */
export function Symbol({ name, className = '' }: { readonly name: string; readonly className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}
