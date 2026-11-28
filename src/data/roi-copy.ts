import type { GuideBlock } from "@/data/guide-types";
import type { RoiInputs } from "@/lib/roi";
import type { Locale } from "@/lib/site";

interface RoiCopy {
  numberLocale: string;
  title: string;
  description: string;
  intro: string;
  guidesLead: string;
  guidesLink: string;
  currency: string;
  fields: Record<keyof RoiInputs, string>;
  reset: string;
  resultsTitle: string;
  results: {
    currentCost: string;
    hoursSaved: string;
    netSaving: string;
    netYear1: string;
    payback: string;
    roi12: string;
    roi36: string;
  };
  months: string;
  neverRecovered: string;
  notApplicable: string;
  methodology: GuideBlock[];
}

const es: RoiCopy = {
  numberLocale: "es",
  title: "Calculadora de ahorro y ROI por automatización de procesos",
  description:
    "Estima el coste de un proceso manual, el ahorro mensual, el plazo de recuperación y el ROI de automatizarlo. Gratis, sin registro y con los cálculos en tu navegador.",
  intro: "Los valores iniciales son un ejemplo: sustitúyelos por los tuyos. Lo que escribes aquí no se envía a ningún servidor.",
  guidesLead: "Consulta también nuestras",
  guidesLink: "guías técnicas",
  currency: "Moneda",
  fields: {
    runsPerMonth: "Veces que se ejecuta el proceso al mes",
    minutesPerRun: "Minutos manuales por ejecución",
    hourlyCost: "Coste total por hora de trabajo",
    automatedShare: "Porcentaje del trabajo automatizable (%)",
    errorRate: "Ejecuciones con error hoy (%)",
    errorCost: "Coste medio de corregir un error",
    errorReduction: "Reducción de errores esperada (%)",
    setupCost: "Inversión inicial en automatizar",
    monthlyCost: "Coste mensual de operar la solución",
  },
  reset: "Restablecer ejemplo",
  resultsTitle: "Resultados estimados",
  results: {
    currentCost: "Coste manual actual al mes",
    hoursSaved: "Horas liberadas al mes",
    netSaving: "Ahorro neto mensual",
    netYear1: "Beneficio neto en 12 meses",
    payback: "Plazo de recuperación",
    roi12: "ROI a 12 meses",
    roi36: "ROI a 36 meses",
  },
  months: "meses",
  neverRecovered: "No se recupera",
  notApplicable: "No aplica",
  methodology: [
    { type: "h2", text: "Metodología de cálculo" },
    { type: "p", text: "La calculadora compara el coste mensual de hacer un proceso a mano con lo que se ahorraría al automatizar una parte. No usa promedios del sector ni datos ocultos: todo sale de las cifras que introduces." },
    { type: "code", label: "Fórmulas utilizadas", code: String.raw`horas_manuales     = ejecuciones × minutos / 60
coste_mano_de_obra = horas_manuales × coste_hora
coste_errores      = ejecuciones × tasa_error × coste_por_error
coste_actual       = coste_mano_de_obra + coste_errores

horas_liberadas    = horas_manuales × parte_automatizable
ahorro_neto_mes    = horas_liberadas × coste_hora
                     + coste_errores × reducción_de_errores
                     − coste_mensual_de_operación

beneficio_12_meses = ahorro_neto_mes × 12 − inversión_inicial
recuperación_meses = inversión_inicial / ahorro_neto_mes
ROI(n)             = (ahorro_neto_mes × n − inversión_inicial)
                     / (inversión_inicial + coste_mensual × n) × 100` },
    { type: "p", text: "En la fórmula del ROI, el numerador es el beneficio neto (ya descontados operación e inversión) y el denominador es todo el dinero aportado en el periodo." },
    { type: "h2", text: "Ejemplo resuelto" },
    { type: "p", text: "Con los valores iniciales (400 ejecuciones de 6 minutos, 12 por hora, 80 % automatizable, 3 % de errores a 15 cada uno, 70 % menos errores, 2.000 de inversión y 30 al mes):" },
    { type: "table", caption: "Paso a paso", head: ["Magnitud", "Operación", "Resultado"], rows: [
      ["Horas manuales", "400 × 6 / 60", "40 h"],
      ["Coste actual", "40 × 12 + 400 × 3 % × 15", "660 al mes"],
      ["Horas liberadas", "40 × 80 %", "32 h"],
      ["Ahorro neto", "32 × 12 + 180 × 70 % − 30", "480 al mes"],
      ["Recuperación", "2.000 / 480", "4,2 meses"],
      ["Beneficio a 12 meses", "480 × 12 − 2.000", "3.760"],
      ["ROI a 12 meses", "3.760 / (2.000 + 360)", "159,3 %"],
    ] },
    { type: "h2", text: "Cómo obtener buenos datos de entrada" },
    { type: "ul", items: [
      "**Minutos por ejecución:** cronometra al menos diez casos reales, incluyendo búsquedas e interrupciones propias de la tarea.",
      "**Coste por hora:** usa el coste total para la empresa (salario, cargas y beneficios), no solo el sueldo neto.",
      "**Porcentaje automatizable:** las excepciones y revisiones seguirán siendo manuales. Ser conservador evita decepciones.",
      "**Inversión inicial:** incluye análisis, desarrollo, pruebas, migración y formación.",
      "**Coste mensual:** suma licencias, alojamiento y horas de mantenimiento.",
    ] },
    { type: "h2", text: "Límites del modelo" },
    { type: "p", text: "Es una estimación lineal: supone un volumen estable, que el ahorro empieza desde el primer mes y no descuenta el valor del dinero en el tiempo. Las horas liberadas solo se convierten en ahorro real si se dedican a trabajo de valor o evitan contratar u horas extra. Tampoco valora beneficios difíciles de medir, como trazabilidad o rapidez de respuesta. Prueba un escenario pesimista (más inversión, menos automatización) antes de decidir." },
    { type: "p", text: "Para aterrizarlo en un caso concreto, revisa la guía para [automatizar la extracción de facturas a Excel](/guias/automatizar-extraccion-facturas-pdf-a-excel) o [escríbenos para un diagnóstico](/#contacto)." },
  ],
};

const en: RoiCopy = {
  numberLocale: "en-US",
  title: "Process automation savings and ROI calculator",
  description:
    "Estimate the cost of a manual process, the monthly savings, the payback period and the ROI of automating it. Free, no sign-up, with every calculation done in your browser.",
  intro: "The starting values are an example: replace them with your own. What you type here is not sent to any server.",
  guidesLead: "See also our",
  guidesLink: "technical guides",
  currency: "Currency",
  fields: {
    runsPerMonth: "Times the process runs per month",
    minutesPerRun: "Manual minutes per run",
    hourlyCost: "Fully loaded cost per work hour",
    automatedShare: "Share of the work that can be automated (%)",
    errorRate: "Runs with an error today (%)",
    errorCost: "Average cost of fixing one error",
    errorReduction: "Expected reduction in errors (%)",
    setupCost: "Upfront investment to automate",
    monthlyCost: "Monthly cost of running the solution",
  },
  reset: "Reset example",
  resultsTitle: "Estimated results",
  results: {
    currentCost: "Current manual cost per month",
    hoursSaved: "Hours freed per month",
    netSaving: "Net monthly savings",
    netYear1: "Net benefit over 12 months",
    payback: "Payback period",
    roi12: "12-month ROI",
    roi36: "36-month ROI",
  },
  months: "months",
  neverRecovered: "Never pays back",
  notApplicable: "Not applicable",
  methodology: [
    { type: "h2", text: "Calculation methodology" },
    { type: "p", text: "The calculator compares the monthly cost of doing a process by hand with what you would save by automating part of it. It uses no industry averages or hidden data: everything comes from the figures you enter." },
    { type: "code", label: "Formulas used", code: String.raw`manual_hours       = runs × minutes / 60
labour_cost        = manual_hours × hourly_cost
error_cost         = runs × error_rate × cost_per_error
current_cost       = labour_cost + error_cost

hours_freed        = manual_hours × automatable_share
net_monthly_saving = hours_freed × hourly_cost
                     + error_cost × error_reduction
                     − monthly_operating_cost

benefit_12_months  = net_monthly_saving × 12 − upfront_investment
payback_months     = upfront_investment / net_monthly_saving
ROI(n)             = (net_monthly_saving × n − upfront_investment)
                     / (upfront_investment + monthly_cost × n) × 100` },
    { type: "p", text: "In the ROI formula, the numerator is the net benefit (with operation and investment already deducted) and the denominator is all the money put in during the period." },
    { type: "h2", text: "Worked example" },
    { type: "p", text: "With the starting values (400 runs of 6 minutes, 12 per hour, 80% automatable, 3% errors at 15 each, 70% fewer errors, 2,000 upfront and 30 per month):" },
    { type: "table", caption: "Step by step", head: ["Quantity", "Operation", "Result"], rows: [
      ["Manual hours", "400 × 6 / 60", "40 h"],
      ["Current cost", "40 × 12 + 400 × 3% × 15", "660 per month"],
      ["Hours freed", "40 × 80%", "32 h"],
      ["Net savings", "32 × 12 + 180 × 70% − 30", "480 per month"],
      ["Payback", "2,000 / 480", "4.2 months"],
      ["12-month benefit", "480 × 12 − 2,000", "3,760"],
      ["12-month ROI", "3,760 / (2,000 + 360)", "159.3%"],
    ] },
    { type: "h2", text: "How to get good input data" },
    { type: "ul", items: [
      "**Minutes per run:** time at least ten real cases, including the searches and interruptions that belong to the task.",
      "**Hourly cost:** use the total cost to the company (salary, taxes and benefits), not just take-home pay.",
      "**Automatable share:** exceptions and reviews will remain manual. Being conservative avoids disappointment.",
      "**Upfront investment:** include analysis, development, testing, migration and training.",
      "**Monthly cost:** add up licences, hosting and maintenance hours.",
    ] },
    { type: "h2", text: "Limits of the model" },
    { type: "p", text: "This is a linear estimate: it assumes a stable volume and savings from the first month, and it does not discount the time value of money. Freed hours only become real savings if they go into valuable work or avoid hiring or overtime. It also ignores benefits that are hard to measure, such as traceability or response speed. Try a pessimistic scenario (more investment, less automation) before deciding." },
    { type: "p", text: "To apply it to a concrete case, read the guide on [automating invoice extraction to Excel](/guias/automatizar-extraccion-facturas-pdf-a-excel) or [contact us for a diagnosis](/#contacto)." },
  ],
};

export const ROI_COPY: Record<Locale, RoiCopy> = { es, en };
