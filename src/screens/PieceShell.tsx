// Marco común de cada pieza: cabecera con "volver" grande y título.
import type { ComponentChildren } from 'preact';
import { go } from '../core/nav';
import { t, tPiece } from '../core/i18n';
import type { PieceId } from '../core/schedule';
import { IconBack } from '../components/Icons';

export function PieceShell({ id, children }: { id: PieceId; children?: ComponentChildren }) {
  return (
    <main class="piece">
      <button class="back" onClick={() => go(null)}>
        <IconBack /> <span>{t('back')}</span>
      </button>
      <h1 class="cond scratched piece-title">{tPiece(id)}</h1>
      {children ?? <p class="hint">{t('soon')}</p>}
    </main>
  );
}
