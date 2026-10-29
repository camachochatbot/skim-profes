// Titular gigante que siempre cabe en una línea: mide y reduce hasta encajar.
import { useLayoutEffect, useRef } from 'preact/hooks';

export function FitTitle({ text, max = 96, class: cls = '' }: { text: string; max?: number; class?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      let size = max;
      el.style.fontSize = `${size}px`;
      while (el.scrollWidth > el.clientWidth && size > 28) {
        size -= 2;
        el.style.fontSize = `${size}px`;
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, max]);
  return <h1 ref={ref} class={cls}>{text}</h1>;
}
