// Actividades de plan B. PRECIOS Y HORARIOS INVENTADOS para el prototipo:
// los pone Skim por grupo (CONEXIÓN REAL: vendrán en el GroupPack).
export interface Activity {
  id: 'bowling' | 'pool' | 'disco';
  name: [string, string];
  place: string; // id en PLACES
  price: number; // € por persona
  duration: number; // minutos
  slots: string[];
  blurb: [string, string];
}

export const ACTIVITIES: Activity[] = [
  { id: 'bowling', name: ['Bolera', 'Bowling'], place: 'bowling', price: 9, duration: 90, slots: ['10:00', '11:30', '16:00', '18:00'],
    blurb: ['2 partidas con calzado incluido.', '2 games, shoes included.'] },
  { id: 'pool', name: ['Piscina', 'Swimming pool'], place: 'pool', price: 7, duration: 90, slots: ['10:00', '12:00', '16:30'],
    blurb: ['Piscina climatizada. Hace falta gorro.', 'Heated pool. Swim caps required.'] },
  { id: 'disco', name: ['Discoteca', 'Disco'], place: 'disco', price: 12, duration: 120, slots: ['17:00', '21:00'],
    blurb: ['Sesión sin alcohol solo para el grupo.', 'Alcohol-free session just for the group.'] },
];
