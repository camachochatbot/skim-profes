// Navegación: pestañas abajo y una pieza abierta encima (como un push de iOS).
import { signal } from '@preact/signals';
import type { PieceId } from './schedule';
import type { TabId } from './pieces';

export type Sheet = null | 'settings' | 'sim';

export const tab = signal<TabId>('now');
export const openPiece = signal<PieceId | null>(null);
export const sheet = signal<Sheet>(null);

export function go(p: PieceId | null) {
  sheet.value = null;
  openPiece.value = p;
  window.scrollTo({ top: 0 });
}

export function goTab(x: TabId) {
  openPiece.value = null;
  tab.value = x;
  window.scrollTo({ top: 0 });
}
