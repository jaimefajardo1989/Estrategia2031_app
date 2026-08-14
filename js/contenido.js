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
  /* El flamenco animado ya existía para la portada: se reutiliza el mismo
     archivo como decoración de las agendas habilitadoras. */
  flamenco_anim: 'video/flamenco_anim.webp',
  guacamaya_anim: 'video/guacamaya_anim.webp',
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
  1:{name:"Objetivo al 2031", color:"var(--green-d)", tono:"var(--green-tx)",
     deco:IMG.macaw, decoAnim:IMG.guacamaya_anim,
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

  4:{name:"Habilitadoras", color:"var(--coral-d)", tono:"var(--coral-tx)",
     deco:IMG.flamingo, decoAnim:IMG.flamenco_anim,
     explica:{
       t:"Agendas habilitadoras",
       lead:"Las condiciones internas que hacen posible todo lo demás.",
       what:"Las tres anteriores miran hacia la región; estas miran hacia adentro: la solidez financiera, las personas y la tecnología, y la manera de gobernarnos y operar. Están en el mapa porque una institución no puede prometer más de lo que su propia estructura aguanta. Sin capital sólido no hay volumen de financiamiento; sin equipos y sistemas a la altura no hay agilidad; sin gobernanza clara no hay confianza de los mercados ni de los países.",
       acts:["Sostener el crecimiento con disciplina financiera","Talento y procesos digitales a la altura de lo prometido","Gobernanza que convierta la ambición en resultados"]}}
};

const DATA = [
/* El objetivo estratégico, con texto e indicadores validados. */
{id:"obj", validado:true,
 metas:[
  {nombre:"Cartera al 2031", valor:67000, pre:"USD ", uni:"millones"},
  {nombre:"Aprobaciones acumuladas entre 2026 y 2031", valor:100000, pre:"USD ", uni:"millones"}
 ],
 /* Los tres conceptos que la segunda frase define uno por uno */
 resalta:["resiliencia","integración","prosperidad"],
 temas:"visión misión países miembros bienestar horizonte plataforma regional cartera aprobaciones socio resiliencia integración prosperidad crecimiento sostenible inclusivo",lvl:1,t:"Una región más resiliente, integrada y próspera, donde el desarrollo sostenible se traduce en bienestar para cada persona",
 lead:"Ser el principal socio de los países accionistas para llegar allí.",
 what:"A partir del entendimiento compartido con sus países accionistas sobre los principales retos, desbalances y transiciones que marcarán el desarrollo de la región hacia 2031, CAF aspira a ser el principal socio de sus países accionistas para avanzar hacia una América Latina y el Caribe más resiliente, integrada y próspera, donde el desarrollo sostenible se traduzca en bienestar para cada persona. Esta visión reconoce la resiliencia como capacidad para enfrentar un entorno más incierto, la integración como condición para ampliar la escala y las capacidades de la región, y la prosperidad como expresión de un crecimiento sostenible e inclusivo que genere mayores oportunidades para todos los latinoamericanos y caribeños.",
 acts:["Resiliencia: capacidad para enfrentar un entorno más incierto","Integración: condición para ampliar la escala y las capacidades de la región","Prosperidad: crecimiento sostenible e inclusivo, con más oportunidades para todos","Un entendimiento construido junto a los países accionistas sobre los retos, desbalances y transiciones de la región"],
 links:["t-res","t-int","t-pro"]},

{id:"t-res", validado:true, temas:"resiliencia choques desastres clima fiscal contingente emergencia riesgo", lvl:1, t:"resiliente",
 lead:"Capacidad de anticiparse, adaptarse y responder a un entorno cada vez más incierto.",
 resumen:"Es la capacidad de los países y territorios para anticiparse, adaptarse y responder a un entorno cada vez más incierto, fortaleciendo sus instituciones, economías, infraestructuras y comunidades para enfrentar crisis y sostener su desarrollo en el tiempo.",
 what:"Es la capacidad de los países y territorios para anticiparse, adaptarse y responder a un entorno cada vez más incierto, fortaleciendo sus instituciones, economías, infraestructuras y comunidades para enfrentar crisis y sostener su desarrollo en el tiempo.",
 links:["obj"]},
{id:"t-int", validado:true, temas:"integración corredores fronteras comercio interconexión regional mercados", lvl:1, t:"integrada",
 lead:"Capacidad de conectar mejor las economías, los territorios y las capacidades de la región.",
 resumen:"Es la capacidad de la región para conectar mejor sus economías, territorios, mercados, infraestructuras y capacidades, aprovechando la escala regional para ampliar oportunidades, fortalecer su competitividad y tener una mayor inserción en el mundo.",
 what:"Es la capacidad de la región para conectar mejor sus economías, territorios, mercados, infraestructuras y capacidades, aprovechando la escala regional para ampliar oportunidades, fortalecer su competitividad y tener una mayor inserción en el mundo.",
 links:["obj"]},
{id:"t-pro", validado:true, temas:"prosperidad productividad empleo pymes crecimiento bienestar oportunidades", lvl:1, t:"próspera",
 lead:"Que el crecimiento se traduzca en oportunidades, empleo y calidad de vida.",
 resumen:"Es lograr que el crecimiento económico se traduzca de manera sostenible e inclusiva en más oportunidades, mejores empleos, mayor productividad y una mejor calidad de vida para las personas de América Latina y el Caribe.",
 what:"Es lograr que el crecimiento económico se traduzca de manera sostenible e inclusiva en más oportunidades, mejores empleos, mayor productividad y una mejor calidad de vida para las personas de América Latina y el Caribe.",
 links:["obj"]},

{id:"f-amb", temas:"agricultura agua bosques biodiversidad clima adaptación carbono emisiones deforestación sequía inundaciones cuencas suelo Amazonía naturaleza reforestación economía azul desastres", lvl:2, t:"Ambiental", sub:"Adaptación, naturaleza y gestión del riesgo"},
/* Tercera agenda con texto e indicadores validados. */
{id:"f-ene", validado:true,
 metas:[
  {nombre:"Personas beneficiadas por los proyectos de transición energética",
   valor:2.8, uni:"millones de personas"}
 ],
 /* Los cuatro objetivos que la agenda tiene que combinar a la vez */
 resalta:["descarbonización","seguridad energética","asequibilidad","desarrollo económico"],
 temas:"energía electricidad renovables solar eólica hidroeléctrica transmisión almacenamiento redes litio cobre minerales críticos hidrógeno eficiencia energética combustibles gas natural nuclear descarbonización interconexión blended finance certificación bancabilidad seguridad energética asequibilidad generación firme", lvl:2, t:"Energética", sub:"Modernización, integración y seguridad del suministro",
 lead:"Modernizar los sistemas energéticos e integrar la región, reconociendo la realidad de cada país.",
 resumen:"Al 2031, CAF modernizará los sistemas energéticos de la región e impulsará una integración eléctrica y gasífera más pragmática.",
 what:"De cara a 2031, CAF impulsará una agenda energética que combine descarbonización, seguridad energética, asequibilidad y desarrollo económico, reconociendo las distintas realidades de América Latina y el Caribe. Para ello, apoyará la modernización de los sistemas energéticos mediante inversiones en generación renovable, almacenamiento, transmisión y, cuando corresponda, fuentes de transición y generación firme como el gas natural y la energía nuclear. Asimismo, promoverá el aprovechamiento de los minerales críticos como oportunidad de desarrollo productivo, ampliará el uso de blended finance para mejorar la bancabilidad de proyectos y fortalecerá marcos regulatorios y mecanismos de certificación. De manera complementaria, impulsará una integración energética regional más pragmática, mediante interconexiones eléctricas y gasíferas que fortalezcan la resiliencia, competitividad y seguridad del suministro.",
 acts:["Generación renovable, almacenamiento y transmisión","Fuentes de transición y generación firme cuando corresponda: gas natural y energía nuclear","Minerales críticos como oportunidad de desarrollo productivo","Blended finance para mejorar la bancabilidad de los proyectos","Marcos regulatorios y mecanismos de certificación","Interconexiones eléctricas y gasíferas para la integración energética regional"],
 links:["t-int","v-int","v-fin"]},
{id:"f-dig", temas:"conectividad internet banda ancha fibra óptica datos inteligencia artificial IA gobierno digital ciberseguridad pagos inclusión financiera telecomunicaciones centros de datos cables submarinos identidad digital", lvl:2, t:"Digital", sub:"Conectividad, datos e inteligencia artificial"},
{id:"f-dem", temas:"empleo trabajo juventud jóvenes envejecimiento pensiones salud cuidados mujeres género migración educación formación capacitación informalidad población primera infancia", lvl:2, t:"Demográfica", sub:"Bono demográfico, cuidados y migración"},
{id:"f-ter", temas:"ciudades urbano vivienda movilidad transporte metro agua potable saneamiento alcantarillado residuos rural caminos carreteras subnacional municipios hábitat territorio barrios", lvl:2, t:"Territorial", sub:"Ciudades, regiones y gobiernos subnacionales"},
{id:"f-pro", temas:"productividad pymes mipymes empresas exportaciones comercio industria manufactura innovación cadenas de valor competitividad crédito emprendimiento turismo agroindustria logística", lvl:2, t:"Productiva y competitiva", sub:"Productividad, pymes, comercio y turismo"},

/* Segunda agenda con texto e indicadores validados. Misma estructura que
   Integración regional pragmática. */
{id:"v-mov", validado:true,
 /* Estos cuatro indicadores van sin "detalle": no llevan botón ni panel, solo
    la cifra y su nombre. */
 metas:[
  {nombre:"Movilización total de recursos entre 2026 y 2031, al menos 40% por encima del período anterior",
   valor:12000, pre:"USD ", uni:"millones"},

  {nombre:"Factor de movilización: más de USD 2 de terceros por cada USD 1 aportado por CAF",
   valor:2, suf:"x"},

  {nombre:"Proporción mínima de los recursos movilizados que proviene del sector privado",
   valor:2, suf:"/3"},

  {nombre:"Proporción mínima de cooperaciones técnicas vinculadas directamente con operaciones de crédito",
   valor:50, suf:"%"}
 ],
 /* Los tres pilares de la agenda, resaltados dentro del párrafo */
 resalta:["movilizar","diversificar","alinear"],
 temas:"cofinanciamiento donantes fondos verdes alianzas movilización banca multilateral inversión privada filantropía sindicación capital concesional emisiones temáticas cooperación técnica catalizador socios originación cofinanciación capital privado", lvl:3, t:"Movilización de recursos y alianzas globales", sub:"Que cada dólar de CAF traiga más recursos",
 lead:"Movilizar, diversificar alianzas y alinear la cooperación técnica: tres pilares para multiplicar cada dólar.",
 resumen:"Al 2031, CAF movilizará más recursos, diversificará sus alianzas globales y alineará la cooperación técnica para multiplicar cada dólar que aporta.",
 what:"De cara a 2031, CAF buscará consolidar su papel como catalizador de recursos, alianzas y conocimiento para ampliar la escala y el impacto de sus intervenciones en América Latina y el Caribe. Para ello, la agenda se estructurará en tres pilares estratégicos: movilizar mayores recursos hacia la región, incorporando la movilización y la cofinanciación desde la originación de las operaciones y fortaleciendo la participación del capital privado; diversificar y profundizar las alianzas globales, ampliando la red de socios de CAF y su presencia en espacios estratégicos para atraer nuevas oportunidades de inversión y cooperación y proyectar la voz de la región; y alinear la cooperación técnica con las agendas misionales y la originación de operaciones, orientando recursos de terceros hacia la preparación y estructuración de iniciativas de alto impacto. Con ello, CAF buscará multiplicar los recursos y capacidades que acompañan su financiamiento y conectar las prioridades de sus países accionistas con nuevas fuentes de capital, conocimiento y alianzas globales.",
 acts:["Movilizar: incorporar la movilización y la cofinanciación desde la originación de las operaciones","Fortalecer la participación del capital privado en las operaciones","Diversificar: ampliar la red de socios y la presencia en espacios estratégicos","Proyectar la voz de la región y atraer nuevas oportunidades de inversión y cooperación","Alinear: orientar la cooperación técnica y los fondos de terceros hacia la preparación y estructuración de proyectos"],
 links:["t-int","v-fin","v-int"]},
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
 resumen:"Al 2031, CAF trabajará en conectar, comerciar y coproducir para convertir la integración en proyectos, inversiones y resultados concretos.",
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

/* Cada transición va con dos textos:
     txt   = el resumen. Es lo que se lee en la tarjeta y en el recorrido.
     texto = el texto completo, que aparece al hacer clic en la tarjeta.        */
const TRANS = [
 {lab:"Transición ambiental", img:IMG.ph_amb,
  txt:"Adaptar la producción, la inversión y las ciudades al cambio climático, y aprovechar el capital natural de la región.",
  texto:"Es la necesidad de adaptar la forma en que producimos, invertimos y desarrollamos nuestras ciudades y territorios frente al cambio climático y la pérdida de biodiversidad. Para la región, supone fortalecer la resiliencia ante eventos extremos y, al mismo tiempo, aprovechar su extraordinario capital natural como una fuente de desarrollo sostenible y nuevas oportunidades económicas."},

 {lab:"Transición energética", img:IMG.ph_ene,
  txt:"Sistemas de energía más limpios, seguros y eficientes, aprovechando los recursos energéticos de la región.",
  texto:"Es el cambio hacia sistemas de energía más limpios, seguros y eficientes, combinando la expansión de las energías renovables con nuevas tecnologías, almacenamiento y fuentes de transición. Para América Latina y el Caribe, implica aprovechar sus recursos energéticos para reducir emisiones, fortalecer la seguridad energética y generar nuevas oportunidades de inversión y desarrollo."},

 {lab:"Transición digital", img:IMG.ph_dig,
  txt:"Tecnologías digitales, datos e inteligencia artificial para elevar la productividad y mejorar los servicios públicos.",
  texto:"Es la transformación de la economía, los servicios y la forma de trabajar a partir del uso creciente de tecnologías digitales, datos e inteligencia artificial. Para la región, representa una oportunidad para aumentar la productividad, mejorar los servicios públicos, conectar territorios y empresas y desarrollar nuevas capacidades, siempre que se reduzcan las brechas de acceso y talento digital."},

 {lab:"Transición demográfica", img:IMG.ph_dem,
  txt:"Envejecimiento, urbanización y migración cambian las necesidades de empleo, educación, salud, cuidados y vivienda.",
  texto:"Es el cambio en la estructura y distribución de la población, marcado por el envejecimiento, la urbanización y los movimientos migratorios, con diferencias importantes entre países. Estos cambios transformarán las necesidades de empleo, educación, salud, cuidados, vivienda e infraestructura, y exigirán políticas capaces de aprovechar el talento de la población y responder a nuevas demandas sociales."}
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
