// 1 · Entrega a la escuela.
// Qué alumnos van con qué monitor. El profesor le pasa el móvil al monitor,
// que ve su lista y toca "Recibidos" (y por la tarde "Devueltos").
// Funciona sin red y sin dar acceso a nadie más.
import { useState } from 'preact/hooks';
import { Check, ChevronRight, X } from 'lucide-preact';
import { group } from '../core/group';
import { now, hhmm, toMin } from '../core/clock';
import { log, list } from '../core/act';
import { L } from '../core/i18n';
import type { Level, Monitor } from '../core/model';
import { MiniMap } from '../components/MiniMap';

type Kind = 'received' | 'returned';
interface H { monitor: string; session: 'am' | 'pm'; missing: string[] }

const LEVEL: Record<Level, [string, string]> = {
  beg: ['Debutantes', 'Beginners'],
  int: ['Intermedio', 'Intermediate'],
  adv: ['Avanzado', 'Advanced'],
  snb: ['Snowboard', 'Snowboard'],
};
export const levelName = (l: Level) => L(...LEVEL[l]);

export function session(): 'am' | 'pm' {
  return now.value.min < toMin(group.times.classAm[1]) ? 'am' : 'pm';
}

function status(m: Monitor, s: 'am' | 'pm') {
  const day = now.value.day;
  const find = (k: Kind) => list<H>(`handover.${k}`, (f) => f.data.day === day && f.data.session === s && f.data.monitor === m.id).at(-1);
  return { received: find('received'), returned: find('returned') };
}

export function receivedCount() {
  const s = session();
  return group.monitors.filter((m) => status(m, s).received).length;
}

export function Handover() {
  const [open, setOpen] = useState<Monitor | null>(null);
  const s = session();
  const done = receivedCount();
  const returned = group.monitors.filter((m) => status(m, s).returned).length;

  return (
    <>
      <div class="stat-row">
        <div class="stat"><b>{done}<small>/{group.monitors.length}</small></b><span>{L('recibidos', 'received')}</span></div>
        <div class="stat"><b>{returned}<small>/{group.monitors.length}</small></b><span>{L('devueltos', 'returned')}</span></div>
        <div class="stat"><b>{group.students.length}</b><span>{L('alumnos', 'pupils')}</span></div>
      </div>

      <h3 class="section-head">{L('Monitores de', 'Instructors from')} {group.school_ski} · {s === 'am' ? L('mañana', 'morning') : L('tarde', 'afternoon')}</h3>
      <ul class="group-list">
        {group.monitors.map((m) => {
          const st = status(m, s);
          const n = group.students.filter((x) => x.monitor === m.id).length;
          return (
            <li>
              <button class="row row-tall" onClick={() => setOpen(m)}>
                <span class="level-dot" style={{ background: m.color }}>{m.name[0]}</span>
                <span class="row-main">
                  <span class="row-title">{m.name}</span>
                  <span class="row-sub">{levelName(m.level)} · {n}</span>
                </span>
                {st.returned ? <span class="pill pill-gray">{L('Devuelto', 'Returned')} {hhmm(st.returned.data.min)}</span>
                  : st.received ? <span class="pill pill-green">{L('Recibido', 'Received')} {hhmm(st.received.data.min)}</span>
                  : <span class="pill pill-orange">{L('Pendiente', 'Pending')}</span>}
                <ChevronRight size={20} class="chev" />
              </button>
            </li>
          );
        })}
      </ul>

      <h3 class="section-head">{L('Punto de encuentro', 'Meeting point')} · {hhmm(toMin(group.times.classAm[0]) - 15)}</h3>
      <MiniMap focus="meet" show={['lift', 'parking']} />

      {open && <HandOff m={open} onClose={() => setOpen(null)} />}
    </>
  );
}

/** Pantalla que ve el monitor con el móvil del profesor en la mano. Siempre en castellano. */
function HandOff({ m, onClose }: { m: Monitor; onClose: () => void }) {
  const s = session();
  const st = status(m, s);
  const kids = group.students.filter((x) => x.monitor === m.id);
  const [missing, setMissing] = useState<string[]>([]);
  const kind: Kind = st.received ? 'returned' : 'received';
  const present = kids.length - missing.length;
  const finished = !!st.returned;

  async function confirm() {
    await log<H>(`handover.${kind}`, { monitor: m.id, session: s, missing });
    onClose();
  }

  return (
    <div class="fullscreen handoff" role="dialog" aria-label={m.name}>
      <header class="handoff-head" style={{ '--lv': m.color }}>
        <button class="icon-round" onClick={onClose} aria-label="Cerrar"><X size={26} /></button>
        <p class="handoff-kicker">{group.school_ski} · {levelName(m.level)}</p>
        <h1 class="large-title">Hola, {m.name}</h1>
        <p class="handoff-sub">
          {kind === 'received'
            ? 'Este es tu grupo de hoy. Toca a quien NO esté y después "Recibidos".'
            : 'Al terminar la clase: toca a quien NO esté y después "Devueltos".'}
          <br /><span class="en">{kind === 'received' ? 'Your group today. Tap anyone missing, then "Received".' : 'End of lesson: tap anyone missing, then "Returned".'}</span>
        </p>
      </header>
      <ul class="kid-grid">
        {kids.map((k) => {
          const off = missing.includes(k.id);
          return (
            <li>
              <button class={`kid ${off ? 'is-off' : ''}`} disabled={finished}
                onClick={() => setMissing(off ? missing.filter((x) => x !== k.id) : [...missing, k.id])}>
                <span class="kid-check">{off ? <X size={18} strokeWidth={3} /> : <Check size={18} strokeWidth={3} />}</span>
                <span>{k.first} {k.last[0]}.</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div class="handoff-foot">
        {finished ? (
          <button class="btn-filled btn-xl" onClick={onClose}>{L('Grupo devuelto', 'Group returned')} ✓</button>
        ) : (
          <button class={`btn-filled btn-xl ${kind === 'received' ? 'btn-green' : ''}`} onClick={confirm}>
            {kind === 'received' ? 'Recibidos' : 'Devueltos'} · {present}/{kids.length}
          </button>
        )}
      </div>
    </div>
  );
}
