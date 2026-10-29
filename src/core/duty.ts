// Turnos de guardia: 2 profesores por noche, nadie repite dos noches seguidas.
import { group } from './group';

export function dutyRota(perNight = 2): string[][] {
  const ids = group.teachers.map((t) => t.id);
  const nights: string[][] = [];
  let cursor = 0;
  for (let n = 0; n < group.nights; n++) {
    const prev = new Set(nights[n - 1] ?? []);
    const pick: string[] = [];
    for (let tries = 0; pick.length < perNight && tries < ids.length * 2; tries++) {
      const id = ids[cursor % ids.length];
      cursor++;
      if (!prev.has(id) && !pick.includes(id)) pick.push(id);
    }
    nights.push(pick);
  }
  return nights;
}

/** Quién está de guardia la noche del día `day` (la madrugada cuenta como la noche anterior). */
export function onDuty(day: number, min: number): string[] {
  const night = min < 7 * 60 ? day - 1 : day;
  return dutyRota()[night] ?? [];
}
