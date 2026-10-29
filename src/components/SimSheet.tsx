import { useEffect, useState } from 'preact/hooks';
import { Check } from 'lucide-preact';
import { now, setSim, sim, dateOf, hhmm } from '../core/clock';
import { group } from '../core/group';
import { dayMoments } from '../core/schedule';
import { t, tMoment, weekday } from '../core/i18n';
import { Sheet } from './Sheet';

export function SimSheet() {
  const n = now.value;
  const [playing, setPlaying] = useState(false);
  const day = Math.max(0, Math.min(group.nights, n.day));

  // "Avanzar solo": 1 segundo real = 5 minutos de estancia.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const c = now.value;
      const min = c.min + 5;
      setSim(min >= 1440 ? { day: Math.min(c.day + 1, group.nights), min: min - 1440 } : { day: c.day, min });
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <Sheet title={t('proto.title')}>
      <div class="sim-days">
        {Array.from({ length: group.nights + 1 }, (_, d) => {
          const date = dateOf(d);
          return (
            <button class={`sim-day ${day === d ? 'is-on' : ''}`} onClick={() => setSim({ day: d, min: n.min })}>
              <span>{weekday(date, true)}</span>
              <b>{date.getUTCDate()}</b>
            </button>
          );
        })}
      </div>
      <div class="sim-time">
        <b class="tnum">{hhmm(n.min)}</b>
        <input type="range" min={0} max={1435} step={5} value={n.min}
          onInput={(e) => setSim({ day, min: +(e.target as HTMLInputElement).value })} />
      </div>
      <div class="sim-actions">
        <button class="btn-tinted" onClick={() => setPlaying(!playing)}>{playing ? t('proto.pause') : t('proto.play')}</button>
        <button class="btn-tinted" disabled={!sim.value} onClick={() => setSim(null)}>{t('proto.real')}</button>
      </div>
      <h3 class="section-head">{t('proto.moments')}</h3>
      <ul class="group-list">
        {dayMoments(day).map((m) => (
          <li>
            <button class="row" onClick={() => setSim({ day: m.day, min: m.from + 5 })}>
              <span class="row-time tnum lead">{hhmm(m.from)}</span>
              <span class="row-main"><span class="row-title">{tMoment(m.kind)}</span></span>
              {n.min >= m.from && n.min < m.to && <Check size={22} strokeWidth={2.6} class="tint" />}
            </button>
          </li>
        ))}
      </ul>
    </Sheet>
  );
}
