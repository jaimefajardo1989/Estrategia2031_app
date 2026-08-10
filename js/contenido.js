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
 * Cualquier elemento que tenga un bloque "detalle" se vuelve clickeable
 * automáticamente. Hoy lo tienen las 3 agendas institucionales; si más
 * adelante querés que también se pueda hacer clic en las fuerzas o en el
 * valor agregado, copiá un bloque "detalle" dentro de ese elemento.
 */

const ESTRATEGIA = {
  // Encabezado de la aplicación
  meta: {
    titulo: 'Estrategia 2031',
    subtitulo: 'Árbol estratégico institucional',
    pieDePagina: 'Contenido preliminar — sujeto a revisión',
  },

  // Los cuatro niveles del árbol, de arriba hacia abajo
  niveles: [
    {
      id: 'objetivo',
      etiqueta: 'Objetivo al 2031',
      estilo: 'objetivo',
      elementos: [
        {
          id: 'objetivo-2031',
          titulo:
            'Una región más resiliente, integrada y próspera, donde el desarrollo sostenible se traduce en bienestar para cada persona',
        },
      ],
    },

    {
      id: 'fuerzas',
      etiqueta: 'Fuerzas y espacios donde se abren oportunidades',
      estilo: 'fuerzas',
      elementos: [
        { id: 'fuerza-ambiental', titulo: 'Ambiental' },
        { id: 'fuerza-energetica', titulo: 'Energética' },
        { id: 'fuerza-digital', titulo: 'Digital' },
        { id: 'fuerza-demografica', titulo: 'Demográfica' },
        { id: 'fuerza-territorial', titulo: 'Territorial' },
        { id: 'fuerza-productiva', titulo: 'Productiva y competitiva' },
      ],
    },

    {
      id: 'valor',
      etiqueta: 'Valor agregado',
      estilo: 'valor',
      segmentado: true,
      elementos: [
        { id: 'valor-recursos', titulo: 'Movilización de recursos y alianzas globales' },
        { id: 'valor-financiamiento', titulo: 'Financiamiento verde, inclusivo y digital' },
        { id: 'valor-integracion', titulo: 'Integración regional pragmática' },
        { id: 'valor-conocimiento', titulo: 'Conocimiento prospectivo' },
        { id: 'valor-capacidades', titulo: 'Apoyo a las capacidades institucionales' },
        { id: 'valor-metodo', titulo: 'Método CAF: cercanía, agilidad e impacto' },
      ],
    },

    {
      id: 'agendas',
      etiqueta: 'Agendas institucionales',
      estilo: 'agendas',
      segmentado: true,
      elementos: [
        {
          id: 'agenda-financiera',
          titulo: 'Sostenibilidad, solidez e innovación financiera',
          detalle: {
            resumen:
              'TEXTO PRELIMINAR. Fortalecer la base financiera de la institución para sostener un mayor volumen de operaciones sin comprometer su solidez, ampliando las fuentes de fondeo y los instrumentos disponibles.',
            queHaremos:
              'TEXTO PRELIMINAR. Al 2031 habremos consolidado una estructura de capital robusta y diversificada, incorporando instrumentos financieros innovadores que permitan movilizar recursos adicionales hacia la región. Esto implica ampliar la base de socios y aliados, profundizar el acceso a los mercados internacionales de capital y desarrollar productos que respondan a las necesidades cambiantes de los países miembros.',
            indicador: {
              nombre: 'Indicador de seguimiento por definir',
              descripcion:
                'TEXTO PRELIMINAR. Métrica que refleje simultáneamente el crecimiento de la capacidad de financiamiento y el mantenimiento de los niveles de solidez patrimonial.',
              meta: 'Línea base y meta 2031 pendientes de definición',
            },
          },
        },
        {
          id: 'agenda-talento',
          titulo: 'Talento y futuro digital',
          detalle: {
            resumen:
              'TEXTO PRELIMINAR. Preparar a las personas y a la tecnología de la institución para operar con la agilidad que exige el contexto regional de la próxima década.',
            queHaremos:
              'TEXTO PRELIMINAR. Al 2031 habremos transformado la manera de trabajar, apoyándonos en capacidades digitales que agilicen los procesos y en un modelo de gestión del talento que atraiga, desarrolle y retenga perfiles clave. Esto supone modernizar los sistemas centrales, incorporar analítica de datos en la toma de decisiones y sostener una cultura organizacional orientada al aprendizaje continuo.',
            indicador: {
              nombre: 'Indicador de seguimiento por definir',
              descripcion:
                'TEXTO PRELIMINAR. Métrica que combine el avance de la transformación digital con la evolución de las capacidades y el compromiso del equipo.',
              meta: 'Línea base y meta 2031 pendientes de definición',
            },
          },
        },
        {
          id: 'agenda-gobernanza',
          titulo: 'Gobernanza, efectividad y excelencia operacional',
          detalle: {
            resumen:
              'TEXTO PRELIMINAR. Asegurar que la institución opere con estándares de gobernanza, transparencia y eficiencia que respalden la confianza de socios, mercados y países miembros.',
            queHaremos:
              'TEXTO PRELIMINAR. Al 2031 habremos afianzado un modelo de gobernanza claro y transparente, con procesos internos simplificados que reduzcan los tiempos de respuesta y mecanismos sistemáticos de medición de resultados e impacto. El foco está en hacer más con los mismos recursos y en demostrar con evidencia el efecto de lo que hacemos.',
            indicador: {
              nombre: 'Indicador de seguimiento por definir',
              descripcion:
                'TEXTO PRELIMINAR. Métrica que capture la eficiencia operativa y la calidad de la gestión institucional.',
              meta: 'Línea base y meta 2031 pendientes de definición',
            },
          },
        },
      ],
    },
  ],
};
