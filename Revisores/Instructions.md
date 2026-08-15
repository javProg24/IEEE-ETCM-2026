# Comité Científico y Revisores — IEEE ETCM 2026

## Fuente de datos
- Archivo: `Catalogo_Articulos/ETCM_2026_Revisores - web pages.xlsx` (hoja "Reviewers").
- 334 registros. Columnas originales: First name, Last name, Affiliation, Country code.
- Corte de datos: 12 de agosto de 2026.

## Campos que se publican
Por cada revisor, en `revisores-data.js`:
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
  como variable global. Se carga con su propio
  `<script src="revisores-data.js">` ANTES que `script.js` en
  `index.html`.
- `script.js`: toda la lógica (búsqueda, paginación, render). Usa la
  variable global `REVISORES` que expone `revisores-data.js`; no la
  declara ni la contiene.
- `wpbakery-revisores.html`: versión autocontenida para WordPress, con
  su propia copia del arreglo `REVISORES` incrustada dentro del
  `<script>` (a propósito, para que el bloque Raw HTML siga siendo un
  solo pegado sin depender de subir un archivo aparte al hosting).

## Cómo actualizar el listado
1. **`revisores-data.js`:** edita el arreglo `REVISORES` directamente
   (mismo formato: `id`, `nombre`, `apellido`, `afiliacion`, `pais`,
   `codigo`).
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
`revisores-data.js` declara el arreglo `REVISORES` como variable global (no
se hace `fetch()` de ningún archivo), así que `index.html` se puede abrir
directamente con doble clic (protocolo `file://`) sin necesidad de
servidor local.

## Pendiente
- **Confirmar con Julio Barzola** si "Reviewers" va como página propia en
  el menú principal o anidada bajo "Committee" (junto a Organizing
  Committee).
- Confirmar si se debe agregar algún dato adicional por revisor (rol,
  track asignado, etc.) más adelante, si el comité lo solicita.
