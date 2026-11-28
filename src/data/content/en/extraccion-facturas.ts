import type { GuideText } from "@/data/guide-types";

const guide: GuideText = {
  title: "Automating invoice data extraction from PDF to Excel",
  description:
    "How to turn PDF invoices into a reliable spreadsheet: choosing the method, sample Python code, accounting validations, error handling and the architecture of a workflow that removes manual typing.",
  category: "Automation",
  blocks: [
    { type: "p", text: "Typing the number, date, supplier, net amount, tax and total of each invoice by hand seems harmless when there are ten a month. With three hundred, it is a full working day of repetitive work in which swapping two digits is enough to unbalance a month-end close. The good news: this is one of the easiest processes to automate well, provided it is designed to detect its own mistakes." },
    { type: "p", text: "Here you will see how to choose a technique based on your documents, a starter script, the validations that separate a demo from a dependable system and a way to organise exceptions." },
    { type: "h2", text: "Before extracting: is there a structured source?" },
    { type: "p", text: "An invoice PDF is usually a visual rendering of data that already exists in structured form. In countries with mandatory electronic invoicing, such as Peru, Mexico, Colombia or Chile, the official document is an XML file, and elsewhere there are standards such as Factur-X, which embeds the XML inside the PDF itself. If you can obtain the XML from your supplier, your invoicing system or the tax authority portal, **read it instead of interpreting the PDF**: there is no ambiguity and no recognition error." },
    { type: "p", text: "PDF extraction is then reserved for invoices from foreign suppliers, utility bills, scanned documents and anything that only arrives as an image or PDF." },
    { type: "h2", text: "Identify what kind of PDF you have" },
    { type: "table", caption: "Invoice types and suitable techniques", head: ["Type", "How to recognise it", "Technique", "Expected reliability"], rows: [
      ["Attached or downloadable XML", "There is an `.xml` next to the PDF", "Read the XML directly", "Very high"],
      ["Digital PDF with a fixed template", "You can select the text and the layout repeats", "Text extraction and rules", "High"],
      ["Digital PDFs from many suppliers", "Selectable text, varied layouts", "Per-supplier rules or an extraction model", "Medium to high, with review"],
      ["Scan or photograph", "Text cannot be selected", "OCR, then rules or a model", "Heavily dependent on image quality"],
    ] },
    { type: "p", text: "A quick trick: open the PDF and search for the total amount. If the search does not find it even though you can see it, it is an image and you need OCR." },
    { type: "h2", text: "Comparing the approaches" },
    { type: "table", caption: "What to choose by volume and variety", head: ["Approach", "Initial cost", "Maintenance", "Privacy", "Best for"], rows: [
      ["Manual typing", "None", "Constant", "Internal", "Very low volumes"],
      ["Power Query in Excel", "Low", "Medium", "Local", "Regular tables and Excel users"],
      ["Your own Python script", "Medium", "Low if templates are stable", "Local", "Recurring suppliers"],
      ["Cloud OCR or AI service", "Low to medium", "Low", "The document leaves your environment", "A wide variety of layouts"],
      ["Hybrid: rules plus exception review", "Medium", "Low", "Configurable", "Most small and medium businesses"],
    ] },
    { type: "h2", text: "Architecture of a robust workflow" },
    { type: "code", label: "From the inbox to the spreadsheet", code: String.raw`  Input (folder or email)
        │
        ▼
  SHA-256 hash ──► already processed? ──► yes ──► discard duplicate
        │ no
        ▼
  Has text? ── no ──► OCR
        │ yes             │
        ▼◄────────────────┘
  Field extraction (rules per supplier)
        │
        ▼
  Validations (arithmetic, date, identifier, duplicate)
        │
   ┌────┴─────┐
   ▼          ▼
 Valid     Exception ──► human review queue
   │
   ▼
 Excel / ERP + original file kept + audit log` },
    { type: "p", text: "The key is the fork. A useful system is not the one that is always right, but the one that **knows when it is not sure** and sets the document aside for a person." },
    { type: "h2", text: "Define the fields before you write code" },
    { type: "table", caption: "Minimum schema for a purchase invoice", head: ["Field", "Type", "Validation rule"], rows: [
      ["`supplier_tax_id`", "Text", "Format and check digit according to the country"],
      ["`number`", "Text", "Not empty and unique per supplier"],
      ["`issue_date`", "Date", "Not in the future and within a reasonable period"],
      ["`currency`", "ISO 4217 code", "Closed list (PEN, USD, EUR...)"],
      ["`net`", "Decimal", "Greater than or equal to zero except credit notes"],
      ["`tax`", "Decimal", "Consistent with the applicable rate"],
      ["`total`", "Decimal", "`net + tax` within a rounding tolerance"],
      ["`source_file`", "Text", "Path and hash of the document"],
    ] },
    { type: "p", text: "Store identifiers as text, not numbers: Excel drops leading zeros and turns long figures into scientific notation. For money use `Decimal`, not `float`, because binary arithmetic introduces differences of a cent." },
    { type: "h2", text: "Practical example in Python" },
    { type: "p", text: "The following script uses `pdfplumber` to read digital PDFs and `openpyxl` to write the Excel file (`pip install pdfplumber openpyxl`). It is intended for invoices with recognisable labels; adapt the regular expressions to your suppliers." },
    { type: "code", label: "extract_invoices.py", code: String.raw`import hashlib, re
from decimal import Decimal
from pathlib import Path

import pdfplumber
from openpyxl import Workbook

PATTERNS = {
    "number": r"Invoice\s*(?:No\.?|Number|#)?\s*:?\s*([A-Z0-9]+-\d+)",
    "date":   r"(?:Invoice |Issue )?Date\s*:?\s*(\d{2}/\d{2}/\d{4})",
    "net":    r"(?:Net amount|Subtotal)\s*:?\D*?(\d[\d.,]*)",
    "tax":    r"(?:VAT|Tax)[^:\n]*:\D*?(\d[\d.,]*)",
    "total":  r"(?<!Sub)Total\s*(?:due)?\s*:?\D*?(\d[\d.,]*)",
}

def amount(text):
    """Accepts both 1,234.50 and 1.234,50."""
    t = text.strip(".,")
    if t.rfind(",") > t.rfind("."):
        t = t.replace(".", "").replace(",", ".")
    else:
        t = t.replace(",", "")
    return Decimal(t)

def extract(path):
    with pdfplumber.open(path) as pdf:
        text = "\n".join(p.extract_text() or "" for p in pdf.pages)
    if not text.strip():
        return {}, ["no text: OCR required"]

    data, errors = {}, []
    for field, pattern in PATTERNS.items():
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            data[field] = m.group(1)
        else:
            errors.append(f"missing {field}")

    for field in ("net", "tax", "total"):
        if field in data:
            data[field] = amount(data[field])

    if not errors:
        gap = abs(data["net"] + data["tax"] - data["total"])
        if gap > Decimal("0.02"):
            errors.append("net + tax does not match total")
    return data, errors

def safe(value):
    """Stops Excel from reading third-party text as a formula."""
    if isinstance(value, str) and value.startswith(("=", "+", "-", "@")):
        return "'" + value
    return value

book = Workbook()
ok = book.active
ok.title = "Invoices"
review = book.create_sheet("Review")
columns = ["number", "date", "net", "tax", "total"]
ok.append(["file", *columns])
review.append(["file", "reason"])

seen = set()
for path in sorted(Path("input").glob("*.pdf")):
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if digest in seen:
        continue
    seen.add(digest)
    try:
        data, errors = extract(path)
    except Exception as e:
        data, errors = {}, [f"could not read: {e}"]
    if errors:
        review.append([safe(path.name), "; ".join(errors)])
    else:
        ok.append([safe(path.name), *(safe(data[c]) for c in columns)])

book.save("invoices.xlsx")` },
    { type: "note", title: "Why there is a function called safe()", text: "The content of an invoice is written by a third party. If a field starts with `=`, the spreadsheet could execute it as a formula. Neutralising it is a cheap defence against formula injection." },
    { type: "h2", text: "OCR for scanned documents" },
    { type: "p", text: "The simplest local option is OCRmyPDF, which adds a text layer on top of the image and leaves the PDF ready for the same script. An example: `ocrmypdf -l eng --deskew --skip-text scan.pdf scan_ocr.pdf`. The `--deskew` option straightens crooked pages and `--skip-text` leaves pages that already contain text untouched." },
    { type: "ul", items: [
      "Ask for scans at 300 dpi, in black and white or greyscale, without shadows.",
      "Avoid photographs taken at an angle; perspective badly degrades recognition.",
      "Never accept an OCR figure that does not pass the arithmetic check.",
      "Remember that arithmetic does not catch everything: a misread invoice number can slip through. Check it against purchase orders or the tax register when you can.",
    ] },
    { type: "h2", text: "When to use AI models and how to control them" },
    { type: "p", text: "Extraction models and language models cope with layouts they have never seen, but they can return a plausible and wrong value. Treat them like a new operator: request output in a fixed schema, validate every field with the same rules, check that values appear literally in the document and sample approved results. Before sending invoices to an external service, review its retention policy; the guide on [using AI safely at work](/guias/seguridad-ia-evitar-fuga-datos-chatgpt-empresas) details what to check." },
    { type: "h2", text: "Measuring whether it works" },
    { type: "table", caption: "Indicators for the first month", head: ["Indicator", "How to calculate it", "What it tells you"], rows: [
      ["Straight-through rate", "Invoices with no intervention / total", "How much work you really save"],
      ["Exception rate", "Invoices sent to review / total", "Where rules are missing"],
      ["Escaped errors", "Errors found in a sample / sample size", "Whether you can trust straight-through processing"],
      ["Minutes per exception", "Review time / exceptions", "Whether the review screen is comfortable"],
    ] },
    { type: "p", text: "An illustrative example: 400 invoices a month at 4 minutes each is about 26.7 hours. If 85% go straight through and each exception takes 3 minutes, that leaves 60 reviews and 3 hours of work. Enter your own figures in the [savings and ROI calculator](/herramientas/calculadora-roi) to see the payback period." },
    { type: "h2", text: "Common rollout mistakes" },
    { type: "ul", items: [
      "Automating every supplier at once. Start with the five that account for most of the volume.",
      "Not keeping the original file or recording where each row came from.",
      "Overwriting the working spreadsheet; always generate a new file or an import sheet.",
      "Ignoring credit notes, foreign-currency invoices, withholdings or other tax deductions.",
      "Not noticing when a supplier changes template: watch for jumps in the exception rate.",
    ] },
    { type: "h2", text: "A four-week rollout plan" },
    { type: "ol", items: [
      "**Week 1:** gather 50 real invoices, define the schema and record the correct values by hand as a test set.",
      "**Week 2:** write rules for the main suppliers and measure them against that set.",
      "**Week 3:** run in parallel with the manual process and compare results.",
      "**Week 4:** go live with an exception queue, backups and a named owner.",
    ] },
  ],
  faqs: [
    { q: "Can I extract invoices to Excel without programming?", a: "Yes, in simple cases. Excel includes Power Query with a PDF connector that detects tables, and there are commercial extraction services. Programming pays off when you need your own validations, want to process whole folders or must keep documents inside your infrastructure." },
    { q: "What accuracy can I expect?", a: "There is no universal figure: it depends on document quality and layout variety. Measure it on a set of real, hand-labelled invoices before deciding, and measure it again when your suppliers change." },
    { q: "Should I keep the original PDF after extracting the data?", a: "Yes. The spreadsheet is a derived copy. Tax rules usually require you to keep the original document, and you will also need it to resolve discrepancies." },
    { q: "Does the sample script work with any invoice?", a: "No. It is a starting point for PDFs with text and common labels, with dates written as two digits, two digits and a four-digit year. The regular expressions must be adjusted for each supplier, and invoices that do not fit should land in the review sheet instead of being filled in with guesses." },
    { q: "Is it safe to use a cloud tool for this?", a: "It can be, if the provider offers a data processing agreement and clear retention periods and does not use your documents to train models. If the invoices contain particularly sensitive information, consider local processing." },
  ],
};

export default guide;
