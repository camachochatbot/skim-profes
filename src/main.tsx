import { render } from 'preact';
import './styles/app.css';
import './core/theme';
import { loadJournal } from './core/journal';
import { App } from './app';

// Pedimos al navegador que no borre los datos del grupo aunque falte espacio.
navigator.storage?.persist?.();

loadJournal().finally(() => render(<App />, document.getElementById('app')!));
