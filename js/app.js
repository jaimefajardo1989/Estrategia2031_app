/* ====================== RENDER ====================== */
const byId = id => DATA.find(d => d.id === id);
const esc = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

document.querySelector('.goal').innerHTML = esc(byId('obj').t) + '<span class="more">Ver detalle →</span>';

const attrsEl = document.getElementById('attrs');
['t-res','t-int','t-pro'].forEach((id,i)=>{
  const d = byId(id);
  const b = document.createElement('button');
  b.className = 'card attr a'+(i+1); b.dataset.id = id;
  b.innerHTML = esc(d.t);
  attrsEl.appendChild(b);
});

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
  {s:IMG.p_students,l:'23%', b:'0',   h:'62%', z:3, p:.5, e:.88},
  {s:IMG.p_skate,   l:'80%', b:'0',   h:'58%', z:3, p:.55, e:.98},
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

const fmt = new Intl.NumberFormat('es', { maximumFractionDigits: 1 });

/**
 * Dibuja la meta al 2031 como una barra entre el punto de partida y el
 * destino. Funciona igual si la meta es mayor que la base (cartera) o menor
 * (días de respuesta, costo): la barra siempre representa el recorrido total
 * y el número grande es el destino.
 *
 * Todos los valores van también como texto, así que la barra no esconde
 * ninguna información.
 */
function pintarMeta(m, color){
  const caja = document.getElementById('dr-meta-wrap');
  if(!m){ caja.style.display = 'none'; return; }
  caja.style.display = '';

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
  document.getElementById('dr-what').textContent = d.what || '';
  document.getElementById('dr-acts').style.setProperty('--c', L.color);
  document.getElementById('dr-acts').innerHTML = (d.acts||[]).map(a=>'<li>'+esc(a)+'</li>').join('');
  const lw = document.getElementById('dr-links-wrap');
  const ls = (d.links||[]).map(byId).filter(Boolean);
  lw.style.display = ls.length ? '' : 'none';
  document.getElementById('dr-links').innerHTML = ls.map(x=>
    '<button class="lchip" data-go="'+x.id+'"><i style="background:'+LEVELS[x.lvl].color+'"></i>'+esc(x.t.length>44?x.t.slice(0,42)+'…':x.t)+'</button>').join('');
  pintarMeta(d.meta, L.color);

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
  const c = e.target.closest('.card'); if(c){ openCard(c.dataset.id); return; }
  const g = e.target.closest('[data-go]'); if(g){ openCard(g.dataset.go); return; }
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
      inner = '<img class="tslide-logo" src="img/logo_caf.webp" alt="">'
        + '<div class="inner"><div class="kick">CAF · Banco de Desarrollo de América Latina y el Caribe</div>'
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
      inner = '<div class="inner"><div class="kick">Objetivo al 2031</div>'
        + '<h3>Una región más <em>resiliente, integrada y próspera</em>, donde el desarrollo sostenible se traduce en bienestar para cada persona</h3></div>'
        + decoHTML([
          {s:IMG.p_kidpaint, st:'right:6%;bottom:-2%;height:44%;z-index:2'},
          {s:IMG.grass, st:'right:2%;bottom:-2%;height:16%;z-index:1'},
          {s:IMG.hummingbird2, v:VID.colibri, st:'right:26%;top:12%;height:14%'},
          {s:IMG.dots_green, st:'left:0;top:10%;height:9%;opacity:.85'}
        ]);
    } else if(s.kind === 'attrs'){
      const colores = ['var(--coral-d)','var(--yellow-d)','var(--green-d)'];
      inner = '<div class="inner"><div class="kick">Objetivo al 2031</div><h3>Tres atributos de la <em>región que queremos</em></h3>'
        + '<p class="tpista">Haz clic en cada atributo para ver qué significa.</p>'
        + rejillaHTML(['t-res','t-int','t-pro'].map((id,k)=>{
            const d = byId(id);
            return { titulo: d.t, texto: (d.lead||'') + ' ' + (d.what||''), color: colores[k] };
          }), 3)
        + '</div>'
        + decoHTML([{s:IMG.p_girljump, v:VID.nina, st:'right:3%;bottom:0;height:52%;z-index:2'},{s:IMG.squig_coral, st:'left:1%;bottom:8%;height:8%'}]);
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
      inner = '<img class="tslide-logo" src="img/logo_caf.webp" alt="">'
        + '<div class="inner"><h3 style="font-size:clamp(30px,4.6vw,56px);max-width:min(720px,64%)">CAF — <em>Banco Verde</em><br>de América Latina y el Caribe</h3>'
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

/* Rejillas en las que se puede hacer clic dentro del recorrido */
tstage.addEventListener('click', e=>{
  const casilla = e.target.closest('.tgrid--clic .it');
  if(!casilla) return;
  const rejilla = casilla.parentElement;
  const panel = rejilla.nextElementSibling;   // el .texp que le corresponde
  const k = casilla.dataset.exp;

  rejilla.querySelectorAll('.it').forEach(b=>b.setAttribute('aria-pressed', b === casilla));
  if(!panel) return;
  panel.querySelectorAll('.texp-uno').forEach(p=>p.classList.toggle('on', p.dataset.exp === k));
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
