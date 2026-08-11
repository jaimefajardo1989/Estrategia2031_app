/**
 * CONTENIDO EDITABLE DEL ÁRBOL ESTRATÉGICO
 * =========================================
 * Este es el único archivo que necesitás tocar para cambiar textos.
 * No hay que saber programar: editá lo que está entre comillas.
 *
 * Reglas simples:
 *  - Cambiá SOLO el texto entre comillas ' '.
 *  - No borres las comas al final de cada línea.
 *  - Si un texto lleva un apóstrofe (por ejemplo: d'agua), escribilo así: \'
 *
 * Hay dos cosas que se pueden abrir con un clic:
 *
 *  1) La ETIQUETA de un nivel (Oportunidades, Valor agregado, Agendas
 *     institucionales) explica qué es ese tipo de agenda. Se activa poniéndole
 *     un bloque "detalle" al nivel.
 *
 *  2) Cada TARJETA dice qué hará CAF al 2031 y con qué indicador se sigue.
 *
 * Forma de un bloque "detalle":
 *
 *   detalle: {
 *     resumen: 'Frase de entrada, debajo del título.',
 *     secciones: [
 *       { titulo: 'Qué haremos al 2031', texto: 'Párrafo.' },
 *     ],
 *     indicador: {                      // OPCIONAL: si no aplica, borrá el bloque
 *       nombre: '...', descripcion: '...', meta: '...',
 *       grafico: { ... },               // OPCIONAL: dibuja la barra de avance
 *     },
 *   }
 *
 * LAS BARRAS (campo "grafico")
 * ----------------------------
 * Muestran cuánto se avanzó entre la línea base y la meta 2031:
 *
 *   grafico: {
 *     unidad: 'US$ miles de millones',        // se muestra al lado del número
 *     desde: { etiqueta: '2025', valor: 32.5 },      // punto de partida
 *     hoy:   { etiqueta: '2026', valor: 34.8 },      // OPCIONAL: dónde estamos
 *     hasta: { etiqueta: 'Meta 2031', valor: 52 },   // a dónde queremos llegar
 *   }
 *
 * Sirve igual para indicadores que suben (cartera) y para los que bajan (días
 * de respuesta, costo): si "hasta" es menor que "desde", la barra lo entiende
 * sola y sigue midiendo el avance hacia la meta.
 *
 * Los decimales se escriben con punto (32.5) y se muestran con coma (32,5).
 * Si una tarjeta no necesita barra, borrá su bloque "grafico" y listo.
 *
 * El objetivo al 2031 tiene además un bloque "metricas" con los indicadores de
 * toda la estrategia, que usan exactamente el mismo formato.
 *
 * El campo "temas" alimenta el buscador de arriba a la derecha. Son palabras
 * por las que querés que esa tarjeta se encienda. El buscador también mira el
 * título y todos los textos, así que "temas" sirve para agregar sinónimos que
 * no aparecen escritos (ej.: "agricultura" en la tarjeta Ambiental).
 */

const ESTRATEGIA = {
  meta: {
    titulo: 'Estrategia 2031',
    // Esta parte del título se pinta en turquesa, como en la presentación
    tituloResaltado: '2031',
    subtitulo: 'Árbol estratégico institucional',
    ayuda: 'Hacé clic en cualquier tarjeta, o en el nombre de un nivel, para ver el detalle',
    marcadorBusqueda: 'Buscar un tema: agricultura, pymes, agua…',
    pieDePagina: 'Contenido preliminar — sujeto a revisión y validación institucional',
    // Poné false cuando los textos estén validados y desaparece el sello "Borrador"
    marcarBorrador: true,
    // Poné false cuando las cifras de los gráficos sean las reales
    datosDeEjemplo: true,
  },

  niveles: [
    /* ================================================================ */
    {
      id: 'objetivo',
      etiqueta: 'Objetivo al 2031',
      estilo: 'objetivo',
      elementos: [
        {
          id: 'objetivo-2031',
          titulo:
            'Una región más resiliente, integrada y próspera, donde el desarrollo sostenible se traduce en bienestar para cada persona',
          temas: 'visión misión horizonte países miembros bienestar desarrollo sostenible',
          detalle: {
            resumen:
              'El punto de llegada que ordena todo lo demás. Cada oportunidad, cada agenda y cada operación se leen desde acá.',
            secciones: [
              {
                titulo: 'En línea con nuestra visión y nuestra misión',
                texto:
                  'Este objetivo no reemplaza lo que somos: lo pone en horizonte. Traduce la visión y la misión de CAF en una imagen concreta de la región que queremos ver en 2031, y le da a toda la institución un criterio común para decidir qué priorizar cuando hay que elegir.',
              },
              {
                titulo: 'Definido junto a los países',
                texto:
                  'No se escribió en un escritorio. Surge del diálogo con los países miembros sobre sus prioridades reales, y por eso compromete en la misma dirección a la institución y a la región: resiliencia frente a los choques, integración que abra mercados y oportunidades, y prosperidad que se mida en la vida de cada persona.',
              },
              {
                titulo: 'Tres palabras que no son decorativas',
                texto:
                  'Resiliente, porque la región enfrenta choques climáticos, económicos y sociales cada vez más frecuentes. Integrada, porque ningún país resuelve solo lo que es regional. Próspera, porque el crecimiento solo cuenta si llega a la gente.',
              },
              {
                titulo: 'Cómo se lee este árbol',
                texto:
                  'De arriba hacia abajo. El objetivo marca el destino. Las oportunidades muestran dónde está el terreno fértil. El valor agregado explica qué ponemos nosotros que otro no pone. Y las agendas institucionales definen cómo nos preparamos por dentro para lograrlo. Hacé clic en el nombre de cada nivel para ver a qué se refiere.',
              },
            ],

            /**
             * Indicadores de toda la estrategia, no de una agenda en particular.
             * Se dibujan como barras de avance entre la línea base y la meta 2031.
             */
            metricas: {
              titulo: 'Metas de toda la estrategia',
              nota: 'Indicadores que se siguen a nivel institucional y que resumen el avance del conjunto.',
              items: [
                {
                  nombre: 'Cartera total',
                  unidad: 'US$ miles de millones',
                  desde: { etiqueta: '2025', valor: 32.5 },
                  hoy: { etiqueta: '2026', valor: 34.8 },
                  hasta: { etiqueta: 'Meta 2031', valor: 52 },
                },
                {
                  nombre: 'Aprobaciones acumuladas 2025–2031',
                  unidad: 'US$ miles de millones',
                  desde: { etiqueta: '2025', valor: 0 },
                  hoy: { etiqueta: '2026', valor: 14.2 },
                  hasta: { etiqueta: 'Meta 2031', valor: 90 },
                },
                {
                  nombre: 'Financiamiento verde sobre la cartera',
                  unidad: '% de la cartera total',
                  desde: { etiqueta: '2025', valor: 24 },
                  hoy: { etiqueta: '2026', valor: 27 },
                  hasta: { etiqueta: 'Meta 2031', valor: 45 },
                },
                {
                  nombre: 'Recursos de terceros movilizados',
                  unidad: 'US$ miles de millones',
                  desde: { etiqueta: '2025', valor: 2.1 },
                  hoy: { etiqueta: '2026', valor: 2.8 },
                  hasta: { etiqueta: 'Meta 2031', valor: 9 },
                },
              ],
            },
          },
        },
      ],
    },

    /* ================================================================ */
    {
      id: 'oportunidades',
      etiqueta: 'Oportunidades',
      estilo: 'oportunidades',

      // Se abre al hacer clic en la etiqueta "Oportunidades"
      detalle: {
        resumen:
          'Fuerzas de cambio que ya están transformando la región. No son problemas a administrar: son los terrenos donde se abren oportunidades concretas, y donde llegar temprano marca la diferencia.',
        secciones: [
          {
            titulo: 'Qué son estas agendas',
            texto:
              'No son sectores ni áreas de negocio. Son seis transformaciones estructurales —ambiental, energética, digital, demográfica, territorial y productiva— que van a ocurrir con nosotros o sin nosotros, y que redefinen qué países quedan mejor parados en la próxima década.',
          },
          {
            titulo: 'Por qué están en el árbol',
            texto:
              'Porque marcan dónde conviene concentrar el esfuerzo. Una institución de desarrollo con recursos limitados no puede estar en todo: estas seis fuerzas son el filtro que indica dónde una intervención tiene efecto multiplicador y dónde apenas acompaña la inercia.',
          },
          {
            titulo: 'Cómo se traducen en acción',
            texto:
              'Cada una tiene un compromiso concreto al 2031 y un indicador con el que seguirlo. Hacé clic en cualquiera de las seis tarjetas para ver qué haremos en ese frente.',
          },
        ],
      },

      elementos: [
        {
          id: 'oportunidad-ambiental',
          titulo: 'Ambiental',
          temas:
            'agricultura agua bosques biodiversidad clima cambio climático adaptación mitigación carbono emisiones deforestación desastres naturales sequía inundaciones cuencas suelo Amazonía naturaleza resiliencia climática riesgo ambiental reforestación conservación',
          detalle: {
            resumen:
              'La región concentra una porción decisiva del capital natural del planeta y, a la vez, una altísima exposición a eventos climáticos extremos.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Consolidar a CAF como el banco verde de América Latina y el Caribe. Eso significa financiar infraestructura preparada para el clima que viene, proteger bosques y cuencas, y acompañar una agricultura capaz de producir más con menos agua y menos suelo degradado. También significa ayudar a los países a estructurar proyectos que hoy no acceden a los fondos climáticos internacionales, no por falta de mérito, sino por falta de preparación técnica.',
              },
            ],
            indicador: {
              nombre: 'Financiamiento verde y de adaptación aprobado',
              descripcion:
                'Monto anual destinado a proyectos con beneficio climático verificable, distinguiendo mitigación de adaptación, y proporción que representa sobre la cartera total.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'US$ mil millones por año',
                desde: { etiqueta: '2025', valor: 3.2 },
                hoy: { etiqueta: '2026', valor: 3.9 },
                hasta: { etiqueta: 'Meta 2031', valor: 8.5 },
              },
            },
          },
        },
        {
          id: 'oportunidad-energetica',
          titulo: 'Energética',
          temas:
            'energía electricidad renovables solar eólica hidroeléctrica transición energética redes transmisión interconexión litio cobre minerales críticos hidrógeno eficiencia energética combustibles petróleo gas acceso a la energía almacenamiento baterías',
          detalle: {
            resumen:
              'América Latina y el Caribe parte de una matriz eléctrica entre las más limpias del mundo. Esa ventaja no está garantizada: hay que sostenerla y capitalizarla.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Financiar la ampliación de generación renovable y, sobre todo, las redes de transmisión que la hacen utilizable, que hoy son el cuello de botella real. Acompañar a los países que tienen minerales críticos para que capturen valor y no solo exporten roca. Y empujar la interconexión eléctrica entre países, que permite aprovechar excedentes en lugar de duplicar inversión.',
              },
            ],
            indicador: {
              nombre: 'Capacidad renovable y de transmisión habilitada',
              descripcion:
                'Megavatios de generación limpia y kilómetros de red financiados o habilitados por operaciones de CAF, incluyendo proyectos de interconexión entre países.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'MW acumulados',
                desde: { etiqueta: '2025', valor: 0 },
                hoy: { etiqueta: '2026', valor: 1850 },
                hasta: { etiqueta: 'Meta 2031', valor: 12000 },
              },
            },
          },
        },
        {
          id: 'oportunidad-digital',
          titulo: 'Digital',
          temas:
            'conectividad internet banda ancha fibra óptica datos inteligencia artificial IA gobierno digital ciberseguridad pagos digitales inclusión financiera brecha digital tecnología software telecomunicaciones plataformas identidad digital',
          detalle: {
            resumen:
              'La tecnología cambia más rápido que la capacidad de los Estados y las empresas para adoptarla. Ahí se abre una brecha, y también una oportunidad.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Financiar la infraestructura digital que falta —conectividad en zonas donde el mercado no llega solo— y acompañar la digitalización de servicios públicos, que baja el costo de gestionarlos y le ahorra tiempo a la gente. Impulsar sistemas de pagos e identidad digital que amplíen la inclusión financiera. Y trabajar la adopción de inteligencia artificial en el sector público con criterio, no como moda.',
              },
            ],
            indicador: {
              nombre: 'Población alcanzada por servicios digitales financiados',
              descripcion:
                'Personas con acceso nuevo o mejorado a conectividad, servicios públicos digitales o instrumentos de pago digital gracias a operaciones de CAF.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'millones de personas',
                desde: { etiqueta: '2025', valor: 0 },
                hoy: { etiqueta: '2026', valor: 6.4 },
                hasta: { etiqueta: 'Meta 2031', valor: 40 },
              },
            },
          },
        },
        {
          id: 'oportunidad-demografica',
          titulo: 'Demográfica',
          temas:
            'empleo trabajo juventud jóvenes envejecimiento pensiones jubilaciones salud cuidados mujeres género migración educación formación capacitación informalidad población primera infancia desigualdad',
          detalle: {
            resumen:
              'La ventana del bono demográfico se está cerrando. Lo que se haga en esta década define cómo envejece la región.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Financiar formación y empleo de calidad para que la población en edad de trabajar se traduzca en productividad y no en informalidad. Apoyar sistemas de cuidados que liberen tiempo —hoy asumido casi enteramente por mujeres— y habiliten participación laboral. Y acompañar a los países en la reforma de sistemas de pensiones y salud antes de que la presión demográfica los vuelva inviables.',
              },
            ],
            indicador: {
              nombre: 'Personas con acceso a formación, empleo o cuidados',
              descripcion:
                'Beneficiarios directos de programas financiados por CAF en formación técnica, inserción laboral y servicios de cuidado, con apertura por género y por tramo de edad.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'millones de personas',
                desde: { etiqueta: '2025', valor: 0 },
                hoy: { etiqueta: '2026', valor: 1.1 },
                hasta: { etiqueta: 'Meta 2031', valor: 8 },
              },
            },
          },
        },
        {
          id: 'oportunidad-territorial',
          titulo: 'Territorial',
          temas:
            'ciudades urbano vivienda movilidad transporte metro buses agua potable saneamiento alcantarillado residuos basura rural caminos carreteras vialidad territorio desarrollo urbano barrios asentamientos infraestructura social espacio público',
          detalle: {
            resumen:
              'Es una de las regiones más urbanizadas del planeta, pero con enormes diferencias entre territorios que conviven a pocos kilómetros.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Financiar infraestructura urbana que mejore la vida cotidiana y la productividad al mismo tiempo: movilidad, agua y saneamiento, mejoramiento de barrios. Y conectar territorios rezagados con los mercados, porque la distancia a los servicios básicos sigue siendo el principal determinante de la desigualdad en la región. Todo con planificación previa: crecer primero y ordenar después sale mucho más caro.',
              },
            ],
            indicador: {
              nombre: 'Hogares con acceso mejorado a servicios básicos',
              descripcion:
                'Hogares que acceden a agua potable, saneamiento, movilidad o vivienda adecuada mediante proyectos financiados por CAF, diferenciando ámbito urbano y rural.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'millones de hogares',
                desde: { etiqueta: '2025', valor: 0 },
                hoy: { etiqueta: '2026', valor: 0.9 },
                hasta: { etiqueta: 'Meta 2031', valor: 6.5 },
              },
            },
          },
        },
        {
          id: 'oportunidad-productiva',
          titulo: 'Productiva y competitiva',
          temas:
            'productividad pymes mipymes empresas exportaciones comercio industria manufactura innovación cadenas de valor competitividad crédito emprendimiento turismo agroindustria logística inversión extranjera diversificación',
          detalle: {
            resumen:
              'El talón de Aquiles de la región: la productividad crece poco desde hace décadas. Sin moverla, ningún otro avance se sostiene en el tiempo.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Llevar financiamiento, tecnología y estándares a las empresas pequeñas y medianas, que concentran el empleo y quedan fuera del crédito formal. Acompañar la diversificación exportadora aprovechando la reconfiguración del comercio global, que abre espacio para que la región gane posiciones en cadenas de valor. Y financiar la logística que hace competitivo lo que se produce: sin puertos, rutas y aduanas que funcionen, la ventaja productiva se pierde en el camino.',
              },
            ],
            indicador: {
              nombre: 'Empresas alcanzadas y exportaciones habilitadas',
              descripcion:
                'Número de empresas —con foco en pymes— que acceden a financiamiento o asistencia técnica de CAF, y valor exportado asociado a proyectos de infraestructura logística financiada.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'miles de empresas',
                desde: { etiqueta: '2025', valor: 0 },
                hoy: { etiqueta: '2026', valor: 18 },
                hasta: { etiqueta: 'Meta 2031', valor: 120 },
              },
            },
          },
        },
      ],
    },

    /* ================================================================ */
    {
      id: 'valor',
      etiqueta: 'Valor agregado',
      estilo: 'valor',
      segmentado: true,

      // Se abre al hacer clic en la etiqueta "Valor agregado"
      detalle: {
        resumen:
          'Agendas donde CAF agrega valor de manera transversal: atraviesan todos los sectores y todas las operaciones, sin ser ninguno en particular.',
        secciones: [
          {
            titulo: 'Qué son estas agendas',
            texto:
              'No son áreas de negocio ni líneas de producto. Son las seis capacidades que atraviesan todo lo que hacemos: estén el proyecto en energía, en agua o en educación, estas seis se activan igual. Son la respuesta a una sola pregunta: qué ponemos nosotros que otro no pone.',
          },
          {
            titulo: 'Por qué importan',
            texto:
              'Porque el financiamiento, solo, es una mercancía: hay muchas fuentes de capital y varias más baratas. Lo que diferencia a una institución de desarrollo es lo que viene con el dinero —conocimiento, capacidad de convocar a otros, acompañamiento en la ejecución y una forma de trabajar que los países valoran.',
          },
          {
            titulo: 'Cómo funcionan juntas',
            texto:
              'No se eligen de a una: se combinan. Un proyecto bien hecho suele activar varias a la vez —conocimiento prospectivo que lo anticipa, capacidades institucionales que lo preparan, movilización de recursos que lo agranda y el método CAF que lo hace llegar a tiempo.',
          },
        ],
      },

      elementos: [
        {
          id: 'valor-recursos',
          titulo: 'Movilización de recursos y alianzas globales',
          temas:
            'cofinanciamiento donantes fondos verdes alianzas movilización banca multilateral inversión privada filantropía capital sindicación coinversión socios estratégicos fondos internacionales',
          detalle: {
            resumen:
              'Cada dólar propio vale más si arrastra a otros. La capacidad de convocar es tan importante como la de prestar.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Actuar como puente entre la región y las fuentes globales de financiamiento: fondos climáticos, banca de desarrollo, inversión privada y filantropía. Vamos a estructurar operaciones que por sí solas no serían atractivas para el capital privado y volverlas financiables, de modo que cada peso propio movilice varios de terceros hacia los países.',
              },
            ],
            indicador: {
              nombre: 'Recursos de terceros movilizados por unidad de capital propio',
              descripcion:
                'Relación entre el financiamiento externo atraído y el aporte propio de CAF en las operaciones, medida por año y por tipo de fuente.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'veces el capital propio',
                desde: { etiqueta: '2025', valor: 0.6 },
                hoy: { etiqueta: '2026', valor: 0.8 },
                hasta: { etiqueta: 'Meta 2031', valor: 2 },
              },
            },
          },
        },
        {
          id: 'valor-financiamiento',
          titulo: 'Financiamiento verde, inclusivo y digital',
          temas:
            'bonos verdes bonos temáticos bonos sostenibles inclusión financiera microfinanzas taxonomía finanzas sostenibles crédito verde instrumentos financieros garantías banca de segundo piso',
          detalle: {
            resumen:
              'No alcanza con financiar más: importa qué se financia y a quién llega.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Orientar el financiamiento hacia proyectos que reduzcan emisiones y aumenten la resiliencia, que incorporen a quienes suelen quedar fuera del sistema financiero, y que se apoyen en herramientas digitales para bajar costos y llegar más lejos. Es un criterio que va a atravesar toda la cartera, no una línea de productos aparte, e implica desarrollar instrumentos nuevos —bonos temáticos, garantías, financiamiento mixto— además de los tradicionales.',
              },
            ],
            indicador: {
              nombre: 'Cartera con etiqueta verde, inclusiva o digital',
              descripcion:
                'Proporción de la cartera total que cumple criterios verificables en al menos una de las tres dimensiones, evitando doble conteo entre categorías.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: '% de la cartera',
                desde: { etiqueta: '2025', valor: 31 },
                hoy: { etiqueta: '2026', valor: 35 },
                hasta: { etiqueta: 'Meta 2031', valor: 60 },
              },
            },
          },
        },
        {
          id: 'valor-integracion',
          titulo: 'Integración regional pragmática',
          temas:
            'fronteras pasos fronterizos corredores logística interconexión comercio regional infraestructura regional cuencas compartidas aduanas integración física acuerdos regionales conectividad regional',
          detalle: {
            resumen:
              'Integración medida en obras, acuerdos y trámites resueltos, no en declaraciones.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Financiar y articular aquello que ningún país puede resolver solo: corredores logísticos, interconexión eléctrica, pasos de frontera, cuencas compartidas y estándares comunes. Pragmática quiere decir avanzar donde hay acuerdo posible y beneficio concreto, con los países que estén listos, sin condicionar todo a consensos regionales completos que rara vez llegan.',
              },
            ],
            indicador: {
              nombre: 'Proyectos binacionales o regionales en ejecución',
              descripcion:
                'Cantidad y monto de operaciones que involucran a dos o más países, y reducción de tiempos o costos logísticos atribuible a esas obras.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'proyectos acumulados',
                desde: { etiqueta: '2025', valor: 0 },
                hoy: { etiqueta: '2026', valor: 7 },
                hasta: { etiqueta: 'Meta 2031', valor: 45 },
              },
            },
          },
        },
        {
          id: 'valor-conocimiento',
          titulo: 'Conocimiento prospectivo',
          temas:
            'estudios investigación datos evidencia análisis prospectiva políticas públicas evaluación de impacto publicaciones reporte economía y desarrollo diálogo de políticas think tank',
          detalle: {
            resumen: 'Anticipar el problema antes de que llegue a la mesa de decisión.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Producir análisis y evidencia que ayuden a los países a ver hacia adelante: qué tendencias los van a afectar, qué políticas funcionaron en contextos parecidos, qué riesgos se están acumulando. El conocimiento no va a ir por un carril separado del financiamiento: la meta es que cada operación relevante llegue con evidencia detrás y que los estudios se traduzcan en decisiones, no solo en publicaciones.',
              },
            ],
            indicador: {
              nombre: 'Uso efectivo del conocimiento producido',
              descripcion:
                'Proporción de estudios y asistencias técnicas que derivan en una operación, una política pública adoptada o un cambio normativo verificable.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: '% de los estudios',
                desde: { etiqueta: '2025', valor: 28 },
                hoy: { etiqueta: '2026', valor: 33 },
                hasta: { etiqueta: 'Meta 2031', valor: 60 },
              },
            },
          },
        },
        {
          id: 'valor-capacidades',
          titulo: 'Apoyo a las capacidades institucionales',
          temas:
            'asistencia técnica preparación de proyectos gobiernos subnacionales municipios capacitación gestión pública ejecución fortalecimiento institucional cooperación técnica empresas públicas reguladores',
          detalle: {
            resumen:
              'Los proyectos no fallan por falta de dinero tanto como por falta de capacidad para ejecutarlos.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Fortalecer a quienes llevan adelante las políticas: equipos de gobierno nacionales y subnacionales, empresas públicas y reguladores. Preparación de proyectos, asistencia técnica y acompañamiento durante la ejecución, para que lo que se aprueba efectivamente se construya y funcione. El foco está en los gobiernos subnacionales, que suelen tener las competencias pero no los equipos.',
              },
            ],
            indicador: {
              nombre: 'Ejecución efectiva de la cartera',
              descripcion:
                'Velocidad de desembolso y proporción de proyectos que se completan en el plazo previsto, comparando operaciones con y sin acompañamiento técnico de CAF.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: '% que cierra en plazo',
                desde: { etiqueta: '2025', valor: 54 },
                hoy: { etiqueta: '2026', valor: 58 },
                hasta: { etiqueta: 'Meta 2031', valor: 80 },
              },
            },
          },
        },
        {
          id: 'valor-metodo',
          titulo: 'Método CAF: cercanía, agilidad e impacto',
          temas:
            'cercanía agilidad impacto oficinas país tiempos de respuesta relacionamiento presencia local rapidez confianza servicio al cliente flexibilidad',
          detalle: {
            resumen:
              'La forma de trabajar también es parte del valor. Es lo que hace que los países nos elijan.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Sostener y profundizar las tres cosas que nos distinguen. Cercanía: presencia en los países y comprensión de su contexto político y técnico real. Agilidad: tiempos de respuesta que acompañen el ciclo de las decisiones públicas en lugar de frenarlo. Impacto: foco en el resultado en el territorio y no solo en el desembolso. Los tres juntos, porque por separado ninguno alcanza.',
              },
            ],
            indicador: {
              nombre: 'Tiempo de respuesta y satisfacción de los países',
              descripcion:
                'Plazo promedio entre la solicitud de un país y la aprobación de la operación, acompañado de una medición periódica de satisfacción de las contrapartes.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'días hasta la aprobación',
                desde: { etiqueta: '2025', valor: 180 },
                hoy: { etiqueta: '2026', valor: 165 },
                hasta: { etiqueta: 'Meta 2031', valor: 90 },
              },
            },
          },
        },
      ],
    },

    /* ================================================================ */
    {
      id: 'agendas',
      etiqueta: 'Agendas institucionales',
      estilo: 'agendas',
      segmentado: true,

      // Se abre al hacer clic en la etiqueta "Agendas institucionales"
      detalle: {
        resumen:
          'Agendas puertas adentro: cómo se prepara la institución para sostener todo lo anterior.',
        secciones: [
          {
            titulo: 'Qué son estas agendas',
            texto:
              'Las tres anteriores miran hacia afuera, hacia la región. Estas miran hacia adentro: la solidez financiera, las personas y la tecnología, y la manera de gobernarnos y operar. Son las condiciones que hacen posible todo lo demás.',
          },
          {
            titulo: 'Por qué importan',
            texto:
              'Porque una institución no puede prometer a la región más de lo que su propia estructura aguanta. Sin capital sólido no hay volumen de financiamiento; sin equipos y sistemas a la altura no hay agilidad; sin gobernanza clara no hay confianza de los mercados ni de los países.',
          },
        ],
      },

      elementos: [
        {
          id: 'agenda-financiera',
          titulo: 'Sostenibilidad, solidez e innovación financiera',
          temas:
            'capital calificación crediticia rating riesgo tesorería fondeo mercados de capital socios patrimonio solidez deuda liquidez accionistas aportes de capital innovación financiera',
          detalle: {
            resumen:
              'Crecer sin perder solidez. Es la condición que hace posible todo lo demás.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Consolidar una estructura de capital robusta y diversificada, que permita sostener un mayor volumen de operaciones sin comprometer la calificación crediticia. Esto supone ampliar la base de socios y aliados, profundizar el acceso a los mercados internacionales de capital e incorporar instrumentos que movilicen recursos adicionales hacia la región.',
              },
            ],
            indicador: {
              nombre: 'Capacidad de financiamiento sobre base patrimonial',
              descripcion:
                'Relación entre el volumen de operaciones sostenible y los indicadores de solidez patrimonial, seguida junto con la evolución de la calificación crediticia.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'veces la base patrimonial',
                desde: { etiqueta: '2025', valor: 2.4 },
                hoy: { etiqueta: '2026', valor: 2.5 },
                hasta: { etiqueta: 'Meta 2031', valor: 3.2 },
              },
            },
          },
        },
        {
          id: 'agenda-talento',
          titulo: 'Talento y futuro digital',
          temas:
            'recursos humanos talento cultura organizacional digitalización interna sistemas datos analítica capacitación tecnología procesos internos clima laboral retención liderazgo',
          detalle: {
            resumen:
              'Las personas y la tecnología que hacen falta para operar al ritmo que la región exige.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Transformar la manera de trabajar apoyándonos en capacidades digitales que agilicen los procesos, y en un modelo de gestión del talento que atraiga, desarrolle y retenga los perfiles clave. Implica modernizar los sistemas centrales, incorporar analítica de datos en la toma de decisiones y sostener una cultura de aprendizaje continuo.',
              },
            ],
            indicador: {
              nombre: 'Madurez digital y compromiso del equipo',
              descripcion:
                'Avance de los procesos críticos digitalizados de punta a punta, combinado con la medición periódica de compromiso y la retención de perfiles clave.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: '% de procesos críticos',
                desde: { etiqueta: '2025', valor: 22 },
                hoy: { etiqueta: '2026', valor: 31 },
                hasta: { etiqueta: 'Meta 2031', valor: 85 },
              },
            },
          },
        },
        {
          id: 'agenda-gobernanza',
          titulo: 'Gobernanza, efectividad y excelencia operacional',
          temas:
            'gobierno corporativo transparencia control interno auditoría eficiencia procesos resultados impacto integridad cumplimiento rendición de cuentas directorio medición evaluación',
          detalle: {
            resumen: 'Hacer más con los mismos recursos, y poder demostrarlo con evidencia.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Afianzar un modelo de gobernanza claro y transparente, con procesos internos simplificados que reduzcan los tiempos de respuesta y mecanismos sistemáticos de medición de resultados e impacto. El foco está en la eficiencia operativa y en respaldar con datos el efecto real de lo que hacemos.',
              },
            ],
            indicador: {
              nombre: 'Eficiencia operativa y cobertura de medición de impacto',
              descripcion:
                'Costo administrativo por unidad de cartera gestionada, junto con la proporción de operaciones que cuentan con medición de resultados verificable al cierre.',
              meta: 'Cifras ilustrativas: la línea base y la meta 2031 están pendientes de validación',
              grafico: {
                unidad: 'índice, base 100 en 2025',
                desde: { etiqueta: '2025', valor: 100 },
                hoy: { etiqueta: '2026', valor: 96 },
                hasta: { etiqueta: 'Meta 2031', valor: 78 },
              },
            },
          },
        },
      ],
    },
  ],
};
