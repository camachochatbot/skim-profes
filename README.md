# SKIM Profes — app del profesor (prototipo)

App web instalable (PWA) para los profesores que acompañan a los grupos escolares de Skim Incoming en La Molina. Funciona sin conexión.

**Abrir:** https://camachochatbot.github.io/skim-profes/ → en iPhone, Safari → Compartir → *Añadir a pantalla de inicio*.

## Qué hay
- **Ahora**: cambia sola según la hora y el horario del grupo. La píldora naranja "PROTOTIPO" simula cualquier día y hora de la estancia.
- **9 piezas**: entrega a la escuela (con mapa), tarjetas «me he perdido» (imprimibles, con alerta), alergias (vista restaurante), incidencias por voz, plan B (WhatsApp a Skim), banco del profe, ronda de habitaciones, postal a las familias, diario del viaje.
- Castellano / inglés, tema claro automático en pistas y oscuro azul marino en el hotel.

## Datos
Grupo de ejemplo **Parmiter's School, 14–19 feb 2027**: datos PROVISIONALES, alumnos y profesores inventados (`src/data/parmiters.ts`). Precios de plan B, sitios del mapa, plano del hotel y teléfono de Skim también son inventados.

## Lo simulado (buscar `CONEXIÓN REAL` en el código)
- Escaneo de la tarjeta y aviso al profesor (hoy: botón "Simular un escaneo").
- Confirmación del plan B por Skim (hoy: botón "Simular OK").
- Transcripción de notas de voz grabadas sin red.
- Sincronización entre los móviles de los profesores (`src/core/journal.ts`).
- Carga del grupo real desde el Excel de Skim (`src/core/group.ts`).
- PIN / Face ID y cifrado de datos de salud: pendiente.

## Desarrollo
```
npm install
npm run dev
```
Cada push a `main` publica en GitHub Pages.
