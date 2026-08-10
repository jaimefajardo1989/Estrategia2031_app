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
 * Cómo está armado cada elemento del árbol:
 *
 *   {
 *     id: 'nombre-corto-sin-espacios',   // se usa en el enlace: .../#nombre-corto
 *     titulo: 'Lo que se lee en la tarjeta',
 *     detalle: {
 *       resumen: 'Frase de entrada, debajo del título.',
 *       secciones: [                      // podés poner las que quieras
 *         { titulo: 'Encabezado', texto: 'Párrafo.' },
 *       ],
 *       indicador: {                      // OPCIONAL: si no aplica, borrá este bloque
 *         nombre: '...', descripcion: '...', meta: '...',
 *       },
 *     },
 *   }
 *
 * Cualquier elemento que tenga "detalle" se vuelve clickeable automáticamente.
 */

const ESTRATEGIA = {
  meta: {
    titulo: 'Estrategia 2031',
    subtitulo: 'Árbol estratégico institucional',
    ayuda: 'Hacé clic en cualquier tarjeta para ver el detalle',
    pieDePagina: 'Contenido preliminar — sujeto a revisión y validación institucional',
    // Poné false cuando los textos estén validados y desaparece el sello "Borrador"
    marcarBorrador: true,
  },

  niveles: [
    /* ---------------------------------------------------------------- */
    {
      id: 'objetivo',
      etiqueta: 'Objetivo al 2031',
      estilo: 'objetivo',
      elementos: [
        {
          id: 'objetivo-2031',
          titulo:
            'Una región más resiliente, integrada y próspera, donde el desarrollo sostenible se traduce en bienestar para cada persona',
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
                  'De arriba hacia abajo. El objetivo marca el destino. Las oportunidades muestran dónde está el terreno fértil. El valor agregado explica qué ponemos nosotros que otro no pone. Y las agendas institucionales definen cómo nos preparamos por dentro para lograrlo.',
              },
            ],
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'oportunidades',
      etiqueta: 'Oportunidades',
      estilo: 'oportunidades',
      descripcion:
        'Fuerzas de cambio que ya están transformando la región. No son problemas a administrar: son los terrenos donde se abren oportunidades concretas para los países, y donde llegar temprano marca la diferencia.',
      elementos: [
        {
          id: 'oportunidad-ambiental',
          titulo: 'Ambiental',
          detalle: {
            resumen:
              'La región concentra una porción decisiva del capital natural del planeta y, a la vez, una alta exposición a eventos climáticos extremos.',
            secciones: [
              {
                titulo: 'Qué está pasando',
                texto:
                  'El cambio climático dejó de ser un escenario futuro: ya afecta cosechas, infraestructura, ciudades y finanzas públicas. Al mismo tiempo, los bosques, el agua y la biodiversidad de la región son activos estratégicos globales que todavía están subvalorados.',
              },
              {
                titulo: 'Dónde está la oportunidad',
                texto:
                  'En infraestructura y sistemas productivos preparados para resistir el clima que viene; en poner en valor los servicios que prestan los ecosistemas; y en atraer financiamiento internacional que hoy busca destinos creíbles para invertir en naturaleza y adaptación.',
              },
            ],
          },
        },
        {
          id: 'oportunidad-energetica',
          titulo: 'Energética',
          detalle: {
            resumen:
              'América Latina y el Caribe parte de una matriz eléctrica entre las más limpias del mundo. Esa ventaja no está garantizada: hay que sostenerla y capitalizarla.',
            secciones: [
              {
                titulo: 'Qué está pasando',
                texto:
                  'La transición energética global está reordenando inversiones, cadenas de suministro y ventajas competitivas. La demanda eléctrica crece con la electrificación del transporte y la industria, y con ella la presión sobre las redes.',
              },
              {
                titulo: 'Dónde está la oportunidad',
                texto:
                  'En ampliar generación renovable y las redes que la hacen utilizable; en los minerales críticos que la transición mundial necesita y que la región tiene; en eficiencia energética; y en convertir energía limpia y barata en un argumento para atraer industria.',
              },
            ],
          },
        },
        {
          id: 'oportunidad-digital',
          titulo: 'Digital',
          detalle: {
            resumen:
              'La tecnología cambia más rápido que la capacidad de los Estados y las empresas para adoptarla. Ahí se abre una brecha, y también una oportunidad.',
            secciones: [
              {
                titulo: 'Qué está pasando',
                texto:
                  'La conectividad avanzó, pero de manera despareja entre territorios y niveles de ingreso. La inteligencia artificial y la automatización empiezan a redefinir qué trabajos y qué sectores son competitivos.',
              },
              {
                titulo: 'Dónde está la oportunidad',
                texto:
                  'En cerrar la brecha de conectividad e infraestructura digital; en servicios públicos digitales que simplifiquen la vida de la gente y el costo de gestionarlos; en pagos e inclusión financiera digital; y en formar las capacidades para usar estas herramientas, no solo consumirlas.',
              },
            ],
          },
        },
        {
          id: 'oportunidad-demografica',
          titulo: 'Demográfica',
          detalle: {
            resumen:
              'La ventana del bono demográfico se está cerrando. Lo que se haga en esta década define cómo envejece la región.',
            secciones: [
              {
                titulo: 'Qué está pasando',
                texto:
                  'La población en edad de trabajar todavía es amplia, pero el envejecimiento avanza y presiona sobre los sistemas de pensiones y de salud. A eso se suman movimientos migratorios intrarregionales de gran escala y una demanda de cuidados que sigue recayendo de forma desigual sobre las mujeres.',
              },
              {
                titulo: 'Dónde está la oportunidad',
                texto:
                  'En convertir esa masa de población activa en productividad real mediante formación y empleo de calidad; en sistemas de cuidados que liberen tiempo y habiliten participación laboral; y en integrar a la población migrante como aporte económico y no como carga.',
              },
            ],
          },
        },
        {
          id: 'oportunidad-territorial',
          titulo: 'Territorial',
          detalle: {
            resumen:
              'Es una de las regiones más urbanizadas del planeta, pero con enormes diferencias entre territorios que conviven a pocos kilómetros.',
            secciones: [
              {
                titulo: 'Qué está pasando',
                texto:
                  'Las ciudades concentran la actividad económica y también los déficits: vivienda, movilidad, agua y saneamiento, exposición al riesgo. Fuera de ellas, la distancia a los servicios básicos sigue siendo el principal determinante de la desigualdad.',
              },
              {
                titulo: 'Dónde está la oportunidad',
                texto:
                  'En infraestructura urbana que mejore la vida cotidiana y la productividad al mismo tiempo; en conectar territorios rezagados con los mercados; y en planificar el crecimiento urbano antes de que el crecimiento decida por nosotros.',
              },
            ],
          },
        },
        {
          id: 'oportunidad-productiva',
          titulo: 'Productiva y competitiva',
          detalle: {
            resumen:
              'El talón de Aquiles de la región: la productividad crece poco desde hace décadas. Sin moverla, ningún otro avance se sostiene en el tiempo.',
            secciones: [
              {
                titulo: 'Qué está pasando',
                texto:
                  'La estructura productiva sigue concentrada en pocos bienes y con baja incorporación de conocimiento. Buena parte del empleo está en unidades pequeñas e informales, con acceso limitado a crédito, tecnología y mercados.',
              },
              {
                titulo: 'Dónde está la oportunidad',
                texto:
                  'En la reconfiguración del comercio global, que abre espacio para que la región gane posiciones en cadenas de valor; en diversificar exportaciones; y en llevar financiamiento, tecnología y estándares a las empresas pequeñas y medianas que hoy quedan afuera.',
              },
            ],
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'valor',
      etiqueta: 'Valor agregado',
      estilo: 'valor',
      segmentado: true,
      descripcion:
        'Agendas donde CAF agrega valor de manera transversal: atraviesan todos los sectores y todas las operaciones. No son áreas de negocio, son la respuesta a la pregunta de qué ponemos nosotros que otro no pone.',
      elementos: [
        {
          id: 'valor-recursos',
          titulo: 'Movilización de recursos y alianzas globales',
          detalle: {
            resumen:
              'Cada dólar propio vale más si arrastra a otros. La capacidad de convocar es tan importante como la de prestar.',
            secciones: [
              {
                titulo: 'Cómo agregamos valor',
                texto:
                  'Actuando como puente entre la región y las fuentes globales de financiamiento: fondos climáticos, banca de desarrollo, inversión privada y filantropía. Estructuramos operaciones que por sí solas no serían atractivas y las volvemos financiables, ampliando el volumen de recursos que efectivamente llega a los países.',
              },
            ],
          },
        },
        {
          id: 'valor-financiamiento',
          titulo: 'Financiamiento verde, inclusivo y digital',
          detalle: {
            resumen:
              'No alcanza con financiar más: importa qué se financia y a quién llega.',
            secciones: [
              {
                titulo: 'Cómo agregamos valor',
                texto:
                  'Orientando el financiamiento hacia proyectos que reducen emisiones y aumentan la resiliencia, que incorporan a quienes suelen quedar fuera del sistema financiero, y que se apoyan en herramientas digitales para bajar costos y llegar más lejos. Es un criterio que atraviesa toda la cartera, no una línea de productos aparte.',
              },
            ],
          },
        },
        {
          id: 'valor-integracion',
          titulo: 'Integración regional pragmática',
          detalle: {
            resumen:
              'Integración medida en obras, acuerdos y trámites resueltos, no en declaraciones.',
            secciones: [
              {
                titulo: 'Cómo agregamos valor',
                texto:
                  'Financiando y articulando aquello que ningún país puede resolver solo: corredores logísticos, interconexión eléctrica, pasos de frontera, cuencas compartidas y estándares comunes. Pragmática quiere decir que se avanza donde hay acuerdo posible y beneficio concreto, sin esperar consensos totales.',
              },
            ],
          },
        },
        {
          id: 'valor-conocimiento',
          titulo: 'Conocimiento prospectivo',
          detalle: {
            resumen:
              'Anticipar el problema antes de que llegue a la mesa de decisión.',
            secciones: [
              {
                titulo: 'Cómo agregamos valor',
                texto:
                  'Produciendo análisis y evidencia que ayuden a los países a ver hacia adelante: qué tendencias los van a afectar, qué políticas funcionaron en contextos parecidos, qué riesgos se están acumulando. El conocimiento acompaña al financiamiento; muchas veces es lo que hace que un proyecto se diseñe bien desde el principio.',
              },
            ],
          },
        },
        {
          id: 'valor-capacidades',
          titulo: 'Apoyo a las capacidades institucionales',
          detalle: {
            resumen:
              'Los proyectos no fallan por falta de dinero tanto como por falta de capacidad para ejecutarlos.',
            secciones: [
              {
                titulo: 'Cómo agregamos valor',
                texto:
                  'Fortaleciendo a quienes van a llevar adelante las políticas: equipos de gobierno nacionales y subnacionales, empresas públicas, reguladores. Preparación de proyectos, asistencia técnica y acompañamiento durante la ejecución, para que lo que se aprueba efectivamente se construya y funcione.',
              },
            ],
          },
        },
        {
          id: 'valor-metodo',
          titulo: 'Método CAF: cercanía, agilidad e impacto',
          detalle: {
            resumen:
              'La forma de trabajar también es parte del valor. Es lo que hace que los países nos elijan.',
            secciones: [
              {
                titulo: 'Cómo agregamos valor',
                texto:
                  'Cercanía: presencia en los países y comprensión de su contexto político y técnico real. Agilidad: tiempos de respuesta que acompañan el ciclo de las decisiones públicas, no que lo frenan. Impacto: foco en el resultado en el territorio y no solo en el desembolso. Los tres juntos, porque por separado ninguno alcanza.',
              },
            ],
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'agendas',
      etiqueta: 'Agendas institucionales',
      estilo: 'agendas',
      segmentado: true,
      descripcion:
        'Agendas puertas adentro: cómo se prepara la institución para sostener todo lo anterior. Cada una tiene un compromiso al 2031 y un indicador con el que se va a seguir su avance.',
      elementos: [
        {
          id: 'agenda-financiera',
          titulo: 'Sostenibilidad, solidez e innovación financiera',
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
              nombre: 'Indicador de seguimiento por definir',
              descripcion:
                'Métrica que refleje simultáneamente el crecimiento de la capacidad de financiamiento y el mantenimiento de los niveles de solidez patrimonial.',
              meta: 'Línea base y meta 2031 pendientes de definición',
            },
          },
        },
        {
          id: 'agenda-talento',
          titulo: 'Talento y futuro digital',
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
              nombre: 'Indicador de seguimiento por definir',
              descripcion:
                'Métrica que combine el avance de la transformación digital con la evolución de las capacidades y el compromiso del equipo.',
              meta: 'Línea base y meta 2031 pendientes de definición',
            },
          },
        },
        {
          id: 'agenda-gobernanza',
          titulo: 'Gobernanza, efectividad y excelencia operacional',
          detalle: {
            resumen:
              'Hacer más con los mismos recursos, y poder demostrarlo con evidencia.',
            secciones: [
              {
                titulo: 'Qué haremos al 2031',
                texto:
                  'Afianzar un modelo de gobernanza claro y transparente, con procesos internos simplificados que reduzcan los tiempos de respuesta y mecanismos sistemáticos de medición de resultados e impacto. El foco está en la eficiencia operativa y en respaldar con datos el efecto real de lo que hacemos.',
              },
            ],
            indicador: {
              nombre: 'Indicador de seguimiento por definir',
              descripcion:
                'Métrica que capture la eficiencia operativa y la calidad de la gestión institucional.',
              meta: 'Línea base y meta 2031 pendientes de definición',
            },
          },
        },
      ],
    },
  ],
};
