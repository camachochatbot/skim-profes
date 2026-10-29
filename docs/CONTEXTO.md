# CONTEXTO — App del profesor de Skim Incoming

Este archivo resume una conversación de diseño entre el dueño de Skim Incoming y Claude (29 de octubre de 2026). Léelo entero antes de escribir código: aquí están las decisiones tomadas, lo que se descartó y por qué.

---

## 1. Qué es Skim Incoming

- **Receptivo (DMC) de viajes de esquí en La Molina** (Cerdanya, Pirineo catalán, base a ~1.700 m, cima en la Tosa d'Alp a 2.537 m).
- **Clientes:** sobre todo **agencias** (Olimpia 2000, Inspireski, Halsbury, Sunsports, GEO, Mountainlivetravel, Bernini…) que traen **grupos escolares**. Muchos colegios son **británicos** (Aylesbury High School, Parmiter's School, Old Swinford Hospital…) y otros españoles (IES de Canarias, Madrid, Valencia…). También algún grupo B2C.
- **Temporada 26-27:** 20 grupos confirmados, 1.293 pax. Grupos de 25 a 157 personas.
- **Hoteles:** casi todo en el **Hotel Guitart** (La Molina); algunos grupos en **La Collada**.
- **Proveedores habituales:** escuela de esquí (Descens, Solineu), forfaits de La Molina (LM), alquiler de material (Auto LM), seguro Intermundial, autocar (Transcerdanya), bolera, piscina, discoteca.
- **Semana punta:** del 14 al 19 de febrero de 2027 llegan **7 grupos a la vez, 407 pax** (320 en el Guitart).

## 2. Lo que ya existe y NO se toca

**Cuadro de mandos SKIM** → https://cuadro-de-mandos-skim.escalivada.chatgpt.site/
Hecho antes con Claude Code. Es la herramienta interna del equipo (David, Joaquin, Eric). Secciones:

- **Hoy:** parte del día. Pendientes por persona (ej. "Cobrar el primer pago (25 %)"), cambios sin comunicar a proveedores, servicios por pedir, próximas llegadas, avisos, actividad reciente.
- **Grupos:** cada grupo con su escandallo (precio por alumno), inscritos y material, correo al cliente.
- **Orden 26-27:** cuadrícula viva de peticiones a proveedores. Fila = grupo. Columnas = servicios agrupados (Alojamiento, Esquí y forfaits, Comidas, Material, Seguros, Transporte, Actividades). Estados: Confirmado, Pedido, TBC/P, TBC/C, Cambio, Sin pedir.
- **Calendario:** ocupación de hoteles por semana contra cupo.
- **Escuela de esquí**, **La Molina 3D**, **Tarifas**.

> **Regla absoluta:** el cuadro de mandos no se modifica. La app nueva es un proyecto aparte. Del cuadro solo se puede **leer** (código para copiar estilo y modelo de datos; datos de grupos si se acuerda cómo).

## 3. La app nueva: qué es y para quién

**Una aplicación para el profesor que acompaña al grupo durante la estancia en La Molina.**

Por qué: los profesores son quienes recomiendan repetir el viaje (son los que lo han vivido) y son los que peor lo pasan: controlar a 50 chavales en la nieve, padres llamando, papeles, dinero, imprevistos. Si Skim les facilita la estancia, el colegio repite.

Es **externa al cuadro de mandos**: el usuario no es el equipo de Skim, es el profesor.

### Principios de diseño (decididos)

1. **Sin menús: una pantalla "Ahora" que cambia sola con la hora.** La app conoce el horario del grupo (desayuno, clases, comida, cena) y le pone delante al profesor lo que toca en ese momento. Debe existir también una forma sencilla de llegar a cualquier pieza fuera de su hora.
2. **Modo guantes:** botones enormes, poco texto, dictado por voz donde haga falta escribir.
3. **Funciona sin cobertura** (en pistas falla) y sincroniza al volver la señal.
4. **Bilingüe: inglés y castellano** (muchos profesores son británicos).
5. **No depende de que los alumnos lleven móvil** (muchos colegios británicos lo prohíben).
6. **Original de verdad.** Al dueño le gusta lo creativo de verdad, no lo que haría cualquiera "para parecer creativo". Nada de plantillas genéricas.

## 4. Las 10 piezas aprobadas

### Durante el día
1. **Entrega a la escuela.** Qué alumnos van con qué monitor. El monitor toca "Recibidos" y el profesor sabe que su grupo está en manos de alguien.
2. **Tarjeta de "me he perdido".** Una tarjeta detrás del forfait, en el idioma del alumno: "Si te pierdes, enséñale esto a cualquier adulto". Un pistero o taquillero escanea el código y el profesor recibe una alerta con dónde está el alumno. Esa alerta tapa todo lo demás en la pantalla.
3. **Alergias en grande a la hora de comer**, para enseñarlas en el restaurante.
4. **Incidencias dictadas con la voz** ("Laura, se ha torcido la muñeca, 17:40"), con hora.
5. **Plan B con un toque.** Si no se puede esquiar (viento, telecabina cerrada), la app ofrece las actividades alternativas (bolera, piscina…) y se las pide a Skim directamente.

### Durante la estancia
6. **El banco del profe.** En los viajes escolares británicos los alumnos le dan su dinero de bolsillo al profesor. La app lleva el saldo de cada uno ("Tom, le quedan 12 €"): entregas y gastos. Solo es un registro; no mueve dinero real.
7. **Turnos de guardia.** Qué profesor vigila cada noche, repartido para que nadie repita dos noches seguidas.
8. **Ronda de habitaciones** con el plano de la planta del hotel: el profesor toca cada puerta comprobada hasta que todas están en verde.
9. **Postal a los padres, SOLO cuando el profesor quiera** (botón "Enviar postal"; nada automático, cada noche sería pesado). Elige una foto y la app monta una postal de La Molina con lo que hizo el grupo ese día.

### Al final
10. **Diario del viaje.** Se genera solo: tiempo de cada día, kilómetros bajados entre todos (estimados a partir de las horas de clase), fotos del profesor, mejor momento. Sirve para la reunión de padres del curso siguiente: es el argumento de venta del próximo viaje.

## 5. Lo que se descartó (no lo construyas)

- **Recuento por foto** de pegatinas con número en los cascos: descartado. Un profesor cuenta a sus alumnos mirando más rápido que haciendo una foto.
- **Sistema de parejas** (cada alumno responsable de otro): aparcado para más adelante. **No** lo incluyas ahora.
- **Postal automática cada noche:** descartada; solo bajo demanda.
- Ideas propuestas y no elegidas: mapa de sitios clave, avisos a alumnos, teléfonos importantes, papeles sin conexión, lista de habitaciones, medicación, tiempo y estado de pistas, pedirle cosas a Skim en general, objetos perdidos, traductor. **No las añadas** salvo que el dueño lo pida. (Ojo: el dueño mencionó que a él le gustaría tener la **localización de cada sitio**; está fuera de la lista actual, pero si encaja de forma natural dentro de una pieza aprobada, pregúntale.)
- Mejoras dentro del cuadro de mandos: descartadas; la idea es algo externo.

## 6. Cuidados que hay que respetar

- **Datos de menores (RGPD):** mínimo imprescindible, nada público, acceso solo del profesor de ese grupo.
- **Fotos de alumnos:** la postal y el diario solo pueden incluir a alumnos con autorización de imagen del colegio. La app debe avisar.
- **Alergias e incidencias** son datos de salud: protegerlos.
- **Tarjeta de "me he perdido":** depende de que el personal de La Molina la conozca. Es un tema a hablar con la estación; la app no debe prometer más de lo que el escaneo hace.
- **Banco del profe:** solo registro, nunca pagos.

## 7. Grupo de ejemplo para el prototipo

**Parmiter's School** (agencia INSPIRESKI) — tomado de la Orden 26-27 del cuadro de mandos. Verifica los datos exactos en el cuadro antes de usarlos.

- 87 pax · del 14 al 19 de febrero de 2027 · 5 noches · 5 días de esquí
- Hotel: **La Collada** (con hotel chófer La Collada)
- Desayuno 7:15 · Cena 19:00
- Escuela: Descens (~7 monitores) · forfaits La Molina para 83
- Alquiler de material: Auto LM · bus: Transcerdanya · seguro Skim
- Servicios aún por pedir en la pantalla Hoy: hora de desayuno y cena, escuela, forfaits, comida, cena extra, alquiler, bus.
- Horario típico de clases en otros grupos: 9:30–12:30 y 14:00–17:00.

Los nombres de los alumnos para el prototipo deben ser **inventados**.

## 8. Estilo visual: el mismo que el cuadro de mandos

Extraído de la web en vivo (tema oscuro, el que usa el equipo). La fuente de verdad es el código del cuadro de mandos; si hay diferencias, manda el código.

### Tipografía
- **Archivo** (Google Fonts, variable): `Archivo:wdth,wght@62..125,300..900`. Todo el sitio usa esta familia.
- **`.cond` (titulares):** `font-stretch: 70%`, peso 900, `letter-spacing: -0.01em`. El H1 grande mide 92 px con interlineado 0,85.
- **`.wide` (antetítulos):** `font-stretch: 125%`, mayúsculas, `letter-spacing: 0.32em`, ~10 px.
- **`.scratched`:** el H1 lleva una máscara SVG de textura rayada que imita el logo desgastado de SKIM. Cópiala del código del cuadro.

### Colores — tema oscuro (por defecto)
```css
--c-bg: #0a0c24;  --c-surface: #161a3d;  --c-surface-2: #1c2049;  --c-line: #2a2f63;
--c-ink: #eef0ff; --c-ink-2: #b9bde6;    --c-muted: #8d92c4;
--c-navy: #aeb3ff; --c-brand: #1d2063;   --c-ice: #22265a;
--c-accent: #ff6a33; --c-accent-ink: #ff9a6e;
--c-good: #3ccf6e;   --c-warn: #f2b33d;   --c-crit: #ff6b6b;
/* cabecera: fondo #1d2063 */
```

### Colores — tema claro (del escandallo original; confirmar en el código)
```css
--c-bg: #f2f4fa;  --c-surface: #ffffff;  --c-surface-2: #f7f8fc;  --c-line: #e1e4f0;
--c-ink: #14163a; --c-ink-2: #4a4e76;    --c-muted: #6e7398;
--c-navy: #292c77; --c-brand: #292c77;   --c-ice: #e8ebfb;
--c-accent: #f2551d; --c-accent-ink: #c2410c;
--c-good: #0a7d32;   --c-warn: #9a6200;   --c-crit: #c62f2f;
```
El azul del logo es exactamente **#292c77**.

### Componentes
- **Botones:** píldora (`border-radius: 999px`), padding `0.55rem 1rem`, peso 600, 0.9rem. Primario naranja `#ff6a33` con resplandor: `box-shadow: 0 6px 18px -8px` en naranja al 80 %.
- **Tarjetas:** fondo `--c-surface`, borde 1 px `--c-line`, radio 20 px, sin sombra.
- **KPI de alerta:** tarjeta rellena de rojo coral (como "Cambios sin comunicar").
- **Fondo:** patrón de **curvas de nivel topográficas** muy sutil (líneas a ~5 % de opacidad). Cópialo del cuadro.
- **Cabecera:** barra azul marino con el logo SKIM a la izquierda y enlaces en píldora.
- Tema oscuro por defecto con interruptor a claro.

> Para el profesor en la nieve, el estilo se adapta: mismos colores y tipografía, pero botones mucho más grandes (modo guantes) y contraste alto para leer a pleno sol.

## 9. Logo (carpeta `logo/`)

- `skim-logo.svg` — **vector, el formato recomendado para web.** Usa `fill="currentColor"`: toma el color del texto (blanco sobre oscuro, `#292c77` sobre claro). Calcado automáticamente del PNG; para imprenta pedir el original al diseñador.
- `skim-blanco-transparente.png` / `.webp` — para fondos oscuros.
- `skim-navy-transparente.png` — para fondos claros.
- `icono-512.png`, `icono-192.png`, `icono-maskable-512.png` — iconos para instalar la app en el móvil.
- `icono-180.png` — icono de iPhone (apple-touch-icon).
- `favicon.ico`, `icono-32.png` — pestaña del navegador.
- `skim-original.png` — el original recibido (logo blanco sobre fondo #292c77).

## 10. Formato técnico recomendado

**Una PWA (aplicación web instalable)**: se abre con un enlace, se instala en el móvil sin pasar por App Store ni Google Play, funciona sin conexión con un *service worker* y se actualiza sola. Es lo que encaja con profesores de distintos colegios a los que se les manda un enlace por grupo.

## 11. Sobre el dueño (cómo trabajar con él)

- Escribe en castellano. Quiere honestidad: si algo no funciona o no compensa, dilo.
- Valora la originalidad de verdad.
- Quiere ver el ejemplo construido cuando se crea algo, no solo descripciones.
- Ha pedido varias veces **no tocar** el cuadro de mandos.
