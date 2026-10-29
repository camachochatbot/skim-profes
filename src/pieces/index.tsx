// Registro de piezas: cada una se pinta dentro de PieceShell.
import type { ComponentType } from 'preact';
import type { PieceId } from '../core/schedule';
import { Handover } from './Handover';
import { Allergies } from './Allergies';
import { Incidents } from './Incidents';

export const PIECE_VIEW: Partial<Record<PieceId, ComponentType>> = {
  handover: Handover,
  allergies: Allergies,
  incident: Incidents,
};
