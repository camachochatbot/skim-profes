// Preferencias de este móvil (idioma, tema, quién soy). No son datos del grupo.
import { signal, effect } from '@preact/signals';

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
}
function persist<T>(key: string, s: { value: T }) {
  effect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(s.value));
    } catch { /* nada */ }
  });
}

export type Lang = 'es' | 'en';
export type ThemePref = 'auto' | 'dark' | 'light';

const browserLang: Lang = typeof navigator !== 'undefined' && navigator.language?.startsWith('es') ? 'es' : 'en';

export const lang = signal<Lang>(load('skim.lang', browserLang));
export const themePref = signal<ThemePref>(load('skim.theme', 'auto'));
export const me = signal<string>(load('skim.me', 't1'));

persist('skim.lang', lang);
persist('skim.theme', themePref);
persist('skim.me', me);
