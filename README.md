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
el panel muestra el sello **Borrador**. Los indicadores de seguimiento de las tres agendas
institucionales todavía no están definidos: falta el indicador, su línea base y su meta 2031.
