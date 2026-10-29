// Control segmentado de iOS (más alto, para guantes).
export function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div class="segmented" role="radiogroup">
      {options.map((o) => (
        <button role="radio" aria-checked={value === o.v} class={value === o.v ? 'is-on' : ''} onClick={() => onChange(o.v)}>{o.label}</button>
      ))}
    </div>
  );
}
