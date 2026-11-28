export interface RoiInputs {
  runsPerMonth: number;
  minutesPerRun: number;
  hourlyCost: number;
  automatedShare: number;
  errorRate: number;
  errorCost: number;
  errorReduction: number;
  setupCost: number;
  monthlyCost: number;
}

export const DEFAULT_INPUTS: RoiInputs = {
  runsPerMonth: 400,
  minutesPerRun: 6,
  hourlyCost: 12,
  automatedShare: 80,
  errorRate: 3,
  errorCost: 15,
  errorReduction: 70,
  setupCost: 2000,
  monthlyCost: 30,
};

export function calculateRoi(i: RoiInputs) {
  const laborCost = ((i.runsPerMonth * i.minutesPerRun) / 60) * i.hourlyCost;
  const errorCostMonthly = i.runsPerMonth * (i.errorRate / 100) * i.errorCost;
  const hoursSaved = ((i.runsPerMonth * i.minutesPerRun) / 60) * (i.automatedShare / 100);
  const netMonthlySaving =
    hoursSaved * i.hourlyCost + errorCostMonthly * (i.errorReduction / 100) - i.monthlyCost;

  /** ROI = (ahorro bruto − inversión total) / inversión total. */
  const roi = (months: number): number | null => {
    const invested = i.setupCost + i.monthlyCost * months;
    if (invested <= 0) return null;
    return ((netMonthlySaving * months - i.setupCost) / invested) * 100;
  };

  return {
    currentMonthlyCost: laborCost + errorCostMonthly,
    hoursSaved,
    netMonthlySaving,
    netYear1: netMonthlySaving * 12 - i.setupCost,
    paybackMonths: netMonthlySaving > 0 ? i.setupCost / netMonthlySaving : null,
    roi12: roi(12),
    roi36: roi(36),
  };
}
