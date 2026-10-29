// Mapa pequeño dibujado por nosotros: funciona sin red. Estilo Apple Maps.
// Con cobertura, botón "Abrir en Mapas" con la ubicación real.
import { Navigation, WifiOff } from 'lucide-preact';
import { PLACES, mapsUrl, type Place } from '../data/places';
import { online } from '../core/act';
import { L } from '../core/i18n';

const ROADS = [
  'M-10 230 C 60 210, 90 205, 130 190 S 200 165, 240 150 S 330 120, 410 90',
  'M70 200 C 90 230, 140 240, 200 250',
  'M190 160 C 200 140, 215 132, 222 128',
  'M128 176 L 100 150',
];
const PISTES = [
  { d: 'M268 98 C 300 60, 330 40, 370 10', c: '#30b158' },
  { d: 'M268 98 C 250 60, 270 30, 300 -5', c: '#0a84ff' },
  { d: 'M268 98 C 330 100, 360 70, 410 50', c: '#ff453a' },
];

export function MiniMap({ focus, show = [] }: { focus: string; show?: string[] }) {
  const f = PLACES[focus];
  const pts: Place[] = [...new Set([focus, 'hotel', ...show])].map((id) => PLACES[id]);
  return (
    <figure class="minimap">
      <svg viewBox="0 0 400 260" role="img" aria-label={f.name}>
        <rect width="400" height="260" class="mm-land" />
        <path class="mm-forest" d="M0 0 H180 C150 40, 120 60, 60 70 C30 80, 10 100, 0 110 Z" />
        <path class="mm-snow" d="M230 0 H400 V140 C360 130, 320 125, 290 118 C255 110, 240 80, 230 40 Z" />
        {[0, 1, 2, 3].map((i) => (
          <path class="mm-contour" d={`M${200 + i * 30} 0 C ${210 + i * 25} ${60 + i * 10}, ${260 + i * 20} ${110 - i * 5}, 400 ${120 - i * 22}`} />
        ))}
        {PISTES.map((p) => <path d={p.d} stroke={p.c} class="mm-piste" />)}
        {ROADS.map((d) => <path d={d} class="mm-road-case" />)}
        {ROADS.map((d) => <path d={d} class="mm-road" />)}
        {pts.filter((p) => p.id !== focus).map((p) => (
          <g transform={`translate(${p.x} ${p.y})`}>
            <circle r="6" class="mm-dot" />
            <text x={p.label === 'right' ? 10 : 0} y={p.label === 'below' ? 20 : p.label === 'right' ? 18 : -11} class={`mm-label ${p.label === 'right' ? 'mm-label-start' : ''}`}>{p.name.replace('Hotel ', '')}</text>
          </g>
        ))}
        <g transform={`translate(${f.x} ${f.y})`}>
          <ellipse cy="2" rx="9" ry="3.5" class="mm-pin-shadow" />
          <path d="M0 0 C -4 -10, -14 -14, -14 -26 A 14 14 0 1 1 14 -26 C 14 -14, 4 -10, 0 0 Z" class="mm-pin" />
          <circle cy="-26" r="5.5" fill="#fff" />
          <text y="-46" class="mm-label mm-label-focus">{f.name}</text>
        </g>
      </svg>
      <figcaption>
        {online.value ? (
          <a class="btn-tinted" href={mapsUrl(f)} target="_blank" rel="noopener">
            <Navigation size={20} strokeWidth={2.4} /> {L('Abrir en Mapas', 'Open in Maps')}
          </a>
        ) : (
          <p class="footnote mm-offline"><WifiOff size={16} /> {L('Sin cobertura: el plano funciona igual.', 'No signal: the map still works.')}</p>
        )}
      </figcaption>
    </figure>
  );
}
