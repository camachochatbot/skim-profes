// Pantalla "Ahora": una tarjeta tipo Actividad en Vivo con lo que toca y,
// debajo, el día entero como lista agrupada de iOS.
import { ChevronRight, Check } from 'lucide-preact';
import { now, hhmm, dateOf, toMin } from '../core/clock';
import { group } from '../core/group';
import { currentMoment, todayMoments, type Moment } from '../core/schedule';
import { PIECE_META, MOMENT_ICON } from '../core/pieces';
import { receivedCount } from '../pieces/Handover';
import { go } from '../core/nav';
import { t, tMoment, tPiece, longDate } from '../core/i18n';
import { AppIcon } from '../components/Icons';
import { NavHeader } from '../components/NavHeader';

const MEET = toMin(group.times.classAm[0]) - 15; // la escuela recoge 15 min antes de clase
const GRAY = '#8e8e93';

function context(m: Moment) {
  const n = now.value;
  const w = group.weather[Math.max(0, Math.min(group.nights, n.day))];
  const vars = {
    hotel: group.hotel.name, rental: group.rental, school: group.school_ski, bus: group.bus,
    breakfast: group.times.breakfast, dinner: group.times.dinner, meet: hhmm(MEET),
    n: group.monitors.length, r: receivedCount(),
    a: group.students.filter((s) => s.allergies.length).length,
    rooms: new Set(group.students.map((s) => s.room)).size,
    wind: w?.wind ?? 0, tmin: w?.tMin ?? 0, tmax: w?.tMax ?? 0,
    sky: t(`sky.${w?.sky ?? 'sun'}`), days: Math.max(0, -n.day),
  };
  const chips: string[] = [];
  if (m.kind === 'class' || m.kind === 'handover' || m.kind === 'pickup') chips.push(t('chip.received', vars));
  if (m.kind === 'lunch' || m.kind === 'dinner' || m.kind === 'breakfast') chips.push(t('chip.allergies', vars));
  if (m.kind === 'rounds') chips.push(t('chip.rooms', vars));
  if (m.kind === 'planb' || (m.kind === 'breakfast' && vars.wind >= 70)) chips.push(t('chip.wind', vars));
  return { text: t(`ctx.${m.kind}`, vars), chips };
}

/** Cuenta atrás al estilo de un temporizador de Actividad en Vivo. */
function countdown(m: Moment): { label: string; value: string; unit?: string } {
  const n = now.value;
  if (m.kind === 'handover' && n.min < MEET) return { label: t('now.starts'), value: String(MEET - n.min), unit: t('now.min') };
  const left = m.to - n.min;
  if (m.to < 1440 && left <= 90) return { label: t('now.ends'), value: String(left), unit: t('now.min') };
  return { label: t('now.until', { t: '' }).trim(), value: m.to >= 1440 ? '24:00' : hhmm(m.to) };
}

function iconFor(m: Moment) {
  return { icon: MOMENT_ICON[m.kind], color: m.piece ? PIECE_META[m.piece].color : GRAY };
}

export function Ahora() {
  const n = now.value;
  const m = currentMoment.value;
  const list = todayMoments.value;
  const ctx = context(m);
  const cd = countdown(m);
  const date = dateOf(n.day);
  const dayLabel =
    n.day < 0 ? t('day.pre') : n.day > group.nights ? t('day.post') : n.day === 0 ? t('day.0') : t('day.n', { n: n.day });
  const progress = Math.min(1, Math.max(0, (n.min - m.from) / (m.to - m.from)));
  const ic = iconFor(m);

  return (
    <main class="screen">
      <NavHeader title={t('tab.now')} sub={`${longDate(date)} · ${dayLabel}`} />

      <section class="live" aria-live="polite">
        <div class="live-top">
          <AppIcon icon={ic.icon} color={ic.color} size={44} />
          <div class="live-head">
            <span class="live-kicker">{hhmm(m.from)}–{m.to >= 1440 ? '24:00' : hhmm(m.to)}</span>
            <h2 class="live-title">{tMoment(m.kind)}</h2>
          </div>
          <div class="live-timer">
            <span class="live-timer-label">{cd.label}</span>
            <span class="live-timer-value tnum">{cd.value}{cd.unit && <small> {cd.unit}</small>}</span>
          </div>
        </div>
        <div class="live-progress"><span style={{ width: `${progress * 100}%` }} /></div>
        <p class="live-text">{ctx.text}</p>
        {ctx.chips.length > 0 && <div class="capsules">{ctx.chips.map((c) => <span class="capsule">{c}</span>)}</div>}
        {m.piece && (
          <button class="btn-filled" onClick={() => go(m.piece!)}>{tPiece(m.piece)}</button>
        )}
        {m.also && m.also.length > 0 && (
          <div class="live-also">
            {m.also.map((p) => {
              const meta = PIECE_META[p];
              const I = meta.icon;
              return (
                <button class="btn-tinted" onClick={() => go(p)}>
                  <I size={22} strokeWidth={2.2} color={meta.color} /> <span>{tPiece(p)}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <h3 class="section-head">{t('now.today')}</h3>
      <ul class="group-list">
        {list.map((x) => {
          const isNow = x.from === m.from;
          const past = x.to <= n.min && !isNow;
          const xi = iconFor(x);
          return (
            <li>
              <button class={`row ${past ? 'is-past' : ''} ${isNow ? 'is-now' : ''}`} onClick={() => x.piece && go(x.piece)} disabled={!x.piece}>
                <AppIcon icon={xi.icon} color={past ? GRAY : xi.color} />
                <span class="row-main">
                  <span class="row-title">{tMoment(x.kind)}</span>
                  {x.piece && <span class="row-sub">{tPiece(x.piece)}</span>}
                </span>
                {isNow ? <span class="badge-now">{t('now.badge')}</span> : past ? <Check size={20} class="row-check" /> : null}
                <span class="row-time tnum">{hhmm(x.from)}</span>
                {x.piece && <ChevronRight size={20} class="chev" />}
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
