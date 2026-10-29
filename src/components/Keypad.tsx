// Teclado numérico grande (guantes): importe en euros con coma decimal.
import { Delete } from 'lucide-preact';

export function Keypad({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const press = (k: string) => {
    if (k === 'del') return onChange(value.slice(0, -1));
    if (k === ',' && (value.includes(',') || !value)) return;
    if (value.includes(',') && value.split(',')[1].length >= 2) return;
    if (value.replace(',', '').length >= 5) return;
    onChange(value === '0' && k !== ',' ? k : value + k);
  };
  return (
    <div class="keypad">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'].map((k) => (
        <button onClick={() => press(k)} aria-label={k === 'del' ? 'Borrar' : k}>{k === 'del' ? <Delete size={26} /> : k}</button>
      ))}
    </div>
  );
}

export const parseEuros = (v: string) => Number(v.replace(',', '.')) || 0;
