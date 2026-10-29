// 2 · Tarjeta "me he perdido".
// Va detrás del forfait. Cara del alumno en inglés; cara del adulto en
// castellano y catalán, con el teléfono 24 h de Skim SIEMPRE impreso
// (el escaneo es un extra, no la única vía). Solo nombre de pila.
import { useState } from 'preact/hooks';
import qrcode from 'qrcode-generator';
import { Printer, ScanLine, Phone, Info } from 'lucide-preact';
import { group, studentById } from '../core/group';
import { hhmm, dateOf } from '../core/clock';
import { log, list } from '../core/act';
import { L, weekday } from '../core/i18n';
import { cardUrl, type LostAlert } from '../core/lost';
import { PLACES } from '../data/places';
import type { Student } from '../core/model';

function Qr({ text }: { text: string }) {
  const q = qrcode(0, 'M');
  q.addData(text);
  q.make();
  return <span class="qr" dangerouslySetInnerHTML={{ __html: q.createSvgTag({ cellSize: 3, margin: 0, scalable: true }) }} />;
}

export function CardFront({ s }: { s: Student }) {
  return (
    <div class="lostcard front">
      <p class="lc-kicker">SKIM · {group.school}</p>
      <p class="lc-big">If you get lost, show this card to any adult.</p>
      <p class="lc-name">{s.first}</p>
      <p class="lc-small">Stay where you are. Someone will help you.</p>
    </div>
  );
}

export function CardBack({ s }: { s: Student }) {
  return (
    <div class="lostcard back">
      <div class="lc-text">
        <p class="lc-big">Este alumno se ha perdido.<br /><span>Aquest alumne s'ha perdut.</span></p>
        <p class="lc-call">Llame / Truqui · 24 h<br /><b>{group.skimPhone}</b></p>
        <p class="lc-small">O escanee el código · O escanegi el codi<br />{s.first} · {group.school}</p>
      </div>
      <Qr text={cardUrl(s.id)} />
    </div>
  );
}

export function LostCard() {
  const [print, setPrint] = useState(false);
  const alerts = list<LostAlert>('lost.alert').slice().reverse();
  const sample = group.students[0];

  function simulate() {
    // PROTOTIPO: simula que un pistero escanea la tarjeta de un alumno en la telecabina.
    // CONEXIÓN REAL: el móvil del pistero abre cardUrl(), comparte su ubicación con
    // el servidor de Skim y este manda un aviso (notificación push) al profesor.
    const s = group.students[Math.floor(Math.random() * group.students.length)];
    const p = PLACES.lift;
    log<LostAlert>('lost.alert', { student: s.id, place: p.id, lat: p.lat, lng: p.lng });
  }

  return (
    <>
      <div class="card-preview">
        <CardFront s={sample} />
        <CardBack s={sample} />
      </div>
      <button class="btn-filled btn-xl" onClick={() => setPrint(true)}><Printer size={22} /> {L(`Imprimir las ${group.students.length} tarjetas`, `Print all ${group.students.length} cards`)}</button>
      <p class="footnote with-icon"><Info size={16} /> {L(
        'Lo que de verdad funciona siempre es el teléfono impreso. El escaneo depende de que el personal de La Molina conozca la tarjeta y tenga cobertura: es un extra.',
        'What always works is the printed phone number. Scanning depends on La Molina staff knowing the card and having signal: it is a bonus.')}</p>

      <h3 class="section-head">{L('Avisos recibidos', 'Alerts received')}</h3>
      <ul class="group-list">
        {alerts.length === 0 && <li><div class="row"><span class="row-sub">{L('Ninguno. Bien.', 'None. Good.')}</span></div></li>}
        {alerts.map((a) => (
          <li><div class="row">
            <ScanLine size={24} class="tint" />
            <span class="row-main">
              <span class="row-title">{studentById.get(a.data.student)?.first}</span>
              <span class="row-sub">{PLACES[a.data.place]?.name} · {weekday(dateOf(a.data.day), true)} {hhmm(a.data.min)}</span>
            </span>
          </div></li>
        ))}
      </ul>
      <button class="btn-tinted" style={{ marginTop: '14px' }} onClick={simulate}><ScanLine size={20} /> {L('Simular un escaneo (prototipo)', 'Simulate a scan (prototype)')}</button>
      <a class="btn-tinted" style={{ marginTop: '10px' }} href={`tel:${group.skimPhone.replace(/\s/g, '')}`}><Phone size={20} /> {L('Llamar a Skim 24 h', 'Call Skim 24 h')}</a>
      {print && <PrintSheet onClose={() => setPrint(false)} />}
    </>
  );
}

/** Hoja para imprimir: anverso y reverso de cada alumno, tamaño tarjeta (85 × 54 mm). */
function PrintSheet({ onClose }: { onClose: () => void }) {
  return (
    <div class="fullscreen print-view">
      <div class="print-bar no-print">
        <button class="link-btn" onClick={onClose}>{L('Cerrar', 'Close')}</button>
        <b>{group.students.length * 2} {L('caras', 'sides')}</b>
        <button class="link-btn" onClick={() => window.print()}>{L('Imprimir', 'Print')}</button>
      </div>
      <p class="footnote no-print">{L('Recorta cada pareja, dóblala por la mitad y plastifícala. Va detrás del forfait.', 'Cut each pair, fold it and laminate it. It goes behind the lift pass.')}</p>
      <div class="print-grid">
        {group.students.map((s) => (
          <div class="print-pair"><CardFront s={s} /><CardBack s={s} /></div>
        ))}
      </div>
    </div>
  );
}
