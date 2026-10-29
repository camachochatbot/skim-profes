import type { ComponentChildren } from 'preact';
import { sheet } from '../core/nav';
import { IconClose } from './Icons';

export function Sheet({ title, children }: { title: string; children: ComponentChildren }) {
  return (
    <div class="sheet-backdrop" onClick={(e) => e.target === e.currentTarget && (sheet.value = null)}>
      <section class="sheet" role="dialog" aria-label={title}>
        <header class="sheet-head">
          <h2 class="cond">{title}</h2>
          <button class="icon-btn" aria-label="Cerrar" onClick={() => (sheet.value = null)}><IconClose /></button>
        </header>
        <div class="sheet-body">{children}</div>
      </section>
    </div>
  );
}
