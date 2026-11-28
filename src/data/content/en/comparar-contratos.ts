import type { GuideText } from "@/data/guide-types";

const guide: GuideText = {
  title: "How to compare PDF contracts without uploading them to the cloud",
  description:
    "A practical method to catch changes between two versions of a contract without sending the document to any server: how local comparison works, which mistakes to avoid and how to verify privacy yourself.",
  category: "Document privacy",
  blocks: [
    { type: "p", text: "A supplier returns the contract with the line “we only adjusted a couple of details”. It is fourteen pages long. Somewhere inside, a notice period went from 60 to 30 days, or a limitation of liability lost the word “mutual”. Comparing versions is an everyday task, and the most convenient way of doing it (dragging both files into a free website) is also the one that exposes the most information." },
    { type: "p", text: "This guide explains how to compare contracts with confidence, what technically happens when a tool processes a PDF inside your browser, where automated comparisons fail and how to set up a review process that will stand up to an internal audit." },
    { type: "h2", text: "What you expose when you upload a contract to an online service" },
    { type: "p", text: "A contract concentrates data that rarely appears together anywhere else: names and identity numbers of the signatories, addresses, amounts, bank accounts, penalties, exclusivity terms and sometimes technical annexes. When you upload it to someone else's server, several things happen, regardless of how well-intentioned the provider is:" },
    { type: "ul", items: [
      "The file leaves your perimeter and becomes subject to a third party's retention policy.",
      "It may be recorded in backups, caches or error logs that do not disappear when you press “delete”.",
      "If the contract contains personal data, the provider starts acting as a data processor, and rules such as the GDPR or Peru's personal data protection law require a legal basis and safeguards for that.",
      "Many non-disclosure agreements forbid sharing the text with third parties without written permission. A comparison website is a third party.",
    ] },
    { type: "note", title: "The question worth asking", text: "It is not “do I trust this company?” but “does this company need to receive my document to do its job?”. For comparing text the answer is no: a modern browser can do it on its own." },
    { type: "h2", text: "Three ways to compare two versions" },
    { type: "table", caption: "Comparison of review methods", head: ["Method", "File leaves your device", "Catches small changes", "Effort", "When to use it"], rows: [
      ["Reading side by side", "No", "Unreliable", "Very high", "Documents of one or two pages"],
      ["Editor track changes", "Depends on where it is stored", "Yes, if it was enabled", "Low", "When both parties work on the same `.docx`"],
      ["Cloud comparison service", "Yes", "Yes", "Low", "Public texts or texts with no sensitive data"],
      ["Local comparison in the browser", "No", "Yes, on the extracted text", "Low", "Contracts, payroll, offers and documents under confidentiality"],
      ["Command line (`pdftotext` and `diff`)", "No", "Yes", "Medium", "Technical users and batch processing"],
    ] },
    { type: "p", text: "Track changes deserves a warning: it only reflects edits made while it was switched on, and it can be disabled or accepted before the file is sent back. It never replaces comparing the version you sent with the version you received." },
    { type: "h2", text: "How a fully local comparison works" },
    { type: "p", text: "A local comparison tool downloads its code once (HTML, JavaScript and, if needed, WebAssembly) and then works with the files you select using browser APIs. Picking a file in a form field **does not send it anywhere**: it only grants the page permission to read it into memory. Transmission happens only if the code makes a network request containing that content." },
    { type: "code", label: "Architecture of a client-side comparison tool", code: String.raw`  Your device
  ┌───────────────────────────────────────────────────────────┐
  │  contract_v1.pdf ─┐                                       │
  │                   ├─► Text extraction (Web Worker)        │
  │  contract_v2.pdf ─┘            │                          │
  │                       (scanned page? ─► local OCR)        │
  │                                ▼                          │
  │                    Normalisation (spaces, hyphens)        │
  │                                ▼                          │
  │                         Diff algorithm                    │
  │                                ▼                          │
  │                   Side-by-side view + report              │
  └───────────────────────────────────────────────────────────┘
            ▲
            │ only the application code is downloaded
       CDN / static hosting` },
    { type: "h3", text: "Text extraction" },
    { type: "p", text: "A PDF does not store paragraphs; it stores instructions for placing glyphs at coordinates. The extractor has to rebuild the reading order, join lines and decide where each word ends. That is why two visually identical PDFs can produce slightly different text if different programs generated them." },
    { type: "h3", text: "Normalisation" },
    { type: "p", text: "Before comparing, it pays to remove differences that carry no meaning: line breaks caused by layout, double spaces, hyphenation, curly versus straight quotes and ligatures. Without this step, a change of margins produces hundreds of false alarms and the human reviewer loses focus exactly where it matters." },
    { type: "h3", text: "The diff algorithm" },
    { type: "p", text: "Most comparison tools look for the longest common subsequence between the two versions; Myers' algorithm is the classic reference and is the one used by tools such as Git. Anything outside that subsequence is marked as removed or added. Running it inside a Web Worker keeps the tab from freezing on long documents." },
    { type: "h2", text: "Practical example with El Comparinizador" },
    { type: "p", text: "[El Comparinizador](https://comparinizador.solv.quest) is SOLV's tool for this job: it compares PDF, DOCX, TXT and MD documents side by side or as a unified diff, runs in your browser through Web Workers, includes local OCR with Tesseract.js for scanned PDFs and produces sanitised HTML or TXT reports. Its interface is in Spanish. The recommended workflow is this:" },
    { type: "ol", items: [
      "Save the version you sent and the version you received with unambiguous names, for example `services_v3_sent.pdf` and `services_v4_received.pdf`.",
      "Open the tool and load the version you sent as the original. Swapping the order makes additions look like deletions.",
      "Start with the side-by-side view to locate each change within its clause.",
      "Switch to the unified diff to read the changes in sequence, without the noise of what stayed the same.",
      "Export the report and attach it to the file together with both versions.",
    ] },
    { type: "p", text: "Suppose the termination clause changes like this:" },
    { type: "code", label: "Unified diff of one clause", code: String.raw`- Either party may terminate the agreement with
- sixty (60) days' written notice.
+ The Supplier may terminate the agreement with
+ thirty (30) days' written notice.` },
    { type: "p", text: "There are two changes, and the second is the more serious one: besides the shorter period, the right is no longer reciprocal. A summary that only said “the notice period changed” would have hidden that only one party can now walk away from the agreement." },
    { type: "h2", text: "What to check every time, even if the diff looks clean" },
    { type: "table", caption: "Checklist by type of clause", head: ["Part of the contract", "Typical change", "Risk"], rows: [
      ["Definitions", "What counts as “service” or “confidential” is widened", "Changes the scope of the whole document without touching any obligation"],
      ["Term and renewal", "Automatic renewal appears or the notice period shrinks", "You get locked in or lose your supplier"],
      ["Prices and adjustments", "The indexation rule or the currency changes", "Growing cost that was not budgeted"],
      ["Liability", "“Mutual” disappears or the cap moves", "Imbalance when an incident happens"],
      ["Annexes and references", "The text points to a policy published on a website", "The other party can change it without your signature"],
      ["Jurisdiction", "The forum or governing law changes", "Litigation becomes far more expensive"],
    ] },
    { type: "h2", text: "Limits of automated comparison" },
    { type: "ul", items: [
      "**Scanned PDFs:** OCR can confuse `1` with `l`, `0` with `O` or drop accents. Check every figure reported as changed against the original image, and if the scan is poor also review amounts and dates that were not flagged.",
      "**Tables and columns:** the reading order can get mixed up. Compare price tables cell by cell.",
      "**Images, stamps and signatures:** a text comparison does not see that a signature moved or that a graphic annex was replaced.",
      "**Hidden text:** white text on a white background or outside the margins is extracted even though you cannot see it. If the diff shows something you cannot find on screen, investigate it.",
      "**Meaning:** the tool tells you what changed, not whether it is good for you. Legal judgement remains human.",
    ] },
    { type: "h2", text: "How to verify that your document is not being sent" },
    { type: "p", text: "You do not need to rely on a promise. Anyone can check it in a few minutes:" },
    { type: "ol", items: [
      "Open the developer tools (`F12`) and the **Network** tab before loading any file.",
      "Clear the log, load two test documents and run the comparison.",
      "Look for `POST` or `PUT` requests, and any upload whose size resembles that of your files. A website may load resources, analytics or advertising; what must not happen is the document content travelling inside them.",
      "Run the decisive test: once the page has loaded, disconnect from the network and repeat the comparison. If it works offline, processing is local. If it uses OCR, run it once beforehand so that the models are cached.",
    ] },
    { type: "h2", text: "Command line alternative" },
    { type: "p", text: "For technical teams or batches of documents, the Poppler utilities and Git handle a first pass without any connection:" },
    { type: "code", label: "Local comparison from the terminal", code: String.raw`pdftotext -layout contract_v1.pdf v1.txt
pdftotext -layout contract_v2.pdf v2.txt
git diff --no-index --word-diff v1.txt v2.txt` },
    { type: "p", text: "The `--word-diff` option marks words instead of whole lines, which is very useful for legal prose, where changing one term reflows the entire paragraph. If the PDF is an image, you will need to apply OCR first, for example with OCRmyPDF." },
    { type: "h2", text: "A review procedure for your team" },
    { type: "ol", items: [
      "Agree on a naming convention with a version number and direction (sent or received).",
      "Always compare against the last version that left your organisation, not the last one you received.",
      "Classify every change as formal, commercial or legal and assign an owner.",
      "Before signing, compare the signature copy with the last approved version. This is the step most often skipped.",
      "File the difference report with both versions and delete temporary copies.",
    ] },
    { type: "p", text: "If your team repeats this dozens of times a month, estimate what it costs with the [automation ROI calculator](/herramientas/calculadora-roi). And if people also use AI assistants to summarise contracts, read the guide on [preventing data leaks to AI services](/guias/seguridad-ia-evitar-fuga-datos-chatgpt-empresas)." },
  ],
  faqs: [
    { q: "Is it legal to compare a confidential contract with an online tool?", a: "It depends on what the non-disclosure agreement and the applicable data protection rules say. If the tool receives the file, there is a disclosure to a third party. If it processes the document entirely in your browser, the content does not leave your device, although you should verify this and follow your organisation's internal policy. When in doubt, ask your legal adviser." },
    { q: "Can I compare a PDF with a Word file?", a: "Yes, as long as the tool extracts text from both formats. Expect somewhat more noise than when comparing two files of the same type, because numbering, headers and page breaks are extracted differently." },
    { q: "What about scanned contracts?", a: "They need optical character recognition before they can be compared. Local OCR avoids sending the image to a server, but it can make mistakes, so figures, dates and names must be checked visually." },
    { q: "Does a comparison tool replace a lawyer's review?", a: "No. It reduces the risk of missing a change, but it does not interpret the legal consequences or detect harmful clauses that were already present in the first version." },
    { q: "Does PDF metadata show up in the comparison?", a: "Usually not: a text comparison focuses on page content. If you are concerned about author names, history or comments, review and clean them with a dedicated tool before sharing the file." },
  ],
};

export default guide;
