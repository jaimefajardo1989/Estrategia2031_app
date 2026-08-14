# Estrategia 2026–2031 · Mapa estratégico interactivo de CAF

Micrositio de una sola página con cuatro tramos, en este orden:

1. **Portada** con el collage ilustrado y el acceso al recorrido guiado.
2. **Recorrido guiado**: ocho pantallas completas que cuentan la estrategia antes de
   entrar al mapa.
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

Usa el atajo, que se encarga de todo:

```bash
./publicar.sh "qué cambiaste"
```

Sube el número de versión en los tres lugares que corresponde, guarda los cambios y los
publica. Quien tenga la página abierta la recarga sola, porque la página compara su
versión contra `version.txt` y se actualiza si detecta una más nueva.

## Estructura de archivos

```
index.html          Estructura de la página y textos de los encabezados de sección
css/estilos.css     Diseño base + una capa de animaciones al final, separada y comentada
js/contenido.js     👈 CONTENIDO — tarjetas, transiciones, cifras, hitos y recorrido
js/app.js           Lógica: dibuja todo, maneja el panel, el buscador y el recorrido
img/                49 imágenes: collage, franjas, fotos de contexto y el logo
video/              Los animales, en video WebM y en WebP animado
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

El campo `lvl` define el nivel (1 objetivo, 2 oportunidades, 3 transversales,
4 habilitadoras) y con él, el color.

### Los indicadores y metas de una agenda

Una agenda puede tener **una** meta (`meta`, la barra que va del punto de partida
al destino) o **varias** (`metas`, las fichas con la cifra que cuenta desde cero).
La segunda es la forma que conviene cuando los indicadores ya están validados:

```js
metas:[
 {nombre:"Financiamiento aprobado para operaciones de integración regional",
  valor:10000, pre:"USD ", uni:"millones", forma:"barra"},
 {nombre:"Países de ALC con al menos una operación de integración regional",
  valor:100, suf:"%", uni:"de los países de la región", forma:"anillo"}
]
```

- `forma:"barra"` → cifra grande y una raya que se traza debajo. Para montos.
- `forma:"anillo"` → un anillo que se dibuja hasta el valor. Solo para porcentajes,
  porque ahí el anillo mide algo real.
- `pre` y `suf` se pegan antes y después del número (`USD `, `%`).
- `validado:true` en la tarjeta cambia la nota del pie: deja de advertir que el
  contenido es un borrador.

Cada meta puede además abrirse y mostrar algo que se dibuja, con `detalle`:

| `tipo` | Qué dibuja | Cuándo conviene |
|---|---|---|
| `comparar` | Dos o más barras que crecen | Hay un dato del ciclo anterior con qué comparar |
| `palanca` | Dos círculos a escala de área | Se quiere mostrar la relación entre dos metas |
| `mapa` | El mapa de ALC, encendiéndose país por país | El indicador habla de cobertura por países |

El mapa vive en `js/mapa-lac.js`: los 33 países de América Latina y el Caribe,
generados a partir de Natural Earth (dominio público) y guardados como texto para
que el sitio siga abriéndose con doble clic, sin servidor.

La lista `encender` del `detalle` decide cuáles se iluminan; los demás quedan en
gris como contexto geográfico. Hoy son los **23 países accionistas de CAF en la
región** —con España y Portugal, CAF llega a 25—, y el último en incorporarse fue
Santa Lucía. Los nombres deben coincidir exactamente con el `data-p` de cada trazo
del mapa; si uno no coincide, ese país simplemente no se enciende.

### Resaltar palabras dentro de un párrafo

`resalta:["conectar","comerciar","coproducir"]` marca esas palabras en el texto de
`what`. Solo coincide la palabra completa: `conectar` se resalta y `conectividad`,
que aparece en la misma frase, no.

Al 2026-08-13 la única agenda con indicadores validados es **Integración regional
pragmática**. Las demás siguen con cifras de ejemplo.

### El buscador

`temas` alimenta el buscador con sinónimos que no están escritos en el texto visible:
por eso la tarjeta **Ambiental** se enciende al buscar `agricultura`, aunque esa palabra
no aparezca en su párrafo. El buscador no distingue mayúsculas ni acentos (`energia`
encuentra `Energética`) y, si escribes varias palabras, exige que estén todas.

### Las otras secciones

- `TRANS` — las cuatro tarjetas de transiciones, con su foto.
- `STATS` — las ocho cifras alcanzadas.
- `TL` — los hitos de la línea de tiempo (`on:true` marca el tramo actual).
- `TOUR` — las pantallas del recorrido guiado.
- `IMG` — el catálogo de imágenes; los nombres apuntan a los archivos de `img/`.

## Cómo se preparan los animales y las figuras animadas

Cada animación va dos veces: **WebM con canal alfa** para Chrome, Firefox y Edge, y
**WebP animado** para Safari y todos los navegadores de iPhone, que ignoran el alfa
del WebM. La imagen fija de `img/` queda de respaldo y de póster.

El WebP animado es el archivo caro: comprime mal el movimiento con transparencia y
la calidad casi no cambia su peso, porque lo que pesa es el canal alfa cuadro a
cuadro. Lo que sí lo baja, en orden de efecto:

1. **Recortar el ciclo.** Buscar dos cuadros parecidos y quedarse con lo que hay
   entre ellos. En los niños, el ciclo útil eran 6 de los 10 segundos.
2. **Cerrar la costura con un fundido.** Los últimos cuadros se mezclan con los
   primeros, con el peso de la cola bajando de 1 a 0. Si la rampa va al revés el
   salto se sigue viendo.
3. **Bajar a 10 cuadros por segundo**, descartando uno de cada cinco.
4. **Reducir el ancho**, que es lo último porque es lo que se nota.

Entre lo primero y lo segundo, los niños pasaron de 1.140 KB a 602 KB, y de paso
dejaron de dar un salto cada vez que el ciclo volvía a empezar.

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

## Qué agendas tienen texto y cuáles no

Las 14 agendas de los niveles 2, 3 y 4 muestran **«Por definir»**: su panel solo
lleva el título y el nivel. Basta con que una tarjeta no tenga `what` para que se
vea así, no hay ningún interruptor aparte.

Con texto propio quedan **Integración regional pragmática** —la única validada— y
el nivel 1: el objetivo al 2031 y los tres atributos, que alimentan la lámina del
recorrido guiado.

Los borradores que se retiraron están en [BORRADORES.md](BORRADORES.md). Para
reponer una agenda, se copian sus campos a `js/contenido.js` y, si el texto ya está
validado, se agrega `validado:true`.

El buscador sigue funcionando en todas: `temas` no se tocó, así que «agricultura»
sigue encontrando la agenda Ambiental aunque su panel esté vacío.

## Estado del contenido

Los textos provienen de la presentación del Directorio de junio de 2026 y del material de
la estrategia. Las cifras de la sección de contexto son las del ciclo 2021–2025.

Antes de difundirlo fuera del equipo conviene validar los textos de las 19 tarjetas con
las áreas responsables.
