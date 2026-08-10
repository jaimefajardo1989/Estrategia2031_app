# Estrategia 2031 — Árbol estratégico interactivo

Aplicación web que muestra el árbol estratégico en sus cuatro niveles (objetivo al 2031,
fuerzas, valor agregado y agendas institucionales). Cada agenda institucional es clickeable
y abre un panel con **qué haremos al 2031** y su **indicador de seguimiento**.

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

Abrilo con cualquier editor de texto y modificá lo que está entre comillas. Por ejemplo,
para cambiar el compromiso de una agenda buscá su bloque y editá `queHaremos`:

```js
detalle: {
  resumen: 'Frase corta que aparece debajo del título.',
  queHaremos: 'Acá va el párrafo que describe qué haremos al 2031.',
  indicador: {
    nombre: 'Nombre del indicador',
    descripcion: 'Qué mide y cómo se calcula.',
    meta: 'Línea base 2025: X — Meta 2031: Y',
  },
},
```

Dos cuidados: no borres las comas al final de cada línea, y si un texto lleva apóstrofe
escribilo como `\'`.

Los textos actuales dicen **TEXTO PRELIMINAR** justamente para que se note que son de relleno
y hay que reemplazarlos.

### Hacer clickeable otro nivel

Cualquier elemento que tenga un bloque `detalle` se vuelve clickeable solo. Si mañana querés
que también se pueda hacer clic en una fuerza o en un valor agregado, copiá un bloque
`detalle` dentro de ese elemento en `js/contenido.js` y listo — no hay que tocar código.

## Cómo se usa

- **Clic** en cualquier agenda institucional abre el panel de detalle.
- **Anterior / Siguiente** pasa de una agenda a otra sin cerrar el panel.
- **Flechas ← →** del teclado hacen lo mismo.
- **Esc**, clic afuera, o el botón ✕ cierran el panel.
- La agenda abierta queda en la dirección (`.../#agenda-talento`), así que el enlace se puede
  compartir o guardar y abre directo en esa agenda.

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

Los textos de las tres agendas son preliminares y están pendientes de validación.
Los indicadores de seguimiento todavía no están definidos.
