// Pantalla "Ahora": sin menús. El momento en curso ocupa la pantalla como la
// cima de un mapa topográfico; lo que ya pasó y lo que viene son curvas de nivel.
import { now, hhmm, dateOf, toMin } from '../core/clock';
import { group, teacherById } from '../core/group';
import { currentMoment, todayMoments, type Moment } from '../core/schedule';
import { onDuty } from '../core/duty';
import { facts } from '../core/journal';
import { go } from '../core/nav';
import { lang } from '../core/settings';
import { t, tMoment, tPiece, weekday } from '../core/i18n';
import { ContourLine, Summit } from '../components/Contour';
import { IconArrow } from '../components/Icons';
import { FitTitle } from '../components/FitTitle';

const MEET = toMin(group.times.classAm[0]) - 15; // la escuela recoge 15 min antes de clase

function receivedToday(day: number) {
  const ids = new Set<string>();
  for (const f of facts.value) {
    if (f.type === 'handover.received' && (f.data as { day: number }).day === day) ids.add((f.data as { monitor: string }).monitor);
  }
  return ids.size;
}

function context(m: Moment) {
  const n = now.value;
  const w = group.weather[Math.max(0, Math.min(group.nights, n.day))];
  const duty = onDuty(n.day, n.min).map((id) => teacherById.get(id)?.short).join(' + ');
  const a = group.students.filter((s) => s.allergies.length).length;
  const vars = {
    hotel: group.hotel.name,
    rental: group.rental,
    school: group.school_ski,
    bus: group.bus,
    breakfast: group.times.breakfast,
    dinner: group.times.dinner,
    meet: hhmm(MEET),
    n: group.monitors.length,
    r: receivedToday(n.day),
    to: hhmm(m.to),
    a,
    duty,
    wind: w?.wind ?? 0,
    tmin: w?.tMin ?? 0,
    tmax: w?.tMax ?? 0,
    sky: t(`sky.${w?.sky ?? 'sun'}`).toLowerCase(),
    days: Math.max(0, -n.day),
  };
  const chips: string[] = [];
  if (m.kind === 'class' || m.kind === 'handover' || m.kind === 'pickup') chips.push(t('chip.received', vars));
  if (m.kind === 'lunch' || m.kind === 'dinner' || m.kind === 'breakfast') chips.push(t('chip.allergies', vars));
  if (m.kind === 'night') chips.push(t('chip.duty', vars));
  if (m.kind === 'planb' || (m.kind === 'breakfast' && vars.wind >= 70)) chips.push(t('chip.wind', vars));
  return { text: t(`ctx.${m.kind}`, vars), chips };
}

function countdown(m: Moment) {
  const n = now.value;
  if (m.kind === 'handover' && n.min < MEET) return t('now.in', { m: MEET - n.min });
  return m.to >= 1440 ? '' : t('now.until', { t: hhmm(m.to) });
}

export function Ahora() {
  const n = now.value;
  const m = currentMoment.value;
  const list = todayMoments.value;
  const i = list.findIndex((x) => x.from === m.from);
  const past = list.slice(Math.max(0, i - 1), i);
  const next = list.slice(i + 1, i + 4);
  const ctx = context(m);
  const date = dateOf(n.day);
  const dayLabel =
    n.day < 0 ? t('day.pre') : n.day > group.nights ? t('day.post') : n.day === 0 ? t('day.0') : t('day.n', { n: n.day });
  const title = tMoment(m.kind);
  void lang.value;

  return (
    <main class="ahora">
      <p class="wide ahora-day">{weekday(date)} {date.getUTCDate()} · {dayLabel}</p>

      <div class="contours past">
        {past.map((p) => (
          <button class="contour-row" onClick={() => p.piece && go(p.piece)}>
            <ContourLine seed={p.from + p.day * 1440} time={hhmm(p.from)} title={tMoment(p.kind)} extra="✓" faded />
          </button>
        ))}
      </div>

      <section class="now-card card">
        <Summit seed={m.from + m.day} />
        <p class="wide now-kicker">
          <span class="now-dot" /> {t('now.label')} · {hhmm(m.from)}–{m.to >= 1440 ? '24:00' : hhmm(m.to)}
        </p>
        <FitTitle class="cond scratched now-title" text={title} />
        {countdown(m) && <p class="now-countdown cond">{countdown(m)}</p>}
        <p class="now-text">{ctx.text}</p>
        {ctx.chips.length > 0 && (
          <div class="chips">{ctx.chips.map((c) => <span class="chip">{c}</span>)}</div>
        )}
        {m.piece && (
          <button class="btn btn-primary btn-huge" onClick={() => go(m.piece!)}>
            <span>{tPiece(m.piece)}</span>
            <IconArrow />
          </button>
        )}
        {m.also && m.also.length > 0 && (
          <div class="also">
            {m.also.map((p) => (
              <button class="btn btn-big btn-ghost" onClick={() => go(p)}>{tPiece(p)}</button>
            ))}
          </div>
        )}
      </section>

      {next.length > 0 && (
        <div class="contours next">
          <p class="wide contours-label">{t('now.next')}</p>
          {next.map((p) => (
            <button class="contour-row" onClick={() => p.piece && go(p.piece)}>
              <ContourLine seed={p.from + p.day * 1440} time={hhmm(p.from)} title={tMoment(p.kind)} extra={p.piece ? tPiece(p.piece) : undefined} />
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
