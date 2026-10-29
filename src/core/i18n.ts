// Castellano e inglés. Muchos profesores son británicos.
import { lang } from './settings';
import type { MomentKind, PieceId } from './schedule';

type Dict = Record<string, string>;

const es: Dict = {
  'app.provisional': 'Grupo de ejemplo · datos provisionales',
  'proto.badge': 'Prototipo',
  'proto.title': 'Simular día y hora',
  'proto.real': 'Hora real',
  'proto.play': 'Avanzar solo',
  'proto.pause': 'Parar',
  'proto.moments': 'Saltar a un momento',
  'proto.reset': 'Borrar datos de prueba',
  'proto.reset.done': 'Datos borrados',
  'done': 'Listo',

  'tab.now': 'Ahora',
  'tab.pupils': 'Alumnos',
  'tab.night': 'Noche',
  'tab.trip': 'Viaje',

  'now.label': 'Ahora',
  'now.min': 'min',
  'now.until': 'hasta las {t}',
  'now.starts': 'empieza en',
  'now.ends': 'termina en',
  'now.open': 'Abrir',
  'now.today': 'Hoy',
  'now.badge': 'Ahora',
  'fab.incident': 'Nueva incidencia',

  'settings.title': 'Ajustes',
  'settings.me': 'Soy',
  'settings.lang': 'Idioma',
  'settings.theme': 'Apariencia',
  'theme.auto': 'Auto',
  'theme.auto.hint': 'Automática: clara en pistas para leer con sol, oscura en el hotel.',
  'theme.dark': 'Oscura',
  'theme.light': 'Clara',
  'back': 'Atrás',
  'soon': 'Esta pieza llega en el siguiente paso del prototipo.',

  'day.0': 'Llegada',
  'day.n': 'Día {n} de esquí',
  'day.post': 'Después del viaje',
  'day.pre': 'Antes del viaje',

  'sky.sun': 'sol', 'sky.cloud': 'nubes', 'sky.snow': 'nieva', 'sky.wind': 'cubierto',

  'ctx.pre': 'Faltan {days} días para La Molina.',
  'ctx.travel': 'El bus llega a {hotel} a las 16:00. Imprime las tarjetas de "me he perdido".',
  'ctx.arrival': 'Llegada a {hotel}. Recoge el dinero de bolsillo antes de subir a las habitaciones.',
  'ctx.fitting': 'Material en {rental}. Pega cada tarjeta detrás de su forfait.',
  'ctx.night': 'A descansar. Si pasa algo, apúntalo como incidencia.',
  'ctx.breakfast': 'Desayuno a las {breakfast}. Hoy {sky}, {tmin}° / {tmax}°, viento {wind} km/h.',
  'ctx.handover': '{school} os espera a las {meet} en el punto de encuentro.',
  'ctx.class': '{r} de {n} grupos en manos de {school}.',
  'ctx.lunch': 'Comida en pistas. Enseña las alergias en la barra.',
  'ctx.pickup': 'Cada monitor te devuelve su grupo.',
  'ctx.free': 'Tiempo libre en el hotel. Tienda y dinero de bolsillo.',
  'ctx.dinner': 'Cena a las {dinner}.',
  'ctx.evening': '¿Buen día? Si quieres, manda una postal a las familias.',
  'ctx.rounds': 'Comprueba cada habitación hasta que todas estén en verde.',
  'ctx.planb': 'Viento de {wind} km/h en la Tosa: telecabina cerrada. Elige plan B.',
  'ctx.departure': 'Bus {bus} a las 17:30. Último vistazo antes de subir.',
  'ctx.post': 'Se acabó la estancia. Tu diario del viaje está listo.',

  'chip.allergies': '{a} con alergias',
  'chip.received': '{r}/{n} recibidos',
  'chip.wind': 'Viento {wind} km/h',
  'chip.rooms': '{rooms} habitaciones',
};

const en: Dict = {
  'app.provisional': 'Sample group · provisional data',
  'proto.badge': 'Prototype',
  'proto.title': 'Simulate day & time',
  'proto.real': 'Real time',
  'proto.play': 'Run clock',
  'proto.pause': 'Stop',
  'proto.moments': 'Jump to a moment',
  'proto.reset': 'Wipe test data',
  'proto.reset.done': 'Data wiped',
  'done': 'Done',

  'tab.now': 'Now',
  'tab.pupils': 'Pupils',
  'tab.night': 'Night',
  'tab.trip': 'Trip',

  'now.label': 'Now',
  'now.min': 'min',
  'now.until': 'until {t}',
  'now.starts': 'starts in',
  'now.ends': 'ends in',
  'now.open': 'Open',
  'now.today': 'Today',
  'now.badge': 'Now',
  'fab.incident': 'New incident',

  'settings.title': 'Settings',
  'settings.me': 'I am',
  'settings.lang': 'Language',
  'settings.theme': 'Appearance',
  'theme.auto': 'Auto',
  'theme.auto.hint': 'Automatic: light on the slopes to read in the sun, dark at the hotel.',
  'theme.dark': 'Dark',
  'theme.light': 'Light',
  'back': 'Back',
  'soon': 'This piece arrives in the next prototype step.',

  'day.0': 'Arrival',
  'day.n': 'Ski day {n}',
  'day.post': 'After the trip',
  'day.pre': 'Before the trip',

  'sky.sun': 'sunny', 'sky.cloud': 'cloudy', 'sky.snow': 'snowing', 'sky.wind': 'overcast',

  'ctx.pre': '{days} days to go until La Molina.',
  'ctx.travel': 'The coach reaches {hotel} at 16:00. Print the "I\'m lost" cards.',
  'ctx.arrival': 'Arrival at {hotel}. Collect pocket money before rooms.',
  'ctx.fitting': 'Kit fitting at {rental}. Stick each card behind its lift pass.',
  'ctx.night': 'Rest. If anything happens, log it as an incident.',
  'ctx.breakfast': 'Breakfast at {breakfast}. Today {sky}, {tmin}° / {tmax}°, wind {wind} km/h.',
  'ctx.handover': '{school} meets you at {meet} at the meeting point.',
  'ctx.class': '{r} of {n} groups with {school}.',
  'ctx.lunch': 'Lunch on the mountain. Show the allergies at the counter.',
  'ctx.pickup': 'Each instructor hands their group back.',
  'ctx.free': 'Free time at the hotel. Shop and pocket money.',
  'ctx.dinner': 'Dinner at {dinner}.',
  'ctx.evening': 'Good day? If you like, send a postcard home.',
  'ctx.rounds': 'Check every room until they are all green.',
  'ctx.planb': 'Wind {wind} km/h on the Tosa: gondola closed. Pick a plan B.',
  'ctx.departure': '{bus} coach at 17:30. One last look before boarding.',
  'ctx.post': 'The stay is over. Your trip diary is ready.',

  'chip.allergies': '{a} with allergies',
  'chip.received': '{r}/{n} received',
  'chip.wind': 'Wind {wind} km/h',
  'chip.rooms': '{rooms} rooms',
};

const momentTitle: Record<MomentKind, [string, string]> = {
  pre: ['Pronto', 'Soon'],
  travel: ['En camino', 'On the way'],
  arrival: ['Llegada', 'Arrival'],
  fitting: ['Material', 'Kit fitting'],
  night: ['Noche', 'Night'],
  breakfast: ['Desayuno', 'Breakfast'],
  handover: ['Entrega', 'Hand-over'],
  class: ['En clase', 'Lessons'],
  lunch: ['Comida', 'Lunch'],
  pickup: ['Recogida', 'Pick-up'],
  free: ['Tiempo libre', 'Free time'],
  dinner: ['Cena', 'Dinner'],
  evening: ['Velada', 'Evening'],
  rounds: ['Ronda', 'Room check'],
  planb: ['Plan B', 'Plan B'],
  departure: ['Salida', 'Departure'],
  post: ['Diario', 'Diary'],
};

const pieceName: Record<PieceId, [string, string]> = {
  handover: ['Entrega a la escuela', 'Ski school hand-over'],
  lostcard: ['Tarjetas "me he perdido"', '"I\'m lost" cards'],
  allergies: ['Alergias', 'Allergies'],
  incident: ['Incidencias', 'Incidents'],
  planb: ['Plan B', 'Plan B'],
  bank: ['Banco del profe', "Teacher's bank"],
  rounds: ['Ronda de habitaciones', 'Room check'],
  postcard: ['Postal a las familias', 'Postcard home'],
  diary: ['Diario del viaje', 'Trip diary'],
};

const WEEKDAYS = {
  es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};
const MONTHS = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const idx = () => (lang.value === 'es' ? 0 : 1);

export function t(key: string, vars: Record<string, string | number> = {}) {
  const d = lang.value === 'es' ? es : en;
  const s = d[key] ?? es[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
export const tMoment = (k: MomentKind) => momentTitle[k][idx()];
export const tPiece = (p: PieceId) => pieceName[p][idx()];
export const weekday = (d: Date, short = false) => {
  const w = WEEKDAYS[lang.value][d.getUTCDay()];
  return short ? w.slice(0, 3) : w;
};
/** "lunes 15 de febrero" / "Monday 15 February" */
export const longDate = (d: Date) =>
  lang.value === 'es'
    ? `${weekday(d)} ${d.getUTCDate()} de ${MONTHS.es[d.getUTCMonth()]}`
    : `${weekday(d)} ${d.getUTCDate()} ${MONTHS.en[d.getUTCMonth()]}`;
