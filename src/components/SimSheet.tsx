import { useEffect, useState } from 'preact/hooks';
import { now, setSim, sim, dateOf, hhmm } from '../core/clock';
import { group } from '../core/group';
import { dayMoments } from '../core/schedule';
import { t, tMoment, weekday } from '../core/i18n';
import { Sheet } from './Sheet';

export function SimSheet() {
  const n = now.value;
  const [playing, setPlaying] = useState(false);

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

  const days = Array.from({ length: group.nights + 1 }, (_, i) => i);
  return (
    <Sheet title={t('proto.title')}>
      <div class="sim-days">
        {days.map((d) => {
          const date = dateOf(d);
          return (
            <button class={`sim-day ${n.day === d ? 'is-on' : ''}`} onClick={() => setSim({ day: d, min: n.min })}>
              <span class="wide">{weekday(date)}</span>
              <b class="cond">{date.getUTCDate()}</b>
            </button>
          );
        })}
      </div>
      <label class="sim-time">
        <b class="cond">{hhmm(n.min)}</b>
        <input
          type="range" min={0} max={1435} step={5} value={n.min}
          onInput={(e) => setSim({ day: Math.max(0, Math.min(group.nights, n.day)), min: +(e.target as HTMLInputElement).value })}
        />
      </label>
      <div class="row">
        <button class="btn btn-big btn-ghost" onClick={() => setPlaying(!playing)}>
          {playing ? t('proto.pause') : t('proto.play')}
        </button>
        <button class="btn btn-big btn-ghost" disabled={!sim.value} onClick={() => setSim(null)}>{t('proto.real')}</button>
      </div>
      <p class="wide sheet-label">{t('proto.moments')}</p>
      <div class="sim-moments">
        {dayMoments(Math.max(0, Math.min(group.nights, n.day))).map((m) => (
          <button
            class={`sim-moment ${n.min >= m.from && n.min < m.to ? 'is-on' : ''}`}
            onClick={() => setSim({ day: m.day, min: m.from + 5 })}
          >
            <span class="tnum">{hhmm(m.from)}</span> {tMoment(m.kind)}
          </button>
        ))}
      </div>
    </Sheet>
  );
}
