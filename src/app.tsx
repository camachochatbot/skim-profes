import { h } from 'preact';
import { openPiece, sheet, tab } from './core/nav';
import { TabBar } from './components/TabBar';
import { MicButton } from './components/MicButton';
import { SimSheet } from './components/SimSheet';
import { SettingsSheet } from './components/SettingsSheet';
import { Ahora } from './screens/Ahora';
import { TabList } from './screens/TabList';
import { PieceShell } from './screens/PieceShell';
import { PIECE_VIEW } from './pieces';

export function App() {
  const p = openPiece.value;
  const x = tab.value;
  return (
    <>
      {p ? <PieceShell id={p}>{PIECE_VIEW[p] && h(PIECE_VIEW[p]!, {})}</PieceShell> : x === 'now' ? <Ahora /> : <TabList id={x} />}
      {p !== 'incident' && <MicButton />}
      <TabBar />
      {sheet.value === 'sim' && <SimSheet />}
      {sheet.value === 'settings' && <SettingsSheet />}
    </>
  );
}
