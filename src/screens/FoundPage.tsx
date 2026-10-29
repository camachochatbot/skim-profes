// Lo que ve el adulto (pistero, taquillero…) al escanear la tarjeta con su móvil.
// No muestra datos del alumno: su móvil no los tiene.
import { useState } from 'preact/hooks';
import { Phone, MapPin, Check } from 'lucide-preact';
import { group } from '../core/group';

export function FoundPage({ token }: { token: string }) {
  const [sent, setSent] = useState<'idle' | 'ok' | 'no'>('idle');
  function share() {
    // CONEXIÓN REAL: enviar { token, lat, lng } al servidor de Skim, que avisa al profesor.
    navigator.geolocation?.getCurrentPosition(() => setSent('ok'), () => setSent('no'), { timeout: 8000 });
  }
  return (
    <main class="found">
      <p class="found-kicker">SKIM Incoming · {group.school}</p>
      <h1>Gracias por ayudar.</h1>
      <p class="found-ca">Gràcies per ajudar. · Thank you for helping.</p>
      <p>Este alumno forma parte de un grupo escolar. Por favor, quédese con él y llame:</p>
      <a class="btn-filled btn-xl" href={`tel:${group.skimPhone.replace(/\s/g, '')}`}><Phone size={24} /> {group.skimPhone}</a>
      <p class="footnote center">Teléfono 24 h · Telèfon 24 h</p>
      <button class="btn-tinted btn-xl" onClick={share} disabled={sent === 'ok'}>
        {sent === 'ok' ? <><Check size={22} /> Ubicación enviada al profesor</> : <><MapPin size={22} /> Enviar mi ubicación al profesor</>}
      </button>
      {sent === 'no' && <p class="footnote center">No se pudo obtener la ubicación. Llame al teléfono, por favor.</p>}
      <p class="footnote center">Código {token} · Prototipo: aún no avisa de verdad.</p>
    </main>
  );
}
