// Sitios del mapa. Coordenadas y nombres APROXIMADOS / PROVISIONALES:
// confirmar con Skim antes de usarlos de verdad. x/y son posiciones en el
// plano dibujado (400×260), no coordenadas reales.
export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  kind: 'hotel' | 'meet' | 'lift' | 'activity' | 'parking';
  /** dónde va el rótulo respecto al punto (por defecto, encima) */
  label?: 'below' | 'right';
}

export const PLACES: Record<string, Place> = {
  hotel: { id: 'hotel', name: 'Hotel La Collada', lat: 42.3415, lng: 1.9358, x: 70, y: 200, kind: 'hotel' },
  meet: { id: 'meet', name: 'Punto de encuentro Descens', lat: 42.3368, lng: 1.9418, x: 222, y: 128, kind: 'meet' },
  lift: { id: 'lift', name: 'Telecabina Alp 2500', lat: 42.3357, lng: 1.9432, x: 268, y: 98, kind: 'lift', label: 'right' },
  parking: { id: 'parking', name: 'Parking Alabaus', lat: 42.3375, lng: 1.9405, x: 190, y: 160, kind: 'parking', label: 'below' },
  bowling: { id: 'bowling', name: 'Bolera', lat: 42.3398, lng: 1.9380, x: 128, y: 176, kind: 'activity' },
  pool: { id: 'pool', name: 'Piscina climatizada', lat: 42.3389, lng: 1.9392, x: 156, y: 214, kind: 'activity', label: 'below' },
  disco: { id: 'disco', name: 'Discoteca', lat: 42.3402, lng: 1.9366, x: 100, y: 150, kind: 'activity' },
};

export function mapsUrl(p: Place) {
  const ios = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
  return ios
    ? `https://maps.apple.com/?ll=${p.lat},${p.lng}&q=${encodeURIComponent(p.name)}`
    : `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
}
