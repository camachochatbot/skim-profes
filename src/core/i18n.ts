// Castellano e inglés. Muchos profesores son británicos.
import { lang } from './settings';
import type { MomentKind, PieceId } from './schedule';

type Dict = Record<string, string>;

const es: Dict = {
  'app.provisional': 'Grupo de ejemplo · datos provisionales',
  'proto.badge': 'Prototipo',
  'app.provisional.short': 'provisional',
  'proto.change': 'Cambiar día y hora',
  'proto.short': 'Cambiar',
  'proto.title': 'Simular día y hora',
  'proto.real': 'Usar la hora real',
  'proto.play': 'Avanzar solo',
  'proto.pause': 'Parar',
  'proto.moments': 'Saltar a un momento',
  'proto.reset': 'Borrar los datos de prueba',
  'proto.reset.done': 'Datos borrados',

  'now.label': 'Ahora',
  'now.until': 'hasta las {t}',
  'now.in': 'en {m} min',
  'now.open': 'Abrir',
  'now.also': 'También ahora',
  'now.next': 'Después',
  'now.done': 'Hecho',

  'dock.all': 'Todo',
  'dock.mic': 'Incidencia',
  'dock.settings': 'Ajustes',

  'all.title': 'Todas las piezas',
  'settings.title': 'Ajustes',
  'settings.me': 'Soy',
  'settings.lang': 'Idioma',
  'settings.theme': 'Pantalla',
  'theme.auto': 'Automática',
  'theme.auto.hint': 'Clara de alto contraste en pistas, oscura en el hotel',
  'theme.dark': 'Oscura',
  'theme.light': 'Clara (sol)',
  'back': 'Volver',
  'soon': 'Esta pieza llega en el siguiente paso del prototipo.',

  'day.0': 'Llegada',
  'day.n': 'Día {n} de esquí',
  'day.post': 'Después del viaje',
  'day.pre': 'Antes del viaje',

  'sky.sun': 'Sol', 'sky.cloud': 'Nubes', 'sky.snow': 'Nieva', 'sky.wind': 'Cubierto',

  'ctx.pre': 'Faltan {days} días para La Molina.',
  'ctx.travel': 'El bus llega a {hotel} a las 16:00. Imprime las tarjetas de "me he perdido".',
  'ctx.arrival': 'Llegada a {hotel}. Recoge el dinero de bolsillo antes de subir a las habitaciones.',
  'ctx.fitting': 'Material en {rental}. Pega cada tarjeta detrás de su forfait.',
  'ctx.night': 'De guardia esta noche: {duty}.',
  'ctx.breakfast': 'Desayuno a las {breakfast}. Hoy: {sky}, {tmin}° / {tmax}°, viento {wind} km/h.',
  'ctx.handover': '{school} os espera a las {meet} en el punto de encuentro. {n} monitores.',
  'ctx.class': 'Grupos en manos de {school}: {r} de {n}. Clase hasta las {to}.',
  'ctx.lunch': 'Comida en pistas. {a} alumnos con alergias: enséñalas en la barra.',
  'ctx.pickup': 'Cada monitor te devuelve su grupo a las {to}.',
  'ctx.free': 'Tiempo libre en el hotel. Tienda y dinero de bolsillo.',
  'ctx.dinner': 'Cena a las {dinner}. {a} alumnos con alergias.',
  'ctx.evening': '¿Buen día? Si quieres, manda una postal a las familias.',
  'ctx.rounds': 'Ronda de habitaciones. De guardia: {duty}.',
  'ctx.planb': 'Viento de {wind} km/h en la Tosa: telecabina cerrada. Elige plan B y pídeselo a Skim.',
  'ctx.departure': 'Bus {bus} a las 17:30. Último vistazo antes de subir.',
  'ctx.post': 'Se acabó la estancia. Tu diario del viaje está listo.',

  'chip.allergies': '{a} con alergias',
  'chip.received': '{r}/{n} recibidos',
  'chip.duty': 'Guardia: {duty}',
  'chip.wind': 'Viento {wind} km/h',
};

const en: Dict = {
  'app.provisional': 'Sample group · provisional data',
  'proto.badge': 'Prototype',
  'app.provisional.short': 'provisional',
  'proto.change': 'Change day & time',
  'proto.short': 'Change',
  'proto.title': 'Simulate day & time',
  'proto.real': 'Use real time',
  'proto.play': 'Run clock',
  'proto.pause': 'Stop',
  'proto.moments': 'Jump to a moment',
  'proto.reset': 'Wipe test data',
  'proto.reset.done': 'Data wiped',

  'now.label': 'Now',
  'now.until': 'until {t}',
  'now.in': 'in {m} min',
  'now.open': 'Open',
  'now.also': 'Also now',
  'now.next': 'Later',
  'now.done': 'Done',

  'dock.all': 'All',
  'dock.mic': 'Incident',
  'dock.settings': 'Settings',

  'all.title': 'Everything',
  'settings.title': 'Settings',
  'settings.me': 'I am',
  'settings.lang': 'Language',
  'settings.theme': 'Screen',
  'theme.auto': 'Automatic',
  'theme.auto.hint': 'High-contrast light on the slopes, dark at the hotel',
  'theme.dark': 'Dark',
  'theme.light': 'Light (sun)',
  'back': 'Back',
  'soon': 'This piece arrives in the next prototype step.',

  'day.0': 'Arrival',
  'day.n': 'Ski day {n}',
  'day.post': 'After the trip',
  'day.pre': 'Before the trip',

  'sky.sun': 'Sunny', 'sky.cloud': 'Cloudy', 'sky.snow': 'Snowing', 'sky.wind': 'Overcast',

  'ctx.pre': '{days} days to go until La Molina.',
  'ctx.travel': 'The coach reaches {hotel} at 16:00. Print the "I\'m lost" cards.',
  'ctx.arrival': 'Arrival at {hotel}. Collect pocket money before rooms.',
  'ctx.fitting': 'Kit fitting at {rental}. Stick each card behind its lift pass.',
  'ctx.night': 'On duty tonight: {duty}.',
  'ctx.breakfast': 'Breakfast at {breakfast}. Today: {sky}, {tmin}° / {tmax}°, wind {wind} km/h.',
  'ctx.handover': '{school} meets you at {meet} at the meeting point. {n} instructors.',
  'ctx.class': 'Groups with {school}: {r} of {n}. Lessons until {to}.',
  'ctx.lunch': 'Lunch on the mountain. {a} pupils with allergies: show them at the counter.',
  'ctx.pickup': 'Each instructor hands their group back at {to}.',
  'ctx.free': 'Free time at the hotel. Shop and pocket money.',
  'ctx.dinner': 'Dinner at {dinner}. {a} pupils with allergies.',
  'ctx.evening': 'Good day? If you like, send a postcard home.',
  'ctx.rounds': 'Room check. On duty: {duty}.',
  'ctx.planb': 'Wind {wind} km/h on the Tosa: gondola closed. Pick a plan B and ask Skim.',
  'ctx.departure': '{bus} coach at 17:30. One last look before boarding.',
  'ctx.post': 'The stay is over. Your trip diary is ready.',

  'chip.allergies': '{a} with allergies',
  'chip.received': '{r}/{n} received',
  'chip.duty': 'Duty: {duty}',
  'chip.wind': 'Wind {wind} km/h',
};

const momentTitle: Record<MomentKind, [string, string]> = {
  pre: ['Pronto', 'Soon'],
  travel: ['En camino', 'On the way'],
  arrival: ['Llegada', 'Arrival'],
  fitting: ['Material', 'Kit'],
  night: ['Noche', 'Night'],
  breakfast: ['Desayuno', 'Breakfast'],
  handover: ['Entrega', 'Hand-over'],
  class: ['En clase', 'Lessons'],
  lunch: ['Comida', 'Lunch'],
  pickup: ['Recogida', 'Pick-up'],
  free: ['Libre', 'Free time'],
  dinner: ['Cena', 'Dinner'],
  evening: ['Velada', 'Evening'],
  rounds: ['Ronda', 'Rounds'],
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
  duty: ['Guardias', 'Night duty'],
  rounds: ['Ronda de habitaciones', 'Room check'],
  postcard: ['Postal a las familias', 'Postcard home'],
  diary: ['Diario del viaje', 'Trip diary'],
};

const WEEKDAYS = {
  es: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

const idx = () => (lang.value === 'es' ? 0 : 1);

export function t(key: string, vars: Record<string, string | number> = {}) {
  const d = lang.value === 'es' ? es : en;
  const s = d[key] ?? es[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
export const tMoment = (k: MomentKind) => momentTitle[k][idx()];
export const tPiece = (p: PieceId) => pieceName[p][idx()];
export const weekday = (d: Date) => WEEKDAYS[lang.value][d.getUTCDay()];
