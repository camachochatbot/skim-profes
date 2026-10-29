// 5 · Plan B con un toque. Si no se puede esquiar, la app ofrece bolera,
// piscina o discoteca con su precio y se las PIDE a Skim por WhatsApp.
// Es una petición, no una compra: Skim confirma antes de que cueste nada.
import { useState } from 'preact/hooks';
import { Wind, Sun, Clock, Users, Minus, Plus, MessageCircle, CheckCircle2, Hourglass } from 'lucide-preact';
import { group } from '../core/group';
import { now, dateOf } from '../core/clock';
import { log, list, fmtMoney, online } from '../core/act';
import { L, weekday } from '../core/i18n';
import { ACTIVITIES, type Activity } from '../data/activities';
import { MiniMap } from '../components/MiniMap';
import { Sheet } from '../components/Sheet';
import { Segmented } from '../components/Segmented';

interface Req { activity: Activity['id']; slot: string; pax: number; total: number }

export function PlanB() {
  const [pick, setPick] = useState<Activity | null>(null);
  const day = Math.max(0, Math.min(group.nights, now.value.day));
  const w = group.weather[day];
  const bad = w.wind >= 70;
  const reqs = list<Req>('planb.request').slice().reverse();
  const confirmed = new Set(list<{ request: string }>('planb.confirmed').map((f) => f.data.request));

  return (
    <>
      <div class={`weather-card ${bad ? 'is-bad' : ''}`}>
        {bad ? <Wind size={34} /> : <Sun size={34} />}
        <div>
          <b>{bad ? L('Telecabina cerrada por viento', 'Gondola closed: wind') : L('Pistas abiertas', 'Slopes open')}</b>
          <span>{L('Viento en la Tosa', 'Wind on the Tosa')} {w.wind} km/h · {w.tMin}° / {w.tMax}°</span>
        </div>
      </div>
      <p class="footnote">{L(
        'Elige una actividad. Le llega a Skim por WhatsApp como petición; no cuesta nada hasta que Skim la confirme.',
        'Pick an activity. Skim gets it on WhatsApp as a request; nothing is charged until Skim confirms.')}</p>

      <ul class="group-list" style={{ marginTop: '14px' }}>
        {ACTIVITIES.map((a) => (
          <li>
            <button class="row row-tall" onClick={() => setPick(a)}>
              <span class="row-main">
                <span class="row-title">{L(...a.name)}</span>
                <span class="row-sub">{L(...a.blurb)}</span>
              </span>
              <span class="price">{fmtMoney(a.price)}<small>/{L('pers.', 'pp')}</small></span>
            </button>
          </li>
        ))}
      </ul>
      <p class="footnote">{L('Precios y horarios provisionales del prototipo.', 'Prices and times are provisional (prototype).')}</p>

      {reqs.length > 0 && (
        <>
          <h3 class="section-head">{L('Peticiones a Skim', 'Requests to Skim')}</h3>
          <ul class="group-list">
            {reqs.map((r) => {
              const a = ACTIVITIES.find((x) => x.id === r.data.activity)!;
              const ok = confirmed.has(r.id);
              return (
                <li>
                  <div class="row row-tall">
                    {ok ? <CheckCircle2 size={28} class="ok-icon" /> : <Hourglass size={28} class="wait-icon" />}
                    <span class="row-main">
                      <span class="row-title">{L(...a.name)} · {r.data.slot}</span>
                      <span class="row-sub">{weekday(dateOf(r.data.day), true)} · {r.data.pax} pax · {fmtMoney(r.data.total)}</span>
                    </span>
                    {ok ? <span class="pill pill-green">{L('Confirmada', 'Confirmed')}</span> : (
                      // PROTOTIPO: en la versión real la confirmación la manda Skim.
                      <button class="pill pill-orange" onClick={() => log('planb.confirmed', { request: r.id })}>{L('Simular OK', 'Simulate OK')}</button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {pick && <RequestSheet a={pick} onClose={() => setPick(null)} />}
    </>
  );
}

function RequestSheet({ a, onClose }: { a: Activity; onClose: () => void }) {
  const all = group.students.length + group.teachers.length;
  const [pax, setPax] = useState(all);
  const [slot, setSlot] = useState(a.slots[0]);
  const total = pax * a.price;
  const d = dateOf(Math.max(0, now.value.day));

  async function send() {
    await log<Req>('planb.request', { activity: a.id, slot, pax, total });
    // CONEXIÓN REAL: además del WhatsApp, la petición llegará al sistema de Skim.
    const msg = `Hola Skim 👋 Plan B para ${group.school} (${group.hotel.name}).\n` +
      `Pedimos: ${a.name[0]} el ${weekday(d)} ${d.getUTCDate()} a las ${slot}.\n` +
      `${pax} personas · ${fmtMoney(a.price)}/pers. (total aprox. ${fmtMoney(total)}).\n` +
      `Es una petición: ¿nos confirmáis? Gracias. — enviado desde la app SKIM Profes`;
    window.open(`https://wa.me/${group.skimWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  }

  return (
    <Sheet title={L(...a.name)} onClose={onClose}>
      <MiniMap focus={a.place} show={['meet']} />
      <h3 class="section-head"><Clock size={13} /> {L('Hora', 'Time')} · {a.duration} min</h3>
      <Segmented value={slot} onChange={setSlot} options={a.slots.map((s) => ({ v: s, label: s }))} />
      <h3 class="section-head"><Users size={13} /> {L('Personas', 'People')}</h3>
      <div class="stepper">
        <button class="icon-round" onClick={() => setPax(Math.max(1, pax - 1))} aria-label="-"><Minus size={24} /></button>
        <b class="tnum">{pax}</b>
        <button class="icon-round" onClick={() => setPax(pax + 1)} aria-label="+"><Plus size={24} /></button>
      </div>
      <p class="footnote center">{group.students.length} {L('alumnos', 'pupils')} + {group.teachers.length} {L('profesores', 'teachers')} = {all}</p>
      <div class="total-row"><span>{L('Total aproximado', 'Approx. total')}</span><b>{fmtMoney(total)}</b></div>
      <button class="btn-filled btn-xl btn-whatsapp" onClick={send}><MessageCircle size={24} /> {L('Pedir a Skim por WhatsApp', 'Ask Skim on WhatsApp')}</button>
      <p class="footnote center">{online.value
        ? L('No es una compra. Skim te confirma antes de que cueste nada.', 'Not a purchase. Skim confirms before anything is charged.')
        : L('Sin red: WhatsApp lo enviará al volver la señal.', 'Offline: WhatsApp will send it when signal returns.')}</p>
    </Sheet>
  );
}
