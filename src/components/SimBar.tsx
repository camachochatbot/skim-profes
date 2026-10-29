// Franja del prototipo: deja claro que la hora es simulada y permite cambiarla.
import { now, sim, dateOf, hhmm } from '../core/clock';
import { sheet } from '../core/nav';
import { t, weekday } from '../core/i18n';
import { IconClock } from './Icons';

export function SimBar() {
  const n = now.value;
  const d = dateOf(n.day);
  return (
    <button class="simbar" onClick={() => (sheet.value = 'sim')}>
      <span class="wide">{t('proto.badge')}</span>
      <span class="simbar-time">
        <IconClock /> {weekday(d)} {d.getUTCDate()} · {hhmm(n.min)}{sim.value ? '' : ' (real)'}
      </span>
      <span class="simbar-cta">{t('proto.short')}</span>
    </button>
  );
}
