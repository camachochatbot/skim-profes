// Logo SKIM en vector; toma el color del texto (currentColor) mediante máscara.
const logo = `${import.meta.env.BASE_URL}logo/skim-logo.svg`;

export function Logo({ width = 72 }: { width?: number }) {
  return (
    <span
      class="logo"
      role="img"
      aria-label="Skim Incoming"
      style={{ width: `${width}px`, height: `${(width * 942) / 1724}px`, WebkitMaskImage: `url(${logo})`, maskImage: `url(${logo})` }}
    />
  );
}
