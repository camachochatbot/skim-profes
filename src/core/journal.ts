// Diario de hechos.
//
// Nada se sobrescribe: cada acción del profesor es un hecho nuevo, con quién,
// cuándo y desde qué móvil. El estado de cada pieza se calcula leyendo el diario.
// Así, sincronizar entre los móviles de los profesores es juntar diarios
// (unión por id): no hay conflictos ni "quién gana".
//
// CONEXIÓN REAL (sincronización): `pendingSync()` devuelve los hechos que aún no
// han salido del móvil; un servicio de Skim los recibirá cifrados y devolverá
// los de los demás profesores del grupo, que se guardan con `ingest()`.
import { openDB, type IDBPDatabase } from 'idb';
import { signal } from '@preact/signals';

export interface Fact<T = unknown> {
  id: string; // único global: hora + móvil + aleatorio
  type: string; // p. ej. 'handover.received', 'bank.spend', 'room.checked'
  at: string; // hora simulada/real de La Molina (ISO local) en que pasó
  stamp: number; // reloj real del móvil, para ordenar
  device: string;
  author: string; // id del profesor
  data: T;
  synced?: 0 | 1;
}

const DB = 'skim-profes';
let dbp: Promise<IDBPDatabase> | null = null;
function db() {
  dbp ??= openDB(DB, 1, {
    upgrade(d) {
      const s = d.createObjectStore('facts', { keyPath: 'id' });
      s.createIndex('type', 'type');
      s.createIndex('synced', 'synced');
    },
  });
  return dbp;
}

export const deviceId = (() => {
  try {
    let id = localStorage.getItem('skim.device');
    if (!id) {
      id = crypto.randomUUID().slice(0, 8);
      localStorage.setItem('skim.device', id);
    }
    return id;
  } catch {
    return 'anon';
  }
})();

/** Todos los hechos, en memoria, ordenados. Las pantallas se derivan de aquí. */
export const facts = signal<Fact[]>([]);

export async function loadJournal() {
  const all = (await (await db()).getAll('facts')) as Fact[];
  facts.value = all.sort((a, b) => a.stamp - b.stamp);
}

export async function record<T>(type: string, data: T, author: string, at: string): Promise<Fact<T>> {
  const f: Fact<T> = {
    id: `${Date.now().toString(36)}-${deviceId}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    at,
    stamp: Date.now(),
    device: deviceId,
    author,
    data,
    synced: 0,
  };
  await (await db()).put('facts', f);
  facts.value = [...facts.value, f];
  return f;
}

export async function pendingSync() {
  return (await (await db()).getAllFromIndex('facts', 'synced', 0)) as Fact[];
}

export async function ingest(remote: Fact[]) {
  const d = await db();
  const tx = d.transaction('facts', 'readwrite');
  for (const f of remote) await tx.store.put({ ...f, synced: 1 });
  await tx.done;
  await loadJournal();
}

/** Solo para el prototipo: vaciar el diario y empezar de cero. */
export async function resetJournal() {
  await (await db()).clear('facts');
  facts.value = [];
}

export function ofType<T>(type: string) {
  return facts.value.filter((f) => f.type === type) as Fact<T>[];
}
