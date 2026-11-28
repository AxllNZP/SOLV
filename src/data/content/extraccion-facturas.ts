import type { Guide } from "@/data/guide-types";

const guide: Guide = {
  slug: "automatizar-extraccion-facturas-pdf-a-excel",
  title: "Automatizar la extracción de facturas PDF a Excel",
  description:
    "Guía para convertir facturas en PDF en una hoja de cálculo fiable: elección del método, código de ejemplo en Python, validaciones contables, manejo de errores y arquitectura de un flujo que no requiera teclear datos.",
  category: "Automatización",
  published: "2026-11-27",
  updated: "2026-11-27",
  blocks: [
    { type: "p", text: "Copiar a mano número, fecha, proveedor, base imponible, impuesto y total de cada factura parece inofensivo cuando son diez al mes. Con trescientas, es una jornada entera de trabajo repetitivo en la que basta transponer dos dígitos para descuadrar un cierre. La buena noticia: es uno de los procesos más fáciles de automatizar bien, siempre que se diseñe para detectar sus propios errores." },
    { type: "p", text: "Aquí verás cómo decidir la técnica según tus documentos, un script de partida, las validaciones que separan una demostración de un sistema fiable y la forma de organizar las excepciones." },
    { type: "h2", text: "Antes de extraer: ¿existe una fuente estructurada?" },
    { type: "p", text: "El PDF de una factura suele ser una representación visual de datos que ya existen en formato estructurado. En países con facturación electrónica, como Perú, México, Colombia o Chile, el comprobante oficial es un XML, y en otros mercados hay estándares como Factur-X, que incrusta el XML dentro del propio PDF. Si puedes obtener el XML desde tu proveedor, tu sistema de facturación o el portal tributario, **léelo en lugar de interpretar el PDF**: no hay ambigüedad ni errores de reconocimiento." },
    { type: "p", text: "La extracción desde PDF queda para facturas de proveedores extranjeros, recibos de servicios, documentos escaneados y todo lo que llega solo como imagen o PDF." },
    { type: "h2", text: "Identifica qué tipo de PDF tienes" },
    { type: "table", caption: "Tipos de factura y técnica adecuada", head: ["Tipo", "Cómo reconocerlo", "Técnica", "Fiabilidad esperable"], rows: [
      ["XML adjunto o descargable", "Hay un `.xml` junto al PDF", "Lectura directa del XML", "Muy alta"],
      ["PDF digital con plantilla fija", "Puedes seleccionar el texto y el diseño se repite", "Extracción de texto y reglas", "Alta"],
      ["PDF digital de muchos proveedores", "Texto seleccionable, diseños variados", "Reglas por proveedor o modelo de extracción", "Media a alta, con revisión"],
      ["Escaneo o fotografía", "No se puede seleccionar texto", "OCR y después reglas o modelo", "Depende mucho de la calidad de imagen"],
    ] },
    { type: "p", text: "Un truco rápido: abre el PDF y busca el importe total con el buscador. Si no lo encuentra aunque lo estés viendo, es una imagen y necesitas OCR." },
    { type: "h2", text: "Comparativa de enfoques" },
    { type: "table", caption: "Qué elegir según volumen y variedad", head: ["Enfoque", "Coste inicial", "Mantenimiento", "Privacidad", "Mejor para"], rows: [
      ["Teclear a mano", "Nulo", "Constante", "Interna", "Volúmenes muy bajos"],
      ["Power Query en Excel", "Bajo", "Medio", "Local", "Tablas regulares y usuarios de Excel"],
      ["Script propio en Python", "Medio", "Bajo si las plantillas son estables", "Local", "Proveedores recurrentes"],
      ["Servicio OCR o de IA en la nube", "Bajo a medio", "Bajo", "El documento sale de tu entorno", "Gran variedad de diseños"],
      ["Híbrido: reglas y revisión de excepciones", "Medio", "Bajo", "Configurable", "La mayoría de las pymes"],
    ] },
    { type: "h2", text: "Arquitectura de un flujo robusto" },
    { type: "code", label: "Del buzón de entrada a la hoja de cálculo", code: String.raw`  Entrada (carpeta o correo)
        │
        ▼
  Huella SHA-256 ──► ¿ya procesado? ──► sí ──► descartar duplicado
        │ no
        ▼
  ¿Tiene texto? ── no ──► OCR
        │ sí                │
        ▼◄──────────────────┘
  Extracción de campos (reglas por proveedor)
        │
        ▼
  Validaciones (aritmética, fecha, identificador, duplicado)
        │
   ┌────┴─────┐
   ▼          ▼
 Válida    Excepción ──► cola de revisión humana
   │
   ▼
 Excel / ERP + archivo original conservado + registro de auditoría` },
    { type: "p", text: "La clave está en la bifurcación. Un sistema útil no es el que acierta siempre, sino el que **sabe cuándo no está seguro** y lo aparta para una persona." },
    { type: "h2", text: "Define los campos antes de programar" },
    { type: "table", caption: "Esquema mínimo de una factura de compra", head: ["Campo", "Tipo", "Regla de validación"], rows: [
      ["`ruc_emisor` o identificador fiscal", "Texto", "Formato y dígito de control según el país"],
      ["`numero`", "Texto", "No vacío y único por emisor"],
      ["`fecha_emision`", "Fecha", "No futura y dentro de un periodo razonable"],
      ["`moneda`", "Código ISO 4217", "Lista cerrada (PEN, USD, EUR...)"],
      ["`base`", "Decimal", "Mayor o igual que cero salvo notas de crédito"],
      ["`impuesto`", "Decimal", "Coherente con la tasa aplicable"],
      ["`total`", "Decimal", "`base + impuesto` con tolerancia de redondeo"],
      ["`archivo_origen`", "Texto", "Ruta y huella del documento"],
    ] },
    { type: "p", text: "Guarda los identificadores como texto, no como número: Excel elimina ceros a la izquierda y convierte cifras largas a notación científica. Para el dinero usa `Decimal`, no `float`, porque la aritmética binaria introduce diferencias de céntimos." },
    { type: "h2", text: "Ejemplo práctico en Python" },
    { type: "p", text: "El siguiente script usa `pdfplumber` para leer PDF digitales y `openpyxl` para escribir el Excel (`pip install pdfplumber openpyxl`). Está pensado para facturas con etiquetas reconocibles; adapta las expresiones regulares a tus proveedores." },
    { type: "code", label: "extraer_facturas.py", code: String.raw`import hashlib, re
from decimal import Decimal
from pathlib import Path

import pdfplumber
from openpyxl import Workbook

PATRONES = {
    "numero": r"Factura\s*(?:N[°º.o]*)?\s*:?\s*([A-Z0-9]+-\d+)",
    "fecha":  r"Fecha(?: de emisión)?\s*:?\s*(\d{2}/\d{2}/\d{4})",
    "base":   r"(?:Base imponible|Subtotal)\s*:?\D*?(\d[\d.,]*)",
    "impuesto": r"(?:IGV|IVA)[^:\n]*:\D*?(\d[\d.,]*)",
    "total":  r"(?<!Sub)Total\s*(?:a pagar)?\s*:?\D*?(\d[\d.,]*)",
}

def importe(texto):
    """Acepta 1,234.50 y 1.234,50."""
    t = texto.strip(".,")
    if t.rfind(",") > t.rfind("."):
        t = t.replace(".", "").replace(",", ".")
    else:
        t = t.replace(",", "")
    return Decimal(t)

def extraer(ruta):
    with pdfplumber.open(ruta) as pdf:
        texto = "\n".join(p.extract_text() or "" for p in pdf.pages)
    if not texto.strip():
        return {}, ["sin texto: requiere OCR"]

    datos, errores = {}, []
    for campo, patron in PATRONES.items():
        m = re.search(patron, texto, re.IGNORECASE)
        if m:
            datos[campo] = m.group(1)
        else:
            errores.append(f"falta {campo}")

    for campo in ("base", "impuesto", "total"):
        if campo in datos:
            datos[campo] = importe(datos[campo])

    if not errores:
        diferencia = abs(datos["base"] + datos["impuesto"] - datos["total"])
        if diferencia > Decimal("0.02"):
            errores.append("base + impuesto no coincide con total")
    return datos, errores

def seguro(valor):
    """Evita que Excel interprete texto ajeno como fórmula."""
    if isinstance(valor, str) and valor.startswith(("=", "+", "-", "@")):
        return "'" + valor
    return valor

libro = Workbook()
ok = libro.active
ok.title = "Facturas"
revisar = libro.create_sheet("Revisar")
columnas = ["numero", "fecha", "base", "impuesto", "total"]
ok.append(["archivo", *columnas])
revisar.append(["archivo", "motivo"])

vistos = set()
for ruta in sorted(Path("entrada").glob("*.pdf")):
    huella = hashlib.sha256(ruta.read_bytes()).hexdigest()
    if huella in vistos:
        continue
    vistos.add(huella)
    try:
        datos, errores = extraer(ruta)
    except Exception as e:
        datos, errores = {}, [f"no se pudo leer: {e}"]
    if errores:
        revisar.append([seguro(ruta.name), "; ".join(errores)])
    else:
        ok.append([seguro(ruta.name), *(seguro(datos[c]) for c in columnas)])

libro.save("facturas.xlsx")` },
    { type: "note", title: "Por qué hay una función llamada seguro()", text: "El contenido de una factura lo escribe un tercero. Si un campo empieza por `=`, la hoja podría ejecutarlo como fórmula. Neutralizarlo es una medida barata contra la inyección de fórmulas." },
    { type: "h2", text: "OCR para documentos escaneados" },
    { type: "p", text: "La opción local más sencilla es OCRmyPDF, que añade una capa de texto sobre la imagen y deja el PDF listo para el mismo script. Un ejemplo: `ocrmypdf -l spa --deskew --skip-text escaneo.pdf escaneo_ocr.pdf`. La opción `--deskew` endereza páginas torcidas y `--skip-text` respeta las que ya tienen texto." },
    { type: "ul", items: [
      "Pide escaneos a 300 ppp, en blanco y negro o escala de grises, sin sombras.",
      "Evita fotografías en ángulo; la perspectiva degrada mucho el reconocimiento.",
      "Nunca des por buena una cifra de OCR que no pase la comprobación aritmética.",
      "Recuerda que la aritmética no detecta todo: un número de factura mal leído puede pasar. Compáralo contra órdenes de compra o el registro tributario cuando puedas.",
    ] },
    { type: "h2", text: "Cuándo usar modelos de IA y cómo controlarlos" },
    { type: "p", text: "Los modelos de extracción y los modelos de lenguaje toleran diseños nunca vistos, pero pueden devolver un valor plausible e incorrecto. Trátalos como un operador nuevo: pide salida con un esquema fijo, valida cada campo con las mismas reglas, comprueba que los valores aparezcan literalmente en el documento y muestrea resultados aprobados. Antes de enviar facturas a un servicio externo, revisa su política de retención; la guía de [seguridad al usar IA en la empresa](/guias/seguridad-ia-evitar-fuga-datos-chatgpt-empresas) detalla qué comprobar." },
    { type: "h2", text: "Medir si funciona" },
    { type: "table", caption: "Indicadores para el primer mes", head: ["Indicador", "Cómo se calcula", "Qué te dice"], rows: [
      ["Tasa de paso directo", "Facturas sin intervención / total", "Cuánto trabajo se ahorra realmente"],
      ["Tasa de excepción", "Facturas a revisión / total", "Dónde faltan reglas"],
      ["Error escapado", "Errores hallados en muestreo / muestra", "Si puedes confiar en el paso directo"],
      ["Minutos por excepción", "Tiempo de revisión / excepciones", "Si la pantalla de revisión es cómoda"],
    ] },
    { type: "p", text: "Un ejemplo ilustrativo: 400 facturas al mes a 4 minutos cada una son unas 26,7 horas. Si el 85 % pasa directo y cada excepción cuesta 3 minutos, quedan 60 revisiones y 3 horas de trabajo. Introduce tus cifras en la [calculadora de ahorro y ROI](/herramientas/calculadora-roi) para ver el plazo de recuperación." },
    { type: "h2", text: "Errores frecuentes al implantar" },
    { type: "ul", items: [
      "Automatizar todos los proveedores a la vez. Empieza por los cinco que concentran más volumen.",
      "No conservar el original ni registrar de dónde salió cada fila.",
      "Sobrescribir el Excel de trabajo; genera siempre un archivo nuevo o una hoja de importación.",
      "Ignorar notas de crédito, facturas en moneda extranjera, detracciones o retenciones.",
      "No avisar cuando un proveedor cambia de plantilla: vigila saltos en la tasa de excepción.",
    ] },
    { type: "h2", text: "Plan de implantación en cuatro semanas" },
    { type: "ol", items: [
      "**Semana 1:** reúne 50 facturas reales, define el esquema y anota a mano los valores correctos como conjunto de prueba.",
      "**Semana 2:** escribe las reglas de los proveedores principales y mídelas contra ese conjunto.",
      "**Semana 3:** funciona en paralelo con el proceso manual y compara resultados.",
      "**Semana 4:** pasa a producción con cola de excepciones, copia de seguridad y responsable asignado.",
    ] },
  ],
  faqs: [
    { q: "¿Se pueden extraer facturas a Excel sin programar?", a: "Sí, en casos sencillos. Excel incluye Power Query con un conector para PDF que detecta tablas, y hay servicios comerciales de extracción. Programar compensa cuando necesitas validaciones propias, procesar carpetas completas o mantener los documentos dentro de tu infraestructura." },
    { q: "¿Qué precisión puedo esperar?", a: "No hay una cifra universal: depende de la calidad de los documentos y de la variedad de diseños. Mídela con un conjunto de facturas reales etiquetadas a mano antes de decidir, y vuelve a medirla cuando cambien los proveedores." },
    { q: "¿Debo conservar el PDF original después de extraer los datos?", a: "Sí. La hoja de cálculo es una copia derivada. La normativa tributaria suele exigir conservar el comprobante original, y además lo necesitarás para resolver discrepancias." },
    { q: "¿El script del ejemplo sirve para cualquier factura?", a: "No. Es un punto de partida para PDF con texto y etiquetas habituales. Las expresiones regulares deben ajustarse a cada proveedor, y las facturas que no encajen deben quedar en la hoja de revisión en lugar de rellenarse con suposiciones." },
    { q: "¿Es seguro usar una herramienta en la nube para esto?", a: "Puede serlo si el proveedor ofrece un contrato de tratamiento de datos, plazos de retención claros y no usa tus documentos para entrenar modelos. Si las facturas contienen información especialmente sensible, valora el procesamiento local." },
  ],
};

export default guide;
