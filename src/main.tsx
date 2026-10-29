import { render } from 'preact';
import '@fontsource-variable/archivo/wdth.css';
import './estilo/estilo-skim.css'; // estilo del cuadro de mandos, tal cual
import './styles/app.css'; // adaptación a móvil en la nieve
import './core/theme';
import { loadJournal } from './core/journal';
import { App } from './app';

// Pedimos al navegador que no borre los datos del grupo aunque falte espacio.
navigator.storage?.persist?.();

loadJournal().finally(() => render(<App />, document.getElementById('app')!));
