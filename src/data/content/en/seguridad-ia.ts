import type { GuideText } from "@/data/guide-types";

const guide: GuideText = {
  title: "AI security: how to prevent data leaks through ChatGPT at work",
  description:
    "A guide to governance and technical controls for using AI assistants without handing over sensitive information: plan differences, data classification, anonymisation, gateway architecture, prompt injection and incident response.",
  category: "Cybersecurity and AI",
  blocks: [
    { type: "p", text: "Most leaks into AI assistants do not start with an attacker but with someone who wants to finish sooner: they paste a contract to summarise it, a code snippet with a key inside or a customer spreadsheet to “tidy it up”. In 2023 it became public that Samsung employees had entered internal source code into ChatGPT, and the company restricted its use. Banning without offering an alternative, however, tends to push people towards personal accounts that are completely out of sight." },
    { type: "p", text: "The realistic goal is different: allow low-risk uses, make serious mistakes hard to commit and be able to reconstruct what happened if something goes wrong." },
    { type: "h2", text: "Not every way of accessing AI is the same" },
    { type: "p", text: "Terms change with the product. OpenAI states that, by default, **it does not use data from ChatGPT Enterprise, ChatGPT Business, ChatGPT Edu or its API to train its models** ([enterprise privacy](https://openai.com/enterprise-privacy/)). On personal accounts, whether conversations are used to improve models depends on the user's data control settings. Other providers draw similar distinctions." },
    { type: "table", caption: "What to review for each access mode", head: ["Access mode", "Training by default", "Company control", "Reasonable use"], rows: [
      ["Personal account, free or individual paid", "May be used depending on user settings", "None", "Public information only"],
      ["Team or business plan", "Excluded by default in OpenAI's business offerings", "Users, permissions and administration", "Internal work according to classification"],
      ["API integrated into your own tool", "Excluded by default at OpenAI", "High: you filter, log and limit", "Repeatable processes with controlled data"],
      ["Model running on your own infrastructure", "Not applicable", "Total, along with all operational responsibility", "Data that cannot leave"],
    ] },
    { type: "note", title: "“Not used for training” does not mean “not stored”", text: "These are separate commitments. Even if the provider does not train on your data, it may keep it for a while for operations, abuse detection or legal obligations. Review retention, location, subprocessors and the data processing agreement, and review them again periodically because terms change." },
    { type: "h2", text: "Where information escapes" },
    { type: "ul", items: [
      "**The prompt itself:** pasted text, attachments and screenshots.",
      "**Connectors:** access to email, shared drives or repositories with more permissions than necessary.",
      "**Browser extensions:** many of them read the content of the pages you visit.",
      "**Shared links:** a published conversation may contain internal data.",
      "**Your own logs:** your integration may store full prompts in a logging system that too many people can access.",
      "**Prompt injection:** a manipulated document or web page can try to make the assistant reveal or send data.",
    ] },
    { type: "h2", text: "Classify before you ban" },
    { type: "p", text: "A one-page policy gets followed more than a forty-page manual. Four levels with concrete examples from your business are enough:" },
    { type: "table", caption: "Data usage matrix for AI assistants", head: ["Level", "Examples", "Personal assistant", "Approved corporate tool"], rows: [
      ["Public", "Website copy, published documentation", "Allowed", "Allowed"],
      ["Internal", "Procedures, drafts without personal data", "No", "Allowed"],
      ["Confidential", "Contracts, pricing, proprietary code", "No", "With anonymisation and an approved use case"],
      ["Restricted", "Credentials, health data, cards, identity documents", "No", "No, unless formally assessed"],
    ] },
    { type: "h2", text: "Anonymise before sending" },
    { type: "p", text: "Many tasks do not need the real data. To draft a reply to a complaint, the model does not need the customer's name or phone number. Pseudonymisation replaces values with placeholders and keeps the mapping table only on your side:" },
    { type: "code", label: "Basic pseudonymisation in TypeScript", code: String.raw`const PATTERNS: Array<[string, RegExp]> = [
  ["EMAIL", /[\w.+-]+@[\w-]+(\.[\w-]+)+/g],
  ["CARD", /\b(?:\d[ -]?){13,16}\b/g],
  ["PHONE", /(?:\+\d{1,3}[ -]?)?\b\d{3}[ -]?\d{3}[ -]?\d{3}\b/g],
  ["ID", /\b\d{8}\b|\b\d{11}\b/g],
];

export function pseudonymise(text: string) {
  const table = new Map<string, string>();
  let output = text;
  for (const [type, pattern] of PATTERNS) {
    let n = 0;
    output = output.replace(pattern, (value) => {
      const mark = "[" + type + "_" + ++n + "]";
      table.set(mark, value);
      return mark;
    });
  }
  return { output, table }; // the table is never sent to the model
}

export function restore(reply: string, table: Map<string, string>) {
  let output = reply;
  for (const [mark, value] of table) {
    output = output.replaceAll(mark, value);
  }
  return output;
}` },
    { type: "p", text: "Use it as a safety net, not a guarantee. Regular expressions do not recognise personal names, free-form addresses or context that identifies someone (“the only manager at the northern site”). The patterns also need to be adapted to the formats used in your country." },
    { type: "h2", text: "Architecture with an AI gateway" },
    { type: "p", text: "When several people or systems consume models, it makes sense for everything to go through a single point where the rules are applied:" },
    { type: "code", label: "Corporate gateway between users and provider", code: String.raw`  User ──► Internal application (corporate sign-in)
                    │
                    ▼
        ┌────────────── AI gateway ────────────┐
        │ 1. Role-based authorisation          │
        │ 2. Secret and data detection         │
        │ 3. Pseudonymisation or blocking      │
        │ 4. Usage and cost limits             │
        │ 5. Metadata logging                  │
        └──────────────────┬───────────────────┘
                           ▼
                      Provider API
                           │
                           ▼
          Output filter ──► User` },
    { type: "p", text: "The API key lives on the server, never in the browser or in a spreadsheet. The log should record who, when, which use case and how much data; store full content only when there is a justified reason, with restricted access and an expiry date." },
    { type: "h2", text: "Prompt injection: the least intuitive risk" },
    { type: "p", text: "The [OWASP Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/) places prompt injection as the first risk in its 2025 edition and sensitive information disclosure as the second. A model cannot reliably tell apart the user's instructions from those that appear inside an email, a PDF or a page you ask it to read." },
    { type: "ul", items: [
      "Treat all external content as untrusted.",
      "Give assistants with tools the least privilege possible: reading does not imply sending or deleting.",
      "Require human confirmation for actions with effects outside the conversation.",
      "Do not put secrets in system prompts: assume they can be extracted.",
      "Block automatic loading of generated images or links that could carry data in the URL.",
    ] },
    { type: "h2", text: "Controls ordered by effort" },
    { type: "table", caption: "Where to start", head: ["Control", "Effort", "Reduces"], rows: [
      ["One-page policy with examples", "Low", "Mistakes made through lack of knowledge"],
      ["Corporate accounts with central access", "Low to medium", "Use of personal accounts and access by former employees"],
      ["Review of connectors and extensions", "Low", "Mass exposure through permissions"],
      ["Secret scanning in repositories and messages", "Medium", "Leaked keys and passwords"],
      ["Gateway with filtering and logging", "High", "Unauthorised submissions and lack of traceability"],
      ["Endpoint data loss prevention", "High", "Copying from managed devices"],
    ] },
    { type: "h2", text: "Questions to ask before approving a provider" },
    { type: "p", text: "Approving a tool should not depend on an impressive demo. Ask for written answers and keep them alongside the contract, with the date you obtained them:" },
    { type: "ul", items: [
      "Are inputs and outputs used to train or evaluate models? On which plans and with what exceptions?",
      "How long are they retained, who can read them and how do you request deletion?",
      "In which countries are they stored and which subprocessors are involved?",
      "Is there single sign-on, automatic removal of departed users and an exportable activity log?",
      "How, and within what time frame, are you notified of a security incident?",
      "What happens to the information when the contract ends?",
    ] },
    { type: "p", text: "If an answer is in neither the documentation nor the contract, treat it as unknown and restrict use to public information until it is clarified. Also name someone to repeat the review whenever the provider changes its terms or adds features, because a new feature can open a data flow that nobody assessed." },
    { type: "h2", text: "If something was already pasted that should not have been" },
    { type: "ol", items: [
      "Report it without blame: if people fear punishment, they will not speak up.",
      "If it was a credential, **revoke it and issue a new one immediately**. Deleting the conversation is not enough.",
      "Delete the conversation and any shared links, and ask the provider for erasure where appropriate.",
      "Record which data, belonging to whom, in which service and under which terms.",
      "If personal data is involved, assess notification duties and deadlines with your data protection officer or equivalent.",
      "Fix the cause: usually an approved tool or a clear example was missing.",
    ] },
    { type: "h2", text: "Minimum policy template" },
    { type: "code", label: "Adaptable draft", code: String.raw`USE OF AI ASSISTANTS
1. Only tools on the approved list are used, with a corporate account.
2. Credentials, health data, card numbers and identity documents are
   never entered.
3. Customer data is pseudonymised before it is sent.
4. Any output that reaches a customer or production is reviewed by a person.
5. New connectors require approval.
6. An improper submission is reported the same day to: ______.
Review this policy every 6 months.` },
    { type: "p", text: "For tasks that can be solved without external models, the safest choice is to send nothing at all. Comparing versions of a document is a good example, as explained in the guide to [comparing contracts without uploading them](/guias/comparar-contratos-pdf-sin-subir-a-la-nube)." },
  ],
  faqs: [
    { q: "Does ChatGPT use what I type to train its models?", a: "It depends on the product and the settings. OpenAI states that it does not train by default on data from its business offerings or the API. On personal accounts you should check the data controls section. Always verify the current policy, because it can change." },
    { q: "Is turning off training on a personal account enough?", a: "Not for corporate data. The company still has no control over access, retention or deletion, and there is no data processing agreement between the provider and the organisation covering that personal account." },
    { q: "Does anonymisation remove all risk?", a: "No. It reduces exposure of obvious identifiers, but context can still identify people or reveal business information. Combine it with data classification and a review of use cases." },
    { q: "Should AI tools be blocked entirely?", a: "A total block may be appropriate in highly regulated environments, but it often moves usage to personal devices. Offering an approved route and clear rules usually gives more visibility and control." },
    { q: "Is a local model automatically secure?", a: "It avoids sending data to an external provider, but it still needs access control, updates, log protection and defences against prompt injection, especially if it can use tools." },
  ],
};

export default guide;
