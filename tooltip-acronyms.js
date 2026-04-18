(function () {
  const glossary = {
    "ACID": "Atomicity, Consistency, Isolation, Durability",
    "API": "Application Programming Interface",
    "APIs": "Application Programming Interfaces",
    "AWS": "Amazon Web Services",
    "BI": "Business Intelligence",
    "CDC": "Change Data Capture",
    "CI": "Continuous Integration",
    "CI/CD": "Continuous Integration and Continuous Delivery",
    "CLI": "Command-Line Interface",
    "CSV": "Comma-Separated Values",
    "CSVs": "Comma-Separated Values files",
    "CTE": "Common Table Expression",
    "CTEs": "Common Table Expressions",
    "DAG": "Directed Acyclic Graph",
    "DAGs": "Directed Acyclic Graphs",
    "DB": "Database",
    "DBs": "Databases",
    "dbt": "data build tool",
    "DDL": "Data Definition Language",
    "DML": "Data Manipulation Language",
    "ELT": "Extract, Load, Transform",
    "ETL": "Extract, Transform, Load",
    "HTML": "HyperText Markup Language",
    "IAM": "Identity and Access Management",
    "I/O": "Input and Output",
    "IoT": "Internet of Things",
    "JSON": "JavaScript Object Notation",
    "ML": "Machine Learning",
    "OLTP": "Online Transaction Processing",
    "PDF": "Portable Document Format",
    "PDFs": "Portable Document Format files",
    "PII": "Personally Identifiable Information",
    "PR": "Pull Request",
    "PRs": "Pull Requests",
    "QA": "Quality Assurance",
    "RCA": "Root Cause Analysis",
    "S3": "Amazon Simple Storage Service",
    "SaaS": "Software as a Service",
    "SCD": "Slowly Changing Dimension",
    "SLA": "Service-Level Agreement",
    "SLAs": "Service-Level Agreements",
    "SQL": "Structured Query Language",
    "SSH": "Secure Shell",
    "UDF": "User-Defined Function",
    "UDFs": "User-Defined Functions",
    "WLM": "Workload Management",
    "YAML": "YAML Ain't Markup Language"
  };

  const excludedSelector = "pre, code, script, style, noscript, abbr, .no-tooltips";
  const escapedTerms = Object.keys(glossary)
    .sort((left, right) => right.length - left.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = new RegExp(
    `(^|[^A-Za-z0-9])(${escapedTerms.join("|")})(?=$|[^A-Za-z0-9])`,
    "g"
  );

  function shouldSkip(node) {
    const parent = node.parentElement;
    if (!parent) {
      return true;
    }

    return Boolean(parent.closest(excludedSelector));
  }

  function buildTooltip(term) {
    const tooltip = document.createElement("abbr");
    const expansion = glossary[term];

    tooltip.className = "tooltip-term";
    tooltip.title = expansion;
    tooltip.setAttribute("aria-label", `${term}: ${expansion}`);
    tooltip.textContent = term;

    return tooltip;
  }

  function decorateTextNode(node) {
    const text = node.nodeValue;
    if (!text || !text.trim()) {
      return;
    }

    matcher.lastIndex = 0;
    let match = matcher.exec(text);
    if (!match) {
      return;
    }

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    do {
      const boundary = match[1] || "";
      const term = match[2];
      const start = match.index + boundary.length;
      const end = start + term.length;

      if (start > lastIndex) {
        fragment.append(document.createTextNode(text.slice(lastIndex, start)));
      }

      fragment.append(buildTooltip(term));
      lastIndex = end;
      match = matcher.exec(text);
    } while (match);

    if (lastIndex < text.length) {
      fragment.append(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  }

  function decoratePage() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldSkip(node)) {
          return NodeFilter.FILTER_REJECT;
        }

        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(decorateTextNode);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", decoratePage, { once: true });
  } else {
    decoratePage();
  }
})();
