// Botón flotante de incidencia por voz: siempre a mano, en cualquier pestaña.
import { Mic } from 'lucide-preact';
import { go } from '../core/nav';
import { t } from '../core/i18n';

export function MicButton() {
  return (
    <button class="mic-fab" onClick={() => go('incident')} aria-label={t('fab.incident')}>
      <Mic size={30} strokeWidth={2.4} />
    </button>
  );
}
