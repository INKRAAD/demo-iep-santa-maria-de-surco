# Manual de marca (resumen operativo para la demo) — I.E.P. Santa María de Surco

> Documento creado para la demo de rediseño (no existe un manual oficial publicado). Se basa en el logo oficial 2025 y en `brand.md`. No cambia la identidad: la ordena para su uso digital.

## 1. Logo
- **Logo oficial:** monograma **SMS** en serif itálica + Virgen María orante (trazo lineal índigo) sobre un **libro abierto** coral, con el texto *Corporación Educativa “Santa María de Surco”* y *INICIAL - PRIMARIA - SECUNDARIA*.
- **Archivos:**
  - Originales: `logo-horizontal.png` (1600×429), `logo-icono.png` (512×512), `logo-blanco.png` (1577×2048), `logo-facebook.jpg`.
  - Vectoriales (vectorizados con potrace + limpieza por capas de color, IoU ≈ 0,98 frente al original):
    `logo-horizontal.svg`, `logo-horizontal-blanco.svg`, `logo-emblema.svg` (SMS + Virgen + libro), `logo-emblema-blanco.svg`, `logo-isotipo.svg` (Virgen + libro, sin SMS).
  - Script de vectorización: `svg-work/trace.py`.
- **Usos correctos:** horizontal a color sobre blanco o papel (#FBFAF7); versión blanca sobre índigo (#3C4984) o índigo noche (#1A2046); emblema solo cuando el nombre ya aparece cerca (hero, loader, favicon).
- **Área de respeto:** la altura de la “S” del monograma alrededor de todo el logo.
- **Tamaño mínimo:** horizontal 140 px de ancho en pantalla; emblema 32 px.
- **No hacer:** cambiar colores del logo, deformarlo, añadir sombras duras o contornos, colocarlo sobre fotos sin una capa de contraste, usar el escudo antiguo con laureles (“IEP SM Surco”) junto al logo nuevo.

## 2. Paleta
| Uso | Nombre | HEX | Notas de accesibilidad |
|---|---|---|---|
| Primario | Índigo SMS | `#3C4984` | Blanco sobre índigo = 8,5:1 (AA/AAA) |
| Acento | Coral SMS | `#EF5155` | Blanco sobre coral = 3,5:1 → solo textos grandes (≥ 24 px) o decoración |
| Acento claro | Coral claro | `#F55559` | Variación del logo; destacados sobre fondos oscuros |
| Base | Blanco | `#FFFFFF` | Fondo de tarjetas |
| Apoyo (derivado) | Índigo profundo | `#262F5E` | Sombras, bandas, transiciones |
| Apoyo (derivado) | Índigo noche | `#1A2046` | Secciones oscuras, pie de página |
| Apoyo (derivado) | Coral texto | `#C2353A` | Coral para texto pequeño sobre claro (5,4:1) |
| Apoyo (derivado) | Papel | `#FBFAF7` | Fondo general cálido |
| Apoyo (derivado) | Índigo suave / Coral suave | `#E9ECF7` / `#FDECEC` | Fondos de niveles y chips |

Regla: índigo manda, coral acentúa (≈ 70/20/10 entre blanco-papel, índigo y coral).

## 3. Tipografías
- **Display:** *Playfair Display Italic* (600) — eco de la serif itálica de “Santa María de Surco” y del monograma SMS.
- **Texto:** *Montserrat* (variable, 400–700) — eco de la sans espaciada de “INICIAL - PRIMARIA - SECUNDARIA”.
- Etiquetas (eyebrows): Montserrat 700, mayúsculas, tracking 0,22 em.
- Ambas con licencia SIL OFL, servidas localmente (paquetes @fontsource).

## 4. Tono de voz
- Cercano, cálido y de valores; institucional sin ser rígido. Trato de **“tú”** a las familias.
- Palabras clave: aprender, servir, acompañar, familia SMS, valores, Surco.
- El lema **“Entrar para aprender y salir para servir”** es el eje de los mensajes.
- Nunca prometer cifras, premios ni resultados no verificados.

## 5. Iconografía e ilustración
- Íconos de **trazo lineal redondeado** (1,8 px a 24 px), como el trazo de la Virgen del emblema.
- Hexágonos: recuperan el formato de los collages de actividades del colegio.
- Útiles escolares (lápiz, libros, birrete, globo terráqueo, regla, avión de papel) en índigo, coral y blanco para el 3D y las ilustraciones.

## 6. Movimiento
- Transiciones de “páginas” en coral e índigo (como el libro abierto del emblema).
- Curvas suaves (expo/power3), sin rebotes exagerados; respetar siempre `prefers-reduced-motion`.
