// ─────────────────────────────────────────────────────────────────────────────
// GRUPO DE EJEMPLO — DATOS PROVISIONALES
// Parmiter's School (agencia INSPIRESKI), 14–19 feb 2027, tomado de CONTEXTO.md.
// No verificado contra el cuadro de mandos. Alumnos, profesores, monitores,
// habitaciones y tiempo son INVENTADOS para el prototipo.
//
// CONEXIÓN REAL: este archivo lo sustituirá el paquete del grupo que Skim
// genera al importar el Excel del colegio (ver src/core/model.ts → GroupPack).
// ─────────────────────────────────────────────────────────────────────────────
import type { Allergen, GroupPack, Student, Teacher, Monitor, DayWeather } from '../core/model';

export const PROVISIONAL = true;

const teachers: Teacher[] = [
  { id: 't1', name: 'Sarah Whitfield', short: 'Sarah', lead: true },
  { id: 't2', name: 'James Okafor', short: 'James' },
  { id: 't3', name: 'Priya Shah', short: 'Priya' },
  { id: 't4', name: 'Daniel Hughes', short: 'Daniel' },
  { id: 't5', name: 'Rebecca Lowe', short: 'Rebecca' },
  { id: 't6', name: 'Mark Fenwick', short: 'Mark' },
  { id: 't7', name: 'Hannah Doyle', short: 'Hannah' },
  { id: 't8', name: 'Owen Price', short: 'Owen' },
];

// 7 monitores de Descens, uno por grupo de nivel.
const monitors: Monitor[] = [
  { id: 'm1', name: 'Jordi', level: 'beg', color: '#3ccf6e' },
  { id: 'm2', name: 'Marta', level: 'beg', color: '#3ccf6e' },
  { id: 'm3', name: 'Pau', level: 'beg', color: '#3ccf6e' },
  { id: 'm4', name: 'Núria', level: 'int', color: '#4d8cff' },
  { id: 'm5', name: 'Arnau', level: 'int', color: '#4d8cff' },
  { id: 'm6', name: 'Laia', level: 'adv', color: '#ff6b6b' },
  { id: 'm7', name: 'Xavi', level: 'snb', color: '#f2b33d' },
];

const FIRST = [
  'Tom', 'Laura', 'Oliver', 'Amelia', 'Harry', 'Isla', 'Jack', 'Ava', 'George', 'Mia',
  'Noah', 'Grace', 'Leo', 'Freya', 'Oscar', 'Lily', 'Charlie', 'Ella', 'Alfie', 'Sophie',
  'Theo', 'Poppy', 'Arthur', 'Evie', 'Henry', 'Ruby', 'Archie', 'Chloe', 'Freddie', 'Daisy',
  'Joshua', 'Millie', 'Ethan', 'Rosie', 'Max', 'Erin', 'Samuel', 'Matilda', 'Reuben', 'Zara',
  'Finley', 'Imogen', 'Lewis', 'Hattie', 'Kai', 'Phoebe', 'Rory', 'Maya', 'Toby', 'Esme',
  'Dylan', 'Holly', 'Jacob', 'Niamh', 'Ollie', 'Aisha', 'Ben', 'Lucy', 'Callum', 'Jess',
  'Aaron', 'Megan', 'Ryan', 'Keira', 'Luca', 'Ellie', 'Sam', 'Tilly', 'Ravi', 'Orla',
  'Zach', 'Hollie', 'Elliot', 'Abi', 'Joe', 'Nia', 'Felix', 'Iris', 'Ali',
];
const LAST = [
  'Bennett', 'Moreno', 'Hart', 'Patel', 'Reid', 'Clarke', 'Shaw', 'Evans', 'Turner', 'Hughes',
  'Walsh', 'Kaur', 'Fletcher', 'Mills', 'Dawson', 'Barker', 'Lloyd', 'Ahmed', 'Grant', 'Cole',
];

// Alergias (datos de salud: se guardan cifrados en el móvil real).
const ALLERGY: Record<string, Allergen[]> = {
  Laura: ['nuts'],
  Oliver: ['gluten'],
  Isla: ['milk'],
  George: ['egg', 'nuts'],
  Freya: ['crustaceans', 'molluscs'],
  Archie: ['peanuts'],
  Zara: ['sesame'],
  Rory: ['milk', 'egg'],
  Aisha: ['fish'],
};
// Sin autorización de imagen del colegio.
const NO_PHOTO = new Set(['Harry', 'Poppy', 'Kai', 'Niamh', 'Ravi', 'Felix']);

// Reparto por monitor: 79 alumnos en 7 grupos.
const SIZES = [12, 12, 11, 12, 11, 11, 10];

function buildStudents(): Student[] {
  const out: Student[] = [];
  let i = 0;
  SIZES.forEach((n, g) => {
    for (let k = 0; k < n; k++, i++) {
      const first = FIRST[i];
      const floor = i < 40 ? 1 : 2;
      const roomIdx = Math.floor((i % 40) / 4);
      out.push({
        id: `s${String(i + 1).padStart(2, '0')}`,
        first,
        last: LAST[(i * 7) % LAST.length],
        room: `${floor}${String(roomIdx + 1).padStart(2, '0')}`,
        monitor: monitors[g].id,
        allergies: ALLERGY[first] ?? [],
        imageConsent: !NO_PHOTO.has(first),
        pocketMoney: 40 + ((i * 13) % 5) * 10,
      });
    }
  });
  return out;
}

const weather: DayWeather[] = [
  { day: 0, sky: 'sun', tMin: -6, tMax: 4, wind: 15, snowCm: 0 },
  { day: 1, sky: 'sun', tMin: -7, tMax: 2, wind: 10, snowCm: 0 },
  { day: 2, sky: 'snow', tMin: -9, tMax: -2, wind: 25, snowCm: 18 },
  { day: 3, sky: 'wind', tMin: -8, tMax: -1, wind: 85, snowCm: 4 },
  { day: 4, sky: 'sun', tMin: -10, tMax: 1, wind: 12, snowCm: 0 },
  { day: 5, sky: 'cloud', tMin: -5, tMax: 3, wind: 20, snowCm: 0 },
];

export const parmiters: GroupPack = {
  id: 'parmiters-2027',
  provisional: PROVISIONAL,
  school: "Parmiter's School",
  agency: 'INSPIRESKI',
  lang: 'en',
  start: '2027-02-14',
  nights: 5,
  hotel: { name: 'La Collada', note: 'Hotel chófer La Collada' },
  school_ski: 'Descens',
  passes: 83,
  rental: 'Auto LM',
  bus: 'Transcerdanya',
  insurance: 'Skim',
  skimPhone: '+34 600 000 247', // INVENTADO — línea 24 h de Skim
  skimWhatsApp: '34600000247', // INVENTADO
  times: { breakfast: '07:15', dinner: '19:00', classAm: ['09:30', '12:30'], classPm: ['14:00', '17:00'] },
  teachers,
  monitors,
  students: buildStudents(),
  weather,
};
