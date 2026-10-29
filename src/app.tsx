import { openPiece, sheet, tab } from './core/nav';
import { TabBar } from './components/TabBar';
import { MicButton } from './components/MicButton';
import { SimSheet } from './components/SimSheet';
import { SettingsSheet } from './components/SettingsSheet';
import { Ahora } from './screens/Ahora';
import { TabList } from './screens/TabList';
import { PieceShell } from './screens/PieceShell';

export function App() {
  const p = openPiece.value;
  const x = tab.value;
  return (
    <>
      {p ? <PieceShell id={p} /> : x === 'now' ? <Ahora /> : <TabList id={x} />}
      {p !== 'incident' && <MicButton />}
      <TabBar />
      {sheet.value === 'sim' && <SimSheet />}
      {sheet.value === 'settings' && <SettingsSheet />}
    </>
  );
}
