Vamos a construir la **app del profesor de Skim Incoming**: una aplicación para los profesores que acompañan a los grupos escolares durante su estancia de esquí en La Molina.

## Antes de nada

1. Lee **entero** `CONTEXTO.md` (está en esta carpeta). Ahí están la empresa, las 10 piezas aprobadas, lo que se descartó, los cuidados con datos de menores, el grupo de ejemplo y el estilo visual exacto.
2. Usa los archivos de `logo/`. El logo principal es `logo/skim-logo.svg` (usa `currentColor`).
3. **No modifiques el cuadro de mandos** (https://cuadro-de-mandos-skim.escalivada.chatgpt.site/) ni su repositorio, bajo ningún concepto. Si tienes acceso a su código, **solo léelo** para:
   - copiar los tokens de color, la tipografía Archivo, la máscara `.scratched` y el fondo de curvas de nivel;
   - entender el modelo de datos de los grupos (pax, fechas, horarios, servicios).
   Si no tienes acceso al código, usa los valores de `CONTEXTO.md`, sección 8.

## Qué quiero en esta primera fase

Un **prototipo funcionando** como PWA (instalable en el móvil, funciona sin conexión), con el grupo de ejemplo **Parmiter's School del 14 al 19 de febrero de 2027** y alumnos inventados. Debe incluir las 10 piezas de `CONTEXTO.md`, sección 4, con estos principios:

- **Pantalla "Ahora"** que cambia sola según la hora y el horario del grupo. Añade un selector para simular cualquier día y hora de la estancia, así puedo probar todos los momentos sin esperar.
- **Modo guantes:** botones enormes, contraste alto, dictado por voz donde haga falta escribir.
- **Sin conexión:** todo funciona sin red; los datos se guardan en el dispositivo.
- **Inglés y castellano**, con un interruptor.
- Mismo estilo que el cuadro de mandos (tema oscuro por defecto y claro opcional), pero pensado para un móvil en la nieve.
- Las piezas que dependen de terceros (escaneo de la tarjeta de "me he perdido", pedir el plan B a Skim, enviar la postal a los padres) se **simulan** en esta fase, dejando claro en el código dónde irá la conexión real.

Lo que **no** quiero: recuento por foto, sistema de parejas, postal automática cada noche, ni piezas que no estén en la lista aprobada.

## Cómo trabajar

1. **Primero pregunta.** Antes de escribir código, hazme las preguntas que necesites para no adivinar. Como mínimo:
   - cómo recibirá el profesor el acceso a su grupo (enlace, código…);
   - de dónde saldrán los datos reales del grupo más adelante (leer del cuadro de mandos, exportación, otro sistema);
   - dónde se va a publicar la app.
2. Después, propónme un plan corto: stack (si el cuadro de mandos usa uno razonable, usa el mismo; si no, PWA con Vite + TypeScript), estructura y orden de construcción.
3. Construye pieza a pieza. **Prueba cada pantalla en un móvil simulado** (tamaño iPhone) con capturas, y corrige lo que se vea mal antes de pasar a la siguiente.
4. Comprueba que la app se instala y funciona en modo avión.
5. Al final, dime cómo abrirla en mi móvil y qué falta para pasar del prototipo a la versión real.

Sé honesto: si algo de lo planteado no funciona bien en la práctica o hay una forma claramente mejor, dímelo antes de construirlo.
