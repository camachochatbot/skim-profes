// Cabecera de iOS: título grande que, al bajar, se convierte en barra compacta.
import { useEffect, useState } from 'preact/hooks';
import { Clock } from 'lucide-preact';
import { now, sim, dateOf, hhmm } from '../core/clock';
import { sheet } from '../core/nav';
import { me } from '../core/settings';
import { teacherById, group } from '../core/group';
import { t, weekday } from '../core/i18n';

function useScrolled(y = 56) {
  const [s, set] = useState(window.scrollY > y);
  useEffect(() => {
    const on = () => set(window.scrollY > y);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return s;
}

export function SimPill() {
  const n = now.value;
  const d = dateOf(n.day);
  return (
    <button class="sim-pill" onClick={() => (sheet.value = 'sim')} title={t('proto.title')}>
      <Clock size={16} strokeWidth={2.4} />
      <span class="sim-pill-badge">{t('proto.badge')}</span>
      <span class="tnum">{weekday(d, true)} {d.getUTCDate()} · {hhmm(n.min)}{sim.value ? '' : ' ●'}</span>
    </button>
  );
}

export function NavHeader({ title, sub }: { title: string; sub?: string }) {
  const scrolled = useScrolled();
  const who = teacherById.get(me.value);
  const initials = who?.name.split(' ').map((w) => w[0]).join('') ?? '?';
  return (
    <>
      <div class={`nav-compact ${scrolled ? 'is-on' : ''}`} aria-hidden={!scrolled}>
        <span>{title}</span>
      </div>
      <header class="nav-large">
        <div class="nav-row">
          <SimPill />
          <button class="avatar" onClick={() => (sheet.value = 'settings')} aria-label={t('settings.title')}>{initials}</button>
        </div>
        {sub && <p class="nav-sub">{sub}</p>}
        <h1 class="large-title">{title}</h1>
        {group.provisional && <p class="nav-note">{group.school} · {t('app.provisional')}</p>}
      </header>
    </>
  );
}
