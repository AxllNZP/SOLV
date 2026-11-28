import type { Guide } from "@/data/guide-types";

const guide: Guide = {
  slug: "comparar-contratos-pdf-sin-subir-a-la-nube",
  title: "Cómo comparar contratos en PDF sin subirlos a la nube",
  description:
    "Método práctico para detectar cambios entre dos versiones de un contrato sin enviar el documento a ningún servidor: cómo funciona la comparación local, qué errores evitar y cómo verificar la privacidad.",
  category: "Privacidad documental",
  published: "2026-11-27",
  updated: "2026-11-27",
  blocks: [
    { type: "p", text: "Un proveedor devuelve el contrato con la frase «solo ajustamos un par de detalles». Son catorce páginas. En algún punto, un plazo de preaviso pasó de 60 a 30 días, o una limitación de responsabilidad perdió la palabra «mutua». Comparar versiones es una tarea cotidiana, y la forma más cómoda de hacerlo (arrastrar los dos archivos a una web gratuita) es también la que más información expone." },
    { type: "p", text: "Esta guía explica cómo comparar contratos con garantías, qué ocurre técnicamente cuando una herramienta procesa un PDF en tu navegador, dónde fallan las comparaciones automáticas y cómo montar una revisión que aguante una auditoría interna." },
    { type: "h2", text: "Qué expones al subir un contrato a un servicio en línea" },
    { type: "p", text: "Un contrato concentra datos que rara vez aparecen juntos en otro sitio: identidades y documentos de los firmantes, direcciones, importes, cuentas bancarias, penalizaciones, condiciones de exclusividad y, a veces, anexos técnicos. Al subirlo a un servidor ajeno pasan varias cosas, con independencia de las buenas intenciones del proveedor:" },
    { type: "ul", items: [
      "El archivo sale de tu perímetro y queda sujeto a la política de retención de un tercero.",
      "Puede registrarse en copias de seguridad, cachés o registros de errores que no desaparecen al pulsar «eliminar».",
      "Si el contrato incluye datos personales, el proveedor pasa a actuar como encargado del tratamiento, y normativas como el RGPD o la ley peruana de protección de datos personales exigen una base y unas garantías para ello.",
      "Muchos acuerdos de confidencialidad prohíben compartir el texto con terceros sin autorización escrita. Una web de comparación es un tercero.",
    ] },
    { type: "note", title: "La pregunta que conviene hacerse", text: "No es «¿confío en esta empresa?», sino «¿necesita esta empresa recibir mi documento para hacer su trabajo?». Para comparar texto, la respuesta es no: un navegador moderno puede hacerlo por sí mismo." },
    { type: "h2", text: "Tres formas de comparar dos versiones" },
    { type: "table", caption: "Comparativa de métodos de revisión", head: ["Método", "El archivo sale del equipo", "Detecta cambios mínimos", "Esfuerzo", "Cuándo usarlo"], rows: [
      ["Lectura en paralelo", "No", "Poco fiable", "Muy alto", "Documentos de una o dos páginas"],
      ["Control de cambios del editor", "Depende de dónde se guarde", "Sí, si estaba activado", "Bajo", "Cuando ambas partes trabajan sobre el mismo `.docx`"],
      ["Comparador en la nube", "Sí", "Sí", "Bajo", "Textos públicos o sin datos sensibles"],
      ["Comparador local en el navegador", "No", "Sí, sobre el texto extraído", "Bajo", "Contratos, nóminas, ofertas y documentos bajo confidencialidad"],
      ["Línea de comandos (`pdftotext` y `diff`)", "No", "Sí", "Medio", "Perfiles técnicos y procesos por lotes"],
    ] },
    { type: "p", text: "El control de cambios merece una advertencia: solo refleja las ediciones hechas mientras estaba activo, y se puede desactivar o aceptar antes de reenviar el archivo. Nunca sustituye a comparar la versión que enviaste con la que te devolvieron." },
    { type: "h2", text: "Cómo funciona una comparación 100 % local" },
    { type: "p", text: "Un comparador local descarga una vez su código (HTML, JavaScript y, si hace falta, WebAssembly) y después trabaja con los archivos que seleccionas usando las API del navegador. Seleccionar un archivo en un campo de formulario **no lo envía a ninguna parte**: solo concede a la página permiso para leerlo en memoria. El envío ocurre únicamente si el código hace una petición de red con ese contenido." },
    { type: "code", label: "Arquitectura de un comparador del lado del cliente", code: String.raw`  Tu dispositivo
  ┌───────────────────────────────────────────────────────────┐
  │  contrato_v1.pdf ─┐                                       │
  │                   ├─► Extracción de texto (Web Worker)    │
  │  contrato_v2.pdf ─┘            │                          │
  │                     (¿página escaneada? ─► OCR local)     │
  │                                ▼                          │
  │                     Normalización (espacios, guiones)     │
  │                                ▼                          │
  │                     Algoritmo de diferencias              │
  │                                ▼                          │
  │                     Vista lado a lado + informe           │
  └───────────────────────────────────────────────────────────┘
            ▲
            │ solo se descarga el código de la aplicación
       CDN / hosting estático` },
    { type: "h3", text: "Extracción de texto" },
    { type: "p", text: "Un PDF no guarda párrafos, sino instrucciones para colocar glifos en coordenadas. El extractor tiene que reconstruir el orden de lectura, unir líneas y decidir dónde acaba cada palabra. Por eso dos PDF visualmente idénticos pueden producir texto ligeramente distinto si se generaron con programas diferentes." },
    { type: "h3", text: "Normalización" },
    { type: "p", text: "Antes de comparar conviene eliminar diferencias sin significado: saltos de línea por maquetación, espacios dobles, guiones de partición, comillas tipográficas frente a rectas y ligaduras. Sin este paso, un cambio de márgenes genera cientos de falsas alertas y la revisión humana pierde atención justo donde importa." },
    { type: "h3", text: "Algoritmo de diferencias" },
    { type: "p", text: "La mayoría de comparadores busca la subsecuencia común más larga entre las dos versiones; el algoritmo de Myers es la referencia clásica y es el que usan herramientas como Git. Todo lo que no pertenece a esa subsecuencia se marca como eliminado o añadido. Ejecutarlo dentro de un Web Worker evita que la pestaña se congele con documentos largos." },
    { type: "h2", text: "Ejemplo práctico con El Comparinizador" },
    { type: "p", text: "[El Comparinizador](https://comparinizador.solv.quest) es la herramienta de SOLV para este caso: compara documentos PDF, DOCX, TXT y MD en vista lado a lado o en diff unificado, se ejecuta en tu navegador mediante Web Workers, incluye OCR local con Tesseract.js para PDF escaneados y genera informes HTML o TXT sanitizados. El flujo recomendado es este:" },
    { type: "ol", items: [
      "Guarda la versión que enviaste y la que recibiste con nombres inequívocos, por ejemplo `servicios_v3_enviado.pdf` y `servicios_v4_recibido.pdf`.",
      "Abre la herramienta y carga como original la versión que tú enviaste. Invertir el orden hace que lo añadido parezca eliminado.",
      "Revisa primero la vista lado a lado para ubicar los cambios en su cláusula.",
      "Pasa al diff unificado para leer los cambios seguidos, sin el ruido de lo que no varió.",
      "Exporta el informe y adjúntalo al expediente junto con ambas versiones.",
    ] },
    { type: "p", text: "Supongamos que la cláusula de terminación cambia así:" },
    { type: "code", label: "Diff unificado de una cláusula", code: String.raw`- Cualquiera de las partes podrá resolver el contrato con un
- preaviso escrito de sesenta (60) días.
+ El Proveedor podrá resolver el contrato con un
+ preaviso escrito de treinta (30) días.` },
    { type: "p", text: "Hay dos cambios y el segundo es el más grave: además de acortarse el plazo, el derecho dejó de ser recíproco. Un resumen que solo mencionara «cambió el preaviso» habría ocultado que ahora únicamente una parte puede salir del acuerdo." },
    { type: "h2", text: "Qué revisar siempre, aunque el diff parezca limpio" },
    { type: "table", caption: "Lista de control por tipo de cláusula", head: ["Zona del contrato", "Cambio típico", "Riesgo"], rows: [
      ["Definiciones", "Se amplía qué se considera «servicio» o «confidencial»", "Altera el alcance de todo el documento sin tocar las obligaciones"],
      ["Plazos y renovación", "Aparece renovación automática o se acorta el preaviso", "Quedas atado o te quedas sin proveedor"],
      ["Importes y reajustes", "Cambia el índice de actualización o la moneda", "Coste creciente no presupuestado"],
      ["Responsabilidad", "Se elimina «mutua» o se mueve el tope", "Asimetría ante un incidente"],
      ["Anexos y referencias", "Se remite a una política publicada en una web", "La otra parte puede modificarla sin tu firma"],
      ["Jurisdicción", "Cambia el foro o la ley aplicable", "Litigar sale mucho más caro"],
    ] },
    { type: "h2", text: "Límites de la comparación automática" },
    { type: "ul", items: [
      "**PDF escaneados:** el OCR puede confundir `1` con `l`, `0` con `O` o perder tildes. Verifica en la imagen original cada cifra que aparezca como cambiada, y revisa también importes y fechas que no aparezcan marcados si el escaneo es de baja calidad.",
      "**Tablas y columnas:** el orden de lectura puede mezclarse. Compara las tablas de precios celda a celda.",
      "**Imágenes, sellos y firmas:** un comparador de texto no ve que una firma cambió de sitio o que se sustituyó un anexo gráfico.",
      "**Texto oculto:** texto blanco sobre blanco o fuera de los márgenes se extrae aunque no se vea. Si el diff muestra algo que no encuentras en pantalla, investígalo.",
      "**Significado:** la herramienta dice qué cambió, no si te conviene. La valoración jurídica sigue siendo humana.",
    ] },
    { type: "h2", text: "Cómo verificar que tu documento no se envía" },
    { type: "p", text: "No hace falta fiarse de una promesa. Cualquier persona puede comprobarlo en unos minutos:" },
    { type: "ol", items: [
      "Abre las herramientas de desarrollador (`F12`) y la pestaña **Red** antes de cargar los archivos.",
      "Limpia el registro, carga dos documentos de prueba y ejecuta la comparación.",
      "Busca peticiones `POST` o `PUT`, y cualquier envío cuyo tamaño se parezca al de tus archivos. Una web puede cargar recursos, analítica o publicidad; lo que no debe ocurrir es que el contenido del documento viaje en ellos.",
      "Haz la prueba definitiva: con la página ya cargada, desconecta la red y repite la comparación. Si funciona sin conexión, el procesamiento es local. Si usa OCR, ejecútalo antes una vez para que los modelos queden en caché.",
    ] },
    { type: "h2", text: "Alternativa por línea de comandos" },
    { type: "p", text: "Para equipos técnicos o lotes de documentos, las utilidades de Poppler y Git resuelven una primera pasada sin conexión:" },
    { type: "code", label: "Comparación local desde la terminal", code: String.raw`pdftotext -layout contrato_v1.pdf v1.txt
pdftotext -layout contrato_v2.pdf v2.txt
git diff --no-index --word-diff v1.txt v2.txt` },
    { type: "p", text: "La opción `--word-diff` marca palabras en lugar de líneas completas, algo muy útil en prosa legal, donde cambiar un término desplaza todo el párrafo. Si el PDF es una imagen, antes habrá que aplicarle OCR, por ejemplo con OCRmyPDF." },
    { type: "h2", text: "Un procedimiento de revisión para tu equipo" },
    { type: "ol", items: [
      "Fija una convención de nombres con número de versión y sentido (enviado o recibido).",
      "Compara siempre contra la última versión que salió de tu organización, no contra la última que recibiste.",
      "Clasifica cada cambio como formal, comercial o jurídico y asigna responsable.",
      "Antes de firmar, compara la versión final para firma con la última versión aprobada. Es el paso que más se omite.",
      "Archiva el informe de diferencias con las dos versiones y borra las copias temporales.",
    ] },
    { type: "p", text: "Si tu equipo repite esto decenas de veces al mes, estima el coste con la [calculadora de ROI por automatización](/herramientas/calculadora-roi). Y si además usan asistentes de IA para resumir contratos, conviene leer la guía sobre [cómo evitar fugas de datos hacia servicios de IA](/guias/seguridad-ia-evitar-fuga-datos-chatgpt-empresas)." },
  ],
  faqs: [
    { q: "¿Es legal comparar un contrato confidencial con una herramienta en línea?", a: "Depende de lo que pacten el acuerdo de confidencialidad y la normativa de protección de datos aplicable. Si la herramienta recibe el archivo, hay una comunicación a un tercero. Si procesa el documento íntegramente en tu navegador, el contenido no sale de tu equipo, aunque conviene verificarlo y seguir la política interna de tu organización. Ante dudas, consulta a tu asesor legal." },
    { q: "¿Puedo comparar un PDF con un archivo de Word?", a: "Sí, siempre que la herramienta extraiga el texto de ambos formatos. Espera algo más de ruido que al comparar dos archivos del mismo tipo, porque numeración, encabezados y saltos de página se extraen de forma distinta." },
    { q: "¿Qué pasa con los contratos escaneados?", a: "Necesitan reconocimiento óptico de caracteres antes de compararse. El OCR local evita enviar la imagen a un servidor, pero puede cometer errores, así que las cifras, fechas y nombres deben verificarse visualmente." },
    { q: "¿Un comparador sustituye la revisión de un abogado?", a: "No. Reduce el riesgo de pasar por alto un cambio, pero no interpreta sus consecuencias jurídicas ni detecta cláusulas perjudiciales que ya estaban en la primera versión." },
    { q: "¿Los metadatos del PDF aparecen en la comparación?", a: "Normalmente no: un comparador de texto se centra en el contenido de las páginas. Si te preocupan autor, historial o comentarios, revísalos y límpialos con una herramienta específica antes de compartir el archivo." },
  ],
};

export default guide;
