import { openPiece, sheet } from './core/nav';
import { group } from './core/group';
import { Logo } from './components/Logo';
import { SimBar } from './components/SimBar';
import { Dock } from './components/Dock';
import { SimSheet } from './components/SimSheet';
import { SettingsSheet } from './components/SettingsSheet';
import { AllSheet } from './components/AllSheet';
import { Ahora } from './screens/Ahora';
import { PieceShell } from './screens/PieceShell';
import { me } from './core/settings';
import { teacherById } from './core/group';
import { t } from './core/i18n';

export function App() {
  const p = openPiece.value;
  const who = teacherById.get(me.value);
  return (
    <>
      <header class="app-header">
        <Logo width={64} />
        <div class="app-header-group">
          <b>{group.school}</b>
          <span>{group.hotel.name}{group.provisional && <> · <i class="provisional">{t('app.provisional.short')}</i></>}</span>
        </div>
        <span class="me-chip" aria-label="Soy">{who?.short}</span>
      </header>
      <SimBar />
      {p ? <PieceShell id={p} /> : <Ahora />}
      <Dock />
      {sheet.value === 'sim' && <SimSheet />}
      {sheet.value === 'settings' && <SettingsSheet />}
      {sheet.value === 'all' && <AllSheet />}
    </>
  );
}
