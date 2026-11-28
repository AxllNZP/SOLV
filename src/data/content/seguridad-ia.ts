import type { Guide } from "@/data/guide-types";

const guide: Guide = {
  slug: "seguridad-ia-evitar-fuga-datos-chatgpt-empresas",
  title: "Seguridad en IA: cómo evitar fugas de datos con ChatGPT en la empresa",
  description:
    "Guía de gobierno y controles técnicos para usar asistentes de IA sin entregar información sensible: diferencias entre planes, clasificación de datos, anonimización, arquitectura con pasarela, inyección de instrucciones y respuesta a incidentes.",
  category: "Ciberseguridad e IA",
  published: "2026-11-27",
  updated: "2026-11-27",
  blocks: [
    { type: "p", text: "La mayoría de fugas hacia asistentes de IA no empiezan con un atacante, sino con alguien que quiere terminar antes: pega un contrato para resumirlo, un fragmento de código con una clave dentro o una hoja de clientes para «ordenarla». En 2023 se hizo público que empleados de Samsung habían introducido código interno en ChatGPT, y la empresa restringió su uso. Prohibir sin ofrecer alternativa, sin embargo, suele empujar a usar cuentas personales fuera de todo control." },
    { type: "p", text: "El objetivo realista es otro: permitir los usos de bajo riesgo, hacer difícil el error grave y poder reconstruir lo ocurrido si algo falla." },
    { type: "h2", text: "No todos los accesos son iguales" },
    { type: "p", text: "Las condiciones cambian según el producto. OpenAI indica que, por defecto, **no usa los datos de ChatGPT Enterprise, ChatGPT Business, ChatGPT Edu ni de su API para entrenar sus modelos** ([privacidad para empresas](https://openai.com/enterprise-privacy/)). En las cuentas personales, el uso de las conversaciones para mejorar modelos depende de los ajustes de control de datos del usuario. Otros proveedores aplican distinciones parecidas." },
    { type: "table", caption: "Qué revisar según la modalidad de acceso", head: ["Modalidad", "Entrenamiento por defecto", "Control de la empresa", "Uso recomendable"], rows: [
      ["Cuenta personal gratuita o de pago individual", "Puede usarse según los ajustes del usuario", "Ninguno", "Solo información pública"],
      ["Plan de equipo o empresa", "Excluido por defecto en las ofertas de negocio de OpenAI", "Usuarios, permisos y administración", "Trabajo interno según clasificación"],
      ["API integrada en una herramienta propia", "Excluido por defecto en OpenAI", "Alto: filtras, registras y limitas", "Procesos repetibles con datos controlados"],
      ["Modelo ejecutado en infraestructura propia", "No aplica", "Total, junto con toda la responsabilidad operativa", "Datos que no pueden salir"],
    ] },
    { type: "note", title: "«No se entrena» no significa «no se guarda»", text: "Son compromisos distintos. Aunque el proveedor no entrene con tus datos, puede conservarlos un tiempo por funcionamiento, detección de abusos u obligaciones legales. Revisa retención, ubicación, subencargados y acuerdo de tratamiento de datos, y vuelve a revisarlos periódicamente porque las condiciones cambian." },
    { type: "h2", text: "Por dónde se escapa la información" },
    { type: "ul", items: [
      "**El propio mensaje:** texto pegado, archivos adjuntos y capturas de pantalla.",
      "**Conectores:** acceso a correo, unidades compartidas o repositorios con más permisos de los necesarios.",
      "**Extensiones de navegador:** muchas leen el contenido de las páginas que visitas.",
      "**Enlaces compartidos:** una conversación publicada puede contener datos internos.",
      "**Registros propios:** tu integración puede guardar los mensajes completos en un sistema de logs al que accede demasiada gente.",
      "**Inyección de instrucciones:** un documento o web manipulados pueden intentar que el asistente revele o envíe datos.",
    ] },
    { type: "h2", text: "Clasifica antes de prohibir" },
    { type: "p", text: "Una política que cabe en una página se cumple más que un manual de cuarenta. Basta con cuatro niveles y ejemplos concretos de tu negocio:" },
    { type: "table", caption: "Matriz de uso de datos en asistentes de IA", head: ["Nivel", "Ejemplos", "Asistente personal", "Herramienta corporativa aprobada"], rows: [
      ["Público", "Textos de la web, documentación publicada", "Permitido", "Permitido"],
      ["Interno", "Procedimientos, borradores sin datos personales", "No", "Permitido"],
      ["Confidencial", "Contratos, precios, código propietario", "No", "Con anonimización y caso de uso aprobado"],
      ["Restringido", "Credenciales, datos de salud, tarjetas, documentos de identidad", "No", "No, salvo evaluación formal"],
    ] },
    { type: "h2", text: "Anonimizar antes de enviar" },
    { type: "p", text: "Muchas tareas no necesitan los datos reales. Para redactar una respuesta a un reclamo, el modelo no precisa el nombre ni el teléfono del cliente. La seudonimización sustituye valores por marcadores y conserva la tabla de equivalencias solo en tu lado:" },
    { type: "code", label: "Seudonimización básica en TypeScript", code: String.raw`const PATRONES: Array<[string, RegExp]> = [
  ["CORREO", /[\w.+-]+@[\w-]+(\.[\w-]+)+/g],
  ["TARJETA", /\b(?:\d[ -]?){13,16}\b/g],
  ["TELEFONO", /(?:\+\d{1,3}[ -]?)?\b\d{3}[ -]?\d{3}[ -]?\d{3}\b/g],
  ["DOCUMENTO", /\b\d{8}\b|\b\d{11}\b/g],
];

export function seudonimizar(texto: string) {
  const tabla = new Map<string, string>();
  let salida = texto;
  for (const [tipo, patron] of PATRONES) {
    let n = 0;
    salida = salida.replace(patron, (valor) => {
      const marca = "[" + tipo + "_" + ++n + "]";
      tabla.set(marca, valor);
      return marca;
    });
  }
  return { salida, tabla }; // la tabla nunca se envía al modelo
}

export function restaurar(respuesta: string, tabla: Map<string, string>) {
  let salida = respuesta;
  for (const [marca, valor] of tabla) {
    salida = salida.replaceAll(marca, valor);
  }
  return salida;
}` },
    { type: "p", text: "Úsalo como red de seguridad, no como garantía. Las expresiones regulares no reconocen nombres propios, direcciones escritas libremente ni el contexto que identifica a alguien («el único gerente de la sede norte»). Además, los patrones deben adaptarse a los formatos de tu país." },
    { type: "h2", text: "Arquitectura con pasarela de IA" },
    { type: "p", text: "Cuando varias personas o sistemas consumen modelos, conviene que todo pase por un punto único donde aplicar las reglas:" },
    { type: "code", label: "Pasarela corporativa entre usuarios y proveedor", code: String.raw`  Usuario ──► Aplicación interna (inicio de sesión corporativo)
                    │
                    ▼
        ┌─────────── Pasarela de IA ───────────┐
        │ 1. Autorización por rol              │
        │ 2. Detección de secretos y datos     │
        │ 3. Seudonimización o bloqueo         │
        │ 4. Límite de uso y coste             │
        │ 5. Registro de metadatos             │
        └──────────────────┬───────────────────┘
                           ▼
                  API del proveedor
                           │
                           ▼
        Filtro de salida ──► Usuario` },
    { type: "p", text: "La clave de la API vive en el servidor, nunca en el navegador ni en una hoja de cálculo. El registro debe guardar quién, cuándo, qué caso de uso y cuántos datos; almacena el contenido completo solo si hay una razón justificada, con acceso restringido y caducidad." },
    { type: "h2", text: "Inyección de instrucciones: el riesgo menos intuitivo" },
    { type: "p", text: "El proyecto [OWASP Top 10 para aplicaciones con LLM](https://genai.owasp.org/llm-top-10/) sitúa la inyección de instrucciones como primer riesgo en su edición 2025 y la divulgación de información sensible como segundo. Un modelo no distingue de forma fiable entre las órdenes del usuario y las que aparecen dentro de un correo, un PDF o una página que le pides leer." },
    { type: "ul", items: [
      "Trata todo contenido externo como no confiable.",
      "Da a los asistentes con herramientas el mínimo privilegio: leer no implica enviar ni borrar.",
      "Exige confirmación humana para acciones con efecto fuera de la conversación.",
      "No incluyas secretos en las instrucciones del sistema: asume que pueden extraerse.",
      "Bloquea la carga automática de imágenes o enlaces generados que puedan transportar datos en la URL.",
    ] },
    { type: "h2", text: "Controles ordenados por esfuerzo" },
    { type: "table", caption: "Por dónde empezar", head: ["Control", "Esfuerzo", "Reduce"], rows: [
      ["Política de una página con ejemplos", "Bajo", "Errores por desconocimiento"],
      ["Cuentas corporativas con acceso centralizado", "Bajo a medio", "Uso en cuentas personales y accesos de exempleados"],
      ["Revisión de conectores y extensiones", "Bajo", "Exposición masiva por permisos"],
      ["Escaneo de secretos en repositorios y mensajes", "Medio", "Fuga de claves y contraseñas"],
      ["Pasarela con filtrado y registro", "Alto", "Envíos no autorizados y falta de trazabilidad"],
      ["Prevención de pérdida de datos en endpoint", "Alto", "Copias desde equipos gestionados"],
    ] },
    { type: "h2", text: "Preguntas antes de aprobar un proveedor" },
    { type: "p", text: "La aprobación de una herramienta no debería depender de una demostración vistosa. Pide respuestas escritas y guárdalas junto al contrato, con la fecha en que se obtuvieron:" },
    { type: "ul", items: [
      "¿Los datos de entrada y salida se usan para entrenar o evaluar modelos? ¿En qué planes y con qué excepciones?",
      "¿Cuánto tiempo se conservan, quién puede leerlos y cómo se solicita su borrado?",
      "¿En qué países se almacenan y qué subencargados intervienen?",
      "¿Hay inicio de sesión único, baja automática de usuarios y registro de actividad exportable?",
      "¿Cómo y en qué plazo se avisa de un incidente de seguridad?",
      "¿Qué ocurre con la información al terminar el contrato?",
    ] },
    { type: "p", text: "Si una respuesta no está en la documentación ni en el contrato, trátala como desconocida y limita el uso a información pública hasta aclararla. Asigna además un responsable que repita la revisión cuando el proveedor cambie sus condiciones o añada funciones, porque una función nueva puede abrir un flujo de datos que nadie evaluó." },
    { type: "h2", text: "Si ya se pegó algo que no debía" },
    { type: "ol", items: [
      "Reporta sin culpabilizar: si la gente teme el castigo, no avisará.",
      "Si era una credencial, **revócala y genera otra de inmediato**. Borrar la conversación no basta.",
      "Elimina la conversación y los enlaces compartidos, y solicita la supresión al proveedor si corresponde.",
      "Anota qué datos, de quién, en qué servicio y bajo qué condiciones.",
      "Con datos personales, valora con tu responsable de protección de datos las obligaciones de notificación y sus plazos.",
      "Corrige la causa: casi siempre faltaba una herramienta aprobada o un ejemplo claro.",
    ] },
    { type: "h2", text: "Plantilla de política mínima" },
    { type: "code", label: "Borrador adaptable", code: String.raw`USO DE ASISTENTES DE IA
1. Solo se usan las herramientas de la lista aprobada, con cuenta corporativa.
2. Nunca se introducen credenciales, datos de salud, tarjetas ni documentos
   de identidad.
3. Los datos de clientes se seudonimizan antes de enviarse.
4. Toda salida que llegue a un cliente o a producción la revisa una persona.
5. Los conectores nuevos requieren aprobación.
6. Un envío indebido se reporta en el día a: ______.
Revisión de esta política: cada 6 meses.` },
    { type: "p", text: "Para las tareas que pueden resolverse sin modelos externos, lo más seguro es no enviar nada. Comparar versiones de un documento es un buen ejemplo, como explica la guía para [comparar contratos sin subirlos a la nube](/guias/comparar-contratos-pdf-sin-subir-a-la-nube)." },
  ],
  faqs: [
    { q: "¿ChatGPT usa lo que escribo para entrenar sus modelos?", a: "Depende del producto y de los ajustes. OpenAI indica que no entrena por defecto con datos de sus ofertas para empresas ni de la API. En cuentas personales conviene revisar la sección de controles de datos. Verifica siempre la política vigente, porque puede cambiar." },
    { q: "¿Basta con desactivar el entrenamiento en la cuenta personal?", a: "No para datos corporativos. La empresa sigue sin controlar accesos, retención ni borrado, y no hay un acuerdo de tratamiento de datos entre el proveedor y la organización para esa cuenta personal." },
    { q: "¿La anonimización elimina todo el riesgo?", a: "No. Reduce la exposición de identificadores evidentes, pero el contexto puede seguir identificando a personas o revelando información de negocio. Combínala con clasificación de datos y revisión de casos de uso." },
    { q: "¿Conviene bloquear por completo las herramientas de IA?", a: "Un bloqueo total puede ser adecuado en entornos muy regulados, pero a menudo desplaza el uso a dispositivos personales. Ofrecer una vía aprobada y reglas claras suele dar más visibilidad y control." },
    { q: "¿Un modelo local es automáticamente seguro?", a: "Evita enviar datos a un proveedor externo, pero sigue necesitando control de accesos, actualizaciones, protección de registros y defensas frente a inyección de instrucciones, sobre todo si puede usar herramientas." },
  ],
};

export default guide;
