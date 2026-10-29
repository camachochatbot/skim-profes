// Marco común de cada pieza: barra con "‹ Atrás" y título grande, como un push de iOS.
import type { ComponentChildren } from 'preact';
import { ChevronLeft } from 'lucide-preact';
import { go } from '../core/nav';
import { t, tPiece } from '../core/i18n';
import type { PieceId } from '../core/schedule';
import { PIECE_META } from '../core/pieces';
import { AppIcon } from '../components/Icons';

export function PieceShell({ id, children }: { id: PieceId; children?: ComponentChildren }) {
  return (
    <main class="screen">
      <div class="push-bar">
        <button class="back-btn" onClick={() => go(null)}><ChevronLeft size={30} strokeWidth={2.4} /> {t('back')}</button>
      </div>
      <header class="piece-head">
        <AppIcon icon={PIECE_META[id].icon} color={PIECE_META[id].color} size={56} />
        <h1 class="large-title">{tPiece(id)}</h1>
      </header>
      {children ?? <p class="footnote">{t('soon')}</p>}
    </main>
  );
}
