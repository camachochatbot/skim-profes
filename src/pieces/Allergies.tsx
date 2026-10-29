// 3 · Alergias en grande, para enseñarlas en el restaurante.
// La vista de restaurante va en castellano y catalán (lo lee el camarero),
// con el nombre del alérgeno en inglés pequeño para el profesor.
import { useEffect, useState } from 'preact/hooks';
import { Maximize2, ShieldCheck, X } from 'lucide-preact';
import { group } from '../core/group';
import { L } from '../core/i18n';
import { lang } from '../core/settings';
import { ALLERGENS } from '../data/allergens';

const withAllergies = () => group.students.filter((s) => s.allergies.length).sort((a, b) => a.first.localeCompare(b.first));

export function Allergies() {
  const [big, setBig] = useState(false);
  const kids = withAllergies();
  return (
    <>
      <button class="btn-filled btn-xl" onClick={() => setBig(true)}>
        <Maximize2 size={22} strokeWidth={2.4} /> {L('Enseñar en el restaurante', 'Show to the restaurant')}
      </button>
      <h3 class="section-head">{kids.length} {L('alumnos con alergias', 'pupils with allergies')}</h3>
      <ul class="group-list">
        {kids.map((s) => (
          <li>
            <div class="row row-tall">
              <span class="row-main">
                <span class="row-title">{s.first} {s.last}</span>
                <span class="row-sub">{L('Habitación', 'Room')} {s.room}</span>
              </span>
              <span class="allergen-chips">
                {s.allergies.map((a) => <span class="pill pill-red">{ALLERGENS[a][lang.value]}</span>)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p class="footnote with-icon"><ShieldCheck size={16} /> {L(
        'Datos de salud: solo en este móvil. En la versión real irán cifrados y protegidos con PIN o Face ID.',
        'Health data: only on this phone. In the real version they are encrypted and locked with PIN or Face ID.')}</p>
      {big && <RestaurantView onClose={() => setBig(false)} />}
    </>
  );
}

function RestaurantView({ onClose }: { onClose: () => void }) {
  const kids = withAllergies();
  // Mantener la pantalla encendida mientras se enseña.
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    (navigator as any).wakeLock?.request('screen').then((l: any) => (lock = l)).catch(() => {});
    return () => { lock?.release().catch(() => {}); };
  }, []);
  return (
    <div class="fullscreen restaurant" role="dialog">
      <header class="restaurant-head">
        <div>
          <p class="restaurant-kicker">{group.school} · {kids.length} alumnos</p>
          <h1>Alergias · Al·lèrgies</h1>
        </div>
        <button class="icon-round light" onClick={onClose} aria-label="Cerrar"><X size={28} /></button>
      </header>
      <ul class="restaurant-list">
        {kids.map((s) => (
          <li>
            <b class="restaurant-name">{s.first} {s.last[0]}.</b>
            <ul class="restaurant-allergens">
              {s.allergies.map((a) => (
                <li>
                  <span class="ra-es">SIN {ALLERGENS[a].es.toUpperCase()}</span>
                  <span class="ra-ca">Sense {ALLERGENS[a].ca.toLowerCase()} · <i>no {ALLERGENS[a].en.toLowerCase()}</i></span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
