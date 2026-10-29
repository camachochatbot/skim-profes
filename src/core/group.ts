// Grupo activo en este móvil.
// CONEXIÓN REAL: al abrir el enlace único del grupo (…/#g=<token>), la app
// descarga el GroupPack cifrado de Skim, lo guarda en el móvil y desde ahí
// funciona sin red. En el prototipo se usa el grupo de ejemplo.
import { parmiters } from '../data/parmiters';
import type { GroupPack } from './model';

export const group: GroupPack = parmiters;

export const studentById = new Map(group.students.map((s) => [s.id, s]));
export const monitorById = new Map(group.monitors.map((m) => [m.id, m]));
export const teacherById = new Map(group.teachers.map((t) => [t.id, t]));
