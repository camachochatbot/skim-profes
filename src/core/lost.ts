// Tarjeta "me he perdido": token del código QR y alertas.
// El QR NO lleva datos del alumno: solo un código que únicamente el móvil
// del profesor (y Skim) saben relacionar con un alumno.
import { computed } from '@preact/signals';
import { group } from './group';
import { facts } from './journal';

export function cardToken(studentId: string) {
  // Prototipo: derivado del grupo y del alumno. CONEXIÓN REAL: aleatorio, generado por Skim.
  let h = 2166136261;
  for (const c of `${group.id}:${studentId}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(36).padStart(7, '0');
}

export function cardUrl(studentId: string) {
  return `${location.origin}${import.meta.env.BASE_URL}#perdido=${cardToken(studentId)}`;
}

export interface LostAlert { student: string; place: string; lat: number; lng: number }

/** Alerta abierta (escaneada y aún no resuelta): tapa todo lo demás. */
export const openAlert = computed(() => {
  const resolved = new Set(facts.value.filter((f) => f.type === 'lost.resolved').map((f) => (f.data as { alert: string }).alert));
  return facts.value.filter((f) => f.type === 'lost.alert' && !resolved.has(f.id)).at(-1) as
    | (typeof facts.value)[number] & { data: LostAlert & { day: number; min: number } }
    | undefined;
});
