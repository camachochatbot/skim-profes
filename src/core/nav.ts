// Navegación mínima: la pantalla Ahora o una pieza abierta encima.
import { signal } from '@preact/signals';
import type { PieceId } from './schedule';

export type Sheet = null | 'all' | 'settings' | 'sim';

export const openPiece = signal<PieceId | null>(null);
export const sheet = signal<Sheet>(null);

export function go(p: PieceId | null) {
  sheet.value = null;
  openPiece.value = p;
  window.scrollTo({ top: 0 });
}
