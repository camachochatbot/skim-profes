// 6 · El banco del profe. Los alumnos dejan su dinero de bolsillo al profesor;
// la app lleva el saldo de cada uno. Solo es un REGISTRO: no mueve dinero.
import { useState } from 'preact/hooks';
import { ChevronRight, Info } from 'lucide-preact';
import { group, studentById, teacherById } from '../core/group';
import { hhmm, dateOf } from '../core/clock';
import { log, list, fmtMoney } from '../core/act';
import { L, weekday } from '../core/i18n';
import type { Student } from '../core/model';
import { Sheet } from '../components/Sheet';
import { Segmented } from '../components/Segmented';
import { Keypad, parseEuros } from '../components/Keypad';

interface Move { student: string; amount: number; concept: string }
const LOW = 5;
const CONCEPTS: [string, string][] = [['Tienda', 'Shop'], ['Comida', 'Snack'], ['Recuerdo', 'Souvenir'], ['Actividad', 'Activity'], ['Otro', 'Other']];

const moves = () => list<Move>('bank.move');
export function balance(s: Student) {
  // El saldo inicial es lo que la familia entregó al llegar (viene en el Excel).
  return s.pocketMoney + moves().filter((m) => m.data.student === s.id).reduce((a, m) => a + m.data.amount, 0);
}

export function Bank() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<Student | null>(null);
  const all = group.students;
  const total = all.reduce((a, s) => a + balance(s), 0);
  const low = all.filter((s) => balance(s) < LOW);
  const shown = all
    .filter((s) => !q || `${s.first} ${s.last}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.first.localeCompare(b.first));

  return (
    <>
      <div class="stat-row two">
        <div class="stat"><b>{fmtMoney(total)}</b><span>{L('en tu sobre', 'in your envelope')}</span></div>
        <div class="stat"><b class={low.length ? 'warn' : ''}>{low.length}</b><span>{L(`con menos de ${LOW} €`, `under €${LOW}`)}</span></div>
      </div>
      <label class="search" style={{ marginTop: '16px' }}>
        <input value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} placeholder={L('Buscar alumno', 'Find pupil')} />
      </label>
      <ul class="group-list" style={{ marginTop: '12px' }}>
        {shown.map((s) => {
          const b = balance(s);
          return (
            <li>
              <button class="row" onClick={() => setOpen(s)}>
                <span class="row-main"><span class="row-title">{s.first} {s.last}</span></span>
                <span class={`money ${b < LOW ? 'low' : ''}`}>{fmtMoney(b)}</span>
                <ChevronRight size={20} class="chev" />
              </button>
            </li>
          );
        })}
      </ul>
      <p class="footnote with-icon"><Info size={16} /> {L('Solo es un registro: la app no mueve dinero real.', 'Record only: the app never moves real money.')}</p>
      {open && <MoveSheet s={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function MoveSheet({ s, onClose }: { s: Student; onClose: () => void }) {
  const [kind, setKind] = useState<'spend' | 'add'>('spend');
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState(0);
  const hist = moves().filter((m) => m.data.student === s.id).slice().reverse();
  const b = balance(s);
  const n = parseEuros(amount);
  const over = kind === 'spend' && n > b;

  async function save() {
    if (!n) return;
    await log<Move>('bank.move', { student: s.id, amount: kind === 'spend' ? -n : n, concept: kind === 'spend' ? CONCEPTS[concept][0] : 'Entrega' });
    setAmount('');
  }

  return (
    <Sheet title={`${s.first} ${s.last}`} onClose={onClose}>
      <p class="big-balance"><span>{L('Le quedan', 'Balance')}</span><b class={b < LOW ? 'low' : ''}>{fmtMoney(b)}</b></p>
      <Segmented value={kind} onChange={setKind} options={[{ v: 'spend', label: L('Gasta', 'Spends') }, { v: 'add', label: L('Entrega', 'Hands in') }]} />
      <p class={`amount-display ${kind}`}>{kind === 'spend' ? '−' : '+'} {amount || '0'} €</p>
      {kind === 'spend' && (
        <div class="chips-row center-row">
          {CONCEPTS.map((c, i) => <button class={`choice-chip ${concept === i ? 'is-on' : ''}`} onClick={() => setConcept(i)}>{L(...c)}</button>)}
        </div>
      )}
      <Keypad value={amount} onChange={setAmount} />
      {over && <p class="footnote center warn-text">{L('Gasta más de lo que tiene. Se apuntará en negativo.', 'More than the balance. It will go negative.')}</p>}
      <button class="btn-filled btn-xl" disabled={!n} onClick={save}>{kind === 'spend' ? L('Apuntar gasto', 'Log spend') : L('Apuntar entrega', 'Log hand-in')}</button>
      <h3 class="section-head">{L('Movimientos', 'History')}</h3>
      <ul class="group-list">
        {hist.map((m) => (
          <li><div class="row">
            <span class="row-main"><span class="row-title">{m.data.concept === 'Entrega' ? L('Entrega', 'Hand-in') : m.data.concept}</span>
              <span class="row-sub">{weekday(dateOf(m.data.day), true)} {hhmm(m.data.min)} · {teacherById.get(m.author)?.short}</span></span>
            <span class={`money ${m.data.amount < 0 ? 'neg' : 'pos'}`}>{m.data.amount > 0 ? '+' : '−'}{fmtMoney(Math.abs(m.data.amount))}</span>
          </div></li>
        ))}
        <li><div class="row">
          <span class="row-main"><span class="row-title">{L('Al llegar (familia)', 'On arrival (family)')}</span></span>
          <span class="money pos">+{fmtMoney(studentById.get(s.id)!.pocketMoney)}</span>
        </div></li>
      </ul>
    </Sheet>
  );
}
