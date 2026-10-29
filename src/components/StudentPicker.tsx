// Buscador de alumnos con dedo gordo: escribe 1-2 letras o toca la inicial.
import { useState } from 'preact/hooks';
import { Check, Search } from 'lucide-preact';
import { group } from '../core/group';
import { L } from '../core/i18n';

export function StudentPicker({ selected, onToggle, multi = true }: {
  selected: string[]; onToggle: (id: string) => void; multi?: boolean;
}) {
  const [q, setQ] = useState('');
  const letters = [...new Set(group.students.map((s) => s.first[0]))].sort();
  const norm = (x: string) => x.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  const found = group.students
    .filter((s) => !q || norm(`${s.first} ${s.last}`).split(' ').some((w) => w.startsWith(norm(q))) || norm(s.first).startsWith(norm(q)))
    .sort((a, b) => a.first.localeCompare(b.first));
  return (
    <div class="picker">
      <label class="search">
        <Search size={20} />
        <input value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} placeholder={L('Buscar alumno', 'Find pupil')} />
      </label>
      {!q && (
        <div class="letters">
          {letters.map((c) => <button onClick={() => setQ(c)}>{c}</button>)}
        </div>
      )}
      {q && (
        <ul class="group-list picker-list">
          {found.slice(0, 30).map((s) => {
            const on = selected.includes(s.id);
            return (
              <li>
                <button class="row" onClick={() => { onToggle(s.id); if (!multi) setQ(''); }}>
                  <span class="row-main"><span class="row-title">{s.first} {s.last}</span><span class="row-sub">{L('Hab.', 'Room')} {s.room}</span></span>
                  {on && <Check size={22} strokeWidth={2.6} class="tint" />}
                </button>
              </li>
            );
          })}
          {!found.length && <li><p class="footnote" style={{ padding: '12px 0' }}>{L('Nadie con ese nombre', 'No one by that name')}</p></li>}
        </ul>
      )}
    </div>
  );
}
