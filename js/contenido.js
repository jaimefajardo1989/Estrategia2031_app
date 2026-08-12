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
};

/* ====================== DATA ====================== */
/* Los cuatro niveles del mapa.
   "explica" es lo que se abre al hacer clic en el nombre de la fila, a la
   izquierda del mapa: qué es ese tipo de agenda. */
const LEVELS = {
  1:{name:"Objetivo al 2031", color:"var(--green-d)", deco:IMG.macaw,
     explica:{
       t:"Objetivo al 2031",
       lead:"El punto de llegada que ordena todo el ciclo estratégico.",
       what:"No es una consigna: es el criterio con el que se decide qué priorizar cuando hay que elegir. Todo lo que está más abajo en el mapa existe para acercarnos a él. Los tres atributos —resiliente, integrada y próspera— describen la región que queremos ver, y el cierre de la frase marca la vara: que el desarrollo se traduzca en bienestar para cada persona, no solo en indicadores agregados.",
       acts:["Traducir el crecimiento del Banco en bienestar concreto","Medir el avance por impacto y no solo por volumen","Sostener la cercanía con los países como ancla de la agenda"]}},

  2:{name:"Oportunidades",    color:"var(--yellow-d)",deco:IMG.butterfly_a,
     explica:{
       t:"Oportunidades",
       lead:"Dónde está el potencial de la región hacia 2031.",
       what:"Seis transformaciones estructurales que ya están en marcha y que van a ocurrir con nosotros o sin nosotros: ambiental, energética, digital, demográfica, territorial y productiva. No son sectores ni áreas de negocio, son terrenos donde una intervención bien puesta tiene efecto multiplicador. Funcionan como filtro: una institución con recursos limitados no puede estar en todo, y estas seis indican dónde concentrar el esfuerzo.",
       acts:["Identificar y anticipar oportunidades en cada frente","Materializarlas en operaciones de crédito y cooperación técnica","Llegar temprano, que es donde se marca la diferencia"]}},

  3:{name:"Transversales",   color:"var(--teal-d)",  deco:IMG.hummingbird2,
     explica:{
       t:"Agendas transversales",
       lead:"Lo que CAF aporta y que atraviesa todas las agendas.",
       what:"No son áreas de negocio ni líneas de producto: son las seis capacidades que se activan igual esté el proyecto en energía, en agua o en educación. Responden a una sola pregunta: qué ponemos nosotros que otro no pone. Porque el financiamiento solo es una mercancía —hay muchas fuentes de capital y varias más baratas—; lo que diferencia a una institución de desarrollo es lo que viene con el dinero.",
       acts:["Conocimiento, capacidad de convocar y acompañamiento en la ejecución","Se combinan entre sí: un proyecto bien hecho activa varias a la vez","Deben permear toda la acción del Banco, no algunas operaciones"]}},

  4:{name:"Habilitadoras", color:"var(--coral-d)", deco:IMG.flamingo,
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

{id:"f-amb", meta:{nombre:"Financiamiento verde y de adaptación",unidad:"% de la cartera anual",desde:{etiqueta:"2025",valor:24},hasta:{etiqueta:"Meta 2031",valor:50}},temas:"agricultura agua bosques biodiversidad clima adaptación carbono emisiones deforestación sequía inundaciones cuencas suelo Amazonía naturaleza reforestación economía azul desastres",lvl:2,t:"Ambiental",sub:"Adaptación, naturaleza y gestión del riesgo",
 lead:"La transición ambiental define buena parte del riesgo y de la oportunidad regional.",
 what:"América Latina y el Caribe concentra una porción decisiva de la biodiversidad y del agua dulce del planeta y, al mismo tiempo, está muy expuesta a eventos climáticos extremos. Hacia 2031 lo ambiental deja de ser un sector para convertirse en una condición de toda inversión: adaptación, gestión del riesgo de desastres, protección de ecosistemas y economía azul.",
 acts:["Adaptación y resiliencia de la infraestructura crítica","Instrumentos contingentes verdes ante desastres","Soluciones basadas en naturaleza, agua y economía azul","Criterios climáticos incorporados en todo el ciclo de proyectos"],
 links:["v-fin","v-mov","a-sos"]},
{id:"f-ene", meta:{nombre:"Capacidad renovable y de transmisión habilitada",unidad:"MW acumulados",desde:{etiqueta:"2025",valor:0},hasta:{etiqueta:"Meta 2031",valor:12000}},temas:"energía electricidad renovables solar eólica hidroeléctrica transmisión almacenamiento redes litio cobre minerales críticos hidrógeno eficiencia energética combustibles",lvl:2,t:"Energética",sub:"Matriz limpia, transmisión y eficiencia",
 lead:"Una de las matrices más limpias del mundo, con enormes tareas pendientes de red y almacenamiento.",
 what:"La ventaja regional en generación renovable solo se convierte en competitividad si se resuelven la transmisión, el almacenamiento, la eficiencia y la integración energética entre países. A ello se suma el papel de la región en las cadenas de minerales críticos, que exige estándares ambientales y sociales robustos.",
 acts:["Generación renovable, transmisión y almacenamiento","Interconexión e integración energética regional","Eficiencia energética y electrificación del transporte","Cadenas de valor de minerales críticos con estándares"],
 links:["v-fin","v-int","v-mov"]},
{id:"f-dig", meta:{nombre:"Población con acceso digital nuevo o mejorado",unidad:"millones de personas",desde:{etiqueta:"2025",valor:0},hasta:{etiqueta:"Meta 2031",valor:40}},temas:"conectividad internet banda ancha fibra óptica datos inteligencia artificial IA gobierno digital ciberseguridad pagos inclusión financiera telecomunicaciones centros de datos cables submarinos identidad digital",lvl:2,t:"Digital",sub:"Conectividad, datos e inteligencia artificial",
 lead:"La brecha ya no es solo de acceso: es de uso, de datos y de capacidades.",
 what:"La transición digital reorganiza la productividad, los servicios públicos y el empleo. La oportunidad está en la infraestructura digital —cables submarinos, centros de datos, redes—, en los servicios públicos digitales y en la adopción de datos e inteligencia artificial con gobernanza y ciberseguridad.",
 acts:["Infraestructura digital: cables submarinos, centros de datos y redes","Servicios públicos e identidad digital","Adopción de datos e IA con gobernanza y ciberseguridad","Habilidades digitales e inclusión financiera digital"],
 links:["v-fin","v-con","a-tal"]},
{id:"f-dem", meta:{nombre:"Personas con formación, empleo o cuidados",unidad:"millones de personas",desde:{etiqueta:"2025",valor:0},hasta:{etiqueta:"Meta 2031",valor:8}},temas:"empleo trabajo juventud jóvenes envejecimiento pensiones salud cuidados mujeres género migración educación formación capacitación informalidad población primera infancia",lvl:2,t:"Demográfica",sub:"Bono demográfico, cuidados y migración",
 lead:"La ventana demográfica se cierra: lo que se haga en esta década define décadas.",
 what:"El envejecimiento, la migración y las presiones sobre los sistemas de salud, pensiones y cuidados cambian la ecuación del desarrollo regional. La oportunidad está en la empleabilidad juvenil, en los sistemas de cuidados que liberan participación laboral y en una protección social sostenible.",
 acts:["Educación, formación y empleabilidad juvenil","Sistemas de cuidados y participación laboral femenina","Salud y protección social sostenibles","Migración e integración productiva"],
 links:["v-cap","v-con","v-met"]},
{id:"f-ter", meta:{nombre:"Hogares con servicios básicos mejorados",unidad:"millones de hogares",desde:{etiqueta:"2025",valor:0},hasta:{etiqueta:"Meta 2031",valor:6.5}},temas:"ciudades urbano vivienda movilidad transporte metro agua potable saneamiento alcantarillado residuos rural caminos carreteras subnacional municipios hábitat territorio barrios",lvl:2,t:"Territorial",sub:"Ciudades, regiones y gobiernos subnacionales",
 lead:"El desarrollo se juega en el territorio, y el territorio necesita capacidad y financiamiento.",
 what:"El trabajo con gobiernos regionales y locales ha sido clave como vehículo para llevar la estrategia al territorio, fortaleciendo capacidades y facilitando el acceso al financiamiento. Movilidad, agua y saneamiento, hábitat y gestión fiscal subnacional concentran buena parte de la demanda futura.",
 acts:["Movilidad urbana y transporte masivo","Agua, saneamiento y hábitat","Fortalecimiento fiscal y de gestión subnacional","Acceso de ciudades y regiones al mercado de capitales"],
 links:["v-cap","v-fin","v-met"]},
{id:"f-pro", meta:{nombre:"Pymes con financiamiento de CAF",unidad:"miles de pymes",desde:{etiqueta:"2025",valor:74},hasta:{etiqueta:"Meta 2031",valor:180}},temas:"productividad pymes mipymes empresas exportaciones comercio industria manufactura innovación cadenas de valor competitividad crédito emprendimiento turismo agroindustria logística",lvl:2,t:"Productiva y competitiva",sub:"Productividad, pymes, comercio y turismo",
 lead:"Sin productividad no hay prosperidad sostenida.",
 what:"La brecha de productividad es el nudo estructural de la región. La agenda pasa por el financiamiento a pymes a través de intermediarios financieros, la infraestructura de integración y facilitación de comercio, la innovación y el desarrollo de cadenas de valor y turismo con encadenamientos locales.",
 acts:["Financiamiento a pymes vía intermediarios financieros","Infraestructura de integración y facilitación de comercio","Innovación, emprendimiento y transferencia tecnológica","Turismo y cadenas de valor con encadenamientos locales"],
 links:["v-fin","v-int","v-mov"]},

{id:"v-mov", meta:{nombre:"Recursos de terceros movilizados",unidad:"veces el capital propio",desde:{etiqueta:"2025",valor:0.6},hasta:{etiqueta:"Meta 2031",valor:2}},temas:"cofinanciamiento donantes fondos verdes alianzas movilización banca multilateral inversión privada filantropía sindicación capital concesional emisiones temáticas",lvl:3,t:"Movilización de recursos y alianzas globales",sub:"Que cada dólar de CAF traiga más recursos",
 lead:"Hacia 2031, CAF debe movilizar más recursos y construir más alianzas en favor de la región.",
 what:"La escala de las transiciones excede la capacidad de cualquier banco. El valor de CAF está en actuar como plataforma que atrae y organiza recursos: cofinanciamiento con socios globales y regionales, acceso a fondos climáticos y capital concesional, y una base de inversionistas cada vez más diversificada.",
 acts:["Cofinanciamiento y sindicación con socios globales y regionales","Acceso a fondos climáticos y a capital concesional","Emisiones temáticas y base de inversionistas diversificada","Alianzas público-privadas para proyectos de gran escala"],
 links:["a-sos","v-int","f-amb"]},
{id:"v-fin", meta:{nombre:"Cartera con etiqueta verde, inclusiva o digital",unidad:"% de la cartera",desde:{etiqueta:"2025",valor:31},hasta:{etiqueta:"Meta 2031",valor:60}},temas:"bonos verdes bonos temáticos inclusión financiera garantías moneda local liquidez línea contingente intermediarios financieros trazabilidad microfinanzas",lvl:3,t:"Financiamiento verde, inclusivo y digital",sub:"Soluciones a la medida y con impacto trazable",
 lead:"Un portafolio de soluciones financieras que responde con rapidez y resiliencia.",
 what:"En el ciclo anterior CAF amplió su portafolio con instrumentos como el Financiamiento Extraordinario de Liquidez y la Línea de Crédito Contingente Verde. Hacia 2031 se trata de profundizar esa lógica: productos a la medida, garantías, moneda local e intermediarios financieros que llevan el financiamiento hasta la última milla.",
 acts:["Líneas contingentes verdes y financiamiento de liquidez","Garantías, moneda local y mitigación de riesgos","Financiamiento a través de intermediarios y pymes","Trazabilidad del impacto verde, social y digital"],
 links:["a-sos","f-amb","f-pro"]},
{id:"v-int", meta:{nombre:"Proyectos binacionales o regionales",unidad:"cantidad acumulada",desde:{etiqueta:"2025",valor:0},hasta:{etiqueta:"Meta 2031",valor:45}},temas:"fronteras pasos fronterizos corredores logística interconexión comercio regional cuencas compartidas aduanas bienes públicos regionales cooperación técnica",lvl:3,t:"Integración regional pragmática",sub:"Integración por proyectos, no por declaraciones",
 lead:"Entre 2021 y 2025 CAF aprobó cerca de USD 4.489 millones para la integración de la región.",
 what:"La integración avanza cuando se traduce en obras y reglas concretas: corredores viales y pasos de frontera, cable submarino, interconexión energética, expansión ferroviaria y facilitación del comercio. Es una integración pragmática, que empieza por proyectos con retorno visible para más de un país.",
 acts:["Corredores logísticos y pasos de frontera","Interconexión energética y digital","Facilitación de comercio y armonización regulatoria","Bienes públicos regionales y cooperación técnica"],
 links:["t-int","f-ene","f-ter"]},
{id:"v-con", meta:{nombre:"Estudios que derivan en una decisión",unidad:"% de los estudios",desde:{etiqueta:"2025",valor:28},hasta:{etiqueta:"Meta 2031",valor:60}},temas:"estudios investigación datos evidencia análisis prospectiva políticas públicas evaluación de impacto conocimiento publicaciones diálogo",lvl:3,t:"Conocimiento prospectivo",sub:"Anticipar las transiciones con evidencia",
 lead:"Conocimiento que se convierte en mejores decisiones de política pública y mejores operaciones.",
 what:"El valor del conocimiento no está en el documento sino en la decisión que habilita. CAF aporta prospectiva sobre las transiciones, datos y evidencia para el diseño de operaciones, y espacios de diálogo regional que posicionan a América Latina y el Caribe con voz propia.",
 acts:["Estudios y prospectiva sobre las cuatro transiciones","Datos y evidencia aplicados al diseño de operaciones","Diálogo regional y foros de alto nivel","Gestión del conocimiento y aprendizaje institucional"],
 links:["f-dig","f-dem","a-tal"]},
{id:"v-cap", meta:{nombre:"Proyectos que cierran en el plazo previsto",unidad:"% de la cartera",desde:{etiqueta:"2025",valor:54},hasta:{etiqueta:"Meta 2031",valor:80}},temas:"asistencia técnica preparación de proyectos gobiernos subnacionales municipios capacitación gestión pública ejecución fortalecimiento institucional empresas públicas reguladores",lvl:3,t:"Apoyo a las capacidades institucionales",sub:"Financiamiento que sí se ejecuta",
 lead:"Sin capacidad de ejecución, el financiamiento no se transforma en desarrollo.",
 what:"Una parte decisiva del valor de CAF está aguas arriba del crédito: preparar y estructurar proyectos, fortalecer la gestión pública, acompañar la ejecución y trabajar con gobiernos subnacionales que muchas veces enfrentan las mayores brechas de capacidad.",
 acts:["Preparación y estructuración de proyectos","Fortalecimiento de la gestión pública y de la ejecución","Cooperación técnica orientada a resultados","Acompañamiento a gobiernos regionales y locales"],
 links:["f-ter","f-dem","a-gob"]},
{id:"v-met", meta:{nombre:"Tiempo de respuesta a una solicitud",unidad:"días hasta la aprobación",desde:{etiqueta:"2025",valor:180},hasta:{etiqueta:"Meta 2031",valor:90}},temas:"cercanía agilidad impacto oficinas país tiempos de respuesta presencia local desembolso servicio al cliente flexibilidad",lvl:3,t:"Método CAF: cercanía, agilidad e impacto",sub:"La forma de trabajar como ventaja competitiva",
 lead:"Cercanía y atención integral a los países como ancla de las prioridades y de la agenda.",
 what:"El Banco cuenta con 19 oficinas en América Latina, el Caribe y Europa, avanza en la incorporación de edificios corporativos propios y ha sumado Casas de la Integración y agencias. La presencia física expresa un compromiso de cercanía para responder con agilidad y pertinencia, y articular actores para la innovación y la integración.",
 acts:["Presencia física y equipos cerca del cliente","Tiempos de respuesta y aprobación competitivos","Soluciones a la medida de cada país","Foco en desembolso, ejecución e impacto medible"],
 links:["a-gob","f-ter","t-pro"]},

{id:"a-sos", meta:{nombre:"Cartera total",unidad:"US$ miles de millones",desde:{etiqueta:"2025",valor:39.1},hasta:{etiqueta:"Meta 2031",valor:78}},temas:"capital calificación crediticia rating riesgo tesorería fondeo mercados de capital patrimonio solidez bonos híbridos balance solvencia cartera",lvl:4,t:"Sostenibilidad, solidez e innovación financiera",sub:"Sostener el crecimiento con disciplina",
 lead:"La expansión ha venido acompañada de disciplina financiera y de las mejores calificaciones de la historia de CAF.",
 what:"Hacia 2031 la agenda financiera es la que sostiene toda la propuesta: optimizar el balance, movilizar más recursos y ampliar la capacidad de respuesta. La innovación reciente —bonos híbridos y acuerdos de intercambio de exposición entre multilaterales— muestra el camino para crecer sin comprometer la solvencia.",
 acts:["Gestión de capital y optimización del balance","Innovación en instrumentos: híbridos, intercambio de exposición y garantías","Calificaciones de riesgo y acceso competitivo a mercados","Trayectoria de crecimiento de la cartera hacia 2030"],
 links:["v-mov","v-fin","t-res"]},
{id:"a-tal", meta:{nombre:"Procesos críticos digitalizados",unidad:"% de los procesos",desde:{etiqueta:"2025",valor:22},hasta:{etiqueta:"Meta 2031",valor:85}},temas:"recursos humanos talento cultura organizacional digitalización sistemas datos automatización capacitación tecnología procesos internos colaboración aprendizaje",lvl:4,t:"Talento y futuro digital",sub:"Las capacidades internas que sostienen la estrategia",
 lead:"La estrategia se ejecuta con personas y con procesos digitales a la altura.",
 what:"Un banco más grande y más cercano necesita talento distribuido en la región, procesos apoyados en datos y automatización, y una cultura de colaboración y aprendizaje continuo. El futuro digital del Banco es condición para sostener la agilidad prometida a los países.",
 acts:["Atracción, desarrollo y retención del talento","Datos, automatización e IA en los procesos del Banco","Cultura de colaboración y aprendizaje","Modelo de trabajo distribuido en la región"],
 links:["v-con","v-met","f-dig"]},
{id:"a-gob", meta:{nombre:"Costo administrativo por unidad de cartera",unidad:"índice, base 100 en 2025",desde:{etiqueta:"2025",valor:100},hasta:{etiqueta:"Meta 2031",valor:78}},temas:"gobierno corporativo transparencia control interno auditoría eficiencia procesos resultados impacto integridad cumplimiento gestión de riesgos evaluación",lvl:4,t:"Gobernanza, efectividad y excelencia operacional",sub:"Decidir rápido y ejecutar bien",
 lead:"Mayor efectividad, cercanía y excelencia operacional.",
 what:"La gobernanza es lo que convierte la ambición en resultados: decisiones ágiles, gestión por resultados con evaluación de impacto, calidad de servicio al cliente y una gestión de riesgos e integridad a la altura de un banco de desarrollo regional de referencia.",
 acts:["Decisiones ágiles y gobierno corporativo sólido","Gestión por resultados y evaluación de impacto","Excelencia en el servicio al cliente","Gestión de riesgos, cumplimiento e integridad"],
 links:["v-met","v-cap","t-pro"]}
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
 // El texto de la portada del recorrido se edita acá
 {kind:'cover',
  p:'No se escribió en un escritorio. Esta estrategia se construyó junto a los países accionistas y sus equipos técnicos, con los equipos de CAF y con expertos internacionales, leyendo el contexto global que viene. De ese diálogo salió una hoja de ruta que persigue lo mismo por dos caminos: aprovechar las oportunidades que hoy se le abren a la región y saldar los desbalances históricos que todavía marcan su desarrollo.'},
 {kind:'trans'},
 {kind:'goal'},
 {kind:'attrs'},
 {kind:'level', lvl:2, kick:'Nivel 2', h:'Las <em>oportunidades</em> de la región',
  p:'Seis frentes donde se concentra el potencial de la región hacia 2031.'},
 {kind:'level', lvl:3, kick:'Nivel 3', h:'Las agendas <em>transversales</em> de CAF',
  p:'Lo que el Banco aporta más allá del volumen de financiamiento. Atraviesan todas las agendas y toda su acción.'},
 {kind:'level', lvl:4, kick:'Nivel 4', h:'Las agendas <em>habilitadoras</em>',
  p:'El trabajo puertas adentro que habilita todo lo demás.'},
 {kind:'close'}
];
