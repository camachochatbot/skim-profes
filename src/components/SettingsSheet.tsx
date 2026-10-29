import { useState } from 'preact/hooks';
import { group } from '../core/group';
import { lang, me, themePref, type ThemePref } from '../core/settings';
import { resetJournal } from '../core/journal';
import { t } from '../core/i18n';
import { Sheet } from './Sheet';

export function SettingsSheet() {
  const [wiped, setWiped] = useState(false);
  const themes: ThemePref[] = ['auto', 'dark', 'light'];
  return (
    <Sheet title={t('settings.title')}>
      <p class="wide sheet-label">{t('settings.me')}</p>
      <div class="choice-grid">
        {group.teachers.map((x) => (
          <button class={`choice ${me.value === x.id ? 'is-on' : ''}`} onClick={() => (me.value = x.id)}>{x.short}</button>
        ))}
      </div>
      <p class="wide sheet-label">{t('settings.lang')}</p>
      <div class="choice-grid two">
        <button class={`choice ${lang.value === 'es' ? 'is-on' : ''}`} onClick={() => (lang.value = 'es')}>Castellano</button>
        <button class={`choice ${lang.value === 'en' ? 'is-on' : ''}`} onClick={() => (lang.value = 'en')}>English</button>
      </div>
      <p class="wide sheet-label">{t('settings.theme')}</p>
      <div class="choice-grid three">
        {themes.map((th) => (
          <button class={`choice ${themePref.value === th ? 'is-on' : ''}`} onClick={() => (themePref.value = th)}>
            {t(`theme.${th}`)}
          </button>
        ))}
      </div>
      {themePref.value === 'auto' && <p class="hint">{t('theme.auto.hint')}</p>}
      <p class="wide sheet-label">{t('proto.badge')}</p>
      <button class="btn btn-big btn-ghost" onClick={async () => { await resetJournal(); setWiped(true); }}>
        {wiped ? t('proto.reset.done') : t('proto.reset')}
      </button>
    </Sheet>
  );
}
