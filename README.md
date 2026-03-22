# Estudio A & Asociados — sitio optimizado V3.1

Estructura lista para GitHub Pages:

- `index.html` en raíz
- `assets/css/styles.css`
- `assets/js/main.js`
- imágenes externalizadas y renombradas con criterio semántico
- `robots.txt`

## Recomendaciones
1. Subir todo el contenido de esta carpeta al repositorio.
2. Verificar que `index.html` quede en la raíz.
3. Activar GitHub Pages con `main` + `/(root)`.
4. Revisar luego el formulario: visualmente está listo, pero el envío depende del servicio que uses.

## Ajustes aplicados
- Separación de CSS y JS.
- Extracción de imágenes base64.
- Renombre semántico de assets.
- Corrección de una regla CSS anidada no válida (`.form-select option`).
- `loading="lazy"` y `decoding="async"` en imágenes no críticas.
- `fetchpriority="high"` para la imagen principal del hero.
- Añadidos `width` y `height` a imágenes para reducir layout shift.
