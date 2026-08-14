/* ====================== RENDER ====================== */
const byId = id => DATA.find(d => d.id === id);
const esc = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

/* El objetivo lleva dentro de la frase sus tres atributos, cada uno pulsable.
   Antes eran tres tarjetas aparte debajo; ahora están donde se leen. */
(function(){
  const attrs = ['t-res','t-int','t-pro'].map(byId);
  /* Tonos oscuros de cada atributo: son los únicos que se leen sobre el
     verde de la tarjeta. Los claros del sitio quedan en 1,3 y 1,4 a 1. */
  const colores = ['#711d14','#4d3900','#2b430f'];
  let frase = esc(byId('obj').t);
  attrs.forEach((d,k)=>{
    frase = frase.replace(esc(d.t),
      '<button type="button" class="palabra palabra--enTarjeta" data-go="'+d.id+'"'
      + ' style="--c:'+colores[k]+'">' + esc(d.t) + '</button>');
  });
  document.querySelector('.goal').innerHTML =
    frase + '<button type="button" class="more" data-go="obj">Ver detalle →</button>';
})();

function makeCard(d, cls){
  const b = document.createElement('button');
  b.className = 'card ' + cls; b.dataset.id = d.id;
  b.innerHTML = '<span class="ttl">'+esc(d.t)+'</span>' + (d.sub ? '<span class="sub">'+esc(d.sub)+'</span>' : '') + '<span class="more">Ver detalle →</span>';
  return b;
}
DATA.filter(d=>d.lvl===2).forEach(d=>document.getElementById('forces').appendChild(makeCard(d,'force')));
DATA.filter(d=>d.lvl===3).forEach(d=>document.getElementById('valor').appendChild(makeCard(d,'seg')));
DATA.filter(d=>d.lvl===4).forEach(d=>document.getElementById('agendas').appendChild(makeCard(d,'seg')));

document.getElementById('trans').innerHTML = TRANS.map(t=>
 '<div class="tcard"><div class="ph"><img src="'+t.img+'" alt=""></div><div class="bd"><span class="lab">'+esc(t.lab)+'</span><p>'+esc(t.txt)+'</p></div></div>').join('');
document.getElementById('stats').innerHTML = STATS.map(s=>
 '<div class="stat '+s.c+'"><b>'+esc(s.n)+'</b><span>'+esc(s.d)+'</span></div>').join('');
document.getElementById('tl').innerHTML = TL.map(t=>
 '<div class="p'+(t.on?' on':'')+'"><b>'+esc(t.p)+'</b><span>'+esc(t.d)+'</span></div>').join('');

/* ---------- COLLAGE ---------- */
/* Cada pieza del collage lleva:
     mov = cómo se mueve para siempre (vuela, aletea, mece, flota)
     p   = profundidad para el paralaje, de 0 (al fondo) a 1 (al frente)
     e   = cuándo entra en escena, en segundos
     d   = desfase del movimiento, para que no se muevan todas a la vez

   La escena se arma por capas: primero el fondo, después los árboles y
   los pastos, luego las personas y al final los pájaros.               */
const COLLAGE = [
  {s:IMG.wash_teal, l:'-2%', b:'-6%', h:'62%', o:.5, z:0, p:.05, e:.05},
  {s:IMG.tree_b,    l:'50%', b:'0',   h:'96%', z:2, mov:'mece', p:.2, e:.20, d:0},
  {s:IMG.tree_a,    l:'70%', b:'0',   h:'82%', z:1, mov:'mece', p:.15, e:.30, d:1.4},
  {s:IMG.grass_tall,l:'40%', b:'0',   h:'46%', z:2, mov:'mece', p:.3, e:.40, d:.7},
  {s:IMG.pampas,    l:'88%', b:'0',   h:'52%', z:1, mov:'mece', p:.25, e:.48, d:2.1},
  {s:IMG.grass,     l:'30%', b:'0',   h:'26%', z:3, mov:'mece', p:.4, e:.56, d:1.1},
  {s:IMG.grass,     l:'63%', b:'0',   h:'22%', z:3, mov:'mece', p:.4, e:.62, d:2.6},
  {s:IMG.p_walk,    l:'6%',  b:'0',   h:'72%', z:3, p:.5, e:.78},
  {s:IMG.p_skate,   l:'21%', b:'0',   h:'68%', z:3, p:.5, e:.88},
  // La toma está cortada al pecho, así que a igual altura se ve más grande que
  // una figura de cuerpo entero. Va más chica para que la escala cuadre.
  {s:IMG.p_ninos, v:VID.ninos, l:'79%', b:'0', h:'40%', z:3, p:.55, e:.98},
  // El flamenco es un ave de suelo: va parado, sin movimiento propio de vuelo.
  // Se ubica en el claro entre los estudiantes y el pasto alto, para que no
  // quede tapado por el árbol rojo.
  {s:IMG.flamingo, v:VID.flamenco, l:'34%', b:'0', h:'42%', z:3, p:.45, e:1.05},
  // v = video con fondo transparente; s queda como respaldo estático
  {s:IMG.hummingbird, v:VID.ave, l:'88%', b:'62%', h:'19%', z:4, mov:'aletea', p:.85, e:1.34, d:.5},
  {s:IMG.hummingbird, v:VID.colibri, l:'15%', b:'64%', h:'14%', z:4, mov:'aletea', p:.9, e:1.46, d:1.2},
  {s:IMG.dots_yellow,l:'44%',b:'46%', h:'12%', o:.85, z:1, mov:'flota', p:.35, e:.66, d:.4},
  {s:IMG.dots_coral, l:'2%', b:'34%', h:'11%', o:.8,  z:1, mov:'flota', p:.3, e:.72, d:1.8},
  {s:IMG.squig_yellow,l:'12%',b:'2%', h:'13%', o:.95, z:0, mov:'flota', p:.2, e:.36, d:1}
];
// Con "reducir movimiento" activado no se cargan los videos: va la imagen fija
const SIN_MOVIMIENTO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Cómo se muestran los animales según el navegador.
 *
 *   Chrome, Firefox, Edge  ->  video WebM VP9 con alfa. Es lo más liviano.
 *   Safari y todo iPhone   ->  WebP animado, que es una imagen.
 *
 * Por qué la diferencia: WebKit reproduce WebM pero ignora su canal alfa, así
 * que mostraría el recuadro gris del fondo original. La alternativa era HEVC
 * con alfa, que Safari de escritorio sí muestra, pero el iPhone no lo puede
 * decodificar: devuelve error 3 y no aparece nada. Comprobado en un iPhone
 * real con el diagnóstico de esta misma página.
 *
 * El WebP animado esquiva el problema entero: al ser una imagen no pasa por
 * el decodificador de video ni por las reglas de reproducción automática, así
 * que también anda con el modo de bajo consumo activado. Pesa algo más que el
 * video, y ese es el precio de que funcione.
 */
const ua = navigator.userAgent;

// Se descarta por motor, no por plataforma. Mirar navigator.platform o los
// puntos táctiles da falsos positivos: un Mac con pantalla táctil, o un
// navegador emulando un teléfono, se hacen pasar por iPad.
const esChromium = /Chrome|Chromium|Edg|OPR/.test(ua);   // en iOS se llaman CriOS, EdgiOS…
const esFirefox  = /Firefox/.test(ua);                   // en iOS se llama FxiOS
// Lo que queda es WebKit: Safari de escritorio y todos los navegadores de
// iPhone y iPad, que por política de Apple usan el mismo motor.
const USA_ANIMADO = !esChromium && !esFirefox;

function fuentesVideo(base){
  return '<source src="' + base + '.webm" type="video/webm">';
}

/**
 * Crea una pieza del collage. Si trae "v" se usa un video con fondo
 * transparente; si no, la imagen de siempre.
 */
function crearPiezaCollage(c){
  const anima = c.v && !SIN_MOVIMIENTO;
  const usarVideo = anima && !USA_ANIMADO;
  const el = document.createElement(usarVideo ? 'video' : 'img');

  if(anima && !usarVideo){
    // WebKit: imagen animada. Si no carga, queda la fija.
    el.src = c.v + '_anim.webp';
    el.alt = '';
    el.onerror = () => { el.onerror = null; el.src = c.s; };
  } else if(usarVideo){
    el.poster = c.s;          // se ve la imagen mientras carga el video
    el.autoplay = true; el.loop = true; el.muted = true;
    el.playsInline = true;
    el.setAttribute('playsinline','');   // hace falta explícito en iOS
    el.setAttribute('muted','');
    el.setAttribute('aria-hidden','true');
    el.disablePictureInPicture = true;
    el.preload = 'auto';
    el.dataset.fija = c.s;    // a dónde volver si el video no se puede mostrar
    el.innerHTML = fuentesVideo(c.v);
  } else {
    el.src = c.s; el.alt = '';
  }

  el.className = 'pieza' + (usarVideo ? ' pieza--video' : '') + (c.mov ? ' mov-' + c.mov : '');
  el.style.cssText = 'left:'+c.l+';bottom:'+c.b+';height:'+c.h+';width:auto;max-width:none;z-index:'+(c.z||1)+';opacity:'+(c.o||1);
  el.style.setProperty('--de', (c.e||0) + 's');
  el.style.setProperty('--d', (c.d||0) + 's');
  el.dataset.p = c.p || 0;
  return el;
}

const col = document.getElementById('collage');
col.insertAdjacentHTML('beforeend','<div class="sun" style="left:58%;bottom:24%;width:clamp(140px,19vw,250px);aspect-ratio:1;z-index:0;--de:.12s"></div>');
COLLAGE.forEach(c=>col.appendChild(crearPiezaCollage(c)));
col.insertAdjacentHTML('beforeend','<div class="ground"></div>');

/* ---------- META DE CADA AGENDA ---------- */

/* useGrouping en "always": por defecto el español no separa los millares de
   cuatro cifras, y quedaba "4489" al lado de "10.000". */
const fmt = new Intl.NumberFormat('es', { maximumFractionDigits: 1, useGrouping: 'always' });

/**
 * Marca dentro de un párrafo las palabras que ordenan la agenda.
 * El texto se escapa primero y recién después se mete la etiqueta, así que
 * el contenido sigue entrando como texto plano.
 *
 * Solo cambia la palabra completa: "conectar" se resalta, pero "conectividad",
 * que aparece en la misma frase, no.
 */
function resaltar(texto, palabras, color){
  let t = esc(texto);
  (palabras || []).forEach(p => {
    const re = new RegExp('(^|[^\\p{L}])(' + esc(p) + ')(?![\\p{L}])', 'giu');
    t = t.replace(re, '$1<b class="clave" style="--c:' + color + '">$2</b>');
  });
  return t;
}

/**
 * Dibuja la meta al 2031 como una barra entre el punto de partida y el
 * destino. Funciona igual si la meta es mayor que la base (cartera) o menor
 * (días de respuesta, costo): la barra siempre representa el recorrido total
 * y el número grande es el destino.
 *
 * Todos los valores van también como texto, así que la barra no esconde
 * ninguna información.
 */
/**
 * Cuenta un número desde cero hasta su valor, con frenada al final.
 * Reserva el ancho del número completo antes de empezar, para que la fila
 * no baile mientras las cifras crecen.
 */
function contarHasta(nodo, valor, pre, suf){
  const escribir = v => { nodo.textContent = (pre||'') + fmt.format(v) + (suf||''); };
  if (SIN_MOVIMIENTO){ escribir(valor); return; }
  nodo.style.minWidth = '';
  escribir(valor);
  nodo.style.minWidth = nodo.getBoundingClientRect().width + 'px';

  const dura = 1400, t0 = performance.now();
  (function paso(t){
    const p = Math.min(1, (t - t0) / dura);
    const suave = 1 - Math.pow(1 - p, 3);          // frena al acercarse
    escribir(valor <= 100 ? Math.round(valor*suave) : Math.round(valor*suave/10)*10);
    if (p < 1) requestAnimationFrame(paso); else escribir(valor);
  })(t0);
}

/**
 * Dibuja las metas al 2031 de una agenda que tiene varios indicadores.
 * Cada una es una cifra que cuenta desde cero, acompañada de una barra que se
 * llena o de un anillo que se dibuja, según convenga al indicador.
 *
 * La animación no se dispara al abrir el panel sino cuando el bloque entra en
 * pantalla: casi siempre queda por debajo del pliegue y, si no, nadie la vería.
 */
function pintarMetas(lista, color){
  const caja = document.getElementById('dr-meta-wrap');
  caja.style.display = '';
  caja.querySelector('h4').textContent = lista.length > 1 ? 'Las metas al 2031' : 'La meta al 2031';

  const R = 34, C = 2 * Math.PI * R;               // radio y perímetro del anillo
  document.getElementById('dr-meta').innerHTML =
    '<div class="metas" style="--c:' + color + '">' + lista.map((m,i) =>
      /* Dos columnas: el dato a la izquierda y el nombre a la derecha. Apilados
         la ficha se iba a 200 px de alto, y lo que la estiraba no era la cifra
         sino el nombre del indicador, que ocupa tres renglones. */
      '<div class="meta2" style="--i:' + i + '">'
      + '<div class="meta2-dato">'
      + (m.forma === 'anillo'
          ? '<div class="meta2-anillo"><svg viewBox="0 0 80 80" aria-hidden="true">'
            + '<circle class="pista" cx="40" cy="40" r="' + R + '"/>'
            + '<circle class="linea" cx="40" cy="40" r="' + R + '"'
            + ' style="stroke-dasharray:' + C.toFixed(1) + ';stroke-dashoffset:' + C.toFixed(1) + '"/>'
            + '</svg><b class="meta2-cifra" data-v="' + m.valor + '"></b></div>'
          : '<b class="meta2-cifra" data-v="' + m.valor + '"></b>'
            + '<span class="meta2-uni">' + esc(m.uni || '') + '</span>'
            + '<div class="meta2-raya"><i></i></div>')
      + '</div>'
      + '<div class="meta2-txt">'
      +   '<p class="meta2-nombre">' + esc(m.nombre) + '</p>'
      +   (m.forma === 'anillo'
            ? '<span class="meta2-uni meta2-uni--al-lado">' + esc(m.uni || '') + '</span>' : '')
      +   (m.detalle
            ? '<button type="button" class="meta2-mas" data-meta="' + i + '" aria-expanded="false">'
              + esc(m.detalle.boton || 'Ver el detalle') + '<span aria-hidden="true">▾</span></button>'
            : '')
      + '</div>'
      + (m.detalle ? '<div class="meta2-panel" id="meta-panel-' + i + '" hidden></div>' : '')
      + '</div>').join('') + '</div>';

  const bloque = document.getElementById('dr-meta');
  const fichas = Array.from(bloque.querySelectorAll('.meta2'));

  /* Se vigila cada ficha por separado y con un umbral bajo. Vigilando el
     bloque entero, como estaba antes, la primera ficha ya se veía completa y
     seguía invisible: había que bajar un tercio de los tres indicadores para
     que recién ahí aparecieran, y mientras tanto quedaba un hueco en blanco. */
  const ver = new IntersectionObserver((es, obs) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const i = fichas.indexOf(e.target);
      e.target.classList.add('va');
      const cifra = e.target.querySelector('.meta2-cifra');
      contarHasta(cifra, +cifra.dataset.v, lista[i].pre, lista[i].suf);
      const linea = e.target.querySelector('.linea');
      if (linea) linea.style.strokeDashoffset = (C * (1 - lista[i].valor/100)).toFixed(1);
    });
  }, { root: drawer.querySelector('.dr-body'), rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  fichas.forEach(f => ver.observe(f));
  // Si el panel se cierra antes de que las fichas lleguen a verse, el observer
  // muere con el próximo pintado; no hace falta desconectarlo a mano.

  METAS_VISIBLES = lista;
}

/* ---------- EL DETALLE DE CADA META ----------
   Cada indicador puede abrirse y mostrar algo que se dibuja solo. Son tres
   formas y cada una responde a lo que el indicador realmente dice. */

let METAS_VISIBLES = [];

/** Dos barras enfrentadas: de dónde venimos y a dónde vamos. */
function verComparar(d){
  const tope = Math.max.apply(null, d.barras.map(b=>b.v));
  return '<p class="mdet-t">' + esc(d.titulo) + '</p>'
    + '<div class="mdet-barras">' + d.barras.map(b =>
        '<div class="mdet-b' + (b.fuerte ? ' es-meta' : '') + '">'
        + '<span class="mdet-et">' + esc(b.et) + '</span>'
        + '<div class="mdet-canal"><i style="--w:' + (b.v/tope*100).toFixed(1) + '%"></i></div>'
        + '<b class="mdet-v">' + fmt.format(b.v) + '</b></div>').join('')
    + '</div><p class="mdet-uni">' + esc(d.uni || '') + '</p>'
    + '<p class="mdet-pie">' + esc(d.pie) + '</p>';
}

/** Dos círculos a escala real: cuánto acompaña cada dólar de asistencia. */
function verPalanca(d){
  // Lo que se compara es el área de cada círculo, así que el diámetro va por
  // la raíz: si no, 240 contra 10.000 se vería mucho más chico de lo que es.
  const chico = Math.sqrt(d.chico.v / d.grande.v) * 132;
  const globo = (px, v, et, cls) =>
    '<div class="mdet-globo ' + cls + '">'
    + '<span class="mdet-disco" style="--d:' + px.toFixed(0) + 'px"></span>'
    + '<b>' + fmt.format(v) + '</b><small>' + esc(et) + '</small></div>';
  return '<p class="mdet-t">' + esc(d.titulo) + '</p>'
    + '<div class="mdet-palanca">'
    +   globo(132, d.grande.v, d.grande.et, 'es-gr')
    +   globo(Math.max(14, chico), d.chico.v, d.chico.et, 'es-ch')
    + '</div>'
    + '<p class="mdet-pie">' + esc(d.pie) + '</p>';
}

/** El mapa de la región: los países se van encendiendo, uno tras otro. */
function verMapa(d){
  return '<p class="mdet-t">' + esc(d.titulo) + '</p>'
    + '<div class="mdet-mapa">' + MAPA_LAC
    +   '<span class="mdet-cuenta"><b>0</b> / <i></i> países</span></div>'
    + '<p class="mdet-pie">' + esc(d.pie) + '</p>';
}

/**
 * Enciende los países del mapa en desorden, llevando la cuenta al lado.
 * Solo se encienden los de la lista; el resto de la región queda dibujado en
 * gris, para que se vea dónde están los accionistas dentro del continente.
 */
function encenderMapa(caja, lista){
  const todos = Array.from(caja.querySelectorAll('svg path'));
  const marcados = lista && lista.length ? new Set(lista) : null;
  const paises = marcados
    ? todos.filter(p => marcados.has(p.dataset.p))
    : todos;
  todos.forEach(p => { if (marcados && !marcados.has(p.dataset.p)) p.classList.add('fuera'); });

  const cuenta = caja.querySelector('.mdet-cuenta b');
  caja.querySelector('.mdet-cuenta i').textContent = paises.length;
  if (SIN_MOVIMIENTO){
    paises.forEach(p=>p.classList.add('on'));
    cuenta.textContent = paises.length;
    return;
  }
  // Desordenados: encenderlos de norte a sur se leería como un barrido y la
  // idea es que la región se vaya poblando.
  for (let i = paises.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    const t = paises[i]; paises[i] = paises[j]; paises[j] = t;
  }
  paises.forEach((p,i) => window.setTimeout(()=>{
    p.classList.add('on');
    cuenta.textContent = i + 1;
  }, 220 + i*52));
}

/* Abrir y cerrar el detalle de un indicador */
document.addEventListener('click', e => {
  const b = e.target.closest('.meta2-mas');
  if (!b) return;
  const panel = document.getElementById('meta-panel-' + b.dataset.meta);
  const abierto = b.getAttribute('aria-expanded') === 'true';
  if (abierto){
    b.setAttribute('aria-expanded','false');
    panel.hidden = true; panel.innerHTML = '';
    return;
  }
  const d = (METAS_VISIBLES[+b.dataset.meta] || {}).detalle;
  if (!d) return;
  panel.innerHTML = d.tipo === 'mapa'     ? verMapa(d)
                  : d.tipo === 'palanca'  ? verPalanca(d)
                  :                         verComparar(d);
  panel.hidden = false;
  b.setAttribute('aria-expanded','true');
  // El dibujo arranca en el cuadro siguiente: si se pinta y se anima en el
  // mismo, el navegador junta los dos estados y no se ve la transición.
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    panel.classList.add('va');
    if (d.tipo === 'mapa') encenderMapa(panel, d.encender);
  }));
  panel.scrollIntoView({behavior:'smooth', block:'nearest'});
});

function pintarMeta(m, color){
  const caja = document.getElementById('dr-meta-wrap');
  if(!m){ caja.style.display = 'none'; return; }
  caja.style.display = '';
  caja.querySelector('h4').textContent = 'La meta al 2031';

  const baja = m.hasta.valor < m.desde.valor;
  document.getElementById('dr-meta').innerHTML =
      '<p class="meta-nombre">' + esc(m.nombre) + '</p>'
    + '<div class="meta-cifra"><b style="color:' + color + '">' + fmt.format(m.hasta.valor) + '</b>'
    + '<span>' + esc(m.unidad) + '</span></div>'
    + '<div class="meta-pista" style="--c:' + color + '"><i></i></div>'
    + '<div class="meta-pie">'
    +   '<span><small>' + esc(m.desde.etiqueta) + '</small><b>' + fmt.format(m.desde.valor) + '</b></span>'
    +   '<span class="meta-flecha" aria-hidden="true">' + (baja ? '↓' : '↑') + '</span>'
    +   '<span class="meta-fin"><small>' + esc(m.hasta.etiqueta) + '</small><b>' + fmt.format(m.hasta.valor) + '</b></span>'
    + '</div>';
}

/* ---------- DRAWER ---------- */
const drawer = document.getElementById('drawer'), scrim = document.getElementById('scrim');
let current = null, lastFocus = null;
const ORDER = DATA.map(d=>d.id);

function openCard(id, push){
  const d = byId(id); if(!d) return;
  if(!current) lastFocus = document.activeElement;
  current = id;
  const L = LEVELS[d.lvl];
  document.getElementById('dr-tag').textContent = L.name;
  document.getElementById('dr-tag').style.background = L.color;
  document.getElementById('dr-deco').src = L.deco;
  document.getElementById('dr-title').textContent = d.t;
  document.getElementById('dr-title').style.fontSize = d.t.length > 70 ? '20px' : '26px';
  document.getElementById('dr-lead').textContent = d.lead || '';
  document.getElementById('dr-what').innerHTML = resaltar(d.what || '', d.resalta, L.tono || L.color);
  document.getElementById('dr-acts').style.setProperty('--c', L.color);
  document.getElementById('dr-acts').innerHTML = (d.acts||[]).map(a=>'<li>'+esc(a)+'</li>').join('');
  const lw = document.getElementById('dr-links-wrap');
  const ls = (d.links||[]).map(byId).filter(Boolean);
  lw.style.display = ls.length ? '' : 'none';
  document.getElementById('dr-links').innerHTML = ls.map(x=>
    '<button class="lchip" data-go="'+x.id+'"><i style="background:'+LEVELS[x.lvl].color+'"></i>'+esc(x.t.length>44?x.t.slice(0,42)+'…':x.t)+'</button>').join('');
  // Aquí el color va en el texto y en trazos finos, no de relleno: por eso el
  // tono oscuro del nivel y no el de las tarjetas.
  if (d.metas && d.metas.length) pintarMetas(d.metas, L.tono || L.color);
  else pintarMeta(d.meta, L.color);
  // Las agendas ya validadas no llevan la advertencia de borrador.
  document.getElementById('dr-note').innerHTML = d.validado
    ? 'Texto e indicadores validados para esta agenda.'
    : 'Textos en borrador y cifras de ejemplo. Para editarlos, modifica el bloque <b>DATA</b> en <b>js/contenido.js</b>.';

  document.getElementById('dr-pos').textContent = (ORDER.indexOf(id)+1) + ' / ' + ORDER.length;
  document.getElementById('dr-prev').disabled = false;
  document.getElementById('dr-next').disabled = false;
  drawer.classList.add('on'); scrim.classList.add('on');
  drawer.querySelector('.dr-body').scrollTop = 0;
  drawer.focus();
  if(push !== false) history.replaceState(null,'','#'+id);
}
function closeCard(){
  drawer.classList.remove('on'); scrim.classList.remove('on'); current = null;
  history.replaceState(null,'','#arbol');
  if(lastFocus) lastFocus.focus();
}
function step(n){
  const i = ORDER.indexOf(current);
  openCard(ORDER[(i + n + ORDER.length) % ORDER.length]);
}
/**
 * Abre la explicación de un nivel completo: qué es ese tipo de agenda.
 * Se dispara desde el nombre de la fila, a la izquierda del mapa.
 */
function openLevel(lvl){
  const L = LEVELS[lvl]; if(!L || !L.explica) return;
  const e = L.explica;
  if(!current) lastFocus = document.activeElement;
  current = null;   // no es una tarjeta: Anterior/Siguiente no aplican

  document.getElementById('dr-tag').textContent = 'Qué es este nivel';
  document.getElementById('dr-tag').style.background = L.color;
  document.getElementById('dr-deco').src = L.deco;
  document.getElementById('dr-title').textContent = e.t;
  document.getElementById('dr-title').style.fontSize = '26px';
  document.getElementById('dr-lead').textContent = e.lead || '';
  document.getElementById('dr-what').textContent = e.what || '';
  document.getElementById('dr-acts').style.setProperty('--c', L.color);
  document.getElementById('dr-acts').innerHTML = (e.acts||[]).map(a=>'<li>'+esc(a)+'</li>').join('');
  document.getElementById('dr-note').innerHTML =
    'Textos en borrador. Para editarlos, modifica el bloque <b>LEVELS</b> en <b>js/contenido.js</b>.';

  // Las tarjetas de ese nivel quedan como accesos directos
  const ls = DATA.filter(d=>d.lvl===lvl);
  document.getElementById('dr-links-wrap').style.display = ls.length ? '' : 'none';
  document.getElementById('dr-links').innerHTML = ls.map(x=>
    '<button class="lchip" data-go="'+x.id+'"><i style="background:'+L.color+'"></i>'+esc(x.t.length>44?x.t.slice(0,42)+'…':x.t)+'</button>').join('');

  document.getElementById('dr-meta-wrap').style.display = 'none';
  document.getElementById('dr-pos').textContent = ls.length + (ls.length===1?' tarjeta':' tarjetas');
  document.getElementById('dr-prev').disabled = true;
  document.getElementById('dr-next').disabled = true;

  drawer.classList.add('on'); scrim.classList.add('on');
  drawer.querySelector('.dr-body').scrollTop = 0;
  drawer.focus();
}

document.addEventListener('click', e=>{
  const r = e.target.closest('.rlabel--abrible'); if(r){ openLevel(+r.dataset.nivel); return; }
  // Se mira primero [data-go]: las palabras del objetivo están dentro de una
  // tarjeta, y si se comprobara la tarjeta antes, abrirían siempre el objetivo.
  const g = e.target.closest('[data-go]'); if(g){ openCard(g.dataset.go); return; }
  const c = e.target.closest('.card'); if(c){ openCard(c.dataset.id); return; }
});
document.getElementById('dr-close').onclick = closeCard;
scrim.onclick = closeCard;
document.getElementById('dr-prev').onclick = ()=>step(-1);
document.getElementById('dr-next').onclick = ()=>step(1);

/* ---------- BUSCAR / FILTRAR ---------- */
const q = document.getElementById('q'), countEl = document.getElementById('count');
let activeLvl = 0;
// Quita acentos para que "energia" encuentre "Energética"
const norm = s => String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

function applyFilter(){
  const term = norm(q.value.trim());
  let n = 0;
  document.querySelectorAll('#tree .card').forEach(el=>{
    const d = byId(el.dataset.id);
    // "temas" agrega sinónimos que no están escritos en el texto visible,
    // por ejemplo "agricultura" en la tarjeta Ambiental
    const hay = norm(d.t+' '+(d.sub||'')+' '+(d.lead||'')+' '+(d.what||'')+' '+(d.acts||[]).join(' ')+' '+(d.temas||''));
    // Con varias palabras se exige que estén todas
    const okT = !term || term.split(/\s+/).every(w => hay.includes(w));
    const okL = !activeLvl || d.lvl === activeLvl;
    const ok = okT && okL;
    el.classList.toggle('dim', !ok);
    el.classList.toggle('hit', !!term && ok);
    if(ok) n++;
  });
  countEl.textContent = (term || activeLvl) ? n + ' de ' + DATA.length : '';
}
q.addEventListener('input', applyFilter);
document.getElementById('chips').addEventListener('click', e=>{
  const c = e.target.closest('.chip'); if(!c) return;
  const l = +c.dataset.l;
  activeLvl = (activeLvl === l) ? 0 : l;
  document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed', +x.dataset.l === activeLvl));
  applyFilter();
});

/* ---------- RECORRIDO GUIADO ---------- */
const tour = document.getElementById('tour'), tstage = document.getElementById('tstage');
let ti = 0;

/**
 * Ilustraciones de una lámina del recorrido. El --i escalona su entrada.
 * Si el elemento trae "v" se dibuja como video con fondo transparente,
 * salvo que el sistema pida reducir movimiento.
 */
function decoHTML(list){
  return list.map((d,i)=>{
    const est = '--i:' + i + ';' + d.st;
    if(d.v && !SIN_MOVIMIENTO){
      if(USA_ANIMADO){
        return '<img class="tdeco" style="'+est+'" src="'+d.v+'_anim.webp" alt=""'
          + ' onerror="this.onerror=null;this.src=\''+d.s+'\'">';
      }
      return '<video class="tdeco tdeco--video" style="'+est+'" poster="'+d.s+'" data-fija="'+d.s+'"'
        + ' autoplay loop muted playsinline aria-hidden="true" preload="auto">'
        + fuentesVideo(d.v) + '</video>';
    }
    return '<img class="tdeco" src="'+d.s+'" style="'+est+'" alt="">';
  }).join('');
}

/**
 * Rejilla en la que se puede hacer clic. Cada casilla muestra solo su título;
 * al pulsarla, la explicación aparece en el panel de abajo. Arranca con la
 * primera abierta, para que no quede un hueco vacío.
 * items = [{titulo, texto, color, textoColor}]
 */
function rejillaHTML(items, columnas){
  const casillas = items.map((it,k)=>
    '<button type="button" class="it" data-exp="'+k+'" aria-pressed="'+(k===0)+'"'
    + ' style="background:'+it.color+(it.textoColor?';color:'+it.textoColor:'')+'">'
    + esc(it.titulo) + '<span class="it-mas" aria-hidden="true">+</span></button>'
  ).join('');

  const paneles = items.map((it,k)=>
    '<div class="texp-uno'+(k===0?' on':'')+'" data-exp="'+k+'">'
    + '<b style="color:'+(it.textoColor && it.textoColor!=='#fff' ? it.textoColor : it.color)+'">'+esc(it.titulo)+'</b>'
    + '<p>'+esc(it.texto)+'</p></div>'
  ).join('');

  return '<div class="tgrid tgrid--clic" style="grid-template-columns:repeat('+columnas+',1fr)">'+casillas+'</div>'
    + '<div class="texp">'+paneles+'</div>';
}

function buildTour(){
  tstage.innerHTML = TOUR.map((s,i)=>{
    let inner = '';
    if(s.kind === 'cover'){
      inner = '<div class="inner"><div class="kick">CAF · Banco de Desarrollo de América Latina y el Caribe</div>'
        + '<h3 style="font-size:clamp(32px,5.2vw,64px);color:var(--green-d);max-width:min(620px,52%)"><em>Estrategia CAF</em> al 2031</h3>'
        + '<p style="font-size:clamp(18px,2.2vw,28px);font-weight:700;color:var(--teal-d)">por una región más resiliente, integrada y próspera</p>'
        + (s.p ? '<p class="tcover-texto">' + s.p + '</p>' : '')
        + '</div>'
        + decoHTML([
          {s:IMG.tree_b, st:'right:2%;bottom:-3%;height:54%;z-index:1'},
          {s:IMG.tree_a, st:'right:20%;bottom:-3%;height:40%;z-index:0;opacity:.95'},
          {s:IMG.p_skate, st:'right:37%;bottom:-1%;height:30%;z-index:2'},
          {s:IMG.macaw, v:VID.guacamaya, st:'right:12%;top:8%;height:16%;z-index:2'},
          {s:IMG.dots_yellow, st:'left:2%;bottom:8%;height:9%;opacity:.9'},
          {s:IMG.squig_teal, st:'right:2%;top:4%;height:9%;opacity:.9'}
        ]);
    } else if(s.kind === 'trans'){
      const colores = ['var(--green-d)','var(--yellow-d)','var(--teal-d)','var(--coral-d)'];
      inner = '<div class="inner"><div class="kick">Contexto</div><h3>Cuatro <em>transiciones</em> que abren oportunidades</h3>'
        + '<p class="tpista">Haz clic en cada transición para ver de qué se trata.</p>'
        + rejillaHTML(TRANS.map((t,k)=>({
            titulo: t.lab.replace('Transición ',''),
            texto: t.txt,
            color: colores[k]
          })), 4)
        + '</div>'
        + decoHTML([{s:IMG.hummingbird, v:VID.ave, st:'right:4%;top:6%;height:20%'},{s:IMG.dots_teal, st:'left:1%;bottom:6%;height:8%;opacity:.8'}]);
    } else if(s.kind === 'goal'){
      /* El objetivo y sus tres atributos en una sola lámina: las palabras
         resiliente, integrada y próspera van coloreadas dentro de la frase y
         se pueden pulsar para ver qué significa cada una. */
      const attrs = ['t-res','t-int','t-pro'].map(byId);
      /* Los mismos colores del resto del sitio. El coral va tal cual;
         el amarillo y el verde apenas oscurecidos, lo mínimo para que se
         lean sobre blanco: sin eso quedan en 1,8:1 y 2,4:1. */
      const colores = ['var(--coral-d)','#ba8d0c','#6fa234'];

      let frase = esc(byId('obj').t);
      attrs.forEach((d,k)=>{
        frase = frase.replace(esc(d.t),
          '<button type="button" class="palabra" data-exp="'+k+'"'
          + ' aria-pressed="'+(k===0)+'" style="--c:'+colores[k]+'">'
          + esc(d.t) + '</button>');
      });

      const paneles = attrs.map((d,k)=>
        '<div class="texp-uno'+(k===0?' on':'')+'" data-exp="'+k+'">'
        + '<b style="color:'+colores[k]+'">'+esc(d.t)+'</b>'
        + '<p>'+esc((d.lead||'') + ' ' + (d.what||''))+'</p></div>').join('');

      inner = '<div class="inner"><div class="kick">Objetivo al 2031</div>'
        + '<h3 class="objetivo">'+frase+'</h3>'
        + '<p class="tpista">Haz clic en cada palabra para ver qué significa.</p>'
        + '<div class="texp texp--objetivo">'+paneles+'</div></div>'
        + decoHTML([
          {s:IMG.p_girljump, v:VID.nina, st:'right:2%;bottom:0;height:46%;z-index:2'},
          {s:IMG.hummingbird2, v:VID.colibri, st:'right:30%;top:10%;height:14%'},
          {s:IMG.dots_green, st:'left:0;top:10%;height:9%;opacity:.85'},
          {s:IMG.squig_coral, st:'left:1%;bottom:8%;height:8%'}
        ]);
    } else if(s.kind === 'level'){
      const items = DATA.filter(d=>d.lvl===s.lvl);
      const bg = s.lvl===2?'var(--yellow)':(s.lvl===3?'var(--teal-d)':'var(--coral-d)');
      const fg = s.lvl===2?'#4A4322':'#fff';
      inner = '<div class="inner"><div class="kick">'+s.kick+'</div><h3>'+s.h+'</h3><p>'+s.p+'</p>'
        + '<p class="tpista">Haz clic en cada una para ver el detalle.</p>'
        + rejillaHTML(items.map(d=>({
            titulo: d.t,
            texto: (d.lead||'') + ' ' + (d.what||''),
            color: bg,
            textoColor: fg
          })), 3)
        + '</div>'
        + decoHTML(s.lvl===2
            ? [{s:IMG.butterfly_b, st:'right:4%;top:6%;height:11%'},{s:IMG.dots_yellow, st:'left:0;bottom:4%;height:8%;opacity:.8'}]
            : s.lvl===3
            ? [{s:IMG.hummingbird, v:VID.colibri, st:'right:2%;top:6%;height:13%'},{s:IMG.dots_teal, st:'left:0;bottom:4%;height:8%;opacity:.8'}]
            : [{s:IMG.flamingo, v:VID.flamenco, st:'right:4%;bottom:2%;height:38%'},{s:IMG.dots_coral, st:'left:0;bottom:4%;height:8%;opacity:.8'}]);
    } else if(s.kind === 'close'){
      inner = '<div class="inner"><h3 style="font-size:clamp(30px,4.6vw,56px);max-width:min(720px,64%)">CAF — <em>Banco Verde</em><br>de América Latina y el Caribe</h3>'
        + '<p style="margin-top:18px">Estrategia 2026–2031 · Dirección de Estrategia y Análisis Institucional</p></div>'
        + decoHTML([
          {s:IMG.tree_a, st:'right:3%;bottom:-3%;height:46%;z-index:1'},
          {s:IMG.p_wheelchair, st:'right:26%;bottom:3%;height:18%;z-index:2'},
          {s:IMG.flamingo, v:VID.flamenco, st:'left:1%;bottom:-2%;height:34%;z-index:2'},
          {s:IMG.macaw, v:VID.guacamaya, st:'left:22%;top:8%;height:15%'},
          {s:IMG.wash_teal, st:'left:0;bottom:0;height:46%;opacity:.35;z-index:0'}
        ]);
    } else {
      inner = '<div class="inner"><div class="kick">'+s.kick+'</div><h3>'+s.h+'</h3><p>'+s.p+'</p>'
        + (s.stats ? '<div class="tgrid" style="grid-template-columns:repeat(4,1fr);margin-top:28px">'
            + STATS.slice(0,4).map((x,k)=>'<div class="it" style="background:'+['var(--teal-d)','var(--green-d)','var(--yellow-d)','var(--coral-d)'][k]+'">'+esc(x.n)+'<small>'+esc(x.d)+'</small></div>').join('')
            + '</div>' : '')
        + '</div>'
        + decoHTML([{s:IMG.p_books, st:'right:5%;bottom:0;height:40%;opacity:.95'},{s:IMG.dots_coral, st:'left:0;top:12%;height:8%;opacity:.8'}]);
    }
    return '<div class="tslide" data-i="'+i+'">'+inner+'</div>';
  }).join('');
  document.getElementById('tdots').innerHTML = TOUR.map((s,i)=>'<button data-t="'+i+'" aria-label="Ir al paso '+(i+1)+'"></button>').join('');
}
function showT(n){
  ti = Math.max(0, Math.min(TOUR.length-1, n));
  tstage.querySelectorAll('.tslide').forEach((el,i)=>el.classList.toggle('on', i===ti));
  document.querySelectorAll('#tdots button').forEach((b,i)=>b.setAttribute('aria-current', i===ti));
  document.getElementById('tprog').style.width = ((ti+1)/TOUR.length*100)+'%';
}
function openTour(){ if(!tstage.children.length) buildTour(); tour.classList.add('on'); showT(0); tour.focus(); }
function closeTour(){ tour.classList.remove('on'); }
document.getElementById('btn-tour').onclick = openTour;
document.getElementById('btn-tour2').onclick = openTour;
document.getElementById('tclose').onclick = closeTour;
document.getElementById('tprev').onclick = ()=>showT(ti-1);
document.getElementById('tnext').onclick = ()=>showT(ti+1);
document.getElementById('tdots').addEventListener('click', e=>{ const b=e.target.closest('[data-t]'); if(b) showT(+b.dataset.t); });

/* Elementos que se pueden pulsar dentro del recorrido: las casillas de las
   rejillas y las palabras coloreadas del objetivo. En los dos casos el panel
   con la explicación es el .texp que está dentro de la misma lámina. */
tstage.addEventListener('click', e=>{
  const disparador = e.target.closest('.tgrid--clic .it, .palabra');
  if(!disparador) return;

  const lamina = disparador.closest('.tslide');
  const panel = lamina && lamina.querySelector('.texp');
  const k = disparador.dataset.exp;

  lamina.querySelectorAll('.tgrid--clic .it, .palabra')
        .forEach(b => b.setAttribute('aria-pressed', b === disparador));
  if(!panel) return;
  panel.querySelectorAll('.texp-uno').forEach(p => p.classList.toggle('on', p.dataset.exp === k));
});

document.addEventListener('keydown', e=>{
  if(tour.classList.contains('on')){
    if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();showT(ti+1);}
    if(e.key==='ArrowLeft'){e.preventDefault();showT(ti-1);}
    if(e.key==='Escape') closeTour();
    return;
  }
  if(drawer.classList.contains('on')){
    if(e.key==='Escape') closeCard();
    if(e.key==='ArrowRight') step(1);
    if(e.key==='ArrowLeft') step(-1);
  }
});

if(location.hash && byId(location.hash.slice(1))) openCard(location.hash.slice(1), false);

/* =========================================================
   CAPA DE ANIMACIONES
   Se agrega sobre la lógica base. No cambia qué se muestra,
   solo cómo aparece.
   ========================================================= */
(function(){
  'use strict';

  // Marca que el JS está activo. Si no carga, nada queda escondido.
  document.body.classList.add('js-anim');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Aparición por scroll ---------- */

  // Cada grupo se revela cuando entra en pantalla, con sus hijos escalonados.
  // Se incluyen los encabezados de sección, la barra de herramientas y el pie,
  // para que al bajar vaya apareciendo todo y no solo las tarjetas.
  // Ojo: nada de anidar un grupo dentro de otro. #chips va dentro de .toolbar,
  // así que se revela con ella y no aparece aquí.
  const grupos = [
    '#attrs', '#forces', '#valor', '#agendas', '#trans', '#stats', '#tl'
  ];
  document.querySelectorAll('.hero-in').forEach(e => grupos.push(e));
  document.querySelectorAll('.sec-head').forEach(e => grupos.push(e));
  document.querySelectorAll('.toolbar').forEach(e => grupos.push(e));
  document.querySelectorAll('footer.foot .wrap').forEach(e => grupos.push(e));

  grupos.forEach(sel => {
    const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (!el) return;
    el.setAttribute('data-revelar', '');
    Array.prototype.forEach.call(el.children, (hijo, i) => {
      hijo.style.setProperty('--i', i);
    });
  });

  // El objetivo es una tarjeta suelta: se revela él mismo, no sus hijos.
  // Marcar a su contenedor dejaría a #attrs anidado dentro de otro revelado.
  const meta = document.querySelector('.goal');
  if (meta) meta.setAttribute('data-revelar-uno', '');

  // Las etiquetas de fila entran una después de otra
  document.querySelectorAll('.row .rlabel').forEach((et, i) => {
    et.style.setProperty('--rd', (i * 0.12).toFixed(2) + 's');
  });

  if (reduce || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-revelar],[data-revelar-uno]').forEach(e => e.classList.add('visible'));
  } else {
    const vigia = new IntersectionObserver((entradas) => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        vigia.unobserve(e.target); // una sola vez
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    document.querySelectorAll('[data-revelar],[data-revelar-uno]').forEach(e => vigia.observe(e));
  }

  /* ---------- Onda al hacer clic en una tarjeta ---------- */

  document.addEventListener('click', function (evento) {
    const tarjeta = evento.target.closest('.card');
    if (!tarjeta || reduce) return;

    const caja = tarjeta.getBoundingClientRect();
    const lado = Math.max(caja.width, caja.height);
    // Si el clic vino del teclado no hay coordenadas: sale del centro
    const x = evento.clientX ? evento.clientX - caja.left : caja.width / 2;
    const y = evento.clientY ? evento.clientY - caja.top : caja.height / 2;

    const onda = document.createElement('span');
    onda.className = 'onda';
    onda.style.width = onda.style.height = lado + 'px';
    onda.style.left = (x - lado / 2) + 'px';
    onda.style.top = (y - lado / 2) + 'px';
    tarjeta.appendChild(onda);
    window.setTimeout(() => onda.remove(), 640);
  }, true);

  /* ---------- Marcar la tarjeta abierta ---------- */

  function marcarActiva() {
    const id = (location.hash || '').replace('#', '');
    document.querySelectorAll('.card.activa').forEach(c => c.classList.remove('activa'));
    const abierta = document.getElementById('drawer').classList.contains('on');
    if (!abierta || !id) return;
    const tarjeta = document.querySelector('.card[data-id="' + id + '"]');
    if (tarjeta) tarjeta.classList.add('activa');
  }

  // El panel cambia de estado sin avisar, así que observamos su clase
  new MutationObserver(marcarActiva).observe(document.getElementById('drawer'), {
    attributes: true, attributeFilter: ['class']
  });
  document.addEventListener('click', () => window.setTimeout(marcarActiva, 0), true);

  /* ---------- Escalonado del contenido del panel ---------- */

  function escalonarPanel() {
    const cabeza = document.querySelector('.dr-head');
    const cuerpo = document.querySelector('.dr-body');
    [cabeza, cuerpo].forEach(cont => {
      if (!cont) return;
      Array.prototype.forEach.call(cont.children, (hijo, i) => hijo.style.setProperty('--i', i));
    });
    document.querySelectorAll('.acts li').forEach((li, i) => li.style.setProperty('--i', i));
  }

  /**
   * Relanza la animación de entrada de los bloques del panel.
   * No tocamos la clase "on" del panel: eso cortaría su propia transición de
   * deslizamiento. Se reinicia la animación bloque por bloque.
   */
  function relanzarPanel() {
    escalonarPanel();
    if (reduce) return;
    document.querySelectorAll('.dr-head > *, .dr-body > *, .acts li').forEach(el => {
      el.style.animation = 'none';
      void el.offsetHeight; // fuerza el redibujado
      el.style.animation = '';
    });
  }

  // openCard hace varios cambios seguidos dentro del panel; se agrupan en uno
  const cuerpoPanel = document.querySelector('.dr-body');
  if (cuerpoPanel) {
    let pendiente = null;
    new MutationObserver(() => {
      window.clearTimeout(pendiente);
      pendiente = window.setTimeout(relanzarPanel, 0);
    }).observe(cuerpoPanel, { childList: true, subtree: true, characterData: true });
  }
  escalonarPanel();

  /* ---------- Escalonado de las diapositivas del recorrido ---------- */

  document.querySelectorAll('.tslide .inner').forEach(inner => {
    Array.prototype.forEach.call(inner.children, (hijo, i) => hijo.style.setProperty('--i', i));
  });
})();

/* =========================================================
   PARALAJE DE LA PORTADA
   Mueve cada pieza según su profundidad, con el mouse y con el
   scroll. Escribe --px/--py, que los keyframes ya tienen en cuenta,
   así el paralaje y el movimiento propio conviven sin pisarse.
   ========================================================= */
(function(){
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const escena = document.getElementById('collage');
  const hero = document.querySelector('.hero');
  if (!escena || !hero) return;

  const piezas = Array.prototype.slice.call(escena.querySelectorAll('.pieza'));
  const sol = escena.querySelector('.sun');
  if (sol) sol.dataset.p = 0.1;
  if (sol) piezas.push(sol);

  let mx = 0, my = 0;      // posición del mouse, de -1 a 1
  let scroll = 0;          // cuánto se bajó dentro de la portada
  let pendiente = false;

  function pintar(){
    pendiente = false;
    piezas.forEach(function(el){
      const p = parseFloat(el.dataset.p) || 0;
      const x = mx * p * 22;              // px
      const y = my * p * 14 + scroll * p * 26;
      el.style.setProperty('--px', x.toFixed(1) + 'px');
      el.style.setProperty('--py', y.toFixed(1) + 'px');
    });
  }

  function pedirPintado(){
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(pintar);
  }

  // El collage no recibe eventos (pointer-events:none), así que se escucha
  // sobre la portada entera
  hero.addEventListener('mousemove', function(e){
    const caja = hero.getBoundingClientRect();
    mx = ((e.clientX - caja.left) / caja.width - 0.5) * 2;
    my = ((e.clientY - caja.top) / caja.height - 0.5) * 2;
    pedirPintado();
  });

  hero.addEventListener('mouseleave', function(){
    mx = 0; my = 0;
    pedirPintado();
  });

  window.addEventListener('scroll', function(){
    const caja = hero.getBoundingClientRect();
    // 0 mientras la portada está arriba del todo, 1 cuando ya se fue
    scroll = Math.max(0, Math.min(1, -caja.top / Math.max(1, caja.height)));
    pedirPintado();
  }, { passive: true });

  pintar();
})();

/* =========================================================
   AVISO DE VERSIÓN NUEVA
   GitHub Pages sirve el HTML con max-age=600, así que durante diez
   minutos el navegador puede seguir mostrando la versión anterior aunque
   ya se haya publicado otra. Esto compara la versión cargada contra
   version.txt y, si hay una más nueva, recarga una sola vez con una
   dirección distinta, que es lo que obliga a bajar el HTML de nuevo.
   ========================================================= */
(function(){
  'use strict';

  const cargada = document.documentElement.dataset.version || '0';

  fetch('version.txt?_=' + Date.now(), { cache: 'no-store' })
    .then(r => r.ok ? r.text() : null)
    .then(txt => {
      if (!txt) return;
      const ultima = txt.trim();
      if (!ultima || ultima === cargada) return;

      // Una sola recarga por versión: si aun así no coincide, no insistimos
      if (sessionStorage.getItem('recargadoPara') === ultima) return;
      sessionStorage.setItem('recargadoPara', ultima);

      // El parámetro distinto es lo que fuerza a pedir el HTML de nuevo
      location.replace(location.pathname + '?v=' + ultima + location.hash);
    })
    .catch(() => {});
})();

/* =========================================================
   ARRANQUE DE LOS VIDEOS
   El atributo autoplay no siempre alcanza. En iPhone lo bloquean el modo
   de bajo consumo y el ahorro de datos, y algunos navegadores exigen que
   la reproducción empiece después de un gesto de la persona. Aquí se
   intenta arrancar cada video y, si no se puede, se reintenta con el
   primer toque en la pantalla.

   Si el video no arranca no se rompe nada: queda su imagen fija, que es
   el poster y también tiene fondo transparente.
   ========================================================= */
(function(){
  'use strict';

  const fallos = [];
  const reemplazados = [];

  /**
   * Si el video no se puede mostrar, se pone en su lugar la imagen fija.
   * Es la red de seguridad: pase lo que pase con el códec, el animal
   * aparece. Conserva la posición, el tamaño y la animación de la pieza.
   */
  function ponerImagenFija(v, motivo){
    if (!v.dataset.fija || !v.parentElement) return;
    const img = document.createElement('img');
    img.src = v.dataset.fija;
    img.alt = '';
    img.className = v.className.replace(' pieza--video', '').replace(' tdeco--video', '');
    img.style.cssText = v.style.cssText;
    if (v.dataset.p) img.dataset.p = v.dataset.p;
    v.parentElement.replaceChild(img, v);
    reemplazados.push({ archivo: (v.dataset.fija || '').split('/').pop(), motivo: motivo });
  }

  function intentar(v){
    if (!v.paused) return Promise.resolve();
    const p = v.play();
    if (!p || !p.catch) return Promise.resolve();
    return p.catch(err => {
      const nombre = err && err.name;
      fallos.push({ archivo: (v.currentSrc || '').split('/').pop(), motivo: nombre });
      // NotAllowedError es bloqueo de reproducción automática: se reintenta con
      // el primer toque. Cualquier otro error es del códec y no se va a
      // resolver solo, así que se pasa a la imagen fija.
      if (nombre && nombre !== 'NotAllowedError') ponerImagenFija(v, nombre);
    });
  }

  function arrancarTodos(){
    document.querySelectorAll('video').forEach(intentar);
  }

  /* Vigilancia: si un video no llega a cargar ni un cuadro, se da por perdido
     y va la imagen fija.

     No alcanza con escuchar "error" en el video: cuando las fuentes se
     declaran con <source>, el fallo se avisa en cada fuente y el video puede
     quedar callado. Lo que sí es confiable es networkState === 3
     (NETWORK_NO_SOURCE), que significa que ninguna fuente le sirvió. */
  function vigilar(){
    document.querySelectorAll('video[data-fija]').forEach(v => {
      if (v.dataset.vigilado) return;
      v.dataset.vigilado = '1';

      v.addEventListener('error', () => ponerImagenFija(v, 'error de carga'), { once: true });

      let intentos = 0;
      const reloj = window.setInterval(() => {
        if (!v.parentElement) return window.clearInterval(reloj);  // ya se reemplazó
        if (v.readyState > 0) return window.clearInterval(reloj);  // hay imagen: todo bien

        intentos++;
        // 3 = NETWORK_NO_SOURCE: ninguna fuente se pudo usar
        if (v.networkState === 3 || intentos >= 4) {
          window.clearInterval(reloj);
          ponerImagenFija(v, v.networkState === 3 ? 'ninguna fuente sirvió' : 'no cargó a tiempo');
        }
      }, 2500);
    });
  }
  window.addEventListener('load', vigilar);

  // Primer intento apenas carga la página
  if (document.readyState === 'complete') arrancarTodos();
  else window.addEventListener('load', arrancarTodos);

  // Reintento con el primer gesto: es lo que destraba el bloqueo de iPhone
  ['touchstart','pointerdown','click','keydown'].forEach(evt => {
    window.addEventListener(evt, arrancarTodos, { once: true, passive: true });
  });

  // Al volver a la pestaña, iOS deja los videos pausados
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) arrancarTodos();
  });

  // Los videos del recorrido se crean después: se arrancan al abrirlo
  const btns = ['btn-tour','btn-tour2'];
  btns.forEach(id => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', () => window.setTimeout(() => { arrancarTodos(); vigilar(); }, 60));
  });

  /* Diagnóstico: abrir la página con ?diag=1 al final de la dirección
     muestra qué está pasando con cada video. Sirve para revisar en un
     teléfono, donde no hay consola. */
  if (/[?&]diag=1/.test(location.search)) {
    window.setTimeout(function(){
      const vs = Array.prototype.map.call(document.querySelectorAll('video'), v => ({
        archivo: (v.currentSrc || v.getAttribute('src') || '—').split('/').pop(),
        estado: v.paused ? 'PAUSADO' : 'reproduciendo',
        listo: v.readyState,
        error: v.error ? v.error.code : null
      }));
      const caja = document.createElement('pre');
      caja.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:9999;'
        + 'background:#0d2b30;color:#7ef;padding:12px;border-radius:12px;font-size:11px;'
        + 'line-height:1.5;max-height:52vh;overflow:auto;white-space:pre-wrap;margin:0';
      caja.textContent =
          'Motor: ' + (USA_ANIMADO ? 'WebKit (usa WebP animado)' : 'no WebKit (usa video WebM)') + '\n'
        + 'Videos activos: ' + vs.length + '\n\n'
        + vs.map(v => v.archivo + '\n   ' + v.estado + ' · listo=' + v.listo
            + (v.error ? ' · ERROR ' + v.error : '')).join('\n')
        + (fallos.length ? '\n\nBloqueos:\n' + fallos.map(f => '  ' + f.archivo + ': ' + f.motivo).join('\n') : '')
        + (reemplazados.length ? '\n\nPasaron a imagen fija:\n'
            + reemplazados.map(f => '  ' + f.archivo + ': ' + f.motivo).join('\n') : '')
        + '\n\n(Toca aquí para cerrar)';
      caja.addEventListener('click', () => caja.remove());
      document.body.appendChild(caja);
    }, 2500);
  }
})();

/* =========================================================
   AVES QUE CRUZAN LAS SECCIONES
   Cada tanto aparece un ave en un punto al azar, cruza planeando y se
   desvanece. Va detrás del contenido y delante del fondo, así da vida
   sin estorbar la lectura. Se usa en el mapa y en las dos secciones
   siguientes, con un ave distinta en cada una.
   ========================================================= */
(function(){
  'use strict';
  if (SIN_MOVIMIENTO) return;

  const azar = (a,b) => a + Math.random() * (b - a);

  /* Crea el ave con el formato que le sirva a este navegador, igual que
     en la portada: video donde se puede, imagen animada en WebKit. */
  function crearAve(base, respaldo){
    if (USA_ANIMADO) {
      const img = document.createElement('img');
      img.src = base + '_anim.webp';
      img.alt = '';
      img.onerror = () => { img.onerror = null; img.src = respaldo; };
      return img;
    }
    const v = document.createElement('video');
    v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true;
    v.setAttribute('playsinline',''); v.setAttribute('muted','');
    v.poster = respaldo;
    v.dataset.fija = respaldo;
    v.innerHTML = fuentesVideo(base);
    return v;
  }

  /**
   * Suelta un ave dentro de un contenedor.
   *   alto  = de cuántos píxeles puede ser, para variar la distancia
   *   pausa = cuánto espera entre una pasada y la siguiente
   *   banda = franja de altura, en % del contenedor, por donde puede volar.
   *           Importa: el ave va detrás del contenido, así que si cruza por
   *           donde hay tarjetas opacas no se ve. La banda la mantiene en las
   *           zonas despejadas de cada sección.
   */
  function soltarAve(contenedor, base, respaldo, alto, pausa, banda){
    if (!contenedor) return;
    contenedor.style.position = 'relative';
    const franja = banda || [6, 78];

    const capa = document.createElement('span');
    capa.className = 'ave-libre';
    capa.setAttribute('aria-hidden','true');
    const ave = crearAve(base, respaldo);
    capa.appendChild(ave);
    contenedor.appendChild(capa);

    function cruzar(){
      const haciaLaDerecha = Math.random() < 0.5;
      const y0 = azar(franja[0], franja[1]);
      const y1 = Math.min(franja[1], Math.max(franja[0], y0 + azar(-10, 10)));

      ave.style.transform = haciaLaDerecha ? 'scaleX(1)' : 'scaleX(-1)';
      capa.style.height = azar(alto[0], alto[1]) + 'px';

      const vuelo = capa.animate([
        { left: (haciaLaDerecha ? -14 : 104) + '%', top: y0 + '%', opacity: 0 },
        { opacity: 0.9, offset: 0.16 },
        { opacity: 0.9, offset: 0.82 },
        { left: (haciaLaDerecha ? 104 : -14) + '%', top: y1 + '%', opacity: 0 }
      ], { duration: azar(11000, 17000), easing: 'ease-in-out', fill: 'forwards' });

      vuelo.onfinish = () => window.setTimeout(cruzar, azar(pausa[0], pausa[1]));
    }
    window.setTimeout(cruzar, azar(2500, 7000));
  }

  // El mapa estratégico: la guacamaya. Aquí las filas dejan aire entre sí, así
  // que puede cruzar por casi toda la altura.
  soltarAve(document.getElementById('tree'), VID.guacamaya, IMG.macaw, [38,62], [5000,13000], [6,78]);
  // Las cuatro transiciones: el colibrí, más pequeño. Las tarjetas son blancas y
  // opacas de la mitad para abajo, así que vuela por la franja del encabezado.
  soltarAve(document.querySelector('#contexto .wrap'), VID.colibri, IMG.hummingbird, [26,42], [5000,11000], [2,38]);
  // La trayectoria de CAF: el ave en blanco y negro. Se cuelga de la sección
  // entera (no del .wrap) para aprovechar también el aire de arriba.
  soltarAve(document.getElementById('donde'), VID.ave, IMG.hummingbird2, [38,58], [4000,9000], [1,25]);
})();
