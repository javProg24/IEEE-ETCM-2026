# Instrucciones para Integrar en WPBakery Page Builder

## ✅ Verificación de Compatibilidad

El código ha sido adaptado para ser **100% compatible con WPBakery**. Los cambios realizados:

### 1. **Selectores CSS Específicos**
- Todos los estilos están encapsulados en `.ieee-call-for-papers-wrapper`
- Esto evita conflictos con los estilos del tema de WordPress
- Los selectores son más específicos para sobrescribir estilos del tema

### 2. **Sin Dependencias Externas**
- No requiere JavaScript adicional
- Solo usa CSS puro y HTML semántico
- Compatible con todos los navegadores modernos

### 3. **Responsive Design**
- Media queries incluidas para móviles y tablets
- Grid layout que se adapta automáticamente
- Imágenes responsive

---

## 📋 Pasos para Implementar en WordPress con WPBakery

### Paso 1: Agregar el CSS Personalizado

1. Ve a **Apariencia > Personalizar > CSS Adicional**
2. Copia todo el contenido del archivo `wpbakery-custom-css.css`
3. Pégalo en el editor de CSS Adicional
4. Haz clic en **Publicar**

**Alternativa:** Si usas un tema hijo, pega el CSS en el archivo `style.css` de tu tema hijo.

---

### Paso 2: Agregar el HTML en WPBakery

1. Edita la página donde quieres mostrar el contenido con **WPBakery Page Builder**
2. Haz clic en **Agregar Elemento**
3. Busca y selecciona **"Raw HTML"** o **"Text Block"**
4. Copia todo el contenido HTML del archivo `wpbakery-version.html`
5. Pégalo en el elemento
6. Guarda y actualiza la página

---

### Paso 3: Actualizar las Rutas de Imágenes

En el HTML, busca esta línea:
```html
<img src="images/portada(4).png" alt="...">
```

Cámbiala por la URL completa de tu imagen en WordPress:
```html
<img src="https://tu-sitio.com/wp-content/uploads/2026/05/portada.png" alt="...">
```

**Cómo obtener la URL:**
1. Ve a **Medios** en WordPress
2. Sube la imagen `portada(4).png`
3. Haz clic en la imagen
4. Copia la **URL del archivo**
5. Pégala en el atributo `src`

---

### Paso 4: Actualizar los Enlaces

Actualiza estos enlaces en el HTML:

**EasyChair:**
```html
<a href="#" class="link-button">Click here</a>
```
Cambia `#` por tu URL real de EasyChair.

**Templates:**
```html
<li><a href="#">Word template</a></li>
<li><a href="#">Latex template</a></li>
```
Cambia `#` por las URLs de tus archivos de plantillas.

---

## 🎨 Personalización de Colores

Si quieres cambiar los colores, modifica estas variables CSS en la parte superior del archivo CSS:

```css
.ieee-call-for-papers-wrapper {
    --blue-accent: #1a6ba8;    /* Color azul principal */
    --accent: #c84a44;          /* Color rojo para fechas nuevas */
    --text: #16345f;            /* Color del texto */
    --muted: #4f6486;           /* Color del texto secundario */
}
```

---

## ⚠️ Notas Importantes

1. **No uses el elemento "HTML Clásico"** de WPBakery, usa **"Raw HTML"** o **"Text Block"**
2. El CSS debe estar cargado **antes** que el HTML para que los estilos se apliquen correctamente
3. Si usas un plugin de caché, **limpia la caché** después de agregar el CSS
4. El `backdrop-filter: blur()` puede no funcionar en navegadores muy antiguos (IE11)

---

## 🔧 Solución de Problemas

### Los estilos no se aplican:
- Verifica que el CSS esté en CSS Adicional o en tu tema hijo
- Limpia la caché del navegador (Ctrl + F5)
- Limpia la caché de WordPress si usas un plugin de caché

### El diseño se ve roto:
- Verifica que el HTML esté completo (sin cortes)
- Asegúrate de que no haya conflictos con otros plugins
- Revisa la consola del navegador (F12) para ver errores

### Las imágenes no se muestran:
- Verifica que la URL de la imagen sea correcta
- Asegúrate de que la imagen esté subida en WordPress
- Verifica los permisos de la carpeta de uploads

---

## ✨ Características Incluidas

✅ Diseño moderno con efectos glassmorphism
✅ Gradientes de fondo suaves
✅ Botones con efectos hover
✅ Fechas antiguas tachadas y nuevas fechas resaltadas
✅ Secciones de enlaces y templates
✅ Banner de imagen responsive
✅ Totalmente responsive (móvil, tablet, desktop)
✅ Compatible con todos los temas de WordPress
✅ Sin conflictos con otros plugins

---

## 📞 Soporte

Si tienes problemas con la implementación, verifica:
1. Que WPBakery esté actualizado a la última versión
2. Que tu tema sea compatible con WPBakery
3. Que no haya errores de JavaScript en la consola (F12)
