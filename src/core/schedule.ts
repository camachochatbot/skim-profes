// El horario del grupo convertido en "momentos". La pantalla Ahora enseña
// el momento en curso y su pieza; el resto queda a un toque.
import { computed } from '@preact/signals';
import { now, toMin } from './clock';
import { group } from './group';
import type { StayTime } from './model';

export type PieceId =
  | 'handover' | 'lostcard' | 'allergies' | 'incident' | 'planb'
  | 'bank' | 'duty' | 'rounds' | 'postcard' | 'diary';

export const PIECES: PieceId[] = [
  'handover', 'lostcard', 'allergies', 'incident', 'planb',
  'bank', 'duty', 'rounds', 'postcard', 'diary',
];

export type MomentKind =
  | 'pre' | 'travel' | 'arrival' | 'fitting' | 'night' | 'breakfast' | 'handover'
  | 'class' | 'lunch' | 'pickup' | 'free' | 'dinner' | 'evening' | 'rounds'
  | 'planb' | 'departure' | 'post';

export interface Moment {
  kind: MomentKind;
  day: number;
  from: number; // minuto del día
  to: number;
  piece?: PieceId; // la pieza que toca
  also?: PieceId[]; // otras útiles ahora
  onSnow?: boolean; // en pistas: tema claro de alto contraste
}

const T = group.times;
const m = (s: string) => toMin(s);

function skiDay(day: number, last: boolean): Moment[] {
  const windy = (group.weather[day]?.wind ?? 0) >= 70;
  const d = (kind: MomentKind, from: string, to: string, piece?: PieceId, also?: PieceId[], onSnow = false): Moment =>
    ({ kind, day, from: m(from), to: m(to), piece, also, onSnow });
  const morning: Moment[] = windy
    ? [d('planb', '08:15', '12:30', 'planb', ['incident'])]
    : [
        d('handover', '08:15', T.classAm[0], 'handover', ['planb'], true),
        d('class', T.classAm[0], T.classAm[1], 'handover', ['incident', 'planb'], true),
      ];
  const pmEnd = last ? '16:00' : T.classPm[1];
  return [
    d('night', '00:00', '07:00', 'duty'),
    d('breakfast', '07:00', '08:15', windy ? 'planb' : 'allergies', windy ? ['allergies'] : ['planb']),
    ...morning,
    d('lunch', T.classAm[1], windy ? '13:45' : T.classPm[0], 'allergies', [], true),
    ...(windy ? [d('handover', '13:45', T.classPm[0], 'handover', [], true)] : []),
    d('class', T.classPm[0], pmEnd, 'handover', ['incident'], true),
    ...(last
      ? [
          d('pickup', '16:00', '17:00', 'handover', [], true),
          d('departure', '17:00', '17:30', 'diary', ['incident']),
          d('post', '17:30', '24:00', 'diary', ['postcard']),
        ]
      : [
          d('pickup', '17:00', '17:45', 'handover', [], true),
          d('free', '17:45', T.dinner, 'bank', ['postcard']),
          d('dinner', T.dinner, '20:30', 'allergies'),
          d('evening', '20:30', '22:00', 'postcard', ['bank']),
          d('rounds', '22:00', '24:00', 'rounds', ['duty']),
        ]),
  ];
}

function arrivalDay(): Moment[] {
  const d = (kind: MomentKind, from: string, to: string, piece?: PieceId, also?: PieceId[]): Moment =>
    ({ kind, day: 0, from: m(from), to: m(to), piece, also });
  return [
    d('travel', '00:00', '16:00', 'lostcard', ['duty']),
    d('arrival', '16:00', '17:30', 'bank', ['lostcard']),
    d('fitting', '17:30', T.dinner, 'lostcard', ['bank']),
    d('dinner', T.dinner, '20:30', 'allergies'),
    d('evening', '20:30', '22:00', 'postcard', ['bank']),
    d('rounds', '22:00', '24:00', 'rounds', ['duty']),
  ];
}

export function dayMoments(day: number): Moment[] {
  if (day < 0) return [{ kind: 'pre', day, from: 0, to: 1440, piece: 'lostcard' }];
  if (day > group.nights) return [{ kind: 'post', day, from: 0, to: 1440, piece: 'diary' }];
  if (day === 0) return arrivalDay();
  return skiDay(day, day === group.nights);
}

export function momentAt(t: StayTime): Moment {
  const list = dayMoments(t.day);
  return list.find((x) => t.min >= x.from && t.min < x.to) ?? list[list.length - 1];
}

export const currentMoment = computed(() => momentAt(now.value));
export const todayMoments = computed(() => dayMoments(now.value.day));
