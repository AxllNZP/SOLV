import type { Guide } from "@/data/guide-types";

const guide: Guide = {
  slug: "calcular-margen-real-amazon-fba-2026",
  title: "Cómo calcular el margen real en Amazon FBA en 2026",
  description:
    "Desglose de todos los costes que reducen el beneficio por unidad en Amazon US: comisión de referencia, tarifa de gestión logística, recargo de combustible, almacenamiento, publicidad y devoluciones, con un ejemplo completo y escenarios.",
  category: "Comercio electrónico",
  published: "2026-11-27",
  updated: "2026-11-27",
  blocks: [
    { type: "p", text: "Vender a 29,99 dólares un producto que cuesta 6,50 parece un negocio redondo. Cuando se suman comisión, logística, almacenamiento, publicidad y devoluciones, puede quedar una cuarta parte del precio, o menos. El margen real no es precio menos coste del producto: es lo que sobra después de **todo** lo que ocurre entre la fábrica y el cliente, incluidas las unidades que vuelven." },
    { type: "p", text: "Esta guía se centra en Amazon Estados Unidos y describe el método de cálculo. Las tarifas exactas dependen de tamaño, peso, categoría, precio y temporada, y cambian durante el año: confírmalas siempre en Seller Central." },
    { type: "note", title: "Sobre las cifras de esta guía", text: "Los importes por unidad del ejemplo son **ilustrativos**. Sirven para enseñar el procedimiento, no para presupuestar tu producto." },
    { type: "h2", text: "Cambios de 2026 que afectan al cálculo" },
    { type: "ul", items: [
      "Desde el 15 de enero de 2026 rige una nueva tabla de tarifas de gestión logística; Amazon anunció un aumento medio de 0,08 dólares por unidad, con tramos según el precio de venta (menos de 10, de 10 a 50 y más de 50 dólares).",
      "Desde el 17 de abril de 2026 se aplica un recargo de combustible y logística del 3,5 % sobre la tarifa de gestión logística.",
      "El almacenamiento mensual de tamaño estándar se sitúa en torno a 0,78 dólares por pie cúbico de enero a septiembre y 2,40 de octubre a diciembre.",
      "En temporada alta suelen aplicarse tarifas de gestión logística superiores, así que un cálculo hecho en marzo no vale para noviembre.",
    ] },
    { type: "h2", text: "El mapa completo de costes" },
    { type: "table", caption: "Costes que debes considerar por unidad", head: ["Concepto", "Cuándo ocurre", "De qué depende", "Se olvida a menudo"], rows: [
      ["Coste del producto", "Compra", "Proveedor y volumen", "No"],
      ["Flete, seguro y aranceles", "Importación", "Origen, peso, código arancelario", "A veces"],
      ["Preparación y etiquetado", "Antes de entrar a FBA", "Quién prepara", "Sí"],
      ["Tarifa de colocación de entrada", "Envío a Amazon", "Tamaño y número de destinos", "Sí"],
      ["Comisión de referencia", "Venta", "Categoría y precio", "No"],
      ["Gestión logística FBA y recargos", "Venta", "Tamaño, peso, precio, temporada", "El recargo, sí"],
      ["Almacenamiento mensual", "Mientras no se vende", "Volumen y mes", "Sí"],
      ["Inventario antiguo o nivel bajo de inventario", "Según rotación", "Antigüedad y cobertura", "Casi siempre"],
      ["Publicidad", "Antes de la venta", "Competencia y estrategia", "Se subestima"],
      ["Devoluciones", "Después de la venta", "Categoría y calidad", "Casi siempre"],
      ["Suscripción, software y diseño", "Mensual", "Escala", "Sí"],
    ] },
    { type: "h2", text: "Las fórmulas" },
    { type: "code", label: "Cálculo por unidad vendida", code: String.raw`coste_en_destino  = producto + flete + aranceles + preparación

costes_amazon     = comisión_referencia
                  + gestión_logística × (1 + 0,035)
                  + colocación_de_entrada
                  + almacenamiento_prorrateado

almacenamiento    = volumen_ft3 × tarifa_mensual × meses_en_almacén

devoluciones      = tasa_de_devolución × coste_medio_por_devolución

beneficio         = precio − coste_en_destino − costes_amazon
                    − publicidad − devoluciones − otros

margen_neto (%)   = beneficio / precio × 100
ROI (%)           = beneficio / coste_en_destino × 100` },
    { type: "p", text: "El volumen en pies cúbicos se obtiene multiplicando largo, ancho y alto en pulgadas y dividiendo entre 1.728. Margen y ROI responden a preguntas distintas: el primero indica cuánto aguanta el precio; el segundo, cuánto rinde el dinero invertido en inventario." },
    { type: "h2", text: "Ejemplo completo" },
    { type: "p", text: "Producto de tamaño estándar, precio de 29,99 dólares, volumen de 0,1 pies cúbicos, 2,5 meses de permanencia media fuera de temporada alta." },
    { type: "table", caption: "Desglose ilustrativo por unidad (USD)", head: ["Concepto", "Cálculo", "Importe"], rows: [
      ["Producto", "Precio del proveedor", "6,50"],
      ["Flete y aranceles", "Prorrateo del embarque", "1,40"],
      ["Comisión de referencia", "15 % de 29,99", "4,50"],
      ["Gestión logística FBA", "Valor ilustrativo", "4,20"],
      ["Recargo de combustible", "3,5 % de 4,20", "0,15"],
      ["Colocación de entrada", "Valor ilustrativo", "0,30"],
      ["Almacenamiento", "0,1 × 0,78 × 2,5", "0,20"],
      ["Publicidad", "15 % de las ventas totales", "4,50"],
      ["Devoluciones", "5 % × 6,00", "0,30"],
      ["Otros", "Software, suscripción, diseño", "0,25"],
      ["**Coste total**", "Suma", "**22,30**"],
      ["**Beneficio**", "29,99 − 22,30", "**7,69**"],
    ] },
    { type: "p", text: "El margen neto es 7,69 / 29,99 = **25,6 %**. El ROI sobre el coste en destino (7,90) es **97,3 %**. Un cálculo ingenuo que solo restara producto y comisión habría mostrado casi 19 dólares de beneficio: más del doble de lo real." },
    { type: "h2", text: "Escenarios antes de comprar inventario" },
    { type: "p", text: "Un único número es una foto optimista. Prueba qué ocurre si cambian las variables que no controlas:" },
    { type: "table", caption: "Sensibilidad sobre el ejemplo", head: ["Escenario", "Beneficio (USD)", "Margen"], rows: [
      ["Base", "7,69", "25,6 %"],
      ["Almacenamiento de octubre a diciembre (solo cambia esa tarifa)", "7,29", "24,3 %"],
      ["Precio baja a 26,99", "5,59", "20,7 %"],
      ["Precio sube a 32,99", "9,79", "29,7 %"],
      ["Publicidad sube al 25 % de las ventas", "4,69", "15,6 %"],
    ] },
    { type: "p", text: "En los escenarios de precio, comisión y publicidad se recalculan porque son porcentajes. La fila de temporada alta solo muestra el efecto del almacenamiento; una simulación completa del último trimestre debe añadir las tarifas logísticas de temporada." },
    { type: "h2", text: "Punto de equilibrio publicitario" },
    { type: "p", text: "Antes de publicidad, el ejemplo deja 7,69 + 4,50 = 12,19 dólares, es decir, un **40,6 % del precio**. Ese es el ACoS de equilibrio de una venta atribuida a anuncios: por encima pierdes dinero en esa venta. Conviene distinguir **ACoS** (gasto en anuncios sobre ventas atribuidas a anuncios) de **TACoS** (gasto en anuncios sobre ventas totales). Un ACoS alto puede convivir con un TACoS sano si hay muchas ventas orgánicas, y al revés." },
    { type: "h2", text: "Haz el cálculo con una herramienta" },
    { type: "p", text: "La [calculadora Amazon FBA de SOLV](https://amazon-fba.solv.quest) estima tarifas FBA, comisiones, beneficio por unidad y ROI para Amazon US con tarifas de 2026, sin crear una cuenta, y muestra los componentes para que puedas verificarlos. Es una estimación: no sustituye los informes oficiales de Amazon. Úsala para comparar productos y contrasta el candidato final con la calculadora de ingresos y las páginas de tarifas de Seller Central." },
    { type: "h2", text: "Flujo de decisión para un producto nuevo" },
    { type: "code", label: "Filtro previo a la orden de compra", code: String.raw`  Medidas y peso reales del producto embalado
                │
                ▼
  Categoría y tarifas vigentes en Seller Central
                │
                ▼
  Cálculo base ──► ¿margen ≥ tu mínimo? ── no ──► renegociar o descartar
                │ sí
                ▼
  Escenario adverso (precio −10 %, publicidad +10 puntos)
                │
                ▼
  ¿Sigue en positivo? ── no ──► reducir pedido o descartar
                │ sí
                ▼
  Pedido de prueba y medición con datos reales` },
    { type: "p", text: "En el ejemplo, bajar el precio a 26,99 y subir la publicidad del 15 % al 25 % a la vez deja unos 2,89 dólares por unidad. Sigue siendo positivo, pero con poco margen para un error de medidas o un retraso." },
    { type: "h2", text: "Errores que inflan el margen" },
    { type: "ul", items: [
      "Medir el producto sin su embalaje y caer en un tramo de tamaño equivocado.",
      "Ignorar el peso dimensional cuando el paquete es grande y ligero.",
      "Prorratear el almacenamiento suponiendo que todo se vende en un mes.",
      "Contar como recuperable una devolución que no puede revenderse.",
      "Olvidar el recargo del 3,5 % y las tarifas de temporada alta.",
      "Mezclar impuestos a las ventas recaudados con tus ingresos.",
      "No descontar el coste del capital inmovilizado durante meses.",
    ] },
    { type: "h2", text: "Cómo mejorar el margen sin subir el precio" },
    { type: "table", caption: "Palancas y su contrapartida", head: ["Palanca", "Efecto", "Contrapartida"], rows: [
      ["Reducir el embalaje", "Puede bajar de tramo logístico y almacenar menos", "Más riesgo de daños si se exagera"],
      ["Reponer en lotes ajustados", "Menos almacenamiento y antigüedad", "Riesgo de rotura de stock y tarifas por nivel bajo"],
      ["Depurar palabras clave", "Menor gasto publicitario", "Posible caída de volumen"],
      ["Mejorar la ficha y las instrucciones", "Menos devoluciones", "Tiempo de contenido y fotografía"],
      ["Negociar condiciones con el proveedor", "Menor coste en destino", "Pedidos mínimos mayores"],
    ] },
    { type: "h2", text: "El margen también necesita caja" },
    { type: "p", text: "Un producto rentable por unidad puede dejarte sin liquidez. En el ejemplo, un pedido de 500 unidades inmoviliza 3.950 dólares solo en coste en destino, antes de gastar en publicidad, y el dinero vuelve a medida que se vende y Amazon liquida los pagos:" },
    { type: "ul", items: [
      "Calcula los meses que pasan entre pagar al proveedor y cobrar la última unidad, incluidos fabricación y transporte.",
      "Relaciona el beneficio esperado del lote con el capital inmovilizado y el tiempo, para comparar productos con rotaciones distintas.",
      "Reserva efectivo para la reposición: pedir tarde puede romper el stock justo cuando el producto empieza a posicionar.",
      "Prevé el caso en que vendas la mitad de lo esperado y cuánto almacenamiento adicional pagarías.",
      "Separa los impuestos y las devoluciones pendientes antes de reinvertir el saldo.",
    ] },
    { type: "p", text: "Por ejemplo, si las 500 unidades se vendieran al margen base, el beneficio sería de 3.845 dólares. Que eso ocurra en cuatro meses o en doce cambia por completo el atractivo de la inversión, aunque el margen por unidad parezca idéntico en la hoja de cálculo." },
    { type: "h2", text: "Concilia con la realidad cada mes" },
    { type: "p", text: "El cálculo previo es una hipótesis. Cada mes, compara la estimación con los informes de pagos y tarifas de Amazon: comisión efectiva, tarifa logística cobrada, almacenamiento, reembolsos y gasto publicitario. Una diferencia persistente suele indicar medidas mal registradas o un coste sin incluir. Si este cruce se hace a mano en varias hojas, es buen candidato para automatizar; la guía de [extracción de datos a Excel](/guias/automatizar-extraccion-facturas-pdf-a-excel) describe validaciones aplicables y la [calculadora de ROI](/herramientas/calculadora-roi) ayuda a valorar el esfuerzo." },
  ],
  faqs: [
    { q: "¿Cuánto cobra Amazon de comisión de referencia?", a: "Depende de la categoría y a veces del precio. El 15 % es habitual en muchas categorías, pero hay porcentajes distintos y mínimos por artículo. Consulta la tabla oficial de la categoría de tu producto." },
    { q: "¿Qué margen se considera bueno en Amazon FBA?", a: "No existe un umbral universal. Depende de la rotación, la competencia, la inversión y el riesgo. Define un margen mínimo que siga siendo positivo en un escenario adverso de precio y publicidad." },
    { q: "¿Cuál es la diferencia entre margen y ROI?", a: "El margen divide el beneficio entre el precio de venta. El ROI lo divide entre lo invertido en poner la unidad en destino. Un producto puede tener margen modesto y ROI alto si es barato de adquirir y rota rápido." },
    { q: "¿La calculadora usa mis tarifas exactas?", a: "Ofrece una estimación basada en las tarifas publicadas para 2026 y en los datos que introduces. Las tarifas efectivas pueden variar por medidas registradas, temporada, programas o cambios posteriores, así que verifica en Seller Central." },
    { q: "¿Sirve este cálculo para Amazon México o España?", a: "El método de sumar todos los costes sirve, pero las tarifas, impuestos y programas de esta guía corresponden a Amazon Estados Unidos. Usa las tablas del mercado donde vendas." },
  ],
};

export default guide;
