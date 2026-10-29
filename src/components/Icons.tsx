// Iconos de trazo grueso: se leen con sol y con guantes.
const S = { fill: 'none', stroke: 'currentColor', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } as const;

export const IconMic = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" {...S}>
    <rect x="8.5" y="2.5" width="7" height="12" rx="3.5" />
    <path d="M5 11.5a7 7 0 0 0 14 0M12 18.5v3" />
  </svg>
);
export const IconGrid = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...S}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </svg>
);
export const IconGear = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...S}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
  </svg>
);
export const IconBack = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...S}><path d="M15 4.5 7.5 12l7.5 7.5" /></svg>
);
export const IconArrow = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" {...S}><path d="M4 12h15M13 5.5 19.5 12 13 18.5" /></svg>
);
export const IconClock = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...S}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const IconClose = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...S}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
