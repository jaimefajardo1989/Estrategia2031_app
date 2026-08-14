const IMG = {
  tree_a: 'img/tree_a.webp',
  tree_b: 'img/tree_b.webp',
  grass_tall: 'img/grass_tall.webp',
  palm: 'img/palm.webp',
  rock: 'img/rock.webp',
  pampas: 'img/pampas.webp',
  grass: 'img/grass.webp',
  flower: 'img/flower.webp',
  macaw: 'img/macaw.webp',
  hummingbird: 'img/hummingbird.webp',
  hummingbird2: 'img/hummingbird2.webp',
  flamingo: 'img/flamingo.webp',
  butterfly_a: 'img/butterfly_a.webp',
  butterfly_b: 'img/butterfly_b.webp',
  dragonfly: 'img/dragonfly.webp',
  dots_teal: 'img/dots_teal.webp',
  dots_coral: 'img/dots_coral.webp',
  dots_yellow: 'img/dots_yellow.webp',
  dots_green: 'img/dots_green.webp',
  squig_teal: 'img/squig_teal.webp',
  squig_yellow: 'img/squig_yellow.webp',
  squig_coral: 'img/squig_coral.webp',
  squig_green: 'img/squig_green.webp',
  wash_teal: 'img/wash_teal.webp',
  torn_coral: 'img/torn_coral.webp',
  lines_teal: 'img/lines_teal.webp',
  lines_green: 'img/lines_green.webp',
  lines_coral: 'img/lines_coral.webp',
  p_skate: 'img/p_skate.webp',
  p_students: 'img/p_students.webp',
  p_ninos: 'img/p_ninos.webp',
  p_walk: 'img/p_walk.webp',
  p_kidpaint: 'img/p_kidpaint.webp',
  p_kidsline: 'img/p_kidsline.webp',
  p_wheelchair: 'img/p_wheelchair.webp',
  p_girlbw: 'img/p_girlbw.webp',
  p_girljump: 'img/p_girljump.webp',
  p_family: 'img/p_family.webp',
  p_robot: 'img/p_robot.webp',
  p_books: 'img/p_books.webp',
  ph_amb: 'img/ph_amb.webp',
  ph_ene: 'img/ph_ene.webp',
  ph_dig: 'img/ph_dig.webp',
  ph_dem: 'img/ph_dem.webp',
  /* El colibrí que decora el panel de las agendas transversales.
     El animado es un WebP animado, que va como imagen en todos los
     navegadores; el fijo es su primer cuadro, para "reducir movimiento". */
  colibri_anim: 'img/colibri_anim.webp',
  colibri_fijo: 'img/colibri_fijo.webp',
};

/* Videos de aves con fondo transparente (WebM con canal alfa).
   Se usan en la portada y en el recorrido. Si el navegador no los puede
   reproducir, o si el sistema pide reducir movimiento, se muestra la
   imagen fija equivalente de IMG. */
const VID = {
  guacamaya: 'video/guacamaya',
  ave: 'video/ave',
  colibri: 'video/colibri',
  flamenco: 'video/flamenco',
  nina: 'video/nina',
  ninos: 'video/ninos',
};

/* ====================== DATA ====================== */
/* Los cuatro niveles del mapa.
   "explica" es lo que se abre al hacer clic en el nombre de la fila, a la
   izquierda del mapa: qué es ese tipo de agenda. */
const LEVELS = {
  1:{name:"Objetivo al 2031", color:"var(--green-d)", tono:"var(--green-tx)", deco:IMG.macaw,
     explica:{
       t:"Objetivo al 2031",
       lead:"El punto de llegada que ordena todo el ciclo estratégico.",
       what:"No es una consigna: es el criterio con el que se decide qué priorizar cuando hay que elegir. Todo lo que está más abajo en el mapa existe para acercarnos a él. Los tres atributos —resiliente, integrada y próspera— describen la región que queremos ver, y el cierre de la frase marca la vara: que el desarrollo se traduzca en bienestar para cada persona, no solo en indicadores agregados.",
       acts:["Traducir el crecimiento del Banco en bienestar concreto","Medir el avance por impacto y no solo por volumen","Sostener la cercanía con los países como ancla de la agenda"]}},

  2:{name:"Oportunidades",    color:"var(--yellow-d)", tono:"var(--yellow-tx)",deco:IMG.butterfly_a,
     explica:{
       t:"Oportunidades",
       lead:"Dónde está el potencial de la región hacia 2031.",
       what:"Seis transformaciones estructurales que ya están en marcha y que van a ocurrir con nosotros o sin nosotros: ambiental, energética, digital, demográfica, territorial y productiva. No son sectores ni áreas de negocio, son terrenos donde una intervención bien puesta tiene efecto multiplicador. Funcionan como filtro: una institución con recursos limitados no puede estar en todo, y estas seis indican dónde concentrar el esfuerzo.",
       acts:["Identificar y anticipar oportunidades en cada frente","Materializarlas en operaciones de crédito y cooperación técnica","Llegar temprano, que es donde se marca la diferencia"]}},

  3:{name:"Transversales",   color:"var(--teal-d)", tono:"var(--teal-tx)",
     deco:IMG.colibri_fijo, decoAnim:IMG.colibri_anim,
     explica:{
       t:"Agendas transversales",
       lead:"Lo que CAF aporta y que atraviesa todas las agendas.",
       what:"No son áreas de negocio ni líneas de producto: son las seis capacidades que se activan igual esté el proyecto en energía, en agua o en educación. Responden a una sola pregunta: qué ponemos nosotros que otro no pone. Porque el financiamiento solo es una mercancía —hay muchas fuentes de capital y varias más baratas—; lo que diferencia a una institución de desarrollo es lo que viene con el dinero.",
       acts:["Conocimiento, capacidad de convocar y acompañamiento en la ejecución","Se combinan entre sí: un proyecto bien hecho activa varias a la vez","Deben permear toda la acción del Banco, no algunas operaciones"]}},

  4:{name:"Habilitadoras", color:"var(--coral-d)", tono:"var(--coral-tx)", deco:IMG.flamingo,
     explica:{
       t:"Agendas habilitadoras",
       lead:"Las condiciones internas que hacen posible todo lo demás.",
       what:"Las tres anteriores miran hacia la región; estas miran hacia adentro: la solidez financiera, las personas y la tecnología, y la manera de gobernarnos y operar. Están en el mapa porque una institución no puede prometer más de lo que su propia estructura aguanta. Sin capital sólido no hay volumen de financiamiento; sin equipos y sistemas a la altura no hay agilidad; sin gobernanza clara no hay confianza de los mercados ni de los países.",
       acts:["Sostener el crecimiento con disciplina financiera","Talento y procesos digitales a la altura de lo prometido","Gobernanza que convierta la ambición en resultados"]}}
};

const DATA = [
{id:"obj", meta:{nombre:"Bienestar que llega a las personas",unidad:"personas alcanzadas, en millones",desde:{etiqueta:"2025",valor:0},hasta:{etiqueta:"Meta 2031",valor:120}},temas:"visión misión países miembros bienestar horizonte plataforma regional",lvl:1,t:"Una región más resiliente, integrada y próspera, donde el desarrollo sostenible se traduce en bienestar para cada persona",
 lead:"El objetivo que ordena todo el ciclo estratégico 2026–2031.",
 what:"Ante la magnitud de los desbalances estructurales y de las transiciones que enfrenta la región hacia 2031, el desafío no es solo crecer más, sino crecer mejor. Avanzar hacia una América Latina y el Caribe más resiliente, integrada y próspera exigirá movilizar más recursos, construir más alianzas y sostener una forma de actuar basada en la cercanía, la agilidad y la flexibilidad. Ese es el rol que CAF está llamada a cumplir: una plataforma regional capaz de conectar financiamiento, conocimiento, ejecución e impacto.",
 acts:["Traducir el crecimiento del Banco en bienestar concreto para las personas","Movilizar más recursos y alianzas en favor de la región","Sostener la cercanía y la atención integral a los países como ancla de la agenda","Medir el avance por impacto y no solo por volumen"],
 links:["t-res","t-int","t-pro"]},

{id:"t-res", meta:{nombre:"Operaciones con criterio de resiliencia",unidad:"% de la cartera",desde:{etiqueta:"2025",valor:18},hasta:{etiqueta:"Meta 2031",valor:45}},temas:"resiliencia choques desastres clima fiscal contingente emergencia riesgo",lvl:1,t:"resiliente",lead:"Capacidad de absorber choques sin perder la trayectoria de desarrollo.",
 what:"La región enfrenta choques climáticos, fiscales y de mercado cada vez más frecuentes. Resiliencia significa infraestructura y sistemas preparados, finanzas públicas con margen de maniobra y una arquitectura de financiamiento capaz de responder rápido cuando el choque ocurre.",
 acts:["Instrumentos contingentes que se activan ante desastres y presiones de mercado","Infraestructura crítica adaptada al riesgo climático","Protección social y sistemas de respuesta ante emergencias","Diversificación de fuentes de financiamiento de los países"],
 links:["f-amb","v-fin","a-sos"]},
{id:"t-int", meta:{nombre:"Financiamiento a proyectos de integración",unidad:"US$ miles de millones acumulados",desde:{etiqueta:"2025",valor:4.5},hasta:{etiqueta:"Meta 2031",valor:15}},temas:"integración corredores fronteras comercio interconexión regional mercados",lvl:1,t:"integrada",lead:"Mercados, infraestructura y personas mejor conectados.",
 what:"La integración es agenda fundacional de CAF y pilar frente a la incertidumbre global. Se materializa en proyectos concretos —corredores, energía, conectividad digital, facilitación de comercio— que amplían mercados y hacen más competitiva a la región.",
 acts:["Corredores logísticos, pasos de frontera y conectividad física","Interconexión energética y digital entre países","Facilitación del comercio, el turismo y las cadenas de valor","Bienes públicos regionales y cooperación técnica de alcance regional"],
 links:["f-ter","v-int","v-con"]},
{id:"t-pro", meta:{nombre:"Empresas y personas con acceso a financiamiento",unidad:"miles de empresas",desde:{etiqueta:"2025",valor:74},hasta:{etiqueta:"Meta 2031",valor:200}},temas:"prosperidad productividad empleo pymes crecimiento bienestar oportunidades",lvl:1,t:"próspera",lead:"Crecimiento con productividad, empleo y bienestar que llega a cada persona.",
 what:"Prosperidad significa que el crecimiento se traduce en empleo de calidad, servicios que funcionan y oportunidades reales. Supone cerrar la brecha de productividad, ampliar el acceso al financiamiento y fortalecer las capacidades de las personas y de las empresas.",
 acts:["Productividad, innovación y financiamiento a pymes","Educación, formación y empleabilidad","Servicios urbanos y territoriales de calidad","Inclusión financiera y digital"],
 links:["f-pro","f-dem","v-cap"]},

{id:"f-amb", temas:"agricultura agua bosques biodiversidad clima adaptación carbono emisiones deforestación sequía inundaciones cuencas suelo Amazonía naturaleza reforestación economía azul desastres", lvl:2, t:"Ambiental", sub:"Adaptación, naturaleza y gestión del riesgo"},
{id:"f-ene", temas:"energía electricidad renovables solar eólica hidroeléctrica transmisión almacenamiento redes litio cobre minerales críticos hidrógeno eficiencia energética combustibles", lvl:2, t:"Energética", sub:"Matriz limpia, transmisión y eficiencia"},
{id:"f-dig", temas:"conectividad internet banda ancha fibra óptica datos inteligencia artificial IA gobierno digital ciberseguridad pagos inclusión financiera telecomunicaciones centros de datos cables submarinos identidad digital", lvl:2, t:"Digital", sub:"Conectividad, datos e inteligencia artificial"},
{id:"f-dem", temas:"empleo trabajo juventud jóvenes envejecimiento pensiones salud cuidados mujeres género migración educación formación capacitación informalidad población primera infancia", lvl:2, t:"Demográfica", sub:"Bono demográfico, cuidados y migración"},
{id:"f-ter", temas:"ciudades urbano vivienda movilidad transporte metro agua potable saneamiento alcantarillado residuos rural caminos carreteras subnacional municipios hábitat territorio barrios", lvl:2, t:"Territorial", sub:"Ciudades, regiones y gobiernos subnacionales"},
{id:"f-pro", temas:"productividad pymes mipymes empresas exportaciones comercio industria manufactura innovación cadenas de valor competitividad crédito emprendimiento turismo agroindustria logística", lvl:2, t:"Productiva y competitiva", sub:"Productividad, pymes, comercio y turismo"},

{id:"v-mov", temas:"cofinanciamiento donantes fondos verdes alianzas movilización banca multilateral inversión privada filantropía sindicación capital concesional emisiones temáticas", lvl:3, t:"Movilización de recursos y alianzas globales", sub:"Que cada dólar de CAF traiga más recursos"},
{id:"v-fin", temas:"bonos verdes bonos temáticos inclusión financiera garantías moneda local liquidez línea contingente intermediarios financieros trazabilidad microfinanzas", lvl:3, t:"Financiamiento verde, inclusivo y digital", sub:"Soluciones a la medida y con impacto trazable"},
/* Esta agenda ya tiene texto e indicadores validados: por eso usa "metas" (en
   plural, la tarjeta de cifras animadas) y lleva validado:true, que cambia la
   nota del pie para no marcarla como borrador. */
{id:"v-int", validado:true,
 metas:[
  {nombre:"Financiamiento aprobado para operaciones de integración regional",
   valor:10000, pre:"USD ", uni:"millones",
   detalle:{tipo:"comparar", boton:"Comparar con el ciclo anterior",
     titulo:"Frente a lo aprobado entre 2021 y 2025",
     barras:[{et:"2021–2025 · aprobado", v:4489},
             {et:"Meta 2031", v:10000, fuerte:true}],
     uni:"USD millones",
     pie:"Más del doble de lo que CAF aprobó para integración regional en el ciclo anterior."}},

  {nombre:"Recursos movilizados en asistencia técnica para integración regional",
   valor:240, pre:"USD ", uni:"millones",
   detalle:{tipo:"palanca", boton:"Ver qué moviliza",
     titulo:"Lo que acompaña cada dólar de asistencia técnica",
     chico:{v:240, et:"Asistencia técnica"},
     grande:{v:10000, et:"Financiamiento aprobado"},
     pie:"Relación entre las dos metas: cerca de USD 1 de asistencia técnica por cada USD 42 de financiamiento. La asistencia técnica es lo que prepara los proyectos multinacionales y los deja en condiciones de financiarse."}},

  {nombre:"Países de ALC con al menos una operación de crédito o cooperación técnica de integración regional",
   valor:100, suf:"%", uni:"de los países",
   detalle:{tipo:"mapa", boton:"Ver el mapa de la región",
     titulo:"Los 23 países accionistas de CAF en la región",
     /* Los 23 accionistas de ALC. Con España y Portugal, CAF llega a 25 países.
        El último en incorporarse fue Santa Lucía.
        En el mapa se dibujan los 33 países de la región: los que no son
        accionistas quedan en gris, como contexto geográfico. */
     encender:["Antigua y Barbuda","Argentina","Bahamas","Barbados","Bolivia","Brasil",
       "Chile","Colombia","Costa Rica","Ecuador","El Salvador","Granada","Honduras",
       "Jamaica","México","Panamá","Paraguay","Perú","República Dominicana",
       "Santa Lucía","Trinidad y Tobago","Uruguay","Venezuela"],
     pie:"Al 2031, los 23 países accionistas de la región con al menos una operación de crédito o cooperación técnica de integración regional. El último en incorporarse fue Santa Lucía. En gris, los países de la región que no son accionistas."}}
 ],
 /* Los tres frentes de la agenda, resaltados dentro del párrafo */
 resalta:["conectar","comerciar","coproducir"],
 temas:"fronteras pasos fronterizos corredores logística interconexión comercio regional cuencas compartidas aduanas bienes públicos regionales cooperación técnica interoperabilidad convergencia regulatoria cadenas de valor proveedores proyectos multinacionales corredores de alto valor estratégico",lvl:3,t:"Integración regional pragmática",sub:"Integración por proyectos, no por declaraciones",
 lead:"Conectar, comerciar y coproducir: tres frentes para una integración tangible.",
 what:"Al 2031, CAF impulsará una agenda de integración regional pragmática para transformar la integración en proyectos, inversiones y resultados concretos para los países. Su acción se concentrará en tres frentes complementarios: conectar, mediante corredores estratégicos que integren transporte, energía, conectividad digital, logística y fronteras; comerciar, facilitando el intercambio regional a través de mayor interoperabilidad y convergencia regulatoria; y coproducir, promoviendo cadenas regionales de valor, inversión y desarrollo de proveedores. Para hacerlo posible, CAF fortalecerá la preparación y financiamiento de proyectos multinacionales y actuará como articulador entre países, combinando financiamiento, conocimiento y coordinación institucional para consolidar Corredores de Alto Valor Estratégico y una integración regional más tangible, competitiva y efectiva.",
 acts:["Conectar: corredores estratégicos que integren transporte, energía, conectividad digital, logística y fronteras","Comerciar: interoperabilidad y convergencia regulatoria que faciliten el intercambio regional","Coproducir: cadenas regionales de valor, inversión y desarrollo de proveedores","Preparación y financiamiento de proyectos multinacionales, con CAF como articulador entre países","Consolidación de Corredores de Alto Valor Estratégico"],
 links:["t-int","f-ene","f-ter"]},
{id:"v-con", temas:"estudios investigación datos evidencia análisis prospectiva políticas públicas evaluación de impacto conocimiento publicaciones diálogo", lvl:3, t:"Conocimiento prospectivo", sub:"Anticipar las transiciones con evidencia"},
{id:"v-cap", temas:"asistencia técnica preparación de proyectos gobiernos subnacionales municipios capacitación gestión pública ejecución fortalecimiento institucional empresas públicas reguladores", lvl:3, t:"Apoyo a las capacidades institucionales", sub:"Financiamiento que sí se ejecuta"},
{id:"v-met", temas:"cercanía agilidad impacto oficinas país tiempos de respuesta presencia local desembolso servicio al cliente flexibilidad", lvl:3, t:"Método CAF: cercanía, agilidad e impacto", sub:"La forma de trabajar como ventaja competitiva"},

{id:"a-sos", temas:"capital calificación crediticia rating riesgo tesorería fondeo mercados de capital patrimonio solidez bonos híbridos balance solvencia cartera", lvl:4, t:"Sostenibilidad, solidez e innovación financiera", sub:"Sostener el crecimiento con disciplina"},
{id:"a-tal", temas:"recursos humanos talento cultura organizacional digitalización sistemas datos automatización capacitación tecnología procesos internos colaboración aprendizaje", lvl:4, t:"Talento y futuro digital", sub:"Las capacidades internas que sostienen la estrategia"},
{id:"a-gob", temas:"gobierno corporativo transparencia control interno auditoría eficiencia procesos resultados impacto integridad cumplimiento gestión de riesgos evaluación", lvl:4, t:"Gobernanza, efectividad y excelencia operacional", sub:"Decidir rápido y ejecutar bien"}
];

const TRANS = [
 {lab:"Transición ambiental", img:IMG.ph_amb, txt:"Adaptación, biodiversidad y agua como condición de toda inversión en la región."},
 {lab:"Transición energética", img:IMG.ph_ene, txt:"Renovables, transmisión, almacenamiento e integración energética entre países."},
 {lab:"Transición digital", img:IMG.ph_dig, txt:"Conectividad, datos e inteligencia artificial al servicio de la productividad."},
 {lab:"Transición demográfica", img:IMG.ph_dem, txt:"Bono demográfico, cuidados y migración redefinen la agenda social."}
];

const STATS = [
 {n:"+USD 7.000 MM", d:"Capitalización histórica aprobada por consenso del Directorio", c:""},
 {n:"USD 39.079 MM", d:"Cartera total alcanzada en 2025, camino a duplicarla al 2030", c:"g"},
 {n:"USD 4.489 MM", d:"Aprobados entre 2021 y 2025 para la integración de la región", c:"y"},
 {n:"73.952 pymes", d:"Con operaciones de CAF a través de intermediarios (2021–2025)", c:"c"},
 {n:"19 oficinas", d:"En América Latina, el Caribe y Europa, más 9 edificios corporativos", c:"g"},
 {n:"+19%", d:"Crecimiento de la red de aliados financieros activos desde 2021", c:"y"},
 {n:"Aa1 / AA+", d:"Las mejores calificaciones de riesgo en la historia de CAF", c:"c"},
 {n:"25 países", d:"Base accionaria ampliada con foco en Centroamérica y el Caribe", c:""}
];

const TL = [
 {p:"1968–1980", d:"Nacimiento de CAF y vocación integradora"},
 {p:"1981–1990", d:"Ampliación del mandato y expansión sectorial"},
 {p:"1991–2000", d:"Posicionamiento como financiador clave de infraestructura"},
 {p:"2001–2010", d:"Consolidación como banco regional de desarrollo"},
 {p:"2011–2020", d:"Mayor escala, diversificación e impacto regional"},
 {p:"2021–2026", d:"Capitalización y primera estrategia plurianual", on:true}
];


const TOUR = [
 // El texto de la portada del recorrido se edita aquí
 {kind:'cover',
  p:'Esta estrategia se construyó junto a los países accionistas, sus equipos técnicos, los equipos de CAF y un grupo de expertos internacionales, con el propósito de entender el contexto global al que nos enfrentamos en los próximos años. De ese diálogo surgió un rumbo compartido para acompañar a los países en aprovechar las oportunidades que hoy se le abren a la región a partir de las transiciones socioeconómicas, y en saldar los desbalances históricos que todavía marcan su desarrollo. Para que la resiliencia, la integración y la prosperidad se traduzcan en desarrollo y bienestar para todos los latinoamericanos y caribeños.'},
 {kind:'trans'},
 // El objetivo y sus tres atributos, juntos en una sola lámina
 {kind:'goal'},
 {kind:'level', lvl:2, kick:'Nivel 2', h:'Las <em>oportunidades</em> de la región',
  p:'Seis frentes donde se concentra el potencial de la región hacia 2031.'},
 {kind:'level', lvl:3, kick:'Nivel 3', h:'Las agendas <em>transversales</em> de CAF',
  p:'Lo que el Banco aporta más allá del volumen de financiamiento. Atraviesan todas las agendas y toda su acción.'},
 {kind:'level', lvl:4, kick:'Nivel 4', h:'Las agendas <em>habilitadoras</em>',
  p:'El trabajo puertas adentro que habilita todo lo demás.'},
 {kind:'close'}
];
