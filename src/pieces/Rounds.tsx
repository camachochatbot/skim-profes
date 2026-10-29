// 8 · Ronda de habitaciones con el plano de la planta: el profesor toca cada
// puerta comprobada hasta que todas están en verde.
// PLANO INVENTADO para el prototipo (Hotel La Collada). CONEXIÓN REAL: plano y
// habitaciones del hotel, desde el Excel de Skim.
import { useState } from 'preact/hooks';
import { Check, RotateCcw, PartyPopper } from 'lucide-preact';
import { group } from '../core/group';
import { now } from '../core/clock';
import { log, list } from '../core/act';
import { L } from '../core/i18n';
import { Segmented } from '../components/Segmented';

interface RoomCheck { room: string; night: number; ok: boolean }

/** La ronda de madrugada cuenta como la noche anterior. */
export const nightOf = () => (now.value.min < 7 * 60 ? now.value.day - 1 : now.value.day);

export function roomsByFloor() {
  const rooms = [...new Set(group.students.map((s) => s.room))].sort();
  const floors: Record<string, string[]> = {};
  for (const r of rooms) (floors[r[0]] ??= []).push(r);
  return floors;
}

export function checkedRooms(night = nightOf()) {
  const state = new Map<string, boolean>();
  for (const f of list<RoomCheck>('rounds.check', (f) => f.data.night === night)) state.set(f.data.room, f.data.ok);
  return new Set([...state].filter(([, ok]) => ok).map(([r]) => r));
}

export function Rounds() {
  const floors = roomsByFloor();
  const keys = Object.keys(floors);
  const [floor, setFloor] = useState(keys[0]);
  const night = nightOf();
  const done = checkedRooms(night);
  const total = Object.values(floors).flat().length;
  const toggle = (room: string) => log<RoomCheck>('rounds.check', { room, night, ok: !done.has(room) });

  return (
    <>
      <div class="round-progress">
        <b class="tnum">{done.size}<small>/{total}</small></b>
        <span>{L('habitaciones comprobadas esta noche', 'rooms checked tonight')}</span>
        <div class="live-progress light"><span style={{ width: `${(done.size / total) * 100}%` }} /></div>
      </div>
      {done.size === total && (
        <p class="all-green"><PartyPopper size={22} /> {L('Todas en verde. Buenas noches.', 'All green. Good night.')}</p>
      )}
      <div style={{ marginTop: '16px' }}>
        <Segmented value={floor} onChange={setFloor} options={keys.map((k) => ({
          v: k, label: `${L('Planta', 'Floor')} ${k} · ${floors[k].filter((r) => done.has(r)).length}/${floors[k].length}`,
        }))} />
      </div>
      <FloorPlan rooms={floors[floor]} done={done} onTap={toggle} />
      <p class="footnote">{L('Toca cada puerta al comprobarla. Vuelve a tocar para desmarcar. Plano inventado para el prototipo.', 'Tap each door once checked. Tap again to undo. Floor plan is invented for the prototype.')}</p>
      <button class="btn-tinted" style={{ marginTop: '10px' }} onClick={() => Object.values(floors).flat().forEach((r) => done.has(r) && log<RoomCheck>('rounds.check', { room: r, night, ok: false }))}>
        <RotateCcw size={20} /> {L('Empezar la ronda de nuevo', 'Restart the round')}
      </button>
    </>
  );
}

/** Pasillo central con habitaciones a ambos lados, escalera y ascensor al fondo. */
function FloorPlan({ rooms, done, onTap }: { rooms: string[]; done: Set<string>; onTap: (r: string) => void }) {
  const top = rooms.filter((_, i) => i % 2 === 0);
  const bottom = rooms.filter((_, i) => i % 2 === 1);
  const W = 64, H = 92, X0 = 52;
  const room = (r: string, i: number, up: boolean) => {
    const ok = done.has(r);
    const x = X0 + i * (W + 4), y = up ? 8 : 8 + H + 46;
    const kids = group.students.filter((s) => s.room === r);
    return (
      <g class={`fp-room ${ok ? 'is-ok' : ''}`} onClick={() => onTap(r)} role="button" aria-label={`${r} ${ok ? 'OK' : ''}`}>
        <rect x={x} y={y} width={W} height={H} rx="6" />
        <rect class="fp-door" x={x + W / 2 - 12} y={up ? y + H - 3 : y - 1} width="24" height="4" rx="2" />
        <text x={x + W / 2} y={y + 22} class="fp-num">{r}</text>
        {ok
          ? <g transform={`translate(${x + W / 2 - 13} ${y + 36})`}><circle cx="13" cy="13" r="15" class="fp-check-bg" /><Check x={1} y={1} width={24} height={24} color="#fff" strokeWidth={3.2} /></g>
          : kids.map((k, j) => <text x={x + W / 2} y={y + 42 + j * 13} class="fp-kid">{k.first}</text>)}
      </g>
    );
  };
  const width = X0 + Math.max(top.length, bottom.length) * (W + 4) + 12;
  return (
    <div class="floorplan">
      <svg viewBox={`0 0 ${width} ${2 * H + 62}`} role="img" aria-label="Plano">
        <rect x="4" y={8 + H + 6} width={width - 8} height="34" rx="4" class="fp-corridor" />
        <text x={width / 2} y={8 + H + 28} class="fp-corridor-label">{L('PASILLO', 'CORRIDOR')}</text>
        <g class="fp-stairs"><rect x="6" y="8" width="40" height={H} rx="6" />
          {[0, 1, 2, 3, 4, 5].map((i) => <line x1="12" x2="40" y1={20 + i * 12} y2={20 + i * 12} />)}</g>
        <text x="26" y={H + 2} class="fp-small">{L('ESC.', 'STAIRS')}</text>
        <g class="fp-stairs"><rect x="6" y={8 + H + 46} width="40" height={H} rx="6" /></g>
        <text x="26" y={8 + H + 46 + H / 2} class="fp-small">{L('ASC.', 'LIFT')}</text>
        {top.map((r, i) => room(r, i, true))}
        {bottom.map((r, i) => room(r, i, false))}
      </svg>
    </div>
  );
}
