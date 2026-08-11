# Estrategia 2026–2031 · Mapa estratégico interactivo de CAF

Micrositio de una sola página con cuatro tramos, en este orden:

1. **Portada** con el collage ilustrado y el acceso al recorrido guiado.
2. **Recorrido guiado**: nueve pantallas a pantalla completa que cuentan la estrategia
   antes de entrar al mapa.
3. **Mapa estratégico**: los cuatro niveles del árbol, con buscador y filtros por nivel.
   Cada tarjeta abre un panel lateral con el detalle.
4. **Contexto y trayectoria**: las cuatro transiciones, las cifras alcanzadas y la línea
   de tiempo de CAF.

Sin frameworks ni dependencias: HTML, CSS y JavaScript. Se abre con doble clic en
`index.html`.

## Enlace publicado

**https://jaimefajardo1989.github.io/Estrategia2031_app/**

> ⚠️ **El enlace es de acceso abierto.** Cualquiera que lo tenga puede entrar: GitHub Pages
> en plan gratuito no permite restringir el acceso. Lleva `noindex` y `robots.txt` para que
> no aparezca en buscadores, pero eso no lo hace privado.

El sitio se actualiza solo: cada `git push` a `main` vuelve a publicarlo en un par de minutos.

### Importante al publicar cambios

Los archivos se enlazan con un número de versión (`css/estilos.css?v=11`). **Cada vez que
edites el CSS o los JS, subí ese número en las tres líneas de `index.html`.** Si no, quien
ya visitó la página sigue viendo la versión anterior. Para forzar la recarga en tu
navegador: **Cmd + Shift + R**.

## Estructura de archivos

```
index.html          Estructura de la página y textos de los encabezados de sección
css/estilos.css     Diseño base + una capa de animaciones al final, separada y comentada
js/contenido.js     👈 CONTENIDO — tarjetas, transiciones, cifras, hitos y recorrido
js/app.js           Lógica: dibuja todo, maneja el panel, el buscador y el recorrido
img/                47 imágenes del collage, las franjas y las fotos de contexto
```

## Cómo cambiar los textos

Casi todo vive en **`js/contenido.js`**. Los títulos de cada sección
("La propuesta de valor de CAF al 2031", etc.) están en `index.html`, marcados con
comentarios.

### Las tarjetas del mapa

Cada una de las 19 tarjetas es una entrada de `DATA`:

```js
{id:"f-dig", temas:"conectividad internet datos …", lvl:2,
 t:"Digital",                      // lo que se lee en la tarjeta
 sub:"Conectividad, datos e IA",   // segunda línea, opcional
 lead:"Frase de entrada del panel.",
 what:"Párrafo principal.",
 acts:["Acción 1","Acción 2"],     // la lista con viñetas de colores
 links:["v-fin","a-tal"]},         // tarjetas relacionadas, por id
```

El campo `lvl` define el nivel (1 objetivo, 2 oportunidades, 3 valor agregado,
4 agendas institucionales) y con él, el color.

### El buscador

`temas` alimenta el buscador con sinónimos que no están escritos en el texto visible:
por eso la tarjeta **Ambiental** se enciende al buscar `agricultura`, aunque esa palabra
no aparezca en su párrafo. El buscador no distingue mayúsculas ni acentos (`energia`
encuentra `Energética`) y, si escribís varias palabras, exige que estén todas.

### Las otras secciones

- `TRANS` — las cuatro tarjetas de transiciones, con su foto.
- `STATS` — las ocho cifras alcanzadas.
- `TL` — los hitos de la línea de tiempo (`on:true` marca el tramo actual).
- `TOUR` — las pantallas del recorrido guiado.
- `IMG` — el catálogo de imágenes; los nombres apuntan a los archivos de `img/`.

## Las animaciones

Están todas al final de `css/estilos.css`, en un bloque separado, y en el bloque final de
`js/app.js`. Se pueden ajustar sin tocar el diseño base:

- Las tarjetas de cada nivel **aparecen escalonadas** cuando la sección entra en pantalla.
- Al pasar el mouse, la tarjeta **se eleva y la cruza un destello**.
- Al hacer clic sale una **onda** desde el punto exacto donde tocaste.
- La tarjeta abierta queda con un **aura que late**, y el fondo se difumina.
- El panel entra con **rebote** y su contenido aparece bloque por bloque.
- En el buscador, las coincidencias **laten** y el resto se apaga.
- Las franjas de confeti entre filas **se dibujan de izquierda a derecha**.

Todo respeta la preferencia del sistema de reducir movimiento: con esa opción activada,
el contenido aparece igual pero sin desplazamientos.

## Estado del contenido

Los textos provienen de la presentación del Directorio de junio de 2026 y del material de
la estrategia. Las cifras de la sección de contexto son las del ciclo 2021–2025.

Antes de difundirlo fuera del equipo conviene validar los textos de las 19 tarjetas con
las áreas responsables.
