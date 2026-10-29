// Barra de pestañas de iOS, con desenfoque. Botones más altos que los de Apple:
// se usan con guantes táctiles.
import { Clock, Users, Moon, Map } from 'lucide-preact';
import { tab, goTab } from '../core/nav';
import type { TabId } from '../core/pieces';
import { t } from '../core/i18n';

const TABS: { id: TabId; icon: typeof Clock; label: string }[] = [
  { id: 'now', icon: Clock, label: 'tab.now' },
  { id: 'pupils', icon: Users, label: 'tab.pupils' },
  { id: 'night', icon: Moon, label: 'tab.night' },
  { id: 'trip', icon: Map, label: 'tab.trip' },
];

export function TabBar() {
  return (
    <nav class="tabbar" aria-label="Pestañas">
      {TABS.map(({ id, icon: I, label }) => (
        <button class={`tab ${tab.value === id ? 'is-on' : ''}`} onClick={() => goTab(id)} aria-current={tab.value === id}>
          <I size={28} strokeWidth={tab.value === id ? 2.4 : 2} />
          <span>{t(label)}</span>
        </button>
      ))}
    </nav>
  );
}
