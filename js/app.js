/**
 * Estrategia 2031 — lógica de la aplicación.
 *
 * Dibuja el árbol estratégico a partir de js/contenido.js y maneja el panel
 * de detalle. Normalmente no hace falta tocar este archivo: para cambiar
 * textos, editá js/contenido.js.
 */
(function () {
  'use strict';

  // --- Referencias al HTML ---------------------------------------------

  const arbol = document.getElementById('arbol');
  const panel = document.getElementById('panel');
  const fondoPanel = document.getElementById('fondo-panel');
  const botonCerrar = document.getElementById('panel-cerrar');
  const botonAnterior = document.getElementById('nav-anterior');
  const botonSiguiente = document.getElementById('nav-siguiente');
  const cuerpoPanel = document.getElementById('panel-cuerpo');

  const campos = {
    etiqueta: document.getElementById('panel-etiqueta'),
    titulo: document.getElementById('panel-titulo'),
    resumen: document.getElementById('panel-resumen'),
    queHaremos: document.getElementById('panel-quehacemos'),
    indicadorNombre: document.getElementById('panel-indicador-nombre'),
    indicadorDesc: document.getElementById('panel-indicador-desc'),
    indicadorMeta: document.getElementById('panel-indicador-meta'),
    posicion: document.getElementById('nav-posicion'),
  };

  // Lista plana de todos los elementos que tienen detalle (hoy, las agendas).
  // Sirve para los botones Anterior / Siguiente.
  const navegables = [];

  // Elemento que tenía el foco antes de abrir el panel, para devolverlo al cerrar.
  let focoPrevio = null;
  let idAbierto = null;

  // --- Dibujar el árbol -------------------------------------------------

  function dibujarArbol() {
    document.getElementById('app-titulo').textContent = ESTRATEGIA.meta.titulo;
    document.getElementById('app-subtitulo').textContent = ESTRATEGIA.meta.subtitulo;
    document.getElementById('app-pie').textContent = ESTRATEGIA.meta.pieDePagina;
    document.title = ESTRATEGIA.meta.titulo + ' — Árbol estratégico';

    ESTRATEGIA.niveles.forEach(function (nivel, indiceNivel) {
      const fila = document.createElement('section');
      fila.className = 'nivel';
      fila.dataset.nivel = nivel.id;
      // Cada fila entra un poco después que la anterior
      fila.style.setProperty('--retraso', indiceNivel * 0.12 + 's');

      const etiqueta = document.createElement('h2');
      etiqueta.className = 'nivel__etiqueta';
      etiqueta.textContent = nivel.etiqueta;
      fila.appendChild(etiqueta);

      const grupo = document.createElement('div');
      grupo.className = 'grupo grupo--' + nivel.estilo + (nivel.segmentado ? ' grupo--segmentado' : '');

      nivel.elementos.forEach(function (elemento) {
        grupo.appendChild(crearTarjeta(elemento, nivel));
      });

      fila.appendChild(grupo);
      arbol.appendChild(fila);
    });
  }

  function crearTarjeta(elemento, nivel) {
    const tieneDetalle = Boolean(elemento.detalle);
    // Si es clickeable usamos <button> para que funcione con teclado y lectores de pantalla
    const tarjeta = document.createElement(tieneDetalle ? 'button' : 'div');

    tarjeta.className = 'tarjeta tarjeta--' + nivel.estilo;
    tarjeta.id = elemento.id;
    tarjeta.textContent = elemento.titulo;

    if (tieneDetalle) {
      tarjeta.type = 'button';
      tarjeta.classList.add('tarjeta--clickeable');
      tarjeta.setAttribute('aria-haspopup', 'dialog');
      tarjeta.setAttribute('aria-expanded', 'false');
      tarjeta.addEventListener('click', function () {
        abrirDetalle(elemento.id);
      });

      navegables.push({
        id: elemento.id,
        titulo: elemento.titulo,
        detalle: elemento.detalle,
        etiquetaNivel: nivel.etiqueta,
      });
    }

    return tarjeta;
  }

  // --- Panel de detalle -------------------------------------------------

  function indiceDe(id) {
    for (let i = 0; i < navegables.length; i++) {
      if (navegables[i].id === id) return i;
    }
    return -1;
  }

  function abrirDetalle(id) {
    const indice = indiceDe(id);
    if (indice === -1) return;

    const esPrimeraApertura = idAbierto === null;
    if (esPrimeraApertura) {
      focoPrevio = document.activeElement;
    }

    idAbierto = id;
    llenarPanel(navegables[indice], indice);
    marcarTarjetaActiva(id);

    if (esPrimeraApertura) {
      panel.hidden = false;
      fondoPanel.hidden = false;
      // Un frame de espera para que la transición de entrada se vea
      requestAnimationFrame(function () {
        panel.classList.add('panel--abierto');
        fondoPanel.classList.add('fondo-panel--visible');
      });
      arbol.classList.add('arbol--enfocado');
      botonCerrar.focus();
    }

    // Deja la agenda abierta en la URL: se puede compartir o recargar el enlace
    if (history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function llenarPanel(item, indice) {
    const d = item.detalle;

    campos.etiqueta.textContent = item.etiquetaNivel;
    campos.titulo.textContent = item.titulo;
    campos.resumen.textContent = d.resumen;
    campos.queHaremos.textContent = d.queHaremos;
    campos.indicadorNombre.textContent = d.indicador.nombre;
    campos.indicadorDesc.textContent = d.indicador.descripcion;
    campos.indicadorMeta.textContent = d.indicador.meta;

    campos.posicion.textContent = indice + 1 + ' de ' + navegables.length;
    botonAnterior.disabled = indice === 0;
    botonSiguiente.disabled = indice === navegables.length - 1;

    reiniciarAnimacion();
    cuerpoPanel.scrollTop = 0;
  }

  // Vuelve a lanzar la animación de entrada del contenido al cambiar de agenda
  function reiniciarAnimacion() {
    Array.prototype.forEach.call(cuerpoPanel.children, function (hijo) {
      hijo.style.animation = 'none';
      void hijo.offsetHeight; // fuerza el redibujado
      hijo.style.animation = '';
    });
  }

  function marcarTarjetaActiva(id) {
    document.querySelectorAll('.tarjeta--activa').forEach(function (t) {
      t.classList.remove('tarjeta--activa');
      t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.nivel--con-activa').forEach(function (n) {
      n.classList.remove('nivel--con-activa');
    });

    const tarjeta = document.getElementById(id);
    if (!tarjeta) return;
    tarjeta.classList.add('tarjeta--activa');
    tarjeta.setAttribute('aria-expanded', 'true');
    const fila = tarjeta.closest('.nivel');
    if (fila) fila.classList.add('nivel--con-activa');
  }

  function cerrarDetalle() {
    if (idAbierto === null) return;

    panel.classList.remove('panel--abierto');
    fondoPanel.classList.remove('fondo-panel--visible');
    arbol.classList.remove('arbol--enfocado');

    const tarjeta = document.getElementById(idAbierto);
    idAbierto = null;

    document.querySelectorAll('.tarjeta--activa').forEach(function (t) {
      t.classList.remove('tarjeta--activa');
      t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.nivel--con-activa').forEach(function (n) {
      n.classList.remove('nivel--con-activa');
    });

    // Ocultar del todo recién cuando termina la animación de salida
    window.setTimeout(function () {
      if (idAbierto === null) {
        panel.hidden = true;
        fondoPanel.hidden = true;
      }
    }, 460);

    // El foco vuelve a la tarjeta que estaba abierta; si no existe, a donde estaba antes
    const destino = tarjeta || (focoPrevio && document.contains(focoPrevio) ? focoPrevio : null);
    if (destino && destino.focus) destino.focus();
    focoPrevio = null;

    if (history.replaceState) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function mover(paso) {
    const indice = indiceDe(idAbierto);
    const siguiente = indice + paso;
    if (indice === -1 || siguiente < 0 || siguiente >= navegables.length) return;
    abrirDetalle(navegables[siguiente].id);
  }

  // --- Eventos ----------------------------------------------------------

  botonCerrar.addEventListener('click', cerrarDetalle);
  fondoPanel.addEventListener('click', cerrarDetalle);
  botonAnterior.addEventListener('click', function () {
    mover(-1);
  });
  botonSiguiente.addEventListener('click', function () {
    mover(1);
  });

  document.addEventListener('keydown', function (evento) {
    if (idAbierto === null) return;

    if (evento.key === 'Escape') {
      evento.preventDefault();
      cerrarDetalle();
      return;
    }

    // Flechas para pasar de una agenda a otra, salvo si se está escribiendo
    const etiqueta = document.activeElement && document.activeElement.tagName;
    if (etiqueta === 'INPUT' || etiqueta === 'TEXTAREA') return;

    if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      mover(1);
    } else if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      mover(-1);
    }
  });

  // Mantiene el foco dentro del panel mientras está abierto
  panel.addEventListener('keydown', function (evento) {
    if (evento.key !== 'Tab') return;

    const enfocables = panel.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (enfocables.length === 0) return;

    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];

    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  });

  // --- Arranque ---------------------------------------------------------

  dibujarArbol();

  // Si la URL trae una agenda (por ejemplo .../#agenda-talento), la abre sola
  const idInicial = window.location.hash.replace('#', '');
  if (idInicial && indiceDe(idInicial) !== -1) {
    window.setTimeout(function () {
      abrirDetalle(idInicial);
    }, 700);
  }
})();
