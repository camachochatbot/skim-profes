// Modelo de datos de la app del profesor.
// Un "GroupPack" es todo lo que el móvil necesita para la estancia, sin red.

export type Level = 'beg' | 'int' | 'adv' | 'snb';
export type Allergen =
  | 'gluten' | 'crustaceans' | 'egg' | 'fish' | 'peanuts' | 'soy' | 'milk'
  | 'nuts' | 'celery' | 'mustard' | 'sesame' | 'sulphites' | 'lupin' | 'molluscs';

export interface Teacher { id: string; name: string; short: string; lead?: boolean }
export interface Monitor { id: string; name: string; level: Level; color: string }

export interface Student {
  id: string;
  first: string;
  last: string;
  room: string;
  monitor: string;
  allergies: Allergen[];
  imageConsent: boolean;
  pocketMoney: number; // € entregados por la familia (lo apunta el profesor al llegar)
}

export interface DayWeather {
  day: number; // 0 = día de llegada
  sky: 'sun' | 'cloud' | 'snow' | 'wind';
  tMin: number;
  tMax: number;
  wind: number; // km/h en la Tosa d'Alp
  snowCm: number;
}

export interface GroupPack {
  id: string;
  provisional: boolean;
  school: string;
  agency: string;
  lang: 'en' | 'es';
  start: string; // AAAA-MM-DD, día de llegada
  nights: number;
  hotel: { name: string; note?: string };
  school_ski: string;
  passes: number;
  rental: string;
  bus: string;
  insurance: string;
  skimPhone: string;
  skimWhatsApp: string;
  times: { breakfast: string; dinner: string; classAm: [string, string]; classPm: [string, string] };
  teachers: Teacher[];
  monitors: Monitor[];
  students: Student[];
  weather: DayWeather[];
}

/** Momento de la estancia en hora de La Molina: día 0..nights y minuto del día. */
export interface StayTime { day: number; min: number }
