# Estrategia 2031 — Árbol estratégico interactivo

Aplicación web que muestra el árbol estratégico en sus cuatro niveles: **objetivo al 2031**,
**oportunidades**, **valor agregado** y **agendas institucionales**.

Las 16 tarjetas son clickeables y abren un panel lateral con el detalle. Según el nivel,
el panel muestra qué es esa tarjeta, qué significa el nivel al que pertenece y —en el caso
de las agendas institucionales— el compromiso al 2031 con su indicador de seguimiento.

No usa frameworks ni dependencias: es HTML, CSS y JavaScript. Se abre haciendo doble clic
en `index.html`.

## Cómo abrirla

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

Cada nivel tiene además un campo `descripcion` que explica qué es ese nivel. Ese texto
aparece en el recuadro gris del panel, en todas las tarjetas de ese nivel.

Dos cuidados: no borres las comas al final de cada línea, y si un texto lleva apóstrofe
escribilo como `\'`.

### El sello "Borrador"

Mientras los textos no estén validados, el panel muestra un sello **Borrador**. Cuando el
contenido esté aprobado, poné `marcarBorrador: false` en el bloque `meta` de
`js/contenido.js` y el sello desaparece.

### Agregar o quitar tarjetas clickeables

Cualquier elemento que tenga un bloque `detalle` se vuelve clickeable solo, y entra
automáticamente en la navegación Anterior / Siguiente. Si le sacás el `detalle`, deja de
ser clickeable. No hay que tocar código en ningún caso.

## Cómo se usa

- **Clic** en cualquier tarjeta —de cualquiera de los cuatro niveles— abre el detalle.
- **Anterior / Siguiente** recorre las 16 tarjetas en orden, sin cerrar el panel.
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
