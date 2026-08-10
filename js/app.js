/**
 * Estrategia 2031 — lógica de la aplicación.
 *
 * Dibuja el árbol estratégico a partir de js/contenido.js, maneja el panel de
 * detalle y el buscador de temas. Normalmente no hace falta tocar este archivo:
 * para cambiar textos, editá js/contenido.js.
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

  const entradaBusqueda = document.getElementById('buscador');
  const botonLimpiar = document.getElementById('buscador-limpiar');
  const estadoBusqueda = document.getElementById('buscador-estado');
  const textoAyuda = document.getElementById('app-ayuda');

  /**
   * Todo lo que se puede abrir, en orden de lectura: la etiqueta de cada nivel
   * y después sus tarjetas. Es lo que recorren los botones Anterior/Siguiente
   * y también lo que revisa el buscador.
   */
  const abribles = [];

  let focoPrevio = null;
  let idAbierto = null;

  // --- Utilidades -------------------------------------------------------

  // Pasa a minúsculas y saca los acentos, para que "energetica" encuentre "Energética"
  function normalizar(texto) {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  // Junta todo el texto de un elemento en una sola cadena, para buscar dentro
  function armarIndice(item) {
    const partes = [item.titulo, item.temas, item.nivelEtiqueta];
    const d = item.detalle || {};
    partes.push(d.resumen);
    (d.secciones || []).forEach(function (s) {
      partes.push(s.titulo, s.texto);
    });
    if (d.indicador) {
      partes.push(d.indicador.nombre, d.indicador.descripcion, d.indicador.meta);
    }
    return normalizar(partes.filter(Boolean).join(' '));
  }

  // --- Dibujar el árbol -------------------------------------------------

  function dibujarArbol() {
    document.getElementById('app-titulo').textContent = ESTRATEGIA.meta.titulo;
    document.getElementById('app-subtitulo').textContent = ESTRATEGIA.meta.subtitulo;
    textoAyuda.textContent = ESTRATEGIA.meta.ayuda;
    document.getElementById('app-pie').textContent = ESTRATEGIA.meta.pieDePagina;
    entradaBusqueda.placeholder = ESTRATEGIA.meta.marcadorBusqueda;
    document.title = ESTRATEGIA.meta.titulo + ' — Árbol estratégico';

    let retraso = 0.18; // segundos; se acumula para escalonar la entrada

    ESTRATEGIA.niveles.forEach(function (nivel, indiceNivel) {
      const fila = document.createElement('section');
      fila.className = 'nivel';
      fila.dataset.nivel = nivel.id;

      fila.appendChild(crearEtiquetaNivel(nivel, indiceNivel * 0.14));

      const grupo = document.createElement('div');
      grupo.className =
        'grupo grupo--' + nivel.estilo + (nivel.segmentado ? ' grupo--segmentado' : '');

      nivel.elementos.forEach(function (elemento) {
        grupo.appendChild(crearTarjeta(elemento, nivel, retraso));
        retraso += 0.07;
      });
      retraso += 0.06; // respiro entre niveles

      fila.appendChild(grupo);
      arbol.appendChild(fila);
    });
  }

  /**
   * La etiqueta del nivel. Si el nivel trae "detalle", se dibuja como botón:
   * al hacerle clic explica qué es ese tipo de agenda.
   */
  function crearEtiquetaNivel(nivel, retraso) {
    const abrible = Boolean(nivel.detalle);
    const etiqueta = document.createElement(abrible ? 'button' : 'h2');

    etiqueta.className = 'nivel__etiqueta';
    etiqueta.style.setProperty('--retraso', retraso.toFixed(2) + 's');
    etiqueta.appendChild(document.createTextNode(nivel.etiqueta));

    if (!abrible) return etiqueta;

    const id = 'nivel-' + nivel.id;
    etiqueta.type = 'button';
    etiqueta.id = id;
    etiqueta.classList.add('nivel__etiqueta--abrible');
    etiqueta.setAttribute('aria-haspopup', 'dialog');
    etiqueta.setAttribute('aria-expanded', 'false');
    etiqueta.title = 'Ver qué es este tipo de agenda';

    const pista = document.createElement('span');
    pista.className = 'nivel__pista';
    pista.setAttribute('aria-hidden', 'true');
    pista.textContent = 'i';
    etiqueta.appendChild(pista);

    etiqueta.addEventListener('click', function () {
      abrirDetalle(id);
    });

    abribles.push({
      id: id,
      titulo: nivel.etiqueta,
      detalle: nivel.detalle,
      nivelId: nivel.id,
      nivelEtiqueta: nivel.etiqueta,
      esNivel: true,
    });

    return etiqueta;
  }

  function crearTarjeta(elemento, nivel, retraso) {
    const abrible = Boolean(elemento.detalle);
    // Si se puede abrir usamos <button>: funciona con teclado y lectores de pantalla
    const tarjeta = document.createElement(abrible ? 'button' : 'div');

    tarjeta.className = 'tarjeta tarjeta--' + nivel.estilo;
    tarjeta.id = elemento.id;
    tarjeta.textContent = elemento.titulo;
    tarjeta.style.setProperty('--retraso', retraso.toFixed(2) + 's');

    if (abrible) {
      tarjeta.type = 'button';
      tarjeta.setAttribute('aria-haspopup', 'dialog');
      tarjeta.setAttribute('aria-expanded', 'false');
      tarjeta.addEventListener('click', function (evento) {
        dibujarOnda(tarjeta, evento);
        abrirDetalle(elemento.id);
      });

      abribles.push({
        id: elemento.id,
        titulo: elemento.titulo,
        temas: elemento.temas,
        detalle: elemento.detalle,
        nivelId: nivel.id,
        nivelEtiqueta: nivel.etiqueta,
        esNivel: false,
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
    for (let i = 0; i < abribles.length; i++) {
      if (abribles[i].id === id) return i;
    }
    return -1;
  }

  function abrirDetalle(id) {
    const indice = indiceDe(id);
    if (indice === -1) return;

    const esPrimeraApertura = idAbierto === null;
    if (esPrimeraApertura) focoPrevio = document.activeElement;

    idAbierto = id;
    llenarPanel(abribles[indice], indice);
    marcarActivo(id);

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

    // Deja lo abierto en la dirección: el enlace se puede compartir
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  }

  function llenarPanel(item, indice) {
    const d = item.detalle;

    panel.dataset.nivel = item.nivelId;
    // En la etiqueta de un nivel el encabezado dice de qué se trata el panel
    etiquetaPanel.textContent = item.esNivel ? 'Qué es este nivel' : item.nivelEtiqueta;
    selloPanel.hidden = !ESTRATEGIA.meta.marcarBorrador;

    cuerpoPanel.textContent = '';
    const bloques = [];

    const titulo = document.createElement('h2');
    titulo.className = 'panel__titulo';
    titulo.id = 'panel-titulo';
    titulo.textContent = item.titulo;
    bloques.push(titulo);

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

    posicionPanel.textContent = indice + 1 + ' de ' + abribles.length;
    botonAnterior.disabled = indice === 0;
    botonSiguiente.disabled = indice === abribles.length - 1;
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

  function marcarActivo(id) {
    limpiarMarcas();

    const elemento = document.getElementById(id);
    if (!elemento) return;
    elemento.classList.add('es-activa');
    elemento.setAttribute('aria-expanded', 'true');

    const fila = elemento.closest('.nivel');
    if (fila) fila.classList.add('nivel--con-activa');
  }

  function limpiarMarcas() {
    document.querySelectorAll('.es-activa').forEach(function (e) {
      e.classList.remove('es-activa');
      e.setAttribute('aria-expanded', 'false');
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

    const elemento = document.getElementById(idAbierto);
    idAbierto = null;
    limpiarMarcas();

    // Ocultar del todo recién cuando termina la animación de salida
    window.setTimeout(function () {
      if (idAbierto === null) {
        panel.hidden = true;
        fondoPanel.hidden = true;
      }
    }, 520);

    // El foco vuelve a lo que estaba abierto
    const destino = elemento || (focoPrevio && document.contains(focoPrevio) ? focoPrevio : null);
    if (destino && destino.focus) destino.focus();
    focoPrevio = null;

    if (history.replaceState) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function mover(paso) {
    const indice = indiceDe(idAbierto);
    const siguiente = indice + paso;
    if (indice === -1 || siguiente < 0 || siguiente >= abribles.length) return;
    abrirDetalle(abribles[siguiente].id);
  }

  // --- Buscador ---------------------------------------------------------

  // Se arma una vez, al arrancar: id -> todo su texto normalizado
  const indiceBusqueda = [];

  function prepararBusqueda() {
    abribles.forEach(function (item) {
      // Las etiquetas de nivel no participan de la búsqueda: lo que se busca
      // son temas concretos, y esos viven en las tarjetas
      if (item.esNivel) return;
      indiceBusqueda.push({ id: item.id, texto: armarIndice(item) });
    });
  }

  function buscar(consulta) {
    const terminos = normalizar(consulta).split(/\s+/).filter(Boolean);

    if (terminos.length === 0 || normalizar(consulta).length < 2) {
      limpiarResaltado();
      return;
    }

    let encontrados = 0;
    indiceBusqueda.forEach(function (entrada) {
      // Tienen que estar todos los términos escritos, no alcanza con uno
      const coincide = terminos.every(function (t) {
        return entrada.texto.indexOf(t) !== -1;
      });
      const tarjeta = document.getElementById(entrada.id);
      if (!tarjeta) return;
      tarjeta.classList.toggle('tarjeta--hallada', coincide);
      tarjeta.classList.toggle('tarjeta--descartada', !coincide);
      if (coincide) encontrados++;
    });

    arbol.classList.add('arbol--buscando');
    botonLimpiar.hidden = false;
    mostrarEstado(encontrados, consulta.trim());
  }

  function mostrarEstado(encontrados, consulta) {
    estadoBusqueda.classList.add('buscador__estado--resultado');
    if (encontrados === 0) {
      estadoBusqueda.textContent = 'Sin coincidencias para «' + consulta + '»';
      estadoBusqueda.classList.add('buscador__estado--vacio');
    } else {
      estadoBusqueda.textContent =
        encontrados === 1 ? '1 tarjeta encontrada' : encontrados + ' tarjetas encontradas';
      estadoBusqueda.classList.remove('buscador__estado--vacio');
    }
  }

  function limpiarResaltado() {
    arbol.classList.remove('arbol--buscando');
    document.querySelectorAll('.tarjeta--hallada, .tarjeta--descartada').forEach(function (t) {
      t.classList.remove('tarjeta--hallada', 'tarjeta--descartada');
    });
    botonLimpiar.hidden = entradaBusqueda.value.length === 0;

    // Vuelve el texto de ayuda original
    estadoBusqueda.classList.remove('buscador__estado--resultado', 'buscador__estado--vacio');
    estadoBusqueda.textContent = '';
    const punto = document.createElement('span');
    punto.className = 'encabezado__punto';
    punto.setAttribute('aria-hidden', 'true');
    const texto = document.createElement('span');
    texto.id = 'app-ayuda';
    texto.textContent = ESTRATEGIA.meta.ayuda;
    estadoBusqueda.appendChild(punto);
    estadoBusqueda.appendChild(texto);
  }

  function limpiarBusqueda() {
    entradaBusqueda.value = '';
    botonLimpiar.hidden = true;
    limpiarResaltado();
    entradaBusqueda.focus();
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

  // Se espera a que la persona termine de escribir antes de filtrar
  let temporizador = null;
  entradaBusqueda.addEventListener('input', function () {
    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(function () {
      buscar(entradaBusqueda.value);
    }, 140);
  });

  entradaBusqueda.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && entradaBusqueda.value) {
      evento.stopPropagation();
      limpiarBusqueda();
    }
  });

  botonLimpiar.addEventListener('click', limpiarBusqueda);

  document.addEventListener('keydown', function (evento) {
    if (idAbierto === null) return;

    if (evento.key === 'Escape') {
      evento.preventDefault();
      cerrarDetalle();
      return;
    }

    // Las flechas navegan, salvo mientras se está escribiendo
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
  prepararBusqueda();

  // Si la dirección trae algo (por ejemplo .../#oportunidad-digital), lo abre solo
  const idInicial = window.location.hash.replace('#', '');
  if (idInicial && indiceDe(idInicial) !== -1) {
    window.setTimeout(function () {
      abrirDetalle(idInicial);
    }, 900);
  }
})();
