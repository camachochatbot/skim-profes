// La jornada dibujada como un mapa topográfico: cada momento es una curva de
// nivel con su rótulo escrito sobre la línea, como las cotas de un mapa.

function rand(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Línea ondulada suave (curva de nivel) de ancho 400. */
export function contourPath(seed: number, y = 20, amp = 7) {
  const r = rand(seed * 977 + 13);
  const a1 = amp * (0.5 + r()), a2 = amp * 0.4 * r(), p1 = r() * 6.28, p2 = r() * 6.28;
  const f1 = 1 + r() * 1.5, f2 = 3 + r() * 2;
  let d = '';
  for (let x = -10; x <= 410; x += 10) {
    const t = x / 400;
    const yy = y + a1 * Math.sin(t * 6.28 * f1 + p1) + a2 * Math.sin(t * 6.28 * f2 + p2);
    d += `${x === -10 ? 'M' : 'L'}${x} ${yy.toFixed(1)}`;
  }
  return d;
}

/** Una curva de nivel: rótulo recto (legible con sol) y la línea que sigue. */
export function ContourLine({ seed, time, title, extra, faded }: { seed: number; time: string; title: string; extra?: string; faded?: boolean }) {
  return (
    <span class={`contour ${faded ? 'is-faded' : ''}`}>
      <span class="contour-label">
        <span class="tnum">{time}</span>
        <span class="contour-what"><b>{title}</b>{extra && <em>{extra}</em>}</span>
      </span>
      <svg class="contour-line" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
        <path d={contourPath(seed, 20, 9)} vector-effect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

/** Anillos concéntricos de cima, detrás del momento actual. */
export function Summit({ seed }: { seed: number }) {
  const r = rand(seed * 31 + 7);
  const rings = Array.from({ length: 7 }, (_, i) => {
    const R = 40 + i * 34;
    let d = '';
    for (let k = 0; k <= 48; k++) {
      const a = (k / 48) * Math.PI * 2;
      const wob = 1 + 0.08 * Math.sin(a * 3 + seed + i * 0.4) + 0.05 * Math.sin(a * 5 + r() * 0.2);
      d += `${k ? 'L' : 'M'}${(330 + R * 1.25 * wob * Math.cos(a)).toFixed(1)} ${(70 + R * 0.85 * wob * Math.sin(a)).toFixed(1)}`;
    }
    return <path key={i} d={d + 'Z'} />;
  });
  return (
    <svg class="summit" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMin slice" aria-hidden="true">
      {rings}
    </svg>
  );
}
