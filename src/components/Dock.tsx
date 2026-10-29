// Barra inferior al alcance del pulgar: todo, incidencia (micro) y ajustes.
import { sheet, go } from '../core/nav';
import { t } from '../core/i18n';
import { IconGear, IconGrid, IconMic } from './Icons';

export function Dock() {
  return (
    <nav class="dock" aria-label="Acciones">
      <button class="dock-side" onClick={() => (sheet.value = 'all')}>
        <IconGrid /><span>{t('dock.all')}</span>
      </button>
      <button class="dock-mic" onClick={() => go('incident')} aria-label={t('dock.mic')}>
        <IconMic /><span>{t('dock.mic')}</span>
      </button>
      <button class="dock-side" onClick={() => (sheet.value = 'settings')}>
        <IconGear /><span>{t('dock.settings')}</span>
      </button>
    </nav>
  );
}
