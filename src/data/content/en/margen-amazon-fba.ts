import type { GuideText } from "@/data/guide-types";

const guide: GuideText = {
  title: "How to calculate your real Amazon FBA margin in 2026",
  description:
    "A breakdown of every cost that eats into profit per unit on Amazon US: referral fee, fulfilment fee, fuel surcharge, storage, advertising and returns, with a complete example and scenarios.",
  category: "E-commerce",
  blocks: [
    { type: "p", text: "Selling at 29.99 dollars a product that costs 6.50 looks like a great business. Once you add the referral fee, fulfilment, storage, advertising and returns, a quarter of the price, or less, may be left. Real margin is not price minus product cost: it is what remains after **everything** that happens between the factory and the customer, including the units that come back." },
    { type: "p", text: "This guide focuses on Amazon United States and describes the calculation method. Exact fees depend on size, weight, category, price and season, and they change during the year: always confirm them in Seller Central." },
    { type: "note", title: "About the figures in this guide", text: "The per-unit amounts in the example are **illustrative**. They are there to teach the procedure, not to budget your product." },
    { type: "h2", text: "2026 changes that affect the calculation" },
    { type: "ul", items: [
      "Since 15 January 2026 a new fulfilment fee table applies; Amazon announced an average increase of 0.08 dollars per unit, with bands based on the selling price (under 10, 10 to 50 and over 50 dollars).",
      "Since 17 April 2026 a 3.5% fuel and logistics surcharge applies to the fulfilment fee.",
      "Monthly storage for standard-size items is around 0.78 dollars per cubic foot from January to September and 2.40 from October to December.",
      "Peak season usually carries higher fulfilment fees, so a calculation made in March is not valid for November.",
    ] },
    { type: "h2", text: "The full cost map" },
    { type: "table", caption: "Costs to consider per unit", head: ["Item", "When it happens", "What it depends on", "Often forgotten"], rows: [
      ["Product cost", "Purchase", "Supplier and volume", "No"],
      ["Freight, insurance and duties", "Import", "Origin, weight, tariff code", "Sometimes"],
      ["Preparation and labelling", "Before entering FBA", "Who does the prep", "Yes"],
      ["Inbound placement fee", "Shipment to Amazon", "Size and number of destinations", "Yes"],
      ["Referral fee", "Sale", "Category and price", "No"],
      ["FBA fulfilment and surcharges", "Sale", "Size, weight, price, season", "The surcharge, yes"],
      ["Monthly storage", "While unsold", "Volume and month", "Yes"],
      ["Aged inventory or low inventory level", "Depends on turnover", "Age and days of cover", "Almost always"],
      ["Advertising", "Before the sale", "Competition and strategy", "Underestimated"],
      ["Returns", "After the sale", "Category and quality", "Almost always"],
      ["Subscription, software and design", "Monthly", "Scale", "Yes"],
    ] },
    { type: "h2", text: "The formulas" },
    { type: "code", label: "Calculation per unit sold", code: String.raw`landed_cost       = product + freight + duties + preparation

amazon_costs      = referral_fee
                  + fulfilment_fee × (1 + 0.035)
                  + inbound_placement
                  + prorated_storage

storage           = volume_ft3 × monthly_rate × months_in_warehouse

returns           = return_rate × average_cost_per_return

profit            = price − landed_cost − amazon_costs
                    − advertising − returns − other

net_margin (%)    = profit / price × 100
ROI (%)           = profit / landed_cost × 100` },
    { type: "p", text: "Volume in cubic feet is length times width times height in inches, divided by 1,728. Margin and ROI answer different questions: the first shows how much price pressure you can absorb; the second, how much the money invested in inventory earns." },
    { type: "h2", text: "A complete example" },
    { type: "p", text: "A standard-size product priced at 29.99 dollars, with a volume of 0.1 cubic feet and an average stay of 2.5 months outside peak season." },
    { type: "table", caption: "Illustrative breakdown per unit (USD)", head: ["Item", "Calculation", "Amount"], rows: [
      ["Product", "Supplier price", "6.50"],
      ["Freight and duties", "Share of the shipment", "1.40"],
      ["Referral fee", "15% of 29.99", "4.50"],
      ["FBA fulfilment", "Illustrative value", "4.20"],
      ["Fuel surcharge", "3.5% of 4.20", "0.15"],
      ["Inbound placement", "Illustrative value", "0.30"],
      ["Storage", "0.1 × 0.78 × 2.5", "0.20"],
      ["Advertising", "15% of total sales", "4.50"],
      ["Returns", "5% × 6.00", "0.30"],
      ["Other", "Software, subscription, design", "0.25"],
      ["**Total cost**", "Sum", "**22.30**"],
      ["**Profit**", "29.99 − 22.30", "**7.69**"],
    ] },
    { type: "p", text: "Net margin is 7.69 / 29.99 = **25.6%**. ROI on landed cost (7.90) is **97.3%**. A naive calculation that only subtracted product and referral fee would have shown almost 19 dollars of profit: more than double the real figure." },
    { type: "h2", text: "Run scenarios before buying inventory" },
    { type: "p", text: "A single number is an optimistic snapshot. Test what happens when the variables you do not control change:" },
    { type: "table", caption: "Sensitivity of the example", head: ["Scenario", "Profit (USD)", "Margin"], rows: [
      ["Base", "7.69", "25.6%"],
      ["October to December storage (only that rate changes)", "7.29", "24.3%"],
      ["Price drops to 26.99", "5.59", "20.7%"],
      ["Price rises to 32.99", "9.79", "29.7%"],
      ["Advertising rises to 25% of sales", "4.69", "15.6%"],
    ] },
    { type: "p", text: "In the price scenarios, the referral fee and advertising are recalculated because they are percentages. The peak season row only shows the storage effect; a full simulation of the last quarter must add seasonal fulfilment fees." },
    { type: "h2", text: "Advertising break-even point" },
    { type: "p", text: "Before advertising, the example leaves 7.69 + 4.50 = 12.19 dollars, that is, **40.6% of the price**. That is the break-even ACoS for an ad-attributed sale: above it you lose money on that sale. Distinguish **ACoS** (ad spend over ad-attributed sales) from **TACoS** (ad spend over total sales). A high ACoS can coexist with a healthy TACoS when there are many organic sales, and the other way round." },
    { type: "h2", text: "Do the calculation with a tool" },
    { type: "p", text: "[SOLV's Amazon FBA calculator](https://amazon-fba.solv.quest) estimates FBA fees, referral commissions, profit per unit and ROI for Amazon US with 2026 rates, with no account required, and shows the components so you can verify them. It is an estimate and does not replace Amazon's official reports. Use it to compare products, and check your final candidate against the revenue calculator and fee pages in Seller Central." },
    { type: "h2", text: "Decision flow for a new product" },
    { type: "code", label: "Filter before placing the purchase order", code: String.raw`  Real measurements and weight of the packaged product
                │
                ▼
  Category and current fees in Seller Central
                │
                ▼
  Base calculation ──► margin ≥ your minimum? ── no ──► renegotiate or drop
                │ yes
                ▼
  Adverse scenario (price −10%, advertising +10 points)
                │
                ▼
  Still positive? ── no ──► reduce the order or drop
                │ yes
                ▼
  Test order and measurement with real data` },
    { type: "p", text: "In the example, lowering the price to 26.99 and raising advertising from 15% to 25% at the same time leaves about 2.89 dollars per unit. It is still positive, but with little room for a measurement error or a delay." },
    { type: "h2", text: "Mistakes that inflate your margin" },
    { type: "ul", items: [
      "Measuring the product without its packaging and landing in the wrong size tier.",
      "Ignoring dimensional weight when the parcel is large and light.",
      "Prorating storage as if everything sold within one month.",
      "Counting as recoverable a return that cannot be resold.",
      "Forgetting the 3.5% surcharge and peak season fees.",
      "Mixing collected sales tax into your revenue.",
      "Not deducting the cost of capital tied up for months.",
    ] },
    { type: "h2", text: "How to improve margin without raising the price" },
    { type: "table", caption: "Levers and their trade-offs", head: ["Lever", "Effect", "Trade-off"], rows: [
      ["Shrink the packaging", "Can drop a fulfilment tier and take less storage", "Higher risk of damage if overdone"],
      ["Replenish in tighter batches", "Less storage and ageing", "Risk of stockouts and low inventory fees"],
      ["Prune keywords", "Lower advertising spend", "Possible drop in volume"],
      ["Improve the listing and instructions", "Fewer returns", "Time spent on content and photography"],
      ["Negotiate terms with the supplier", "Lower landed cost", "Larger minimum orders"],
    ] },
    { type: "h2", text: "Margin also needs cash" },
    { type: "p", text: "A product that is profitable per unit can still leave you without liquidity. In the example, an order of 500 units ties up 3,950 dollars in landed cost alone, before any advertising spend, and the money comes back only as units sell and Amazon releases payments:" },
    { type: "ul", items: [
      "Count the months between paying the supplier and collecting for the last unit, including manufacturing and transport.",
      "Relate the expected profit of the batch to the capital tied up and the time, to compare products with different turnover.",
      "Set cash aside for replenishment: ordering late can cause a stockout just as the product starts to rank.",
      "Plan for selling only half of what you expect, and for how much extra storage you would pay.",
      "Set aside taxes and pending returns before reinvesting the balance.",
    ] },
    { type: "p", text: "For instance, if all 500 units sold at the base margin, profit would be 3,845 dollars. Whether that happens in four months or in twelve completely changes how attractive the investment is, even though the margin per unit looks identical in the spreadsheet." },
    { type: "h2", text: "Reconcile with reality every month" },
    { type: "p", text: "The upfront calculation is a hypothesis. Every month, compare the estimate with Amazon's payment and fee reports: effective referral fee, fulfilment fee actually charged, storage, refunds and advertising spend. A persistent gap usually points to wrongly registered measurements or a missing cost. If this cross-check is done by hand across several spreadsheets, it is a good candidate for automation; the guide on [extracting data to Excel](/guias/automatizar-extraccion-facturas-pdf-a-excel) describes validations you can apply and the [ROI calculator](/herramientas/calculadora-roi) helps you weigh the effort." },
  ],
  faqs: [
    { q: "How much does Amazon charge as a referral fee?", a: "It depends on the category and sometimes on the price. 15% is common in many categories, but there are other percentages and per-item minimums. Check the official table for your product's category." },
    { q: "What margin is considered good on Amazon FBA?", a: "There is no universal threshold. It depends on turnover, competition, investment and risk. Set a minimum margin that stays positive in an adverse price and advertising scenario." },
    { q: "What is the difference between margin and ROI?", a: "Margin divides profit by the selling price. ROI divides it by what you invested to land the unit. A product can have a modest margin and a high ROI if it is cheap to acquire and turns over quickly." },
    { q: "Does the calculator use my exact fees?", a: "It provides an estimate based on the published 2026 fees and the data you enter. Actual fees can differ because of registered measurements, season, programmes or later changes, so verify them in Seller Central." },
    { q: "Does this calculation work for Amazon Mexico or Spain?", a: "The method of adding up every cost works, but the fees, taxes and programmes in this guide are those of Amazon United States. Use the tables for the marketplace where you sell." },
  ],
};

export default guide;
