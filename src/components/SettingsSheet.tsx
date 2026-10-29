import { useState } from 'preact/hooks';
import { Check } from 'lucide-preact';
import { group } from '../core/group';
import { lang, me, themePref, type ThemePref, type Lang } from '../core/settings';
import { resetJournal } from '../core/journal';
import { t } from '../core/i18n';
import { Sheet } from './Sheet';
import { Segmented } from './Segmented';

export function SettingsSheet() {
  const [wiped, setWiped] = useState(false);
  return (
    <Sheet title={t('settings.title')}>
      <h3 class="section-head">{t('settings.lang')}</h3>
      <Segmented<Lang> value={lang.value} onChange={(v) => (lang.value = v)} options={[{ v: 'es', label: 'Castellano' }, { v: 'en', label: 'English' }]} />

      <h3 class="section-head">{t('settings.theme')}</h3>
      <Segmented<ThemePref>
        value={themePref.value}
        onChange={(v) => (themePref.value = v)}
        options={[{ v: 'auto', label: t('theme.auto') }, { v: 'light', label: t('theme.light') }, { v: 'dark', label: t('theme.dark') }]}
      />
      {themePref.value === 'auto' && <p class="footnote">{t('theme.auto.hint')}</p>}

      <h3 class="section-head">{t('settings.me')}</h3>
      <ul class="group-list">
        {group.teachers.map((x) => (
          <li>
            <button class="row" onClick={() => (me.value = x.id)}>
              <span class="row-main"><span class="row-title">{x.name}</span></span>
              {me.value === x.id && <Check size={22} strokeWidth={2.6} class="tint" />}
            </button>
          </li>
        ))}
      </ul>

      <h3 class="section-head">{t('proto.badge')}</h3>
      <ul class="group-list">
        <li>
          <button class="row" onClick={async () => { await resetJournal(); setWiped(true); }}>
            <span class="row-main"><span class="row-title destructive">{wiped ? t('proto.reset.done') : t('proto.reset')}</span></span>
          </button>
        </li>
      </ul>
    </Sheet>
  );
}
