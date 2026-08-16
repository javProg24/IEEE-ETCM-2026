# Comité Científico y Revisores — IEEE ETCM 2026

## Fuente de datos
- Archivo: `Catalogo_Articulos/ETCM_2026_Revisores - web pages.xlsx` (hoja "Reviewers").
- 334 registros. Columnas originales: First name, Last name, Affiliation, Country code.
- Corte de datos: 12 de agosto de 2026.

## Campos que se publican
Por cada revisor, en el arreglo asignado a `window.ETCM_REVISORES_DATA`
dentro de `revisores-data.js`:
- `id`: correlativo numérico (1–334).
- `firstName`: First name.
- `lastName`: Last name.
- `affiliation`: Affiliation, tal cual viene en el Excel.
- `flag`: URL de la imagen de la bandera del país.
- `countryCode`: Country code, normalizado a 2 letras en mayúscula (ISO 3166-1 alfa-2).

No se publican correos, LinkedIn ni ningún otro dato de contacto — el Excel fuente no los trae.

El nombre completo de cada país (para la columna "Country" de la tabla) se
resuelve con el objeto `COUNTRY_NAMES` dentro de `script.js`. Si aparece un
código de país nuevo que no esté en ese mapa, se muestra el código tal cual
en vez del nombre — hay que agregarlo a `COUNTRY_NAMES` a mano.

`wpbakery-revisores.html` usa un esquema propio y distinto (ver "Estructura
de archivos" abajo): claves en español (`nombre`, `apellido`, `afiliacion`,
`pais`), sin `flag`, y con su propio filtro por país — no es un simple
duplicado del `revisores-data.js` local.

## Estructura de archivos
- `revisores-data.js`: fuente editable — solo contiene
  `window.ETCM_REVISORES_DATA = [...]` (334 registros). Asignación
  explícita a `window` (no `var REVISORES`), para que la variable quede
  en el ámbito global sin importar cómo un plugin o el propio WP Bakery
  trate el bloque pegado.
- `script.js`: toda la lógica (búsqueda, paginación, render,
  `COUNTRY_NAMES`), envuelta en un IIFE. Como primera línea del IIFE crea
  un alias local: `var REVISORES = window.ETCM_REVISORES_DATA;` y valida
  de inmediato: si `window.ETCM_REVISORES_DATA` es `undefined` o no es un
  array, muestra "No se pudieron cargar los datos de revisores." dentro
  de `#ir-results` y hace `return` — corta ahí en vez de seguir y romper
  más abajo con errores silenciosos. El resto de la lógica sigue usando
  la variable local `REVISORES` sin cambios.
- `index.html`: dos `<script src>` en orden — primero
  `revisores-data.js`, después `script.js`. En local (protocolo
  `file://`) el navegador los ejecuta en ese orden de forma confiable;
  el problema de orden que motivó todo este historial solo aparecía
  dentro del bloque Raw HTML de WP Bakery, no aquí.
- `wpbakery-revisores.html`: versión autocontenida para WordPress — UN
  SOLO `<script>` con, en este orden exacto: (a) `window.ETCM_REVISORES_DATA
  = [...]`, (b) el alias `var REVISORES = window.ETCM_REVISORES_DATA;` con
  su misma validación, (c) el resto de la lógica. Al ser un único bloque
  pegado, el orden de ejecución no depende de cómo WP Bakery / wpautop
  trate dos `<script>` separados — ya viene concatenado. **Nota:** este
  archivo mantiene su propio esquema de datos y UI en español (`nombre`,
  `apellido`, `afiliacion`, `pais`, filtro por país, sin banderas) que ya
  divergía de `revisores-data.js`/`script.js` (inglés, con `flag`) antes
  de este cambio; esta actualización solo tocó el mecanismo de carga de
  datos, no esa divergencia de esquema/UI — sincronizarlos es un trabajo
  aparte si se decide hacerlo.

Historial del mecanismo de carga (por qué se llegó a esto): primero se
fusionaron datos y lógica en un solo `script.js` para evitar depender del
orden de dos `<script src>`. Luego se probó una carga dinámica
(`document.currentScript` + `onload`) para poder separar los archivos sin
perder esa garantía de orden. Se descartó ese enfoque a favor del actual:
mantener los archivos separados en el repo (más fácil de editar) y usar
`window.ETCM_REVISORES_DATA` + validación explícita en `script.js`, con
`wpbakery-revisores.html` resolviendo el problema de orden por su cuenta
al ser un único bloque pegado con datos y lógica ya concatenados.

## Cómo actualizar el listado
1. **`revisores-data.js`:** edita el arreglo de
   `window.ETCM_REVISORES_DATA` directamente (mismo formato: `id`,
   `firstName`, `lastName`, `affiliation`, `flag`, `countryCode`). No
   hace falta tocar `script.js`.
2. **`wpbakery-revisores.html`:** este archivo tiene su propio esquema en
   español y sin `flag` (ver nota en "Estructura de archivos"), así que
   el mismo revisor se agrega con distinta forma — dentro del
   `window.ETCM_REVISORES_DATA = [...]` de ese `<script>`, con notación
   de objeto JS con claves sin comillas:
   `{ id: 1, nombre: "...", apellido: "...", afiliacion: "...",
   pais: "EC" }`.
3. Si aparecen países nuevos, agrégalos a `COUNTRY_NAMES` en ambos
   archivos (`script.js` y `wpbakery-revisores.html`).

## Cómo integrar en WP Bakery
1. En la página del sitio (WordPress + WP Bakery) donde va el listado,
   agrega un elemento **Raw HTML** — no "Text Block", porque wpautop
   corrompe el HTML/JS insertando `<p>` y `<br>` automáticos.
2. Pega **todo** el contenido de `wpbakery-revisores.html` dentro de ese
   elemento, tal cual.
3. No usa `<form>` en ningún punto: toda la interacción (buscar, filtrar,
   paginar) va por `addEventListener`, así se evitan conflictos con
   submits del theme.
4. Prueba siempre en la página ya publicada, no en el preview del editor
   de WP Bakery (el preview puede sandboxear el `<script>`).

## Previsualización local
`index.html` declara `revisores-data.js` y `script.js` como dos
`<script src>` normales, en ese orden — no se hace `fetch()` de ningún
archivo (que sí estaría bloqueado por CORS bajo `file://`) — así que se
puede abrir directamente con doble clic (protocolo `file://`) sin
necesidad de servidor local.

## Pendiente
- **Confirmar con Julio Barzola** si "Reviewers" va como página propia en
  el menú principal o anidada bajo "Committee" (junto a Organizing
  Committee).
- Confirmar si se debe agregar algún dato adicional por revisor (rol,
  track asignado, etc.) más adelante, si el comité lo solicita.
