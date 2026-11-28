"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { ROI_COPY } from "@/data/roi-copy";
import { calculateRoi, DEFAULT_INPUTS, type RoiInputs } from "@/lib/roi";

const FIELDS: { key: keyof RoiInputs; max?: number }[] = [
  { key: "runsPerMonth" },
  { key: "minutesPerRun" },
  { key: "hourlyCost" },
  { key: "automatedShare", max: 100 },
  { key: "errorRate", max: 100 },
  { key: "errorCost" },
  { key: "errorReduction", max: 100 },
  { key: "setupCost" },
  { key: "monthlyCost" },
];

const CURRENCIES = ["USD", "PEN", "EUR", "MXN", "COP"];

type Draft = Record<keyof RoiInputs, string>;

const toDraft = (v: RoiInputs) =>
  Object.fromEntries(Object.entries(v).map(([k, n]) => [k, String(n)])) as Draft;

export default function RoiCalculator() {
  const { locale } = useLocale();
  const copy = ROI_COPY[locale];
  const [draft, setDraft] = useState<Draft>(() => toDraft(DEFAULT_INPUTS));
  const [currency, setCurrency] = useState("USD");

  const inputs = Object.fromEntries(
    FIELDS.map((f) => {
      const n = Number(draft[f.key]);
      return [f.key, Math.min(Number.isFinite(n) ? Math.max(n, 0) : 0, f.max ?? 1e12)];
    }),
  ) as unknown as RoiInputs;
  const r = calculateRoi(inputs);

  const format = (n: number, options: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(copy.numberLocale, options).format(n);
  const money = (n: number) => format(n, { style: "currency", currency, maximumFractionDigits: 0 });
  const num = (n: number) => format(n, { maximumFractionDigits: 1 });
  const percent = (n: number | null) =>
    n === null ? copy.notApplicable : format(n / 100, { style: "percent", maximumFractionDigits: 1 });

  const results = [
    { label: copy.results.currentCost, value: money(r.currentMonthlyCost) },
    { label: copy.results.hoursSaved, value: `${num(r.hoursSaved)} h` },
    { label: copy.results.netSaving, value: money(r.netMonthlySaving) },
    { label: copy.results.netYear1, value: money(r.netYear1) },
    { label: copy.results.payback, value: r.paybackMonths === null ? copy.neverRecovered : `${num(r.paybackMonths)} ${copy.months}` },
    { label: copy.results.roi12, value: percent(r.roi12) },
    { label: copy.results.roi36, value: percent(r.roi36) },
  ];

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none";

  return (
    <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-xl border border-border bg-surface p-6">
        <label className="block text-sm">
          <span className="mb-1 block text-muted">{copy.currency}</span>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass}>
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {FIELDS.map((f) => (
          <label key={f.key} className="block text-sm">
            <span className="mb-1 block text-muted">{copy.fields[f.key]}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={f.max}
              step="any"
              value={draft[f.key]}
              onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
              className={inputClass}
            />
          </label>
        ))}
        <button type="button" onClick={() => setDraft(toDraft(DEFAULT_INPUTS))} className="text-sm text-accent2 hover:underline">
          {copy.reset}
        </button>
      </form>
      <section aria-live="polite" aria-label={copy.resultsTitle} className="h-fit rounded-xl border border-accent/40 bg-surface p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">{copy.resultsTitle}</h2>
        <dl className="mt-4 space-y-3">
          {results.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-border pb-2">
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="text-right font-bold text-accent2">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
