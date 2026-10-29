// 9 · Postal a las familias, SOLO cuando el profesor quiera (nada automático).
// Elige una foto, la app monta una postal de La Molina con lo que hizo el grupo
// ese día y se manda con el botón de compartir del móvil (sin guardar emails).
import { useEffect, useRef, useState } from 'preact/hooks';
import { ImagePlus, Share2, AlertTriangle, Check } from 'lucide-preact';
import { group } from '../core/group';
import { now, dateOf } from '../core/clock';
import { log, list } from '../core/act';
import { L } from '../core/i18n';
import { daySummary } from '../core/story';
import { Segmented } from '../components/Segmented';

interface Sent { text: string; thumb: string }

const W = 1500, H = 1000;

/** Ilustración de La Molina por defecto, si aún no hay foto. */
function drawIllustration(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const g = c.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, '#5aa9e6'); g.addColorStop(1, '#cfe8fb');
  c.fillStyle = g; c.fillRect(x, y, w, h);
  const peak = (pts: number[][], col: string) => { c.fillStyle = col; c.beginPath(); c.moveTo(x, y + h); pts.forEach(([px, py]) => c.lineTo(x + px * w, y + py * h)); c.lineTo(x + w, y + h); c.fill(); };
  peak([[0, .55], [.22, .3], [.38, .45], [.58, .18], [.8, .4], [1, .32]], '#e9eef6');
  peak([[0, .75], [.3, .55], [.5, .68], [.75, .5], [1, .7]], '#ffffff');
  peak([[0, .9], [.4, .8], [1, .88]], '#2e3292');
}

function drawCover(c: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const r = Math.max(w / img.width, h / img.height);
  const iw = img.width * r, ih = img.height * r;
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); c.restore();
}

function wrap(c: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
  let line = '';
  for (const word of text.split(' ')) {
    const t = line ? `${line} ${word}` : word;
    if (c.measureText(t).width > maxW && line) { c.fillText(line, x, y); y += lh; line = word; } else line = t;
  }
  c.fillText(line, x, y);
}

function render(canvas: HTMLCanvasElement, img: HTMLImageElement | null, text: string, day: number) {
  const c = canvas.getContext('2d')!;
  c.fillStyle = '#fbf8f1'; c.fillRect(0, 0, W, H);
  const px = 40, pw = 860, ph = H - 80;
  if (img) drawCover(c, img, px, 40, pw, ph); else drawIllustration(c, px, 40, pw, ph);
  // Lado derecho: texto como el reverso de una postal.
  const tx = 960;
  c.fillStyle = '#1d2063';
  c.font = '700 64px -apple-system, "Helvetica Neue", Arial, sans-serif';
  c.fillText('La Molina', tx, 140);
  c.font = '500 30px -apple-system, "Helvetica Neue", Arial, sans-serif';
  c.fillStyle = '#6c6c70';
  const d = dateOf(day);
  c.fillText(`${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()} · 1.700 m`, tx, 190);
  // Matasellos.
  c.save(); c.translate(1380, 150); c.rotate(-0.25); c.strokeStyle = '#ff6a33'; c.lineWidth = 5;
  c.beginPath(); c.arc(0, 0, 70, 0, Math.PI * 2); c.stroke();
  c.font = '800 22px -apple-system, Arial'; c.fillStyle = '#ff6a33'; c.textAlign = 'center';
  c.fillText('SKIM', 0, -8); c.font = '600 16px -apple-system, Arial'; c.fillText('LA MOLINA', 0, 18); c.restore();
  c.strokeStyle = '#d9d4c7'; c.lineWidth = 2; c.beginPath(); c.moveTo(tx, 230); c.lineTo(W - 50, 230); c.stroke();
  c.fillStyle = '#1c1c1e'; c.font = '400 36px Georgia, "Times New Roman", serif';
  wrap(c, text, tx, 300, W - tx - 60, 52);
  c.fillStyle = '#6c6c70'; c.font = '600 26px -apple-system, Arial';
  c.fillText(group.school, tx, H - 70);
}

export function Postcard() {
  const day = Math.max(0, Math.min(group.nights, now.value.day));
  const [lang, setLang] = useState<'en' | 'es'>(group.lang);
  const [text, setText] = useState(daySummary(day, group.lang, now.value.min));
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const noPhoto = group.students.filter((s) => !s.imageConsent);
  const sent = list<Sent>('postcard.sent');

  useEffect(() => { setText(daySummary(day, lang, now.value.min)); }, [lang, day]);
  useEffect(() => { if (canvas.current) render(canvas.current, img, text, day); }, [img, text, day]);

  function pick(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    const i = new Image();
    i.onload = () => { setImg(i); setChecked(false); };
    i.src = URL.createObjectURL(f);
  }

  async function share() {
    const cv = canvas.current!;
    const blob: Blob = await new Promise((r) => cv.toBlob((b) => r(b!), 'image/jpeg', 0.9));
    const file = new File([blob], `postal-la-molina-dia-${day}.jpg`, { type: 'image/jpeg' });
    const thumbCanvas = document.createElement('canvas'); thumbCanvas.width = 300; thumbCanvas.height = 200;
    thumbCanvas.getContext('2d')!.drawImage(cv, 0, 0, 300, 200);
    await log<Sent>('postcard.sent', { text, thumb: thumbCanvas.toDataURL('image/jpeg', 0.7) });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], text }); setDone(L('Postal compartida', 'Postcard shared')); } catch { /* cancelado */ }
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; a.click();
      setDone(L('Postal descargada: compártela desde Fotos.', 'Postcard downloaded: share it from Photos.'));
    }
  }

  const needsCheck = !!img;
  return (
    <>
      <canvas ref={canvas} width={W} height={H} class="postcard-canvas" />
      <label class="btn-tinted btn-xl file-btn">
        <ImagePlus size={22} /> {img ? L('Cambiar la foto', 'Change photo') : L('Elegir una foto', 'Pick a photo')}
        <input type="file" accept="image/*" onChange={pick} hidden />
      </label>
      {needsCheck && (
        <div class="consent-box">
          <p class="with-icon"><AlertTriangle size={18} /> <b>{L('Sin autorización de imagen:', 'No photo consent:')}</b></p>
          <p>{noPhoto.map((s) => `${s.first} ${s.last}`).join(', ')}</p>
          <button class={`check-row ${checked ? 'is-on' : ''}`} onClick={() => setChecked(!checked)}>
            <span class="check-box">{checked && <Check size={18} strokeWidth={3} />}</span>
            {L('He comprobado que no salen en la foto', 'I have checked they are not in the photo')}
          </button>
        </div>
      )}
      <h3 class="section-head">{L('Texto', 'Text')}</h3>
      <Segmented value={lang} onChange={setLang} options={[{ v: 'en', label: 'English' }, { v: 'es', label: 'Castellano' }]} />
      <textarea class="field" style={{ marginTop: '10px' }} rows={4} value={text} onInput={(e) => setText((e.target as HTMLTextAreaElement).value)} />
      <button class="btn-filled btn-xl" style={{ marginTop: '16px' }} disabled={needsCheck && !checked} onClick={share}>
        <Share2 size={22} /> {L('Enviar postal', 'Send postcard')}
      </button>
      <p class="footnote center">{done || L('Se abre el menú de compartir del móvil: WhatsApp de familias, email del colegio… La app no guarda emails.', 'Opens your phone\'s share menu: parents\' WhatsApp, school email… The app stores no emails.')}</p>
      {sent.length > 0 && <p class="footnote center">{L(`Postales enviadas en el viaje: ${sent.length}`, `Postcards sent this trip: ${sent.length}`)}</p>}
    </>
  );
}
