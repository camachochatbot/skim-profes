// 10 · Diario del viaje. Se genera solo: tiempo de cada día, kilómetros
// bajados entre todos (estimados por horas de clase), postales y el mejor
// momento que elija el profesor. Para la reunión de padres del curso siguiente.
// Sin incidencias ni datos de salud.
import { useState } from 'preact/hooks';
import { Printer, Star, Sun, Cloud, CloudSnow, Wind } from 'lucide-preact';
import { group } from '../core/group';
import { now, dateOf } from '../core/clock';
import { log, list } from '../core/act';
import { L, longDate } from '../core/i18n';
import { kmForDay, daySummary } from '../core/story';
import { lang } from '../core/settings';

const SKY = { sun: Sun, cloud: Cloud, snow: CloudSnow, wind: Wind };

export function Diary() {
  const today = now.value;
  const days = Array.from({ length: group.nights + 1 }, (_, d) => d);
  const lived = (d: number) => d < today.day || (d === today.day);
  const upto = (d: number) => (d < today.day ? 1440 : today.min);
  const kmTotal = days.filter(lived).reduce((a, d) => a + kmForDay(d, upto(d)), 0);
  const best = new Map(list<{ text: string; forDay: number }>('diary.best').map((f) => [f.data.forDay, f.data.text]));
  const cards = list<{ thumb: string }>('postcard.sent');
  const snow = group.weather.reduce((a, w) => a + w.snowCm, 0);
  const [edit, setEdit] = useState<number | null>(null);
  const [draft, setDraft] = useState('');

  function print() {
    document.body.dataset.print = 'diary';
    window.print();
    setTimeout(() => delete document.body.dataset.print, 500);
  }

  return (
    <>
      <div id="diary-doc">
        <div class="diary-hero">
          <p>{group.school} · La Molina · {longDate(dateOf(0))}</p>
          <b class="tnum">{kmTotal.toLocaleString(lang.value === 'es' ? 'es-ES' : 'en-GB')} km</b>
          <span>{L(`bajados entre los ${group.students.length} alumnos (estimado)`, `skied by ${group.students.length} pupils (estimate)`)}</span>
          <div class="diary-facts">
            <span><b>{group.nights}</b> {L('noches', 'nights')}</span>
            <span><b>{snow}</b> cm {L('de nieve nueva', 'fresh snow')}</span>
            <span><b>{cards.length}</b> {L('postales', 'postcards')}</span>
          </div>
        </div>

        {days.map((d) => {
          const w = group.weather[d];
          const Icon = SKY[w.sky];
          const photos = cards.filter((c) => c.data.day === d);
          return (
            <section class={`diary-day ${lived(d) ? '' : 'is-future'}`}>
              <header>
                <Icon size={26} />
                <div><b>{d === 0 ? L('Llegada', 'Arrival') : L(`Día ${d}`, `Day ${d}`)}</b><span>{longDate(dateOf(d))}</span></div>
                <span class="diary-temp">{w.tMin}° / {w.tMax}°</span>
              </header>
              {lived(d) ? (
                <>
                  <p>{daySummary(d, lang.value, upto(d))}</p>
                  {photos.length > 0 && <div class="diary-photos">{photos.map((p) => <img src={p.data.thumb} alt="" />)}</div>}
                  {edit === d ? (
                    <div class="best-edit">
                      <textarea class="field" rows={2} value={draft} onInput={(e) => setDraft((e.target as HTMLTextAreaElement).value)} placeholder={L('El mejor momento del día…', 'Best moment of the day…')} />
                      <button class="btn-filled" onClick={async () => { await log('diary.best', { text: draft.trim(), forDay: d }); setEdit(null); }}>{L('Guardar', 'Save')}</button>
                    </div>
                  ) : best.get(d) ? (
                    <button class="best" onClick={() => { setDraft(best.get(d)!); setEdit(d); }}><Star size={18} fill="currentColor" /> {best.get(d)}</button>
                  ) : (
                    <button class="link-btn no-print" onClick={() => { setDraft(''); setEdit(d); }}><Star size={16} /> {L('Añadir el mejor momento', 'Add the best moment')}</button>
                  )}
                </>
              ) : <p class="footnote">{L('Por llegar', 'Still to come')}</p>}
            </section>
          );
        })}
        <p class="footnote">{L('Kilómetros estimados por horas de clase y nivel. Sin incidencias ni datos de salud.', 'Kilometres estimated from lesson hours and level. No incidents or health data.')}</p>
      </div>
      <button class="btn-filled btn-xl no-print" style={{ marginTop: '16px' }} onClick={print}><Printer size={22} /> {L('Guardar como PDF / imprimir', 'Save as PDF / print')}</button>
    </>
  );
}
