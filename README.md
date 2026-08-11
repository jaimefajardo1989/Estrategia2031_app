# Estrategia 2031 — Árbol estratégico interactivo

Aplicación web que muestra el árbol estratégico en sus cuatro niveles: **objetivo al 2031**,
**oportunidades**, **valor agregado** y **agendas institucionales**.

Hay dos cosas que se abren con un clic:

- **El nombre de un nivel** (Oportunidades, Valor agregado, Agendas institucionales) explica
  qué es ese tipo de agenda. Se reconoce por la pastilla con una **i** al lado.
- **Cada tarjeta** dice qué hará CAF al 2031 en ese frente y con qué indicador se le hace
  seguimiento.

Arriba a la derecha hay un **buscador de temas**: al escribir, por ejemplo, `agricultura`,
se encienden las tarjetas donde ese tema aparece y se apagan las demás.

No usa frameworks ni dependencias: es HTML, CSS y JavaScript. Se abre haciendo doble clic
en `index.html`.

## Enlace publicado

**https://jaimefajardo1989.github.io/Estrategia2031_app/**

> ⚠️ **El enlace es de acceso abierto.** Cualquiera que lo tenga puede entrar: GitHub Pages
> en plan gratuito no permite restringir el acceso. Lleva `noindex` y `robots.txt` para que
> no aparezca en buscadores, pero eso no lo hace privado. No pongas ahí información sensible.
>
> Si más adelante hace falta acceso restringido de verdad, la vía es Cloudflare Pages con
> Cloudflare Access (gratis hasta 50 usuarios, con lista de correos autorizados).

El sitio se actualiza solo: cada `git push` a `main` vuelve a publicarlo en un par de minutos.

### Importante al publicar cambios

Los archivos se enlazan con un número de versión (`css/estilos.css?v=7`). **Cada vez que
edites `css/estilos.css`, `js/contenido.js` o `js/app.js`, subí ese número en las tres
líneas de `index.html`.**

Si no lo hacés, quien ya visitó la página sigue viendo la versión anterior hasta que se le
venza la caché del navegador, y va a parecer que el cambio no se aplicó. Para forzar la
recarga en tu propio navegador: **Cmd + Shift + R**.

## Cómo abrirla localmente

Doble clic en `index.html`. Se abre en el navegador y funciona sin internet.

Si preferís servirla localmente (recomendado si más adelante se agregan archivos de datos):

```bash
cd ~/Desktop/ClaudeCode/Estrategia2031_app && python3 -m http.server 8765
```

Después entrá a `http://localhost:8765`.

## Cómo cambiar los textos

Todo el contenido vive en un solo archivo: **`js/contenido.js`**. No hace falta tocar nada más.

Abrilo con cualquier editor de texto y modificá lo que está entre comillas. Cada tarjeta
se ve así:

```js
{
  id: 'agenda-talento',              // se usa en el enlace: .../#agenda-talento
  titulo: 'Lo que se lee en la tarjeta',
  detalle: {
    resumen: 'Frase de entrada, debajo del título.',
    secciones: [                      // podés poner las que quieras
      { titulo: 'Qué haremos al 2031', texto: 'Párrafo.' },
    ],
    indicador: {                      // OPCIONAL: si no aplica, borrá este bloque
      nombre: 'Nombre del indicador',
      descripcion: 'Qué mide y cómo se calcula.',
      meta: 'Línea base 2025: X — Meta 2031: Y',
    },
  },
},
```

Cada **nivel** tiene su propio bloque `detalle`, con la misma forma. Ese es el texto que se
abre al hacer clic en el nombre del nivel, y es donde se explica qué es ese tipo de agenda.

Dos cuidados: no borres las comas al final de cada línea, y si un texto lleva apóstrofe
escribilo como `\'`.

### Las barras de avance

Cada indicador puede mostrar una barra con cuánto se recorrió entre la línea base y la
meta 2031. Se activa agregando un bloque `grafico` dentro de `indicador`:

```js
grafico: {
  unidad: 'US$ miles de millones',
  desde: { etiqueta: '2025', valor: 32.5 },      // punto de partida
  hoy:   { etiqueta: '2026', valor: 34.8 },      // OPCIONAL: dónde estamos hoy
  hasta: { etiqueta: 'Meta 2031', valor: 52 },   // a dónde queremos llegar
},
```

Funciona igual para indicadores que **suben** (cartera, aprobaciones) y para los que
**bajan** (días de respuesta, costo administrativo): si `hasta` es menor que `desde`, la
barra lo detecta sola y sigue midiendo el avance hacia la meta.

Los decimales se escriben con punto (`32.5`) y se muestran con coma (`32,5`). Si una
tarjeta no necesita barra, borrá su bloque `grafico`.

El **objetivo al 2031** tiene además un bloque `metricas` con los indicadores de toda la
estrategia —cartera total, aprobaciones acumuladas, financiamiento verde, recursos
movilizados—, con el mismo formato.

> ⚠️ **Las cifras actuales son inventadas, puestas solo para que se vea cómo queda.**
> Mientras `datosDeEjemplo: true`, el panel del objetivo muestra el aviso
> "Datos de ejemplo". Cambialo a `false` recién cuando las cifras sean las reales.

Un detalle de diseño: la barra se rellena con el tono **oscuro** del color de cada nivel,
no con el claro del árbol. Los tonos claros no alcanzan el mínimo de contraste de 3:1
sobre blanco —el amarillo queda en 1,6:1— y la barra sería prácticamente invisible.

### El buscador

Cada tarjeta tiene un campo `temas` con las palabras por las que querés que se encienda:

```js
temas: 'agricultura agua bosques biodiversidad clima adaptación …',
```

El buscador mira el título, todos los textos **y** ese campo. Sirve para agregar sinónimos
que no están escritos en el contenido: por ejemplo, la tarjeta Ambiental se enciende al
buscar `agricultura` aunque esa palabra no aparezca en su párrafo.

Detalles de cómo busca: no distingue mayúsculas ni acentos (`energia` encuentra
`Energética`), y si escribís varias palabras exige que estén todas.

### El sello "Borrador"

Mientras los textos no estén validados, el panel muestra un sello **Borrador**. Cuando el
contenido esté aprobado, poné `marcarBorrador: false` en el bloque `meta` de
`js/contenido.js` y el sello desaparece.

### Agregar o quitar tarjetas clickeables

Cualquier elemento que tenga un bloque `detalle` se vuelve clickeable solo, y entra
automáticamente en la navegación Anterior / Siguiente. Si le sacás el `detalle`, deja de
ser clickeable. No hay que tocar código en ningún caso.

## Cómo se usa

- **Clic** en cualquier tarjeta, o en el nombre de un nivel, abre el detalle.
- **Escribí un tema** en el buscador y se encienden las tarjetas donde aparece.
- **Anterior / Siguiente** recorre los 19 paneles en orden, sin cerrar.
- **Flechas ← →** del teclado hacen lo mismo.
- **Esc**, clic afuera, o el botón ✕ cierran el panel.
- El panel toma el color del nivel que se está viendo.
- La tarjeta abierta queda en la dirección (`.../#oportunidad-digital`), así que el enlace
  se puede compartir o guardar y abre directo ahí.

Funciona en computadora, tablet y celular. En pantallas chicas el panel sube desde abajo.
Es navegable por teclado y respeta la preferencia del sistema de reducir animaciones.

## Estructura

```
index.html          Estructura de la página
css/estilos.css     Estilos, colores y animaciones
js/contenido.js     👈 TEXTOS — es el único archivo que se edita normalmente
js/app.js           Lógica: dibuja el árbol y maneja el panel
```

## Estado

Todos los textos son preliminares y están pendientes de validación institucional; por eso
el panel muestra el sello **Borrador**.

Los indicadores están redactados como **propuestas**: el nombre y la descripción indican
qué debería medir cada uno, pero ninguno está validado. **Todas las cifras de las barras
son inventadas** y existen solo para mostrar el formato.

Para dejarlo listo hace falta, en [js/contenido.js](js/contenido.js):

1. Validar los textos y poner `marcarBorrador: false`.
2. Reemplazar cada `grafico` por la línea base, el valor actual y la meta reales, y poner
   `datosDeEjemplo: false`.
