// Reloj de la app: hora real de La Molina o una hora simulada (prototipo).
import { signal, computed } from '@preact/signals';
import type { StayTime } from './model';
import { group } from './group';

const KEY = 'skim.sim';

function readSim(): StayTime | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === 'real') return null;
    if (raw) return JSON.parse(raw);
  } catch { /* sin almacenamiento: seguimos con el valor por defecto */ }
  // Por defecto el prototipo arranca el lunes a las 8:50, antes de la entrega.
  return { day: 1, min: 8 * 60 + 50 };
}

export const sim = signal<StayTime | null>(readSim());
const realTick = signal(Date.now());
setInterval(() => (realTick.value = Date.now()), 20_000);

export function setSim(t: StayTime | null) {
  sim.value = t;
  try {
    localStorage.setItem(KEY, t ? JSON.stringify(t) : 'real');
  } catch { /* nada */ }
}

/** Hora real en La Molina convertida a día de estancia (puede salir de rango). */
function realStayTime(ms: number): StayTime {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(ms));
  const p = (t: string) => parts.find((x) => x.type === t)!.value;
  const today = Date.UTC(+p('year'), +p('month') - 1, +p('day'));
  const [y, m, d] = group.start.split('-').map(Number);
  const day = Math.round((today - Date.UTC(y, m - 1, d)) / 86_400_000);
  return { day, min: +p('hour') * 60 + +p('minute') };
}

export const now = computed<StayTime>(() => sim.value ?? realStayTime(realTick.value));

export const lastDay = () => group.nights;

export function dateOf(day: number): Date {
  const [y, m, d] = group.start.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + day, 12));
}

export function hhmm(min: number) {
  const h = Math.floor(min / 60) % 24;
  return `${String(h).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
}

export function toMin(s: string) {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
}

/** Marca de tiempo local de La Molina para guardar en los hechos del diario. */
export function stamp(t: StayTime = now.value) {
  const d = dateOf(t.day).toISOString().slice(0, 10);
  return `${d}T${hhmm(t.min)}`;
}
