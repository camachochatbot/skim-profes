// Hoja de iOS: sube desde abajo, con asa y botón "Listo".
import type { ComponentChildren } from 'preact';
import { sheet } from '../core/nav';
import { t } from '../core/i18n';

export function Sheet({ title, children }: { title: string; children: ComponentChildren }) {
  const close = () => (sheet.value = null);
  return (
    <div class="sheet-backdrop" onClick={(e) => e.target === e.currentTarget && close()}>
      <section class="sheet" role="dialog" aria-label={title}>
        <span class="grabber" />
        <header class="sheet-head">
          <span />
          <h2>{title}</h2>
          <button class="link-btn" onClick={close}>{t('done')}</button>
        </header>
        <div class="sheet-body">{children}</div>
      </section>
    </div>
  );
}
