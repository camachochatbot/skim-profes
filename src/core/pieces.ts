// Cada pieza con su icono y su color, como los iconos de Ajustes en iOS,
// y la pestaña donde vive.
import type { ComponentType } from 'preact';
import {
  Users, IdCard, WheatOff, Mic, Wind, PiggyBank, DoorClosed, ImagePlus, BookOpen,
  Coffee, CableCar, Utensils, UtensilsCrossed, ShoppingBag, Moon, BedDouble, Bus, Hotel,
  HardHat, CalendarClock, Sparkles,
} from 'lucide-preact';
import type { MomentKind, PieceId } from './schedule';

type Icon = ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;

export type TabId = 'now' | 'pupils' | 'night' | 'trip';

export const PIECE_META: Record<PieceId, { icon: Icon; color: string; tab: TabId }> = {
  handover: { icon: Users, color: '#0a84ff', tab: 'pupils' },
  allergies: { icon: WheatOff, color: '#ff453a', tab: 'pupils' },
  bank: { icon: PiggyBank, color: '#30b158', tab: 'pupils' },
  lostcard: { icon: IdCard, color: '#ff9f0a', tab: 'pupils' },
  rounds: { icon: DoorClosed, color: '#5e5ce6', tab: 'night' },
  incident: { icon: Mic, color: '#ff375f', tab: 'night' },
  planb: { icon: Wind, color: '#32ade6', tab: 'trip' },
  postcard: { icon: ImagePlus, color: '#ff6a33', tab: 'trip' },
  diary: { icon: BookOpen, color: '#a05cf0', tab: 'trip' },
};

export const MOMENT_ICON: Record<MomentKind, Icon> = {
  pre: CalendarClock,
  travel: Bus,
  arrival: Hotel,
  fitting: HardHat,
  night: BedDouble,
  breakfast: Coffee,
  handover: Users,
  class: CableCar,
  lunch: Utensils,
  pickup: Users,
  free: ShoppingBag,
  dinner: UtensilsCrossed,
  evening: Moon,
  rounds: DoorClosed,
  planb: Wind,
  departure: Bus,
  post: Sparkles,
};

export const TAB_PIECES: Record<Exclude<TabId, 'now'>, PieceId[]> = {
  pupils: ['handover', 'allergies', 'bank', 'lostcard'],
  night: ['rounds', 'incident'],
  trip: ['planb', 'postcard', 'diary'],
};
