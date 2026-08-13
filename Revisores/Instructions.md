# Comité Científico y Revisores — IEEE ETCM 2026

## Fuente de datos
- Archivo: `Catalogo_Articulos/ETCM_2026_Revisores - web pages.xlsx` (hoja "Reviewers").
- 334 registros. Columnas originales: First name, Last name, Affiliation, Country code.
- Corte de datos: 12 de agosto de 2026.

## Campos que se publican
Por cada revisor, en `revisores.json`:
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

## Cómo actualizar el listado
1. **Archivos locales (index.html + script.js + revisores.json):**
   reemplaza el arreglo completo de `revisores.json` por el nuevo listado
   (mismo formato: `id`, `nombre`, `apellido`, `afiliacion`, `pais`).
2. **Archivo para WP Bakery (`wpbakery-revisores.html`):** este archivo NO
   lee `revisores.json` — lleva el arreglo `REVISORES` incrustado
   directamente dentro del `<script>`, para que el bloque Raw HTML siga
   siendo un solo pegado sin depender de subir un JSON al hosting. Cuando
   actualices `revisores.json`, hay que reconstruir `wpbakery-revisores.html`
   pegando el nuevo arreglo también ahí (mismos campos, notación de objeto
   JS con claves sin comillas: `{ id: 1, nombre: "...", apellido: "...",
   afiliacion: "...", pais: "EC" }`).
3. Si cambian nuevos países, agrégalos a `COUNTRY_NAMES` en ambos archivos
   (`script.js` y `wpbakery-revisores.html`).

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
`index.html` carga `revisores.json` vía `fetch()`, así que abrir el archivo
con doble clic (protocolo `file://`) falla por CORS. Sirve la carpeta con
un servidor local para probar (`npx serve`, `python -m http.server`, Live
Server de VSCode, etc.). Una vez subido a un hosting real (http/https)
funciona sin problema.

## Pendiente
- **Confirmar con Julio Barzola** si "Reviewers" va como página propia en
  el menú principal o anidada bajo "Committee" (junto a Organizing
  Committee).
- Confirmar si se debe agregar algún dato adicional por revisor (rol,
  track asignado, etc.) más adelante, si el comité lo solicita.
