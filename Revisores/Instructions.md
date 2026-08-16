# Comité Científico y Revisores — IEEE ETCM 2026

## Fuente de datos
- Archivo: `Catalogo_Articulos/ETCM_2026_Revisores - web pages.xlsx` (hoja "Reviewers").
- 334 registros. Columnas originales: First name, Last name, Affiliation, Country code.
- Corte de datos: 12 de agosto de 2026.

## Campos que se publican
Por cada revisor, en el arreglo `REVISORES` dentro de `revisores-data.js`:
- `id`: correlativo numérico (1–334).
- `nombre`: First name.
- `apellido`: Last name.
- `afiliacion`: Affiliation, tal cual viene en el Excel.
- `pais`: Country code, normalizado a 2 letras en mayúscula (ISO 3166-1 alfa-2).

No se publican correos, LinkedIn ni ningún otro dato de contacto — el Excel fuente no los trae.

El nombre completo de cada país (para el filtro por país y para la columna
"País" de la tabla) se resuelve con el objeto `COUNTRY_NAMES` dentro de
`script.js` (y su copia embebida en `wpbakery-revisores.html`). Si aparece un
código de país nuevo que no esté en ese mapa, se muestra el código tal cual
en vez del nombre — hay que agregarlo a `COUNTRY_NAMES` a mano.

## Estructura de archivos
- `revisores-data.js`: fuente editable — declara `var REVISORES = [...]`
  (334 registros) y nada más. No lo referencia `index.html` directamente;
  lo carga `script.js` por código (ver abajo).
- `script.js`: toda la lógica (búsqueda, paginación, render,
  `COUNTRY_NAMES`), envuelta en un IIFE. `index.html` solo incluye
  `<script src="script.js">`; ese único script es el que, en tiempo de
  ejecución, inyecta un segundo `<script>` para cargar
  `revisores-data.js` y recién entonces inicializa la búsqueda/render.
  Concretamente:
  1. En la primera línea del archivo (antes de cualquier otro código)
     captura `document.currentScript` en `IR_SCRIPT_EL` — solo es
     confiable si se lee de forma síncrona, apenas arranca el parseo.
  2. Con `IR_SCRIPT_EL.src` (la URL absoluta de su propio `<script>`)
     deriva la URL del archivo hermano con
     `new URL('revisores-data.js', selfUrl)`, cambiando únicamente el
     nombre de archivo al final del path. Esto funciona igual si
     `script.js` se sirve desde una ruta relativa local
     (`Revisores/script.js`) que si se sirve desde jsDelivr/GitHub
     (`https://cdn.jsdelivr.net/gh/usuario/repo@rama/Revisores/script.js`
     → resuelve a `.../Revisores/revisores-data.js` automáticamente).
  3. Crea ese `<script>` con la URL derivada y lo agrega al documento.
     En su `onload`, si `typeof REVISORES !== 'undefined'`, recién ahí
     corre `init()` (búsqueda, paginación, listeners). Si `REVISORES`
     sigue sin existir, o si dispara `onerror` (el archivo no cargó),
     muestra un mensaje de error visible dentro de `#ir-results` en vez
     de fallar en silencio.

  Por qué así: antes `index.html` declaraba dos `<script src>` separados
  (`revisores-data.js` + `script.js`) y dependía de que el navegador los
  ejecutara en ese orden. Al pegar el bloque en WP Bakery (Raw HTML +
  wpautop) ese orden no estaba garantizado, y a veces la lógica corría
  antes de que `REVISORES` existiera (`ReferenceError: REVISORES is not
  defined`, visible solo en la página publicada, no en el editor). Ahora
  el orden lo garantiza JavaScript (`onload` del script inyectado), no
  cómo se pegue el HTML — da igual que se pegue como un bloque o como
  dos, y da igual si `script.js` se sirve en local o desde un CDN.
- `wpbakery-revisores.html`: versión autocontenida para WordPress, con
  su propia copia del arreglo `REVISORES` incrustada dentro del
  `<script>` (a propósito, para que el bloque Raw HTML siga siendo un
  solo pegado sin depender de subir un archivo aparte al hosting). Por
  ahora sigue con su propio mecanismo, sin el loader dinámico — se
  revisará en un paso aparte.

## Cómo actualizar el listado
1. **`revisores-data.js`:** edita el arreglo `REVISORES` directamente
   (mismo formato: `id`, `nombre`, `apellido`, `afiliacion`, `pais`,
   `codigo`). No hace falta tocar `script.js`.
2. **`wpbakery-revisores.html`:** replica el mismo cambio dentro de su
   `<script>`, con notación de objeto JS con claves sin comillas:
   `{ id: 1, nombre: "...", apellido: "...", afiliacion: "...",
   pais: "..." , codigo: "EC" }`.
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
`script.js` carga `revisores-data.js` inyectando un `<script src="...">`
(no usa `fetch()`, que sí estaría bloqueado por CORS bajo `file://`), así
que `index.html` se puede abrir directamente con doble clic (protocolo
`file://`) sin necesidad de servidor local, y sigue funcionando igual si
`script.js` se sirve luego desde un CDN como jsDelivr.

## Pendiente
- **Confirmar con Julio Barzola** si "Reviewers" va como página propia en
  el menú principal o anidada bajo "Committee" (junto a Organizing
  Committee).
- Confirmar si se debe agregar algún dato adicional por revisor (rol,
  track asignado, etc.) más adelante, si el comité lo solicita.
