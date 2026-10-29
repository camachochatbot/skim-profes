// Lo que hizo el grupo cada día, calculado a partir del horario y del diario
// de hechos. Lo usan la postal y el diario del viaje. Sin datos de salud.
import { group } from './group';
import { dayMoments } from './schedule';
import { facts } from './journal';
import { ACTIVITIES } from '../data/activities';
import type { Level } from './model';

// Kilómetros de pista por hora de clase, ESTIMADOS por nivel (incluye remontes).
const KM_PER_HOUR: Record<Level, number> = { beg: 3, int: 7, adv: 11, snb: 5 };

export function classHours(day: number, uptoMin = 1440) {
  return dayMoments(day)
    .filter((m) => m.kind === 'class')
    .reduce((a, m) => a + Math.max(0, Math.min(m.to, uptoMin) - m.from) / 60, 0);
}

export function kmForDay(day: number, uptoMin = 1440) {
  const h = classHours(day, uptoMin);
  const level = new Map(group.monitors.map((m) => [m.id, m.level]));
  return Math.round(group.students.reduce((a, s) => a + h * KM_PER_HOUR[level.get(s.monitor)!], 0));
}

export function confirmedPlanB(day: number) {
  const ok = new Set(facts.value.filter((f) => f.type === 'planb.confirmed').map((f) => (f.data as { request: string }).request));
  return facts.value
    .filter((f) => f.type === 'planb.request' && ok.has(f.id) && (f.data as { day: number }).day === day)
    .map((f) => ACTIVITIES.find((a) => a.id === (f.data as { activity: string }).activity)!);
}

/** Frase automática del día, en el idioma pedido (las familias británicas: inglés). */
export function daySummary(day: number, lang: 'es' | 'en', uptoMin = 1440) {
  const w = group.weather[day];
  const km = kmForDay(day, uptoMin);
  const b = confirmedPlanB(day);
  const n = group.students.length;
  if (lang === 'en') {
    const sky = { sun: 'Sunshine', cloud: 'Clouds', snow: `${w.snowCm} cm of fresh snow`, wind: 'Strong wind' }[w.sky];
    if (day === 0) return `We made it to La Molina! ${sky}, ${w.tMax}°C. Rooms sorted, kit fitted, everyone ready for tomorrow.`;
    return `Day ${day} in La Molina. ${sky}, ${w.tMin}° to ${w.tMax}°C.` +
      (km ? ` Together our ${n} skiers covered about ${km.toLocaleString('en-GB')} km of piste with ${group.school_ski}.` : '') +
      (b.length ? ` Plan B: ${b.map((a) => a.name[1].toLowerCase()).join(' and ')}!` : '');
  }
  const sky = { sun: 'Sol', cloud: 'Nubes', snow: `${w.snowCm} cm de nieve nueva`, wind: 'Viento fuerte' }[w.sky];
  if (day === 0) return `¡Ya estamos en La Molina! ${sky}, ${w.tMax} °C. Habitaciones, material y todos listos para mañana.`;
  return `Día ${day} en La Molina. ${sky}, de ${w.tMin}° a ${w.tMax} °C.` +
    (km ? ` Entre los ${n} hemos bajado unos ${km.toLocaleString('es-ES')} km de pista con ${group.school_ski}.` : '') +
    (b.length ? ` Plan B: ${b.map((a) => a.name[0].toLowerCase()).join(' y ')}.` : '');
}
