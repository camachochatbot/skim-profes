// Tema: automático (claro de alto contraste en pistas, oscuro en el hotel) o fijo.
import { computed, effect } from '@preact/signals';
import { themePref, lang } from './settings';
import { currentMoment } from './schedule';

export const theme = computed<'dark' | 'light'>(() =>
  themePref.value === 'auto' ? (currentMoment.value.onSnow ? 'light' : 'dark') : themePref.value,
);

effect(() => {
  const el = document.documentElement;
  el.dataset.theme = theme.value;
  el.lang = lang.value;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.value === 'dark' ? '#0a0c24' : '#f2f2f7');
});
