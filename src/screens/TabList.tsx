// Pestañas Alumnos, Noche y Viaje: lista agrupada de sus piezas.
import { ChevronRight } from 'lucide-preact';
import { PIECE_META, TAB_PIECES } from '../core/pieces';
import { go } from '../core/nav';
import { t, tPiece } from '../core/i18n';
import { AppIcon } from '../components/Icons';
import { NavHeader } from '../components/NavHeader';

export function TabList({ id }: { id: keyof typeof TAB_PIECES }) {
  const title = t(id === 'pupils' ? 'tab.pupils' : id === 'night' ? 'tab.night' : 'tab.trip');
  return (
    <main class="screen">
      <NavHeader title={title} />
      <ul class="group-list">
        {TAB_PIECES[id].map((p) => (
          <li>
            <button class="row row-tall" onClick={() => go(p)}>
              <AppIcon icon={PIECE_META[p].icon} color={PIECE_META[p].color} size={36} />
              <span class="row-main"><span class="row-title">{tPiece(p)}</span></span>
              <ChevronRight size={20} class="chev" />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
