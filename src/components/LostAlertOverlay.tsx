// La alerta de "me he perdido" tapa todo lo demás hasta que el profesor la resuelve.
import { Phone, Check } from 'lucide-preact';
import { openAlert } from '../core/lost';
import { group, studentById } from '../core/group';
import { now, hhmm } from '../core/clock';
import { log } from '../core/act';
import { L } from '../core/i18n';
import { MiniMap } from './MiniMap';
import { PLACES } from '../data/places';

export function LostAlertOverlay() {
  const a = openAlert.value;
  if (!a) return null;
  const s = studentById.get(a.data.student);
  const ago = Math.max(0, (now.value.day - a.data.day) * 1440 + now.value.min - a.data.min);
  return (
    <div class="fullscreen lost-alert" role="alertdialog" aria-live="assertive">
      <div class="lost-head">
        <p class="lost-kicker">{L('Tarjeta escaneada', 'Card scanned')} · {hhmm(a.data.min)} · {ago < 1 ? L('ahora mismo', 'just now') : L(`hace ${ago} min`, `${ago} min ago`)}</p>
        <h1>{s?.first} {s?.last}</h1>
        <p class="lost-where">{L('Está con un adulto en', 'Is with an adult at')} <b>{PLACES[a.data.place]?.name}</b></p>
      </div>
      <div class="lost-body">
        <MiniMap focus={a.data.place} show={['meet']} />
        <a class="btn-filled btn-xl lost-call" href={`tel:${group.skimPhone.replace(/\s/g, '')}`}><Phone size={24} /> {L('Llamar a Skim 24 h', 'Call Skim 24 h')}</a>
        <button class="btn-filled btn-xl btn-green" onClick={() => log('lost.resolved', { alert: a.id })}><Check size={26} strokeWidth={3} /> {L('Ya está conmigo', 'Back with me')}</button>
        <p class="footnote center">{L('La ubicación es la del móvil que escaneó la tarjeta.', 'Location is from the phone that scanned the card.')}</p>
      </div>
    </div>
  );
}
