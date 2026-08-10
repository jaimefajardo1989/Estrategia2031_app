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
  const cuerpoPanel = document.getElementById('panel-cuerpo');
  const botonCerrar = document.getElementById('panel-cerrar');
  const botonAnterior = document.getElementById('nav-anterior');
  const botonSiguiente = document.getElementById('nav-siguiente');
  const etiquetaPanel = document.getElementById('panel-etiqueta');
  const selloPanel = document.getElementById('panel-sello');
  const posicionPanel = document.getElementById('nav-posicion');

  // Lista plana de todas las tarjetas con detalle, en orden de lectura.
  // Es lo que recorren los botones Anterior / Siguiente.
  const navegables = [];

  let focoPrevio = null;
  let idAbierto = null;

  // --- Dibujar el árbol -------------------------------------------------

  function dibujarArbol() {
    document.getElementById('app-titulo').textContent = ESTRATEGIA.meta.titulo;
    document.getElementById('app-subtitulo').textContent = ESTRATEGIA.meta.subtitulo;
    document.getElementById('app-ayuda').textContent = ESTRATEGIA.meta.ayuda;
    document.getElementById('app-pie').textContent = ESTRATEGIA.meta.pieDePagina;
    document.title = ESTRATEGIA.meta.titulo + ' — Árbol estratégico';

    let retrasoTarjeta = 0.18; // segundos; se acumula para escalonar la entrada

    ESTRATEGIA.niveles.forEach(function (nivel, indiceNivel) {
      const fila = document.createElement('section');
      fila.className = 'nivel';
      fila.dataset.nivel = nivel.id;

      const etiqueta = document.createElement('h2');
      etiqueta.className = 'nivel__etiqueta';
      etiqueta.textContent = nivel.etiqueta;
      etiqueta.style.setProperty('--retraso', indiceNivel * 0.14 + 's');
      fila.appendChild(etiqueta);

      const grupo = document.createElement('div');
      grupo.className =
        'grupo grupo--' + nivel.estilo + (nivel.segmentado ? ' grupo--segmentado' : '');

      nivel.elementos.forEach(function (elemento) {
        grupo.appendChild(crearTarjeta(elemento, nivel, retrasoTarjeta));
        retrasoTarjeta += 0.07;
      });
      retrasoTarjeta += 0.06; // respiro entre niveles

      fila.appendChild(grupo);
      arbol.appendChild(fila);
    });
  }

  function crearTarjeta(elemento, nivel, retraso) {
    const tieneDetalle = Boolean(elemento.detalle);
    // Si es clickeable usamos <button>: funciona con teclado y lectores de pantalla
    const tarjeta = document.createElement(tieneDetalle ? 'button' : 'div');

    tarjeta.className = 'tarjeta tarjeta--' + nivel.estilo;
    tarjeta.id = elemento.id;
    tarjeta.textContent = elemento.titulo;
    tarjeta.style.setProperty('--retraso', retraso.toFixed(2) + 's');

    if (tieneDetalle) {
      tarjeta.type = 'button';
      tarjeta.setAttribute('aria-haspopup', 'dialog');
      tarjeta.setAttribute('aria-expanded', 'false');
      tarjeta.addEventListener('click', function (evento) {
        dibujarOnda(tarjeta, evento);
        abrirDetalle(elemento.id);
      });

      navegables.push({
        id: elemento.id,
        titulo: elemento.titulo,
        detalle: elemento.detalle,
        nivelId: nivel.id,
        nivelEtiqueta: nivel.etiqueta,
        nivelDescripcion: nivel.descripcion,
      });
    }

    return tarjeta;
  }

  // Onda que sale del punto donde se hizo clic
  function dibujarOnda(tarjeta, evento) {
    const caja = tarjeta.getBoundingClientRect();
    const lado = Math.max(caja.width, caja.height);
    // Si el clic vino del teclado no hay coordenadas: sale del centro
    const x = evento.clientX ? evento.clientX - caja.left : caja.width / 2;
    const y = evento.clientY ? evento.clientY - caja.top : caja.height / 2;

    const onda = document.createElement('span');
    onda.className = 'onda';
    onda.style.width = onda.style.height = lado + 'px';
    onda.style.left = x - lado / 2 + 'px';
    onda.style.top = y - lado / 2 + 'px';

    tarjeta.appendChild(onda);
    window.setTimeout(function () {
      onda.remove();
    }, 640);
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
    if (esPrimeraApertura) focoPrevio = document.activeElement;

    idAbierto = id;
    llenarPanel(navegables[indice], indice);
    marcarTarjetaActiva(id);

    if (esPrimeraApertura) {
      panel.hidden = false;
      fondoPanel.hidden = false;
      // Un frame de espera para que se vea la transición de entrada
      requestAnimationFrame(function () {
        panel.classList.add('panel--abierto');
        fondoPanel.classList.add('fondo-panel--visible');
      });
      arbol.classList.add('arbol--enfocado');
      document.body.classList.add('con-panel');
      botonCerrar.focus();
    }

    // Deja la tarjeta abierta en la dirección: el enlace se puede compartir
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  }

  function llenarPanel(item, indice) {
    const d = item.detalle;

    panel.dataset.nivel = item.nivelId;
    etiquetaPanel.textContent = item.nivelEtiqueta;
    selloPanel.hidden = !ESTRATEGIA.meta.marcarBorrador;

    cuerpoPanel.textContent = '';
    const bloques = [];

    const titulo = document.createElement('h2');
    titulo.className = 'panel__titulo';
    titulo.id = 'panel-titulo';
    titulo.textContent = item.titulo;
    bloques.push(titulo);

    // Explicación de qué es el nivel al que pertenece esta tarjeta
    if (item.nivelDescripcion) {
      const contexto = document.createElement('p');
      contexto.className = 'panel__contexto';
      contexto.textContent = item.nivelDescripcion;
      bloques.push(contexto);
    }

    if (d.resumen) {
      const resumen = document.createElement('p');
      resumen.className = 'panel__resumen';
      resumen.textContent = d.resumen;
      bloques.push(resumen);
    }

    (d.secciones || []).forEach(function (seccion) {
      bloques.push(crearBloque(seccion.titulo, seccion.texto, '→'));
    });

    if (d.indicador) bloques.push(crearBloqueIndicador(d.indicador));

    // El índice --i escalona la animación de entrada de cada bloque
    bloques.forEach(function (bloque, i) {
      bloque.style.setProperty('--i', i);
      cuerpoPanel.appendChild(bloque);
    });

    posicionPanel.textContent = indice + 1 + ' de ' + navegables.length;
    botonAnterior.disabled = indice === 0;
    botonSiguiente.disabled = indice === navegables.length - 1;
    cuerpoPanel.scrollTop = 0;
  }

  function crearBloque(tituloTexto, cuerpoTexto, icono) {
    const seccion = document.createElement('section');
    seccion.className = 'bloque';

    const titulo = document.createElement('h3');
    titulo.className = 'bloque__titulo';

    const marca = document.createElement('span');
    marca.className = 'bloque__icono';
    marca.setAttribute('aria-hidden', 'true');
    marca.textContent = icono;
    titulo.appendChild(marca);
    titulo.appendChild(document.createTextNode(tituloTexto));

    const parrafo = document.createElement('p');
    parrafo.className = 'bloque__texto';
    parrafo.textContent = cuerpoTexto;

    seccion.appendChild(titulo);
    seccion.appendChild(parrafo);
    return seccion;
  }

  function crearBloqueIndicador(indicador) {
    const seccion = crearBloque('Indicador de seguimiento', indicador.descripcion, '◆');
    seccion.classList.add('bloque--indicador');

    const nombre = document.createElement('p');
    nombre.className = 'indicador__nombre';
    nombre.textContent = indicador.nombre;
    // El nombre va entre el encabezado y la descripción
    seccion.insertBefore(nombre, seccion.children[1]);

    if (indicador.meta) {
      const meta = document.createElement('p');
      meta.className = 'indicador__meta';
      meta.textContent = indicador.meta;
      seccion.appendChild(meta);
    }

    return seccion;
  }

  function marcarTarjetaActiva(id) {
    limpiarMarcas();

    const tarjeta = document.getElementById(id);
    if (!tarjeta) return;
    tarjeta.classList.add('tarjeta--activa');
    tarjeta.setAttribute('aria-expanded', 'true');

    const fila = tarjeta.closest('.nivel');
    if (fila) fila.classList.add('nivel--con-activa');
  }

  function limpiarMarcas() {
    document.querySelectorAll('.tarjeta--activa').forEach(function (t) {
      t.classList.remove('tarjeta--activa');
      t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.nivel--con-activa').forEach(function (n) {
      n.classList.remove('nivel--con-activa');
    });
  }

  function cerrarDetalle() {
    if (idAbierto === null) return;

    panel.classList.remove('panel--abierto');
    fondoPanel.classList.remove('fondo-panel--visible');
    arbol.classList.remove('arbol--enfocado');
    document.body.classList.remove('con-panel');

    const tarjeta = document.getElementById(idAbierto);
    idAbierto = null;
    limpiarMarcas();

    // Ocultar del todo recién cuando termina la animación de salida
    window.setTimeout(function () {
      if (idAbierto === null) {
        panel.hidden = true;
        fondoPanel.hidden = true;
      }
    }, 520);

    // El foco vuelve a la tarjeta que estaba abierta
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

  // Si la dirección trae una tarjeta (por ejemplo .../#oportunidad-digital), la abre sola
  const idInicial = window.location.hash.replace('#', '');
  if (idInicial && indiceDe(idInicial) !== -1) {
    window.setTimeout(function () {
      abrirDetalle(idInicial);
    }, 900);
  }
})();
