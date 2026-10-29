// 4 · Incidencias dictadas con la voz ("Laura, se ha torcido la muñeca, 17:40").
// La nota de voz se graba SIEMPRE en el móvil (funciona en modo avión).
// Si hay red y el navegador sabe, se transcribe al momento; si no, queda
// "pendiente de transcribir" hasta que vuelva la señal.
import { useEffect, useRef, useState } from 'preact/hooks';
import { Mic, Square, Play, Pause, Trash2, CloudOff } from 'lucide-preact';
import { group, studentById, teacherById } from '../core/group';
import { hhmm, dateOf } from '../core/clock';
import { log, list, online } from '../core/act';
import { L, weekday } from '../core/i18n';
import { StudentPicker } from '../components/StudentPicker';
import { Sheet } from '../components/Sheet';

export interface Incident { students: string[]; kind: Kind; text: string; audio?: Blob; secs?: number; pending: boolean }
type Kind = 'injury' | 'health' | 'behaviour' | 'other';
const KINDS: Record<Kind, [string, string]> = {
  injury: ['Lesión', 'Injury'],
  health: ['Salud', 'Health'],
  behaviour: ['Conducta', 'Behaviour'],
  other: ['Otra', 'Other'],
};

const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export function Incidents() {
  const [draft, setDraft] = useState<null | { audio?: Blob; secs?: number; text: string }>(null);
  const items = list<Incident>('incident.new').slice().reverse();
  return (
    <>
      <Recorder onDone={(d) => setDraft(d)} />
      <h3 class="section-head">{L('Registro de la estancia', 'Log for the stay')} · {items.length}</h3>
      {items.length === 0 ? (
        <p class="footnote">{L('Aún no hay incidencias. Ojalá siga así.', 'No incidents yet. Long may it last.')}</p>
      ) : (
        <ul class="group-list">
          {items.map((f) => <IncidentRow f={f} />)}
        </ul>
      )}
      {draft && <IncidentForm draft={draft} onClose={() => setDraft(null)} />}
    </>
  );
}

function IncidentRow({ f }: { f: ReturnType<typeof list<Incident>>[number] }) {
  const d = f.data;
  const names = d.students.map((id) => studentById.get(id)?.first).filter(Boolean).join(', ') || L('Sin alumno', 'No pupil');
  return (
    <li>
      <div class="row row-tall incident-row">
        <span class="row-main">
          <span class="row-title">{names} <span class="pill pill-red">{L(...KINDS[d.kind])}</span></span>
          <span class="row-sub">{weekday(dateOf(d.day), true)} {hhmm(d.min)} · {teacherById.get(f.author)?.short}</span>
          {d.text ? <span class="incident-text">«{d.text}»</span>
            : <span class="incident-text muted with-icon"><CloudOff size={15} /> {L('Nota de voz · se transcribirá al volver la señal', 'Voice note · will be transcribed when signal returns')}</span>}
        </span>
        {d.audio && <PlayButton blob={d.audio} />}
      </div>
    </li>
  );
}

function PlayButton({ blob }: { blob: Blob }) {
  const [playing, setPlaying] = useState(false);
  const a = useRef<HTMLAudioElement | null>(null);
  function toggle() {
    if (!a.current) {
      a.current = new Audio(URL.createObjectURL(blob));
      a.current.onended = () => setPlaying(false);
    }
    if (playing) { a.current.pause(); setPlaying(false); } else { a.current.play(); setPlaying(true); }
  }
  return <button class="icon-round tinted" onClick={toggle} aria-label="Play">{playing ? <Pause size={22} /> : <Play size={22} />}</button>;
}

/** Botón gigante: tocar para grabar, tocar para parar. */
function Recorder({ onDone }: { onDone: (d: { audio?: Blob; secs?: number; text: string }) => void }) {
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const [secs, setSecs] = useState(0);
  const [live, setLive] = useState('');
  const [err, setErr] = useState('');
  const chunks = useRef<Blob[]>([]);
  const recog = useRef<any>(null);
  const text = useRef('');
  const secsRef = useRef(0);

  useEffect(() => {
    if (!rec) return;
    const id = setInterval(() => setSecs((s) => (secsRef.current = s + 1)), 1000);
    return () => clearInterval(id);
  }, [rec]);

  async function start() {
    setErr(''); setLive(''); text.current = ''; setSecs(0); secsRef.current = 0;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunks.current = [];
      mr.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const audio = new Blob(chunks.current, { type: mr.mimeType || 'audio/mp4' });
        onDone({ audio, secs: Math.max(1, secsRef.current), text: text.current.trim() });
      };
      mr.start();
      setRec(mr);
      // Transcripción en directo solo si hay red y el navegador la ofrece.
      if (SR && navigator.onLine) {
        const r = new SR();
        r.lang = 'es-ES'; // el profesor puede dictar en inglés: CONEXIÓN REAL → idioma del profesor
        r.continuous = true; r.interimResults = true;
        r.onresult = (e: any) => {
          text.current = Array.from(e.results).map((x: any) => x[0].transcript).join(' ');
          setLive(text.current);
        };
        r.onerror = () => {};
        try { r.start(); recog.current = r; } catch { /* sin transcripción */ }
      }
    } catch {
      setErr(L('No hay acceso al micrófono. Puedes escribirla.', 'No microphone access. You can type it instead.'));
    }
  }
  function stop() {
    recog.current?.stop?.(); recog.current = null;
    rec?.stop(); setRec(null);
  }

  return (
    <div class="recorder">
      <button class={`rec-btn ${rec ? 'is-rec' : ''}`} onClick={rec ? stop : start} aria-label={rec ? 'Stop' : 'Rec'}>
        {rec ? <Square size={44} fill="currentColor" /> : <Mic size={52} strokeWidth={2.2} />}
      </button>
      <p class="rec-label">
        {rec ? <><span class="rec-dot" /> {L('Grabando', 'Recording')} · <span class="tnum">{String(Math.floor(secs / 60))}:{String(secs % 60).padStart(2, '0')}</span></>
          : L('Toca y dilo: «Laura, se ha torcido la muñeca»', 'Tap and say: "Laura has twisted her wrist"')}
      </p>
      {rec && live && <p class="rec-live">«{live}»</p>}
      {!rec && !online.value && <p class="footnote with-icon center"><CloudOff size={15} /> {L('Sin red: se guarda la nota de voz y se transcribe luego.', 'Offline: the voice note is saved and transcribed later.')}</p>}
      {err && <p class="footnote center">{err}</p>}
      {!rec && <button class="link-btn" onClick={() => onDone({ text: '' })}>{L('Escribirla en vez de dictarla', 'Type it instead')}</button>}
    </div>
  );
}

function IncidentForm({ draft, onClose }: { draft: { audio?: Blob; secs?: number; text: string }; onClose: () => void }) {
  const [students, setStudents] = useState<string[]>([]);
  const [kind, setKind] = useState<Kind>('injury');
  const [text, setText] = useState(draft.text);
  // Si la transcripción menciona a un alumno por su nombre, se marca solo.
  useEffect(() => {
    if (!draft.text) return;
    const hit = group.students.filter((s) => new RegExp(`\\b${s.first}\\b`, 'i').test(draft.text)).map((s) => s.id);
    if (hit.length) setStudents(hit);
  }, []);
  async function save() {
    await log<Incident>('incident.new', { students, kind, text: text.trim(), audio: draft.audio, secs: draft.secs, pending: !!draft.audio && !text.trim() });
    onClose();
  }
  return (
    <Sheet title={L('Nueva incidencia', 'New incident')} onClose={onClose}
      action={<button class="link-btn" onClick={save}>{L('Guardar', 'Save')}</button>}>
      {draft.audio && <div class="voice-chip"><PlayButton blob={draft.audio} /> <span>{L('Nota de voz', 'Voice note')} · {draft.secs}s</span>
        <button class="icon-round" onClick={onClose} aria-label="Borrar"><Trash2 size={20} /></button></div>}
      <h3 class="section-head">{L('Qué ha pasado', 'What happened')}</h3>
      <textarea class="field" rows={3} value={text} onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
        placeholder={draft.audio ? L('Opcional: se transcribirá al volver la señal', 'Optional: transcribed when signal returns') : L('Escribe aquí', 'Type here')} />
      <div class="chips-row">
        {(Object.keys(KINDS) as Kind[]).map((k) => (
          <button class={`choice-chip ${kind === k ? 'is-on' : ''}`} onClick={() => setKind(k)}>{L(...KINDS[k])}</button>
        ))}
      </div>
      <h3 class="section-head">{L('Alumno', 'Pupil')} {students.length > 0 && `· ${students.map((id) => studentById.get(id)?.first).join(', ')}`}</h3>
      <StudentPicker selected={students} onToggle={(id) => setStudents(students.includes(id) ? students.filter((x) => x !== id) : [...students, id])} />
      <button class="btn-filled btn-xl" style={{ marginTop: '20px' }} onClick={save}>{L('Guardar incidencia', 'Save incident')}</button>
    </Sheet>
  );
}
