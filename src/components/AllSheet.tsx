// Las 10 piezas, numeradas como balizas de pista.
import { PIECES } from '../core/schedule';
import { currentMoment } from '../core/schedule';
import { go } from '../core/nav';
import { t, tPiece } from '../core/i18n';
import { Sheet } from './Sheet';

export function AllSheet() {
  const cur = currentMoment.value.piece;
  return (
    <Sheet title={t('all.title')}>
      <div class="all-grid">
        {PIECES.map((p, i) => (
          <button class={`all-tile ${cur === p ? 'is-now' : ''}`} onClick={() => go(p)}>
            <span class="baliza cond">{String(i + 1).padStart(2, '0')}</span>
            <span class="all-name">{tPiece(p)}</span>
          </button>
        ))}
      </div>
    </Sheet>
  );
}
