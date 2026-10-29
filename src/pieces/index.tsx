// Registro de piezas: cada una se pinta dentro de PieceShell.
import type { ComponentType } from 'preact';
import type { PieceId } from '../core/schedule';
import { Handover } from './Handover';
import { Allergies } from './Allergies';
import { Incidents } from './Incidents';
import { PlanB } from './PlanB';
import { LostCard } from './LostCard';

export const PIECE_VIEW: Partial<Record<PieceId, ComponentType>> = {
  handover: Handover,
  allergies: Allergies,
  incident: Incidents,
  planb: PlanB,
  lostcard: LostCard,
};
