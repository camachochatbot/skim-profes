// Atajos para las piezas: apuntar hechos en el diario y saber si hay red.
import { signal } from '@preact/signals';
import { record, facts, type Fact } from './journal';
import { me } from './settings';
import { now, stamp } from './clock';

export const online = signal(typeof navigator === 'undefined' ? true : navigator.onLine);
window.addEventListener('online', () => (online.value = true));
window.addEventListener('offline', () => (online.value = false));

/** Apunta un hecho con el profesor actual y la hora (simulada o real) de La Molina. */
export function log<T>(type: string, data: T) {
  return record(type, { ...data, day: now.value.day, min: now.value.min }, me.value, stamp());
}

export type Logged<T> = Fact<T & { day: number; min: number }>;

export function list<T>(type: string, pred?: (f: Logged<T>) => boolean): Logged<T>[] {
  const out = facts.value.filter((f) => f.type === type) as Logged<T>[];
  return pred ? out.filter(pred) : out;
}

export function fmtMoney(n: number) {
  return `${n.toFixed(n % 1 ? 2 : 0).replace('.', ',')}\u00a0€`;
}
