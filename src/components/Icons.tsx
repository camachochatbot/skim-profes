// Icono dentro de un cuadrado redondeado de color, como en Ajustes de iOS.
import type { ComponentType } from 'preact';

export function AppIcon({ icon: I, color, size = 30 }: { icon: ComponentType<any>; color: string; size?: number }) {
  return (
    <span class="app-icon" style={{ background: color, width: `${size}px`, height: `${size}px` }}>
      <I size={Math.round(size * 0.6)} strokeWidth={2.2} color="#fff" />
    </span>
  );
}
